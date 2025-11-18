import React, { useEffect, useState } from "react";

export default function MySavings() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  const BASE = "http://127.0.0.1:8000/api/savings/";

  useEffect(() => {
    fetchSavings();
  }, []);

  async function fetchSavings() {
    const res = await fetch(`${BASE}my-savings/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setData(json);
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const locked = !data.is_unlocked;

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <div className="max-w-xl mx-auto bg-[#111827] p-6 rounded-xl border border-white/10 shadow-lg">

        <h1 className="text-2xl font-bold mb-4">My Savings</h1>

        <p className="text-lg">
          <strong>Total Saved:</strong> ₦{data.total_saved}
        </p>

        <p className="mt-3">
          <strong>Unlock Date:</strong> {data.unlock_date}
        </p>

        <p className="mt-2 text-orange-400">
          {locked ? `Locked — wait ${data.days_remaining} days` : "Unlocked — Ready to withdraw"}
        </p>

        <a
          href="/withdraw-savings"
          className={`mt-6 block text-center py-3 rounded-lg font-bold ${
            locked
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-brightOrange text-deepBlue hover:opacity-90"
          }`}
        >
          Withdraw
        </a>
      </div>
    </div>
  );
}

