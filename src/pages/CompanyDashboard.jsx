import React, { useEffect, useState } from "react";
import { getHireRequests } from "../services/hireService";
import { PlusCircle, Briefcase, BarChart2, Settings } from "lucide-react";

export default function CompanyDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.full_name || "Company";

  const [sent, setSent] = useState([]);

  useEffect(() => {
    const rows = getHireRequests().filter(h => h.client === user.full_name);
    setSent(rows);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1018] text-white px-6 pt-8 pb-20">
      <h1 className="text-2xl font-bold mb-2">Welcome, {name}</h1>
      <p className="text-white/60 mb-6">Manage jobs & hiring pipeline</p>

      {/* ACTION SHORTCUTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <Tile label="Post Job" icon={<PlusCircle />} />
        <Tile label="Job Listings" icon={<Briefcase />} />
        <Tile label="Analytics" icon={<BarChart2 />} />
        <Tile label="Settings" icon={<Settings />} />
      </div>

      {/* SENT HIRE REQUESTS */}
      <h2 className="text-lg font-semibold mb-3">Sent Hire Requests</h2>

      {sent.length === 0 ? (
        <div className="bg-[#111827] border border-white/10 p-4 rounded-lg text-white/60">
          You have not hired any artisan yet.
        </div>
      ) : (
        <div className="space-y-4">
          {sent.map((req, idx) => (
            <div
              key={idx}
              className="bg-[#111827] border border-white/10 rounded-lg p-4"
            >
              <p className="font-semibold">To: {req.artisanName}</p>
              <p className="text-white/70 text-sm mt-1">
                {new Date(req.timestamp).toLocaleString()}
              </p>
              <p className="text-white/80 text-sm mt-2">
                {req.details?.message || "No message"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Tile({ label, icon }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-5 flex flex-col items-center gap-2">
      <span className="text-brightOrange">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

