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
import { loginUser, signupUser } from "./api/auth";
import { isAuthenticated } from "./utils/auth";

// Pages
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
        <button onClick={() => navigate("/post-job")} className="bg-[#111827] rounded-xl p-4">
          Post Job
        </button>
        <button onClick={() => navigate("/find-artisans")} className="bg-[#111827] rounded-xl p-4">
          Find Artisans
        </button>
        <button onClick={() => navigate("/company/applications")} className="bg-[#111827] rounded-xl p-4">
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
  const firstName = user?.full_name?.split(" ")[0];

  const handleProtectedNav = (path) => {
    if (!isAuthenticated()) return onOpenLogin();
    navigate(path);
  };

  return (
    <nav className="w-full bg-deepBlue text-white py-5 px-6 flex justify-between">
      <span className="font-semibold text-xl">Spectrum Arena</span>

      {!isAuthenticated() ? (
        <div className="flex gap-3">
          <button onClick={onOpenLogin}>Log in</button>
          <button onClick={onOpenSignup} className="bg-brightOrange px-4 py-2 rounded">
            Get Started
          </button>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <span>Hi, {firstName || "User"} 👋</span>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/", { replace: true });
              window.location.reload();
            }}
            className="bg-brightOrange px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

/* ---------------------------------------------------
   Signup Modal (DEMO MODE — NO OTP)
--------------------------------------------------- */
function SignupModal({ onClose }) {
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await signupUser({
        full_name,
        phone_number,
        password,
        role,
        email,
      });

      onClose();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert("Signup failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md">
        <button onClick={onClose}>
          <ArrowLeft />
        </button>

        <h4 className="text-center font-bold mb-4">Create account</h4>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input placeholder="Full name" required value={full_name} onChange={(e) => setFullName(e.target.value)} />
          <input placeholder="Phone number" required value={phone_number} onChange={(e) => setPhone(e.target.value)} />
          <input placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="artisan">Artisan</option>
            <option value="company">Company</option>
          </select>

          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="bg-brightOrange p-3 rounded">
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
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md">
        <button onClick={onClose}>
          <ArrowLeft />
        </button>

        <h4 className="text-center font-bold mb-4">Log in</h4>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input placeholder="Phone number" value={phone_number} onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="bg-brightOrange p-3 rounded">
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
    <div className="min-h-screen bg-deepBlue text-white">
      <Navbar onOpenSignup={() => setShowSignup(true)} onOpenLogin={() => setShowLogin(true)} />
      <HeroAnimation />
      <HowItWorks />
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------
   App Router
--------------------------------------------------- */
export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
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

