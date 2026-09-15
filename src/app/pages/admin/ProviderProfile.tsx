import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Edit, Mail, Power, Eye } from "lucide-react";
import { Breadcrumb } from "../../components/shared/Breadcrumb";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { ConfirmationDialog } from "../../components/shared/ConfirmationDialog";
import { useToast } from "../../components/shared/Toast";
import { Plus, Trash2 } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";

// Mock provider data
const PROVIDER_DATA: any = {
  "1": {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    specialty: "Psychiatry",
    npi: "1234567890",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    dob: "01/15/1982",
    tin: "123-45-6789",
    caqhId: "12345678",
    primaryState: "NY",
    address: "123 Medical Dr, New York, NY 10001",
    credentialingStatus: "Done",
    healthStatus: "Ok",
    profileCompletion: 75,
    medicalSchool: "Columbia University College of Physicians",
    graduationYear: "2008",
    residency: "NYU Langone, 2008–2012",
    fellowship: "Mount Sinai, 2012–2014",
  },
  "2": {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    specialty: "Psychology",
    npi: "2345678901",
    email: "michael.c@example.com",
    phone: "(555) 234-5678",
    dob: "03/22/1985",
    tin: "234-56-7890",
    caqhId: "23456789",
    primaryState: "CA",
    address: "456 Health Ave, Los Angeles, CA 90001",
    credentialingStatus: "In process",
    healthStatus: "Expirations",
    profileCompletion: 60,
    medicalSchool: "Stanford University",
    graduationYear: "2011",
    residency: "UCLA Medical Center, 2011–2015",
    fellowship: "None",
  },
};

type TabType = "profile" | "overview" | "documents" | "payers" | "tasks" | "activity";

