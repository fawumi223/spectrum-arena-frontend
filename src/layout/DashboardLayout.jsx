import React from "react";
import SidebarA from "./SidebarA";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-[#0d1018] text-white flex">
      {/* Sidebar */}
      <SidebarA />

      {/* Right content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-5 py-6 md:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}

