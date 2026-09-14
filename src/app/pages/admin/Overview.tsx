import { useState } from "react";
import { Users, Clock, CheckCircle, RefreshCw, Building2, FileText, Calendar, CreditCard } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useNavigate } from "react-router";
import { useToast } from "../../components/shared/Toast";

// Admin Overview Dashboard
const SUMMARY_CARDS = [
  { label: "Total Providers", value: "127", icon: Users, color: "bg-blue-500", route: "/admin/providers" },
  { label: "In Process", value: "23", icon: Clock, color: "bg-orange-500", route: "/admin/providers?status=in-process" },
  { label: "Completed", value: "89", icon: CheckCircle, color: "bg-green-500", route: "/admin/providers?status=done" },
  { label: "Re-Credential Due", value: "15", icon: RefreshCw, color: "bg-orange-500", route: "/admin/providers?status=re-credential" },
  { label: "Total Groups", value: "12", icon: Building2, color: "bg-purple-500", route: "/admin/groups" },
  { label: "Active Licenses", value: "342", icon: FileText, color: "bg-blue-500", route: "/admin/licenses?status=active" },
  { label: "Expiring Soon", value: "8", icon: Calendar, color: "bg-red-500", route: "/admin/licenses?expiring=soon" },
  { label: "Payer Enrollments", value: "456", icon: CreditCard, color: "bg-green-500", route: "/admin/payers?tab=enrollments" },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "License renewed", providerId: "1", provider: "Dr. Sarah Johnson", time: "2 hours ago", type: "success" },
  { id: 2, action: "Credentialing completed", providerId: "2", provider: "Dr. Michael Chen", time: "4 hours ago", type: "success" },
  { id: 3, action: "License expiring soon", providerId: "3", provider: "Dr. Emily Rodriguez", time: "5 hours ago", type: "warning" },
  { id: 4, action: "New provider added", providerId: "4", provider: "Dr. James Williams", time: "1 day ago", type: "info" },
  { id: 5, action: "Payer enrollment submitted", providerId: "5", provider: "Dr. Lisa Anderson", time: "1 day ago", type: "info" },
  { id: 6, action: "Document uploaded", providerId: "6", provider: "Dr. Robert Taylor", time: "2 days ago", type: "success" },
  { id: 7, action: "Re-credentialing required", providerId: "7", provider: "Dr. Patricia Martinez", time: "2 days ago", type: "warning" },
  { id: 8, action: "CAQH profile updated", providerId: "8", provider: "Dr. David Brown", time: "3 days ago", type: "success" },
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export function Overview() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRequestLicenseModal, setShowRequestLicenseModal] = useState(false);
  const [showPayerEnrollmentModal, setShowPayerEnrollmentModal] = useState(false);
  
  const [newProvider, setNewProvider] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialty: "",
    npi: "",
    sendInvite: true,
  });

  const [licenseRequest, setLicenseRequest] = useState({
    provider: "",
    licenseType: "",
    state: "",
    notes: "",
    notifyEmail: true,
  });

  const handleAddProvider = () => {
    if (!newProvider.firstName || !newProvider.lastName || !newProvider.email) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    
    console.log("Adding provider:", newProvider);
    showToast("Provider added successfully", "success");
    setShowAddModal(false);
    setNewProvider({ firstName: "", lastName: "", email: "", specialty: "", npi: "", sendInvite: true });
  };

  const handleRequestLicense = () => {
    if (!licenseRequest.provider || !licenseRequest.licenseType || !licenseRequest.state) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    
    const providerName = licenseRequest.provider;
    showToast(`License request sent to ${providerName}`, "success");
    setShowRequestLicenseModal(false);
    setLicenseRequest({ provider: "", licenseType: "", state: "", notes: "", notifyEmail: true });
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Overview</h1>
        <p className="text-gray-600">Welcome to your MantraComply dashboard</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {SUMMARY_CARDS.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(card.route)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{card.value}</span>
            </div>
            <div className="text-sm font-medium text-gray-600">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {RECENT_ACTIVITY.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getActivityColor(
                        activity.type
                      )}`}
                    >
                      {activity.action}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/providers/${activity.providerId}`)}
                    className="text-sm text-gray-900 hover:text-[#2196F3] transition-colors"
                  >
                    {activity.provider}
                  </button>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
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
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newProvider.firstName}
              onChange={(e) => setNewProvider({ ...newProvider, firstName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter first name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newProvider.lastName}
              onChange={(e) => setNewProvider({ ...newProvider, lastName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter last name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={newProvider.email}
              onChange={(e) => setNewProvider({ ...newProvider, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter email"
              required
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

      {/* Request License Modal */}
      <ModalWrapper
        isOpen={showRequestLicenseModal}
        onClose={() => setShowRequestLicenseModal(false)}
        title="Request License"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Provider <span className="text-red-500">*</span>
            </label>
            <select
              value={licenseRequest.provider}
              onChange={(e) => setLicenseRequest({ ...licenseRequest, provider: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              required
            >
              <option value="">Select a provider...</option>
              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen</option>
              <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
              <option value="Dr. James Williams">Dr. James Williams</option>
              <option value="Dr. Lisa Anderson">Dr. Lisa Anderson</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Type <span className="text-red-500">*</span>
            </label>
            <select
              value={licenseRequest.licenseType}
              onChange={(e) => setLicenseRequest({ ...licenseRequest, licenseType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              required
            >
              <option value="">Select license type...</option>
              <option value="State License">State License</option>
              <option value="DEA License">DEA License</option>
              <option value="CDS License">CDS License</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={licenseRequest.state}
              onChange={(e) => setLicenseRequest({ ...licenseRequest, state: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              required
            >
              <option value="">Select state...</option>
              {US_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes for provider
            </label>
            <textarea
              value={licenseRequest.notes}
              onChange={(e) => setLicenseRequest({ ...licenseRequest, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              rows={3}
              placeholder="Any specific instructions..."
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="notifyEmail"
              checked={licenseRequest.notifyEmail}
              onChange={(e) => setLicenseRequest({ ...licenseRequest, notifyEmail: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
            />
            <label htmlFor="notifyEmail" className="text-sm text-gray-700">
              Notify provider by email
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowRequestLicenseModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRequestLicense}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Send Request
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Request Payer Enrollment Modal - Placeholder */}
      <ModalWrapper
        isOpen={showPayerEnrollmentModal}
        onClose={() => setShowPayerEnrollmentModal(false)}
        title="Request Payer Enrollment"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            This will open the full payer enrollment request form. Navigate to Payers page for full functionality.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowPayerEnrollmentModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowPayerEnrollmentModal(false);
                navigate("/admin/payers?tab=enrollment-requests");
              }}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Go to Payers
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Overview;