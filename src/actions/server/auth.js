// "use server"

// import collections from "@/lib/collections";
// import dbConnect from "@/lib/dbConnect";
// import bcrypt from "bcryptjs";

// // SignUpUser
// export const SignUpUser = async(payload) => {
//      try{
//           const { name, email, password } = payload;

//           if(!name || !email || !password) {
//                return {
//                     success: false,
//                     message: "All fields are required",
//                     data: null
//                }
//           }

//           const query = { email: email };
//           const isExistsUser = await dbConnect(collections.USERS).findOne(query);
//           // console.log("Find user by email from auth:", isExistsUser)
          
//           if(isExistsUser) {
//                return {
//                     success: false,
//                     message: "User already registered. Please login",
//                     data: null
//                }
//           }

//           const hashPassword = await bcrypt.hash(password, 10);

//           const newUser = {
//                ...payload,
//                password: hashPassword,
//                role: "user",
//                provider: "credentials",
//                created_at: new Date(),
//                updated_at: new Date()
//           };

//           const user = await dbConnect(collections.USERS).insertOne(newUser);
//           // console.log("insert new user to db from auth SignUpUser:", user);

//           return { ...user, insertedId: user?.insertedId.toString() };
//      }catch(err) {
//           console.error("SignUpUser error:", err);

//           return {
//                success: false,
//                message: err?.message || "An unexpected error occurred during signup",
//                data: null
//           }
//      }
// }



// // SignInUser
// export const SignInUser = async(payload) => {
//      try{
//           const { email, password } = payload;

//           if(!email || !password) {
//                throw new Error("Email & Password are required");
//           }

//           const cleanEmail = email.trim().toLowerCase();
//           const cleanPassword = password.trim();

//           const user = await dbConnect(collections.USERS).findOne({ email: cleanEmail });
//           // console.log("Fine user by email from auth:", user);

//           if(!user) {
//                throw new Error("Invalid email");
//           }

//           const isMatchedPassword = await bcrypt.compare(cleanPassword, user?.password);
//           if(!isMatchedPassword) {
//                throw new Error("Incorrect password")
//           }

//           return {
//                success: true,
//                message: "User signin successfully",
//                data: {
//                     ...user, _id: user?._id.toString()
//                }
//           }
//      }catch(err) {
//           console.error(err);

//           return {
//                success: false,
//                message: err?.message || "An unexpected error occurred during signup",
//                data: null
//           }
//      }
// }





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
               throw new Error("Invalid email or password");
          }

          // যদি ইউজার Google দিয়ে একাউন্ট খুলে থাকে কিন্তু পাসওয়ার্ড দিয়ে লগইন করতে চায়
          if(!user.password) {
               throw new Error("Please sign in with Google");
          }

          const isMatchedPassword = await bcrypt.compare(cleanPassword, user.password);
          if(!isMatchedPassword) {
               throw new Error("Invalid email or password");
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