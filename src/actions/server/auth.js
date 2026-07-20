"use server"
import collections from "@/lib/collections";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const SignUpUser = async(payload) => {
     try{
          const { fullname, email, password } = payload;

          if(!fullname || !email || !password) {
               return {
                    success: false,
                    message: "All fields are required",
                    data: null
               }
          }

          const query = { email };
          const isExist = await dbConnect(collections.USERS).findOne(query);
          if(isExist) {
               return {
                    success: false,
                    message: "User already exists",
                    data: null
               }
          }
          // console.log("isExists from auth:", isExist);

          const newPassword = await bcrypt.hash(password, 10);
          const newPayload = { 
               fullname, email, password: newPassword,
               role: "user",
               created_at: new Date(),
               updated_at: new Date()
           };

          const insertUser = await dbConnect(collections.USERS).insertOne(newPayload);

          if(insertUser?.insertedId) {
               // console.log("Insert user from auth:", insertUser);

               const insertedId = insertUser?.insertedId.toString();

               return {
                    success: true,
                    message: "User registered successfully",
                    data: {
                         ...insertUser, insertedId
                    }
               };
          }
     }catch(err) {
          console.error("Signup error:", err);

          return {
               success: false,
               message: err?.message || "An unexpected error occurred during signup",
               data: null
          }
     }
}

