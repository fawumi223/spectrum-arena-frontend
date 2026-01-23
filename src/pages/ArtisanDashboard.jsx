import React, { useEffect, useState } from "react";
import { getHireRequestsForArtisan } from "../services/hireService";
import { Briefcase, Star, BarChart2, Settings } from "lucide-react";

export default function ArtisanDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.full_name?.split(" ")[0] || "Artisan";

  const [incoming, setIncoming] = useState([]);

  useEffect(() => {
    const rows = getHireRequestsForArtisan(String(user.id));
    setIncoming(rows);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1018] text-white px-6 pt-8 pb-20">
      <h1 className="text-2xl font-bold mb-2">Welcome, {firstName} 👋</h1>
      <p className="text-white/60 mb-6">Job leads & hire requests</p>

      {/* ACTION SHORTCUTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <Tile label="Job Leads" icon={<Briefcase />} />
        <Tile label="My Ratings" icon={<Star />} />
        <Tile label="Analytics" icon={<BarChart2 />} />
        <Tile label="Settings" icon={<Settings />} />
      </div>

      {/* INCOMING HIRE REQUESTS */}
      <h2 className="text-lg font-semibold mb-3">Incoming Hire Requests</h2>

      {incoming.length === 0 ? (
        <div className="bg-[#111827] border border-white/10 p-4 rounded-lg text-white/60">
          No hire requests yet.
        </div>
      ) : (
        <div className="space-y-4">
          {incoming.map((req, idx) => (
            <div
              key={idx}
              className="bg-[#111827] border border-white/10 rounded-lg p-4"
            >
              <p className="font-semibold">From: {req.client}</p>
              <p className="text-white/70 text-sm mt-1">
                {new Date(req.timestamp).toLocaleString()}
              </p>
              <p className="text-white/80 text-sm mt-2">
                {req.details?.message || "No description"}
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

