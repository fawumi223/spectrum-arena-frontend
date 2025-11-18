import React, { useEffect, useState } from "react";

export default function WithdrawSavings() {
  const [amount, setAmount] = useState("");
  const [savings, setSavings] = useState(null);
  const token = localStorage.getItem("token");

  const BASE = "http://127.0.0.1:8000/api/savings/";

  useEffect(() => {
    loadSavings();
  }, []);

  async function loadSavings() {
    const res = await fetch(`${BASE}my-savings/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSavings(data);
  }

  async function submitWithdraw(e) {
    e.preventDefault();

    const res = await fetch(`${BASE}withdraw/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    alert(data.message || "Withdraw complete!");
  }

  if (!savings) return <div className="text-white p-10">Loading...</div>;

  if (!savings.is_unlocked) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        <p>Your savings are still locked.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <div className="max-w-md mx-auto bg-[#111827] p-6 rounded-xl border border-white/10 shadow-lg">

        <h1 className="text-2xl font-bold mb-5">Withdraw Savings</h1>

        <p className="mb-3">Available: ₦{savings.total_saved}</p>

        <form className="flex flex-col gap-4" onSubmit={submitWithdraw}>
          <input
            type="number"
            placeholder="Amount (₦)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#0d1117] border border-white/10 outline-none"
          />

          <button
            type="submit"
            className="bg-brightOrange text-deepBlue font-bold py-3 rounded-lg hover:opacity-90"
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
}

