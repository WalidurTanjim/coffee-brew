"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation"

const SignInLink = () => {
     const searchParams = useSearchParams();
     const callback = searchParams.get("callbackUrl");
     // console.log("CallbackUrl from SignInLink:", callback);

     return (
          <p className="text-center text-sm text-base-content/60 mt-4">
               <span className='text-slate-500'>Already have an account?</span>{' '}
               <Link href={`/auth/signin?callbackUrl=${callback}`} className="text-warning hover:underline">Sign in</Link>
          </p>
     )
}

export default SignInLink
