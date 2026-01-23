import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Toaster } from "react-hot-toast";

import RequireAuth from "./components/RequireAuth";
import Footer from "./components/Footer";
import { loginUser } from "./api/auth";
import api from "./api/api";
import { isAuthenticated } from "./utils/auth";

// Authenticated Pages
import Dashboard from "./pages/Dashboard";
import MySavings from "./pages/MySavings";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import FindJobs from "./pages/FindJobs";
import FindArtisans from "./pages/FindArtisans";
import PostJob from "./pages/PostJob";
import Airtime from "./pages/Airtime";
import Data from "./pages/Data";
import Electricity from "./pages/Electricity";
import ArtisanProfile from "./pages/ArtisanProfile";
import CompanyApplications from "./pages/CompanyApplications";
import JobDetail from "./pages/JobDetail";
import Notifications from "./pages/Notifications";

// Components
import HeroAnimation from "./components/HeroAnimation";
import HowItWorks from "./components/HowItWorks";

/* ---------------------------------------------------
   Placeholder Dashboards
--------------------------------------------------- */
function ArtisanDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-[#0d1018]">
      <h1 className="text-2xl font-bold">Artisan Dashboard (Coming Soon)</h1>
    </div>
  );
}

function CompanyDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0d1018] text-white px-6 pt-10">
      <h1 className="text-2xl font-bold mb-6">Company Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => navigate("/post-job")}
          className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center hover:border-brightOrange"
        >
          Post Job
        </button>

        <button
          type="button"
          onClick={() => navigate("/find-artisans")}
          className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center hover:border-brightOrange"
        >
          Find Artisans
        </button>

        <button
          type="button"
          onClick={() => navigate("/company/applications")}
          className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center hover:border-brightOrange"
        >
          Applications
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   Role Router
--------------------------------------------------- */
function RoleRouter() {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const role = user?.role?.toLowerCase() || "client";

  if (role === "artisan") return <ArtisanDashboard />;
  if (role === "company") return <CompanyDashboard />;
  return <Dashboard />;
}

