import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { isAuthenticated } from "../utils/auth";

export default function SafeBackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <button onClick={handleBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-4">
      <ArrowLeft size={20} />
      <span>Back</span>
    </button>
  );
}

