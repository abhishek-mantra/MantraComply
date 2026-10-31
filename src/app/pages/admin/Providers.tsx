import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Mail,
  ChevronDown,
  Eye,
  Settings as SettingsIcon,
  Menu,
  X,
  Users as UsersIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";
import { usePayers } from "../../contexts/PayersContext";
import { RequestEnrollmentModal } from "../../components/payers/RequestEnrollmentModal";

// --- Types ---
interface Provider {
  id: number;
  name: string;
  specialty: string;
  credentialingStatus: string;
  healthStatus: string;
  email: string;
  phone: string;
  npi?: string;
  primaryState?: string;
  role?: string;
}

interface OrgRoleItem {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  usersAssigned: number;
  dataScope: "ALL" | "ASSIGNED_ONLY";
  permissions: Record<string, { permission: "none" | "view" | "view_edit" | "full"; level: "ALL" | "ASSIGNED_ONLY" }>;
}

interface OrgUserItem {
  id: number;
  name: string;
  role: string;
  email: string;
  createdAt: string;
  status: "Active" | "Invited";
}

// Actual Org Admin modules
const ROLE_MODULES = [
  "Overview",
  "Providers",
  "Tasks",
  "Groups & Facilities",
  "Documents",
  "Credentialing",
  "Enrollments",
  "Credits Ledger",
  "Webhooks",
  "Organizations",
  "Billing",
];

const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Psychiatry",
    credentialingStatus: "Done",
    healthStatus: "Ok",
    email: "sarah.j@example.com",
    phone: "555-0101",
    npi: "1234567890",
    primaryState: "NY",
    role: "Provider",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Psychology",
    credentialingStatus: "In process",
    healthStatus: "Expirations",
    email: "michael.c@example.com",
    phone: "555-0102",
    npi: "2345678901",
    primaryState: "CA",
    role: "Provider",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Therapy",
    credentialingStatus: "Re-credential",
    healthStatus: "Issues",
    email: "emily.r@example.com",
    phone: "555-0103",
    npi: "3456789012",
    primaryState: "TX",
    role: "Provider",
  },
  {
    id: 4,
    name: "Dr. James Williams",
    specialty: "Dietitian",
    credentialingStatus: "Not started",
    healthStatus: "Ok",
    email: "james.w@example.com",
    phone: "555-0104",
    npi: "4567890123",
    primaryState: "FL",
    role: "Provider",
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Physiotherapy",
    credentialingStatus: "Done",
    healthStatus: "Ok",
    email: "lisa.a@example.com",
    phone: "555-0105",
    npi: "5678901234",
    primaryState: "WA",
    role: "Provider",
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Psychiatry",
    credentialingStatus: "In process",
    healthStatus: "Expirations",
    email: "robert.t@example.com",
    phone: "555-0106",
    npi: "6789012345",
    primaryState: "OR",
    role: "Provider",
  },
];

