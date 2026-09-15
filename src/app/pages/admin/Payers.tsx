import { useState } from "react";
import { Plus, Search, Download } from "lucide-react";
import { usePayers } from "../../contexts/PayersContext";
import { PayerBadge } from "../../components/payers/PayerBadge";
import { EnrollmentStatusBadge } from "../../components/payers/EnrollmentStatusBadge";
import { RequestEnrollmentModal } from "../../components/payers/RequestEnrollmentModal";
import { TerminateModal } from "../../components/payers/TerminateModal";
import { EnrollmentTimeline } from "../../components/payers/EnrollmentTimeline";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";

export function Payers() {
  const {
    payers,
    providers,
    enrollmentRequests,
    existingEnrollments,
    addEnrollmentRequests,
    updateEnrollmentStatus,
    terminateEnrollment,
  } = usePayers();

  const [activeTab, setActiveTab] = useState<"list" | "enrollments">("list");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAddPayerModal, setShowAddPayerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [payerTypeFilter, setPayerTypeFilter] = useState("All");
  const [editingPayerStatusId, setEditingPayerStatusId] = useState<string | null>(null);
  const { showToast } = useToast();
  
  const [newPayer, setNewPayer] = useState({
    name: "",
    type: "",
    states: "",
    contractType: "",
    enrollmentType: "",
  });

  const [terminateModalData, setTerminateModalData] = useState<{
    isOpen: boolean;
    enrollmentId: string;
    providerName: string;
    payerName: string;
  }>({
    isOpen: false,
    enrollmentId: "",
    providerName: "",
    payerName: "",
  });

  const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const tabs = [
    { key: "list" as const, label: "Payer List" },
    { key: "enrollments" as const, label: "Enrollments" },
  ];

  const handleRequestEnrollment = (data: any) => {
    const requests = data.selectedPayers.map((payerId: string) => {
      const provider = providers.find((p) => p.id === data.selectedProvider);
      const payer = payers.find((p) => p.id === payerId);
      return {
        providerId: data.selectedProvider,
        providerName: provider?.name || "",
        specialty: provider?.specialty || "",
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
    setShowRequestModal(false);
    setActiveTab("enrollments");
  };

  const handleTerminate = (data: { terminationDate: string; reason: string; notes: string }) => {
    terminateEnrollment(terminateModalData.enrollmentId);
    setTerminateModalData({ isOpen: false, enrollmentId: "", providerName: "", payerName: "" });
  };

  const handleAddPayer = () => {
    if (!newPayer.name || !newPayer.type || !newPayer.states || !newPayer.contractType || !newPayer.enrollmentType) {
      showToast("Please fill in all fields", "error");
      return;
    }

    showToast(`Payer "${newPayer.name}" added successfully`, "success");
    setShowAddPayerModal(false);
    setNewPayer({
      name: "",
      type: "",
      states: "",
      contractType: "",
      enrollmentType: "",
    });
  };

  // Filter payers for Payer List tab
  const filteredPayers = payers.filter((payer) => {
    const matchesSearch = payer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = payerTypeFilter === "All" || payer.type === payerTypeFilter;
    return matchesSearch && matchesFilter;
  });

  // Combine enrollment requests and existing enrollments
  const allEnrollments = [
    ...enrollmentRequests.map((req) => {
      const provider = providers.find((p) => p.id === req.providerId);
      return {
        id: req.id,
        type: "request" as const,
        providerId: req.providerId,
        providerName: req.providerName,
        specialty: req.specialty,
        payerId: req.payerId,
        payerName: req.payerName,
        state: req.state,
        networkType: req.type,
        practiceLocation: provider?.currentPayers.length ? "Main Office" : "Pending",
        date: req.submittedDate,
        status: req.status,
        timeline: req.timeline,
        comments: req.comments,
        documents: req.documents,
      };
    }),
    ...existingEnrollments.map((enr) => {
      const provider = providers.find((p) => p.id === enr.providerId);
      return {
        id: enr.id,
        type: "existing" as const,
        providerId: enr.providerId,
        providerName: enr.providerName,
        specialty: provider?.specialty || "N/A",
        payerId: enr.payerId,
        payerName: enr.payerName,
        state: "-",
        networkType: enr.networkType,
        practiceLocation: enr.practiceLocation,
        date: enr.effectiveDate,
        status: enr.status,
        timeline: [],
        comments: [],
        documents: [],
      };
    }),
  ];

  // Filter combined enrollments
  const filteredEnrollments = allEnrollments.filter((enrollment) =>
    enrollment.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.payerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payers</h1>
          <p className="text-gray-600">Manage payer enrollments and relationships</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md hover:bg-[#1976D2] transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Request Enrollment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-b-2 border-[#2196F3] text-[#2196F3]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* TAB 1: PAYER LIST */}
          {activeTab === "list" && (
            <div className="space-y-4">
              {/* Top Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search payers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                  />
                </div>

                <button
                  onClick={() => setShowAddPayerModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md hover:bg-[#1976D2] transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Payer
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Payer Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        States Covered
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Contract Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Enrollment Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPayers.map((payer) => (
                      <tr key={payer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {payer.name}
                        </td>
                        <td className="px-6 py-4">
                          <PayerBadge type={payer.type} />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payer.states}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payer.contractType}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payer.enrollmentType}</td>
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={payer.status}
                            onChange={(e) => {
                              showToast(`Payer status updated to ${e.target.value}`, "success");
                            }}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border-0 cursor-pointer ${
                              payer.status === "Enrolled"
                                ? "bg-green-100 text-green-800"
                                : payer.status === "In-Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <option value="Inactive">Inactive</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="In-Progress">In-Progress</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ENROLLMENTS (Combined Requests and Existing) */}
          {activeTab === "enrollments" && (
            <div className="space-y-4">
              {/* Top Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by provider or payer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                  />
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Provider Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Specialty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Payer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Network Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Practice Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {enrollment.providerName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{enrollment.specialty}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{enrollment.payerName}</td>
                        <td className="px-6 py-4">
                          {enrollment.networkType !== "-" ? (
                            <PayerBadge type={enrollment.networkType} />
                          ) : (
                            <span className="text-sm text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{enrollment.practiceLocation}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{enrollment.date}</td>
                        <td className="px-6 py-4">
                          <EnrollmentStatusBadge status={enrollment.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-sm text-gray-600">
                1–{filteredEnrollments.length} of {filteredEnrollments.length} enrollments
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Request Enrollment Modal */}
      <RequestEnrollmentModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        providers={providers}
        payers={payers}
        onSubmit={handleRequestEnrollment}
      />

      {/* Terminate Modal */}
      <TerminateModal
        isOpen={terminateModalData.isOpen}
        onClose={() =>
          setTerminateModalData({ isOpen: false, enrollmentId: "", providerName: "", payerName: "" })
        }
        onConfirm={handleTerminate}
        providerName={terminateModalData.providerName}
        payerName={terminateModalData.payerName}
      />

      {/* Add Payer Modal */}
      <ModalWrapper
        isOpen={showAddPayerModal}
        onClose={() => {
          setShowAddPayerModal(false);
          setNewPayer({
            name: "",
            type: "",
            states: "",
            contractType: "",
            enrollmentType: "",
          });
        }}
        title="Add New Payer"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPayer.name}
              onChange={(e) => setNewPayer(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter payer name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.type}
              onChange={(e) => setNewPayer(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            >
              <option value="">Select type</option>
              <option value="Commercial">Commercial</option>
              <option value="Medicare">Medicare</option>
              <option value="Medicaid">Medicaid</option>
              <option value="Managed Care">Managed Care</option>
              <option value="Government">Government</option>
            </select>
          </div>

          {/* States Covered */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              States Covered <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.states}
              onChange={(e) => setNewPayer(prev => ({ ...prev, states: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            >
              <option value="">Select state</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Contract Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contract Type <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.contractType}
              onChange={(e) => setNewPayer(prev => ({ ...prev, contractType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            >
              <option value="">Select contract type</option>
              <option value="Participating">Participating</option>
              <option value="Non-Par">Non-Par</option>
              <option value="In-Network">In-Network</option>
              <option value="Out-of-Network">Out-of-Network</option>
            </select>
          </div>

          {/* Enrollment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enrollment Type <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.enrollmentType}
              onChange={(e) => setNewPayer(prev => ({ ...prev, enrollmentType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            >
              <option value="">Select enrollment type</option>
              <option value="Electronic">Electronic</option>
              <option value="Paper">Paper</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Portal">Portal</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setShowAddPayerModal(false);
                setNewPayer({
                  name: "",
                  type: "",
                  states: "",
                  contractType: "",
                  enrollmentType: "",
                });
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPayer}
              className="px-4 py-2 text-sm font-medium text-white bg-[#2196F3] rounded-md hover:bg-[#1976D2] transition-colors"
            >
              Add Payer
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Payers;