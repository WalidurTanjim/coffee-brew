"use client"

import { useSession } from "next-auth/react"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from "next/link";
import { signOut } from "next-auth/react"
import Image from "next/image";

const SignInButtonNav = () => {
     const session = useSession();
     const userRole = session?.data?.user?.role;
     console.log("Session from SignInButton:", session, userRole);

     return (
          <>
               {
                    session?.status === "authenticated" ?
                    <Menu as="div" className="relative ml-3">
                         <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              {
                                   session?.data?.user?.image ?
                                   <Image alt="Profile picture" src={session?.data?.user?.image} width={10} height={10} className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" /> : 
                                   <p className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10 text-white font-medium flex items-center justify-center">{session?.data?.user?.name.split('')[0]}</p>
                              }
                         </MenuButton>

                         <MenuItems transition className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                              <MenuItem>
                                   <Link href="/" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">Your profile</Link>
                              </MenuItem>

                              <MenuItem>
                                   {
                                        userRole === "admin" ?
                                        <Link href="/dashboard/admin" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">Dashboard</Link> :
                                        <Link href="/dashboard/user" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">Dashboard</Link>
                                   }
                              </MenuItem>

                              <MenuItem>
                                   <Link href="/" onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">Sign out</Link>
                              </MenuItem>
                         </MenuItems>
                    </Menu> : 
                    <Link href={`/auth/signin`}>
                         <button className="px-5 py-1.5 outline-none border rounded-sm border-gray-500 text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-colors">Sign in</button>
                    </Link>
               }
          </>
     )
}

export default SignInButtonNav
