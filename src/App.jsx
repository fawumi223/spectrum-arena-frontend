import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Toaster } from "react-hot-toast";

import RequireAuth from "./components/RequireAuth";
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
import Services from "./pages/Services";
import BetVouchers from "./pages/BetVouchers";
import CableTV from "./pages/CableTV";
import ArtisanProfile from "./pages/ArtisanProfile";
import CompanyApplications from "./pages/CompanyApplications";
import JobDetail from "./pages/JobDetail";
import Notifications from "./pages/Notifications";

/* --------------------------------------------------- */
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
          onClick={() => navigate("/post-job")}
          className="bg-[#111827] rounded-xl p-4"
        >
          Post Job
        </button>

        <button
          onClick={() => navigate("/find-artisans")}
          className="bg-[#111827] rounded-xl p-4"
        >
          Find Artisans
        </button>

        <button
          onClick={() => navigate("/company/applications")}
          className="bg-[#111827] rounded-xl p-4"
        >
          Applications
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------- */
function RoleRouter() {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const role = user?.role?.toLowerCase() || "client";

  if (role === "artisan") return <ArtisanDashboard />;
  if (role === "company") return <CompanyDashboard />;
  return <Dashboard />;
}

/* --------------------------------------------------- */
function Navbar({ onOpenSignup, onOpenLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const firstName = user?.full_name?.split(" ")[0];

  const isLandingPage = location.pathname === "/";

  return (
    <nav className="w-full bg-[#0f1b3d] text-white py-5 px-6 flex justify-between">
      <span className="font-semibold text-xl">Spectrum</span>

      {isLandingPage ? (
        <div className="flex gap-4">
          <button onClick={onOpenLogin}>Login</button>
          <button
            onClick={onOpenSignup}
            className="bg-orange-500 px-4 py-2 rounded"
          >
            Get Started
          </button>
        </div>
      ) : !isAuthenticated() ? (
        <div className="flex gap-4">
          <button onClick={onOpenLogin}>Login</button>
          <button
            onClick={onOpenSignup}
            className="bg-orange-500 px-4 py-2 rounded"
          >
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
            className="bg-orange-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

/* --------------------------------------------------- */
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
    } catch {
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
          <input
            className="bg-gray-200 text-black px-3 py-2 rounded"
            placeholder="Full name"
            required
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="bg-gray-200 text-black px-3 py-2 rounded"
            placeholder="Phone number"
            required
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="bg-gray-200 text-black px-3 py-2 rounded"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            className="bg-gray-200 text-black px-3 py-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">Client</option>
            <option value="artisan">Artisan</option>
            <option value="company">Company</option>
          </select>

          <input
            type="password"
            className="bg-gray-200 text-black px-3 py-2 rounded"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="bg-orange-500 p-3 rounded">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

/* --------------------------------------------------- */
function LoginModal({ onClose }) {
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      await loginUser({ phone_number, password });
      navigate("/dashboard", { replace: true });
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
          <input
            className="bg-gray-200 text-black px-3 py-2 rounded"
            placeholder="Phone number"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            className="bg-gray-200 text-black px-3 py-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="bg-orange-500 p-3 rounded">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

/* --------------------------------------------------- */
/* LANDING PAGE */
/* --------------------------------------------------- */

function LandingPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="bg-white">

      <Navbar
        onOpenSignup={() => setShowSignup(true)}
        onOpenLogin={() => setShowLogin(true)}
      />

      {/* HERO */}

      <section className="relative overflow-hidden text-white py-28 px-10 bg-gradient-to-r from-[#0f1b3d] via-[#1b2b5c] to-[#2c1a3f]">

        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-orange-500 opacity-20 blur-[140px] rounded-full"></div>
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-orange-400 opacity-20 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

          <div>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Where Skilled Work
              <br/>
              Meets Secure Payments
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Hire, Work, Save, Transact. All inside one structured financial ecosystem built for Africa's informal workforce.
            </p>

            <div className="flex gap-4 mb-6">

              <button
                onClick={() => setShowSignup(true)}
                className="bg-orange-500 px-6 py-3 rounded-lg font-semibold"
              >
                Create Account
              </button>

              <button className="border border-white px-6 py-3 rounded-lg">
                Explore Platform
              </button>

            </div>

            <div className="flex gap-6 text-sm text-gray-300">
              <span>✔ OTP Verified</span>
              <span>✔ Secure Wallet</span>
              <span>✔ Bank Integrated</span>
            </div>

          </div>

          {/* Laptop style mockup */}

          <div className="bg-white rounded-xl shadow-2xl p-6 text-gray-900 w-full max-w-md mx-auto animate-[float_6s_ease-in-out_infinite]">

            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Wallet Balance</span>
              <span className="text-xs text-gray-500">NGN</span>
            </div>

            <div className="text-3xl font-bold mb-6">
              ₦45,300
            </div>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between bg-gray-100 p-3 rounded">
                <span>Electricity</span>
                <span>₦13,000</span>
              </div>

              <div className="flex justify-between bg-gray-100 p-3 rounded">
                <span>Airtime</span>
                <span>₦2,000</span>
              </div>

              <div className="flex justify-between bg-gray-100 p-3 rounded">
                <span>Savings</span>
                <span>₦30,300</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ROLE CARDS */}

      <section className="py-20 px-10 bg-white">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-orange-100 p-8 rounded-xl">
            <h3 className="font-bold mb-4">For Artisans</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Find Verified Jobs</li>
              <li>✓ Secure Digital Wallet</li>
              <li>✓ Save & Grow</li>
            </ul>
          </div>

          <div className="bg-orange-100 p-8 rounded-xl">
            <h3 className="font-bold mb-4">For Companies</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Post & Manage Jobs</li>
              <li>✓ Hire Skilled Workers</li>
              <li>✓ Subscription Plans</li>
            </ul>
          </div>

          <div className="bg-orange-100 p-8 rounded-xl">
            <h3 className="font-bold mb-4">For Associations</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Member Management</li>
              <li>✓ Savings Analytics</li>
              <li>✓ Bulk Notifications</li>
            </ul>
          </div>

        </div>

      </section>

      {/* MARKETPLACE FLOW */}

      <section className="bg-[#0f1b3d] text-white text-center py-20">

        <h2 className="text-3xl font-bold mb-10">
          A Marketplace + Financial Infrastructure
        </h2>

        <div className="flex justify-center gap-6 flex-wrap">

          <div className="bg-orange-500 px-6 py-3 rounded">Clients</div>
          <span>→</span>
          <div className="bg-orange-500 px-6 py-3 rounded">Spectrum Wallet</div>
          <span>→</span>
          <div className="bg-orange-500 px-6 py-3 rounded">Artisans</div>

        </div>

        <div className="mt-8">
          <span className="bg-white text-black px-6 py-3 rounded">
            Savings & Utilities
          </span>
        </div>

      </section>

      {/* INFRASTRUCTURE */}

      <section className="py-20 px-10">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-[#0f1b3d] text-white p-8 rounded-xl">
            <h3 className="font-bold text-xl mb-4">
              Marketplace Infrastructure
            </h3>

            <ul className="space-y-2 text-sm">
              <li>✓ Job Posting System</li>
              <li>✓ Verified Profiles</li>
              <li>✓ Hiring Dashboard</li>
            </ul>
          </div>

          <div className="bg-[#1e274f] text-white p-8 rounded-xl">
            <h3 className="font-bold text-xl mb-4">
              Financial Infrastructure
            </h3>

            <ul className="space-y-2 text-sm">
              <li>✓ Secure Wallet</li>
              <li>✓ Thrift & Savings</li>
              <li>✓ Airtime & Payments</li>
            </ul>
          </div>

        </div>

      </section>

      {/* PRICING */}

      <section className="bg-gray-50 py-20 px-10 text-center">

        <h2 className="text-3xl font-bold mb-12">
          Simple, Transparent Pricing
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 border rounded-xl">

            <h3 className="font-bold text-xl mb-4">Starter</h3>
            <p className="text-3xl font-bold mb-2">₦1,000</p>
            <p className="mb-6 text-sm">7 Days</p>

            <ul className="space-y-2 text-sm mb-6">
              <li>✓ 1–3 Job Posts</li>
            </ul>

            <button className="bg-orange-500 text-white px-6 py-2 rounded">
              Get Started
            </button>

          </div>

          <div className="bg-[#0f1b3d] text-white p-8 rounded-xl">

            <h3 className="font-bold text-xl mb-4">Growth</h3>
            <p className="text-3xl font-bold mb-2">₦7,000</p>
            <p className="mb-6 text-sm">1 Month</p>

            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Up to 50 Job Posts</li>
              <li>✓ Priority Listings</li>
              <li>✓ Analytics Tools</li>
            </ul>

            <button className="bg-orange-500 px-6 py-2 rounded">
              Get Started
            </button>

          </div>

          <div className="bg-white p-8 border rounded-xl">

            <h3 className="font-bold text-xl mb-4">Enterprise</h3>

            <p className="text-3xl font-bold mb-6">Custom</p>

            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Unlimited Posting</li>
              <li>✓ Association Dashboard</li>
              <li>✓ Bulk Notifications</li>
            </ul>

            <button className="bg-orange-500 text-white px-6 py-2 rounded">
              Get Started
            </button>

          </div>

        </div>

      </section>

      {/* FOOTER CTA */}

      <section className="bg-[#0f1b3d] text-white py-20 px-10">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Join the Structured Workforce Movement
            </h2>

            <button
              onClick={() => setShowSignup(true)}
              className="bg-orange-500 px-6 py-3 rounded"
            >
              Create Account
            </button>

          </div>

          <div className="bg-white/10 p-8 rounded-xl">

            <p className="mb-2">
              artisanfuturetechnology@gmail.com
            </p>

            <p className="mb-2">
              07040673421
            </p>

            <p>
              Spectrum
            </p>

          </div>

        </div>

      </section>

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

    </div>
  );
}

/* --------------------------------------------------- */

export default function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Router>

        <Routes>

          <Route path="/" element={<LandingPage />} />

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
          <Route path="/services" element={<RequireAuth><Services /></RequireAuth>} />
          <Route path="/bills/bet" element={<RequireAuth><BetVouchers /></RequireAuth>} />
          <Route path="/bills/cable" element={<RequireAuth><CableTV /></RequireAuth>} />
          <Route path="/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </Router>
    </>
  );
}