export function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const provider = PROVIDER_DATA[id as string];

  useEffect(() => {
    document.title = `${provider?.firstName} ${provider?.lastName} — MantraComply`;
  }, [provider]);

  useEffect(() => {
    if (provider && showEmailModal) {
      setEmailData({
        to: provider.email,
        subject: "",
        message: "",
      });
    }
  }, [provider, showEmailModal]);

  if (!provider) {
    return (
      <div className="max-w-7xl mx-auto">
        <Breadcrumb label="Providers" to="/admin/providers" />
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Provider Not Found</h2>
          <p className="text-gray-600">The provider you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const handleDeactivate = () => {
    showToast(`${provider.firstName} ${provider.lastName} has been deactivated`, "success");
    setShowDeactivateDialog(false);
  };

  const handleSendEmail = () => {
    if (!emailData.subject || !emailData.message) {
      showToast("Please fill in subject and message", "error");
      return;
    }

    showToast(`Email sent to ${provider.firstName} ${provider.lastName}`, "success");
    setShowEmailModal(false);
    setEmailData({ to: "", subject: "", message: "" });
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "profile", label: "Profile" },
    { id: "documents", label: "Documents" },
    { id: "payers", label: "Payers" },
    { id: "tasks", label: "Tasks" },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumb label="Providers" to="/admin/providers" />

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {getInitials(provider.firstName, provider.lastName)}
            </div>
            
            {/* Name and Details */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                {provider.firstName} {provider.lastName}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {provider.specialty}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>NPI: {provider.npi}</div>
                <div>{provider.email}</div>
              </div>
            </div>
          </div>

          {/* Status Badges and Actions */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEmailModal(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button
                onClick={() => setShowDeactivateDialog(true)}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm"
              >
                <Power className="w-4 h-4" />
                Deactivate
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-[#2196F3] text-[#2196F3]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === "profile" && <ProfileTab provider={provider} />}
        {activeTab === "overview" && <OverviewTab provider={provider} />}
        {activeTab === "documents" && <DocumentsTab provider={provider} />}
        {activeTab === "payers" && <PayersTab provider={provider} />}
        {activeTab === "tasks" && <TasksTab provider={provider} />}
        {activeTab === "activity" && <ActivityTab provider={provider} />}
      </div>

      {/* Deactivate Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeactivateDialog}
        onClose={() => setShowDeactivateDialog(false)}
        onConfirm={handleDeactivate}
        title="Deactivate Provider"
        message={`Deactivate ${provider.firstName} ${provider.lastName}? They will lose access to their portal.`}
        confirmText="Deactivate"
        confirmColor="red"
      />

      {/* Email Modal */}
      <ModalWrapper
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title="Send Email"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={emailData.to}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={emailData.message}
              onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none h-32"
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
              Send Email
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

// Profile Tab Component
function ProfileTab({ provider }: { provider: any }) {
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState("basic-info");
  const [formData, setFormData] = useState({
    firstName: provider.firstName || "Sam",
    lastName: provider.lastName || "Smith",
    middleName: "",
    suffix: "",
    preferredName: "",
    usedDifferentName: "no",
    dob: provider.dob || "10/22/1978",
    ssn: "•••-••-••••",
    email: provider.email || "samantha.bouchart-ten@crestallion.co",
    publicEmail: "",
  });

  const handleSaveChanges = () => {
    showToast("Changes saved successfully", "success");
  };

  const sections = [
    { id: "basic-info", label: "Basic Info", completed: true },
    { id: "professional-history", label: "Professional History", completed: true },
    { id: "existing-licenses", label: "Existing Licenses", completed: true },
    { id: "certifications", label: "Certifications", completed: true },
    { id: "existing-payers", label: "Existing Payers", completed: false },
    { id: "ce-credits", label: "CE Credits", completed: false },
    { id: "external-accounts", label: "External Accounts", completed: false },
    { id: "credentialing-contacts", label: "Credentialing Contacts", completed: false },
    { id: "malpractice-insurance", label: "Malpractice Insurance", completed: false },
    { id: "documents", label: "Documents", completed: false },
    { id: "disclosure-questions", label: "Disclosure Questions", completed: false },
    { id: "agreements", label: "Agreements", completed: false },
  ];

  const completedSections = sections.filter((s) => s.completed).length;
  const progressPercentage = Math.round((completedSections / sections.length) * 100);

  return (
    <div className="flex gap-6">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0">
        {/* Progress */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">PROGRESS</div>
          <div className="text-2xl font-semibold text-gray-900">{completedSections}/{sections.length}</div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                activeSection === section.id
                  ? "bg-blue-50 text-[#2196F3]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  section.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {section.completed && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-left">{section.label}</span>
            </button>
          ))}
        </nav>

        {/* Progress Bar at Bottom */}
        <div className="mt-6 relative">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all rounded-full relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {activeSection === "basic-info" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Basic Info</h2>
                <span className="text-sm text-gray-500">Updated on Oct 30, 2025</span>
              </div>

              <div className="space-y-6">
                {/* Personal Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        Middle Name <span className="text-gray-400">- optional</span>
                      </label>
                      <input
                        type="text"
                        value={formData.middleName}
                        onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        Suffix <span className="text-gray-400">- optional</span>
                      </label>
                      <input
                        type="text"
                        value={formData.suffix}
                        onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-2">
                      Preferred Name <span className="text-gray-400">- optional</span>
                    </label>
                    <input
                      type="text"
                      value={formData.preferredName}
                      onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you ever used a different name? <span className="text-gray-400">- optional</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usedDifferentName"
                          value="yes"
                          checked={formData.usedDifferentName === "yes"}
                          onChange={(e) => setFormData({ ...formData, usedDifferentName: e.target.value })}
                          className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                        />
                        <span className="text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="usedDifferentName"
                          value="no"
                          checked={formData.usedDifferentName === "no"}
                          onChange={(e) => setFormData({ ...formData, usedDifferentName: e.target.value })}
                          className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    {formData.usedDifferentName === "yes" && (
                      <button className="mt-3 text-sm text-[#2196F3] hover:underline">
                        Add additional name
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Social Security Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.ssn}
                          onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        Public Email <span className="text-gray-400">- optional</span>
                      </label>
                      <input
                        type="email"
                        value={formData.publicEmail}
                        onChange={(e) => setFormData({ ...formData, publicEmail: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Changes Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSaveChanges}
                    className="px-6 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSection !== "basic-info" && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {sections.find((s) => s.id === activeSection)?.label}
              </h3>
              <p className="text-gray-500">Content for this section coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ provider }: { provider: any }) {
  const completionItems = [
    { label: "Personal Info", completed: true },
    { label: "State License on file", completed: true },
    { label: "DEA License", completed: true },
    { label: "Malpractice Insurance", completed: false },
    { label: "CAQH ID linked", completed: true },
    { label: "Work History", completed: false },
    { label: "Board Certification", completed: false },
  ];

  const completedCount = completionItems.filter((item) => item.completed).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Date of Birth:</dt>
              <dd className="text-sm text-gray-900 font-medium">{provider.dob}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">NPI Number:</dt>
              <dd className="text-sm text-gray-900 font-medium">{provider.npi}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Tax ID (TIN):</dt>
              <dd className="text-sm text-gray-900 font-medium">{provider.tin}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">CAQH ID:</dt>
              <dd className="text-sm text-gray-900 font-medium">{provider.caqhId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Primary State:</dt>
              <dd className="text-sm text-gray-900 font-medium">{provider.primaryState}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Phone:</dt>
              <dd className="text-sm text-gray-900 font-medium">{provider.phone}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Address:</dt>
              <dd className="text-sm text-gray-900 font-medium text-right">{provider.address}</dd>
            </div>
          </dl>
        </div>

        {/* Profile Completion */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{provider.profileCompletion}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${provider.profileCompletion}%` }}
              />
            </div>
          </div>
          <ul className="space-y-2">
            {completionItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className={`${item.completed ? "text-green-600" : "text-gray-400"}`}>
                  {item.completed ? "✅" : "⬜"}
                </span>
                <span className="text-gray-700">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Education & Training */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Education & Training</h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-gray-600 mb-1">Medical School:</dt>
              <dd className="text-sm text-gray-900">{provider.medicalSchool}, Graduated {provider.graduationYear}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600 mb-1">Residency:</dt>
              <dd className="text-sm text-gray-900">{provider.residency}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600 mb-1">Fellowship:</dt>
              <dd className="text-sm text-gray-900">{provider.fellowship}</dd>
            </div>
          </dl>
        </div>

        {/* Board Certifications */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Board Certifications</h3>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">American Board of Psychiatry and Neurology</p>
                <p className="text-xs text-gray-600 mt-1">Certified 2014 — Expires 2024</p>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Malpractice Insurance */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Malpractice Insurance</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Insurance Provider:</dt>
              <dd className="text-sm text-gray-900 font-medium">State Farm</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Policy Number:</dt>
              <dd className="text-sm text-gray-900 font-medium">SF-123456</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Coverage Amount:</dt>
              <dd className="text-sm text-gray-900 font-medium">$1,000,000</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Expiry Date:</dt>
              <dd className="text-sm text-gray-900 font-medium">12/31/2025</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

// Documents Tab Component (merged documents and licenses)
function DocumentsTab({ provider }: { provider: any }) {
  const { showToast } = useToast();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Medical License - NY",
      type: "License",
      category: "State License",
      uploadDate: "2024-01-15",
      expiryDate: "2026-12-31",
      status: "Active",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      name: "DEA Certificate",
      type: "License",
      category: "DEA License",
      uploadDate: "2024-02-20",
      expiryDate: "2027-03-15",
      status: "Active",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      name: "Board Certification",
      type: "Certificate",
      category: "Board Certification",
      uploadDate: "2024-01-10",
      expiryDate: "2026-01-10",
      status: "Expiring Soon",
      fileSize: "3.2 MB",
    },
    {
      id: 4,
      name: "Malpractice Insurance",
      type: "Insurance",
      category: "Insurance",
      uploadDate: "2023-12-05",
      expiryDate: "2025-12-31",
      status: "Active",
      fileSize: "1.5 MB",
    },
    {
      id: 5,
      name: "Medical License - CA",
      type: "License",
      category: "State License",
      uploadDate: "2023-11-20",
      expiryDate: "2025-11-20",
      status: "Active",
      fileSize: "2.1 MB",
    },
    {
      id: 6,
      name: "CV / Resume",
      type: "Document",
      category: "Professional Document",
      uploadDate: "2024-03-01",
      expiryDate: "N/A",
      status: "Current",
      fileSize: "890 KB",
    },
    {
      id: 7,
      name: "Diploma - Medical School",
      type: "Certificate",
      category: "Education",
      uploadDate: "2024-01-05",
      expiryDate: "N/A",
      status: "Current",
      fileSize: "4.2 MB",
    },
  ]);

  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "",
    category: "",
    expiryDate: "",
  });

  const documentTypes = ["License", "Certificate", "Insurance", "Document", "Form"];
  const documentCategories = [
    "State License",
    "DEA License",
    "Board Certification",
    "Insurance",
    "Professional Document",
    "Education",
    "Malpractice Insurance",
    "Work History",
    "References",
  ];

  const handleUploadDocument = () => {
    if (!newDocument.name || !newDocument.type || !newDocument.category) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const newDoc = {
      id: documents.length + 1,
      name: newDocument.name,
      type: newDocument.type,
      category: newDocument.category,
      uploadDate: new Date().toISOString().split("T")[0],
      expiryDate: newDocument.expiryDate || "N/A",
      status: "Current",
      fileSize: "1.2 MB",
    };

    setDocuments([...documents, newDoc]);
    showToast(`${newDocument.name} has been uploaded successfully`, "success");
    setShowUploadModal(false);
    setNewDocument({ name: "", type: "", category: "", expiryDate: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Current":
        return "bg-green-100 text-green-800";
      case "Expiring Soon":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Documents & Licenses</h3>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                File Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{doc.type}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{doc.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{doc.uploadDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{doc.expiryDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{doc.fileSize}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showToast("View document functionality", "warning")}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showToast("Delete document functionality", "warning")}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {documents.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500">No documents uploaded for this provider.</p>
        </div>
      )}

      {/* Upload Document Modal */}
      <ModalWrapper
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Document"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newDocument.name}
              onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="e.g., Medical License - NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={newDocument.type}
              onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select type...</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={newDocument.category}
              onChange={(e) => setNewDocument({ ...newDocument, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select category...</option>
              {documentCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={newDocument.expiryDate}
              onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2196F3] transition-colors cursor-pointer">
              <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to browse or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB)</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadDocument}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Upload Document
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

function PayersTab({ provider }: { provider: any }) {
  const { showToast } = useToast();
  const [showAddPayerModal, setShowAddPayerModal] = useState(false);
  const [payers, setPayers] = useState([
    {
      id: 1,
      name: "Blue Cross Blue Shield of New York",
      type: "Commercial",
      enrollmentDate: "2023-06-15",
      status: "Active",
      effectiveDate: "2023-07-01",
    },
    {
      id: 2,
      name: "United Healthcare",
      type: "Commercial",
      enrollmentDate: "2023-07-20",
      status: "Active",
      effectiveDate: "2023-08-01",
    },
    {
      id: 3,
      name: "Aetna",
      type: "Commercial",
      enrollmentDate: "2023-08-10",
      status: "Active",
      effectiveDate: "2023-09-01",
    },
    {
      id: 4,
      name: "Medicare",
      type: "Government",
      enrollmentDate: "2023-05-01",
      status: "Active",
      effectiveDate: "2023-06-01",
    },
    {
      id: 5,
      name: "Medicaid - New York",
      type: "Government",
      enrollmentDate: "2023-05-15",
      status: "Active",
      effectiveDate: "2023-06-15",
    },
    {
      id: 6,
      name: "Cigna",
      type: "Commercial",
      enrollmentDate: "2024-01-10",
      status: "Pending",
      effectiveDate: "2024-02-01",
    },
    {
      id: 7,
      name: "Humana",
      type: "Commercial",
      enrollmentDate: "2023-09-05",
      status: "Active",
      effectiveDate: "2023-10-01",
    },
    {
      id: 8,
      name: "Oscar Health",
      type: "Commercial",
      enrollmentDate: "2024-02-20",
      status: "In Process",
      effectiveDate: "2024-04-01",
    },
    {
      id: 9,
      name: "Optum",
      type: "Commercial",
      enrollmentDate: "2023-10-15",
      status: "Active",
      effectiveDate: "2023-11-01",
    },
    {
      id: 10,
      name: "Empire BlueCross BlueShield",
      type: "Commercial",
      enrollmentDate: "2023-06-20",
      status: "Active",
      effectiveDate: "2023-07-15",
    },
  ]);

  // Available payers to add (from admin/payers list)
  const availablePayers = [
    { id: "p1", name: "Aetna", type: "Commercial" },
    { id: "p2", name: "Anthem (Health Net of CA)", type: "Commercial" },
    { id: "p3", name: "Cigna", type: "Commercial" },
    { id: "p4", name: "Medicare", type: "Government" },
    { id: "p5", name: "Medicaid - FL", type: "Government" },
    { id: "p6", name: "Medicaid - WY", type: "Government" },
    { id: "p7", name: "Optum", type: "Managed Care" },
    { id: "p8", name: "Humana", type: "Commercial" },
    { id: "p9", name: "UnitedHealthcare", type: "Commercial" },
    { id: "p10", name: "Magellan", type: "Managed Care" },
    { id: "p11", name: "Blue Cross Blue Shield", type: "Commercial" },
    { id: "p12", name: "Kaiser Permanente", type: "Commercial" },
    { id: "p13", name: "Tricare", type: "Government" },
    { id: "p14", name: "Molina Healthcare", type: "Managed Care" },
  ];

  const [newPayer, setNewPayer] = useState({
    selectedPayer: "",
    enrollmentDate: "",
    effectiveDate: "",
    status: "Pending",
  });

  const handleAddPayer = () => {
    if (!newPayer.selectedPayer || !newPayer.enrollmentDate || !newPayer.effectiveDate) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const selectedPayerData = availablePayers.find((p) => p.id === newPayer.selectedPayer);
    if (!selectedPayerData) return;

    const newPayerObj = {
      id: payers.length + 1,
      name: selectedPayerData.name,
      type: selectedPayerData.type,
      enrollmentDate: newPayer.enrollmentDate,
      status: newPayer.status,
      effectiveDate: newPayer.effectiveDate,
    };

    setPayers([...payers, newPayerObj]);
    showToast(`${selectedPayerData.name} has been added successfully`, "success");
    setShowAddPayerModal(false);
    setNewPayer({ selectedPayer: "", enrollmentDate: "", effectiveDate: "", status: "Pending" });
  };

  const handleRemovePayer = (payerId: number, payerName: string) => {
    setPayers(payers.filter((p) => p.id !== payerId));
    showToast(`${payerName} has been removed`, "success");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Process":
        return "bg-blue-100 text-blue-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Terminated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Commercial":
        return "bg-blue-50 text-blue-700";
      case "Government":
        return "bg-purple-50 text-purple-700";
      case "Managed Care":
        return "bg-teal-50 text-teal-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Insurance Payers</h3>
        <button
          onClick={() => setShowAddPayerModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Payer
        </button>
      </div>

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
                Enrollment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Effective Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payers.map((payer) => (
              <tr key={payer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{payer.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                      payer.type
                    )}`}
                  >
                    {payer.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{payer.enrollmentDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{payer.effectiveDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      payer.status
                    )}`}
                  >
                    {payer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRemovePayer(payer.id, payer.name)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payers.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500">No payer enrollments for this provider.</p>
        </div>
      )}

      {/* Add Payer Modal */}
      <ModalWrapper
        isOpen={showAddPayerModal}
        onClose={() => setShowAddPayerModal(false)}
        title="Add Payer"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payer <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.selectedPayer}
              onChange={(e) => setNewPayer({ ...newPayer, selectedPayer: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select a payer...</option>
              {availablePayers.map((payer) => (
                <option key={payer.id} value={payer.id}>
                  {payer.name} ({payer.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enrollment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPayer.enrollmentDate}
              onChange={(e) => setNewPayer({ ...newPayer, enrollmentDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Effective Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPayer.effectiveDate}
              onChange={(e) => setNewPayer({ ...newPayer, effectiveDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.status}
              onChange={(e) => setNewPayer({ ...newPayer, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="In Process">In Process</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowAddPayerModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPayer}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Add Payer
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

function TasksTab({ provider }: { provider: any }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Upload renewed medical license",
      description: "Your NY state license expires soon. Please upload the renewed version.",
      category: "Document Upload",
      dueDate: "2026-04-15",
      status: "Overdue",
      createdBy: "Admin User",
    },
    {
      id: 2,
      title: "Complete CAQH re-attestation",
      description: "Annual CAQH profile attestation is due",
      category: "Form Completion",
      dueDate: "2026-04-20",
      status: "Pending",
      createdBy: "Admin User",
    },
  ].filter(t => t.id === 1 || t.id === 2)); // Filter tasks for current provider

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Document Upload":
        return "bg-blue-100 text-blue-800";
      case "Form Completion":
        return "bg-purple-100 text-purple-800";
      case "Signature Required":
        return "bg-orange-100 text-orange-800";
      case "Review":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    return due < today && status !== "Completed";
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
    showToast("Task status updated", "success");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Tasks for {provider.firstName} {provider.lastName}</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{task.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{task.description}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                      task.category
                    )}`}
                  >
                    {task.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm ${
                      isOverdue(task.dueDate, task.status) ? "text-red-600 font-medium" : "text-gray-900"
                    }`}
                  >
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(
                      task.status
                    )}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{task.createdBy}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showToast("Edit task functionality", "warning")}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showToast("Delete task functionality", "warning")}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tasks.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500">No tasks assigned to this provider.</p>
        </div>
      )}
    </div>
  );
}

function ActivityTab({ provider }: { provider: any }) {
  const activities = [
    { id: 1, event: "License NY-12345 renewed", actor: "Admin User", time: "2 hours ago", color: "bg-green-500" },
    { id: 2, event: "Credentialing completed with Blue Cross", actor: "Admin User", time: "4 hours ago", color: "bg-blue-500" },
    { id: 3, event: "License expiring soon flagged", actor: "Admin User", time: "2 days ago", color: "bg-yellow-500" },
    { id: 4, event: "Provider profile created", actor: "Admin User", time: "30 days ago", color: "bg-purple-500" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${activity.color}`} />
              {activity.id !== activities[activities.length - 1].id && (
                <div className="w-0.5 h-full bg-gray-200 mt-1" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <p className="text-sm text-gray-900">{activity.event}</p>
              <p className="text-xs text-gray-500 mt-1">
                — {activity.actor} — {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderProfile;