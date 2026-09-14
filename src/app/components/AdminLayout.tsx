import { Outlet, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Shield,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  ChevronDown,
  CheckSquare
} from "lucide-react";
import { useState } from "react";
import { PayersProvider } from "../contexts/PayersContext";
import { ToastProvider } from "./shared/Toast";

export function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/admin/overview", icon: LayoutDashboard },
    { name: "Providers", path: "/admin/providers", icon: Users },
    { name: "Tasks", path: "/admin/tasks", icon: CheckSquare },
    { name: "Groups/Facilities", path: "/admin/groups", icon: Building2 },
    { name: "Documents", path: "/admin/documents", icon: FileText },
    { name: "Credentialing", path: "/admin/credentialing", icon: Shield },
    { name: "Payers", path: "/admin/payers", icon: CreditCard },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const bottomNavItems = [
    { name: "Account", icon: SettingsIcon, action: () => navigate("/admin/settings") },
    { name: "Support", icon: HelpCircle, action: () => alert("Support") },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 flex flex-col ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo and Org Dropdown */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 bg-[#2196F3] rounded-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8L8 10.5V15.5L12 18L16 15.5V10.5L12 8Z"
                    fill="#2196F3"
                  />
                </svg>
              </div>
              <div className="flex-1 relative">
                <button
                  onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 hover:text-[#2196F3] transition-colors"
                >
                  <span>PhysioMantra</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {orgDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                      PhysioMantra
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                      Switch Organization
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-[#2196F3] rounded-lg flex items-center justify-center mx-auto">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8L8 10.5V15.5L12 18L16 15.5V10.5L12 8Z"
                  fill="#2196F3"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#E3F2FD] text-[#2196F3]"
                    : "text-gray-700 hover:bg-gray-50"
                } ${sidebarCollapsed ? "justify-center" : ""}`
              }
              title={sidebarCollapsed ? item.name : ""}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200">
          <div className="p-4 space-y-1">
            {bottomNavItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all ${
                  sidebarCollapsed ? "justify-center" : ""
                }`}
                title={sidebarCollapsed ? item.name : ""}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
              </button>
            ))}
          </div>
          
          {/* Logout Button */}
          <div className="px-4 pb-4">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
              title={sidebarCollapsed ? "Logout" : ""}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-[#2196F3] hover:border-[#2196F3] transition-colors shadow-sm"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
            />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          <PayersProvider>
            <ToastProvider>
              <Outlet />
            </ToastProvider>
          </PayersProvider>
        </div>
      </main>
    </div>
  );
}