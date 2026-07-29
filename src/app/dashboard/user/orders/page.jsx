import { GetOrderByEmail } from '@/actions/server/order'
import OrdersSection from '@/components/(pages)/Dashboard/OrdersSection/OrdersSection';
import React from 'react'

const Orders = async() => {
     const orderItems = await GetOrderByEmail();

     return (
          <div className='defaultWdith'>
               <h1 className='text-2xl font-medium text-slate-700'>My orders</h1>

               <div className='my-5'>
                    <OrdersSection payload={orderItems} />
               </div>
          </div>
     )
}

export default Orders
