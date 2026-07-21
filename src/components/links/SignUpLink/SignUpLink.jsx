"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation"

const SignUpLink = () => {
     const searchParams = useSearchParams();
     const callback = searchParams.get("callbackUrl") || "/";
     // console.log("CallbackUrl from SignUpLink:", callback);

     return (
          <p className="text-center text-sm text-base-content/60 mt-4">
               <span className='text-slate-500'>Don't have an account?</span>{' '}
               <Link href={`/auth/signup?callbackUrl=${callback}`} className="text-warning hover:underline">Sign up</Link>
          </p>
     )
}

export default SignUpLink
