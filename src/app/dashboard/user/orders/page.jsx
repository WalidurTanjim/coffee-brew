import { GetOrderByEmail } from "@/actions/server/order";
import OrdersSection from "@/components/(pages)/Dashboard/OrdersSection/OrdersSection";
import React from "react";

export const revalidate = 0;

const UserOrdersPage = async () => {
     const orderItems = await GetOrderByEmail();

     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                         My Order History
                    </h1>
                    <p className="text-sm text-slate-500">
                         View your past coffee orders, track delivery status, and review order totals.
                    </p>
               </div>

               <div className="my-5">
                    <OrdersSection payload={orderItems} />
               </div>
          </div>
     );
};

export default UserOrdersPage;
