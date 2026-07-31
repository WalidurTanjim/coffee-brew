"use server"

import authOptions from "@/lib/authOptions"
import collections from "@/lib/collections"
import dbConnect from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { ObjectId } from "mongodb"
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

// Get All Orders (Admin)
export const getAllOrders = async () => {
     try {
          const session = await getServerSession(authOptions);
          if (!session || session?.user?.role !== "admin") {
               return {
                    success: false,
                    message: "Unauthorized! Admin access required.",
                    data: [],
               };
          }

          const orderCollection = dbConnect(collections.ORDER);
          const rawResult = await orderCollection.find().sort({ created_at: -1 }).toArray();

          const result = rawResult.map((order) => ({
               ...order,
               _id: order._id.toString(),
               created_at: order.created_at ? new Date(order.created_at).toISOString() : null,
               updated_at: order.updated_at ? new Date(order.updated_at).toISOString() : null,
          }));

          return {
               success: true,
               data: result,
          };
     } catch (err) {
          console.error("getAllOrders Error:", err);
          return {
               success: false,
               message: err?.message || "Failed to fetch orders",
               data: [],
          };
     }
};

// Update Order Status (Admin)
export const updateOrderStatus = async (orderId, newStatus) => {
     try {
          const session = await getServerSession(authOptions);
          if (!session || session?.user?.role !== "admin") {
               return { success: false, message: "Unauthorized access" };
          }

          if (!orderId || !ObjectId.isValid(orderId)) {
               return { success: false, message: "Invalid Order ID" };
          }

          const orderCollection = dbConnect(collections.ORDER);
          const result = await orderCollection.updateOne(
               { _id: new ObjectId(orderId) },
               {
                    $set: {
                         status: newStatus,
                         updated_at: new Date()
                    }
               }
          );

          if (result.modifiedCount > 0) {
               revalidatePath("/dashboard/admin/orders");
               revalidatePath("/dashboard/admin");
               revalidatePath("/dashboard/user/orders");
               return { success: true, message: `Order status updated to ${newStatus}` };
          } else {
               return { success: false, message: "Order not updated" };
          }
     } catch (err) {
          console.error("updateOrderStatus error:", err);
          return { success: false, message: err?.message || "Failed to update order status" };
     }
};

// Delete Order (Admin)
export const deleteOrder = async (orderId) => {
     try {
          const session = await getServerSession(authOptions);
          if (!session || session?.user?.role !== "admin") {
               return { success: false, message: "Unauthorized access" };
          }

          if (!orderId || !ObjectId.isValid(orderId)) {
               return { success: false, message: "Invalid Order ID" };
          }

          const orderCollection = dbConnect(collections.ORDER);
          const result = await orderCollection.deleteOne({ _id: new ObjectId(orderId) });

          if (result.deletedCount > 0) {
               revalidatePath("/dashboard/admin/orders");
               revalidatePath("/dashboard/admin");
               return { success: true, message: "Order deleted successfully" };
          } else {
               return { success: false, message: "Order not found" };
          }
     } catch (err) {
          console.error("deleteOrder error:", err);
          return { success: false, message: err?.message || "Failed to delete order" };
     }
};

