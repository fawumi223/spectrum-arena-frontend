import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifySavingsOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  // Values passed from WithdrawSavings.jsx  
  const { savings_id, amount } = location.state || {};

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  const submitOTP = async () => {
    setMessage(null);

    if (!otp || otp.length !== 6) {
      setMessage("Enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/withdraw/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          savings_id,
          amount,
          otp,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Withdrawal successful!");
        navigate("/savings");
      } else {
        setMessage(data.error || "Invalid OTP, try again.");
      }
    } catch (error) {
      setMessage("Network error.");
      setLoading(false);
    }
  };

  // If user somehow arrives here without data
  if (!savings_id || !amount) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Invalid request.
      </div>
    );
  }

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

      <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
      <p className="text-white/60 mb-8">
        A 6-digit OTP was sent to your email. Enter it below to confirm withdrawal.
      </p>

      {message && (
        <p className="text-center text-red-400 mb-6">{message}</p>
      )}

      <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md">
        <label className="block mb-2 text-white/70">OTP Code</label>

        <input
          type="number"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full bg-[#1f2937] text-white p-3 rounded-md outline-none mb-6 text-center tracking-widest text-xl"
          placeholder="••••••"
        />

        <button
          onClick={submitOTP}
          disabled={loading}
          className="w-full py-3 rounded-lg font-bold bg-brightOrange text-deepBlue hover:bg-orange-400"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

