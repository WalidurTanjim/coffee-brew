// import { SignInUser } from "@/actions/server/auth";
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google";
// import envConfig from "./envConfig";

// const authOptions = {
//      // Configure one or more authentication providers
//      providers: [
//           CredentialsProvider({
//                name: 'Credentials',
//                credentials: {},

//                async authorize(credentials, req) {
//                     // console.log("Credentials from authOptions:", credentials);

//                     try{
//                          const user = await SignInUser(credentials);
//                          // console.log("User from credentials:", user);

//                          if(user?.message === "Email & Password are required") {
//                               throw new Error("Email & Password are required")
//                          }

//                          if(user?.message === "Invalid email") {
//                               throw new Error("Invalid email")
//                          }

//                          if(user?.message === "Incorrect password") {
//                               throw new Error("Incorrect password")
//                          }

//                          return user;
//                     }catch(err) {
//                          console.error(err);
//                          throw new Error(err?.message || "Authentication failed");
//                     }
//                }
//           }),
//           GoogleProvider({
//                clientId: envConfig.GOOGLE_CLIENT_ID,
//                clientSecret: envConfig.GOOGLE_CLIENT_SECRET
//           })
//      ],
//      callbacks: {
//           async signIn({ user, account, profile, email, credentials }) {
//                console.log("signIn:", { user, account, profile, email, credentials })
//                return true
//           },
//           // async redirect({ url, baseUrl }) {
//           //      return baseUrl
//           // },
//           async session({ session, token, user }) {
//                console.log("session:", { session, token, user })
//                return session
//           },
//           async jwt({ token, user, account, profile, isNewUser }) {
//                console.log("jwt:", { token, user, account, profile, isNewUser })

//                if(user && account?.provider === 'credentials') {
//                     token.name = user?.data?.name,
//                     token.email = user?.data?.email
//                }

//                if(user) {
//                     token.name = user?.name,
//                     token.email = user?.email
//                }

//                return token
//           }
//      }
// }

// export default authOptions;





import { SignInUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import envConfig from "./envConfig";
import dbConnect from "./dbConnect";
import collections from "./collections";

const authOptions = {
     providers: [
          CredentialsProvider({
               name: 'Credentials',
               credentials: {},

               async authorize(credentials) {
                    console.log({ credentials })
                    try {
                         const user = await SignInUser(credentials);
                         // authorize সঠিকভাবে ইউজারের অবজেক্ট পেলে লগইন সফল ধরে নেয়
                         console.log("User from authOptions credentials:", user);

                         if (user) return user;
                         return null;
                    } catch(err) {
                         throw new Error(err.message || "Invalid credentials");
                    }
               }
          }),
          GoogleProvider({
               clientId: envConfig.GOOGLE_CLIENT_ID,
               clientSecret: envConfig.GOOGLE_CLIENT_SECRET
          })
     ],
     callbacks: {
          // ১. সাইন-ইন চেক ও গুগল ইউজারের তথ্য ডাটাবেজে সেভ
          async signIn({ user, account, profile }) {
               console.log("signIn from callbacks:", { user, account })

               if (account?.provider === "google") {
                    try {
                         const usersCollection = dbConnect(collections.USERS);
                         const existingUser = await usersCollection.findOne({ email: user.email });

                         if (!existingUser) {
                              // গুগল ইউজার ডাটাবেজে না থাকলে নতুন সেভ হবে
                              const newUser = {
                                   name: user.name,
                                   email: user.email,
                                   image: user.image,
                                   role: "user",
                                   provider: "google",
                                   created_at: new Date(),
                                   updated_at: new Date()
                              };
                              const res = await usersCollection.insertOne(newUser);
                              user._id = res.insertedId.toString();
                              user.role = "user";
                         } else {
                              user._id = existingUser._id.toString();
                              user.role = existingUser.role || "user";
                         }
                    } catch (error) {
                         console.error("Error saving google user to DB:", error);
                         return false; // ত্রুটি হলে লগইন আটকে দেবে
                    }
               }
               return true;
          },

          // ২. টোকেনে ডাটা সেভ (Google ও Credentials উভয়ের জন্য সমান)
          async jwt({ token, user, trigger, session }) {
               console.log("jwt callbacks:", { token, user, trigger, session })

               // প্রথমবার সাইন ইন করার সময় 'user' এ তথ্য পাওয়া যায়
               if (user) {
                    token.id = user._id || user.id;
                    token.name = user.name;
                    token.email = user.email;
                    token.role = user.role || "user";
                    token.picture = user.image;
               }
               return token;
          },

          // ৩. ফ্রন্টএন্ড সেশনে ডাটা এভেলেবল করা
          async session({ session, token }) {
               console.log("session from callbacks:", { session, token })
               if (token) {
                    session.user.id = token.id;
                    session.user.name = token.name;
                    session.user.email = token.email;
                    session.user.role = token.role;
                    session.user.image = token.picture;
               }
               return session;
          }
     },
     session: {
          strategy: "jwt"
     }
}

export default authOptions;