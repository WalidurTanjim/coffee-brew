"use client"
import React, { useState } from "react";
import { updateUserRole, deleteUser } from "@/actions/server/auth";
import Swal from "sweetalert2";
import {
     MagnifyingGlassIcon,
     UserIcon,
     ShieldCheckIcon,
     TrashIcon
} from "@heroicons/react/24/outline";

export default function UsersManageList({ initialUsers = [] }) {
     const [users, setUsers] = useState(initialUsers);
     const [searchQuery, setSearchQuery] = useState("");
     const [roleFilter, setRoleFilter] = useState("all");
     const [loadingId, setLoadingId] = useState(null);

     const filteredUsers = users.filter((u) => {
          const matchesSearch =
               u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               u.email?.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesRole =
               roleFilter === "all" || (u.role || "user").toLowerCase() === roleFilter.toLowerCase();
          return matchesSearch && matchesRole;
     });

     const handleRoleToggle = async (userId, currentRole) => {
          const newRole = currentRole === "admin" ? "user" : "admin";

          const confirm = await Swal.fire({
               title: `Change role to ${newRole}?`,
               text: `Are you sure you want to change this account role to "${newRole}"?`,
               icon: "question",
               showCancelButton: true,
               confirmButtonText: `Yes, make ${newRole}`
          });

          if (confirm.isConfirmed) {
               setLoadingId(userId);
               const res = await updateUserRole(userId, newRole);
               setLoadingId(null);

               if (res?.success) {
                    setUsers((prev) =>
                         prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
                    );
                    Swal.fire("Role Updated!", res.message, "success");
               } else {
                    Swal.fire("Error", res?.message || "Failed to update user role", "error");
               }
          }
     };

     const handleDeleteUser = async (userId, email) => {
          const confirm = await Swal.fire({
               title: "Delete User Account?",
               text: `Are you sure you want to delete ${email}?`,
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#d33",
               confirmButtonText: "Yes, delete account"
          });

          if (confirm.isConfirmed) {
               const res = await deleteUser(userId);
               if (res?.success) {
                    setUsers((prev) => prev.filter((u) => u._id !== userId));
                    Swal.fire("Deleted!", res.message, "success");
               } else {
                    Swal.fire("Error", res?.message || "Failed to delete user", "error");
               }
          }
     };

     return (
          <div className="space-y-6">
               {/* Controls */}
               <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="relative flex-1">
                         <MagnifyingGlassIcon className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                         <input
                              type="text"
                              placeholder="Search users by name or email..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                    </div>

                    <div className="flex items-center gap-2">
                         <select
                              value={roleFilter}
                              onChange={(e) => setRoleFilter(e.target.value)}
                              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:border-amber-500 outline-none"
                         >
                              <option value="all">All Roles</option>
                              <option value="admin">Admins Only</option>
                              <option value="user">Users Only</option>
                         </select>
                    </div>
               </div>

               {/* Users Table */}
               <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm text-slate-600">
                              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                   <tr>
                                        <th className="px-6 py-4">User Info</th>
                                        <th className="px-6 py-4">Provider</th>
                                        <th className="px-6 py-4">Current Role</th>
                                        <th className="px-6 py-4">Joined Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                   {filteredUsers.length === 0 ? (
                                        <tr>
                                             <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                                  No users found matching your search.
                                             </td>
                                        </tr>
                                   ) : (
                                        filteredUsers.map((u) => {
                                             const isAdmin = u.role === "admin";

                                             return (
                                                  <tr key={u._id} className="hover:bg-slate-50/80 transition-colors">
                                                       <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                 <div className="h-10 w-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">
                                                                      {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                                                                 </div>
                                                                 <div>
                                                                      <div className="font-bold text-slate-900">{u.name || "User"}</div>
                                                                      <div className="text-xs text-slate-400">{u.email}</div>
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       <td className="px-6 py-4">
                                                            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 capitalize">
                                                                 {u.provider || "credentials"}
                                                            </span>
                                                       </td>

                                                       <td className="px-6 py-4">
                                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                                                 isAdmin
                                                                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                                                                      : "bg-slate-100 text-slate-700 border border-slate-200"
                                                            }`}>
                                                                 {isAdmin && <ShieldCheckIcon className="h-4 w-4" />}
                                                                 <span className="capitalize">{u.role || "user"}</span>
                                                            </span>
                                                       </td>

                                                       <td className="px-6 py-4 text-xs text-slate-500">
                                                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : "N/A"}
                                                       </td>

                                                       <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                 <button
                                                                      disabled={loadingId === u._id}
                                                                      onClick={() => handleRoleToggle(u._id, u.role || "user")}
                                                                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                                                                 >
                                                                      {isAdmin ? "Make User" : "Make Admin"}
                                                                 </button>
                                                                 <button
                                                                      onClick={() => handleDeleteUser(u._id, u.email)}
                                                                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                                      title="Delete User"
                                                                 >
                                                                      <TrashIcon className="h-4 w-4" />
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             );
                                        })
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
}
