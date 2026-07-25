"use server"

import authOptions from "@/lib/authOptions"
import collections from "@/lib/collections"
import dbConnect from "@/lib/dbConnect"
import { getServerSession } from "next-auth"

export const AddToCart = async(variant, coffee) => {
     const session = await getServerSession(authOptions);
     // console.log("Server session:", session, variant, coffee);
     
     // check is the user loggedin or not
     if(!session?.user?.email) return { success: false, message: "Unauthorized access" };

     const cartCollection = dbConnect(collections.CART);

     try{
          const query = { 
               email: session?.user?.email,
               productId: coffee?._id,
               weight: variant?.weight
          };

          const findCoffee = await cartCollection.findOne(query);
          if(findCoffee) return { success: false, message: "This variant already added. Try another." }
          
          const item = {
               email: session?.user?.email,
               productId: coffee?._id,
               weight: variant?.weight
          };
          const result = await cartCollection.insertOne(item);
          return {
               success: true,
               insertedId: result?.insertedId.toString()
          }
     }catch(err) {
          console.error(err);
     }
}
