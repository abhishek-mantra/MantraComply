import { useState } from "react";
import { Plus } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";

interface CredentialingItem {
  id: number;
  providerName: string;
  caqh: string;
  specialty: string;
  payer: string;
  state: string;
  status: string;
  allCount: number;
  needsQC: boolean;
}

const DUMMY_CREDENTIALING: CredentialingItem[] = [
  {
    id: 1,
    providerName: "Dr. Sarah Johnson",
    caqh: "123456",
    specialty: "Psychiatry",
    payer: "Blue Cross",
    state: "NY",
    status: "In Progress",
    allCount: 12,
    needsQC: true,
  },
  {
    id: 2,
    providerName: "Dr. Michael Chen",
    caqh: "234567",
    specialty: "Psychology",
    payer: "Aetna",
    state: "CA",
    status: "In Progress",
    allCount: 8,
    needsQC: false,
  },
  {
    id: 3,
    providerName: "Dr. Emily Rodriguez",
    caqh: "345678",
    specialty: "Therapy",
    payer: "Humana",
    state: "TX",
    status: "Ready",
    allCount: 15,
    needsQC: false,
  },
  {
    id: 4,
    providerName: "Dr. Robert Taylor",
    caqh: "456789",
    specialty: "Psychiatry",
    payer: "United Healthcare",
    state: "FL",
    status: "Complete",
    allCount: 12,
    needsQC: false,
  },
  {
    id: 5,
    providerName: "Dr. Lisa Anderson",
    caqh: "567890",
    specialty: "Physiotherapy",
    payer: "Cigna",
    state: "WA",
    status: "Not Credential",
    allCount: 0,
    needsQC: false,
  },
];

const PROVIDERS = [
  { id: "1", name: "Dr. Sarah Johnson" },
  { id: "2", name: "Dr. Michael Chen" },
  { id: "3", name: "Dr. Emily Rodriguez" },
  { id: "4", name: "Dr. James Williams" },
  { id: "5", name: "Dr. Lisa Anderson" },
  { id: "6", name: "Dr. Robert Taylor" },
];

export function Credentialing() {
  const { showToast } = useToast();
  const [items, setItems] = useState(DUMMY_CREDENTIALING);
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [requestTypeFilter, setRequestTypeFilter] = useState("All Request Types");
  const [assigneeFilter, setAssigneeFilter] = useState("All Assignees");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newRequest, setNewRequest] = useState({
    providerId: "",
    requestType: "",
    assignTo: "",
    assignedPerson: "",
    targetDate: "",
    notes: "",
  });

  const filteredItems = items.filter((item) => {
    const matchesStatus = statusFilter === "All Statuses" || item.status === statusFilter;
    return matchesStatus;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
    showToast("Credentialing status updated", "success");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Ready":
        return "bg-blue-100 text-blue-800";
      case "Complete":
        return "bg-green-100 text-green-800";
      case "Not Credential":
        return "bg-gray-100 text-gray-800";
      case "Denied":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddCredentialingRequest = () => {
    if (!newRequest.providerId) {
      showToast("Please fill in required fields", "error");
      return;
    }

    const provider = PROVIDERS.find((p) => p.id === newRequest.providerId);
    showToast(`Credentialing request added for ${provider?.name}`, "success");
    setShowAddModal(false);
    setNewRequest({
      providerId: "",
      requestType: "",
      assignTo: "",
      assignedPerson: "",
      targetDate: "",
      notes: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Credentialing</h1>
        <p className="text-gray-600">Manage credentialing requests and track progress</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option>All Statuses</option>
              <option>In Progress</option>
              <option>Ready</option>
              <option>Complete</option>
              <option>Not Credential</option>
            </select>
            <select
              value={requestTypeFilter}
              onChange={(e) => setRequestTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option>All Request Types</option>
              <option>Initial Credentialing</option>
              <option>Re-credentialing</option>
              <option>CAQH Update</option>
              <option>Provider Update</option>
            </select>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option>All Assignees</option>
              <option>Admin User</option>
              <option>Unassigned</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#2196F3] text-[#2196F3] rounded-md text-sm font-medium hover:bg-[#E3F2FD] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Credentialing Request
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Provider
                </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Payer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    All
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Needs QC
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.providerName}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                          CAQH: {item.caqh}
                        </span>
                        <span className="text-xs text-gray-500">{item.specialty}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.payer}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.state}</td>
                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(item.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(
                          item.status
                        )}`}
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Ready">Ready</option>
                        <option value="Complete">Complete</option>
                        <option value="Not Credential">Not Credential</option>
                        <option value="Denied">Denied</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.allCount}</td>
                    <td className="px-6 py-4">
                      {item.needsQC ? (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-medium">
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>

      {/* Add Credentialing Request Modal */}
      <ModalWrapper
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Credentialing Request"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Provider <span className="text-red-500">*</span>
            </label>
            <select
              value={newRequest.providerId}
              onChange={(e) => setNewRequest({ ...newRequest, providerId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select a provider...</option>
              {PROVIDERS.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
            <select
              value={newRequest.requestType}
              onChange={(e) => setNewRequest({ ...newRequest, requestType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select type...</option>
              <option>Initial Credentialing</option>
              <option>Re-credentialing</option>
              <option>CAQH Update</option>
              <option>Provider Update</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
            <select
              value={newRequest.assignTo}
              onChange={(e) => setNewRequest({ ...newRequest, assignTo: e.target.value, assignedPerson: "" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Unassigned</option>
              <option value="Admin User">Admin User</option>
              <option value="Yourself">Yourself</option>
            </select>
          </div>

          {newRequest.assignTo === "Yourself" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Person <span className="text-red-500">*</span>
              </label>
              <select
                value={newRequest.assignedPerson}
                onChange={(e) => setNewRequest({ ...newRequest, assignedPerson: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              >
                <option value="">Select a person...</option>
                {PROVIDERS.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
            <input
              type="date"
              value={newRequest.targetDate}
              onChange={(e) => setNewRequest({ ...newRequest, targetDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={newRequest.notes}
              onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              rows={3}
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCredentialingRequest}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Add Request
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Credentialing;