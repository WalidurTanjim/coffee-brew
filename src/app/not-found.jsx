"use client"
import React from 'react';
import Link from 'next/link';
import { HomeIcon, HandRaisedIcon , MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';


const NotFound404 = () => {
     return (
          <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
               <div className="max-w-md w-full text-center">
                    {/* Coffee Cup Illustration */}
                    <div className="mb-8">
                         <div className="relative inline-block">
                              <div className="w-24 h-24 mx-auto bg-amber-50 rounded-full flex items-center justify-center border-2 border-amber-200">
                                   <HandRaisedIcon  className="h-12 w-12 text-amber-700" />
                              </div>
                              {/* Steam effect */}
                              <div className="absolute -top-1 -right-1 flex space-x-1">
                                   <span className="animate-pulse text-amber-400 text-xs">~</span>
                                   <span className="animate-pulse delay-150 text-amber-400 text-xs">~</span>
                                   <span className="animate-pulse delay-300 text-amber-400 text-xs">~</span>
                              </div>
                         </div>
                    </div>

                    {/* Error Code */}
                    <h1 className="text-8xl font-bold text-gray-900 mb-2">404</h1>

                    {/* Message */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Oops! Coffee Not Found</h2>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                         We couldn't find the page you're looking for.
                         It might have been moved, deleted, or never existed.
                         <br />
                         <span className="text-sm text-gray-500 mt-2 block">Don't worry, we have plenty of other great coffees to explore!</span>
                    </p>

                    {/* Search Suggestion */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
                         <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <MagnifyingGlassIcon className="h-4 w-4" />
                              <span className="font-medium">Looking for something specific?</span>
                         </div>

                         <p className="text-sm text-gray-500 pl-6">Try checking the URL or use the navigation above</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                         <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                              <HomeIcon className="h-5 w-5" />Go Home
                         </Link>

                         <button onClick={() => window.history.back()} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                              <ArrowLeftIcon className="h-5 w-5" />Go Back
                         </button>
                    </div>

                    {/* Coffee Suggestion */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                         <p className="text-sm text-gray-500">
                              ☕ Why not try our{' '}
                              <Link href="/products" className="text-amber-700 hover:text-amber-800 font-medium underline-offset-2 hover:underline">selection of premium coffees</Link>{' '}instead?
                         </p>
                    </div>
               </div>
          </div>
     );
};

export default NotFound404;