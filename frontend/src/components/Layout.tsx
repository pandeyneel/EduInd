import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 w-full flex text-slate-800">
      {/* Sidebar - fixed width */}
      <Sidebar />

      {/* Main Layout Area - shifts right to avoid sidebar */}
      <div className="flex-1 ml-sidebar-width flex flex-col min-h-screen overflow-hidden">
        {/* Header - sticky top */}
        <Header />

        {/* Page Content Container */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