const INITIAL_ROLES: OrgRoleItem[] = [
  {
    id: "admin_new",
    name: "Admin New",
    description: "Full administrative access across all organization modules.",
    createdAt: "Oct 28, 2026",
    usersAssigned: 2,
    dataScope: "ALL",
    permissions: ROLE_MODULES.reduce((acc, mod) => {
      acc[mod] = { permission: "full", level: "ALL" };
      return acc;
    }, {} as OrgRoleItem["permissions"]),
  },
  {
    id: "admin",
    name: "Admin",
    description: "Standard organization administrator with full records access.",
    createdAt: "Sep 21, 2026",
    usersAssigned: 1,
    dataScope: "ALL",
    permissions: ROLE_MODULES.reduce((acc, mod) => {
      acc[mod] = { permission: "full", level: "ALL" };
      return acc;
    }, {} as OrgRoleItem["permissions"]),
  },
  {
    id: "executive",
    name: "Executive",
    description: "Executive leadership role with read-only view across all modules.",
    createdAt: "Aug 20, 2026",
    usersAssigned: 7,
    dataScope: "ALL",
    permissions: ROLE_MODULES.reduce((acc, mod) => {
      acc[mod] = { permission: "view", level: "ALL" };
      return acc;
    }, {} as OrgRoleItem["permissions"]),
  },
  {
    id: "provider",
    name: "Provider",
    description: "Healthcare provider with access to their own credentialing profile, documents, and tasks.",
    createdAt: "Aug 15, 2026",
    usersAssigned: 6,
    dataScope: "ASSIGNED_ONLY",
    permissions: ROLE_MODULES.reduce((acc, mod) => {
      const isProviderAccess = mod === "Overview" || mod === "Credentialing" || mod === "Documents" || mod === "Tasks";
      acc[mod] = { permission: isProviderAccess ? "view_edit" : "none", level: "ASSIGNED_ONLY" };
      return acc;
    }, {} as OrgRoleItem["permissions"]),
  },
  {
    id: "team_manager",
    name: "Team Manager",
    description: "Clinic operations coordinator overseeing provider onboarding, tasks, and enrollments.",
    createdAt: "Sep 01, 2026",
    usersAssigned: 2,
    dataScope: "ASSIGNED_ONLY",
    permissions: ROLE_MODULES.reduce((acc, mod) => {
      const isOps = mod !== "Billing" && mod !== "Webhooks" && mod !== "Credits Ledger";
      acc[mod] = { permission: isOps ? "view_edit" : "view", level: "ASSIGNED_ONLY" };
      return acc;
    }, {} as OrgRoleItem["permissions"]),
  },
];

const INITIAL_USERS: OrgUserItem[] = [
  { id: 1, name: "Dr. Alex Rivera", role: "Admin", email: "alex.rivera@physiomantra.com", createdAt: "Sep 21, 2026", status: "Active" },
  { id: 2, name: "Jessica Morales", role: "Admin New", email: "jessica.m@physiomantra.com", createdAt: "Oct 28, 2026", status: "Active" },
  { id: 3, name: "Dr. Sarah Johnson", role: "Provider", email: "sarah.j@example.com", createdAt: "Aug 15, 2026", status: "Active" },
  { id: 4, name: "Dr. Michael Chen", role: "Provider", email: "michael.c@example.com", createdAt: "Aug 15, 2026", status: "Active" },
  { id: 5, name: "Dr. Lisa Anderson", role: "Provider", email: "lisa.a@example.com", createdAt: "Aug 18, 2026", status: "Active" },
  { id: 6, name: "Marcus Vance", role: "Team Manager", email: "marcus.v@physiomantra.com", createdAt: "Sep 01, 2026", status: "Active" },
  { id: 7, name: "Elena Rostova", role: "Executive", email: "elena.r@physiomantra.com", createdAt: "Aug 20, 2026", status: "Active" },
];

