import { useState } from "react";
import { Eye, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";

interface Document {
  id: number;
  providerName: string;
  providerId: string;
  category: string;
  licenseNumber?: string;
  state?: string;
  uploadedDate: string;
  expiryDate?: string;
  status: string;
}

const ALL_DOCUMENTS: Document[] = [
  {
    id: 1,
    providerName: "Dr. Sarah Johnson",
    providerId: "1",
    category: "State License",
    licenseNumber: "NY-12345",
    state: "NY",
    uploadedDate: "01/15/2025",
    expiryDate: "12/31/2025",
    status: "Active",
  },
  {
    id: 2,
    providerName: "Dr. Michael Chen",
    providerId: "2",
    category: "State License",
    licenseNumber: "CA-67890",
    state: "CA",
    uploadedDate: "01/10/2025",
    expiryDate: "03/10/2025",
    status: "Expiring Soon",
  },
  {
    id: 3,
    providerName: "Dr. Emily Rodriguez",
    providerId: "3",
    category: "State License",
    licenseNumber: "TX-11223",
    state: "TX",
    uploadedDate: "12/20/2024",
    expiryDate: "06/30/2025",
    status: "Active",
  },
  {
    id: 4,
    providerName: "Dr. James Williams",
    providerId: "4",
    category: "State License",
    licenseNumber: "FL-44556",
    state: "FL",
    uploadedDate: "11/05/2024",
    expiryDate: "09/15/2025",
    status: "Active",
  },
  {
    id: 5,
    providerName: "Dr. Sarah Johnson",
    providerId: "1",
    category: "DEA License",
    licenseNumber: "FJ1234567",
    state: "NY",
    uploadedDate: "02/01/2024",
    expiryDate: "08/31/2026",
    status: "Active",
  },
  {
    id: 6,
    providerName: "Dr. Michael Chen",
    providerId: "2",
    category: "DEA License",
    licenseNumber: "FC2345678",
    state: "CA",
    uploadedDate: "01/20/2024",
    expiryDate: "11/15/2025",
    status: "Active",
  },
  {
    id: 7,
    providerName: "Dr. Sarah Johnson",
    providerId: "1",
    category: "Malpractice Insurance",
    licenseNumber: "MP-2024-SJ",
    uploadedDate: "03/10/2024",
    expiryDate: "03/10/2025",
    status: "Active",
  },
  {
    id: 8,
    providerName: "Dr. Sarah Johnson",
    providerId: "1",
    category: "Board Certification",
    licenseNumber: "BC-PSY-2024",
    uploadedDate: "01/15/2024",
    expiryDate: "12/31/2026",
    status: "Active",
  },
  {
    id: 9,
    providerName: "Dr. Michael Chen",
    providerId: "2",
    category: "CV / Resume",
    uploadedDate: "11/20/2023",
    status: "No Expiry",
  },
  {
    id: 10,
    providerName: "Dr. Emily Rodriguez",
    providerId: "3",
    category: "Malpractice Insurance",
    licenseNumber: "MP-2024-ER",
    uploadedDate: "02/01/2024",
    expiryDate: "02/01/2025",
    status: "Expiring Soon",
  },
  {
    id: 11,
    providerName: "Dr. James Williams",
    providerId: "4",
    category: "W9",
    uploadedDate: "09/05/2023",
    status: "No Expiry",
  },
  {
    id: 12,
    providerName: "Dr. Emily Rodriguez",
    providerId: "3",
    category: "Board Certification",
    licenseNumber: "BC-THER-2023",
    uploadedDate: "08/15/2023",
    expiryDate: "08/15/2026",
    status: "Active",
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

export function Documents() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [newDocument, setNewDocument] = useState({
    providerId: "",
    name: "",
    type: "",
    category: "",
    expiryDate: "",
  });

  const filteredDocuments = ALL_DOCUMENTS.filter((doc) => {
    const matchesSearch = doc.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.licenseNumber && doc.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "All Categories" || doc.category === categoryFilter;
    const matchesStatus = statusFilter === "All Statuses" || doc.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddDocument = () => {
    if (!newDocument.providerId || !newDocument.name || !newDocument.type || !newDocument.category) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const provider = PROVIDERS.find((p) => p.id === newDocument.providerId);
    showToast(`${newDocument.name} added for ${provider?.name}`, "success");
    setShowAddModal(false);
    setNewDocument({
      providerId: "",
      name: "",
      type: "",
      category: "",
      expiryDate: "",
    });
  };

  const handleViewDocument = (doc: Document) => {
    showToast("Opening document viewer...", "success");
  };

  const handleEditDocument = (doc: Document) => {
    showToast("Opening document editor...", "warning");
  };

  const handleDownloadDocument = (doc: Document) => {
    showToast(`Downloading document...`, "success");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "State License":
        return "bg-green-100 text-green-800";
      case "DEA License":
        return "bg-blue-100 text-blue-800";
      case "Malpractice Insurance":
        return "bg-orange-100 text-orange-800";
      case "Board Certification":
        return "bg-purple-100 text-purple-800";
      case "Education / Diploma":
        return "bg-blue-100 text-blue-800";
      case "CV / Resume":
        return "bg-gray-100 text-gray-800";
      case "W9":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Expiring Soon":
        return "bg-orange-100 text-orange-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "No Expiry":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Documents</h1>
        <p className="text-gray-600">Manage provider licenses and all compliance documents</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by provider name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option>All Categories</option>
              <option>State License</option>
              <option>DEA License</option>
              <option>Malpractice Insurance</option>
              <option>Board Certification</option>
              <option>Education / Diploma</option>
              <option>CV / Resume</option>
              <option>W9</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Expiring Soon</option>
              <option>Expired</option>
              <option>No Expiry</option>
            </select>
          </div>

          {/* Add Document Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Document
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
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Uploaded Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/providers/${doc.providerId}`)}
                      className="text-sm font-medium text-[#2196F3] hover:underline"
                    >
                      {doc.providerName}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                        doc.category
                      )}`}
                    >
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{doc.expiryDate || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{doc.uploadedDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewDocument(doc)}
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

        {filteredDocuments.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No documents found.</p>
          </div>
        )}
      </div>

      {/* Add Document Modal */}
      <ModalWrapper
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Upload Document"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Provider <span className="text-red-500">*</span>
            </label>
            <select
              value={newDocument.providerId}
              onChange={(e) => setNewDocument({ ...newDocument, providerId: e.target.value })}
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
              <option value="License">License</option>
              <option value="Certificate">Certificate</option>
              <option value="Insurance">Insurance</option>
              <option value="Document">Document</option>
              <option value="Form">Form</option>
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
              <option value="State License">State License</option>
              <option value="DEA License">DEA License</option>
              <option value="Board Certification">Board Certification</option>
              <option value="Insurance">Insurance</option>
              <option value="Professional Document">Professional Document</option>
              <option value="Education">Education</option>
              <option value="Malpractice Insurance">Malpractice Insurance</option>
              <option value="Work History">Work History</option>
              <option value="References">References</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              value={newDocument.expiryDate}
              onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
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
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddDocument}
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

export default Documents;