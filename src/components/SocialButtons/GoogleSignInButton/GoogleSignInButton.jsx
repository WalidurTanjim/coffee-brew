"use client"

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const GoogleSignInButton = () => {
     const searchParams = useSearchParams();
     const callback = searchParams.get("callbackUrl") || "/";

     const handleGoogleSignIn = () => {
          // OAuth এর জন্য redirect: true রাখা উচিত
          signIn("google", { callbackUrl: callback });
     }
     
     return (
          <div className="mt-4">
               <button type="button" onClick={handleGoogleSignIn}  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors">Signin via Google</button>
          </div>
     )
}

export default GoogleSignInButton;