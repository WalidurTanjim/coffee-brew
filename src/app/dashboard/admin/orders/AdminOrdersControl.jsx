"use client"
import React, { useState } from "react";
import { updateOrderStatus, deleteOrder } from "@/actions/server/order";
import Swal from "sweetalert2";
import {
     MagnifyingGlassIcon,
     TrashIcon,
     CheckCircleIcon,
     ClockIcon,
     TruckIcon,
     XCircleIcon,
     InformationCircleIcon
} from "@heroicons/react/24/outline";

export default function AdminOrdersControl({ initialOrders = [] }) {
     const [orders, setOrders] = useState(initialOrders);
     const [searchQuery, setSearchQuery] = useState("");
     const [statusFilter, setStatusFilter] = useState("all");
     const [updatingId, setUpdatingId] = useState(null);

     const filteredOrders = orders.filter((order) => {
          const matchesSearch =
               order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               order.shippingInfo?.address?.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus =
               statusFilter === "all" || (order.status || "Pending").toLowerCase() === statusFilter.toLowerCase();
          return matchesSearch && matchesStatus;
     });

     const handleStatusChange = async (orderId, newStatus) => {
          setUpdatingId(orderId);
          const res = await updateOrderStatus(orderId, newStatus);
          setUpdatingId(null);

          if (res?.success) {
               setOrders((prev) =>
                    prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
               );
               Swal.fire({
                    title: "Status Updated",
                    text: res.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
               });
          } else {
               Swal.fire("Error", res?.message || "Failed to update status", "error");
          }
     };

     const handleDeleteOrder = async (orderId) => {
          const confirm = await Swal.fire({
               title: "Delete Order?",
               text: "Are you sure you want to delete this order record?",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#d33",
               confirmButtonText: "Yes, delete order"
          });

          if (confirm.isConfirmed) {
               const res = await deleteOrder(orderId);
               if (res?.success) {
                    setOrders((prev) => prev.filter((o) => o._id !== orderId));
                    Swal.fire("Deleted!", res.message, "success");
               } else {
                    Swal.fire("Error", res?.message || "Failed to delete order", "error");
               }
          }
     };

     return (
          <div className="space-y-6">
               {/* Search & Filter Bar */}
               <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="relative flex-1">
                         <MagnifyingGlassIcon className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                         <input
                              type="text"
                              placeholder="Search by Order ID, customer email, or shipping address..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                         {["all", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                              <button
                                   key={status}
                                   onClick={() => setStatusFilter(status)}
                                   className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                        statusFilter.toLowerCase() === status.toLowerCase()
                                             ? "bg-slate-900 text-white shadow-sm"
                                             : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                   }`}
                              >
                                   {status === "all" ? "All Statuses" : status}
                              </button>
                         ))}
                    </div>
               </div>

               {/* Orders Feed */}
               {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                         <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                              <InformationCircleIcon className="h-6 w-6" />
                         </div>
                         <p className="text-sm font-medium text-slate-600">No matching orders found.</p>
                    </div>
               ) : (
                    <div className="space-y-4">
                         {filteredOrders.map((order) => {
                              const currentStatus = order.status || "Pending";

                              return (
                                   <div
                                        key={order._id}
                                        className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:border-slate-300 transition-all"
                                   >
                                        {/* Order Top Bar */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-slate-50 border-b border-slate-200">
                                             <div className="space-y-1">
                                                  <div className="flex items-center gap-2">
                                                       <span className="text-xs font-mono font-bold text-slate-800">
                                                            #{order._id.slice(-8)}
                                                       </span>
                                                       <span className="text-xs text-slate-400">
                                                            • Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
                                                       </span>
                                                  </div>
                                                  <p className="text-xs text-slate-600 font-medium">
                                                       Customer: <span className="text-slate-900 font-semibold">{order.user?.email || "N/A"}</span>
                                                  </p>
                                             </div>

                                             {/* Status Selector Control */}
                                             <div className="flex items-center gap-3">
                                                  <div className="flex items-center gap-2">
                                                       <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                            Status:
                                                       </label>
                                                       <select
                                                            disabled={updatingId === order._id}
                                                            value={currentStatus}
                                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer transition-colors ${
                                                                 currentStatus === "Delivered" ? "bg-emerald-50 text-emerald-800 border-emerald-300" :
                                                                 currentStatus === "Processing" ? "bg-blue-50 text-blue-800 border-blue-300" :
                                                                 currentStatus === "Shipped" ? "bg-purple-50 text-purple-800 border-purple-300" :
                                                                 currentStatus === "Cancelled" ? "bg-red-50 text-red-800 border-red-300" :
                                                                 "bg-amber-50 text-amber-800 border-amber-300"
                                                            }`}
                                                       >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Processing">Processing</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                       </select>
                                                  </div>

                                                  <button
                                                       onClick={() => handleDeleteOrder(order._id)}
                                                       className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                       title="Delete Order Record"
                                                  >
                                                       <TrashIcon className="h-4 w-4" />
                                                  </button>
                                             </div>
                                        </div>

                                        {/* Order Items & Shipping Body */}
                                        <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                                             {/* Items List */}
                                             <div className="lg:col-span-2 space-y-3">
                                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                       Ordered Items ({order.items?.length || 0})
                                                  </h4>
                                                  <div className="divide-y divide-slate-100">
                                                       {order.items?.map((item, idx) => (
                                                            <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                                                                 <div className="flex items-center gap-3">
                                                                      <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                                                           {item.image ? (
                                                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                                           ) : (
                                                                                <div className="h-full w-full flex items-center justify-center text-xs">☕</div>
                                                                           )}
                                                                      </div>
                                                                      <div>
                                                                           <div className="font-semibold text-slate-900">{item.name || item.productId?.name || "Coffee"}</div>
                                                                           <div className="text-xs text-slate-500">
                                                                                {item.variant || item.selectedVariant || "Standard"} • Qty: {item.quantity || 1}
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                                 <div className="font-bold text-slate-900">
                                                                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                                                 </div>
                                                            </div>
                                                       ))}
                                                  </div>
                                             </div>

                                             {/* Shipping & Payment Summary */}
                                             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3 text-xs">
                                                  <div>
                                                       <h4 className="font-bold uppercase tracking-wider text-slate-400 mb-1">
                                                            Shipping Destination
                                                       </h4>
                                                       <p className="font-medium text-slate-800">
                                                            {order.shippingInfo?.address || "No shipping address specified"}
                                                       </p>
                                                       <p className="text-slate-500 mt-0.5">
                                                            Phone: {order.shippingInfo?.phone || "N/A"}
                                                       </p>
                                                  </div>

                                                  <div className="border-t border-slate-200 pt-2 space-y-1">
                                                       <div className="flex justify-between text-slate-600">
                                                            <span>Subtotal:</span>
                                                            <span>${(order.summary?.subtotal || 0).toFixed(2)}</span>
                                                       </div>
                                                       <div className="flex justify-between text-slate-600">
                                                            <span>Delivery:</span>
                                                            <span>${(order.summary?.deliveryCharge || 0).toFixed(2)}</span>
                                                       </div>
                                                       <div className="flex justify-between font-bold text-slate-900 text-sm pt-1 border-t border-slate-200">
                                                            <span>Grand Total:</span>
                                                            <span>${(order.summary?.grandTotal || 0).toFixed(2)}</span>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               )}
          </div>
     );
}
