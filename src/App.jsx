import React, { useState } from "react";
import axios from "axios";

/* eslint-disable jsx-a11y/anchor-is-valid */

// -----------------------------------------------------------------------------
// Spectrum Arena - Single-file React landing page (Drop into src/App.jsx)
// Assumptions:
// - TailwindCSS configured as described earlier
// - Colors extended in tailwind.config.js: deepBlue: #0A1F44, brightOrange: #FF8C00
// - Place your logo at /public/logo.png
// - Create .env file: REACT_APP_API_BASE=https://api.spectrumarena.com
// -----------------------------------------------------------------------------

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "/api/",
  headers: { "Content-Type": "application/json" },
});

function Navbar({ onOpenSignup, onOpenLogin }) {
  return (
    <nav className="w-full bg-deepBlue/100 text-white py-5 px-6 md:px-12 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Spectrum Arena" className="h-10 w-10" />
        <span className="font-semibold text-xl md:text-2xl">Spectrum Arena</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-lg">
        <a href="#" className="hover:underline">Home</a>
        <a href="#find" className="hover:underline">Find Artisan</a>
        <a href="#jobs" className="hover:underline">Jobs</a>
        <a href="#savings" className="hover:underline">Savings & Thrift</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenLogin}
          className="hidden md:inline-block px-4 py-2 rounded-md border border-white/20"
        >
          Log in
        </button>
        <button
          onClick={onOpenSignup}
          className="bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-md shadow-md"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

function Hero({ onOpenSignup }) {
  return (
    <header className="min-h-[60vh] flex items-center justify-center text-center px-6 md:px-20 bg-deepBlue">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Connecting You to Skilled Artisans and Local Job Listings</h1>
        <p className="mt-6 text-lg text-white/80">Spectrum Arena helps you find artisans in your area and automatically fetches local job opportunities.</p>

        <div className="mt-10">
          <button
            onClick={onOpenSignup}
            className="bg-brightOrange text-deepBlue font-bold px-8 py-3 rounded-lg shadow-lg text-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Sign up and verify with OTP",
      icon: (
        <div className="w-14 h-14 rounded-md bg-brightOrange/95 flex items-center justify-center">OTP</div>
      ),
    },
    {
      title: "Discover nearby jobs automatically",
      icon: (
        <div className="w-14 h-14 rounded-md bg-brightOrange/95 flex items-center justify-center">📍</div>
      ),
    },
    {
      title: "Find skilled artisans based on location",
      icon: (
        <div className="w-14 h-14 rounded-md bg-brightOrange/95 flex items-center justify-center">👷</div>
      ),
    },
    {
      title: "Start saving with our thrift plan",
      icon: (
        <div className="w-14 h-14 rounded-md bg-brightOrange/95 flex items-center justify-center">💰</div>
      ),
    },
  ];

  return (
    <section id="how" className="py-16 px-6 md:px-12 bg-deepBlue text-white">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-brightOrange">HOW IT WORKS</h3>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="bg-deepBlue/80 p-6 rounded-xl shadow-inner min-h-[160px] flex flex-col items-center gap-4">
            {s.icon}
            <p className="text-center">{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SavingsTeaser() {
  return (
    <section id="savings" className="py-16 px-6 md:px-12 bg-deepBlue text-white">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-brightOrange">SAVINGS & THRIFT</h3>
      <p className="mt-6 text-center max-w-3xl mx-auto text-white/80">
        Flexible savings plans for individuals and companies, designed to help you reach your financial goals. Automated plans, company payroll savings, and one-off deposits — all secured and simple.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-deepBlue/95 text-white py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="h-10 w-10" />
          <div>
            <div className="font-semibold text-lg">Spectrum Arena</div>
            <div className="text-sm text-white/70">info@spectrumarena.com</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" aria-label="facebook" className="w-10 h-10 rounded-full bg-brightOrange/95 flex items-center justify-center">f</a>
          <a href="#" aria-label="twitter" className="w-10 h-10 rounded-full bg-brightOrange/95 flex items-center justify-center">t</a>
          <a href="#" aria-label="linkedin" className="w-10 h-10 rounded-full bg-brightOrange/95 flex items-center justify-center">in</a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-white/60">© {new Date().getFullYear()} Spectrum Arena. All rights reserved.</div>
    </footer>
  );
}

// ----------------------- Auth modals & forms (basic, connects to backend) -----------------------
function SignupModal({ onClose, onOTPRequest }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // POST to backend signup endpoint
      await api.post("users/signup/", { full_name: fullName, email: email || null, phone_number: phone, password });
      // Assume backend sends OTP to phone/email; open otp screen
      onOTPRequest(phone);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Signup failed");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h4 className="text-deepBlue font-bold text-lg">Create account</h4>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <input required value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Full name" className="p-3 rounded-md border" />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email (optional)" className="p-3 rounded-md border" />
          <input required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone number" className="p-3 rounded-md border" />
          <input required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-3 rounded-md border" />

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-deepBlue text-white rounded-md">{loading ? "Creating..." : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function OTPModal({ phone, onClose }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function verify(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("users/verify-otp/", { phone_number: phone, otp });
      // On success, redirect to profile/dashboard (front-end routing)
      window.location.href = "/dashboard"; // placeholder
    } catch (err) {
      setError(err?.response?.data?.message || "OTP verification failed");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h4 className="text-deepBlue font-bold text-lg">Enter 6-digit OTP</h4>
        <p className="text-sm text-gray-600">We sent a 6-digit code to {phone}</p>
        <form onSubmit={verify} className="mt-4 flex flex-col gap-3">
          <input maxLength={6} value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="123456" className="p-3 rounded-md border text-center text-lg tracking-widest" />

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-deepBlue text-white rounded-md">{loading ? "Verifying..." : "Verify"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await api.post("users/login/", { email: email || null, phone_number: phone, password });
      // Save token locally and redirect
      localStorage.setItem("token", resp.data.token);
      window.location.href = "/dashboard"; // placeholder
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h4 className="text-deepBlue font-bold text-lg">Log in</h4>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email (optional)" className="p-3 rounded-md border" />
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone number" className="p-3 rounded-md border" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-3 rounded-md border" />

          <a href="#" className="text-sm text-blue-600 underline">Forgot password?</a>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-deepBlue text-white rounded-md">{loading ? "Logging in..." : "Log in"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------- Main App --------------------------------
export default function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [otpPhone, setOtpPhone] = useState(null);

  return (
    <div className="min-h-screen bg-deepBlue text-white font-sans">
      <Navbar onOpenSignup={() => setShowSignup(true)} onOpenLogin={() => setShowLogin(true)} />

      <main>
        <Hero onOpenSignup={() => setShowSignup(true)} />
        <HowItWorks />
        <SavingsTeaser />
      </main>

      <Footer />

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onOTPRequest={(phone) => setOtpPhone(phone)}
        />
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {otpPhone && <OTPModal phone={otpPhone} onClose={() => setOtpPhone(null)} />}
    </div>
  );
}

