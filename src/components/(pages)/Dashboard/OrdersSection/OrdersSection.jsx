import OrderCard from '@/components/cards/OrderCard/OrderCard';
import React from 'react'

const OrdersSection = async({ payload }) => {
     const { data = [] } = await payload;

     return (
          <div>
               {
                    data.map(order => <OrderCard  key={order?._id} order={order} />)
               }
          </div>
     )
}

export default OrdersSection
