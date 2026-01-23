import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChoiceScreen() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.full_name ? user.full_name.split(" ")[0] : "User";

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-12 font-sans">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
          Welcome to Spectrum Arena, {firstName}
        </h1>
        <p className="mt-3 text-white/70 text-base md:text-lg">
          What would you like to do today?
        </p>
      </div>

      {/* ACTION GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">

        {/* POST JOB */}
        <button
          onClick={() => navigate("/post-job")}
          className="bg-[#111827] hover:bg-[#162033] rounded-xl p-6 border border-white/10 text-left"
        >
          <div className="text-brightOrange text-2xl mb-2">💼</div>
          <h2 className="text-xl font-semibold text-brightOrange mb-1">
            Post a Job
          </h2>
          <p className="text-white/70 text-sm">
            Create & share new job openings easily.
          </p>
        </button>

        {/* FIND JOBS */}
        <button
          onClick={() => navigate("/find-jobs")}
          className="bg-[#111827] hover:bg-[#162033] rounded-xl p-6 border border-white/10 text-left"
        >
          <div className="text-brightOrange text-2xl mb-2">🔍</div>
          <h2 className="text-xl font-semibold text-brightOrange mb-1">
            Find a Job
          </h2>
          <p className="text-white/70 text-sm">
            Discover job listings near your location.
          </p>
        </button>

        {/* FIND ARTISANS */}
        <button
          onClick={() => navigate("/find-artisans")}
          className="bg-[#111827] hover:bg-[#162033] rounded-xl p-6 border border-white/10 text-left"
        >
          <div className="text-brightOrange text-2xl mb-2">🛠️</div>
          <h2 className="text-xl font-semibold text-brightOrange mb-1">
            Find Skilled Artisan
          </h2>
          <p className="text-white/70 text-sm">
            Locate reliable artisans in your area.
          </p>
        </button>

        {/* MANAGE UTILITIES */}
        <button
          onClick={() => navigate("/bills")}
          className="bg-[#111827] hover:bg-[#162033] rounded-xl p-6 border border-white/10 text-left"
        >
          <div className="text-brightOrange text-2xl mb-2">⚡</div>
          <h2 className="text-xl font-semibold text-brightOrange mb-1">
            Manage Utilities
          </h2>
          <p className="text-white/70 text-sm">
            Pay bills, airtime, and data with ease.
          </p>
        </button>

      </div>

      {/* FOOTER (OPTIONAL) */}
      <div className="mt-16 text-center text-white/40 text-sm">
        Spectrum Arena © {new Date().getFullYear()}
      </div>
    </div>
  );
}

