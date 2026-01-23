import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  function handleBack() {
    // If browser history has previous entries
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // No history → fallback to dashboard (authenticated landing)
      navigate("/dashboard");
    }
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
    >
      <ArrowLeft size={20} />
      Back
    </button>
  );
}

