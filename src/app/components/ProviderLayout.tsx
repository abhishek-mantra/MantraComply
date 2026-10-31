import { Outlet, NavLink, useNavigate } from "react-router";
import { FileText, ListTodo, Shield, Zap, HelpCircle, LogOut } from "lucide-react";
import { useReferrals } from "../contexts/ReferralContext";
import { AppHeader } from "./shared/AppHeader";

export function ProviderLayout() {
  const navigate = useNavigate();
  const { completedCount, isPriorityBoosted } = useReferrals();

  const navItems = [
    { name: "My Profile", path: "/provider/credentialing", icon: FileText },
    { name: "Tasks", path: "/provider/tasks", icon: ListTodo },
    { name: "Active Insurance", path: "/provider/active-insurance", icon: Shield },
    {
      name: "Refer & Expedite",
      path: "/provider/referrals",
      icon: Zap,
      badge: isPriorityBoosted ? "Expedited ⚡" : `${completedCount}/5`,
      badgeColor: isPriorityBoosted
        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
        : "bg-blue-100 text-[#2196F3] border-blue-200",
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Header with Switch View dropdown */}
      <AppHeader currentRole="provider" />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-16 h-[calc(100vh-4rem)] z-30">
          <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-sm font-medium ${
                    isActive
                      ? "bg-[#F0F7FF] text-[#2196F3] border border-[#BFDBFE]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-gray-100 p-3.5 space-y-1">
            <button
              onClick={() => alert("MantraComply Support: support@mantra.care")}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
            >
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              <span>Support</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/50 transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
