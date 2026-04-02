import Lottie from "lottie-react";
import heroAnimation from "./assets/hero.json";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Toaster } from "react-hot-toast";

import RequireAuth from "./components/RequireAuth";
import BottomNav from "./components/BottomNav";
import InstallPrompt from "./components/InstallPrompt";

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
/* SPLASH SCREEN */
function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">Spectrum</div>
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

/* --------------------------------------------------- */
/* MOBILE LAYOUT */
function AppLayout({ children }) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-[#020617] to-[#030b1a] text-white pb-20 relative">
      {children}
      {isAuthenticated() && <BottomNav />}
      <InstallPrompt />
    </div>
  );
}

/* --------------------------------------------------- */
/* UI STATES */
function EmptyState({ text }) {
  return (
    <div className="text-center text-gray-400 py-10 text-sm">
      {text}
    </div>
  );
}

function ErrorState({ text }) {
  return (
    <div className="text-center text-red-400 py-10 text-sm">
      {text}
    </div>
  );
}

function Loader() {
  return (
    <div className="flex justify-center py-10 text-gray-400 text-sm">
      Loading...
    </div>
  );
}

/* --------------------------------------------------- */
/* SIGNUP MODAL */
function SignupModal({ onClose }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await signupUser({});
      onClose();
      navigate("/dashboard");
    } catch {
      setError("Signup failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md">
        <button onClick={onClose}><ArrowLeft /></button>
        <h4 className="text-center font-bold mb-4">Create account</h4>

        {error && <ErrorState text={error} />}

        <form onSubmit={submit}>
          <button className="bg-orange-500 w-full p-3 rounded">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

/* --------------------------------------------------- */
/* LOGIN MODAL */
function LoginModal({ onClose }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await loginUser({});
      navigate("/dashboard");
      onClose();
    } catch {
      setError("Login failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0f14] text-white rounded-xl p-6 w-full max-w-md">
        
        <button onClick={onClose}>
          <ArrowLeft />
        </button>

        <h4 className="text-center font-bold mb-4">Log in</h4>

        {/* ERROR UI (FIXED) */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-2 rounded text-sm mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <button className="bg-orange-500 w-full p-3 rounded">
            Log in
          </button>
        </form>

      </div>
    </div>
  );
}

/* --------------------------------------------------- */
/* ONBOARDING (FINAL VERSION) */
function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);

  const slides = [
    { title: "Find Jobs Easily", text: "Discover verified jobs near you." },
    { title: "Hire Skilled Artisans", text: "Connect with trusted professionals." },
    { title: "Save & Transact", text: "Manage money securely." },
  ];

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else {
      localStorage.setItem("seenOnboarding", "true");
      onFinish();
    }
  };

  const handleSkip = () => {
    localStorage.setItem("seenOnboarding", "true");
    onFinish();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-end p-4">
        <button onClick={handleSkip} className="text-gray-400 text-sm">
          Skip
        </button>
      </div>

      <div className="text-center px-6">
        {step === 0 && (
          <Lottie animationData={heroAnimation} className="w-[220px] mx-auto" />
        )}
        <h2 className="text-xl font-bold">{slides[step].title}</h2>
        <p className="text-gray-400 text-sm mt-2">{slides[step].text}</p>
      </div>

      <div className="p-6">
        <button onClick={handleNext} className="w-full bg-orange-500 py-4 rounded-full">
          {step === 2 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------- */
/* LANDING */
function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(
    !localStorage.getItem("seenOnboarding")
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) return <SplashScreen />;

  if (showOnboarding) {
    return <Onboarding onFinish={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold">Welcome to Spectrum</h1>
    </div>
  );
}

/* --------------------------------------------------- */
/* APP */
export default function App() {
  return (
    <>
      <Toaster />

      <Router>
        <Routes>

          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<RequireAuth><AppLayout><Dashboard /></AppLayout></RequireAuth>} />
          <Route path="/notifications" element={<RequireAuth><AppLayout><Notifications /></AppLayout></RequireAuth>} />
          <Route path="/find-jobs" element={<RequireAuth><AppLayout><FindJobs /></AppLayout></RequireAuth>} />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </>
  );
}
