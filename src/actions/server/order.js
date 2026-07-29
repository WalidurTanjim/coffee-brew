"use server"

import authOptions from "@/lib/authOptions"
import collections from "@/lib/collections"
import dbConnect from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

// ConfirmOrder
export const ConfirmOrder = async(payload) => {
     try {
          // console.log('Confirm order payload:', payload, idempotencyKey)
          const session = await getServerSession(authOptions);
          const userEmail = session?.user?.email;
          // console.log("Server session:", session, userEmail);

          if (!userEmail) {
               return {
                    success: false,
                    message: "Unauthorized! Please login to place an order.",
               };
          }
          
          if (!payload || !payload.user?.email) {
               return {
                    success: false,
                    message: "Valid payload with user identification is required.",
               };
          }

          if (payload.user.email !== userEmail) {
               return {
                    success: false,
                    message: "Unauthorized request. User identity mismatch.",
               };
          }

          const orderCollection = dbConnect(collections.ORDER);

          const { idempotencyKey } = payload || {};
          if(idempotencyKey) {
               const isExist = await orderCollection.findOne({ idempotencyKey });

               if(isExist) {
                    return {
                         success: false,
                         message: "This order is already being processed. Please check your order history."
                    }
               }
          }

          const newOrder = {
               ...payload,
               created_at: new Date(),
               updated_at: new Date()
          }

          const result = await orderCollection.insertOne(newOrder);
          // console.log("Order result from action:", result);

          if(Boolean(result?.acknowledged)) {
               // clear cart after order successfully
               const query = { email: userEmail };
               const cartCollection = dbConnect(collections.CART);
               const cartDeleteResult = await cartCollection.deleteMany(query);
               // console.log("CartDeleteResult by email:", cartDeleteResult);
               revalidatePath('/checkout')

               return {
                    success: true,
                    message: "Order places successfully. Please wait to confirm",
                    orderId: result?.insertedId.toString(),
                    cartCleared: Boolean(cartDeleteResult?.acknowledged)
               }
          }else {
               return {
                    success: false,
                    message: "Failed to create order. Please try again."
               }
          }
     }catch(err) {
          console.error("Order error action:", err);

          return {
               success: false,
               message: err.message || "Something went wrong while placing the order.",
          };
     }
}

// GetOrderByEmail
export const GetOrderByEmail = async () => {
     try {
          const session = await getServerSession(authOptions);
          const userEmail = session?.user?.email;

          if (!userEmail) {
               return {
                    success: false,
                    message: "Unauthorized! Please login to place an order.",
               };
          }

          const orderCollection = dbConnect(collections.ORDER);
          const query = { "user.email": userEmail };
          const rawResult = await orderCollection.find(query).toArray();

          if (!rawResult || rawResult.length === 0) {
               return {
                    success: false,
                    message: "There is no data to retrieve",
                    data: [],
               };
          }

          // Convert ObjectId to String and sanitize Date objects for Next.js serialization
          const result = rawResult.map((order) => ({
               ...order,
               _id: order._id.toString(),
               created_at: order.created_at ? new Date(order.created_at).toISOString() : null,
               updated_at: order.updated_at ? new Date(order.updated_at).toISOString() : null,
          }));

          return {
               success: true,
               message: "Orders retrieved successfully",
               data: result,
          };
     } catch (err) {
          console.error(err);

          return {
               success: false,
               message: err?.message || "Something went wrong while retrieving orders",
          };
     }
};
