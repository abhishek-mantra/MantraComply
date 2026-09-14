import { useState } from "react";
import { Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";

interface Group {
  id: number;
  name: string;
  state: string;
  npi: string;
  taxId: string;
  practices: number;
  providers: number;
  payers: number;
  percentComplete: number;
}

const DUMMY_GROUPS: Group[] = [
  {
    id: 1,
    name: "Community Health Center",
    state: "LA",
    npi: "1234567890",
    taxId: "12-3456789",
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
    practices: 4,
    providers: 10,
    payers: 7,
    percentComplete: 95,
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
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [groups, setGroups] = useState(DUMMY_GROUPS);

  const [newGroup, setNewGroup] = useState({
    legalName: "",
    stateOfIncorporation: "",
    groupNPI: "",
    taxId: "",
    primaryContactName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
  });

  const calculateCompletion = (fields: any[]): number => {
    const filled = fields.filter((f) => f && f.trim() !== "").length;
    const total = fields.length;
    return Math.round((filled / total) * 100 / 5) * 5; // Round to nearest 5%
  };

  const handleAddGroup = () => {
    if (!newGroup.legalName || !newGroup.stateOfIncorporation) {
      showToast("Please fill in required fields", "error");
      return;
    }

    const completion = calculateCompletion([
      newGroup.legalName,
      newGroup.stateOfIncorporation,
      newGroup.groupNPI,
      newGroup.taxId,
      newGroup.primaryContactName,
      newGroup.primaryContactEmail,
      newGroup.primaryContactPhone,
    ]);

    const newGroupObj: Group = {
      id: groups.length + 1,
      name: newGroup.legalName,
      state: newGroup.stateOfIncorporation,
      npi: newGroup.groupNPI,
      taxId: newGroup.taxId,
      practices: 0,
      providers: 0,
      payers: 0,
      percentComplete: completion,
    };

    setGroups([...groups, newGroupObj]);
    showToast(`${newGroup.legalName} has been added`, "success");
    setShowAddGroupModal(false);
    setNewGroup({
      legalName: "",
      stateOfIncorporation: "",
      groupNPI: "",
      taxId: "",
      primaryContactName: "",
      primaryContactEmail: "",
      primaryContactPhone: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Groups</h1>
        <p className="text-gray-600">Manage healthcare group organizations and their associated practices</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowAddGroupModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Group
          </button>
        </div>

        {/* Groups Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  NPI Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Tax ID Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Providers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Practices
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Payers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups.map((group) => (
                <tr
                  key={group.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/groups/${group.id}`)}
                      className="text-sm font-medium text-[#2196F3] hover:underline"
                    >
                      {group.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{group.state}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{group.npi}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{group.taxId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{group.providers}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{group.practices}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{group.payers}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/groups/${group.id}`)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {groups.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No groups found. Create your first group to get started.</p>
          </div>
        )}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group / Organization Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newGroup.legalName}
              onChange={(e) => setNewGroup({ ...newGroup, legalName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter legal name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State of Incorporation <span className="text-red-500">*</span>
            </label>
            <select
              value={newGroup.stateOfIncorporation}
              onChange={(e) => setNewGroup({ ...newGroup, stateOfIncorporation: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select state...</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group NPI Number
              <span className="text-xs text-gray-500 ml-2">Type-2 (organizational) NPI</span>
            </label>
            <input
              type="text"
              value={newGroup.groupNPI}
              onChange={(e) => setNewGroup({ ...newGroup, groupNPI: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter NPI"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax ID / EIN
              <span className="text-xs text-gray-500 ml-2">XX-XXXXXXX</span>
            </label>
            <input
              type="text"
              value={newGroup.taxId}
              onChange={(e) => setNewGroup({ ...newGroup, taxId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="XX-XXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Contact Name
            </label>
            <input
              type="text"
              value={newGroup.primaryContactName}
              onChange={(e) => setNewGroup({ ...newGroup, primaryContactName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter contact name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Contact Email
            </label>
            <input
              type="email"
              value={newGroup.primaryContactEmail}
              onChange={(e) => setNewGroup({ ...newGroup, primaryContactEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Contact Phone
            </label>
            <input
              type="tel"
              value={newGroup.primaryContactPhone}
              onChange={(e) => setNewGroup({ ...newGroup, primaryContactPhone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter phone"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowAddGroupModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGroup}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Add Group
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Groups;
