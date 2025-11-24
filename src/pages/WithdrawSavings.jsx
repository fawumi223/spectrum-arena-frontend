import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function WithdrawSavings() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [savings, setSavings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);        // 1 = Enter amount, 2 = Enter OTP
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // -----------------------------
  // LOAD SAVINGS
  // -----------------------------
  const loadSavings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/me/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      setSavings(data);
    } catch {
      setMessage("Failed to load savings.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSavings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!savings) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Savings record not found.
      </div>
    );
  }

  const isLocked = new Date(savings.locked_until) > new Date();

  // -----------------------------
  // STEP 1: SEND OTP
  // -----------------------------
  const sendOTP = async () => {
    setMessage("");

    if (isLocked) {
      setMessage(
        `Savings is still locked until ${new Date(
          savings.locked_until
        ).toDateString()}`
      );
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid withdrawal amount.");
      return;
    }

    if (Number(amount) > Number(savings.amount)) {
      setMessage("Withdrawal amount exceeds available balance.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          savings_id: savings.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2); // Move to OTP screen
        setMessage("OTP sent. Check your email.");
      } else {
        setMessage(data.error || "OTP request failed.");
      }
    } catch {
      setMessage("Network error.");
    }
  };

  // -----------------------------
  // STEP 2: VERIFY OTP & WITHDRAW
  // -----------------------------
  const verifyAndWithdraw = async () => {
    setMessage("");

    if (!otp || otp.length !== 6) {
      setMessage("Enter a valid 6-digit OTP.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/withdraw/${savings.id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          otp: otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Withdrawal successful!");
        navigate("/savings");
      } else {
        setMessage(data.error || "OTP verification failed.");
      }
    } catch {
      setMessage("Network error.");
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
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

      <h1 className="text-3xl font-bold mb-2">Withdraw Savings</h1>
      <p className="text-white/60 mb-10">Secure withdrawal using OTP</p>

      {message && <p className="text-red-400 mb-6">{message}</p>}

      {/* BOX */}
      <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md">

        <h2 className="text-xl font-semibold mb-3">Balance</h2>
        <p className="text-3xl font-bold text-brightOrange mb-6">
          ₦{Number(savings.amount).toLocaleString()}
        </p>

        {/* STEP 1: ENTER AMOUNT */}
        {step === 1 && (
          <>
            <label className="block mb-2 text-white/70">Withdrawal Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#1f2937] text-white p-3 rounded-md outline-none mb-6"
              placeholder="e.g. 6000"
            />

            <button
              onClick={sendOTP}
              disabled={isLocked}
              className={`w-full py-3 rounded-lg font-bold ${
                isLocked
                  ? "bg-gray-600 text-gray-300"
                  : "bg-brightOrange text-deepBlue hover:bg-orange-400"
              }`}
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2: ENTER OTP */}
        {step === 2 && (
          <>
            <label className="block mb-2 text-white/70">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full bg-[#1f2937] text-white p-3 rounded-md outline-none mb-6 tracking-widest text-center"
              placeholder="6-digit code"
            />

            <button
              onClick={verifyAndWithdraw}
              className="w-full py-3 rounded-lg font-bold bg-brightOrange text-deepBlue hover:bg-orange-400"
            >
              Confirm Withdrawal
            </button>

            <button
              onClick={sendOTP}
              className="w-full py-3 mt-3 rounded-lg font-semibold text-white bg-[#1f2937] border border-white/20 hover:bg-[#2a3548]"
            >
              Resend OTP
            </button>
          </>
        )}

      </div>
    </div>
  );
}

