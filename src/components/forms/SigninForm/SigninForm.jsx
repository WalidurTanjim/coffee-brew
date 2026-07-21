"use client";

import React, { useState } from 'react';
import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

const SigninForm = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const [success, setSuccess] = useState(false);

     const router = useRouter();

     const handleSignup = async(e) => {
          e.preventDefault();

          setError('');
          setLoading(true);
          setSuccess(false);
          
          const form = e.target;
          const email = form.email.value;
          const password = form.password.value;
          const payload = { email, password };
          // console.log("Signup payload:", payload);

          try{
               const result = await signIn("credentials", { email: payload?.email, password: payload?.password, redirect: false });
               // console.log("Signin result from client:", result);

               if(result?.status === 401) {
                    setError(result?.error)
               }

               if(result?.status === 200) {
                    router.push(result?.url);
               }
          }catch(err){
               console.error("Signin error from SigninForm:", err);

               setError(err?.message === 'Failed to fetch' 
                         ? 'Network error. Please check your connection.' 
                         : 'Something went wrong. Please try again later.'
                    );
          }finally{
               setLoading(false);
               // form.reset();
          }
     };
     console.log("error state bottom:", error)

     const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
     };

     return (
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
               <div className="m-0">
                    {/* Email Field */}
                    <div className='mb-4'>
                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>

                         <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                   <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </div>

                              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="you@example.com" />
                         </div>
                    </div>

                    {/* Password Field */}
                    <div className='mb-4'>
                         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>

                         <div className="relative">
                              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="••••••••" />

                              <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                   {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                   ) : (
                                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                   )}
                              </button>
                         </div>
                    </div>
               </div>

               <div className='m-0'>
                    { error ? <span className='text-xs text-red-500 font-medium'>** {error}</span> : '' }
               </div>

               <div className='mt-4'>
                    <button type="submit" disabled={loading} className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800'}`}>{loading ? <ArrowPathIcon className="h-5 w-5" aria-hidden="true" /> : "Sign in"}</button>
               </div>
          </form>
     );
};

export default SigninForm;