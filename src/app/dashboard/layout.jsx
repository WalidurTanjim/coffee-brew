import SideNavigationUserProfile from "@/components/SideNavigationUserProfile/SideNavigationUserProfile";

const DashboardLayout = ({ children }) => {
     return (
          <html lang="en" className="h-full bg-slate-50">
               <body className="h-full text-slate-800 antialiased">
                    <div className="min-h-screen">
                         {/* Sidebar Component */}
                         <SideNavigationUserProfile />

                         {/* Main Workspace Area (Shifted right on desktop to accommodate the fixed 72-unit sidebar) */}
                         <div className="flex flex-col">
                              <main className="flex-1 p-6 sm:p-8 lg:p-10">
                                   {children}
                              </main>
                         </div>
                    </div>
               </body>
          </html>
     )
}

export default DashboardLayout;
