import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function WithdrawSavings() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [savings, setSavings] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // -----------------------------------------
  // LOAD SAVINGS PLAN
  // -----------------------------------------
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

      if (res.ok) {
        setSavings(data);
      } else {
        setMessage(data.error || "Unable to fetch savings data.");
      }
    } catch (err) {
      setMessage("Network error.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadSavings();
  }, []);

  // -----------------------------------------
  // HANDLE WITHDRAWAL
  // -----------------------------------------
  const submitWithdrawal = async () => {
    setMessage(null);

    const unlockDate = new Date(savings.unlock_date);
    const now = new Date();

    // CHECK LOCK CONDITION
    if (unlockDate > now) {
      setMessage(
        `⛔ Withdrawal is locked until ${unlockDate.toDateString()}`
      );
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid withdrawal amount.");
      return;
    }

    if (Number(amount) > Number(savings.amount)) {
      setMessage("Withdrawal amount exceeds your available balance.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/withdraw/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          savings_id: savings.id,
          amount: amount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Withdrawal successful!");
        navigate("/savings/me");
      } else {
        setMessage(data.error || "Withdrawal failed.");
      }
    } catch (err) {
      setMessage("Network error.");
    }
  };

  // -----------------------------------------
  // LOADING SCREEN
  // -----------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Loading savings…
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

  // CHECK IF LOCKED
  const isLocked = new Date(savings.unlock_date) > new Date();

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

      <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
      <p className="text-white/60 mb-10">Withdraw from your savings plan</p>

      {/* STATUS MESSAGE */}
      {message && (
        <p className="text-center text-red-400 mb-6">{message}</p>
      )}

      <div className="bg-[#111827] p-6 rounded-xl border border-white/10 shadow-md">

        <h2 className="text-xl font-semibold mb-3">Available Balance</h2>

        <p className="text-3xl font-bold text-brightOrange mb-6">
          ₦{Number(savings.amount).toLocaleString()}
        </p>

        {/* LOCK STATUS */}
        {isLocked ? (
          <p className="text-red-400 mb-6">
            🔒 Withdrawal locked until{" "}
            <strong>
              {new Date(savings.unlock_date).toDateString()}
            </strong>
          </p>
        ) : (
          <p className="text-green-400 mb-6">🔓 You can withdraw now.</p>
        )}

        {/* INPUT */}
        <label className="block mb-2 text-white/70">
          Enter amount to withdraw
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-[#1f2937] text-white p-3 rounded-md outline-none mb-6"
          placeholder="e.g. 5000"
        />

        {/* SUBMIT BUTTON */}
        <button
          disabled={isLocked}
          onClick={submitWithdrawal}
          className={`w-full py-3 rounded-lg font-bold ${
            isLocked
              ? "bg-gray-600 text-gray-300"
              : "bg-brightOrange text-deepBlue hover:bg-orange-400"
          }`}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

