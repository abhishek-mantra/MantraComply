import { useState } from "react";
import { ChevronDown, ChevronUp, Eye, Download } from "lucide-react";

interface Document {
  id: number;
  category: string;
  documentType: string;
  name: string;
  uploadDate: string;
  expirationDate: string;
  status: "expired" | "nearing" | "upcoming" | "valid";
  fileUrl?: string;
}

const DUMMY_DOCUMENTS: Document[] = [
  {
    id: 1,
    category: "Licenses",
    documentType: "State Registration",
    name: "NY State License",
    uploadDate: "01/15/2024",
    expirationDate: "12/01/2024",
    status: "expired",
  },
  {
    id: 2,
    category: "Licenses",
    documentType: "State Registration",
    name: "CA State License",
    uploadDate: "02/10/2024",
    expirationDate: "01/15/2025",
    status: "nearing",
  },
  {
    id: 3,
    category: "Insurance",
    documentType: "Malpractice",
    name: "Humana Malpractice Coverage",
    uploadDate: "03/20/2024",
    expirationDate: "12/01/2024",
    status: "expired",
  },
  {
    id: 4,
    category: "Board Certification",
    documentType: "Certification",
    name: "American Board of Psychiatry and Neurology",
    uploadDate: "01/05/2024",
    expirationDate: "05/09/2025",
    status: "upcoming",
  },
  {
    id: 5,
    category: "Board Certification",
    documentType: "Certification",
    name: "American Board of Professional Psychology",
    uploadDate: "02/12/2024",
    expirationDate: "12/31/2025",
    status: "valid",
  },
  {
    id: 6,
    category: "Education",
    documentType: "University Transcript",
    name: "Master's Degree Transcript",
    uploadDate: "01/08/2024",
    expirationDate: "12/15/2024",
    status: "expired",
  },
  {
    id: 7,
    category: "Education",
    documentType: "School Transcript",
    name: "Undergraduate Transcript",
    uploadDate: "01/08/2024",
    expirationDate: "12/15/2024",
    status: "expired",
  },
  {
    id: 8,
    category: "Background Check",
    documentType: "Criminal Background",
    name: "National Background Check",
    uploadDate: "03/01/2024",
    expirationDate: "01/23/2026",
    status: "valid",
  },
  {
    id: 9,
    category: "Immunizations",
    documentType: "Vaccination Record",
    name: "TB Test Results",
    uploadDate: "02/15/2024",
    expirationDate: "08/01/2027",
    status: "valid",
  },
  {
    id: 10,
    category: "DEA",
    documentType: "DEA Certificate",
    name: "DEA Registration",
    uploadDate: "01/20/2024",
    expirationDate: "03/15/2025",
    status: "upcoming",
  },
];

export function Documents() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (status: string, expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (status === "expired" || diffDays < 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800">
          Expired
        </span>
      );
    } else if (diffDays <= 30) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-orange-100 text-orange-800">
          Nearing
        </span>
      );
    } else if (diffDays <= 90) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
          In {diffDays} Days
        </span>
      );
    } else if (diffDays <= 180) {
      const months = Math.floor(diffDays / 30);
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
          In {months} Month{months > 1 ? "s" : ""}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
          Valid
        </span>
      );
    }
  };

  const filteredData =
    filterCategory === "all"
      ? DUMMY_DOCUMENTS
      : DUMMY_DOCUMENTS.filter((item) => item.category === filterCategory);

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue = a[sortColumn as keyof Document];
    let bValue = b[sortColumn as keyof Document];

    if (sortColumn === "expirationDate" || sortColumn === "uploadDate") {
      aValue = new Date(a[sortColumn]).getTime();
      bValue = new Date(b[sortColumn]).getTime();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const categories = ["all", ...new Set(DUMMY_DOCUMENTS.map((item) => item.category))];

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return <ChevronDown className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );
  };

  const handleViewDocument = (doc: Document) => {
    alert(`Viewing document: ${doc.name}`);
  };

  const handleDownloadDocument = (doc: Document) => {
    alert(`Downloading document: ${doc.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Documents</h1>
        <p className="text-gray-600">View and manage all your uploaded documents and licenses</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <div className="ml-auto text-sm text-gray-600">
              {sortedData.length} document{sortedData.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort("category")}
                    className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                  >
                    Category
                    <SortIcon column="category" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort("documentType")}
                    className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                  >
                    Document Type
                    <SortIcon column="documentType" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                  >
                    Document Name
                    <SortIcon column="name" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort("uploadDate")}
                    className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                  >
                    Upload Date
                    <SortIcon column="uploadDate" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort("expirationDate")}
                    className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                  >
                    Expiration Date
                    <SortIcon column="expirationDate" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.documentType}</td>
                  <td className="px-6 py-4 text-sm text-[#2196F3] font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.uploadDate}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{item.expirationDate}</span>
                      {getStatusBadge(item.status, item.expirationDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDocument(item)}
                        className="p-1.5 text-[#2196F3] hover:bg-[#E3F2FD] rounded transition-colors"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadDocument(item)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No documents found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;
