import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user_id, otp_channel } = location.state || {};

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Safe redirect (no render-time navigation)
  useEffect(() => {
    if (!user_id) {
      navigate("/", { replace: true });
    }
  }, [user_id, navigate]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedOtp = otp.replace(/\s+/g, "").trim();

      const resp = await api.post("users/verify-otp/", {
        user_id,
        otp: cleanedOtp,
      });

      // ✅ Store JWT access token
      localStorage.setItem("token", resp.data.access);

      // ✅ Go to post-login flow
      navigate("/choice", { replace: true });
    } catch (err) {
      alert(
        err?.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  }

  async function resendOTP() {
    try {
      await api.post("users/resend-otp/", { user_id });
      alert(`OTP resent via ${otp_channel}`);
    } catch {
      alert("Unable to resend OTP");
    }
  }

  return (
    <div className="min-h-screen bg-deepBlue flex items-center justify-center text-white">
      <div className="bg-[#0d0f14] rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2 text-center">
          Verify Your Account
        </h2>

        <p className="text-center text-sm text-white/70 mb-6">
          Enter the code sent via {otp_channel}
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            className="bg-black/30 p-3 rounded-md text-center tracking-widest"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            autoFocus
          />

          <button
            disabled={loading}
            className="bg-brightOrange text-deepBlue font-semibold p-3 rounded-md disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <button
          onClick={resendOTP}
          className="mt-4 text-sm text-white/70 underline block mx-auto"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

