"use client"

import { useEffect, useMemo, useState } from "react"
import CartItem from "../CartItem/CartItem";

const CartSection = ({ cartItems }) => {
     const initialItems = cartItems?.cartItems || [];
     const [cartItemsState, setCartItemsState] = useState(initialItems);
     // console.log(cartItemsState)

     // calculate total cart items quantity
     const totalItems = useMemo(() => cartItemsState.reduce((acu, item) => acu + item?.quantity, 0), [cartItemsState])
     // console.log({ totalItems })

     // calculate cart items total price
     const calculatePrice = useMemo(() => cartItemsState.reduce((acu, item) => acu + (item?.quantity * item?.price), 0), [cartItemsState])
     const totalPrice = Math.ceil(calculatePrice);
     // console.log("Total price:", totalPrice);

     useEffect(() => {
          if (cartItems?.cartItems) {
               setCartItemsState(cartItems.cartItems);
          }
     }, [cartItems]);

     // removeItem
     const removeItem = (id) => {
          setCartItemsState(prevItems => prevItems.filter(item => item?._id !== id));
     }

     // incrementQuantityItem
     const incrementQuantityItem = (id, q) => {
          setCartItemsState(prevItems => prevItems.map(item => item?._id == id ? {
               ...item, quantity: q
          } : item))
     }

     // decrementQuantityItem
     const decrementQuantityItem = (id, q) => {
          setCartItemsState(prevItem => prevItem.map(item => item?._id == id ? {
               ...item, quantity: q
          } : item))
     }

     return (
          <div className="cartSection">
               <div className="grid gap-5 grid-cols-1 lg:grid-cols-6">
                    {/* cart items */}
                    <div className="cartItems col-span-1 lg:col-span-4 order-2 lg:order-1">
                         {
                              cartItemsState.map(item => <CartItem key={item?._id} item={item} removeItem={removeItem} incrementQuantityItem={incrementQuantityItem} decrementQuantityItem={decrementQuantityItem} />)
                         }
                    </div>

                    {/* price calculation */}
                    <div className="priceCalculation col-span-1 lg:col-span-2 order-1 lg:order-2">
                         <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-4">Order Summary</h2>
                              
                              <div className="space-y-3">
                                   <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Items</span>
                                        <span className="font-medium text-gray-800">{totalItems ? totalItems : 0}</span>
                                   </div>
                                   
                                   <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium text-gray-800">${totalPrice ? totalPrice : 0}</span>
                                   </div>
                                   
                                   <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                   </div>
                                   
                                   <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-medium text-gray-800">$0.00</span>
                                   </div>
                              </div>
                              
                              <div className="border-t border-gray-200 mt-4 pt-4">
                                   <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-800">Total</span>
                                        <span className="text-xl font-bold text-red-600">${totalPrice ? totalPrice : 0}</span>
                                   </div>
                              </div>
                              
                              {/* calculation and checkout button section */}
                              <div className="mt-5">
                                   <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Proceed to Checkout</button>
                                   
                                   <div className="mt-3 text-center">
                                        <p className="text-xs text-gray-500">Secure checkout · Free shipping on all orders</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default CartSection
