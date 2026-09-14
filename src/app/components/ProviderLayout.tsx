import { Outlet, NavLink, useNavigate } from "react-router";
import { FileText, ListTodo, Shield, Menu, LogOut } from "lucide-react";
import { useState } from "react";

export function ProviderLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { name: "My Profile", path: "/provider/credentialing", icon: FileText },
    { name: "Tasks", path: "/provider/tasks", icon: ListTodo },
    { name: "Active Insurance", path: "/provider/active-insurance", icon: Shield },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
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
              <span className="text-xl font-semibold text-gray-900">MantraComply</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-900">John Wilson</div>
              <div className="text-xs text-gray-500">Provider</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="User"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
            />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-40 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#E3F2FD] text-[#2196F3]"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
