import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Search,
  PlusCircle,
  PiggyBank,
  Smartphone,
  Wifi,
  BatteryCharging,
  BarChart2,
  Settings,
  TrendingUp,
  Bell,
} from "lucide-react";

import DashboardLayout from "../layout/DashboardLayout";
import WalletBox from "../components/WalletBox";
import FiltersBar from "../components/jobs/FiltersBar";
import JobsExplore from "../components/jobs/JobsExplore";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.full_name ? user.full_name.split(" ")[0] : "User";

  const [filters, setFilters] = useState(null);

  // Temporary KPI placeholders (backend later)
  const mockSavings = "₦0.00";
  const mockJobsPosted = 0;
  const mockArtisansHired = 0;

  function handleFilters(f) {
    setFilters(f);
    console.log("Applied Filters:", f);
  }

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Hi, {firstName} 👋</h1>
          <p className="text-white/60 text-sm mt-1">
            Welcome back. Let’s get things done today!
          </p>
        </div>

        <button
          className="p-2 rounded-lg bg-[#111827] border border-white/10 hover:bg-[#162033] transition"
          onClick={() => navigate("/notifications")}
        >
          <Bell size={18} />
        </button>
      </div>

      {/* WALLET SECTION */}
      <div className="mb-6 flex flex-wrap gap-6">
        <WalletBox />
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <Metric label="Savings" value={mockSavings} icon={<PiggyBank size={18} />} />
        <Metric label="Jobs Posted" value={mockJobsPosted} icon={<Briefcase size={18} />} />
        <Metric label="Artisans Hired" value={mockArtisansHired} icon={<Search size={18} />} />
        <Metric label="Analytics" value="Coming Soon" icon={<TrendingUp size={18} />} />
      </div>

      {/* FILTERS + JOB EXPLORE */}
      <FiltersBar onChange={handleFilters} />
      <JobsExplore filters={filters} />

      {/* QUICK ACTIONS */}
      <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        <Tile label="Find Jobs" icon={<Briefcase size={22} />} onClick={() => navigate("/find-jobs")} />
        <Tile label="Find Artisans" icon={<Search size={22} />} onClick={() => navigate("/find-artisans")} />
        <Tile label="Post a Job" icon={<PlusCircle size={22} />} onClick={() => navigate("/post-job")} />
        <Tile label="Savings" icon={<PiggyBank size={22} />} onClick={() => navigate("/savings")} />
        <Tile label="Buy Airtime" icon={<Smartphone size={22} />} onClick={() => navigate("/bills/airtime")} />
        <Tile label="Buy Data" icon={<Wifi size={22} />} onClick={() => navigate("/bills/data")} />
        <Tile label="Electricity" icon={<BatteryCharging size={22} />} onClick={() => navigate("/bills/electricity")} />
        <Tile label="Analytics" icon={<BarChart2 size={22} />} onClick={() => navigate("/analytics")} />
        <Tile label="Settings" icon={<Settings size={22} />} onClick={() => navigate("/settings")} />
      </div>

      {/* RECENT ACTIVITY */}
      <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
      <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
        <p className="text-white/50 text-sm">
          No activity yet. Your recent transactions, job posts, and hires will appear here.
        </p>
      </div>
    </DashboardLayout>
  );
}

/* ----------------------
   COMPONENTS
----------------------*/

function Metric({ label, value, icon }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-4 flex flex-col">
      <div className="flex items-center gap-2 text-white/70 text-xs">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}

function Tile({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#111827] hover:bg-[#162033] border border-white/10 rounded-xl py-5 flex flex-col items-center justify-center gap-2 transition"
    >
      <div className="text-brightOrange">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

