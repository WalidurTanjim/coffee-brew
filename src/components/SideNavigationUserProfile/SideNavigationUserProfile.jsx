"use client"
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
     Squares2X2Icon,
     ShoppingBagIcon,
     PlusCircleIcon,
     ClipboardDocumentListIcon,
     UsersIcon,
     ShoppingCartIcon,
     ArrowLeftOnRectangleIcon,
     HomeIcon,
     XMarkIcon,
     Bars3Icon
} from "@heroicons/react/24/outline";

export default function SideNavigationUserProfile({ isSideNavOpen, setIsSideNavOpen }) {
     // Removed internal state; state is managed by parent layout
     const pathname = usePathname();

     const session = useSession();
     const userName = session?.data?.user?.name;
     const userEmail = session?.data?.user?.email;
     const userRole = session?.data?.user?.role;
     const userImage = session?.data?.user?.image;

     // adminRoutes
     const adminRoutes = [
          { label: "Dashboard Overview", path: "/dashboard/admin", icon: Squares2X2Icon },
          { label: "Manage Coffees", path: "/dashboard/admin/my-coffee", icon: ShoppingBagIcon },
          { label: "Add New Coffee", path: "/dashboard/admin/add-coffee", icon: PlusCircleIcon },
          { label: "Manage Orders", path: "/dashboard/admin/orders", icon: ClipboardDocumentListIcon },
          { label: "Manage Users", path: "/dashboard/admin/users", icon: UsersIcon },
          { label: "My Cart", path: "/dashboard/admin/cart", icon: ShoppingCartIcon },
     ];

     // userRoutes
     const userRoutes = [
          { label: "Dashboard Overview", path: "/dashboard/user", icon: Squares2X2Icon },
          { label: "My Orders", path: "/dashboard/user/orders", icon: ClipboardDocumentListIcon },
          { label: "My Cart", path: "/dashboard/user/cart", icon: ShoppingCartIcon },
     ];

     const activeRoutes = userRole === "admin" ? adminRoutes : userRoutes;

     return (
          <>
               {/* Side Navigation Panel (Hidden by default on all devices) */}
               <aside
                    id="nav-menu-sidebar"
                    aria-label="Side navigation"
                    className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out shadow-2xl ${
                         isSideNavOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
               >
                    {/* Header / Brand & Profile */}
                    <div className="flex flex-col border-b border-slate-100 p-6 bg-slate-900 text-white">
                         <div className="flex items-center gap-3 mb-6">
                              <div className="h-10 w-10 rounded-xl bg-amber-600 flex items-center justify-center font-bold text-white shadow-md">
                                   ☕
                              </div>
                              <div>
                                   <h3 className="font-bold text-base tracking-wide text-white">Coffee Brew</h3>
                                   <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 capitalize font-medium">
                                        {userRole || "User"} Control Center
                                   </span>
                              </div>
                         </div>


                         {/* Profile Details */}
                         <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                              <div className="relative h-11 w-11 shrink-0 rounded-full border-2 border-amber-500 overflow-hidden bg-slate-800 flex items-center justify-center">
                                   {userImage ? (
                                        <Image
                                             src={userImage}
                                             alt="Profile pic"
                                             width={44}
                                             height={44}
                                             className="h-full w-full object-cover"
                                        />
                                   ) : (
                                        <span className="text-lg font-semibold text-white">
                                             {userName ? userName.charAt(0).toUpperCase() : "U"}
                                        </span>
                                   )}
                                   <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500" />
                              </div>

                              <div className="flex w-full flex-col min-w-0">
                                   <h4 className="truncate text-sm font-semibold text-white">
                                        {userName || "Logged User"}
                                   </h4>
                                   <p className="truncate text-xs text-slate-400">
                                        {userEmail || "user@example.com"}
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* Links Navigation */}
                    <nav aria-label="Sidebar Menu" className="flex-1 overflow-y-auto px-4 py-6">
                         <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-3">
                              Navigation
                         </div>
                         <ul className="flex flex-col gap-1.5">
                              {activeRoutes.map((item) => {
                                   const Icon = item.icon;
                                   const isActive = pathname === item.path;

                                   return (
                                        <li key={item.path}>
                                             <Link
                                                  href={item.path}
                                                  onClick={() => setIsSideNavOpen(false)}
                                                  className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                                                       isActive
                                                            ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                  }`}
                                             >
                                                  <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
                                                  <span className="flex-1 truncate">{item.label}</span>
                                             </Link>
                                        </li>
                                   );
                              })}
                         </ul>

                         <div className="mt-8 border-t border-slate-100 pt-4">
                              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-3">
                                   Quick Links
                              </div>
                              <Link
                                   href="/"
                                   onClick={() => setIsSideNavOpen(false)}
                                   className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                              >
                                   <HomeIcon className="h-5 w-5 text-slate-400" />
                                   <span>Back to Storefront</span>
                              </Link>
                         </div>
                    </nav>

                    {/* Footer Logout Action */}
                    <div className="border-t border-slate-200 p-4 bg-slate-50">
                         <button
                              onClick={() => signOut({ callbackUrl: "/" })}
                              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-xs"
                         >
                              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                              <span>Sign Out</span>
                         </button>
                    </div>
               </aside>

               {/* Backdrop for All Screen Sizes */}
               {isSideNavOpen && (
                    <div
                         className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-xs transition-opacity"
                         onClick={() => setIsSideNavOpen(false)}
                         aria-hidden="true"
                    />
               )}
          </>
     );
}