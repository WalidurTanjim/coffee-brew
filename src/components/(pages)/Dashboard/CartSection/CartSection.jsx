"use client"

import { useEffect, useState } from "react"
import CartItem from "../CartItem/CartItem";

const CartSection = ({ cartItems }) => {
     const initialItems = cartItems?.cartItems || [];
     const [cartItemsState, setCartItemsState] = useState(initialItems);
     // console.log(cartItemsState)

     // calculate total cart items
     const totalItems = cartItemsState.reduce((acu, item) => acu + item?.quantity, 0);
     // console.log({ totalItems })

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
               <div className="grid gap-5 grid-cols-1 md:grid-cols-6">
                    {/* cart items */}
                    <div className="col-span-1 md:col-span-4 order-2 md:order-1">
                         {
                              cartItemsState.map(item => <CartItem key={item?._id} item={item} removeItem={removeItem} incrementQuantityItem={incrementQuantityItem} decrementQuantityItem={decrementQuantityItem} />)
                         }
                    </div>

                    {/* price calculation */}
                    <div className="col-span-1 md:col-span-2 py-5 order-1 md:order-2">
                         <h1 className="text-2xl text-slate-700 font-medium">Total items: <span className="text-red-600">{ totalItems ? totalItems : 0}</span></h1>

                         {/* calculation and checkout button section */}
                         <div className="mt-5">

                         </div>
                    </div>
               </div>
          </div>
     )
}

export default CartSection
