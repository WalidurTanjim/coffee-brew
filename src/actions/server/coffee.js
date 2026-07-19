import collections from "@/lib/collections";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getAllCoffee = async() => {
     try{
          const result = await dbConnect(collections.COFFEES).find().toArray();
          const coffees = result.map(coffee => ({
               ...coffee, _id: coffee._id.toString()
          }));
          return coffees || [];
     }catch(err){
          console.error("Coffee fetch error:", err);
          return null;
     }
}


export const getSingleCoffeeById = async(id) => {
     if(!id || id.length !== 24) {
          return null
     }

     try{
          const query = { _id: new ObjectId(id) };
          const result = await dbConnect(collections.COFFEES).findOne(query)
          return { ...result, _id: result._id.toString() } || {};
     }catch(err) {
          console.error("Single coffee fetch error:", err)
     }
}
