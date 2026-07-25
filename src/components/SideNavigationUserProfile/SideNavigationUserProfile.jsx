"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react"

export default function SideNavigationUserProfile() {
     const [isSideNavOpen, setIsSideNavOpen] = useState(false);

     const session = useSession();
     const userName = session?.data?.user?.name;
     const userEmail = session?.data?.user?.email;
     const userRole = session?.data?.user?.role;
     const userImage = session?.data?.user?.image;
     // console.log("Session from SideNavigationUserProfile:", session);

     // adminRoutes
     const adminRoutes = [
          { label: "Add Coffee", path: "/admin/add-coffee" },
     ];

     // userRoutes
     const userRoutes = [
          { label: "My Coffee", path: "/my-coffee" },
          { label: "Cart", path: "/cart" },
     ];

     return (
          <>
               {/* Mobile Toggle Trigger */}
               <button title="Toggle side navigation" type="button" className={`fixed right-8 top-24 z-10 flex h-10 w-10 items-center justify-center rounded bg-white shadow-md transition-all lg:hidden ${ isSideNavOpen ? "ring-2 ring-emerald-500" : "" }`} aria-haspopup="menu" aria-label="Side navigation" aria-expanded={isSideNavOpen} aria-controls="nav-menu-sidebar" onClick={() => setIsSideNavOpen(!isSideNavOpen)}>
                    <div className="relative h-5 w-5">
                         <span className={`absolute block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 ${isSideNavOpen ? "top-2.5 rotate-45" : "top-0.5"}`}/>
                         <span className={`absolute top-2.5 block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 ${isSideNavOpen ? "opacity-0" : "opacity-100"}`}/>
                         <span className={`absolute block h-0.5 w-5 rounded-full bg-slate-700 transition-all duration-300 ${isSideNavOpen ? "top-2.5 -rotate-45" : "top-4.5"}`}/>
                    </div>
               </button>

               {/* Side Navigation Panel */}
               <aside id="nav-menu-sidebar" aria-label="Side navigation" className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${ isSideNavOpen ? "translate-x-0" : "-translate-x-full" }`}>
                    {/* User Profile Header */}
                    <div className="flex flex-col items-center gap-4 border-b border-slate-200 p-6">
                         <div className="relative h-12 w-12 shrink-0">
                              <Image src="https://i.pravatar.cc/150?img=7" alt="Profile pic" width={50} height={50} className="h-full w-full rounded-full object-cover" />
                                   <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" title="Online status">
                                   <span className="sr-only">online</span>
                              </span>
                         </div>
                         
                         <div className="flex w-full flex-col items-center justify-center text-center">
                              <h4 className="w-full truncate text-base font-medium text-slate-700">{userName ? userName : 'Loading...'}</h4>
                              <p className="w-full truncate text-sm text-slate-500">{userEmail ? userEmail : 'Loading...'}</p>
                         </div>
                    </div>

                    {/* Links Navigation */}
                    <nav aria-label="Sidebar Menu" className="flex-1 divide-y divide-slate-100 overflow-y-auto">
                         {(() => {
                              const activeRoutes = userRole === "admin" ? adminRoutes : userRoutes;

                              return (
                                   <ul className="flex flex-col gap-1 py-3 px-3">
                                        {activeRoutes.map((item, index) => (
                                             <li key={item.path || index}>
                                                  <Link href={item.path || "/"} className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500">
                                                       <span className="flex-1 truncate text-sm font-normal">{item.label}</span>

                                                       {item.badge && (
                                                       <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs font-semibold text-pink-500">
                                                            {item.badge}
                                                            <span className="sr-only"> new items</span>
                                                       </span>)}
                                                  </Link>
                                             </li>
                                        ))}
                                   </ul>
                              );
                         })()}
                    </nav>

                    {/* Footer Link */}
                    <footer className="border-t border-slate-200 p-3">
                         <a href="#" className="flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-emerald-500">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 shrink-0" aria-hidden="true">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="truncate text-sm font-medium">Logout</span>
                         </a>
                    </footer>
               </aside>

               {/* Mobile Backdrop */}
               {isSideNavOpen && (
                    <div className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden" onClick={() => setIsSideNavOpen(false)} aria-hidden="true" />
               )}
          </>
     )
}