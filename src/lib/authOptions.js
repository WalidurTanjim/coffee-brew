import { SignInUser } from "@/actions/server/auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
     // Configure one or more authentication providers
     providers: [
          CredentialsProvider({
               name: 'Credentials',
               credentials: {},

               async authorize(credentials, req) {
                    try{
                         const user = await SignInUser(credentials);
                         // console.log("Loggedin user credential from authOptions:", user);
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
     ],
     callbacks: {
          async signIn({ user, account, profile, email, credentials }) {
               // console.log("SignIn:", { user, account, profile, email, credentials })
               return true
          },
          async redirect({ url, baseUrl }) {
               // console.log("Redirect:", { url, baseUrl })
               return baseUrl
          },
          async session({ session, token, user }) {
               // console.log("Session:", { session, token, user })
               return session
          },
          async jwt({ token, user, account, profile, isNewUser }) {
               // console.log("JWT:", { token, user, account, profile, isNewUser })
               return token
          }
     }
}

export default authOptions;
