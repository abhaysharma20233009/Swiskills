// src/components/home/layout.jsx
import React, { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-zinc-800">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-50 bg-zinc-800 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow overflow-y-auto p-4 md:p-6">
          {children} {/* ✅ This is the key part */}
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
