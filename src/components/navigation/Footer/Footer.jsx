import {
     BuildingOfficeIcon,
     DocumentTextIcon,
     UserGroupIcon,
     ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const Footer = () => {
     return (
          <footer className="w-full text-slate-500">
               {/* Main footer */}
               <div className="border-t border-slate-200 bg-slate-100 pt-16 pb-12 text-sm">
                    <div className="mx-auto max-w-7xl px-2 sm:px-5 lg:px-8">
                         <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                              <nav className="col-span-2 md:col-span-4 lg:col-span-3" aria-labelledby="footer-product-4-sub">
                                   <h3 className="mb-6 text-base font-medium text-slate-700" id="footer-product-4-sub">Product</h3>

                                   <ul>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Features</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Customers</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Why us?</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Pricing</Link>
                                        </li>
                                   </ul>
                              </nav>

                              <nav className="col-span-2 md:col-span-4 lg:col-span-3"aria-labelledby="footer-docs-4-sub">
                                   <h3 className="mb-6 text-base font-medium text-slate-700"id="footer-docs-4-sub">Docs & help</h3>

                                   <ul>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Documentation</Link>
                                        </li>

                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Training</Link>
                                        </li>

                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">System status</Link>
                                        </li>

                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">FAQ's</Link>
                                        </li>

                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Help Center</Link>
                                        </li>
                                   </ul>
                              </nav>

                              <nav className="col-span-2 md:col-span-4 lg:col-span-3" aria-labelledby="footer-about-4-sub">
                                   <h3 className="mb-6 text-base font-medium text-slate-700" id="footer-about-4-sub">About us</h3>
                                   
                                   <ul>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">About us</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Careers</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Leadership</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Blog</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Events</Link>
                                        </li>
                                   </ul>
                              </nav>
                              
                              <nav className="col-span-2 md:col-span-4 lg:col-span-3" aria-labelledby="footer-get-in-touch-4-sub">
                                   <h3 className="mb-6 text-base font-medium text-slate-700" id="footer-get-in-touch-4-sub">Get in touch</h3>

                                   <ul>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Contact</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Support</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Partners</Link>
                                        </li>
                                        <li className="mb-2 leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Join research</Link>
                                        </li>
                                   </ul>
                              </nav>
                         </div>
                    </div>
               </div>

               {/* Sub Footer */}
               <div className="border-t border-slate-200 bg-slate-100 py-4 text-sm">
                    <div className="mx-auto max-w-7xl px-2 sm:px-5 lg:px-8">
                         <div className="grid grid-cols-4 items-center gap-6 md:grid-cols-8 lg:grid-cols-12">
                              <Link id="WindUI-4-sub" aria-label="WindUI logo" aria-current="page" className="col-span-1 flex items-center gap-2 whitespace-nowrap text-base font-medium leading-6 focus:outline-none md:col-span-4 lg:col-span-6" href="javascript:void(0)">
                                   <BuildingOfficeIcon className="h-6 w-6 shrink-0 text-emerald-500" />Brand</Link>

                              <nav className="col-span-3 md:col-span-4 lg:col-span-6" aria-labelledby="subfooter-links-3-sub">
                                   <h3 className="sr-only" id="subfooter-links-3-sub">Get in touch</h3>

                                   <ul className="flex flex-wrap items-center justify-end gap-2 lg:gap-4">
                                        <li className="leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">T&C</Link>
                                        </li>

                                        <li className="leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Privacy</Link>
                                        </li>

                                        <li className="leading-6">
                                             <Link href="javascript:void(0)" className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600">Cookies</Link>
                                        </li>
                                   </ul>
                              </nav>
                         </div>
                    </div>
               </div>
          </footer>
     );
};

export default Footer;