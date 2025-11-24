import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SavingsActivity() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/activity/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setList(data);
      } else {
        setError(data.error || "Unable to fetch activity.");
      }
    } catch (err) {
      setError("Network error.");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-deepBlue text-white flex items-center justify-center">
        Loading activity…
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

      <h1 className="text-3xl font-bold mb-6">Savings Activity</h1>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="space-y-4">
        {list.length === 0 && (
          <p className="text-center text-white/50">No activity yet.</p>
        )}

        {list.map((tx) => (
          <div
            key={tx.id}
            className="bg-[#111827] p-4 rounded-xl border border-white/10 shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-semibold capitalize">
                  {tx.type === "deposit" && "Deposit"}
                  {tx.type === "withdrawal" && "Withdrawal"}
                  {tx.type === "release" && "Auto Release"}
                </p>

                <p className="text-white/60 text-sm">
                  {new Date(tx.created_at).toLocaleString()}
                </p>

                {tx.note && (
                  <p className="text-white/40 text-xs mt-1">{tx.note}</p>
                )}
              </div>

              <p
                className={`text-xl font-bold ${
                  tx.type === "withdrawal"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                ₦{Number(tx.amount).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

