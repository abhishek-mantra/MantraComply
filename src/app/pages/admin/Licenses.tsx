import { Eye, Edit, Download, AlertCircle } from "lucide-react";
import { StatusBadge } from "../../components/shared/StatusBadge";

interface License {
  id: number;
  providerName: string;
  licenseNumber: string;
  state: string;
  status: string;
  expDate: string;
  expiration: string;
  lastUpdated: string;
}

const STATE_LICENSES: License[] = [
  {
    id: 1,
    providerName: "Dr. Sarah Johnson",
    licenseNumber: "NY-12345",
    state: "NY",
    status: "Active",
    expDate: "12/31/2025",
    expiration: "Valid",
    lastUpdated: "01/15/2025",
  },
  {
    id: 2,
    providerName: "Dr. Michael Chen",
    licenseNumber: "CA-67890",
    state: "CA",
    status: "Active with Caveat",
    expDate: "03/10/2025",
    expiration: "3 days left",
    lastUpdated: "01/10/2025",
  },
  {
    id: 3,
    providerName: "Dr. Emily Rodriguez",
    licenseNumber: "TX-11223",
    state: "TX",
    status: "Active",
    expDate: "06/30/2025",
    expiration: "Valid",
    lastUpdated: "12/20/2024",
  },
  {
    id: 4,
    providerName: "Dr. James Williams",
    licenseNumber: "FL-44556",
    state: "FL",
    status: "Active",
    expDate: "09/15/2025",
    expiration: "Valid",
    lastUpdated: "11/05/2024",
  },
];

const DEA_LICENSES: License[] = [
  {
    id: 1,
    providerName: "Dr. Sarah Johnson",
    licenseNumber: "FJ1234567",
    state: "NY",
    status: "Active",
    expDate: "08/31/2026",
    expiration: "Valid",
    lastUpdated: "02/01/2024",
  },
  {
    id: 2,
    providerName: "Dr. Michael Chen",
    licenseNumber: "FC2345678",
    state: "CA",
    status: "Active",
    expDate: "11/15/2025",
    expiration: "Valid",
    lastUpdated: "01/20/2024",
  },
];

export function Licenses() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Licenses</h1>
        <p className="text-gray-600">PhysioMantra</p>
      </div>

      {/* State Licenses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">State Licenses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Provider Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  License Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Exp Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Expiration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {STATE_LICENSES.map((license) => (
                <tr key={license.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {license.providerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{license.licenseNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{license.state}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={license.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{license.expDate}</td>
                  <td className="px-6 py-4">
                    {license.expiration === "Valid" ? (
                      <StatusBadge status={license.expiration} variant="expiration" />
                    ) : (
                      <span className="text-sm text-orange-600 font-medium">{license.expiration}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{license.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <AlertCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DEA Licenses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">DEA Licenses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Provider Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  DEA Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Exp Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Expiration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {DEA_LICENSES.map((license) => (
                <tr key={license.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {license.providerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{license.licenseNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{license.state}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={license.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{license.expDate}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={license.expiration} variant="expiration" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{license.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <AlertCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Licenses;
