import { Home, Briefcase, Wallet, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const tabs = [
    { path: "/dashboard", icon: <Home />, label: "Home" },
    { path: "/jobs", icon: <Briefcase />, label: "Jobs" },
    { path: "/wallet", icon: <Wallet />, label: "Wallet" },
    { path: "/profile", icon: <User />, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#020617] border-t border-gray-800 flex justify-around py-3">
      {tabs.map((tab) => (
        <Link key={tab.path} to={tab.path} className="flex flex-col items-center text-xs">
          <div className={location.pathname === tab.path ? "text-orange-500" : "text-gray-400"}>
            {tab.icon}
          </div>
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
