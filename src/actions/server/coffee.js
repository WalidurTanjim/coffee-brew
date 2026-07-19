import collections from "@/lib/collections";
import dbConnect from "@/lib/dbConnect";

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
