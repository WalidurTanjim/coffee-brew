"use client"

import { ConfirmOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

const Checkout = ({ cartItems }) => {
     const initialItems = cartItems?.cartItems || [];
     const [cartItemsState, setCartItemsState] = useState(initialItems);
     const [idempotencyKey] = useState(() => crypto.randomUUID());
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);

     // session
     const session = useSession();
     const userName = session?.data?.user?.name;
     const userEmail = session?.data?.user?.email;
     // console.log(session);

     useEffect(() => {
          if (cartItems?.cartItems) {
               setCartItemsState(cartItems.cartItems);
          }
     }, [cartItems]);

     // calculate total cart items quantity
     const totalItems = useMemo(() => cartItemsState.reduce((acu, item) => acu + item?.quantity, 0), [cartItemsState])
     // console.log({ totalItems })

     // calculate cart items total price
     const calculatePrice = useMemo(() => cartItemsState.reduce((acu, item) => acu + (item?.quantity * item?.price), 0), [cartItemsState])
     const totalPrice = Math.ceil(calculatePrice);
     const deliveryCharge = cartItemsState.length > 0 ? 5 : 0;
     const grandTotal = totalPrice + deliveryCharge;
     // console.log("Total price:", totalPrice);

     // handleConfirmOrder
     const handleConfirmOrder = async(e) => {
          e.preventDefault();
          setError('');

          if(cartItemsState.length === 0) {
               setError("Your cart is empty");
               return;
          }

          const form = e.target;
          const phone = form.phone.value.trim();
          const address = form.address.value.trim();
          const extraNote = form.extraNote.value.trim();

          if (!phone || !address) {
               setError('Please fill in all required fields.');
               return;
          }

          // Complete Order Payload Object
          const payload = {
               user: {
                    name: userName || "Guest",
                    email: userEmail || "N/A",
               },
               shippingInfo: {
                    phone,
                    address,
                    extraNote,
               },
               items: cartItemsState.map((item) => ({
                    productId: item?._id,
                    name: item?.coffeeDetails?.name || "Coffee Product",
                    image: item?.coffeeDetails?.image || "",
                    weight: item?.weight || "N/A",
                    quantity: item?.quantity || 1,
                    price: item?.price || 0,
                    totalItemPrice: (item?.price || 0) * (item?.quantity || 0),
               })),
               summary: {
                    totalItems,
                    subtotal: totalPrice,
                    deliveryCharge,
                    grandTotal,
               },
               orderDate: new Date().toISOString(),
               status: "Pending",
               idempotencyKey
          };

          // console.log("Constructed Order Object:", payload);

          try{
               setLoading(true);

               const result = await ConfirmOrder(payload);
               // console.log(result);

               if(result?.success && result?.orderId) {
                    Swal.fire({
                         title: "Done",
                         text: result?.message,
                         icon: "success"
                    })
               }

               if(!result?.success) {
                    Swal.fire({
                         title: "Sorry",
                         text: result?.message,
                         icon: "error"
                    })
               }
          }catch(err) {
               console.error(err);
               setError('Failed to process order. Please try again.');
          }finally {
               setLoading(false);
          }
     }
     
     return (
          <div className="defaultWidth">
               <div className="grid gap-5 grid-cols-1 lg:grid-cols-6">
                    <div className="orderInformation col-span-1 lg:col-span-4 order-2 lg:order-1">
                         <h2 className="text-xl font-semibold text-slate-800 mb-6 border-b pb-3">Shipping Information</h2>

                         <form onSubmit={handleConfirmOrder} className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Username (Disabled) */}
                              <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-1">
                                   User Name
                                   </label>
                                   <input
                                   type="text"
                                   disabled
                                   value={userName || ""}
                                   placeholder="User Name"
                                   className="w-full px-3 py-2 border border-slate-200 bg-slate-100 text-slate-500 rounded-md text-sm cursor-not-allowed"
                                   />
                              </div>

                              {/* Email (Disabled) */}
                              <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-1">
                                   Email Address
                                   </label>
                                   <input
                                   type="email"
                                   disabled
                                   value={userEmail || ""}
                                   placeholder="User Email"
                                   className="w-full px-3 py-2 border border-slate-200 bg-slate-100 text-slate-500 rounded-md text-sm cursor-not-allowed"
                                   />
                              </div>

                              {/* Phone Number */}
                              <div className="sm:col-span-2">
                                   <label className="block text-sm font-medium text-slate-700 mb-1">
                                   Phone Number <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                   type="tel"
                                   name="phone"
                                   placeholder="+880 1000 000000"
                                   className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                                   />
                              </div>

                              {/* Full Address */}
                              <div className="sm:col-span-2">
                                   <label className="block text-sm font-medium text-slate-700 mb-1">
                                   Delivery Address <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                   type="text"
                                   name="address"
                                   placeholder="Street address, house/apartment number, city"
                                   className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                                   />
                              </div>

                              {/* Extra Note (Optional) */}
                              <div className="sm:col-span-2">
                                   <label className="block text-sm font-medium text-slate-700 mb-1">
                                   Extra Note <span className="text-slate-400 font-normal">(Optional)</span>
                                   </label>
                                   <textarea
                                   rows={3}
                                   name="extraNote"
                                   placeholder="Special instructions for delivery or order notes..."
                                   className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 resize-none"
                                   />
                              </div>
                              </div>

                              <div>
                                   { error ? <p className="text-sm text-red-600">{error}</p> : ''}
                              </div>

                              {/* Confirm Order Button */}
                              <div className="pt-4">
                                   <button type="submit" disabled={loading || cartItemsState.length == 0} className="w-full text-white font-medium py-3 px-6 rounded-md transition-colors text-sm shadow-sm bg-slate-800 hover:bg-slate-700 active:bg-slate-700 focus:bg-slate-700 disabled:bg-slate-500 cursor-pointer disabled:cursor-not-allowed">Confirm Order</button>
                              </div>
                         </form>
                    </div>

                    <div className="priceCalculation col-span-1 lg:col-span-2 order-1 lg:order-2">
                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sticky top-6 shadow-sm">
                              <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-3">Order Summary</h2>

                              {/* Cart Items List */}
                              <div className="divide-y divide-slate-200 max-h-80 overflow-y-auto pr-1 mb-4">
                                   {cartItemsState.length === 0 ? (
                                        <p className="text-sm text-slate-500 py-4 text-center">Your cart is empty.</p>
                                   ) : (
                                        cartItemsState.map((item) => (
                                             <div key={item?._id} className="py-3 flex items-center gap-3">
                                                  {item?.coffeeDetails?.image ? (
                                                       <img src={item.coffeeDetails.image} alt={item.coffeeDetails.name || "Product"} className="w-12 h-12 object-cover rounded border border-slate-200 shrink-0" />
                                                  ) : (
                                                       <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500 shrink-0">No Image</div>
                                                  )}

                                                  <div className="flex-1 min-w-0">
                                                       <h4 className="text-sm font-medium text-slate-900 truncate">{item?.coffeeDetails?.name || "Coffee Product"}</h4>

                                                       <p className="text-xs text-slate-500 mt-0.5">Weight: {item?.weight || "N/A"}</p>
                                                       <p className="text-xs text-slate-500">Qty: {item?.quantity || 1} × ${item?.price || 0}</p>
                                                  </div>

                                                  <div className="text-right shrink-0">
                                                       <span className="text-sm font-semibold text-slate-800">${((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}</span>
                                                  </div>
                                             </div>
                                        ))
                                   )}
                              </div>

                              {/* Detailed Cost Breakdown */}
                              <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
                                   <div className="flex justify-between text-slate-600">
                                        <span>Total Items</span>
                                        <span className="font-semibold text-slate-800">{totalItems}</span>
                                   </div>

                                   <div className="flex justify-between text-slate-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-slate-800">${totalPrice.toFixed(2)}</span>
                                   </div>

                                   <div className="flex justify-between text-slate-600">
                                        <span>Delivery Fee</span>
                                        <span className="font-semibold text-slate-800">${deliveryCharge.toFixed(2)}</span>
                                   </div>

                                   <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-semibold text-slate-900">
                                        <span>Grand Total</span>
                                        <span>${grandTotal.toFixed(2)}</span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div> 
          </div>
     )
}

export default Checkout
