import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Plus, Edit, Trash2, Info, ChevronDown, Calendar, Upload, X } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";
import { ConfirmationDialog } from "../../components/shared/ConfirmationDialog";
import { GroupProfileForms } from "./GroupProfileForms";

interface Group {
  id: number;
  name: string;
  state: string;
  npi: string;
  taxId: string;
}

interface Provider {
  id: number;
  name: string;
  specialty: string;
  npi: string;
  state: string;
  status: string;
}

interface Practice {
  id: number;
  name: string;
  state: string;
  city: string;
  streetAddress: string;
  postalCode: string;
  percentComplete: number;
}

interface Payer {
  id: number;
  name: string;
  type: string;
  state: string;
  status: string;
  enrollmentDate: string;
}

const DUMMY_GROUP: Group = {
  id: 1,
  name: "Community Health Center",
  state: "LA",
  npi: "1234567890",
  taxId: "12-3456789",
};

const DUMMY_PROVIDERS: Provider[] = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Psychiatry", npi: "1234567890", state: "NY", status: "Active" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Psychology", npi: "2345678901", state: "CA", status: "Active" },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Therapy", npi: "3456789012", state: "TX", status: "Active" },
];

const DUMMY_PRACTICES: Practice[] = [
  {
    id: 1,
    name: "Westbank Medical Group - Peaks Chicago",
    state: "TN",
    city: "Memphis",
    streetAddress: "6215 Humphrey Blvd, Ste 301",
    postalCode: "38120",
    percentComplete: 92,
  },
  {
    id: 2,
    name: "Hoover Medical Group",
    state: "CO",
    city: "Longmont",
    streetAddress: "8750 Lookout Rd",
    postalCode: "80503",
    percentComplete: 91,
  },
  {
    id: 3,
    name: "Vanderbilt Ingram Cancer Center",
    state: "TN",
    city: "Nashville",
    streetAddress: "2220 Pierce Ave, Suite 5001",
    postalCode: "37232",
    percentComplete: 100,
  },
  {
    id: 4,
    name: "Vanderbilt University Medical Center",
    state: "TN",
    city: "Nashville",
    streetAddress: "1211 Medical Center Dr",
    postalCode: "37232",
    percentComplete: 100,
  },
  {
    id: 5,
    name: "Vanderbilt Wilson County Hospital - McFarland Campus - I",
    state: "TN",
    city: "Lebanon",
    streetAddress: "500 Park Ave",
    postalCode: "37087",
    percentComplete: 100,
  },
];

