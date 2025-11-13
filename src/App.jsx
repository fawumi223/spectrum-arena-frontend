import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import ChoiceScreen from "./pages/ChoiceScreen";
import PostJob from "./pages/PostJob";
import FindJobs from "./pages/FindJobs"; // ✅ added page

// ---------------------------- API CONFIG ----------------------------
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// ---------------------------- NAVBAR ----------------------------
function Navbar({ onOpenSignup, onOpenLogin }) {
  return (
    <nav className="w-full bg-deepBlue text-white py-5 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Spectrum Arena" className="h-10 w-10" />
        <span className="font-semibold text-xl md:text-2xl">Spectrum Arena</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-lg">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/find-jobs" className="hover:underline">Find Jobs</Link>
        <a href="#find" className="hover:underline">Find Artisan</a>
        <a href="#savings" className="hover:underline">Savings & Thrift</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenLogin}
          className="hidden md:inline-block px-4 py-2 rounded-md border border-white/20 hover:bg-white/10"
        >
          Log in
        </button>
        <button
          onClick={onOpenSignup}
          className="bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-md shadow-md hover:bg-orange-400"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

// ---------------------------- HERO ----------------------------
function Hero({ onOpenSignup }) {
  return (
    <header className="min-h-[60vh] flex items-center justify-center text-center px-6 md:px-12 bg-gradient-to-b from-deepBlue to-black">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Connect, Skill & Earn with Spectrum Arena
        </h1>
        <p className="mt-6 text-lg text-white/80">
          Spectrum Arena helps you find artisans, post jobs, and manage savings — all in one place.
        </p>
        <div className="mt-10">
          <button
            onClick={onOpenSignup}
            className="bg-brightOrange text-deepBlue font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-400"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------------------------- HOW IT WORKS ----------------------------
function HowItWorks() {
  const steps = [
    "Sign up and verify with OTP",
    "Discover nearby jobs automatically",
    "Find skilled artisans based on location",
    "Start saving with our thrift plan",
  ];
  return (
    <section id="how" className="py-16 px-6 md:px-12 bg-deepBlue text-white">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-brightOrange">
        HOW IT WORKS
      </h3>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((title, i) => (
          <div
            key={i}
            className="bg-deepBlue/80 p-6 rounded-xl shadow-inner min-h-[160px] flex items-center justify-center"
          >
            <p className="text-center text-white/90">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------- FOOTER ----------------------------
function Footer() {
  return (
    <footer id="contact" className="bg-deepBlue text-white py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="h-10 w-10" />
          <div>
            <div className="font-semibold text-lg">Spectrum Arena</div>
            <div className="text-sm text-white/70">info@spectrumarena.com</div>
          </div>
        </div>
        <div className="text-center text-sm text-white/60">
          © {new Date().getFullYear()} Spectrum Arena. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ---------------------------- SIGNUP MODAL ----------------------------
function SignupModal({ onClose, onOTPRequest }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await api.post("users/signup/", {
        full_name: fullName,
        email: email || null,
        phone_number: phone,
        password,
      });
      localStorage.setItem("user", JSON.stringify({ full_name: fullName }));
      onOTPRequest(phone);
      onClose();
      navigate("/choice");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Signup failed");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-300 hover:text-white">
          <ArrowLeft size={22} />
        </button>
        <h4 className="text-center font-bold text-lg mb-4">Create account</h4>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="p-3 rounded bg-gray-800 border border-gray-600" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className="p-3 rounded bg-gray-800 border border-gray-600" />
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="p-3 rounded bg-gray-800 border border-gray-600" />
          <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="p-3 rounded bg-gray-800 border border-gray-600" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="mt-3 bg-brightOrange text-deepBlue font-semibold p-3 rounded-md hover:bg-orange-400">
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------- LOGIN MODAL ----------------------------
function LoginModal({ onClose }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await api.post("users/login/", {
        phone_number: phone,
        password,
      });
      localStorage.setItem("token", resp.data.access);
      localStorage.setItem("user", JSON.stringify(resp.data.user));
      navigate("/choice");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-300 hover:text-white">
          <ArrowLeft size={22} />
        </button>
        <h4 className="text-center font-bold text-lg mb-4">Log in</h4>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="p-3 rounded bg-gray-800 border border-gray-600" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="p-3 rounded bg-gray-800 border border-gray-600" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="mt-3 bg-brightOrange text-deepBlue font-semibold p-3 rounded-md hover:bg-orange-400">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------- LANDING PAGE ----------------------------
function LandingPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [otpPhone, setOtpPhone] = useState(null);

  return (
    <div className="min-h-screen bg-deepBlue text-white font-sans">
      <Navbar onOpenSignup={() => setShowSignup(true)} onOpenLogin={() => setShowLogin(true)} />
      <main>
        <Hero onOpenSignup={() => setShowSignup(true)} />
        <HowItWorks />
      </main>
      <Footer />

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} onOTPRequest={(p) => setOtpPhone(p)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

// ---------------------------- MAIN APP ROUTER ----------------------------
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/choice" element={<ChoiceScreen />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
}

