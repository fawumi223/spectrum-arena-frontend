import React from "react";
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
  Bell,
  Ticket
} from "lucide-react";

import WalletBox from "../components/WalletBox";
import JobsExplore from "../components/jobs/JobsExplore";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.full_name?.split(" ")[0] || "User";

  return (
    <div className="p-4 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold">
            {firstName[0]}
          </div>

          <div>
            <h1 className="text-lg font-semibold">
              Hi, {firstName} 👋
            </h1>
            <p className="text-gray-400 text-xs">
              Welcome back. Let’s get things done.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/notifications")}
          className="bg-[#0f172a] p-3 rounded-xl shadow-md"
        >
          <Bell size={18} />
        </button>

      </div>

      {/* WALLET (HERO CARD) */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] rounded-2xl p-5 shadow-xl border border-white/10">
        <WalletBox />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Savings" value="₦0" />
        <Stat label="Jobs" value="0" />
        <Stat label="Hires" value="0" />
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search artisans..."
        className="w-full bg-[#0f172a] p-3 rounded-xl outline-none border border-white/10 focus:border-orange-500"
      />

      {/* JOBS */}
      <JobsExplore />

      {/* ARTISANS */}
      <div className="space-y-3">
        <h3 className="text-sm text-gray-400">Recommended Artisans</h3>

        {[1,2,3].map((i) => (
          <div key={i} className="bg-[#0f172a] p-3 rounded-xl flex justify-between items-center border border-white/5 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full" />

              <div>
                <p className="text-sm font-semibold">Tolu</p>
                <p className="text-xs text-gray-400">Electrician</p>
              </div>
            </div>

            <p className="text-orange-400 font-semibold">₦3,000</p>

          </div>
        ))}
      </div>

      {/* SERVICES */}
      <h2 className="text-sm text-gray-400">Services</h2>

      <div className="grid grid-cols-3 gap-3">

        <Service icon={<Briefcase size={18} />} label="Jobs" onClick={() => navigate("/find-jobs")} />
        <Service icon={<Search size={18} />} label="Artisans" onClick={() => navigate("/find-artisans")} />
        <Service icon={<PlusCircle size={18} />} label="Post Job" onClick={() => navigate("/post-job")} />

        <Service icon={<PiggyBank size={18} />} label="Savings" onClick={() => navigate("/savings")} />
        <Service icon={<Smartphone size={18} />} label="Airtime" onClick={() => navigate("/bills/airtime")} />
        <Service icon={<Wifi size={18} />} label="Data" onClick={() => navigate("/bills/data")} />

        <Service icon={<BatteryCharging size={18} />} label="Electricity" onClick={() => navigate("/bills/electricity")} />
        <Service icon={<Ticket size={18} />} label="Bet" onClick={() => navigate("/bills/bet")} />
        <Service icon={<BarChart2 size={18} />} label="Analytics" onClick={() => navigate("/analytics")} />

      </div>

      {/* ACTIVITY */}
      <h2 className="text-sm text-gray-400">Recent Activity</h2>

      <div className="bg-[#0f172a] rounded-xl p-4 space-y-3 border border-white/5 shadow-sm">
        <Activity title="Wallet Deposit" amount="+ ₦5,000" />
        <Activity title="Data Purchase" amount="- ₦900" />
        <Activity title="Savings Lock" amount="- ₦2,000" />
      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ label, value }) {
  return (
    <div className="bg-[#0f172a] p-4 rounded-xl text-center border border-white/5 shadow-sm">
      <p className="text-xs text-gray-400">{label}</p>
      <h3 className="font-bold text-lg mt-1">{value}</h3>
    </div>
  );
}

function Service({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#0f172a] rounded-xl py-4 flex flex-col items-center gap-1 border border-white/5 hover:border-orange-500 hover:scale-105 transition"
    >
      <div className="text-orange-400">{icon}</div>
      <span className="text-xs">{label}</span>
    </button>
  );
}

function Activity({ title, amount }) {
  return (
    <div className="flex justify-between text-sm">
      <span>{title}</span>
      <span className="font-semibold">{amount}</span>
    </div>
  );
}
