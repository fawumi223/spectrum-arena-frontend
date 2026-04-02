import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("User installed app");
    }

    setDeferredPrompt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 bg-[#0f172a] border border-white/10 rounded-xl p-4 shadow-xl z-50">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm font-semibold">Install Spectrum</p>
          <p className="text-xs text-gray-400">
            Add to your home screen for better experience
          </p>
        </div>

        <button
          onClick={installApp}
          className="bg-orange-500 px-4 py-2 rounded-lg text-sm"
        >
          Install
        </button>

      </div>

    </div>
  );
}
