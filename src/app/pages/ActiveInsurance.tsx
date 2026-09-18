import { useState } from "react";
import { Search, Download, ChevronLeft, DollarSign } from "lucide-react";

interface InsuranceRequest {
  id: number;
  payer: string;
  state: string;
  payerType: string;
  status: string;
  effectiveDate: string;
  revalidationDate: string;
}

interface Rate {
  cptCode: string;
  description: string;
  rate: string;
}

const DUMMY_DATA: InsuranceRequest[] = [
  {
    id: 1,
    payer: "Sedgwick Workers Compensation",
    state: "CO",
    payerType: "Government",
    status: "Intake Prep",
    effectiveDate: "N/A",
    revalidationDate: "-",
  },
  {
    id: 2,
    payer: "Medicare - CO",
    state: "CO",
    payerType: "Government",
    status: "Ready for Intake",
    effectiveDate: "N/A",
    revalidationDate: "-",
  },
  {
    id: 3,
    payer: "Medicaid - CO",
    state: "CO",
    payerType: "Government",
    status: "Intake Assigned",
    effectiveDate: "N/A",
    revalidationDate: "-",
  },
  {
    id: 4,
    payer: "Humana",
    state: "CO",
    payerType: "Insurance",
    status: "Input Required",
    effectiveDate: "N/A",
    revalidationDate: "-",
  },
  {
    id: 5,
    payer: "Cigna",
    state: "WY",
    payerType: "Insurance",
    status: "Request Stopped",
    effectiveDate: "N/A",
    revalidationDate: "-",
  },
  {
    id: 6,
    payer: "Aetna",
    state: "WY",
    payerType: "Insurance",
    status: "Requested",
    effectiveDate: "N/A",
    revalidationDate: "04/23/2025",
  },
  {
    id: 7,
    payer: "Meta",
    state: "WY",
    payerType: "Employer",
    status: "Completed",
    effectiveDate: "12/15/2024",
    revalidationDate: "04/12/2025",
  },
];

// Mock rates data - in reality, this would be fetched based on the insurance
const getRatesForInsurance = (insuranceId: number): Rate[] => {
  const baseRates: Rate[] = [
    { cptCode: "90791", description: "Diagnostic Evaluation", rate: "$150" },
    { cptCode: "90837", description: "60 min Therapy", rate: "$120" },
    { cptCode: "90834", description: "45 min Therapy", rate: "$105" },
    { cptCode: "90832", description: "30 min Therapy", rate: "$85" },
    { cptCode: "90847", description: "Family Therapy", rate: "$135" },
    { cptCode: "90853", description: "Group Therapy", rate: "$65" },
  ];

  // Add some variation based on insurance for demo purposes
  return baseRates.map((rate) => ({
    ...rate,
    rate: `$${parseInt(rate.rate.substring(1)) + (insuranceId * 5)}`,
  }));
};

export function ActiveInsurance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceRequest | null>(null);

  const filteredData = DUMMY_DATA.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusConfig = (status: string): { dot: string; bg: string; text: string } => {
    switch (status) {
      case "Completed":
        return { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" };
      case "Request Stopped":
        return { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700" };
      case "Input Required":
        return { dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" };
      case "Ready for Intake":
        return { dot: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-700" };
      case "Intake Assigned":
        return { dot: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700" };
      case "Intake Prep":
        return { dot: "bg-sky-400", bg: "bg-sky-50", text: "text-sky-700" };
      case "Requested":
        return { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600" };
      default:
        return { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600" };
    }
  };

  const handleRowClick = (insurance: InsuranceRequest) => {
    setSelectedInsurance(insurance);
  };

  const handleBackToList = () => {
    setSelectedInsurance(null);
  };

  if (selectedInsurance) {
    const rates = getRatesForInsurance(selectedInsurance.id);

    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-[#2196F3] hover:text-[#1976D2] mb-4 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Active Insurance</span>
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Rates - {selectedInsurance.payer}
          </h1>
          <p className="text-gray-600">View reimbursement rates for this insurance</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Insurance Details */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  State
                </div>
                <div className="text-sm font-medium text-gray-900">{selectedInsurance.state}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Status
                </div>
                {(() => {
                  const cfg = getStatusConfig(selectedInsurance.status);
                  return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {selectedInsurance.status}
                    </span>
                  );
                })()}
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Effective Date
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {selectedInsurance.effectiveDate}
                </div>
              </div>
            </div>
          </div>

          {/* Rates Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    CPT Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rates.map((rate, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{rate.cptCode}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{rate.description}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#2196F3]">{rate.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Active Insurance</h1>
        <p className="text-gray-600">Track credentialing requests and insurance status. Click "View Rates" on any insurance to see service codes and reimbursement rates.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header with Search and Download */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors cursor-pointer">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
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
                  Payer Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Effective Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Revalidation Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Rates
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#2196F3] hover:underline">
                      {item.payer}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.state}</td>
                  <td className="px-6 py-4">
                    {(() => {
                      const cfg = getStatusConfig(item.status);
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${cfg.bg} ${cfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          {item.status}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.payerType}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.effectiveDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.revalidationDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInsurance(item);
                      }}
                      id={`view-rates-btn-${item.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-[#2196F3] text-[#2196F3] hover:text-white text-xs font-semibold border border-blue-200 hover:border-[#2196F3] transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                      title={`View service codes & rates for ${item.payer}`}
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>View Rates</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No insurance requests found.</p>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              1 - {filteredData.length} of {filteredData.length} Requests
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 bg-[#2196F3] text-white rounded text-sm hover:bg-[#1976D2]">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveInsurance;
