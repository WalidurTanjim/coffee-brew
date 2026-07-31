"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteCoffee, updateCoffee } from "@/actions/server/coffee";
import Swal from "sweetalert2";
import {
     MagnifyingGlassIcon,
     PencilSquareIcon,
     TrashIcon,
     PlusIcon,
     TagIcon,
     XMarkIcon,
     CheckIcon
} from "@heroicons/react/24/outline";

export default function CoffeeManageList({ initialCoffees = [] }) {
     const [coffees, setCoffees] = useState(initialCoffees);
     const [searchQuery, setSearchQuery] = useState("");
     const [selectedType, setSelectedType] = useState("all");

     // Modal state for editing
     const [editingCoffee, setEditingCoffee] = useState(null);
     const [editFormData, setEditFormData] = useState({});
     const [isSubmitting, setIsSubmitting] = useState(false);

     // Filter coffees based on search & type
     const filteredCoffees = coffees.filter((item) => {
          const matchesSearch =
               item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.origin?.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesType =
               selectedType === "all" || item.type?.toLowerCase() === selectedType.toLowerCase();
          return matchesSearch && matchesType;
     });

     // Delete Handler
     const handleDelete = async (id, name) => {
          const confirm = await Swal.fire({
               title: "Are you sure?",
               text: `Do you want to delete "${name}"? This action cannot be undone.`,
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#d33",
               cancelButtonColor: "#3085d6",
               confirmButtonText: "Yes, delete it!"
          });

          if (confirm.isConfirmed) {
               const res = await deleteCoffee(id);
               if (res?.success) {
                    setCoffees((prev) => prev.filter((c) => c._id !== id));
                    Swal.fire("Deleted!", res.message, "success");
               } else {
                    Swal.fire("Error!", res?.message || "Failed to delete coffee", "error");
               }
          }
     };

     // Edit Modal Trigger
     const openEditModal = (coffee) => {
          setEditingCoffee(coffee);
          setEditFormData({
               name: coffee.name || "",
               price: coffee.price || 0,
               stock: coffee.stock || 0,
               roast_level: coffee.roast_level || "Medium",
               type: coffee.type || "Single Origin",
               origin: coffee.origin || "",
               description: coffee.description || "",
               image: coffee.image || ""
          });
     };

     // Edit Form Submit Handler
     const handleEditSubmit = async (e) => {
          e.preventDefault();
          if (!editingCoffee?._id) return;

          setIsSubmitting(true);
          const res = await updateCoffee(editingCoffee._id, editFormData);
          setIsSubmitting(false);

          if (res?.success) {
               setCoffees((prev) =>
                    prev.map((c) =>
                         c._id === editingCoffee._id ? { ...c, ...editFormData } : c
                    )
               );
               setEditingCoffee(null);
               Swal.fire("Updated!", res.message, "success");
          } else {
               Swal.fire("Error!", res?.message || "Failed to update coffee", "error");
          }
     };

     return (
          <div className="space-y-6">
               {/* Controls Bar: Search, Filters & Add Button */}
               <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    {/* Search Input */}
                    <div className="relative flex-1">
                         <MagnifyingGlassIcon className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                         <input
                              type="text"
                              placeholder="Search coffee by name or origin..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-3">
                         <select
                              value={selectedType}
                              onChange={(e) => setSelectedType(e.target.value)}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:border-amber-500 outline-none"
                         >
                              <option value="all">All Types</option>
                              <option value="Single Origin">Single Origin</option>
                              <option value="Blend">Blend</option>
                         </select>

                         <Link
                              href="/dashboard/admin/add-coffee"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-md shadow-amber-600/20 shrink-0"
                         >
                              <PlusIcon className="h-5 w-5" />
                              <span>Add New</span>
                         </Link>
                    </div>
               </div>

               {/* Coffee Inventory Table */}
               <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm text-slate-600">
                              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                   <tr>
                                        <th className="px-6 py-4">Coffee Details</th>
                                        <th className="px-6 py-4">Type & Roast</th>
                                        <th className="px-6 py-4">Price ($)</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                   {filteredCoffees.length === 0 ? (
                                        <tr>
                                             <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                                  No coffee items found matching your criteria.
                                             </td>
                                        </tr>
                                   ) : (
                                        filteredCoffees.map((coffee) => (
                                             <tr key={coffee._id} className="hover:bg-slate-50/80 transition-colors">
                                                  {/* Coffee Image & Name */}
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-3.5">
                                                            <div className="relative h-12 w-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                                                 {coffee.image ? (
                                                                      <img
                                                                           src={coffee.image}
                                                                           alt={coffee.name}
                                                                           className="h-full w-full object-cover"
                                                                      />
                                                                 ) : (
                                                                      <div className="h-full w-full flex items-center justify-center text-xl">
                                                                           ☕
                                                                      </div>
                                                                 )}
                                                            </div>
                                                            <div>
                                                                 <div className="font-bold text-slate-900">
                                                                      {coffee.name}
                                                                 </div>
                                                                 <div className="text-xs text-slate-400">
                                                                      {coffee.origin || "Origin unspecified"}
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Type & Roast */}
                                                  <td className="px-6 py-4">
                                                       <div className="space-y-1">
                                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                                 {coffee.type || "Single Origin"}
                                                            </span>
                                                            <div className="text-xs text-slate-500">
                                                                 Roast: <span className="font-semibold text-slate-700">{coffee.roast_level || "Medium"}</span>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Price */}
                                                  <td className="px-6 py-4 font-bold text-slate-900">
                                                       ${parseFloat(coffee.price || 0).toFixed(2)}
                                                  </td>

                                                  {/* Stock Status */}
                                                  <td className="px-6 py-4">
                                                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                            (coffee.stock || 0) > 10
                                                                 ? "bg-emerald-50 text-emerald-700"
                                                                 : (coffee.stock || 0) > 0
                                                                 ? "bg-amber-50 text-amber-700"
                                                                 : "bg-red-50 text-red-700"
                                                       }`}>
                                                            <span className={`h-1.5 w-1.5 rounded-full ${
                                                                 (coffee.stock || 0) > 10 ? "bg-emerald-500" : (coffee.stock || 0) > 0 ? "bg-amber-500" : "bg-red-500"
                                                            }`} />
                                                            {coffee.stock || 0} units
                                                       </span>
                                                  </td>

                                                  {/* Actions */}
                                                  <td className="px-6 py-4 text-right">
                                                       <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                 onClick={() => openEditModal(coffee)}
                                                                 className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                                                                 title="Edit Coffee"
                                                            >
                                                                 <PencilSquareIcon className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                 onClick={() => handleDelete(coffee._id, coffee.name)}
                                                                 className="p-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                                 title="Delete Coffee"
                                                            >
                                                                 <TrashIcon className="h-5 w-5" />
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        ))
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* Edit Modal */}
               {editingCoffee && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                         <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-slate-100">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                   <h3 className="text-xl font-bold text-slate-900">Edit Coffee Product</h3>
                                   <button
                                        onClick={() => setEditingCoffee(null)}
                                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                                   >
                                        <XMarkIcon className="h-6 w-6" />
                                   </button>
                              </div>

                              <form onSubmit={handleEditSubmit} className="space-y-4">
                                   <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                             Coffee Name
                                        </label>
                                        <input
                                             type="text"
                                             required
                                             value={editFormData.name}
                                             onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                             className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none"
                                        />
                                   </div>

                                   <div className="grid grid-cols-2 gap-4">
                                        <div>
                                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                                  Price ($)
                                             </label>
                                             <input
                                                  type="number"
                                                  step="0.01"
                                                  required
                                                  value={editFormData.price}
                                                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                                                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none"
                                             />
                                        </div>
                                        <div>
                                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                                  Stock Units
                                             </label>
                                             <input
                                                  type="number"
                                                  required
                                                  value={editFormData.stock}
                                                  onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                                                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none"
                                             />
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-2 gap-4">
                                        <div>
                                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                                  Type
                                             </label>
                                             <select
                                                  value={editFormData.type}
                                                  onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                                                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none bg-white"
                                             >
                                                  <option value="Single Origin">Single Origin</option>
                                                  <option value="Blend">Blend</option>
                                             </select>
                                        </div>
                                        <div>
                                             <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                                  Roast Level
                                             </label>
                                             <select
                                                  value={editFormData.roast_level}
                                                  onChange={(e) => setEditFormData({ ...editFormData, roast_level: e.target.value })}
                                                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none bg-white"
                                             >
                                                  <option value="Light">Light</option>
                                                  <option value="Medium">Medium</option>
                                                  <option value="Dark">Dark</option>
                                             </select>
                                        </div>
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                             Origin Region
                                        </label>
                                        <input
                                             type="text"
                                             value={editFormData.origin}
                                             onChange={(e) => setEditFormData({ ...editFormData, origin: e.target.value })}
                                             className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none"
                                        />
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                             Image URL
                                        </label>
                                        <input
                                             type="url"
                                             value={editFormData.image}
                                             onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                                             className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none"
                                        />
                                   </div>

                                   <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                             Description
                                        </label>
                                        <textarea
                                             rows={3}
                                             value={editFormData.description}
                                             onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                             className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none"
                                        />
                                   </div>

                                   <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                        <button
                                             type="button"
                                             onClick={() => setEditingCoffee(null)}
                                             className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
                                        >
                                             Cancel
                                        </button>
                                        <button
                                             type="submit"
                                             disabled={isSubmitting}
                                             className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-all shadow-md shadow-amber-600/20 disabled:opacity-50"
                                        >
                                             {isSubmitting ? "Saving..." : "Save Changes"}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
}
