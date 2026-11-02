import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Settings, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Plus, 
  X, 
  Building2, 
  User as UserIcon, 
  Shield, 
  Edit3,
  Check,
  CheckSquare,
  Trash2,
  Send,
  ShieldCheck,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import { 
  initialUsers, 
  initialRoles, 
  availableOrganizations, 
  availableSpecialists,
  UserRecord, 
  RoleDefinition, 
  RoleType 
} from '../../data/adminMockData';
import { useToast } from '../../components/shared/Toast';

const complianceModules = [
  "Credential Applications",
  "Document Verification",
  "Enrollment Applications",
  "User Management",
  "Plans & Pricing",
  "Credits Management",
  "Subscriptions & Orders"
];

const POPULAR_PAYERS = [
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "UnitedHealthcare",
  "Humana",
  "Medicare",
  "Medicaid"
];

const US_STATES = [
  "NY", "CA", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI", "NJ", "VA", "WA", "AZ", "MA", "TN", "CO"
];

type PermissionLevel = 'none' | 'view' | 'view_edit' | 'full';

export const Providers: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [roles, setRoles] = useState<RoleDefinition[]>(initialRoles);

  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // Org Multi-Select filter
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);
  const [isOrgFilterOpen, setIsOrgFilterOpen] = useState(false);
  const orgFilterRef = useRef<HTMLDivElement>(null);

  // Checkbox Multi-Select state
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const masterCheckboxRef = useRef<HTMLInputElement>(null);

  // Hamburger Action Menu state
  const [openMenuUserId, setOpenMenuUserId] = useState<number | null>(null);

  // Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestStep, setRequestStep] = useState<1 | 2>(1);
  const [requestType, setRequestType] = useState<'credentialing' | 'enrollment'>('credentialing');
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'mantracomply' | 'manual'>('mantracomply');
  const [assignedTeamMember, setAssignedTeamMember] = useState('Sarah Jenkins');
  const [targetPayer, setTargetPayer] = useState('ALL');
  const [planType, setPlanType] = useState('Commercial');
  const [practiceState, setPracticeState] = useState('NY');
  const [serviceType, setServiceType] = useState('THERAPY');
  const [requestNotes, setRequestNotes] = useState('');

  // Delete Confirmation Dialog State
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Edit User Modal State
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState<RoleType>('PROVIDER');
  const [editCountry, setEditCountry] = useState('United States');
  const [editService, setEditService] = useState('THERAPY');
  const [editCredStartDate, setEditCredStartDate] = useState('Oct 28, 2026');
  const [editEnrollStartDate, setEditEnrollStartDate] = useState('Nov 15, 2026');

  // Add User Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<RoleType>('PROVIDER');
  const [newUserCountry, setNewUserCountry] = useState('United States');
  const [newUserService, setNewUserService] = useState('THERAPY');

  // Create/Edit Role Modal State
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [modulePermissions, setModulePermissions] = useState<Record<string, { permission: PermissionLevel; level: 'ALL' | 'ASSIGNED_ONLY' }>>({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (orgFilterRef.current && !orgFilterRef.current.contains(target)) {
        setIsOrgFilterOpen(false);
      }
      if (!target.closest('.user-action-menu-container')) {
        setOpenMenuUserId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const userOrgs = u.organizations && u.organizations.length > 0 ? u.organizations : [u.organization];
      const matchesSearch = 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.phone && u.phone.includes(searchTerm)) ||
        (u.service && u.service.toLowerCase().includes(searchTerm.toLowerCase())) ||
        userOrgs.some(o => o.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
      const matchesOrg = selectedOrgs.length === 0 || selectedOrgs.some(so => userOrgs.includes(so));
      return matchesSearch && matchesRole && matchesOrg;
    });
  }, [users, searchTerm, roleFilter, selectedOrgs]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Master Checkbox indeterminate state
  const isAllCurrentPageSelected = paginatedUsers.length > 0 && paginatedUsers.every(u => selectedUserIds.includes(u.id));
  const isSomeCurrentPageSelected = paginatedUsers.some(u => selectedUserIds.includes(u.id)) && !isAllCurrentPageSelected;

  useEffect(() => {
    if (masterCheckboxRef.current) {
      masterCheckboxRef.current.indeterminate = isSomeCurrentPageSelected;
    }
  }, [isSomeCurrentPageSelected]);

  const handleToggleMasterCheckbox = () => {
    if (isAllCurrentPageSelected) {
      const currentPageIds = paginatedUsers.map(u => u.id);
      setSelectedUserIds(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      const currentPageIds = paginatedUsers.map(u => u.id);
      setSelectedUserIds(prev => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  const handleToggleRowCheckbox = (id: number) => {
    setSelectedUserIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Delete Handlers
  const handleDeleteSelected = () => {
    const count = selectedUserIds.length;
    setUsers(prev => prev.filter(u => !selectedUserIds.includes(u.id)));
    setSelectedUserIds([]);
    setIsDeleteConfirmOpen(false);
    showToast(`Successfully removed ${count} provider${count > 1 ? 's' : ''} from organization roster.`, 'success');
  };

  // Request Handlers
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserIds.length === 0) return;

    const count = selectedUserIds.length;
    const typeLabel = requestType === 'credentialing' ? 'Credentialing' : 'Payer Enrollment';
    const responsibleAssignee = fulfillmentMethod === 'mantracomply' ? 'MantraComply' : assignedTeamMember;
    const methodLabel = fulfillmentMethod === 'mantracomply' ? 'Mantra AI' : `Manual (${assignedTeamMember})`;

    // Update responsible & start dates in state to reflect the initiated request
    setUsers(prev => prev.map(u => {
      if (selectedUserIds.includes(u.id)) {
        return {
          ...u,
          opsResponsible: responsibleAssignee,
          ...(requestType === 'credentialing' 
            ? { credentialingStartDate: 'Initiated' } 
            : { enrollmentStartDate: 'Initiated' })
        };
      }
      return u;
    }));

    showToast(`Successfully created ${typeLabel} request for ${count} provider(s) via ${methodLabel}.`, 'success');
    setSelectedUserIds([]);
    setIsRequestModalOpen(false);
    setRequestStep(1);
    setRequestNotes('');
  };

  const handleUpdateResponsible = (userId: number, newResponsible: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          opsResponsible: newResponsible
        };
      }
      return u;
    }));
    showToast(`Updated responsible to ${newResponsible}`, 'success');
  };

  // Edit User Handlers
  const handleOpenEditUser = (user: UserRecord) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone || '');
    setEditRole(user.role);
    setEditCountry(user.country || 'United States');
    setEditService(user.service || 'THERAPY');
    setEditCredStartDate(user.credentialingStartDate || 'Oct 28, 2026');
    setEditEnrollStartDate(user.enrollmentStartDate || 'Nov 15, 2026');
    setOpenMenuUserId(null);
    setIsEditUserModalOpen(true);
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsers(prev => prev.map(u => {
      if (u.id === editingUser.id) {
        return {
          ...u,
          name: editName.trim(),
          email: editEmail.trim(),
          phone: editPhone.trim(),
          role: editRole,
          country: editCountry,
          service: editService.trim(),
          credentialingStartDate: editCredStartDate,
          enrollmentStartDate: editEnrollStartDate
        };
      }
      return u;
    }));

    showToast(`Updated profile for ${editName.trim()}`, 'success');
    setIsEditUserModalOpen(false);
    setEditingUser(null);
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: UserRecord = {
      id: Math.floor(1000 + Math.random() * 9000),
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim(),
      organization: 'MantraCare',
      organizations: ['MantraCare'],
      country: newUserCountry,
      countryFlag: newUserCountry === 'Canada' ? '🇨🇦' : newUserCountry === 'United Kingdom' ? '🇬🇧' : '🇺🇸',
      service: newUserService.trim(),
      signupDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      role: newUserRole,
      status: 'Active',
      credentialingStartDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      enrollmentStartDate: 'Pending'
    };

    setUsers([newUser, ...users]);
    showToast(`Added ${newUserName.trim()} to provider roster`, 'success');
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
  };

  // Roles Tab Handlers
  const handleOpenCreateRole = () => {
    setEditingRoleId(null);
    setRoleName('');
    setRoleDescription('');
    const defaults: Record<string, { permission: PermissionLevel; level: 'ALL' | 'ASSIGNED_ONLY' }> = {};
    complianceModules.forEach(mod => {
      defaults[mod] = { permission: 'view', level: 'ALL' };
    });
    setModulePermissions(defaults);
    setIsRoleModalOpen(true);
  };

  const handleOpenEditRole = (role: RoleDefinition) => {
    setEditingRoleId(role.id);
    setRoleName(role.name);
    setRoleDescription(role.description);
    const loadedPerms: Record<string, { permission: PermissionLevel; level: 'ALL' | 'ASSIGNED_ONLY' }> = {};
    complianceModules.forEach(mod => {
      const existing = role.permissions.find(p => p.module === mod);
      let perm: PermissionLevel = 'none';
      if (existing) {
        if (existing.edit && existing.approve) perm = 'full';
        else if (existing.edit) perm = 'view_edit';
        else if (existing.view) perm = 'view';
      } else {
        perm = 'view';
      }
      loadedPerms[mod] = {
        permission: perm,
        level: role.dataScope || 'ALL'
      };
    });
    setModulePermissions(loadedPerms);
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) return;

    const convertedPermissions = Object.entries(modulePermissions).map(([mod, state]) => ({
      module: mod,
      view: state.permission !== 'none',
      edit: state.permission === 'view_edit' || state.permission === 'full',
      approve: state.permission === 'full',
      assign: state.permission === 'full'
    }));

    const firstScope = Object.values(modulePermissions)[0]?.level || 'ALL';

    if (editingRoleId) {
      setRoles(prev => prev.map(r => r.id === editingRoleId ? {
        ...r,
        name: roleName.trim(),
        description: roleDescription.trim(),
        dataScope: firstScope,
        permissions: convertedPermissions
      } : r));
    } else {
      const newRole: RoleDefinition = {
        id: roleName.toLowerCase().replace(/\s+/g, '_'),
        name: roleName.trim(),
        description: roleDescription.trim(),
        isSystem: false,
        userCount: 0,
        dataScope: firstScope,
        permissions: convertedPermissions
      };
      setRoles([...roles, newRole]);
    }

    setIsRoleModalOpen(false);
  };

  const toggleOrgSelection = (org: string) => {
    setSelectedOrgs(prev => 
      prev.includes(org) ? prev.filter(o => o !== org) : [...prev, org]
    );
  };

  const filteredRoles = useMemo(() => {
    return roles.filter((r) => {
      const matchesSearch = 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'ALL' || r.name === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [roles, searchTerm, roleFilter]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#002B49] tracking-tight">Users Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage system users, assigned organizations, roles, and profiles.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left Side: Toggles + Search + Org Filter + Role Filter */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="bg-slate-100 p-1 rounded-full flex items-center gap-1 border border-slate-200/60 shrink-0">
            <button
              onClick={() => {
                setActiveTab('users');
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => {
                setActiveTab('roles');
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'roles'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Roles
            </button>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>

          {/* Search Box */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/50 flex-1 max-w-sm focus-within:border-blue-500 focus-within:bg-white transition-all">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email, service or org..."
              className="text-xs text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent w-full"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Organization Multi-Select Dropdown Filter */}
          <div className="relative" ref={orgFilterRef}>
            <button
              type="button"
              onClick={() => setIsOrgFilterOpen(!isOrgFilterOpen)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                selectedOrgs.length > 0
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Building2 size={13} className={selectedOrgs.length > 0 ? 'text-blue-600' : 'text-slate-400'} />
              <span>
                {selectedOrgs.length === 0 
                  ? 'All Organizations' 
                  : `${selectedOrgs.length} Org${selectedOrgs.length > 1 ? 's' : ''} Selected`}
              </span>
              <ChevronDown size={12} className="opacity-70" />
            </button>

            {isOrgFilterOpen && (
              <div className="absolute left-0 mt-1.5 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Filter by Org</span>
                  {selectedOrgs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedOrgs([])}
                      className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1">
                  {availableOrganizations.map((org) => {
                    const isChecked = selectedOrgs.includes(org);
                    return (
                      <label
                        key={org}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700 font-medium"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleOrgSelection(org)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="truncate">{org}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Role Filter Dropdown */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer appearance-none pr-7 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Roles</option>
              <option value="PROVIDER">Provider</option>
              <option value="ADMIN">Admin</option>
              <option value="CREDENTIALING_SPECIALIST">Credentialing Specialist</option>
              <option value="ORG ADMIN">Org Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
            <ChevronDown size={12} className="text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Right Side: Total Count and Add User / Create Role button */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          {activeTab === 'users' ? (
            <>
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                {filteredUsers.length} users
              </span>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Add User</span>
              </button>
            </>
          ) : (
            <>
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                {filteredRoles.length} roles
              </span>
              <button
                type="button"
                onClick={handleOpenCreateRole}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Create Role</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Selected Org Chips */}
      {selectedOrgs.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Filtered Orgs:</span>
          {selectedOrgs.map((org) => (
            <span
              key={org}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-[11px]"
            >
              <Building2 size={11} />
              <span>{org}</span>
              <button
                type="button"
                onClick={() => toggleOrgSelection(org)}
                className="hover:text-blue-900 cursor-pointer"
              >
                <X size={11} />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => setSelectedOrgs([])}
            className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold underline ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: USERS TABLE (CHECKBOXES + REFERRED/ONBOARDED/OPS REMOVED) */}
      {/* ======================================================== */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden relative">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0 min-w-[1400px]">
              <thead>
                <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                  {/* Col 0: Master Checkbox (sticky left-0) */}
                  <th className="py-3.5 px-0 w-[44px] min-w-[44px] max-w-[44px] text-center border-r border-b border-[#1a4a6e] box-border sticky left-0 bg-[#002B49] z-30">
                    <div className="w-[44px] flex items-center justify-center">
                      <input
                        ref={masterCheckboxRef}
                        type="checkbox"
                        checked={isAllCurrentPageSelected}
                        onChange={handleToggleMasterCheckbox}
                        className="w-4 h-4 rounded text-blue-600 bg-white border-slate-300 focus:ring-blue-500 cursor-pointer transition-colors"
                        title={isAllCurrentPageSelected ? "Deselect all on this page" : "Select all on this page"}
                      />
                    </div>
                  </th>

                  {/* Col 1: Action Menu Icon (sticky left-44px) */}
                  <th className="py-3.5 px-0 w-[44px] min-w-[44px] max-w-[44px] text-center border-r border-b border-[#1a4a6e] box-border sticky left-[44px] bg-[#002B49] z-30">
                    <div className="w-[44px] flex items-center justify-center">
                      <span className="text-slate-300">≡</span>
                    </div>
                  </th>

                  {/* Col 2: USER (Avatar + Name + ID) (sticky left-88px with subtle drop shadow) */}
                  <th className="py-3.5 px-5 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[220px] sticky left-[88px] bg-[#002B49] z-30 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.25)]">
                    USER
                  </th>

                  <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[200px]">EMAIL</th>
                  <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[150px]">PHONE</th>
                  <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[180px]">ORGANIZATION</th>
                  <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[140px]">COUNTRY</th>
                  <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[160px]">SERVICE</th>
                  <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[130px]">SIGNUP DATE</th>
                  <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[130px]">ROLE</th>
                  <th className="py-3.5 px-4 border-b border-[#1a4a6e] whitespace-nowrap min-w-[190px]">RESPONSIBLE</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-16 text-slate-400 text-sm border-b border-slate-100">
                      No users found matching your filters.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user, idx) => {
                    const isNearBottom = idx >= paginatedUsers.length - 2 && paginatedUsers.length > 2;
                    const isSelected = selectedUserIds.includes(user.id);
                    const userOrgs = user.organizations && user.organizations.length > 0 
                      ? user.organizations 
                      : [user.organization];

                    return (
                      <tr 
                        key={user.id} 
                        className={`transition-colors group ${
                          isSelected ? 'bg-blue-50/50 hover:bg-blue-50/70' : 'hover:bg-slate-50/80'
                        } ${openMenuUserId === user.id ? 'relative z-50' : ''}`}
                      >
                        {/* Col 0: Row Checkbox */}
                        <td className={`py-3 px-0 w-[44px] min-w-[44px] max-w-[44px] text-center border-r border-b border-slate-100 box-border sticky left-0 transition-colors z-20 ${
                          isSelected ? 'bg-blue-50/80' : 'bg-white group-hover:bg-slate-50'
                        }`}>
                          <div className="w-[44px] flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleRowCheckbox(user.id)}
                              className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer transition-colors"
                            />
                          </div>
                        </td>

                        {/* Col 1: Action Hamburger (≡) with Edit Option */}
                        <td className={`py-3 px-0 w-[44px] min-w-[44px] max-w-[44px] text-center border-r border-b border-slate-100 box-border sticky left-[44px] transition-colors relative ${
                          isSelected ? 'bg-blue-50/80' : 'bg-white group-hover:bg-slate-50'
                        } ${openMenuUserId === user.id ? 'z-50' : 'z-20'}`}>
                          <div className={`relative inline-block text-center user-action-menu-container ${openMenuUserId === user.id ? 'z-50' : ''}`}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuUserId(openMenuUserId === user.id ? null : user.id);
                              }}
                              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer mx-auto ${
                                openMenuUserId === user.id
                                  ? 'bg-blue-100 text-blue-700 font-bold'
                                  : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                              }`}
                              title="Actions"
                              aria-label="Actions"
                            >
                              <span className="text-base select-none font-bold leading-none">≡</span>
                            </button>

                            {openMenuUserId === user.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className={`absolute left-full ml-1 w-32 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-[100] text-left font-medium text-xs tracking-wide animate-in fade-in zoom-in-95 duration-100 ${
                                  isNearBottom ? 'bottom-0' : 'top-0'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenEditUser(user);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left cursor-pointer font-semibold"
                                >
                                  <Edit3 size={14} className="text-blue-600 shrink-0" />
                                  <span>Edit</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Col 2: USER (Avatar Circle + Name + ID) */}
                        <td className={`py-3 px-5 border-r border-b border-slate-100 whitespace-nowrap sticky left-[88px] transition-colors z-10 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.06)] ${
                          isSelected ? 'bg-blue-50/80' : 'bg-white group-hover:bg-slate-50'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                              <UserIcon size={14} />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {user.name}
                              </div>
                              <div className="text-[10px] text-slate-400 font-normal">
                                ID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3 px-4 text-slate-600 font-medium whitespace-nowrap border-r border-b border-slate-100">
                          {user.email}
                        </td>

                        {/* Phone */}
                        <td className="py-3 px-4 text-slate-700 whitespace-nowrap font-medium border-r border-b border-slate-100">
                          {user.phone || '—'}
                        </td>

                        {/* Organization */}
                        <td className="py-3 px-4 whitespace-nowrap border-r border-b border-slate-100">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {userOrgs.map((org, oIdx) => (
                              <span key={oIdx} className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                {org}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Country */}
                        <td className="py-3 px-4 text-slate-700 whitespace-nowrap font-medium border-r border-b border-slate-100">
                          <span className="mr-1.5">{user.countryFlag}</span>
                          <span>{user.country}</span>
                        </td>

                        {/* Service */}
                        <td className="py-3 px-4 whitespace-nowrap font-semibold border-r border-b border-slate-100">
                          {user.service && user.service !== '—' ? (
                            <span className="text-blue-700 uppercase tracking-tight">{user.service}</span>
                          ) : (
                            <span className="text-slate-400 font-normal">—</span>
                          )}
                        </td>

                        {/* Signup Date */}
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap font-medium border-r border-b border-slate-100">
                          {user.signupDate}
                        </td>

                        {/* Role */}
                        <td className="py-3 px-4 whitespace-nowrap border-r border-b border-slate-100">
                          <button
                            type="button"
                            onClick={() => handleOpenEditUser(user)}
                            title="Click to edit user role & details"
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors uppercase tracking-tight cursor-pointer"
                          >
                            <UserIcon size={11} className="text-blue-500" />
                            <span>{user.role}</span>
                          </button>
                        </td>

                        {/* Responsible Column */}
                        <td className="py-3 px-4 whitespace-nowrap border-b border-slate-100">
                          <div className="relative inline-block">
                            <select
                              value={user.opsResponsible || 'Unassigned'}
                              onChange={(e) => handleUpdateResponsible(user.id, e.target.value)}
                              className={`px-3 py-1 pr-7 rounded-full text-xs font-semibold border transition-all cursor-pointer appearance-none ${
                                user.opsResponsible === 'MantraComply' || user.opsResponsible === 'Mantra AI'
                                  ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 shadow-2xs'
                                  : user.opsResponsible && user.opsResponsible !== 'Unassigned' && user.opsResponsible !== '—'
                                  ? 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-2xs'
                                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                              }`}
                            >
                              <option value="Unassigned">Unassigned</option>
                              <option value="MantraComply">MantraComply</option>
                              {availableSpecialists.map((spec) => (
                                <option key={spec} value={spec}>{spec}</option>
                              ))}
                            </select>
                            <ChevronDown 
                              size={12} 
                              className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                                user.opsResponsible === 'MantraComply' || user.opsResponsible === 'Mantra AI'
                                  ? 'text-blue-500' 
                                  : 'text-slate-400'
                              }`} 
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span>Showing</span>
              <span className="font-bold text-slate-900">
                {filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
              </span>
              <span>to</span>
              <span className="font-bold text-slate-900">
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
              </span>
              <span>of</span>
              <span className="font-bold text-slate-900">{filteredUsers.length}</span>
              <span>users</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }).map((_, pIdx) => {
                const pNum = pIdx + 1;
                return (
                  <button
                    key={pNum}
                    onClick={() => setCurrentPage(pNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === pNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {pNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FLOATING ACTION PILL (EXACT DESIGN MATCHING USER IMAGE) */}
      {/* ======================================================== */}
      {selectedUserIds.length > 0 && activeTab === 'users' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#0B1527] text-white px-5 py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3.5 backdrop-blur-md">
            {/* Selection Counter */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <CheckSquare size={16} className="text-blue-400" />
              <span>{selectedUserIds.length} {selectedUserIds.length === 1 ? 'client' : 'clients'} selected</span>
            </div>

            <div className="h-4 w-px bg-slate-700/80" />

            {/* Request Button */}
            <button
              type="button"
              onClick={() => {
                setRequestStep(1);
                setIsRequestModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Send size={13} />
              <span>Request</span>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3f1618] hover:bg-[#501c20] text-[#fca5a5] border border-red-500/30 font-semibold text-xs transition-colors cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>

            <div className="h-4 w-px bg-slate-700/80" />

            {/* Cancel/Deselect Button */}
            <button
              type="button"
              onClick={() => setSelectedUserIds([])}
              className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors"
              title="Clear selection"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2-STEP SERVICE REQUEST MODAL (CREDENTIALING & ENROLLMENT) */}
      {/* ======================================================== */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
              onClick={() => {
                setIsRequestModalOpen(false);
                setRequestStep(1);
              }}
            />

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-150">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {requestStep === 1 
                      ? 'Update Process & Stage' 
                      : (requestType === 'credentialing' ? 'Credentialing Details' : 'Enrollment Details')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {requestStep === 1
                      ? `Move ${selectedUserIds.length} selected client${selectedUserIds.length > 1 ? 's' : ''} to a new workflow process and stage.`
                      : `Configure ${fulfillmentMethod === 'mantracomply' ? 'Mantra AI' : 'manual internal'} details.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsRequestModalOpen(false);
                    setRequestStep(1);
                  }}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Step 1: Process and Execution Mode Selection */}
              {requestStep === 1 ? (
                <div className="space-y-4 mt-6">
                  {/* Field 1: Target Process */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Target Process
                    </label>
                    <div className="relative">
                      <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value as 'credentialing' | 'enrollment')}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                      >
                        <option value="credentialing">Credentialing</option>
                        <option value="enrollment">Payer Enrollment</option>
                      </select>
                      <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Field 2: Execution Mode */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Execution Mode
                    </label>
                    <div className="relative">
                      <select
                        value={fulfillmentMethod}
                        onChange={(e) => setFulfillmentMethod(e.target.value as 'mantracomply' | 'manual')}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                      >
                        <option value="mantracomply">Mantra AI</option>
                        <option value="manual">Manual</option>
                      </select>
                      <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 1 Footer */}
                  <div className="flex items-center justify-between pt-6 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRequestModalOpen(false);
                        setRequestStep(1);
                      }}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setRequestStep(2)}
                      className="px-8 py-2.5 rounded-full bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 2: Specific Request Details */
                <form onSubmit={handleSubmitRequest} className="space-y-4 mt-6">
                  {requestType === 'credentialing' ? (
                    <>
                      {/* Credentialing Field 1: Service Category */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Service Category
                        </label>
                        <div className="relative">
                          <select
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                          >
                            <option value="THERAPY">Therapy</option>
                            <option value="OCCUPATIONAL THERAPY">Occupational Therapy</option>
                            <option value="SPEECH THERAPY">Speech Therapy</option>
                            <option value="BEHAVIORAL HEALTH">Behavioral Health</option>
                            <option value="PHYSICIAN">Physician / MD</option>
                            <option value="NURSE PRACTITIONER">Nurse Practitioner (NP)</option>
                            <option value="OTHER">Other Specialty</option>
                          </select>
                          <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Credentialing Field 2: Practice State */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Practice State
                        </label>
                        <div className="relative">
                          <select
                            value={practiceState}
                            onChange={(e) => setPracticeState(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                          >
                            {US_STATES.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Assign Team Member (When Manual) */}
                      {fulfillmentMethod === 'manual' && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Assign Team Member
                          </label>
                          <div className="relative">
                            <select
                              value={assignedTeamMember}
                              onChange={(e) => setAssignedTeamMember(e.target.value)}
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                            >
                              {availableSpecialists.map((spec) => (
                                <option key={spec} value={spec}>{spec}</option>
                              ))}
                            </select>
                            <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      )}

                      {/* Credentialing Field 3: Special Instructions */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Special Instructions (Optional)
                        </label>
                        <input
                          type="text"
                          value={requestNotes}
                          onChange={(e) => setRequestNotes(e.target.value)}
                          placeholder="e.g. Expedited CAQH verification..."
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-colors"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Enrollment Field 1: Target Payer */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Target Payer
                        </label>
                        <div className="relative">
                          <select
                            value={targetPayer}
                            onChange={(e) => setTargetPayer(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                          >
                            <option value="ALL">All Major Payers (Aetna, BCBS, Cigna, UHC)</option>
                            {POPULAR_PAYERS.map(p => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Enrollment Field 2: Practice State */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Practice State
                        </label>
                        <div className="relative">
                          <select
                            value={practiceState}
                            onChange={(e) => setPracticeState(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                          >
                            {US_STATES.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Enrollment Field 3: Plan Type */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Plan Type
                        </label>
                        <div className="relative">
                          <select
                            value={planType}
                            onChange={(e) => setPlanType(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                          >
                            <option value="Commercial">Commercial</option>
                            <option value="Medicare">Medicare</option>
                            <option value="Medicaid">Medicaid</option>
                          </select>
                          <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Assign Team Member (When Manual) */}
                      {fulfillmentMethod === 'manual' && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Assign Team Member
                          </label>
                          <div className="relative">
                            <select
                              value={assignedTeamMember}
                              onChange={(e) => setAssignedTeamMember(e.target.value)}
                              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-slate-400 appearance-none pr-9 transition-colors cursor-pointer"
                            >
                              {availableSpecialists.map((spec) => (
                                <option key={spec} value={spec}>{spec}</option>
                              ))}
                            </select>
                            <ChevronDown size={14} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      )}

                      {/* Enrollment Field 4: Special Instructions */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Special Instructions (Optional)
                        </label>
                        <input
                          type="text"
                          value={requestNotes}
                          onChange={(e) => setRequestNotes(e.target.value)}
                          placeholder="e.g. Include group NPI..."
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-colors"
                        />
                      </div>
                    </>
                  )}

                  {/* Step 2 Footer */}
                  <div className="flex items-center justify-between pt-6 mt-6">
                    <button
                      type="button"
                      onClick={() => setRequestStep(1)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2.5 rounded-full bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ======================================================== */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setIsDeleteConfirmOpen(false)}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Trash2 size={24} />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                Delete {selectedUserIds.length} Selected Provider{selectedUserIds.length > 1 ? 's' : ''}?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-5">
                This will remove the selected provider records from your organization roster. Any active credentialing or enrollment applications associated with these providers will be archived.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 size={13} />
                  <span>Delete Providers</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* EDIT USER MODAL (With Working Role, No Org Option, Button Says "Edit") */}
      {/* ======================================================== */}
      {isEditUserModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsEditUserModalOpen(false)}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 transform transition-all z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Edit3 size={18} className="text-blue-600" />
                    <span>Edit User Details</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modify profile information and system role assignment.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={handleSaveEditUser} className="space-y-4 text-xs">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                {/* Phone & Role (Working Role Selector) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      System Role
                    </label>
                    <div className="relative">
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value as any)}
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 bg-white cursor-pointer appearance-none pr-8 font-semibold text-slate-800"
                      >
                        <option value="PROVIDER">Provider</option>
                        <option value="ADMIN">Admin</option>
                        <option value="CREDENTIALING_SPECIALIST">Credentialing Specialist</option>
                        <option value="ORG ADMIN">Org Admin</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                      </select>
                      <ChevronDown size={14} className="text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Country & Service */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Country
                    </label>
                    <select
                      value={editCountry}
                      onChange={(e) => setEditCountry(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 bg-white cursor-pointer font-medium text-slate-800"
                    >
                      <option value="United States">🇺🇸 United States</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Philippines">🇵🇭 Philippines</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Service
                    </label>
                    <input
                      type="text"
                      value={editService}
                      onChange={(e) => setEditService(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 uppercase font-semibold text-blue-700"
                    />
                  </div>
                </div>

                {/* Start Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Credentialing Start Date
                    </label>
                    <input
                      type="text"
                      value={editCredStartDate}
                      onChange={(e) => setEditCredStartDate(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Enrollment Start Date
                    </label>
                    <input
                      type="text"
                      value={editEnrollStartDate}
                      onChange={(e) => setEditEnrollStartDate(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                {/* Footer Buttons - Button says "Edit" */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditUserModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD USER MODAL */}
      {/* ======================================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsAddUserModalOpen(false)}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 transform transition-all z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <UserIcon size={18} className="text-blue-600" />
                    <span>Add New User</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create system account and configure initial assignments.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nancy Brooks"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. nancy@example.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +1 7174905619"
                      value={newUserPhone}
                      onChange={(e) => setNewUserPhone(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      System Role
                    </label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as any)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 bg-white cursor-pointer font-semibold"
                    >
                      <option value="PROVIDER">Provider</option>
                      <option value="ADMIN">Admin</option>
                      <option value="CREDENTIALING_SPECIALIST">Credentialing Specialist</option>
                      <option value="ORG ADMIN">Org Admin</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Country
                    </label>
                    <select
                      value={newUserCountry}
                      onChange={(e) => setNewUserCountry(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 bg-white cursor-pointer"
                    >
                      <option value="United States">🇺🇸 United States</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Service
                    </label>
                    <input
                      type="text"
                      value={newUserService}
                      onChange={(e) => setNewUserService(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-500 uppercase font-semibold text-blue-700"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Create User Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: ROLES TABLE (PERMISSIONS MATRIX) */}
      {/* ======================================================== */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-3 w-10 text-center border-r border-[#1a4a6e]">
                    <Settings size={14} className="text-slate-300 mx-auto" />
                  </th>
                  <th className="py-3.5 px-6 border-r border-[#1a4a6e]">Role Name</th>
                  <th className="py-3.5 px-6 border-r border-[#1a4a6e]">Description</th>
                  <th className="py-3.5 px-6 border-r border-[#1a4a6e]">Data Scope</th>
                  <th className="py-3.5 px-6">Users Assigned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 text-center text-slate-400 border-r border-slate-100">
                      <button
                        onClick={() => handleOpenEditRole(role)}
                        className="hover:text-blue-600 transition-colors cursor-pointer"
                        title="Edit Role Permissions"
                      >
                        <Edit3 size={14} />
                      </button>
                    </td>
                    <td className="py-3.5 px-6 font-bold text-slate-900 border-r border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                          {role.name}
                        </span>
                        {role.isSystem && (
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            (System)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 border-r border-slate-100 max-w-md">
                      {role.description}
                    </td>
                    <td className="py-3.5 px-6 border-r border-slate-100">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {role.dataScope}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-slate-700">
                      {role.userCount} users
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT ROLE MODAL */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsRoleModalOpen(false)}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all overflow-hidden border border-slate-200">
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {editingRoleId ? 'Edit Role & Permissions' : 'Create Custom Role'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Define module permission levels and operational scope.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsRoleModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveRole} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Role Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. COMPLIANCE_OFFICER"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold uppercase text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Role purpose and responsibility..."
                      value={roleDescription}
                      onChange={(e) => setRoleDescription(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Module Access & Permissions Matrix
                  </h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#002B49] text-white text-[10px] font-bold uppercase tracking-wider">
                        <tr>
                          <th className="py-2.5 px-4">Compliance Module</th>
                          <th className="py-2.5 px-4">Permission Level</th>
                          <th className="py-2.5 px-4">Data Scope</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {complianceModules.map((mod) => (
                          <tr key={mod} className="hover:bg-slate-50/80">
                            <td className="py-3 px-4 font-semibold text-slate-800">{mod}</td>
                            <td className="py-3 px-4">
                              <select
                                value={modulePermissions[mod]?.permission || 'none'}
                                onChange={(e) => {
                                  const val = e.target.value as PermissionLevel;
                                  setModulePermissions(prev => ({
                                    ...prev,
                                    [mod]: { ...prev[mod], permission: val }
                                  }));
                                }}
                                className="px-2.5 py-1 border border-slate-200 rounded-lg text-xs bg-white font-medium text-slate-700 cursor-pointer"
                              >
                                <option value="none">No Access</option>
                                <option value="view">View Only</option>
                                <option value="view_edit">View & Edit</option>
                                <option value="full">Full Control</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={modulePermissions[mod]?.level || 'ALL'}
                                onChange={(e) => {
                                  const val = e.target.value as 'ALL' | 'ASSIGNED_ONLY';
                                  setModulePermissions(prev => ({
                                    ...prev,
                                    [mod]: { ...prev[mod], level: val }
                                  }));
                                }}
                                className="px-2.5 py-1 border border-slate-200 rounded-lg text-xs bg-white font-medium text-slate-700 cursor-pointer"
                              >
                                <option value="ALL">All Records</option>
                                <option value="ASSIGNED_ONLY">Assigned Only</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsRoleModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Save Role Definition
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;
