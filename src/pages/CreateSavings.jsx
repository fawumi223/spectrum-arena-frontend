import React, { useState } from "react";

export default function CreateSavings() {
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  async function submit() {
    if (!amount || !days) return alert("Fill all fields");

    setLoading(true);

    const unlock_date = new Date();
    unlock_date.setDate(unlock_date.getDate() + Number(days));

    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE}/savings/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        unlock_date: unlock_date.toISOString().split("T")[0],
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Savings created successfully!");
      window.location.href = "/savings";
    } else {
      alert(data.error || "Failed to create savings");
    }
  }

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Start a Savings Plan</h1>

      <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md max-w-md">

        {/* Amount */}
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount (₦)"
          type="number"
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 outline-none text-white"
        />

        {/* Lock Period */}
        <input
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Lock duration (days)"
          type="number"
          className="w-full bg-[#1a1d25] p-3 rounded-md mb-4 outline-none text-white"
        />

        <button
          disabled={loading}
          onClick={submit}
          className="w-full bg-brightOrange text-deepBlue font-bold py-3 rounded-md hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create Savings"}
        </button>
      </div>
    </div>
  );
}