const DUMMY_PAYERS: Payer[] = [
  { id: 1, name: "Blue Cross Blue Shield", type: "Commercial", state: "TN", status: "Active", enrollmentDate: "01/15/2024" },
  { id: 2, name: "Aetna", type: "Commercial", state: "TN", status: "Active", enrollmentDate: "02/20/2024" },
  { id: 3, name: "Humana", type: "Commercial", state: "TN", status: "Pending", enrollmentDate: "03/10/2024" },
  { id: 4, name: "United Healthcare", type: "Commercial", state: "TN", status: "Active", enrollmentDate: "01/05/2024" },
  { id: 5, name: "Cigna", type: "Commercial", state: "TN", status: "Active", enrollmentDate: "02/28/2024" },
  { id: 6, name: "Medicare", type: "Government", state: "National", status: "Active", enrollmentDate: "12/01/2023" },
  { id: 7, name: "Medicaid - Tennessee", type: "Government", state: "TN", status: "Active", enrollmentDate: "12/15/2023" },
  { id: 8, name: "Optum", type: "Commercial", state: "TN", status: "Pending", enrollmentDate: "03/20/2024" },
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

type TabType = "profile" | "providers" | "practices" | "payers";

export function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [group] = useState(DUMMY_GROUP);
  const [providers, setProviders] = useState(DUMMY_PROVIDERS);
  const [practices, setPractices] = useState(DUMMY_PRACTICES);
  const [payers, setPayers] = useState(DUMMY_PAYERS);
  
  const [activeProfileStep, setActiveProfileStep] = useState(1);
  const [showAddPracticeModal, setShowAddPracticeModal] = useState(false);
  const [showEditPracticeModal, setShowEditPracticeModal] = useState(false);
  const [showAddPayerModal, setShowAddPayerModal] = useState(false);
  const [showAddProviderModal, setShowAddProviderModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: number; name: string } | null>(null);
  const [editingPractice, setEditingPractice] = useState<Practice | null>(null);

  const [profileData, setProfileData] = useState({
    groupName: "Longmont Medical Group, LLC",
    fictitiousBusinessName: "",
    internalGroupId: "",
    npiNumber: "7652900431",
    linesOfBusiness: ["Exchange/Marketplace/ACA", "Managed Medicaid", "Government", "Medicare Advantage", "Commercial", "Traditional Medicare"],
    stateOfIncorporation: "TN - Tennessee",
    dateOfIncorporation: "02/01/2005",
  });

  const [newPractice, setNewPractice] = useState({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    tin: "",
    npi: "",
  });

  const [newPayer, setNewPayer] = useState({
    name: "",
    type: "",
    state: "",
    enrollmentDate: "",
  });

  const [newProvider, setNewProvider] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sendInvite: true,
  });

  const handleAddPractice = () => {
    if (!newPractice.name || !newPractice.streetAddress || !newPractice.city || !newPractice.state) {
      showToast("Please fill in required fields", "error");
      return;
    }

    const newPracticeObj: Practice = {
      id: practices.length + 1,
      name: newPractice.name,
      state: newPractice.state,
      city: newPractice.city,
      streetAddress: newPractice.streetAddress,
      postalCode: newPractice.postalCode,
      percentComplete: 60,
    };

    setPractices([...practices, newPracticeObj]);
    showToast(`${newPractice.name} has been added`, "success");
    setShowAddPracticeModal(false);
    setNewPractice({ name: "", streetAddress: "", city: "", state: "", postalCode: "", tin: "", npi: "" });
  };

  const handleEditPractice = () => {
    if (!editingPractice) return;
    
    if (!editingPractice.name || !editingPractice.streetAddress || !editingPractice.city || !editingPractice.state) {
      showToast("Please fill in required fields", "error");
      return;
    }

    setPractices(practices.map((p) => 
      p.id === editingPractice.id ? editingPractice : p
    ));
    showToast(`${editingPractice.name} has been updated`, "success");
    setShowEditPracticeModal(false);
    setEditingPractice(null);
  };

  const openEditPracticeModal = (practice: Practice) => {
    setEditingPractice({ ...practice });
    setShowEditPracticeModal(true);
  };

  const handleAddPayer = () => {
    if (!newPayer.name || !newPayer.type || !newPayer.state) {
      showToast("Please fill in required fields", "error");
      return;
    }

    const newPayerObj: Payer = {
      id: payers.length + 1,
      name: newPayer.name,
      type: newPayer.type,
      state: newPayer.state,
      status: "Pending",
      enrollmentDate: newPayer.enrollmentDate || new Date().toLocaleDateString("en-US"),
    };

    setPayers([...payers, newPayerObj]);
    showToast(`${newPayer.name} has been added`, "success");
    setShowAddPayerModal(false);
    setNewPayer({ name: "", type: "", state: "", enrollmentDate: "" });
  };

  const handleAddProvider = () => {
    if (!newProvider.firstName || !newProvider.lastName || !newProvider.email) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    showToast(`Provider ${newProvider.firstName} ${newProvider.lastName} added successfully`, "success");
    setShowAddProviderModal(false);
    setNewProvider({ firstName: "", lastName: "", email: "", sendInvite: true });
  };

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === "practice") {
      setPractices(practices.filter((p) => p.id !== itemToDelete.id));
    } else if (itemToDelete.type === "payer") {
      setPayers(payers.filter((p) => p.id !== itemToDelete.id));
    }

    showToast(`${itemToDelete.name} has been removed`, "success");
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/groups")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Groups
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{group.name}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>NPI: {group.npi}</span>
            <span>TIN: {group.taxId}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "profile"
                  ? "border-[#2196F3] text-[#2196F3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("providers")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "providers"
                  ? "border-[#2196F3] text-[#2196F3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Providers
            </button>
            <button
              onClick={() => setActiveTab("practices")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "practices"
                  ? "border-[#2196F3] text-[#2196F3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Practices
            </button>
            <button
              onClick={() => setActiveTab("payers")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "payers"
                  ? "border-[#2196F3] text-[#2196F3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Payers
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="flex gap-6">
              {/* Left Sidebar with Steps */}
              <div className="w-64 flex-shrink-0">
                {/* Progress */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">PROGRESS</div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {activeProfileStep === 1 ? 1 : activeProfileStep > 1 ? 2 : 1}/7
                  </div>
                </div>

                {/* Step Navigation */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveProfileStep(1)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeProfileStep === 1
                        ? "bg-blue-50 text-[#2196F3]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      activeProfileStep >= 1 ? "bg-[#2196F3] text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      1
                    </div>
                    <span className="text-left">Basic Info</span>
                    <span className="ml-auto text-xs text-gray-500">100%</span>
                  </button>

                  <button
                    onClick={() => setActiveProfileStep(2)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeProfileStep === 2
                        ? "bg-blue-50 text-[#2196F3]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      activeProfileStep >= 2 ? "bg-[#2196F3] text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      2
                    </div>
                    <span className="text-left">Financial Info</span>
                    <span className="ml-auto text-xs text-gray-500">100%</span>
                  </button>

                  <button
                    onClick={() => setActiveProfileStep(3)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeProfileStep === 3
                        ? "bg-blue-50 text-[#2196F3]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      activeProfileStep >= 3 ? "bg-[#2196F3] text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      3
                    </div>
                    <span className="text-left">Operational Info</span>
                    <span className="ml-auto text-xs text-gray-500">100%</span>
                  </button>

                  <button
                    onClick={() => setActiveProfileStep(4)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeProfileStep === 4
                        ? "bg-blue-50 text-[#2196F3]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      activeProfileStep >= 4 ? "bg-[#2196F3] text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      4
                    </div>
                    <span className="text-left">Group Officials</span>
                    <span className="ml-auto text-xs text-gray-500">100%</span>
                  </button>

                  <button
                    onClick={() => setActiveProfileStep(5)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeProfileStep === 5
                        ? "bg-blue-50 text-[#2196F3]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      activeProfileStep >= 5 ? "bg-[#2196F3] text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      5
                    </div>
                    <span className="text-left">External Accounts</span>
                    <span className="ml-auto text-xs text-gray-500">100%</span>
                  </button>

                  <button
                    onClick={() => setActiveProfileStep(6)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeProfileStep === 6
                        ? "bg-blue-50 text-[#2196F3]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      activeProfileStep >= 6 ? "bg-[#2196F3] text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      6
                    </div>
                    <span className="text-left">Practice Locations</span>
                    <span className="ml-auto text-xs text-gray-500">100%</span>
                  </button>

                  <button
                    onClick={() => setActiveProfileStep(7)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeProfileStep === 7
                        ? "bg-blue-50 text-[#2196F3]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      activeProfileStep >= 7 ? "bg-[#2196F3] text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                      7
                    </div>
                    <span className="text-left">Documents</span>
                    <span className="ml-auto text-xs text-gray-500">100%</span>
                  </button>
                </nav>

                {/* Progress Bar at Bottom */}
                <div className="mt-6 relative">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all rounded-full relative"
                      style={{ width: "100%" }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="bg-white border border-gray-200 rounded-lg p-8">
                  {activeProfileStep === 1 && (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Basic Info</h2>
                        <button
                          onClick={() => showToast("Edit profile functionality", "warning")}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Profile
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Group Name
                            </label>
                            <input
                              type="text"
                              value={profileData.groupName}
                              onChange={(e) => setProfileData({ ...profileData, groupName: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500 mb-2">
                              Fictitious Business Name / Doing Business As (dba) <span className="text-gray-400">- optional</span>
                            </label>
                            <input
                              type="text"
                              value={profileData.fictitiousBusinessName}
                              onChange={(e) => setProfileData({ ...profileData, fictitiousBusinessName: e.target.value })}
                              placeholder="Enter fictitious business name"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-500 mb-2">
                              Internal Group ID <span className="text-gray-400">- optional</span>
                            </label>
                            <input
                              type="text"
                              value={profileData.internalGroupId}
                              onChange={(e) => setProfileData({ ...profileData, internalGroupId: e.target.value })}
                              placeholder="Enter internal group ID"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              NPI Number
                            </label>
                            <input
                              type="text"
                              value={profileData.npiNumber}
                              onChange={(e) => setProfileData({ ...profileData, npiNumber: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lines of Business
                          </label>
                          <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 min-h-[80px] flex flex-wrap gap-2">
                            {profileData.linesOfBusiness.map((line, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700 text-white text-sm rounded"
                              >
                                {line}
                                <button
                                  onClick={() => {
                                    const updated = profileData.linesOfBusiness.filter((_, i) => i !== index);
                                    setProfileData({ ...profileData, linesOfBusiness: updated });
                                  }}
                                  className="ml-1 hover:text-gray-300"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              State of Incorporation
                            </label>
                            <select
                              value={profileData.stateOfIncorporation}
                              onChange={(e) => setProfileData({ ...profileData, stateOfIncorporation: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                            >
                              <option value="TN - Tennessee">TN - Tennessee</option>
                              {US_STATES.map((state) => (
                                <option key={state} value={`${state} - ${state}`}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date of Incorporation
                            </label>
                            <input
                              type="text"
                              value={profileData.dateOfIncorporation}
                              onChange={(e) => setProfileData({ ...profileData, dateOfIncorporation: e.target.value })}
                              placeholder="mm-dd-yyyy"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeProfileStep === 2 && (
                    <GroupProfileForms 
                      activeStep={activeProfileStep} 
                      onNext={() => setActiveProfileStep(3)} 
                      showToast={showToast} 
                    />
                  )}

                  {activeProfileStep === 3 && (
                    <GroupProfileForms 
                      activeStep={activeProfileStep} 
                      onNext={() => setActiveProfileStep(4)} 
                      showToast={showToast} 
                    />
                  )}

                  {activeProfileStep === 4 && (
                    <GroupProfileForms 
                      activeStep={activeProfileStep} 
                      onNext={() => setActiveProfileStep(5)} 
                      showToast={showToast} 
                    />
                  )}

                  {activeProfileStep === 5 && (
                    <GroupProfileForms 
                      activeStep={activeProfileStep} 
                      onNext={() => setActiveProfileStep(6)} 
                      showToast={showToast} 
                    />
                  )}

                  {activeProfileStep === 6 && (
                    <GroupProfileForms 
                      activeStep={activeProfileStep} 
                      onNext={() => setActiveProfileStep(7)} 
                      showToast={showToast} 
                    />
                  )}

                  {activeProfileStep === 7 && (
                    <GroupProfileForms 
                      activeStep={activeProfileStep} 
                      onNext={() => showToast("Profile completed!", "success")} 
                      showToast={showToast} 
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Providers Tab */}
          {activeTab === "providers" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Providers</h3>
                <button
                  onClick={() => setShowAddProviderModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Provider
                </button>
              </div>

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
                        NPI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        State
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {providers.map((provider) => (
                      <tr key={provider.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/admin/providers/${provider.id}`)}
                            className="text-sm font-medium text-[#2196F3] hover:underline"
                          >
                            {provider.name}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{provider.specialty}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{provider.npi}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{provider.state}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              provider.status
                            )}`}
                          >
                            {provider.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {providers.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-gray-500">No providers associated with this group.</p>
                </div>
              )}
            </div>
          )}

          {/* Practices Tab */}
          {activeTab === "practices" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Practice Locations</h3>
                <button
                  onClick={() => setShowAddPracticeModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Practice
                </button>
              </div>

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
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Street Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Postal Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {practices.map((practice) => (
                      <tr key={practice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{practice.name}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{practice.state}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{practice.city}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{practice.streetAddress}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{practice.postalCode}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditPracticeModal(practice)}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setItemToDelete({ type: "practice", id: practice.id, name: practice.name });
                                setShowDeleteDialog(true);
                              }}
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

              {practices.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-gray-500">No practices associated with this group.</p>
                </div>
              )}
            </div>
          )}

          {/* Payers Tab */}
          {activeTab === "payers" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Insurance Payers</h3>
                <button
                  onClick={() => setShowAddPayerModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
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
                        State
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Enrollment Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payers.map((payer) => (
                      <tr key={payer.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{payer.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payer.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payer.state}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              payer.status
                            )}`}
                          >
                            {payer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payer.enrollmentDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setItemToDelete({ type: "payer", id: payer.id, name: payer.name });
                                setShowDeleteDialog(true);
                              }}
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

              {payers.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-gray-500">No payers associated with this group.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Practice Modal */}
      <ModalWrapper
        isOpen={showAddPracticeModal}
        onClose={() => setShowAddPracticeModal(false)}
        title="Add Practice Location"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Practice Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPractice.name}
              onChange={(e) => setNewPractice({ ...newPractice, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter practice name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPractice.streetAddress}
              onChange={(e) => setNewPractice({ ...newPractice, streetAddress: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter street address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPractice.city}
              onChange={(e) => setNewPractice({ ...newPractice, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={newPractice.state}
              onChange={(e) => setNewPractice({ ...newPractice, state: e.target.value })}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
            <input
              type="text"
              value={newPractice.postalCode}
              onChange={(e) => setNewPractice({ ...newPractice, postalCode: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter postal code"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowAddPracticeModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPractice}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Add Practice
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Edit Practice Modal */}
      <ModalWrapper
        isOpen={showEditPracticeModal}
        onClose={() => setShowEditPracticeModal(false)}
        title="Edit Practice Location"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Practice Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editingPractice?.name || ""}
              onChange={(e) => setEditingPractice({ ...editingPractice!, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter practice name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editingPractice?.streetAddress || ""}
              onChange={(e) => setEditingPractice({ ...editingPractice!, streetAddress: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter street address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editingPractice?.city || ""}
              onChange={(e) => setEditingPractice({ ...editingPractice!, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={editingPractice?.state || ""}
              onChange={(e) => setEditingPractice({ ...editingPractice!, state: e.target.value })}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
            <input
              type="text"
              value={editingPractice?.postalCode || ""}
              onChange={(e) => setEditingPractice({ ...editingPractice!, postalCode: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter postal code"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowEditPracticeModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditPractice}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
            >
              Update Practice
            </button>
          </div>
        </div>
      </ModalWrapper>

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
              Payer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPayer.name}
              onChange={(e) => setNewPayer({ ...newPayer, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="Enter payer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.type}
              onChange={(e) => setNewPayer({ ...newPayer, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select type...</option>
              <option>Commercial</option>
              <option>Government</option>
              <option>Medicaid</option>
              <option>Medicare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={newPayer.state}
              onChange={(e) => setNewPayer({ ...newPayer, state: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select state...</option>
              <option>National</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enrollment Date</label>
            <input
              type="date"
              value={newPayer.enrollmentDate}
              onChange={(e) => setNewPayer({ ...newPayer, enrollmentDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
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

      {/* Add Provider Modal */}
      <ModalWrapper
        isOpen={showAddProviderModal}
        onClose={() => setShowAddProviderModal(false)}
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
              onClick={() => setShowAddProviderModal(false)}
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

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        title={`Remove ${itemToDelete?.name}?`}
        message={`Are you sure you want to remove this ${itemToDelete?.type}? This action cannot be undone.`}
        confirmText="Remove"
        confirmColor="red"
      />
    </div>
  );
}

export default GroupDetail;