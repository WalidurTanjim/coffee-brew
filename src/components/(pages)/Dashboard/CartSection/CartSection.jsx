"use client"

import { useEffect, useState } from "react"
import CartItem from "../CartItem/CartItem";

const CartSection = ({ cartItems }) => {
     const initialItems = cartItems?.cartItems || [];
     const [cartItemsState, setCartItemsState] = useState(initialItems);
     // console.log(cartItemsState)

     useEffect(() => {
          if (cartItems?.cartItems) {
               setCartItemsState(cartItems.cartItems);
          }
     }, [cartItems]);

     return (
          <div className="cartSection">
               {
                    cartItemsState.map(item => <CartItem key={item?._id} item={item} />)
               }
          </div>
     )
}

export default CartSection
