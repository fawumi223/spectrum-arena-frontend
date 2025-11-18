import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

import { ArrowLeft } from "lucide-react";

// Pages
import ChoiceScreen from "./pages/ChoiceScreen";
import PostJob from "./pages/PostJob";
import FindJobs from "./pages/FindJobs";
import FindArtisans from "./pages/FindArtisans";
import JobProfile from "./pages/JobProfile";
import ArtisanProfile from "./pages/ArtisanProfile";
import CreateSavings from "./pages/CreateSavings";
import MySavings from "./pages/MySavings";
import WithdrawSavings from "./pages/WithdrawSavings";

// ---------------------------- API CONFIG ----------------------------
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// ---------------------------- PRIVATE ROUTE ----------------------------
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

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
        <Link to="/find-artisans" className="hover:underline">Find Artisan</Link>
        <Link to="/savings" className="hover:underline">Savings & Thrift</Link>
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
          className="bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-md shadow-md"
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
    <header className="min-h-[60vh] flex items-center justify-center text-center px-6 md:px-12 bg-deepBlue text-white">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Connect, Skill & Earn with Spectrum Arena
        </h1>
        <p className="mt-6 text-lg text-white/80">
          Spectrum Arena helps you find artisans, post jobs, and manage savings — all in one place.
        </p>
        <div className="mt-10">
          <button
            onClick={onOpenSignup}
            className="bg-brightOrange text-deepBlue font-bold px-8 py-3 rounded-lg shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------------------------- FOOTER ----------------------------
function Footer() {
  return (
    <footer id="contact" className="bg-deepBlue text-white py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
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
function SignupModal({ onClose }) {
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      const resp = await api.post("users/signup/", {
        full_name,
        phone_number,
        email: email || null,
        password,
      });

      localStorage.setItem("token", resp.data.access);
      navigate("/choice");

      onClose();
    } catch (err) {
      alert("Signup failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-300 hover:text-white">
          <ArrowLeft size={22} />
        </button>
        <h4 className="text-center font-bold text-lg mb-4">Create account</h4>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="bg-black/20 p-3 rounded-md outline-none"
            required
          />
          <input
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="bg-black/20 p-3 rounded-md outline-none"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional)"
            className="bg-black/20 p-3 rounded-md outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-black/20 p-3 rounded-md outline-none"
            required
          />
          <button className="mt-3 bg-brightOrange text-deepBlue font-semibold p-3 rounded-md">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------- LOGIN MODAL ----------------------------
function LoginModal({ onClose }) {
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      const resp = await api.post("token/", {
        phone_number,
        password,
      });

      localStorage.setItem("token", resp.data.access);
      navigate("/choice");

      onClose();
    } catch {
      alert("Login failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-300 hover:text-white">
          <ArrowLeft size={22} />
        </button>
        <h4 className="text-center font-bold text-lg mb-4">Log in</h4>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="bg-black/20 p-3 rounded-md outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-black/20 p-3 rounded-md outline-none"
          />
          <button className="mt-3 bg-brightOrange text-deepBlue font-semibold p-3 rounded-md">
            Log in
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

  return (
    <div className="min-h-screen bg-deepBlue text-white font-sans">
      <Navbar
        onOpenSignup={() => setShowSignup(true)}
        onOpenLogin={() => setShowLogin(true)}
      />
      <main>
        <Hero onOpenSignup={() => setShowSignup(true)} />
      </main>
      <Footer />

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

// ---------------------------- MAIN ROUTER ----------------------------
export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/job/:id" element={<JobProfile />} />
        <Route path="/find-artisans" element={<FindArtisans />} />
        <Route path="/artisan/:id" element={<ArtisanProfile />} />

        {/* SAVINGS */}
        <Route path="/savings" element={<MySavings />} />
        <Route path="/savings/create" element={<CreateSavings />} />
        <Route path="/savings/withdraw/:id" element={<WithdrawSavings />} />

        {/* PROTECTED */}
        <Route
          path="/choice"
          element={
            <PrivateRoute>
              <ChoiceScreen />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

