import { GetCartByEmail } from '@/actions/server/addToCart'
import Checkout from '@/components/(pages)/Checkout/Checkout';
import React from 'react'

const CheckoutPage = async() => {
     const cartItems = await GetCartByEmail() || [];

     return (
          <div className='checkoutPage'>
               <Checkout cartItems={cartItems} />
          </div>
     )
}

export default CheckoutPage