export function Providers() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { payers, providers: payerProviders, addEnrollmentRequests } = usePayers();

  // Top level Tab: Providers vs Roles & Permissions
  const [activeMainTab, setActiveMainTab] = useState<"providers" | "roles">("providers");

  // --- Providers Tab State ---
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [credentialingStatusFilter, setCredentialingStatusFilter] = useState("all");
  const [healthStatusFilter, setHealthStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedProviderForEnrollment, setSelectedProviderForEnrollment] = useState<Provider | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const [newProvider, setNewProvider] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialty: "Psychiatry",
    role: "Provider",
    sendInvite: true,
  });

  // --- Roles & Permissions Tab State ---
  const [umTab, setUmTab] = useState<"users" | "roles">("roles");
  const [roleSearchTerm, setRoleSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [selectedRoleItems, setSelectedRoleItems] = useState<string[]>([]);
  const [roles, setRoles] = useState<OrgRoleItem[]>(INITIAL_ROLES);
  const [users, setUsers] = useState<OrgUserItem[]>(INITIAL_USERS);

  // Role Create / Edit Modal State
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleNameInput, setRoleNameInput] = useState("");
  const [roleDescInput, setRoleDescInput] = useState("");
  const [modalPermissions, setModalPermissions] = useState<OrgRoleItem["permissions"]>(() => {
    return ROLE_MODULES.reduce((acc, mod) => {
      acc[mod] = { permission: "none", level: "ALL" };
      return acc;
    }, {} as OrgRoleItem["permissions"]);
  });

  // Add User in Role View
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Provider");

  // --- Handlers: Providers ---
  const handleAddProvider = () => {
    if (!newProvider.firstName || !newProvider.lastName || !newProvider.email) {
      showToast("Please fill in first name, last name, and email", "error");
      return;
    }

    const providerObj: Provider = {
      id: providers.length + 1,
      name: `Dr. ${newProvider.firstName} ${newProvider.lastName}`,
      specialty: newProvider.specialty,
      credentialingStatus: "Not started",
      healthStatus: "Ok",
      email: newProvider.email,
      phone: "555-0199",
      role: newProvider.role,
    };

    setProviders([providerObj, ...providers]);

    // Also add to User Management roster
    const newUser: OrgUserItem = {
      id: Date.now(),
      name: `${newProvider.firstName} ${newProvider.lastName}`,
      email: newProvider.email,
      role: newProvider.role,
      createdAt: "Today",
      status: newProvider.sendInvite ? "Invited" : "Active",
    };
    setUsers([newUser, ...users]);

    // Update users assigned count for role
    setRoles(
      roles.map((r) =>
        r.name === newProvider.role ? { ...r, usersAssigned: r.usersAssigned + 1 } : r
      )
    );

    showToast(`Provider "${providerObj.name}" added successfully`, "success");
    setShowAddModal(false);
    setNewProvider({
      firstName: "",
      lastName: "",
      email: "",
      specialty: "Psychiatry",
      role: "Provider",
      sendInvite: true,
    });
  };

  const handleSendEmail = (provider: Provider) => {
    showToast(`Invitation sent to ${provider.email}`, "success");
  };

  const handleRequestCredentialing = (provider: Provider) => {
    setOpenDropdownId(null);
    navigate(`/admin/credentialing?providerId=${provider.id}`);
  };

  const handleRequestEnrollment = (provider: Provider) => {
    setOpenDropdownId(null);
    setSelectedProviderForEnrollment(provider);
    setShowEnrollmentModal(true);
  };

  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCred = credentialingStatusFilter === "all" || p.credentialingStatus === credentialingStatusFilter;
    const matchesHealth = healthStatusFilter === "all" || p.healthStatus === healthStatusFilter;
    return matchesSearch && matchesCred && matchesHealth;
  });

  // --- Handlers: Roles ---
  const handleOpenCreateModal = () => {
    setEditingRoleId(null);
    setRoleNameInput("");
    setRoleDescInput("");
    setModalPermissions(
      ROLE_MODULES.reduce((acc, mod) => {
        acc[mod] = { permission: "none", level: "ALL" };
        return acc;
      }, {} as OrgRoleItem["permissions"])
    );
    setIsRoleModalOpen(true);
  };

  const handleOpenEditModal = (role: OrgRoleItem) => {
    setEditingRoleId(role.id);
    setRoleNameInput(role.name);
    setRoleDescInput(role.description === "—" ? "" : role.description);
    setModalPermissions({ ...role.permissions });
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleNameInput.trim()) {
      showToast("Please enter a role name", "error");
      return;
    }

    if (editingRoleId) {
      setRoles(
        roles.map((r) =>
          r.id === editingRoleId
            ? {
                ...r,
                name: roleNameInput.trim(),
                description: roleDescInput.trim() || "—",
                permissions: { ...modalPermissions },
              }
            : r
        )
      );
      showToast(`Role "${roleNameInput.trim()}" updated successfully`, "success");
    } else {
      const newRole: OrgRoleItem = {
        id: `role_${Date.now()}`,
        name: roleNameInput.trim(),
        description: roleDescInput.trim() || "—",
        createdAt: "Oct 30, 2026",
        usersAssigned: 0,
        dataScope: Object.values(modalPermissions)[0]?.level || "ALL",
        permissions: { ...modalPermissions },
      };
      setRoles([newRole, ...roles]);
      showToast(`Role "${roleNameInput.trim()}" created successfully`, "success");
    }

    setIsRoleModalOpen(false);
  };

  const filteredRoles = useMemo(() => {
    return roles.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(roleSearchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(roleSearchTerm.toLowerCase());
      const matchesRole = roleFilter === "ALL" || r.name === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [roles, roleSearchTerm, roleFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(roleSearchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(roleSearchTerm.toLowerCase());
      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, roleSearchTerm, roleFilter]);

  return (
    <div className="space-y-6">
      {/* Top Tabs: Providers vs Roles & Permissions */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveMainTab("providers")}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeMainTab === "providers" ? "text-[#2563EB]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Providers
          {activeMainTab === "providers" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveMainTab("roles")}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeMainTab === "roles" ? "text-[#2563EB]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Roles & Permissions
          {activeMainTab === "roles" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: PROVIDERS ROSTER (Screenshot 3)                  */}
      {/* ======================================================== */}
      {activeMainTab === "providers" && (
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Providers</h1>
              <p className="text-sm text-gray-500 mt-1">Manage all providers and their credentialing status</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Add Provider
            </button>
          </div>

          {/* Main Card with Search Bar and Data Table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[240px] max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Credentialing Status Filter */}
              <div className="relative">
                <select
                  value={credentialingStatusFilter}
                  onChange={(e) => setCredentialingStatusFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white cursor-pointer text-gray-700"
                >
                  <option value="all">Credentialing Status</option>
                  <option value="Done">Done</option>
                  <option value="In process">In process</option>
                  <option value="Re-credential">Re-credential</option>
                  <option value="Not started">Not started</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Health Status Filter */}
              <div className="relative">
                <select
                  value={healthStatusFilter}
                  onChange={(e) => setHealthStatusFilter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white cursor-pointer text-gray-700"
                >
                  <option value="all">Health Status</option>
                  <option value="Ok">Ok</option>
                  <option value="Expirations">Expirations</option>
                  <option value="Issues">Issues</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {(credentialingStatusFilter !== "all" || healthStatusFilter !== "all") && (
                <button
                  onClick={() => {
                    setCredentialingStatusFilter("all");
                    setHealthStatusFilter("all");
                  }}
                  className="text-sm text-[#2563EB] hover:underline whitespace-nowrap"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Providers Table (Matching Screenshot 3) */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0B2545] text-white">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      PROVIDER
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      COUNTRY
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      SPECIALTY
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      CREDENTIALING
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      STATUS
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredProviders.length > 0 ? (
                    filteredProviders.map((provider) => (
                      <tr key={provider.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/admin/providers/${provider.id}`)}
                              className="font-medium text-[#2563EB] hover:underline text-left cursor-pointer"
                            >
                              {provider.name}
                            </button>
                            {provider.role && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                {provider.role}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">{provider.email}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 border border-gray-200 text-gray-700">
                            🇺🇸 US
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-700">{provider.specialty}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={provider.credentialingStatus} variant="credentialing" />
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={provider.healthStatus} variant="health" />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdownId(openDropdownId === provider.id ? null : provider.id);
                                }}
                                className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Add enrollment / credentialing"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              {openDropdownId === provider.id && (
                                <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1">
                                  <button
                                    onClick={() => handleRequestCredentialing(provider)}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    Request Credentialing
                                  </button>
                                  <button
                                    onClick={() => handleRequestEnrollment(provider)}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                                  >
                                    Request Enrollment
                                  </button>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => navigate(`/admin/providers/${provider.id}`)}
                              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                              title="View Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSendEmail(provider)}
                              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-20 text-center text-sm text-gray-400">
                        No providers found in this organization.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: ROLES & PERMISSIONS (Screenshots 1 & 2)          */}
      {/* ======================================================== */}
      {activeMainTab === "roles" && (
        <div className="space-y-6">
          {/* Header matching Screenshot 1 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h2>
            <p className="text-sm text-gray-500 mt-1">
              Orchestrate your team's access, permissions, and operational credits.
            </p>
          </div>

          {/* Control Bar matching Screenshot 1 */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Pill Group: Users | Roles (Department removed as requested) */}
            <div className="flex items-center gap-3 overflow-x-auto">
              <div className="bg-gray-100 p-1 rounded-full flex items-center gap-1 border border-gray-200 shrink-0">
                <button
                  onClick={() => {
                    setUmTab("users");
                    setSelectedRoleItems([]);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    umTab === "users"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => {
                    setUmTab("roles");
                    setSelectedRoleItems([]);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    umTab === "roles"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Roles
                </button>
              </div>

              <div className="hidden sm:block h-6 w-px bg-gray-200" />

              {/* Search & All Roles Dropdown */}
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <Search size={16} className="text-gray-400 shrink-0 ml-1" />

                <div className="relative">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-1 rounded-full border border-blue-200 bg-blue-50/70 text-xs font-semibold text-blue-600 cursor-pointer focus:outline-none appearance-none pr-7"
                  >
                    <option value="ALL">All Roles</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="text-blue-600 absolute right-2.5 top-2 pointer-events-none" />
                </div>

                <input
                  type="text"
                  value={roleSearchTerm}
                  onChange={(e) => setRoleSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="text-xs text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent w-full max-w-[200px]"
                />
              </div>
            </div>

            {/* Right Side Actions: Count + Black circular Plus button */}
            <div className="flex items-center gap-3 self-end md:self-auto pr-2">
              {umTab === "roles" ? (
                <>
                  <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                    {filteredRoles.length} roles
                  </span>
                  <button
                    onClick={handleOpenCreateModal}
                    className="w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer"
                    title="Create Role"
                  >
                    <Plus size={16} />
                  </button>
                </>
              ) : (
                <>
                  <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                    {filteredUsers.length} users
                  </span>
                  <button
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    Add User
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Sub-tab 1: Roles Table (Screenshot 1 Exact Match) */}
          {umTab === "roles" && (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0B2545] text-white text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4 w-10 text-center border-r border-[#1a3a60]">
                        <input
                          type="checkbox"
                          checked={selectedRoleItems.length === filteredRoles.length && filteredRoles.length > 0}
                          onChange={() => {
                            if (selectedRoleItems.length === filteredRoles.length) {
                              setSelectedRoleItems([]);
                            } else {
                              setSelectedRoleItems(filteredRoles.map((r) => r.id));
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-400 text-blue-600 focus:ring-0 cursor-pointer bg-white"
                        />
                      </th>
                      <th className="py-3.5 px-3 w-10 text-center border-r border-[#1a3a60]">
                        <SettingsIcon size={14} className="text-gray-300 mx-auto" />
                      </th>
                      <th className="py-3.5 px-6 border-r border-[#1a3a60]">ROLE NAME</th>
                      <th className="py-3.5 px-6 border-r border-[#1a3a60]">DESCRIPTION</th>
                      <th className="py-3.5 px-6 border-r border-[#1a3a60]">CREATED AT</th>
                      <th className="py-3.5 px-6">USERS ASSIGNED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {filteredRoles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedRoleItems.includes(role.id)}
                            onChange={() => {
                              setSelectedRoleItems((prev) =>
                                prev.includes(role.id) ? prev.filter((i) => i !== role.id) : [...prev, role.id]
                              );
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={() => handleOpenEditModal(role)}
                            className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Edit Role Configuration"
                          >
                            <Menu size={14} className="mx-auto" />
                          </button>
                        </td>
                        <td className="py-3.5 px-6 font-semibold text-blue-600 hover:underline cursor-pointer">
                          <button onClick={() => handleOpenEditModal(role)} className="cursor-pointer">
                            {role.name}
                          </button>
                        </td>
                        <td className="py-3.5 px-6 text-gray-500 max-w-[280px] truncate">{role.description}</td>
                        <td className="py-3.5 px-6 text-gray-600">{role.createdAt}</td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                            <UsersIcon size={13} className="text-gray-400" />
                            <span>{role.usersAssigned}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span>ROWS PER PAGE</span>
                  <select className="border border-gray-200 rounded px-2 py-0.5 text-xs bg-white text-gray-700">
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <span className="ml-4">Showing 1-{filteredRoles.length} of {filteredRoles.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>PAGE 1 / 1</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-gray-200 rounded disabled:opacity-40" disabled>
                      <ChevronsLeft size={14} />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded disabled:opacity-40" disabled>
                      <ChevronLeft size={14} />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded disabled:opacity-40" disabled>
                      <ChevronRight size={14} />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded disabled:opacity-40" disabled>
                      <ChevronsRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tab 2: Users Table */}
          {umTab === "users" && (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0B2545] text-white text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-6 border-r border-[#1a3a60]">USER NAME</th>
                      <th className="py-3.5 px-6 border-r border-[#1a3a60]">EMAIL</th>
                      <th className="py-3.5 px-6 border-r border-[#1a3a60]">ASSIGNED ROLE</th>
                      <th className="py-3.5 px-6 border-r border-[#1a3a60]">JOINED DATE</th>
                      <th className="py-3.5 px-6">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-6 font-semibold text-gray-900">{user.name}</td>
                        <td className="py-3.5 px-6 text-gray-500">{user.email}</td>
                        <td className="py-3.5 px-6">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-gray-600">{user.createdAt}</td>
                        <td className="py-3.5 px-6">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD PROVIDER (Screenshot with Role Selection)    */}
      {/* ======================================================== */}
      <ModalWrapper
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Provider"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={newProvider.firstName}
              onChange={(e) => setNewProvider({ ...newProvider, firstName: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={newProvider.lastName}
              onChange={(e) => setNewProvider({ ...newProvider, lastName: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={newProvider.email}
              onChange={(e) => setNewProvider({ ...newProvider, email: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <div className="relative">
              <select
                value={newProvider.specialty}
                onChange={(e) => setNewProvider({ ...newProvider, specialty: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white appearance-none pr-8 cursor-pointer text-gray-800"
              >
                <option value="Psychiatry">Psychiatry</option>
                <option value="Psychology">Psychology</option>
                <option value="Therapy">Therapy</option>
                <option value="Physiotherapy">Physiotherapy</option>
                <option value="Dietitian">Dietitian</option>
              </select>
              <ChevronDown size={14} className="text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Select Role (Latter Option - Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <div className="relative">
              <select
                value={newProvider.role}
                onChange={(e) => setNewProvider({ ...newProvider, role: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white appearance-none pr-8 cursor-pointer text-gray-800"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <input
              type="checkbox"
              id="sendInviteProvider"
              checked={newProvider.sendInvite}
              onChange={(e) => setNewProvider({ ...newProvider, sendInvite: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#2563EB] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="sendInviteProvider" className="text-xs text-gray-700 cursor-pointer">
              <span className="font-semibold text-gray-900 block mb-0.5">Send Invitation Email</span>
              Sends an invite giving the provider access to update/edit their MantraComply profile and complete compliance tasks.
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProvider}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Add Provider
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* ======================================================== */}
      {/* MODAL: CREATE / EDIT ROLE (Screenshot 2 Exact Match)    */}
      {/* ======================================================== */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-gray-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingRoleId ? "Edit Role" : "Create Role"}
              </h2>
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveRole} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Form Inputs: Role Name & Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    ROLE NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={roleNameInput}
                    onChange={(e) => setRoleNameInput(e.target.value)}
                    placeholder="e.g. Compliance Officer"
                    className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={roleDescInput}
                    onChange={(e) => setRoleDescInput(e.target.value)}
                    placeholder="e.g. Can manage provider credentials and enrollment filings"
                    className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Matrix Table: MODULE | PERMISSION | LEVEL */}
              <div className="rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0B2545] text-white text-xs font-bold uppercase tracking-wider">
                      <th className="py-3 px-6 w-1/3 border-r border-[#1a3a60]">MODULE</th>
                      <th className="py-3 px-6 w-1/3 border-r border-[#1a3a60]">PERMISSION</th>
                      <th className="py-3 px-6 w-1/3">LEVEL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {ROLE_MODULES.map((module) => {
                      const perm = modalPermissions[module] || { permission: "none", level: "ALL" };

                      return (
                        <tr key={module} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-3.5 px-6 font-semibold text-gray-800">{module}</td>
                          <td className="py-3.5 px-6">
                            <div className="relative">
                              <select
                                value={perm.permission}
                                onChange={(e) => {
                                  const val = e.target.value as any;
                                  setModalPermissions((prev) => ({
                                    ...prev,
                                    [module]: { ...perm, permission: val },
                                  }));
                                }}
                                className="w-full appearance-none px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-500 pr-8 cursor-pointer"
                              >
                                <option value="none">Select an option...</option>
                                <option value="view">View</option>
                                <option value="view_edit">View & Edit</option>
                                <option value="full">Full Access</option>
                              </select>
                              <ChevronDown size={14} className="text-gray-400 absolute right-3 top-3 pointer-events-none" />
                            </div>
                          </td>
                          <td className="py-3.5 px-6">
                            <div className="relative">
                              <select
                                value={perm.level}
                                onChange={(e) => {
                                  const val = e.target.value as any;
                                  setModalPermissions((prev) => ({
                                    ...prev,
                                    [module]: { ...perm, level: val },
                                  }));
                                }}
                                className="w-full appearance-none px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-500 pr-8 cursor-pointer"
                              >
                                <option value="ALL">All Records</option>
                                <option value="ASSIGNED_ONLY">Assigned Records Only</option>
                              </select>
                              <ChevronDown size={14} className="text-gray-400 absolute right-3 top-3 pointer-events-none" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD USER (In Roles View)                         */}
      {/* ======================================================== */}
      <ModalWrapper
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="Add Team Member"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="e.g. Rachel Adams"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="rachel.a@organization.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <div className="relative">
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white appearance-none pr-8 cursor-pointer text-gray-800"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsAddUserModalOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!newUserName.trim() || !newUserEmail.trim()) {
                  showToast("Please enter name and email", "error");
                  return;
                }
                const newUser: OrgUserItem = {
                  id: Date.now(),
                  name: newUserName.trim(),
                  email: newUserEmail.trim(),
                  role: newUserRole,
                  createdAt: "Today",
                  status: "Active",
                };
                setUsers([newUser, ...users]);
                setRoles(
                  roles.map((r) =>
                    r.name === newUserRole ? { ...r, usersAssigned: r.usersAssigned + 1 } : r
                  )
                );
                showToast(`Team member "${newUserName.trim()}" added`, "success");
                setIsAddUserModalOpen(false);
                setNewUserName("");
                setNewUserEmail("");
              }}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Add User
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Request Enrollment Modal */}
      {selectedProviderForEnrollment && (
        <RequestEnrollmentModal
          isOpen={showEnrollmentModal}
          onClose={() => setShowEnrollmentModal(false)}
          providers={payerProviders}
          payers={payers}
          preSelectedProviderId={selectedProviderForEnrollment.id.toString()}
          onSubmit={(data) => {
            const requests = data.selectedPayers.map((payerId: string) => {
              const payer = payers.find((p) => p.id === payerId);
              return {
                providerId: selectedProviderForEnrollment.id.toString(),
                providerName: selectedProviderForEnrollment.name,
                specialty: selectedProviderForEnrollment.specialty,
                payerId,
                payerName: payer?.name || "",
                state: "FL",
                type: payer?.type || "Commercial",
                submittedDate: new Date().toLocaleDateString("en-US"),
                status: "Pending" as const,
                priority: "Normal" as const,
                lastUpdated: "Just now",
                timeline: [],
                comments: [],
                documents: [],
              };
            });
            addEnrollmentRequests(requests);
            showToast("Enrollment request submitted", "success");
            setShowEnrollmentModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Providers;
