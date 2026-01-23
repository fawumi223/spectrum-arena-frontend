import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function DepositSavings() {
  const navigate = useNavigate();
  const { id } = useParams(); // savings ID from URL

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  const deposit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/${id}/deposit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Deposit successful!");
        setTimeout(() => navigate("/savings"), 800);
      } else {
        setMessage(data.error || "Failed to deposit.");
      }
    } catch (error) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
      >
        <ArrowLeft size={22} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-6">Deposit to Savings</h1>

      {message && <p className="text-red-400 mb-4">{message}</p>}

      <form
        onSubmit={deposit}
        className="bg-[#111827] p-6 rounded-xl border border-white/10 space-y-5"
      >
        {/* Deposit input */}
        <div>
          <label className="block mb-2 text-white/70">Amount</label>
          <input
            type="number"
            className="w-full bg-[#1f2937] p-3 text-white rounded-md"
            placeholder="₦0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brightOrange text-deepBlue font-bold py-3 rounded-lg"
        >
          {loading ? "Processing..." : "Deposit"}
        </button>
      </form>
    </div>
  );
}

