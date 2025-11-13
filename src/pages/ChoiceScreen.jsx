import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Wrench, FileText, Zap } from "lucide-react";

export default function ChoiceScreen() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const actions = [
    {
      title: "Post a Job",
      desc: "Create and share new job openings easily.",
      icon: <FileText size={32} />,
      color: "bg-orange-500/10 border-orange-400/30 hover:bg-orange-500/20",
      route: "/post-job",
    },
    {
      title: "Find a Job",
      desc: "Discover job listings near your location.",
      icon: <Briefcase size={32} />,
      color: "bg-blue-500/10 border-blue-400/30 hover:bg-blue-500/20",
      route: "/find-jobs",
    },
    {
      title: "Find Skilled Artisan",
      desc: "Locate reliable artisans in your area.",
      icon: <Wrench size={32} />,
      color: "bg-green-500/10 border-green-400/30 hover:bg-green-500/20",
      route: "/find-artisan",
    },
    {
      title: "Manage Utilities",
      desc: "Pay bills, airtime, and data with ease.",
      icon: <Zap size={32} />,
      color: "bg-purple-500/10 border-purple-400/30 hover:bg-purple-500/20",
      route: "/utilities",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b173d] text-white flex flex-col items-center justify-center px-6 py-10 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-white">
          WELCOME TO <span className="text-orange-400">SPECTRUM ARENA</span>{" "}
          {user?.full_name ? user.full_name.toUpperCase() : ""}
        </h1>
        <p className="text-gray-300">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {actions.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.route)}
            className={`cursor-pointer border rounded-2xl p-6 transition-all ${item.color} hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-orange-400 mb-1">{item.title}</h2>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
              <div className="text-orange-400">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

