import { getAllOrders } from "@/actions/server/order";
import AdminOrdersControl from "./AdminOrdersControl";

export const revalidate = 0;

export default async function AdminOrdersPage() {
     const ordersRes = await getAllOrders();
     const orders = ordersRes?.data || [];

     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                         Customer Orders Control Center
                    </h1>
                    <p className="text-sm text-slate-500">
                         Track, update order status (Pending, Processing, Shipped, Delivered), and manage customer orders across the platform.
                    </p>
               </div>

               <AdminOrdersControl initialOrders={orders} />
          </div>
     );
}
