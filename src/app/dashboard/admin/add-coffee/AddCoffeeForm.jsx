"use client"
import React, { useState } from "react";
import { addCoffee } from "@/actions/server/coffee";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { PlusCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AddCoffeeForm() {
     const router = useRouter();
     const [loading, setLoading] = useState(false);

     const [formData, setFormData] = useState({
          name: "",
          image: "",
          description: "",
          type: "Single Origin",
          roast_level: "Medium",
          price: "",
          stock: "50",
          origin: "",
          processing: "Washed",
          flavor_notes: "Jasmine, Caramel, Citrus",
          brew_suggestions: "Pour Over, Espresso",
          variants: [
               { weight: "250g", price: 12.50, stock: 50 },
               { weight: "500g", price: 22.75, stock: 40 },
               { weight: "1kg", price: 39.99, stock: 30 }
          ]
     });

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!formData.name || !formData.price) {
               Swal.fire("Warning", "Please fill in all required fields", "warning");
               return;
          }

          setLoading(true);

          // Parse flavor notes string into array
          const flavorArray = formData.flavor_notes
               .split(",")
               .map((note) => note.trim())
               .filter(Boolean);

          const brewArray = formData.brew_suggestions
               .split(",")
               .map((suggestion) => suggestion.trim())
               .filter(Boolean);

          const payload = {
               ...formData,
               flavor_notes: flavorArray,
               brew_suggestions: brewArray,
               price: parseFloat(formData.price),
               stock: parseInt(formData.stock)
          };

          const res = await addCoffee(payload);
          setLoading(false);

          if (res?.success) {
               Swal.fire({
                    title: "Success!",
                    text: res.message || "Coffee added successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
               });
               router.push("/dashboard/admin/my-coffee");
          } else {
               Swal.fire("Error", res?.message || "Failed to add coffee", "error");
          }
     };

     return (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 max-w-3xl">
               <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <div>
                         <h2 className="text-xl font-bold text-slate-900">New Coffee Details</h2>
                         <p className="text-xs text-slate-500">Provide product specifications to publish to your shop.</p>
                    </div>
                    <Link
                         href="/dashboard/admin/my-coffee"
                         className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                         <ArrowLeftIcon className="h-4 w-4" />
                         <span>Back to List</span>
                    </Link>
               </div>

               {/* Row 1: Name & Image URL */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Coffee Name <span className="text-red-500">*</span>
                         </label>
                         <input
                              type="text"
                              required
                              placeholder="e.g. Ethiopian Yirgacheffe"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>

                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Image URL
                         </label>
                         <input
                              type="url"
                              placeholder="https://images.unsplash.com/..."
                              value={formData.image}
                              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>
               </div>

               {/* Row 2: Price & Stock */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Base Price ($) <span className="text-red-500">*</span>
                         </label>
                         <input
                              type="number"
                              step="0.01"
                              required
                              placeholder="14.99"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>

                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Stock Units
                         </label>
                         <input
                              type="number"
                              required
                              placeholder="50"
                              value={formData.stock}
                              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>
               </div>

               {/* Row 3: Type, Roast Level & Processing */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Product Type
                         </label>
                         <select
                              value={formData.type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none bg-white font-medium"
                         >
                              <option value="Single Origin">Single Origin</option>
                              <option value="Blend">Blend</option>
                         </select>
                    </div>

                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Roast Level
                         </label>
                         <select
                              value={formData.roast_level}
                              onChange={(e) => setFormData({ ...formData, roast_level: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none bg-white font-medium"
                         >
                              <option value="Light">Light Roast</option>
                              <option value="Medium">Medium Roast</option>
                              <option value="Dark">Dark Roast</option>
                         </select>
                    </div>

                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Processing
                         </label>
                         <select
                              value={formData.processing}
                              onChange={(e) => setFormData({ ...formData, processing: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 outline-none bg-white font-medium"
                         >
                              <option value="Washed">Washed</option>
                              <option value="Natural">Natural</option>
                              <option value="Honey">Honey Processed</option>
                         </select>
                    </div>
               </div>

               {/* Row 4: Origin & Flavor Notes */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Origin Region
                         </label>
                         <input
                              type="text"
                              placeholder="e.g. Sidama, Ethiopia"
                              value={formData.origin}
                              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>

                    <div>
                         <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Flavor Notes (comma-separated)
                         </label>
                         <input
                              type="text"
                              placeholder="Floral, Jasmine, Blueberry"
                              value={formData.flavor_notes}
                              onChange={(e) => setFormData({ ...formData, flavor_notes: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>
               </div>

               {/* Description */}
               <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                         Description
                    </label>
                    <textarea
                         rows={4}
                         placeholder="Describe the aroma, mouthfeel, body, and background story of this coffee..."
                         value={formData.description}
                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                         className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                    />
               </div>

               {/* Submit Button */}
               <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                         type="submit"
                         disabled={loading}
                         className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all shadow-lg shadow-amber-600/30 disabled:opacity-50"
                    >
                         <PlusCircleIcon className="h-5 w-5" />
                         <span>{loading ? "Adding Product..." : "Publish Coffee Item"}</span>
                    </button>
               </div>
          </form>
     );
}
