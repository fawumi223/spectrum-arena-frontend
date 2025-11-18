import React, { useState } from "react";

export default function CreateSavings() {
  const [amount, setAmount] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const BASE = "http://127.0.0.1:8000/api/savings/";

  async function submitSavings(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${BASE}create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        unlock_date: unlockDate,
      }),
    });

    const data = await res.json();
    alert(data.message || "Savings created!");

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <div className="max-w-md mx-auto bg-[#111827] p-6 rounded-xl shadow-lg border border-white/10">
        <h1 className="text-2xl font-bold text-center mb-6">Start a Savings Plan</h1>

        <form className="flex flex-col gap-4" onSubmit={submitSavings}>
          <input
            type="number"
            placeholder="Amount (₦)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#0d1117] border border-white/10 outline-none"
          />

          <input
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#0d1117] border border-white/10 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-brightOrange text-deepBlue font-bold py-3 rounded-lg hover:opacity-90"
          >
            {loading ? "Saving..." : "Start Saving"}
          </button>
        </form>
      </div>
    </div>
  );
}

