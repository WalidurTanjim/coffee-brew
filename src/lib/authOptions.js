import { SignInUser } from "@/actions/server/auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import envConfig from "./envConfig";

const authOptions = {
     // Configure one or more authentication providers
     providers: [
          CredentialsProvider({
               name: 'Credentials',
               credentials: {},

               async authorize(credentials, req) {
                    try{
                         const user = await SignInUser(credentials);
                         console.log("Loggedin user credential from authOptions:", user);
                         if(user?.message === "All fields are required") {
                              throw new Error("All fields are required");
                         }

                         if(user?.message === "Invalid email") {
                              throw new Error("Invalid email")
                         }

                         if(user?.message === "Incorrect password") {
                              throw new Error("Incorrect password");
                         }
                         return user
                    }catch(err) {
                         throw new Error(err?.message || "Authentication failed");
                    }
               }
          }),
          GoogleProvider({
               clientId: envConfig.GOOGLE_CLIENT_ID,
               clientSecret: envConfig.GOOGLE_CLIENT_SECRET
          })
     ],
     callbacks: {
          async signIn({ user, account, profile, email, credentials }) {
               // console.log("SignIn:", { user, account, profile, email, credentials })
               if(!user) {
                    throw new Error("Signin failed.");
               }
               return true;
          },
          // async redirect({ url, baseUrl }) {
          //      // console.log("Redirect:", { url, baseUrl })
          //      return baseUrl
          // },
          async session({ session, token, user }) {
               console.log("Session:", { session, token, user })

               if(token) {
                    session.role = token?.role
               }

               return session
          },
          async jwt({ token, user, account, profile, isNewUser }) {
               console.log("JWT:", { token, user, account, profile, isNewUser })

               if(user) {
                    token.name = user?.data?.name,
                    token.email = user?.data?.email,
                    token.role = user?.data?.role
               }

               if(!user) {
                    console.log("User not found inside jwt")
               }
               return token
          }
     }
}

export default authOptions;
