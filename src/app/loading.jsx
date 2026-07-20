import React from 'react';
import Image from 'next/image';

const DefaultLoading = () => {
     return (
          <div className="min-h-[60vh] flex items-center justify-center px-4">
               <div className="text-center">
                    {/* Animated Coffee Cup */}
                    <div className="relative inline-block mb-6">
                         <div className="w-20 h-20 mx-auto bg-amber-50 rounded-full flex items-center justify-center border-2 border-amber-200">
                              {/* <LifebuoyIcon className="h-10 w-10 text-amber-700 animate-pulse" /> */}
                              <Image alt='Logo' src={`/assets/logo.png`} width={100} height={100} className='animate-pulse rounded-full' />
                         </div>

                         {/* Steam Animation */}
                         <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
                              <span className="text-amber-400 text-xl animate-bounce" style={{ animationDelay: '0s' }}>~</span>
                              <span className="text-amber-400 text-xl animate-bounce" style={{ animationDelay: '0.15s' }}>~</span>
                              <span className="text-amber-400 text-xl animate-bounce" style={{ animationDelay: '0.3s' }}>~</span>
                         </div>
                    </div>

                    {/* Loading Text */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Brewing Your Coffee</h3>
                    <p className="text-gray-500 text-sm">Please wait while we prepare your order...</p>

                    {/* Loading Spinner Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                         <div className="w-2.5 h-2.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                         <div className="w-2.5 h-2.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-2.5 h-2.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
               </div>
          </div>
     );
};

export default DefaultLoading;