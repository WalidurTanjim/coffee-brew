"use server"

import collections from "@/lib/collections";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

// SignUpUser
export const SignUpUser = async(payload) => {
     try {
          const { name, email, password } = payload;

          if(!name || !email || !password) {
               return {
                    success: false,
                    message: "All fields are required"
               }
          }

          const cleanEmail = email.trim().toLowerCase();
          const query = { email: cleanEmail };
          const isExistsUser = await dbConnect(collections.USERS).findOne(query);
          
          if(isExistsUser) {
               return {
                    success: false,
                    message: "User already registered. Please login"
               }
          }

          const hashPassword = await bcrypt.hash(password, 10);

          const newUser = {
               name,
               email: cleanEmail,
               password: hashPassword,
               role: "user",
               provider: "credentials",
               created_at: new Date(),
               updated_at: new Date()
          };

          const result = await dbConnect(collections.USERS).insertOne(newUser);
          // console.log("SignUpUser result from auth:", result);

          return { 
               success: true, 
               insertedId: result?.insertedId.toString() 
          };
     } catch(err) {
          console.error("SignUpUser error:", err);
          return {
               success: false,
               message: err?.message || "An unexpected error occurred during signup"
          }
     }
}

// SignInUser
export const SignInUser = async(payload) => {
     try {
          const { email, password } = payload;

          if(!email || !password) {
               throw new Error("Email & Password are required");
          }

          const cleanEmail = email.trim().toLowerCase();
          const cleanPassword = password.trim();

          const user = await dbConnect(collections.USERS).findOne({ email: cleanEmail });
          // console.log("SignInUser result from auth:", user);

          if(!user) {
               throw new Error("Invalid email address");
          }

          // যদি ইউজার Google দিয়ে একাউন্ট খুলে থাকে কিন্তু পাসওয়ার্ড দিয়ে লগইন করতে চায়
          if(!user.password) {
               throw new Error("Please sign in with Google");
          }

          const isMatchedPassword = await bcrypt.compare(cleanPassword, user.password);
          if(!isMatchedPassword) {
               throw new Error("Incorrect password");
          }

          // ডাটাবেজের ইউজার অবজেক্ট সরাসরি পাঠাচ্ছি (সংবেদনশীল ডাটা বাদ দিয়ে)
          return {
               _id: user._id.toString(),
               name: user.name,
               email: user.email,
               role: user.role || "user",
               image: user.image || null
          };
     } catch(err) {
          console.error("SignInUser Error:", err.message);
          throw new Error(err.message || "Authentication failed");
     }
}

// Get All Users (Admin)
export const getAllUsers = async () => {
     try {
          const { getServerSession } = await import("next-auth");
          const authOptions = (await import("@/lib/authOptions")).default;
          const session = await getServerSession(authOptions);

          if (!session || session?.user?.role !== "admin") {
               return { success: false, message: "Unauthorized access", users: [] };
          }

          const usersCollection = dbConnect(collections.USERS);
          const rawUsers = await usersCollection.find({}, { projection: { password: 0 } }).toArray();

          const users = rawUsers.map((u) => ({
               ...u,
               _id: u._id.toString(),
               created_at: u.created_at ? new Date(u.created_at).toISOString() : null,
               updated_at: u.updated_at ? new Date(u.updated_at).toISOString() : null,
          }));

          return { success: true, users };
     } catch (err) {
          console.error("getAllUsers error:", err);
          return { success: false, message: err?.message || "Failed to fetch users", users: [] };
     }
};

// Update User Role (Admin)
export const updateUserRole = async (userId, newRole) => {
     try {
          const { getServerSession } = await import("next-auth");
          const authOptions = (await import("@/lib/authOptions")).default;
          const session = await getServerSession(authOptions);
          const { ObjectId } = await import("mongodb");
          const { revalidatePath } = await import("next/cache");

          if (!session || session?.user?.role !== "admin") {
               return { success: false, message: "Unauthorized access" };
          }

          if (!userId || !ObjectId.isValid(userId)) {
               return { success: false, message: "Invalid User ID" };
          }

          const usersCollection = dbConnect(collections.USERS);
          const result = await usersCollection.updateOne(
               { _id: new ObjectId(userId) },
               { $set: { role: newRole, updated_at: new Date() } }
          );

          if (result.modifiedCount > 0) {
               revalidatePath("/dashboard/admin/users");
               revalidatePath("/dashboard/admin");
               return { success: true, message: `User role updated to ${newRole}` };
          } else {
               return { success: false, message: "Role not updated" };
          }
     } catch (err) {
          console.error("updateUserRole error:", err);
          return { success: false, message: err?.message || "Failed to update user role" };
     }
};

// Delete User (Admin)
export const deleteUser = async (userId) => {
     try {
          const { getServerSession } = await import("next-auth");
          const authOptions = (await import("@/lib/authOptions")).default;
          const session = await getServerSession(authOptions);
          const { ObjectId } = await import("mongodb");
          const { revalidatePath } = await import("next/cache");

          if (!session || session?.user?.role !== "admin") {
               return { success: false, message: "Unauthorized access" };
          }

          if (!userId || !ObjectId.isValid(userId)) {
               return { success: false, message: "Invalid User ID" };
          }

          const usersCollection = dbConnect(collections.USERS);
          const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });

          if (result.deletedCount > 0) {
               revalidatePath("/dashboard/admin/users");
               revalidatePath("/dashboard/admin");
               return { success: true, message: "User deleted successfully" };
          } else {
               return { success: false, message: "User not found" };
          }
     } catch (err) {
          console.error("deleteUser error:", err);
          return { success: false, message: err?.message || "Failed to delete user" };
     }
};