import React from 'react';

const OrderCard = ({ order }) => {
     if (!order) return null;

     const {
          _id,
          orderDate,
          status,
          items = [],
          summary = {},
          shippingInfo = {},
     } = order;

     // Format date cleanly
     const formattedDate = orderDate
          ? new Date(orderDate).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'short',
               day: 'numeric',
          })
          : 'N/A';

     // Status badge style helper
     const getStatusBadgeStyle = (status) => {
          switch (status?.toLowerCase()) {
               case 'delivered':
                    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
               case 'processing':
                    return 'bg-blue-50 text-blue-700 border-blue-200';
               case 'cancelled':
                    return 'bg-red-50 text-red-700 border-red-200';
               default: // Pending, etc.
                    return 'bg-amber-50 text-amber-700 border-amber-200';
          }
     };

     return (
          <div className="w-full bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden mb-6">
               {/* Header: Order ID, Date, and Status */}
               <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-stone-50/80 border-b border-stone-200">
                    <div className="space-y-1">
                         <div className="flex items-center gap-2">
                              <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                                   Order ID
                              </span>
                              <span className="text-sm font-mono text-stone-800 font-semibold">
                                   #{_id?.slice(-8)}
                              </span>
                         </div>
                         <p className="text-xs text-stone-500">Placed on {formattedDate}</p>
                    </div>

                    <div className="flex items-center gap-3">
                         <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyle(
                                   status
                              )}`}
                         >
                              {status || 'Pending'}
                         </span>
                    </div>
               </div>

               {/* Main Content Body */}
               <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Items List */}
                    <div className="lg:col-span-2 space-y-4">
                         <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                              Items ({summary?.totalItems || items.length})
                         </h4>

                         <div className="divide-y divide-stone-100">
                              {items.map((item, index) => {
                                   // Access item structure safely
                                   const name = item?.name || item?.productId?.name || 'Coffee Item';
                                   const image = item?.image || item?.productId?.image;
                                   const price = item?.price || 0;
                                   const quantity = item?.quantity || 1;
                                   const variant = item?.selectedVariant || item?.variant;

                                   return (
                                        <div
                                             key={item?.productId?._id || index}
                                             className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                                        >
                                             <div className="flex items-center gap-3">
                                                  {/* Thumbnail */}
                                                  <div className="w-12 h-12 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0">
                                                       {image ? (
                                                            <img
                                                                 src={image}
                                                                 alt={name}
                                                                 className="w-full h-full object-cover"
                                                            />
                                                       ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                                                                 Coffee
                                                            </div>
                                                       )}
                                                  </div>

                                                  {/* Details */}
                                                  <div>
                                                       <h5 className="text-sm font-medium text-stone-900">
                                                            {name}
                                                       </h5>
                                                       <p className="text-xs text-stone-500">
                                                            {variant && <span>{variant} • </span>}
                                                            Qty: {quantity}
                                                       </p>
                                                  </div>
                                             </div>

                                             {/* Price */}
                                             <div className="text-sm font-medium text-stone-800">
                                                  ${(price * quantity).toFixed(2)}
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    </div>

                    {/* Right Column: Shipping & Payment Summary */}
                    <div className="bg-stone-50/50 p-4 rounded-lg border border-stone-100 space-y-4 text-xs">
                         {/* Shipping Info */}
                         <div>
                              <h4 className="font-semibold text-stone-400 uppercase tracking-wider mb-2">
                                   Shipping Address
                              </h4>
                              <p className="text-stone-700 font-medium">
                                   {shippingInfo?.address || 'No address provided'}
                              </p>
                              <p className="text-stone-500 mt-0.5">
                                   Phone: {shippingInfo?.phone || 'N/A'}
                              </p>
                              {shippingInfo?.extraNote && (
                                   <p className="text-stone-500 italic mt-1">
                                        "{shippingInfo.extraNote}"
                                   </p>
                              )}
                         </div>

                         <hr className="border-stone-200" />

                         {/* Cost Breakdown */}
                         <div className="space-y-1.5 text-stone-600">
                              <h4 className="font-semibold text-stone-400 uppercase tracking-wider mb-2">
                                   Payment Summary
                              </h4>
                              <div className="flex justify-between">
                                   <span>Subtotal</span>
                                   <span>${summary?.subtotal?.toFixed(2) || '0.00'}</span>
                              </div>
                              <div className="flex justify-between">
                                   <span>Delivery Charge</span>
                                   <span>${summary?.deliveryCharge?.toFixed(2) || '0.00'}</span>
                              </div>
                              <div className="flex justify-between font-semibold text-stone-900 text-sm pt-2 border-t border-stone-200">
                                   <span>Grand Total</span>
                                   <span>${summary?.grandTotal?.toFixed(2) || '0.00'}</span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default OrderCard;