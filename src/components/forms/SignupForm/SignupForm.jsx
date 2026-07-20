"use client";

import React, { useState } from 'react';
import { EnvelopeIcon, UserIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { SignUpUser } from '@/actions/server/auth';

const SignupForm = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const [success, setSuccess] = useState(false);

     const handleSignup = async(e) => {
          e.preventDefault();

          // reset states
          setError('');
          setLoading(true);
          setSuccess(false);
          
          const form = e.target;
          const fullname = form.fullname.value;
          const email = form.email.value;
          const password = form.password.value;
          const payload = { fullname, email, password };

          // console.log("Signup payload:", payload);

          try{
               const result = await SignUpUser(payload);
               // console.log("Signup result:", result);

               if(result?.success) {
                    alert(`${result?.message}, ${result?.data?.insertedId}`);
                    setSuccess(true);
               }else{
                    alert(`${result?.message}`)
               }
          }catch(err) {
               console.error(err);

               setError(err?.message === 'Failed to fetch' 
                         ? 'Network error. Please check your connection.' 
                         : 'Something went wrong. Please try again later.'
                    );
          }finally{
               setLoading(false);
               form.reset();
          }
     };

     const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
     };

     return (
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
               <div className="space-y-4">
                    {/* Full Name Field */}
                    <div>
                         <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>

                         <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                   <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </div>

                              <input id="fullname" name="fullname" type="text" autoComplete="name" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="John Doe" />
                         </div>
                    </div>

                    {/* Email Field */}
                    <div>
                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>

                         <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                   <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </div>

                              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="you@example.com" />
                         </div>
                    </div>

                    {/* Password Field */}
                    <div>
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

               <div>
                    <button type="submit" disabled={loading} className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800'}`}>{loading ? <ArrowPathIcon className="h-5 w-5" aria-hidden="true" /> : "Sign up"}</button>
               </div>
          </form>
     );
};

export default SignupForm;