import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import SidebarA from "./SidebarA";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#0d1018] text-white flex relative">

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static z-50 top-0 left-0 h-full
          transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300
        `}
      >
        <SidebarA closeMobile={() => setMobileOpen(false)} />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* MOBILE HEADER BAR */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-white/10">
          <button onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="font-semibold">Spectrum</span>
          <div />
        </div>

        {/* TOPBAR (Desktop only keeps layout consistent) */}
        <div className="hidden md:block">
          <Topbar />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto px-5 py-6 md:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
