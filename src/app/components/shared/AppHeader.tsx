import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp, ArrowLeftRight, LogOut, Check, Building2, Plus, Sparkles } from "lucide-react";

interface AppHeaderProps {
  currentRole: "admin" | "provider";
  userName?: string;
  userEmail?: string;
  currentOrg?: string;
  orgRole?: string;
}

export function AppHeader({
  currentRole,
  userName = "Abhishek Madaan",
  userEmail = "abhishek.madaan@mantra.care",
  currentOrg = "adsa",
  orgRole = "OWNER",
}: AppHeaderProps) {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const orgRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (orgRef.current && !orgRef.current.contains(event.target as Node)) {
        setOrgDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitchView = () => {
    setProfileDropdownOpen(false);
    if (currentRole === "admin") {
      navigate("/provider/credentialing");
    } else {
      navigate("/admin/overview");
    }
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    navigate("/login");
  };

  const organizations = [
    { id: "1", name: "adsa", role: "OWNER", isCurrent: true },
    { id: "2", name: "PhysioMantra", role: "ADMIN", isCurrent: false },
    { id: "3", name: "CareFirst Health", role: "MEMBER", isCurrent: false },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Brand Logo (Left) */}
      <div
        className="flex items-center gap-2.5 cursor-pointer select-none"
        onClick={() => navigate(currentRole === "admin" ? "/admin/overview" : "/provider/credentialing")}
      >
        <div className="w-8 h-8 bg-[#2196F3] rounded-lg flex items-center justify-center shadow-sm">
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
        <div className="flex items-center text-xl font-bold tracking-tight">
          <span className="text-[#0B2545]">Mantra</span>
          <span className="text-[#2196F3]">Comply</span>
        </div>
      </div>

      {/* Right Controls: Org Pill & User Profile Switcher */}
      <div className="flex items-center">
        {/* Organization Switcher */}
        <div className="relative" ref={orgRef}>
          <button
            onClick={() => {
              setOrgDropdownOpen(!orgDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2196F3] font-bold text-xs flex items-center justify-center border border-blue-100">
              {currentOrg.charAt(0).toUpperCase()}
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">{currentOrg}</div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{orgRole}</div>
            </div>
            {orgDropdownOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
            )}
          </button>

          {/* Org Switcher Dropdown */}
          {orgDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Switch Organization</p>
              </div>
              <div className="py-1">
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => setOrgDropdownOpen(false)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2196F3] font-bold text-xs flex items-center justify-center border border-blue-100">
                        {org.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{org.name}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-semibold">{org.role}</div>
                      </div>
                    </div>
                    {org.isCurrent && <Check className="w-4 h-4 text-[#2196F3]" />}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-1 mt-1">
                <button
                  onClick={() => {
                    setOrgDropdownOpen(false);
                    navigate("/admin/organizations");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#2196F3] hover:bg-blue-50/50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Manage Organizations
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-gray-200 mx-3" />

        {/* User Profile & Switch View Dropdown Trigger */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setOrgDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
          >
            <div className="text-right leading-tight hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">{userName}</div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                {currentRole === "admin" ? "ORG ADMIN" : "PROVIDER"}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-semibold text-sm flex items-center justify-center shadow-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            {profileDropdownOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
            )}
          </button>

          {/* User Profile Dropdown Menu (Screenshot 5 exact match) */}
          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
              {/* Signed In As info */}
              <div className="mb-3">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  SIGNED IN AS
                </div>
                <div className="text-sm font-bold text-gray-900 truncate" title={userEmail}>
                  {userEmail}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-2" />

              {/* Switch View Button */}
              <button
                onClick={handleSwitchView}
                className="w-full flex items-center gap-2.5 py-2.5 px-2 rounded-lg text-sm font-medium text-[#2563EB] hover:bg-blue-50/70 transition-colors cursor-pointer group text-left"
              >
                <ArrowLeftRight className="w-4 h-4 text-[#2563EB] group-hover:scale-110 transition-transform" />
                <span>{currentRole === "admin" ? "Switch to Provider View" : "Switch to Admin View"}</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-100 my-2" />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 py-2 px-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/50 transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

