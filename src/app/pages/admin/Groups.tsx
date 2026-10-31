import { useState } from "react";
import { Plus, Eye, Search, Phone, Building2, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";

interface Group {
  id: number;
  name: string;
  state: string;
  npi: string;
  taxId: string;
  phone: string;
  practices: number;
  providers: number;
  payers: number;
  percentComplete: number;
}

interface Facility {
  id: number;
  name: string;
  groupName: string;
  state: string;
  npi: string;
  phone: string;
}

const DUMMY_GROUPS: Group[] = [
  {
    id: 1,
    name: "Community Health Center",
    state: "LA",
    npi: "1234567890",
    taxId: "12-3456789",
    phone: "(555) 234-5678",
    practices: 5,
    providers: 12,
    payers: 8,
    percentComplete: 85,
  },
  {
    id: 2,
    name: "Longmont Medical Group LLC",
    state: "TN",
    npi: "0987654321",
    taxId: "98-7654321",
    phone: "(555) 345-6789",
    practices: 3,
    providers: 8,
    payers: 6,
    percentComplete: 92,
  },
  {
    id: 3,
    name: "Riverside Medical Associates",
    state: "CA",
    npi: "1122334455",
    taxId: "11-2233445",
    phone: "(555) 456-7890",
    practices: 7,
    providers: 15,
    payers: 10,
    percentComplete: 78,
  },
  {
    id: 4,
    name: "Summit Healthcare Partners",
    state: "NY",
    npi: "5544332211",
    taxId: "55-4433221",
    phone: "(555) 567-8901",
    practices: 4,
    providers: 10,
    payers: 7,
    percentComplete: 95,
  },
];

const DUMMY_FACILITIES: Facility[] = [
  {
    id: 1,
    name: "Community Health Center - North Clinic",
    groupName: "Community Health Center",
    state: "LA",
    npi: "1234567891",
    phone: "(555) 234-5679",
  },
  {
    id: 2,
    name: "Longmont Urgent Care Center",
    groupName: "Longmont Medical Group LLC",
    state: "TN",
    npi: "0987654322",
    phone: "(555) 345-6780",
  },
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export function Groups() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"groups" | "facilities">("groups");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddFacilityModal, setShowAddFacilityModal] = useState(false);
  const [groups, setGroups] = useState<Group[]>(DUMMY_GROUPS);
  const [facilities, setFacilities] = useState<Facility[]>(DUMMY_FACILITIES);

  const [newGroup, setNewGroup] = useState({
    legalName: "",
    stateOfIncorporation: "",
    groupNPI: "",
    taxId: "",
    phone: "",
    primaryContactName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
  });

  const [newFacility, setNewFacility] = useState({
    name: "",
    groupName: "",
    state: "",
    npi: "",
    phone: "",
  });

  const handleAddGroup = () => {
    if (!newGroup.legalName || !newGroup.stateOfIncorporation) {
      showToast("Please fill in required fields", "error");
      return;
    }

    const newGroupObj: Group = {
      id: groups.length + 1,
      name: newGroup.legalName,
      state: newGroup.stateOfIncorporation,
      npi: newGroup.groupNPI || "—",
      taxId: newGroup.taxId || "—",
      phone: newGroup.phone || newGroup.primaryContactPhone || "—",
      practices: 0,
      providers: 0,
      payers: 0,
      percentComplete: 80,
    };

    setGroups([...groups, newGroupObj]);
    showToast(`${newGroup.legalName} has been added`, "success");
    setShowAddGroupModal(false);
    setNewGroup({
      legalName: "",
      stateOfIncorporation: "",
      groupNPI: "",
      taxId: "",
      phone: "",
      primaryContactName: "",
      primaryContactEmail: "",
      primaryContactPhone: "",
    });
  };

  const handleAddFacility = () => {
    if (!newFacility.name || !newFacility.state) {
      showToast("Please fill in facility name and state", "error");
      return;
    }

    const newFacilityObj: Facility = {
      id: facilities.length + 1,
      name: newFacility.name,
      groupName: newFacility.groupName || groups[0]?.name || "Main Group",
      state: newFacility.state,
      npi: newFacility.npi || "—",
      phone: newFacility.phone || "—",
    };

    setFacilities([...facilities, newFacilityObj]);
    showToast(`${newFacility.name} has been added`, "success");
    setShowAddFacilityModal(false);
    setNewFacility({
      name: "",
      groupName: "",
      state: "",
      npi: "",
      phone: "",
    });
  };

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.npi.includes(searchTerm)
  );

  const filteredFacilities = facilities.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Groups & Facilities</h1>
          <p className="text-sm text-gray-500 mt-1">Manage practice groups and clinical facilities</p>
        </div>
        {activeTab === "groups" ? (
          <button
            onClick={() => setShowAddGroupModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add Group
          </button>
        ) : (
          <button
            onClick={() => setShowAddFacilityModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add Facility
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("groups")}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === "groups"
              ? "text-[#2563EB]"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Groups
          {activeTab === "groups" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("facilities")}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === "facilities"
              ? "text-[#2563EB]"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Facilities
          {activeTab === "facilities" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
          )}
        </button>
      </div>

      {/* Main Card with Filter and Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-5">
        {/* Search Bar */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder={activeTab === "groups" ? "Search groups..." : "Search facilities..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse">
            {activeTab === "groups" ? (
              <>
                <thead>
                  <tr className="bg-[#0B2545] text-white">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      NAME
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      STATE
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      NPI NUMBER
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      TAX ID NUMBER
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      PHONE
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                      <tr key={group.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <button
                            onClick={() => navigate(`/admin/groups/${group.id}`)}
                            className="font-medium text-[#2563EB] hover:underline text-left cursor-pointer"
                          >
                            {group.name}
                          </button>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-700">{group.state}</td>
                        <td className="px-5 py-4 text-sm font-mono text-gray-700">{group.npi}</td>
                        <td className="px-5 py-4 text-sm font-mono text-gray-700">{group.taxId}</td>
                        <td className="px-5 py-4 text-sm text-gray-700">{group.phone}</td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => navigate(`/admin/groups/${group.id}`)}
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="View group details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-20 text-center text-sm text-gray-400">
                        No groups found for this organization.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            ) : (
              <>
                <thead>
                  <tr className="bg-[#0B2545] text-white">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      FACILITY NAME
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      GROUP
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      STATE
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      NPI NUMBER
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      PHONE
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredFacilities.length > 0 ? (
                    filteredFacilities.map((facility) => (
                      <tr key={facility.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-5 py-4 font-medium text-gray-900">{facility.name}</td>
                        <td className="px-5 py-4 text-sm text-gray-700">{facility.groupName}</td>
                        <td className="px-5 py-4 text-sm text-gray-700">{facility.state}</td>
                        <td className="px-5 py-4 text-sm font-mono text-gray-700">{facility.npi}</td>
                        <td className="px-5 py-4 text-sm text-gray-700">{facility.phone}</td>
                        <td className="px-5 py-4">
                          <button
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="View facility"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-20 text-center text-sm text-gray-400">
                        No facilities found for this organization.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>

      {/* Add Group Modal */}
      <ModalWrapper
        isOpen={showAddGroupModal}
        onClose={() => setShowAddGroupModal(false)}
        title="Add Group"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group / Organization Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newGroup.legalName}
              onChange={(e) => setNewGroup({ ...newGroup, legalName: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="e.g. Acme Health Partners LLC"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={newGroup.stateOfIncorporation}
                onChange={(e) => setNewGroup({ ...newGroup, stateOfIncorporation: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="">Select state</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={newGroup.phone}
                onChange={(e) => setNewGroup({ ...newGroup, phone: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                placeholder="(555) 000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group NPI (Type 2)</label>
              <input
                type="text"
                value={newGroup.groupNPI}
                onChange={(e) => setNewGroup({ ...newGroup, groupNPI: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                placeholder="10-digit NPI"
                maxLength={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / EIN</label>
              <input
                type="text"
                value={newGroup.taxId}
                onChange={(e) => setNewGroup({ ...newGroup, taxId: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                placeholder="XX-XXXXXXX"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddGroupModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGroup}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              Create Group
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Add Facility Modal */}
      <ModalWrapper
        isOpen={showAddFacilityModal}
        onClose={() => setShowAddFacilityModal(false)}
        title="Add Facility"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facility Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newFacility.name}
              onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="e.g. North Clinic"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Associated Group</label>
            <select
              value={newFacility.groupName}
              onChange={(e) => setNewFacility({ ...newFacility, groupName: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
            >
              <option value="">Select group</option>
              {groups.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={newFacility.state}
                onChange={(e) => setNewFacility({ ...newFacility, state: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="">Select state</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={newFacility.phone}
                onChange={(e) => setNewFacility({ ...newFacility, phone: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                placeholder="(555) 000-0000"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddFacilityModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddFacility}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              Create Facility
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Groups;
