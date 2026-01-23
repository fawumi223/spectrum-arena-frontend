import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function DepositSavings() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // -----------------------------------------
  // HANDLE DEPOSIT
  // -----------------------------------------
  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/savings/deposit/${id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            amount: Number(amount),
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Deposit successful");
        setAmount("");

        // Go back to savings page after short delay
        setTimeout(() => {
          navigate(-1);
        }, 1200);
      } else {
        setMessage(data.error || "Deposit failed.");
      }
    } catch (err) {
      setMessage("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

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

      <h1 className="text-3xl font-bold mb-2">Deposit Savings</h1>
      <p className="text-white/60 mb-8">
        Add funds to your savings account
      </p>

      {/* MESSAGE */}
      {message && (
        <p className="mb-6 text-center text-yellow-400">
          {message}
        </p>
      )}

      {/* DEPOSIT FORM */}
      <form
        onSubmit={handleDeposit}
        className="bg-[#111827] p-6 rounded-xl border border-white/10 max-w-md"
      >
        <label className="block text-sm text-white/70 mb-2">
          Amount (₦)
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-4 py-3 rounded-lg bg-[#1f2937] text-white outline-none border border-white/10 focus:border-brightOrange"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-brightOrange text-deepBlue font-bold py-3 rounded-lg disabled:opacity-60"
        >
          {loading ? "Processing..." : "Deposit"}
        </button>
      </form>
    </div>
  );
}

