import { useState } from "react";
import { Search, Plus, Edit, Power, Mail, ChevronDown, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { ConfirmationDialog } from "../../components/shared/ConfirmationDialog";
import { useToast } from "../../components/shared/Toast";
import { usePayers } from "../../contexts/PayersContext";
import { RequestEnrollmentModal } from "../../components/payers/RequestEnrollmentModal";

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
}

const DUMMY_PROVIDERS: Provider[] = [
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
  },
  {
    id: 7,
    name: "Dr. Patricia Martinez",
    specialty: "Psychology",
    credentialingStatus: "Re-credential",
    healthStatus: "Ok",
    email: "patricia.m@example.com",
    phone: "555-0107",
    npi: "7890123456",
    primaryState: "AZ",
  },
  {
    id: 8,
    name: "Dr. David Brown",
    specialty: "Therapy",
    credentialingStatus: "Done",
    healthStatus: "Ok",
    email: "david.b@example.com",
    phone: "555-0108",
    npi: "8901234567",
    primaryState: "CO",
  },
];

export function Providers() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { payers, providers: payerProviders, addEnrollmentRequests } = usePayers();
  const [searchTerm, setSearchTerm] = useState("");
  const [credentialingStatusFilter, setCredentialingStatusFilter] = useState("all");
  const [healthStatusFilter, setHealthStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState<Set<number>>(new Set());
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
  const [emailRecipients, setEmailRecipients] = useState<string[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [showRequestEnrollmentModal, setShowRequestEnrollmentModal] = useState(false);
  const [showRequestCredentialingModal, setShowRequestCredentialingModal] = useState(false);
  const [selectedProviderForRequest, setSelectedProviderForRequest] = useState<Provider | null>(null);
  
  const [newProvider, setNewProvider] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sendInvite: true,
  });

  const [editProvider, setEditProvider] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialty: "",
    npi: "",
    primaryState: "",
  });

  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [credentialingRequest, setCredentialingRequest] = useState({
    providerId: "",
    requestType: "",
    assignTo: "",
    assignedPerson: "",
    targetDate: "",
    notes: "",
  });

  const filteredProviders = DUMMY_PROVIDERS.filter((provider) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchLower) ||
      provider.email.toLowerCase().includes(searchLower) ||
      provider.phone.includes(searchTerm);
    
    const matchesCredentialingStatus =
      credentialingStatusFilter === "all" || provider.credentialingStatus === credentialingStatusFilter;
    
    const matchesHealthStatus =
      healthStatusFilter === "all" || provider.healthStatus === healthStatusFilter;
    
    return matchesSearch && matchesCredentialingStatus && matchesHealthStatus;
  });

  const toggleProvider = (id: number) => {
    const newSelected = new Set(selectedProviders);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProviders(newSelected);
  };

  const toggleAll = () => {
    if (selectedProviders.size === filteredProviders.length) {
      setSelectedProviders(new Set());
    } else {
      setSelectedProviders(new Set(filteredProviders.map((p) => p.id)));
    }
  };

  const handleAddProvider = () => {
    console.log("Adding provider:", newProvider);
    showToast(`Provider ${newProvider.firstName} ${newProvider.lastName} added successfully`, "success");
    setShowAddModal(false);
    setNewProvider({ firstName: "", lastName: "", email: "", sendInvite: true });
  };

  const handleEditClick = (provider: Provider) => {
    setCurrentProvider(provider);
    const [firstName, ...lastNameParts] = provider.name.replace("Dr. ", "").split(" ");
    setEditProvider({
      firstName,
      lastName: lastNameParts.join(" "),
      email: provider.email,
      specialty: provider.specialty,
      npi: provider.npi || "",
      primaryState: provider.primaryState || "",
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    showToast(`Provider ${editProvider.firstName} ${editProvider.lastName} updated successfully`, "success");
    setShowEditModal(false);
  };

  const handleEmailClick = (provider: Provider) => {
    setCurrentProvider(provider);
    setEmailRecipients([provider.email]);
    setEmailData({
      to: provider.email,
      subject: "",
      message: "",
    });
    setShowEmailModal(true);
  };

  const handleBulkEmail = () => {
    const recipients = DUMMY_PROVIDERS.filter((p) => selectedProviders.has(p.id)).map((p) => p.email);
    setEmailRecipients(recipients);
    setEmailData({
      to: recipients.join(", "),
      subject: "",
      message: "",
    });
    setShowEmailModal(true);
  };

  const handleSendEmail = () => {
    showToast(`Email sent to ${emailRecipients.length} recipient(s)`, "success");
    setShowEmailModal(false);
    setEmailData({ to: "", subject: "", message: "" });
  };

  const handleDeactivateClick = (provider: Provider) => {
    setCurrentProvider(provider);
    setShowDeactivateDialog(true);
  };

  const handleDeactivate = () => {
    if (currentProvider) {
      showToast(`${currentProvider.name} has been deactivated`, "success");
    }
    setShowDeactivateDialog(false);
  };

  const handleBulkDeactivate = () => {
    showToast(`${selectedProviders.size} provider(s) deactivated successfully`, "success");
    setSelectedProviders(new Set());
  };

  const handleExportSelected = () => {
    showToast(`Exporting ${selectedProviders.size} provider(s) to CSV`, "success");
  };

  const handleRequestEnrollment = (provider: Provider) => {
    setSelectedProviderForRequest(provider);
    setShowRequestEnrollmentModal(true);
    setOpenDropdownId(null);
  };

  const handleRequestCredentialing = (provider: Provider) => {
    setSelectedProviderForRequest(provider);
    setCredentialingRequest({
      providerId: provider.id.toString(),
      requestType: "",
      assignTo: "",
      assignedPerson: "",
      targetDate: "",
      notes: "",
    });
    setShowRequestCredentialingModal(true);
    setOpenDropdownId(null);
  };

  const handleEnrollmentSubmit = (data: any) => {
    const requests = data.selectedPayers.map((payerId: string) => {
      const payer = payers.find((p) => p.id === payerId);
      return {
        providerId: data.selectedProvider,
        providerName: selectedProviderForRequest?.name || "",
        specialty: selectedProviderForRequest?.specialty || "",
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
    setShowRequestEnrollmentModal(false);
    showToast("Enrollment request submitted successfully", "success");
  };

  const handleCredentialingSubmit = () => {
    if (!credentialingRequest.providerId) {
      showToast("Please fill in required fields", "error");
      return;
    }

    showToast(`Credentialing request added for ${selectedProviderForRequest?.name}`, "success");
    setShowRequestCredentialingModal(false);
    setCredentialingRequest({
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Providers</h1>
        <p className="text-gray-600">Manage all providers and their credentialing status</p>
      </div>

      {/* Top Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>

          {/* Credentialing Status Filter */}
          <div className="relative">
            <select
              value={credentialingStatusFilter}
              onChange={(e) => setCredentialingStatusFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none bg-white cursor-pointer"
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
              className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none bg-white cursor-pointer"
            >
              <option value="all">Health Status</option>
              <option value="Ok">Ok</option>
              <option value="Expirations">Expirations</option>
              <option value="Issues">Issues</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {(credentialingStatusFilter !== "all" || healthStatusFilter !== "all") && (
            <button
              onClick={() => {
                setCredentialingStatusFilter("all");
                setHealthStatusFilter("all");
              }}
              className="text-sm text-[#2196F3] hover:underline whitespace-nowrap"
            >
              Clear filters
            </button>
          )}

          {/* Spacer to push button to the right */}
          <div className="flex-1" />

          {/* Add Provider Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Provider
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedProviders.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {selectedProviders.size} provider(s) selected
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBulkEmail}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                Send Email
              </button>
              <button
                onClick={handleExportSelected}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                Export Selected (CSV)
              </button>
              <button
                onClick={() => {
                  if (confirm(`Deactivate ${selectedProviders.size} provider(s)?`)) {
                    handleBulkDeactivate();
                  }
                }}
                className="px-4 py-2 bg-white border border-red-300 text-red-700 rounded-md text-sm hover:bg-red-50 transition-colors"
              >
                Deactivate Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Providers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProviders.size === filteredProviders.length && filteredProviders.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Provider Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Credentialing Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Health Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProviders.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProviders.has(provider.id)}
                      onChange={() => toggleProvider(provider.id)}
                      className="w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/providers/${provider.id}`)}
                      className="text-sm font-medium text-[#2196F3] hover:underline text-left"
                    >
                      {provider.name}
                    </button>
                    <div className="text-xs text-gray-500">{provider.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{provider.specialty}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={provider.credentialingStatus} variant="credentialing" />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={provider.healthStatus} variant="health" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === provider.id ? null : provider.id);
                          }}
                          className="p-2 text-[#2196F3] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Add"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        {openDropdownId === provider.id && (
                          <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProviders.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No providers found.</p>
          </div>
        )}
      </div>

      {/* Add Provider Modal */}
      <ModalWrapper
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Provider"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={newProvider.firstName}
              onChange={(e) => setNewProvider({ ...newProvider, firstName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={newProvider.lastName}
              onChange={(e) => setNewProvider({ ...newProvider, lastName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={newProvider.email}
              onChange={(e) => setNewProvider({ ...newProvider, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter email"
            />
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <input
              type="checkbox"
              id="sendInvite"
              checked={newProvider.sendInvite}
              onChange={(e) => setNewProvider({ ...newProvider, sendInvite: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
            />
            <label htmlFor="sendInvite" className="text-sm text-gray-700">
              <span className="font-medium">Send Invite</span> — Sends an invite giving providers access to update/edit the MantraComply profile
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProvider}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Edit Provider Modal */}
      <ModalWrapper
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Provider"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={editProvider.firstName}
              onChange={(e) => setEditProvider({ ...editProvider, firstName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={editProvider.lastName}
              onChange={(e) => setEditProvider({ ...editProvider, lastName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={editProvider.email}
              onChange={(e) => setEditProvider({ ...editProvider, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
            <input
              type="text"
              value={editProvider.specialty}
              onChange={(e) => setEditProvider({ ...editProvider, specialty: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">NPI</label>
            <input
              type="text"
              value={editProvider.npi}
              onChange={(e) => setEditProvider({ ...editProvider, npi: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary State</label>
            <input
              type="text"
              value={editProvider.primaryState}
              onChange={(e) => setEditProvider({ ...editProvider, primaryState: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Send Email Modal */}
      <ModalWrapper
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title="Send Email"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              value={emailData.to}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={emailData.message}
              onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              rows={5}
              placeholder="Enter message"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowEmailModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendEmail}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Deactivate Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeactivateDialog}
        onClose={() => setShowDeactivateDialog(false)}
        onConfirm={handleDeactivate}
        title="Deactivate Provider"
        message={`Deactivate ${currentProvider?.name}? They will lose access to their portal.`}
        confirmText="Confirm"
        confirmColor="red"
      />

      {/* Request Enrollment Modal */}
      <RequestEnrollmentModal
        isOpen={showRequestEnrollmentModal}
        onClose={() => setShowRequestEnrollmentModal(false)}
        onSubmit={handleEnrollmentSubmit}
        providers={payerProviders}
        payers={payers}
        preSelectedProvider={selectedProviderForRequest?.id.toString()}
      />

      {/* Request Credentialing Modal */}
      <ModalWrapper
        isOpen={showRequestCredentialingModal}
        onClose={() => setShowRequestCredentialingModal(false)}
        title="Add Credentialing Request"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Provider <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={selectedProviderForRequest?.name || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
            <select
              value={credentialingRequest.requestType}
              onChange={(e) => setCredentialingRequest({ ...credentialingRequest, requestType: e.target.value })}
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
              value={credentialingRequest.assignTo}
              onChange={(e) => setCredentialingRequest({ ...credentialingRequest, assignTo: e.target.value, assignedPerson: "" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Unassigned</option>
              <option value="Admin User">Admin User</option>
              <option value="Yourself">Yourself</option>
            </select>
          </div>

          {credentialingRequest.assignTo === "Yourself" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Person <span className="text-red-500">*</span>
              </label>
              <select
                value={credentialingRequest.assignedPerson}
                onChange={(e) => setCredentialingRequest({ ...credentialingRequest, assignedPerson: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              >
                <option value="">Select a person...</option>
                {DUMMY_PROVIDERS.map((provider) => (
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
              type="text"
              value={credentialingRequest.targetDate}
              onChange={(e) => setCredentialingRequest({ ...credentialingRequest, targetDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={credentialingRequest.notes}
              onChange={(e) => setCredentialingRequest({ ...credentialingRequest, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              rows={3}
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowRequestCredentialingModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCredentialingSubmit}
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

export default Providers;