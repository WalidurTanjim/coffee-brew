"use server"

import collections from "@/lib/collections"
import dbConnect from "@/lib/dbConnect"

// ConfirmOrder
export const ConfirmOrder = async(payload) => {
     // console.log('Confirm order payload:', payload, idempotencyKey)
     
     if (!payload || !payload.user?.email) {
          return {
               success: false,
               message: "Valid payload with user identification is required.",
          };
     }

     const { idempotencyKey } = payload || {};

     const newOrder = {
          ...payload,
          created_at: new Date(),
          updated_at: new Date()
     }

     try{
          const orderCollection = dbConnect(collections.ORDER);

          if(idempotencyKey) {
               const isExist = await orderCollection.findOne({ idempotencyKey });

               if(isExist) {
                    return {
                         success: false,
                         message: "This order is already being processed. Please check your order history."
                    }
               }
          }

          const result = await orderCollection.insertOne(payload);
          // console.log("Order result from action:", result);

          if(Boolean(result?.acknowledged)) {
               return {
                    success: true,
                    message: "Order places successfully. Please wait to confirm",
                    orderId: result?.insertedId.toString()
               }
          }else {
               return {
                    success: false,
                    message: "Failed to create order"
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
