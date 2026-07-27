"use server"

import authOptions from "@/lib/authOptions"
import collections from "@/lib/collections"
import dbConnect from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { cache } from "react"


// AddToCart (insert coffee to cart)
export const AddToCart = async(variant, coffee) => {
     const session = await getServerSession(authOptions);
     // console.log("Session from addToCart action:", session, variant, coffee);
     
     const userEmail = session?.user?.email;
     
     // check is the user loggedin or not
     if(!userEmail) return { success: false, message: "Unauthorized access" };
     
     try{
          const cartCollection = dbConnect(collections.CART);

          const query = { 
               email: session?.user?.email,
               productId: coffee?._id,
               weight: variant?.weight
          };

          const findCoffee = await cartCollection.findOne(query);
          if(findCoffee) return { success: false, message: "This variant already added. Try another." }
          
          const item = {
               email: userEmail,
               productId: coffee?._id,
               weight: variant?.weight,
               price: variant?.price,
               quantity: 1,
               created_at: new Date()
          };
          const result = await cartCollection.insertOne(item);
          return {
               success: true,
               message: "Added to cart successfully",
               insertedId: result?.insertedId.toString()
          }
     }catch(err) {
          console.error(err);
          return {
               success: false,
               message: err?.message || "An unexpected error occurred during add to cart"
          }
     }
}



// GetCartByEmail 
export const GetCartByEmail = cache(async() => {
     const session = await getServerSession(authOptions);
     // console.log("Session from GetCartByEmail action:", session);
     const userEmail = session?.user?.email;

     if(!userEmail) {
          return { 
               success: false, 
               message: "Unauthorized access",
               cartItems: []
          }
     }

     try {
          const cartCollection = dbConnect(collections.CART);

          // aggregate pipeline
          const result = await cartCollection.aggregate([
               {
                    $match: { email: userEmail }
               },
               {
                    $addFields: {
                         productObjectId: { $toObjectId: '$productId' }
                    }
               },
               {
                    $lookup: {
                         from: collections.COFFEES,
                         localField: "productObjectId",
                         foreignField: "_id",
                         as: 'coffeeDetails'
                    }
               },
               {
                    $unwind: {
                         path: "$coffeeDetails",
                         preserveNullAndEmptyArrays: true
                    }
               },
               {
                    $project: {
                         productObjectId: 0
                    }
               }
          ]).toArray();

          const serializedResult = result.map(item => ({
               ...item,
               _id: item?._id.toString(),
               productId: item?.productId.toString(),
               created_at: item?.created_at ? new Date(item?.created_at).toISOString() : null,
               coffeeDetails: item?.coffeeDetails ? {
                    ...item?.coffeeDetails,
                    _id: item?.coffeeDetails?._id.toString()
               } : null
          }));

          return {
               success: true,
               cartItems: serializedResult
          }
     }catch(err){
          console.error(err);
          return {
               success: false,
               message: err?.message || "An unexpected error occurred during fetching the cart",
               cartItems: []
          }
     }
})



// DeleteCartItemById
export const DeleteCartItemById = async(id, pathname) => {
     const coffeeId = id;

     if(!coffeeId) {
          return {
               success: false,
               message: "There is not coffee id. Please try again."
          }
     }
     
     const session = await getServerSession(authOptions);
     const userEmail = session?.user?.email;

     if(!userEmail) {
          return {
               success: false,
               message: "Forbidden access"
          }
     }

     try{
          const cartCollection = dbConnect(collections.CART);
          const query = { 
               _id: new ObjectId(coffeeId),
               email: userEmail
          };
          const result = await cartCollection.deleteOne(query);

          if(result?.deletedCount > 0) {
               revalidatePath(pathname);

               return {
                    success: true,
                    message: "Cart item deleted successfully"
               }
          }else{
               return {
                    success: false,
                    message: "Cart item not found. Please try again."
               }
          }
     }catch(err) {
          console.error(err);
          return {
               success: false,
               message: err?.message || "An unexpected error occurred during delete cart item"
          }
     }
}