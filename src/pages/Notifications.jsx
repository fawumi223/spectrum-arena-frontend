import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Bell, Briefcase, Wallet, AlertCircle } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "job",
    text: "New job posted that matches your skills.",
    time: "2h ago",
    icon: <Briefcase size={18} className="text-brightOrange" />,
  },
  {
    id: 2,
    type: "wallet",
    text: "Your savings balance updated.",
    time: "1d ago",
    icon: <Wallet size={18} className="text-brightOrange" />,
  },
  {
    id: 3,
    type: "system",
    text: "System maintenance scheduled for tomorrow.",
    time: "3d ago",
    icon: <AlertCircle size={18} className="text-brightOrange" />,
  },
];

export default function Notifications() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Bell size={22} className="text-brightOrange" />
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      {/* Notification List */}
      <div className="bg-[#111827] border border-white/10 rounded-xl divide-y divide-white/10">
        {mockNotifications.map((n) => (
          <div key={n.id} className="flex items-start gap-3 p-4">
            {n.icon}
            <div className="flex-1">
              <p className="text-sm">{n.text}</p>
              <p className="text-[11px] text-white/50 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

