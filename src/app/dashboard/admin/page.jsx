import { getAllCoffee } from "@/actions/server/coffee";
import { getAllOrders } from "@/actions/server/order";
import { getAllUsers } from "@/actions/server/auth";
import Link from "next/link";
import {
     BanknotesIcon,
     ShoppingBagIcon,
     UsersIcon,
     ClipboardDocumentListIcon,
     PlusIcon,
     ArrowRightIcon,
     ArrowPathIcon
} from "@heroicons/react/24/outline";

export const revalidate = 0;

export default async function AdminDashboardPage() {
     const [coffees, ordersRes, usersRes] = await Promise.all([
          getAllCoffee(),
          getAllOrders(),
          getAllUsers()
     ]);

     const orders = ordersRes?.data || [];
     const users = usersRes?.users || [];

     // Calculate metrics
     const totalRevenue = orders.reduce((acc, order) => acc + (order?.summary?.grandTotal || 0), 0);
     const pendingOrders = orders.filter((o) => o.status === "Pending" || !o.status).length;
     const totalCoffees = coffees.length;
     const totalUsers = users.length;

     return (
          <div className="space-y-8">
               {/* Welcome Banner */}
               <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="space-y-2">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30">
                                   ⚡ Admin Control Center
                              </span>
                              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                   Website Overview & Controls
                              </h1>
                              <p className="text-slate-300 text-sm max-w-xl">
                                   Monitor store analytics, manage coffee inventory, process customer orders, and update user access rights from your central management hub.
                              </p>
                         </div>

                         <div className="flex flex-wrap items-center gap-3">
                              <Link
                                   href="/dashboard/admin/add-coffee"
                                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-700 focus:bg-slate-700 disabled:bg-slate-500 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
                              >
                                   <PlusIcon className="h-5 w-5" />
                                   <span>Add Coffee</span>
                              </Link>
                              <Link
                                   href="/dashboard/admin/orders"
                                   className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
                              >
                                   <ClipboardDocumentListIcon className="h-5 w-5" />
                                   <span>Manage Orders</span>
                              </Link>
                         </div>
                    </div>

                    {/* Decorative Background Glow */}
                    <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
               </div>

               {/* Metrics Stats Grid */}
               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Revenue Card */}
                    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                   Total Revenue
                              </span>
                              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 border border-emerald-100">
                                   <BanknotesIcon className="h-6 w-6" />
                              </div>
                         </div>
                         <div className="mt-4">
                              <div className="text-3xl font-extrabold text-slate-900">
                                   ${totalRevenue.toFixed(2)}
                              </div>
                              <p className="mt-1 text-xs text-slate-500">
                                   Gross earnings from customer checkout
                              </p>
                         </div>
                    </div>

                    {/* Total Orders Card */}
                    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                   Total Orders
                              </span>
                              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 border border-blue-100">
                                   <ClipboardDocumentListIcon className="h-6 w-6" />
                              </div>
                         </div>
                         <div className="mt-4">
                              <div className="text-3xl font-extrabold text-slate-900">
                                   {orders.length}
                              </div>
                              <div className="mt-1 flex items-center gap-1.5">
                                   <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                                   <span className="text-xs text-slate-500 font-medium">
                                        {pendingOrders} pending fulfillment
                                   </span>
                              </div>
                         </div>
                    </div>

                    {/* Coffees Count Card */}
                    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                   Active Products
                              </span>
                              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 border border-amber-100">
                                   <ShoppingBagIcon className="h-6 w-6" />
                              </div>
                         </div>
                         <div className="mt-4">
                              <div className="text-3xl font-extrabold text-slate-900">
                                   {totalCoffees}
                              </div>
                              <p className="mt-1 text-xs text-slate-500">
                                   Coffee varieties listed in store
                              </p>
                         </div>
                    </div>

                    {/* Users Count Card */}
                    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                   Registered Users
                              </span>
                              <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600 border border-purple-100">
                                   <UsersIcon className="h-6 w-6" />
                              </div>
                         </div>
                         <div className="mt-4">
                              <div className="text-3xl font-extrabold text-slate-900">
                                   {totalUsers}
                              </div>
                              <p className="mt-1 text-xs text-slate-500">
                                   Customer accounts registered
                              </p>
                         </div>
                    </div>
               </div>

               {/* Main Grid: Recent Orders Feed & Quick Actions */}
               <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Recent Orders List (2 columns) */}
                    <div className="lg:col-span-2 space-y-4">
                         <div className="flex items-center justify-between">
                              <div>
                                   <h2 className="text-xl font-bold text-slate-900">Recent Customer Orders</h2>
                                   <p className="text-xs text-slate-500">Latest orders placed on the store</p>
                              </div>
                              <Link
                                   href="/dashboard/admin/orders"
                                   className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                              >
                                   <span>View All</span>
                                   <ArrowRightIcon className="h-3.5 w-3.5" />
                              </Link>
                         </div>

                         {orders.length === 0 ? (
                              <div className="rounded-2xl bg-white p-8 border border-slate-200 text-center space-y-3">
                                   <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                                        <ClipboardDocumentListIcon className="h-6 w-6" />
                                   </div>
                                   <p className="text-sm font-medium text-slate-600">No orders received yet.</p>
                              </div>
                         ) : (
                              <div className="divide-y divide-slate-100 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
                                   {orders.slice(0, 5).map((order) => (
                                        <div key={order._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                                             <div className="space-y-1">
                                                  <div className="flex items-center gap-2">
                                                       <span className="text-xs font-mono font-bold text-slate-900">
                                                            #{order._id.slice(-8)}
                                                       </span>
                                                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                            order.status === "Delivered" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                            order.status === "Processing" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                            order.status === "Cancelled" ? "bg-red-50 text-red-700 border-red-200" :
                                                            "bg-amber-50 text-amber-700 border-amber-200"
                                                       }`}>
                                                            {order.status || "Pending"}
                                                       </span>
                                                  </div>
                                                  <p className="text-xs text-slate-500">
                                                       Customer: <span className="font-medium text-slate-700">{order.user?.email || "Guest"}</span>
                                                  </p>
                                             </div>

                                             <div className="flex items-center justify-between sm:justify-end gap-4 text-right">
                                                  <div>
                                                       <div className="text-sm font-bold text-slate-900">
                                                            ${(order.summary?.grandTotal || 0).toFixed(2)}
                                                       </div>
                                                       <div className="text-xs text-slate-400">
                                                            {order.items?.length || 0} item(s)
                                                       </div>
                                                  </div>
                                                  <Link
                                                       href="/dashboard/admin/orders"
                                                       className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-amber-600 hover:text-white font-medium text-xs transition-colors"
                                                  >
                                                       Manage
                                                  </Link>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         )}
                    </div>

                    {/* Quick Control Center (1 column) */}
                    <div className="space-y-6">
                         <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-4">
                              <h3 className="text-lg font-bold text-slate-900">Quick Administrative Actions</h3>
                              <div className="space-y-3">
                                   <Link
                                        href="/dashboard/admin/add-coffee"
                                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all group"
                                   >
                                        <div className="flex items-center gap-3">
                                             <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                                                  ☕
                                             </div>
                                             <div>
                                                  <div className="text-sm font-semibold text-slate-800 group-hover:text-amber-700">
                                                       Create Coffee Product
                                                  </div>
                                                  <div className="text-xs text-slate-500">Add new item to catalog</div>
                                             </div>
                                        </div>
                                        <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-amber-600" />
                                   </Link>

                                   <Link
                                        href="/dashboard/admin/my-coffee"
                                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                                   >
                                        <div className="flex items-center gap-3">
                                             <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                                  📦
                                             </div>
                                             <div>
                                                  <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                                                       Coffee Inventory
                                                  </div>
                                                  <div className="text-xs text-slate-500">Edit or remove product items</div>
                                             </div>
                                        </div>
                                        <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                                   </Link>

                                   <Link
                                        href="/dashboard/admin/users"
                                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 transition-all group"
                                   >
                                        <div className="flex items-center gap-3">
                                             <div className="h-9 w-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                                                  👥
                                             </div>
                                             <div>
                                                  <div className="text-sm font-semibold text-slate-800 group-hover:text-purple-700">
                                                       User Roles & Access
                                                  </div>
                                                  <div className="text-xs text-slate-500">Promote users to Admin</div>
                                             </div>
                                        </div>
                                        <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-purple-600" />
                                   </Link>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
