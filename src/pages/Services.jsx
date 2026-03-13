import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Smartphone,
  Wifi,
  BatteryCharging,
  Ticket,
  PiggyBank,
  Briefcase,
} from "lucide-react";

import DashboardLayout from "../layout/DashboardLayout";

export default function Services() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">Services</h1>
        <p className="text-white/60 text-sm mt-1">
          Pay bills, manage savings and access marketplace services.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">

        <ServiceTile
          label="Buy Airtime"
          icon={<Smartphone size={26} />}
          onClick={() => navigate("/bills/airtime")}
        />

        <ServiceTile
          label="Buy Data"
          icon={<Wifi size={26} />}
          onClick={() => navigate("/bills/data")}
        />

        <ServiceTile
          label="Electricity"
          icon={<BatteryCharging size={26} />}
          onClick={() => navigate("/bills/electricity")}
        />

        <ServiceTile
          label="Bet Voucher"
          icon={<Ticket size={26} />}
          onClick={() => navigate("/bills/bet")}
        />

        <ServiceTile
          label="Savings"
          icon={<PiggyBank size={26} />}
          onClick={() => navigate("/savings")}
        />

        <ServiceTile
          label="Find Jobs"
          icon={<Briefcase size={26} />}
          onClick={() => navigate("/find-jobs")}
        />

      </div>

    </DashboardLayout>
  );
}

/* ----------------------
   SERVICE TILE
---------------------- */

function ServiceTile({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#111827] hover:bg-[#162033] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition"
    >
      <div className="text-brightOrange">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
