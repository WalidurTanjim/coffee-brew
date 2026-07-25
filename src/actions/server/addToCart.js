"use server"

import authOptions from "@/lib/authOptions"
import collections from "@/lib/collections"
import dbConnect from "@/lib/dbConnect"
import { getServerSession } from "next-auth"


// AddToCart (insert coffee to cart)
export const AddToCart = async(variant, coffee) => {
     const session = await getServerSession(authOptions);
     // console.log("Server session:", session, variant, coffee);
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
     }
}



// GetCartByEmail 
export const GetCartByEmail = async() => {
     const session = await getServerSession(authOptions);
     const userEmail = session?.user?.email;

     if(!userEmail) {
          return { 
               success: false, 
               message: "Unauthorized access",
               cartItems: []
          }
     }

     try{
          const cartCollection = dbConnect(collections.CART);
          const query = { email: userEmail };
          const result = await cartCollection.find(query).toArray();

          if(!result) return { success: false, message: "There is not item in the cart" }

          const cartItems = result.map(item => ({
               ...item,
               _id: item?._id.toString()
          }))
          
          return {
               success: true,
               cartItems
          };
     }catch(err){
          console.error(err);
          return {
               success: false,
               message: err?.message || "An unexpected error occurred during fetching the cart",
               cartItems: []
          }
     }
}