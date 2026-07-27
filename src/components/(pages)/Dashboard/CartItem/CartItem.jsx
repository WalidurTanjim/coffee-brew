"use client" 

import { useState } from 'react';
import { DecrementCartQuantity, DeleteCartItemById, IncrementCartQuantity } from '@/actions/server/addToCart';
import { HeartIcon, EyeIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

const CartItem = ({ item, removeItem, incrementQuantityItem, decrementQuantityItem }) => {
     // states
     const [loading, setLoading] = useState(false);

     const pathname = usePathname();

     const subtotal = item.price * item.quantity;

     // handleDelete 
     const handleDelete = async() => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
               if (result.isConfirmed) {
                    try{
                         const result = await DeleteCartItemById(item?._id, pathname);
                         
                         if(result?.success) {
                              Swal.fire({
                                   title: "Deleted!",
                                   text: result?.message,
                                   icon: "success"
                              });

                              // removeItem function call to remove cart item from cartItemsState [CartSection.jsx file]
                              removeItem(item?._id)
                         }
                    }catch(err) {
                         console.log(err);
                    }
               }
          });

     }

     // handleIncrementQuantity
     const handleIncrementQuantity = async() => {
          setLoading(true);

          try{
               const result = await IncrementCartQuantity(item?._id);
               // console.log("Increment quantity form client:", result);

               if(result?.success) {
                    Swal.fire({
                         title: "Good job!",
                         text: result?.message,
                         icon: "success"
                    });

                    // increment cart quantity after successfully increment in database
                    incrementQuantityItem(item?._id, item?.quantity + 1);
               }
          }catch(err) {
               console.error(err);
          }finally{
               setLoading(false);
          }
     }

     // handleDecrementQuantity
     const handleDecrementQuantity = async() => {
          setLoading(true);

          try{
               const result = await DecrementCartQuantity(item?._id);
               // console.log("Decrement quantity from client:", result);

               if(result?.success) {
                    Swal.fire({
                         title: "Good job!",
                         text: result?.message,
                         icon: "success"
                    })

                    // decrement cart quantity after successfully decrement in database
                    decrementQuantityItem(item?._id, item?.quantity - 1)
               }else {
                    Swal.fire({
                         title: "Sorry",
                         text: result?.message,
                         icon: "warning"
                    })
               }
          }catch(err) {
               console.error(err);
          }finally{
               setLoading(false);
          }
     }

     return (
          <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 mb-5">
               {/* Product Image */}
               <div className="relative shrink-0 w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden bg-gray-50">
                    <Image src={item.coffeeDetails.image} alt={item.coffeeDetails.name} fill className="object-cover" loading="eager" sizes="(max-width: 640px) 100vw, 96px" />
               </div>

               {/* Product Info */}
               <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                         <div className="flex-1">
                              <h3 className="text-base font-semibold text-gray-900 truncate">{item.coffeeDetails.name}</h3>

                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-sm text-gray-500">
                                   <span>{item.weight}</span>
                                   <span className="hidden sm:inline">•</span>
                                   <span className="capitalize">{item.coffeeDetails.type}</span>
                                   <span className="hidden sm:inline">•</span>
                                   <span className="capitalize">{item.coffeeDetails.roast_level} Roast</span>
                              </div>
                         </div>

                         {/* Price */}
                         <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                              <span className="text-base font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                              <span className="text-xs text-gray-400">${subtotal.toFixed(2)} total</span>
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-50">
                         {/* Quantity Controls */}
                         <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                              <button disabled={loading || item?.quantity == 1} className="p-1.5 rounded-md hover:bg-white transition-colors duration-200 disabled:opacity-30  disabled:cursor-not-allowed" aria-label="Decrease quantity" onClick={handleDecrementQuantity}>
                                   <MinusIcon className={`w-4 h-4 ${loading ? 'text-gray-300' : 'text-gray-600'}`} />
                              </button>

                              <span className="w-8 text-center text-sm font-medium text-gray-700">{item.quantity}</span>

                              <button disabled={loading} className="p-1.5 rounded-md hover:bg-white transition-colors duration-200" aria-label="Increase quantity" onClick={handleIncrementQuantity}>
                                   <PlusIcon className={`w-4 h-4 ${loading ? 'text-gray-300' : 'text-gray-600'}`} />
                              </button>
                         </div>

                         {/* Action Buttons */}
                         <div className="flex items-center gap-1">
                              <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group/btn" aria-label="Add to wishlist">
                                   <HeartIcon className="w-4 h-4 text-gray-400 group-hover/btn:text-gray-600 transition-colors" />
                              </button>

                              <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200" aria-label="View details">
                                   <EyeIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                              </button>

                              <button className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200" aria-label="Remove from cart" onClick={handleDelete}>
                                   <TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default CartItem;
