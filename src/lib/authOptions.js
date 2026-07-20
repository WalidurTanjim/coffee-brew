import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
     // Configure one or more authentication providers
     providers: [
          CredentialsProvider({
               name: 'Credentials',

               credentials: {
                    username: { label: "Username", type: "text", placeholder: "jsmith" },
                    password: { label: "Password", type: "password" }
               },
               async authorize(credentials, req) {
                    // Return null if user data could not be retrieved
                    return null
               }
          }),
     ],
     callbacks: {
          async signIn({ user, account, profile, email, credentials }) {
               console.log("SignIn:", { user, account, profile, email, credentials })
               return true
          },
          async redirect({ url, baseUrl }) {
               console.log("SignIn:", { url, baseUrl })
               return baseUrl
          },
          async session({ session, token, user }) {
               console.log("SignIn:", { session, token, user })
               return session
          },
          async jwt({ token, user, account, profile, isNewUser }) {
               console.log("SignIn:", { token, user, account, profile, isNewUser })
               return token
          }
     }
}

export default authOptions;
