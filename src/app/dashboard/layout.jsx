"use client"
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SideNavigationUserProfile from '@/components/SideNavigationUserProfile/SideNavigationUserProfile';

const DashboardLayout = ({ children }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* Fixed Sidebar */}
      <SideNavigationUserProfile isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />

      <header className="flex items-center bg-slate-800 p-2 max-w-7xl mx-auto">
        <button
          title="Toggle side navigation"
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-all"
          aria-label="Toggle Side navigation"
          onClick={() => setIsSideNavOpen(prev => !prev)}
        >
          {isSideNavOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
        <h1 className="ml-4 text-white text-lg font-semibold">Dashboard</h1>
      </header>
      {/* Main Workspace Area */}
      <div className="flex flex-col min-h-screen transition-all">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