/* ---------------------------------------------------
   Navbar
--------------------------------------------------- */
function Navbar({ onOpenSignup, onOpenLogin }) {
  const navigate = useNavigate();
  useLocation();

  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const firstName = user?.full_name?.split(" ")[0] || null;

  const handleProtectedNav = (path) => {
    if (!isAuthenticated()) return onOpenLogin();
    navigate(path);
  };

  return (
    <nav className="w-full bg-deepBlue text-white py-5 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Spectrum logo"
          className="h-8 w-8 object-contain select-none"
          draggable={false}
        />
        <span className="font-semibold text-xl md:text-2xl tracking-wide">
          Spectrum Arena
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-lg">
        <Link to="/">Home</Link>
        <button type="button" onClick={() => handleProtectedNav("/find-jobs")}>
          Find Jobs
        </button>
        <button type="button" onClick={() => handleProtectedNav("/find-artisans")}>
          Find Artisans
        </button>
        <button type="button" onClick={() => handleProtectedNav("/savings")}>
          Savings
        </button>
        <button type="button" onClick={() => handleProtectedNav("/analytics")}>
          Analytics
        </button>
        <button type="button" onClick={() => handleProtectedNav("/settings")}>
          Settings
        </button>
      </div>

      <div className="flex items-center gap-3">
        {!isAuthenticated() ? (
          <>
            <button
              type="button"
              onClick={onOpenLogin}
              className="border border-white/40 px-4 py-2 rounded-md"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onOpenSignup}
              className="bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-md"
            >
              Get Started
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-white/80 hidden md:block">
              Hi, {firstName || "User"} 👋
            </span>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                localStorage.removeItem("user");
                navigate("/", { replace: true });
                window.location.reload();
              }}
              className="bg-brightOrange text-deepBlue font-semibold px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ---------------------------------------------------
   Hero
--------------------------------------------------- */
function Hero({ onOpenSignup }) {
  return (
    <header className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Connect, Skill & Earn with Spectrum Arena
        </h1>
        <p className="mt-6 text-lg text-white/80">
          Find artisans, post jobs, manage savings — all in one platform.
        </p>
        <button
          type="button"
          onClick={onOpenSignup}
          className="mt-10 bg-brightOrange text-deepBlue font-bold px-8 py-3 rounded-md"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}

/* ---------------------------------------------------
 Signup Modal
--------------------------------------------------- */
function SignupModal({ onClose }) {
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpChannel, setOtpChannel] = useState("PHONE");
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("users/signup/", {
        full_name,
        phone_number,
        email: otpChannel === "EMAIL" ? email : null,
        password,
        otp_channel: otpChannel,
        role,
      });

      await loginUser({ phone_number, password });
      onClose();
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md relative">
        <button type="button" onClick={onClose} className="absolute top-4 left-4">
          <ArrowLeft size={22} />
        </button>

        <h4 className="text-center font-bold text-lg mb-4">Create account</h4>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="bg-black/20 p-3 rounded-md"
            placeholder="Full name"
            required
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="bg-black/20 p-3 rounded-md"
            placeholder="Phone number"
            required
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            value={otpChannel}
            onChange={(e) => setOtpChannel(e.target.value)}
            className="bg-black/20 p-3 rounded-md"
          >
            <option value="PHONE">Send OTP via Phone</option>
            <option value="EMAIL">Send OTP via Email</option>
          </select>

          {otpChannel === "EMAIL" && (
            <input
              className="bg-black/20 p-3 rounded-md"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-black/20 p-3 rounded-md"
          >
            <option value="client">I need services (Client)</option>
            <option value="artisan">I provide services (Artisan)</option>
            <option value="company">I am a company</option>
          </select>

          <input
            type="password"
            className="bg-black/20 p-3 rounded-md"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-brightOrange text-deepBlue font-semibold p-3 rounded-md"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
 Login Modal
--------------------------------------------------- */
function LoginModal({ onClose }) {
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  async function submit(e) {
    e.preventDefault();
    try {
      await loginUser({ phone_number, password });
      navigate(from, { replace: true });
      onClose();
    } catch {
      alert("Login failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md relative">
        <button type="button" onClick={onClose} className="absolute top-4 left-4">
          <ArrowLeft size={22} />
        </button>
        <h4 className="text-center font-bold text-lg mb-4">Log in</h4>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="bg-black/20 p-3 rounded-md"
            placeholder="Phone number"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            className="bg-black/20 p-3 rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-brightOrange text-deepBlue font-semibold p-3 rounded-md"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
 Landing Page
--------------------------------------------------- */
function LandingPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-deepBlue text-white font-sans">
      <Navbar onOpenSignup={() => setShowSignup(true)} onOpenLogin={() => setShowLogin(true)} />
      <Hero onOpenSignup={() => setShowSignup(true)} />
      <HeroAnimation />
      <HowItWorks />

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      <Footer />
    </div>
  );
}

/* ---------------------------------------------------
 Router
--------------------------------------------------- */
export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? <Navigate to="/dashboard" replace /> : <LandingPage />
            }
          />

          <Route path="/dashboard" element={<RequireAuth><RoleRouter /></RequireAuth>} />
          <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
          <Route path="/profile/artisan/:id" element={<RequireAuth><ArtisanProfile /></RequireAuth>} />
          <Route path="/company/applications" element={<RequireAuth><CompanyApplications /></RequireAuth>} />
          <Route path="/find-jobs" element={<RequireAuth><FindJobs /></RequireAuth>} />
          <Route path="/jobs/:id" element={<RequireAuth><JobDetail /></RequireAuth>} />
          <Route path="/find-artisans" element={<RequireAuth><FindArtisans /></RequireAuth>} />
          <Route path="/post-job" element={<RequireAuth><PostJob /></RequireAuth>} />
          <Route path="/savings" element={<RequireAuth><MySavings /></RequireAuth>} />
          <Route path="/bills/airtime" element={<RequireAuth><Airtime /></RequireAuth>} />
          <Route path="/bills/data" element={<RequireAuth><Data /></RequireAuth>} />
          <Route path="/bills/electricity" element={<RequireAuth><Electricity /></RequireAuth>} />
          <Route path="/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

