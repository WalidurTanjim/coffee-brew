"use server"

import authOptions from "@/lib/authOptions";
import collections from "@/lib/collections";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getAllCoffee = async() => {
     try{
          const result = await dbConnect(collections.COFFEES).find().toArray();
          const coffees = result.map(coffee => ({
               ...coffee, _id: coffee._id.toString()
          }));
          return coffees || [];
     }catch(err){
          console.error("Coffee fetch error:", err);
          return [];
     }
}


export const getSingleCoffeeById = async(id) => {
     if(!id || id.length !== 24) {
          return null;
     }

     try{
          const query = { _id: new ObjectId(id) };
          const result = await dbConnect(collections.COFFEES).findOne(query);
          if (!result) return null;
          return { ...result, _id: result._id.toString() };
     }catch(err) {
          console.error("Single coffee fetch error:", err);
          return null;
     }
}

// Add new Coffee (Admin)
export const addCoffee = async(payload) => {
     try {
          const session = await getServerSession(authOptions);
          if (!session || session?.user?.role !== "admin") {
               return { success: false, message: "Unauthorized! Only admins can add coffee." };
          }

          if (!payload?.name || !payload?.price) {
               return { success: false, message: "Coffee Name and Price are required." };
          }

          const coffeeCollection = dbConnect(collections.COFFEES);
          
          const newCoffee = {
               ...payload,
               price: parseFloat(payload.price) || 0,
               stock: parseInt(payload.stock) || 50,
               rating: parseFloat(payload.rating) || 4.5,
               author: {
                    name: session?.user?.name || "Admin",
                    email: session?.user?.email || ""
               },
               created_at: new Date().toISOString(),
               updated_at: new Date().toISOString()
          };

          const result = await coffeeCollection.insertOne(newCoffee);

          if (result?.acknowledged) {
               revalidatePath("/coffee");
               revalidatePath("/dashboard/admin/my-coffee");
               return {
                    success: true,
                    message: "Coffee added successfully!",
                    insertedId: result.insertedId.toString()
               };
          } else {
               return { success: false, message: "Failed to add coffee." };
          }
     } catch (err) {
          console.error("Error adding coffee:", err);
          return { success: false, message: err?.message || "Error adding coffee" };
     }
}

// Update existing Coffee (Admin)
export const updateCoffee = async(id, payload) => {
     try {
          const session = await getServerSession(authOptions);
          if (!session || session?.user?.role !== "admin") {
               return { success: false, message: "Unauthorized! Only admins can edit coffee." };
          }

          if (!id || id.length !== 24) {
               return { success: false, message: "Invalid Coffee ID" };
          }

          const coffeeCollection = dbConnect(collections.COFFEES);
          const filter = { _id: new ObjectId(id) };

          const updatedDoc = {
               $set: {
                    ...payload,
                    updated_at: new Date().toISOString()
               }
          };

          const result = await coffeeCollection.updateOne(filter, updatedDoc);

          if (result?.modifiedCount > 0 || result?.matchedCount > 0) {
               revalidatePath("/coffee");
               revalidatePath(`/coffee/${id}`);
               revalidatePath("/dashboard/admin/my-coffee");
               return { success: true, message: "Coffee updated successfully!" };
          } else {
               return { success: false, message: "No changes made or item not found." };
          }
     } catch (err) {
          console.error("Error updating coffee:", err);
          return { success: false, message: err?.message || "Error updating coffee" };
     }
}

// Delete Coffee (Admin)
export const deleteCoffee = async(id) => {
     try {
          const session = await getServerSession(authOptions);
          if (!session || session?.user?.role !== "admin") {
               return { success: false, message: "Unauthorized! Only admins can delete coffee." };
          }

          if (!id || id.length !== 24) {
               return { success: false, message: "Invalid Coffee ID" };
          }

          const coffeeCollection = dbConnect(collections.COFFEES);
          const result = await coffeeCollection.deleteOne({ _id: new ObjectId(id) });

          if (result?.deletedCount > 0) {
               revalidatePath("/coffee");
               revalidatePath("/dashboard/admin/my-coffee");
               return { success: true, message: "Coffee deleted successfully!" };
          } else {
               return { success: false, message: "Coffee not found." };
          }
     } catch (err) {
          console.error("Error deleting coffee:", err);
          return { success: false, message: err?.message || "Error deleting coffee" };
     }
}

