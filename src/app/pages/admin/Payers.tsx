import { useState } from "react";
import { Plus, Search, Download, Edit2 } from "lucide-react";
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
    { key: "enrollments" as const, label: "Enrollment Requests" },
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
    showToast("Enrollment request submitted successfully", "success");
    setShowRequestModal(false);
    setActiveTab("enrollments");
  };

  const handleTerminate = (data: { terminationDate: string; reason: string; notes: string }) => {
    terminateEnrollment(terminateModalData.enrollmentId);
    showToast("Enrollment terminated", "info");
    setTerminateModalData({ isOpen: false, enrollmentId: "", providerName: "", payerName: "" });
  };

  const handleAddPayer = () => {
    if (!newPayer.name || !newPayer.type) {
      showToast("Please fill in payer name and type", "error");
      return;
    }

    showToast(`Payer "${newPayer.name}" requested successfully`, "success");
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Enrollments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage payer enrollments and relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Request Enrollment
          </button>
          <button
            onClick={() => setShowAddPayerModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Request New Payer
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm font-semibold transition-all relative ${
              activeTab === tab.key ? "text-[#2563EB]" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Main Card with Filter Bar and Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-5">
        {/* TAB 1: PAYER LIST */}
        {activeTab === "list" && (
          <div className="space-y-5">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[240px] max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search payers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <select
                value={payerTypeFilter}
                onChange={(e) => setPayerTypeFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="All">All Payers</option>
                <option value="Commercial">Commercial</option>
                <option value="Government">Government</option>
                <option value="Managed Care">Managed Care</option>
              </select>
            </div>

            {/* Payers Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0B2545] text-white">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      PAYER NAME
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      TYPE
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      STATES COVERED
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
                  {filteredPayers.length > 0 ? (
                    filteredPayers.map((payer) => (
                      <tr key={payer.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-5 py-4 font-medium text-gray-900 text-sm">
                          {payer.name}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                            {payer.type}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-600">
                          {payer.states || "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 uppercase tracking-wider">
                            {payer.status === "Inactive" ? "INACTIVE" : payer.status === "Enrolled" ? "ACTIVE" : "IN PROGRESS"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => showToast(`Edit ${payer.name} details`, "info")}
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Payer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-20 text-center text-sm text-gray-400">
                        No payers found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ENROLLMENT REQUESTS */}
        {activeTab === "enrollments" && (
          <div className="space-y-5">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px] max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by provider or payer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <button
                onClick={() => showToast("Exporting enrollments CSV...", "info")}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Enrollments Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0B2545] text-white">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      PROVIDER NAME
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      SPECIALTY
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      PAYER
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      NETWORK TYPE
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      PRACTICE LOCATION
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                      DATE
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredEnrollments.length > 0 ? (
                    filteredEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                          {enrollment.providerName}
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-700">{enrollment.specialty}</td>
                        <td className="px-5 py-4 text-sm text-gray-900 font-medium">{enrollment.payerName}</td>
                        <td className="px-5 py-4">
                          {enrollment.networkType !== "-" ? (
                            <PayerBadge type={enrollment.networkType} />
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-700">{enrollment.practiceLocation}</td>
                        <td className="px-5 py-4 text-sm text-gray-700">{enrollment.date}</td>
                        <td className="px-5 py-4">
                          <EnrollmentStatusBadge status={enrollment.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-20 text-center text-sm text-gray-400">
                        No enrollment records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-gray-500 font-medium pt-1">
              Showing 1–{filteredEnrollments.length} of {filteredEnrollments.length} enrollments
            </div>
          </div>
        )}
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
        onClose={() => setShowAddPayerModal(false)}
        title="Request New Payer"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPayer.name}
              onChange={(e) => setNewPayer({ ...newPayer, name: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="e.g., Aetna Better Health"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payer Type <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.type}
              onChange={(e) => setNewPayer({ ...newPayer, type: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
            >
              <option value="">Select type</option>
              <option value="Commercial">Commercial</option>
              <option value="Government">Government</option>
              <option value="Managed Care">Managed Care</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">States Covered</label>
            <input
              type="text"
              value={newPayer.states}
              onChange={(e) => setNewPayer({ ...newPayer, states: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="e.g., NY, NJ, CT or All States"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddPayerModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPayer}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              Submit Request
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Payers;
