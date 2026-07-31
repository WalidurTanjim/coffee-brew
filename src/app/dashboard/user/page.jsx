import authOptions from "@/lib/authOptions";
import { GetOrderByEmail } from "@/actions/server/order";
import { GetCartByEmail } from "@/actions/server/addToCart";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import {
     ShoppingBagIcon,
     ClipboardDocumentListIcon,
     ShoppingCartIcon,
     ArrowRightIcon,
     UserIcon,
     SparklesIcon
} from "@heroicons/react/24/outline";

export const revalidate = 0;

export default async function UserDashboardPage() {
     const session = await getServerSession(authOptions);
     const userName = session?.user?.name || "Coffee Lover";
     const userEmail = session?.user?.email || "";
     const userImage = session?.user?.image || null;

     const [ordersRes, cartRes] = await Promise.all([
          GetOrderByEmail(),
          GetCartByEmail()
     ]);

     const orders = ordersRes?.data || [];
     const cartItems = cartRes?.cartItems || [];

     const totalSpent = orders.reduce((acc, order) => acc + (order?.summary?.grandTotal || 0), 0);
     const cartCount = cartItems.length;

     return (
          <div className="space-y-8">
               {/* Welcome Banner */}
               <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="flex items-center gap-5">
                              <div className="relative h-16 w-16 rounded-full border-2 border-amber-500 overflow-hidden bg-slate-800 flex items-center justify-center shrink-0">
                                   {userImage ? (
                                        <Image
                                             src={userImage}
                                             alt="Profile avatar"
                                             width={64}
                                             height={64}
                                             className="h-full w-full object-cover"
                                        />
                                   ) : (
                                        <span className="text-2xl font-bold text-white">
                                             {userName.charAt(0).toUpperCase()}
                                        </span>
                                   )}
                              </div>

                              <div className="space-y-1">
                                   <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                             Welcome back, {userName}!
                                        </h1>
                                        <SparklesIcon className="h-5 w-5 text-amber-400" />
                                   </div>
                                   <p className="text-slate-300 text-xs sm:text-sm">
                                        {userEmail} • Coffee Enthusiast Account
                                   </p>
                              </div>
                         </div>

                         <div className="flex flex-wrap items-center gap-3">
                              <Link
                                   href="/coffee"
                                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-600/30"
                              >
                                   <ShoppingBagIcon className="h-5 w-5" />
                                   <span>Explore Shop</span>
                              </Link>
                              <Link
                                   href="/dashboard/user/cart"
                                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
                              >
                                   <ShoppingCartIcon className="h-5 w-5" />
                                   <span>View Cart ({cartCount})</span>
                              </Link>
                         </div>
                    </div>

                    {/* Decorative Background Effects */}
                    <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
               </div>

               {/* Metric Cards */}
               <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {/* Orders Placed */}
                    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                   Total Orders Placed
                              </span>
                              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 border border-blue-100">
                                   <ClipboardDocumentListIcon className="h-6 w-6" />
                              </div>
                         </div>
                         <div className="mt-4">
                              <div className="text-3xl font-extrabold text-slate-900">
                                   {orders.length}
                              </div>
                              <p className="mt-1 text-xs text-slate-500">
                                   Orders submitted on Coffee Brew
                              </p>
                         </div>
                    </div>

                    {/* Cart Items */}
                    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                   Items in Cart
                              </span>
                              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 border border-amber-100">
                                   <ShoppingCartIcon className="h-6 w-6" />
                              </div>
                         </div>
                         <div className="mt-4">
                              <div className="text-3xl font-extrabold text-slate-900">
                                   {cartCount}
                              </div>
                              <p className="mt-1 text-xs text-slate-500">
                                   Coffee products waiting in your cart
                              </p>
                         </div>
                    </div>

                    {/* Total Spent */}
                    <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                   Total Coffee Investment
                              </span>
                              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 border border-emerald-100">
                                   <ShoppingBagIcon className="h-6 w-6" />
                              </div>
                         </div>
                         <div className="mt-4">
                              <div className="text-3xl font-extrabold text-slate-900">
                                   ${totalSpent.toFixed(2)}
                              </div>
                              <p className="mt-1 text-xs text-slate-500">
                                   Total spent across all completed orders
                              </p>
                         </div>
                    </div>
               </div>

               {/* Recent Orders Section */}
               <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <div>
                              <h2 className="text-xl font-bold text-slate-900">My Recent Orders</h2>
                              <p className="text-xs text-slate-500">Track status and review your recent coffee orders</p>
                         </div>
                         <Link
                              href="/dashboard/user/orders"
                              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                         >
                              <span>View All Orders</span>
                              <ArrowRightIcon className="h-3.5 w-3.5" />
                         </Link>
                    </div>

                    {orders.length === 0 ? (
                         <div className="rounded-2xl bg-white p-12 border border-slate-200 text-center space-y-4">
                              <div className="h-14 w-14 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center text-2xl">
                                   ☕
                              </div>
                              <div className="space-y-1 max-w-sm mx-auto">
                                   <h3 className="text-base font-bold text-slate-900">No orders placed yet</h3>
                                   <p className="text-xs text-slate-500">
                                        Explore our selection of premium single-origin and blended coffee beans.
                                   </p>
                              </div>
                              <Link
                                   href="/coffee"
                                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-500 transition-colors shadow-md"
                              >
                                   Browse Coffee Catalog
                              </Link>
                         </div>
                    ) : (
                         <div className="divide-y divide-slate-100 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
                              {orders.slice(0, 4).map((order) => (
                                   <div
                                        key={order._id}
                                        className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                                   >
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
                                                  Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
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
                                                  href="/dashboard/user/orders"
                                                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-amber-600 hover:text-white font-medium text-xs transition-colors"
                                             >
                                                  Details
                                             </Link>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>
          </div>
     );
}
