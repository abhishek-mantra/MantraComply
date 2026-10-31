import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Layers,
  FileText,
  Shield,
  CreditCard,
  TrendingUp,
  Radio,
  Globe,
  Receipt,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { PayersProvider } from "../contexts/PayersContext";
import { ToastProvider } from "./shared/Toast";
import { AppHeader } from "./shared/AppHeader";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/admin/overview", icon: LayoutDashboard },
    { name: "Providers", path: "/admin/providers", icon: Users },
    { name: "Tasks", path: "/admin/tasks", icon: CheckSquare },
    { name: "Groups/Facilities", path: "/admin/groups", icon: Layers },
    { name: "Documents", path: "/admin/documents", icon: FileText },
    { name: "Credentialing", path: "/admin/credentialing", icon: Shield },
    { name: "Enrollments", path: "/admin/payers", icon: CreditCard },
    { name: "Credits Ledger", path: "/admin/credits", icon: TrendingUp },
    { name: "Webhooks", path: "/admin/webhooks", icon: Radio },
    { name: "Organizations", path: "/admin/organizations", icon: Globe },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Header */}
      <AppHeader currentRole="admin" />

      <div className="flex-1 flex relative">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 z-30 flex flex-col sticky top-16 h-[calc(100vh-4rem)] ${
            sidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Main Navigation */}
          <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive: navActive }) => {
                    const active = isActive || navActive;
                    return `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-sm font-medium ${
                      active
                        ? "bg-[#F0F7FF] text-[#2196F3] border border-[#BFDBFE]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                    } ${sidebarCollapsed ? "justify-center px-0" : ""}`;
                  }}
                  title={sidebarCollapsed ? item.name : ""}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </NavLink>
              );
            })}

            {/* Billing Dropdown Item */}
            <div>
              <button
                onClick={() => setBillingOpen(!billingOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
                title={sidebarCollapsed ? "Billing" : ""}
              >
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>Billing</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      billingOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {!sidebarCollapsed && billingOpen && (
                <div className="pl-11 pr-2 py-1 space-y-1">
                  <button
                    onClick={() => navigate("/admin/credits")}
                    className="w-full text-left py-1.5 px-2 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Subscriptions
                  </button>
                  <button
                    onClick={() => navigate("/admin/credits")}
                    className="w-full text-left py-1.5 px-2 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Invoices & Usage
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-gray-100 p-3.5 space-y-1">
            <button
              onClick={() => alert("Contact Sales: sales@mantra.care")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all ${
                sidebarCollapsed ? "justify-center px-0" : ""
              }`}
              title={sidebarCollapsed ? "Contact Sales" : ""}
            >
              <Calendar className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Contact Sales</span>}
            </button>

            <button
              onClick={() => alert("MantraComply Support: support@mantra.care")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all ${
                sidebarCollapsed ? "justify-center px-0" : ""
              }`}
              title={sidebarCollapsed ? "Support" : ""}
            >
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Support</span>}
            </button>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/50 transition-all ${
                sidebarCollapsed ? "justify-center px-0" : ""
              }`}
              title={sidebarCollapsed ? "Logout" : ""}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>

          {/* Sidebar Collapse Toggle Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3.5 top-6 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#2196F3] hover:border-[#2196F3] shadow-sm transition-all z-40 cursor-pointer"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
            <PayersProvider>
              <ToastProvider>
                <Outlet />
              </ToastProvider>
            </PayersProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
