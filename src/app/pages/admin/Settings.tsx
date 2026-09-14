import { useState } from "react";
import { Search, Plus } from "lucide-react";

export function Settings() {
  const [activeTab, setActiveTab] = useState<"roles" | "industries" | "custom" | "other">("roles");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { key: "roles" as const, label: "Roles and Permissions" },
    { key: "industries" as const, label: "Industries" },
    { key: "custom" as const, label: "Custom Fields" },
    { key: "other" as const, label: "Other Settings" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage system settings and permissions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-[#2196F3] text-[#2196F3]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "roles" && (
          <div className="flex h-[600px]">
            {/* Left Panel - Users List */}
            <div className="w-1/3 border-r border-gray-200 p-6">
              <div className="mb-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>

                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] outline-none mb-4">
                  <option>Employees</option>
                  <option>Contractors</option>
                  <option>All Users</option>
                </select>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors">
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>

              <div className="mt-6 text-center py-12">
                <div className="text-gray-400 mb-2">
                  <Users className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-sm text-gray-600">No users found</p>
                <p className="text-xs text-gray-500 mt-1">Try a different search or add a user</p>
              </div>
            </div>

            {/* Right Panel - User Details */}
            <div className="flex-1 p-6 bg-gray-50">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a User</h3>
                  <p className="text-sm text-gray-600">
                    Click on a user from the list on the left to view and modify their permissions
                  </p>
                  <div className="mt-6 space-y-2 text-left max-w-md mx-auto">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="font-medium text-sm text-gray-900 mb-1">Available Roles:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Provider</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Admin</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Viewer</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Auditor</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "industries" || activeTab === "custom" || activeTab === "other") && (
          <div className="p-12 text-center">
            <p className="text-gray-500">
              Content for {tabs.find((t) => t.key === activeTab)?.label} coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

export default Settings;
