import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Search, Wrench, Zap } from "lucide-react";

export default function ChoiceScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // Retrieve user info from localStorage (after login)
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.full_name) {
      const nameParts = userData.full_name.trim().split(" ");
      setFirstName(nameParts[0].toUpperCase());
    }
  }, []);

  const options = [
    {
      title: "Post a Job",
      icon: <Briefcase size={48} color="#FF8C00" />,
      route: "/post-job",
      description: "Create and share new job openings easily.",
    },
    {
      title: "Find a Job",
      icon: <Search size={48} color="#FF8C00" />,
      route: "/find-job",
      description: "Discover job listings near your location.",
    },
    {
      title: "Find Skilled Artisan",
      icon: <Wrench size={48} color="#FF8C00" />,
      route: "/find-artisan",
      description: "Locate reliable artisans in your area.",
    },
    {
      title: "Manage Utilities",
      icon: <Zap size={48} color="#FF8C00" />,
      route: "/utilities",
      description: "Pay bills, airtime, and data with ease.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1F44] flex flex-col items-center justify-center text-white px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        WELCOME TO SPECTRUM ARENA {firstName || ""}
      </h1>
      <p className="text-white/80 mb-10 text-center">
        What would you like to do today?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {options.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => navigate(opt.route)}
            className="cursor-pointer bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center text-center"
          >
            {opt.icon}
            <h3 className="mt-4 text-xl font-semibold">{opt.title}</h3>
            <p className="mt-2 text-white/70 text-sm">{opt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

