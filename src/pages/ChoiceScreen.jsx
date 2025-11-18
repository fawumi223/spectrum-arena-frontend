import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ChoiceScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
      >
        <ArrowLeft size={22} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-10 text-center">
        What would you like to do today?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl mx-auto">

        {/* FIND JOBS */}
        <button
          onClick={() => navigate("/find-jobs")}
          className="bg-[#111827] hover:bg-[#162033] p-6 rounded-xl border border-white/10 shadow-md text-left"
        >
          <h2 className="text-xl font-semibold mb-2 text-brightOrange">Find Jobs</h2>
          <p className="text-white/70 text-sm">Browse available jobs from verified sources.</p>
        </button>

        {/* FIND ARTISANS */}
        <button
          onClick={() => navigate("/find-artisans")}
          className="bg-[#111827] hover:bg-[#162033] p-6 rounded-xl border border-white/10 shadow-md text-left"
        >
          <h2 className="text-xl font-semibold mb-2 text-brightOrange">Find Artisans</h2>
          <p className="text-white/70 text-sm">Discover artisans near you automatically.</p>
        </button>

        {/* POST JOB */}
        <button
          onClick={() => navigate("/post-job")}
          className="bg-[#111827] hover:bg-[#162033] p-6 rounded-xl border border-white/10 shadow-md text-left"
        >
          <h2 className="text-xl font-semibold mb-2 text-brightOrange">Post a Job</h2>
          <p className="text-white/70 text-sm">Hire artisans for any task.</p>
        </button>

        {/* CREATE SAVINGS */}
        <button
          onClick={() => navigate("/savings/create")}
          className="bg-[#111827] hover:bg-[#162033] p-6 rounded-xl border border-white/10 shadow-md text-left"
        >
          <h2 className="text-xl font-semibold mb-2 text-brightOrange">Create Savings Plan</h2>
          <p className="text-white/70 text-sm">Lock your funds & withdraw later.</p>
        </button>

        {/* MY SAVINGS */}
        <button
          onClick={() => navigate("/savings")}
          className="bg-[#111827] hover:bg-[#162033] p-6 rounded-xl border border-white/10 shadow-md text-left"
        >
          <h2 className="text-xl font-semibold mb-2 text-brightOrange">My Savings</h2>
          <p className="text-white/70 text-sm">Track your savings and goals.</p>
        </button>

        {/* BUY AIRTIME */}
        <button
          onClick={() => navigate("/bills/airtime")}
          className="bg-[#111827] hover:bg-[#162033] p-6 rounded-xl border border-white/10 shadow-md text-left"
        >
          <h2 className="text-xl font-semibold mb-2 text-brightOrange">Buy Airtime</h2>
          <p className="text-white/70 text-sm">MTN, Glo, Airtel, 9mobile.</p>
        </button>

        {/* BUY DATA */}
        <button
          onClick={() => navigate("/bills/data")}
          className="bg-[#111827] hover:bg-[#162033] p-6 rounded-xl border border-white/10 shadow-md text-left"
        >
          <h2 className="text-xl font-semibold mb-2 text-brightOrange">Buy Data</h2>
          <p className="text-white/70 text-sm">Fast and secure data purchase.</p>
        </button>

        {/* PAY ELECTRICITY */}
        <button
          onClick={() => navigate("/bills/electricity")}
          className="bg-[#111827] hover:bg-[#162033] p-6 rounded-xl border border-white/10 shadow-md text-left"
        >
          <h2 className="text-xl font-semibold mb-2 text-brightOrange">Pay Electricity</h2>
          <p className="text-white/70 text-sm">Pay NEPA prepaid/postpaid bills.</p>
        </button>

      </div>
    </div>
  );
}

