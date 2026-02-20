import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { isAuthenticated } from "../utils/auth";

export default function SidebarA({ closeMobile }) {
  const navigate = useNavigate();

  const links = [
    { to: "/dashboard", icon: <Home size={18} />, label: "Home" },
    { to: "/find-jobs", icon: <Briefcase size={18} />, label: "Find Jobs" },
    { to: "/find-artisans", icon: <Users size={18} />, label: "Find Artisans" },
    { to: "/savings", icon: <CreditCard size={18} />, label: "Savings" },
    { to: "/analytics", icon: <BarChart2 size={18} />, label: "Analytics" },
    { to: "/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  return (
    <aside className="h-screen w-64 bg-[#111827] border-r border-white/10 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <img src="/logo.png" alt="Spectrum logo" className="h-8 w-8 object-contain" />
        <span className="font-bold text-lg tracking-wide">Spectrum</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col px-3 py-4 gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={closeMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm transition
              ${
                isActive
                  ? "bg-brightOrange text-black font-semibold"
                  : "text-white/80 hover:bg-white/10"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        {isAuthenticated() && (
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
              window.location.reload();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-sm bg-red-600/20 text-red-400 hover:bg-red-600/30"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
