import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import StatusModal from "../components/StatusModal";

export default function WithdrawSavings() {
  const { id } = useParams(); // savings_id
  const navigate = useNavigate();

  const [savings, setSavings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [earlyBreak, setEarlyBreak] = useState(false);
  const [error, setError] = useState("");

  const [modal, setModal] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const BASE_URL =
    process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

  // ---------------------------------
  // LOAD SAVINGS RECORD
  // ---------------------------------
  const loadSavings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/${id}/`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Unable to load savings record.");
        return;
      }

      setSavings(data);
    } catch {
      setError("Network error while loading savings.");
    } finally {
      setLoading(false);
    }
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

  const isLocked = savings.status === "locked";

  // ---------------------------------
  // WITHDRAW
  // ---------------------------------
  const withdraw = async () => {
    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/savings/${id}/withdraw/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          early_break: earlyBreak,
        }),
      });

      const data = await res.json();
      setSubmitting(false);

      if (!res.ok) {
        setError(data.detail || "Unable to withdraw savings.");
        return;
      }

      setModal({
        open: true,
        type: "success",
        title: "Withdrawal Successful",
        message:
          earlyBreak && isLocked
            ? "Your savings was withdrawn early with a penalty applied."
            : "Your savings has been credited to your wallet.",
      });
    } catch {
      setSubmitting(false);
      setError("Network error.");
    }
  };

  // ---------------------------------
  // UI
  // ---------------------------------
  return (
    <div className="min-h-screen bg-deepBlue text-white px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/70 hover:text-white mb-8"
      >
        <ArrowLeft size={22} />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-2">Withdraw Savings</h1>
      <p className="text-white/60 mb-8">
        Withdraw to your wallet securely
      </p>

      {error && <p className="text-red-400 mb-6">{error}</p>}

      <div className="bg-[#111827] p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-2">Balance</h2>
        <p className="text-3xl font-bold text-brightOrange mb-6">
          ₦{Number(savings.amount).toLocaleString()}
        </p>

        {isLocked && (
          <div className="mb-5 text-sm text-yellow-400">
            This savings is locked until{" "}
            {new Date(savings.locked_until).toDateString()}.
            <br />
            You may withdraw early with a 10% penalty.
          </div>
        )}

        {isLocked && (
          <label className="flex items-center gap-2 mb-5">
            <input
              type="checkbox"
              checked={earlyBreak}
              onChange={(e) => setEarlyBreak(e.target.checked)}
            />
            <span>Withdraw early (10% penalty)</span>
          </label>
        )}

        <button
          onClick={withdraw}
          disabled={submitting || (isLocked && !earlyBreak)}
          className={`w-full py-3 rounded-lg font-bold ${
            submitting
              ? "bg-gray-600 text-gray-300"
              : "bg-brightOrange text-deepBlue hover:bg-orange-400"
          }`}
        >
          {submitting ? "Processing..." : "Withdraw"}
        </button>
      </div>

      {/* STATUS MODAL */}
      <StatusModal
        open={modal.open}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => {
          setModal({ ...modal, open: false });
          navigate("/savings");
        }}
      />
    </div>
  );
}

