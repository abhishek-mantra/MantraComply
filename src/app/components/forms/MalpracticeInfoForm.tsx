import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { Trash2, Eye } from "lucide-react";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface Malpractice {
  id: string;
  carrier: string;
  policyNumber: string;
  coverageAmount: string;
  aggregateAmount: string;
  effectiveDate: string;
  expirationDate: string;
}

export function MalpracticeInfoForm({ onNext, onPrevious, isFirstStep }: FormProps) {
  const [malpractices, setMalpractices] = useState<Malpractice[]>([]);
  const [currentMalpractice, setCurrentMalpractice] = useState({
    carrier: "",
    policyNumber: "",
    coverageAmount: "",
    aggregateAmount: "",
    effectiveDate: "",
    expirationDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleAddMalpractice = () => {
    if (
      currentMalpractice.carrier &&
      currentMalpractice.policyNumber &&
      currentMalpractice.coverageAmount &&
      currentMalpractice.aggregateAmount &&
      currentMalpractice.effectiveDate &&
      currentMalpractice.expirationDate
    ) {
      const newMalpractice: Malpractice = {
        id: Date.now().toString(),
        ...currentMalpractice,
      };
      setMalpractices([...malpractices, newMalpractice]);
      setCurrentMalpractice({
        carrier: "",
        policyNumber: "",
        coverageAmount: "",
        aggregateAmount: "",
        effectiveDate: "",
        expirationDate: "",
      });
    }
  };

  const handleDeleteMalpractice = (id: string) => {
    setMalpractices(malpractices.filter((m) => m.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-gray-700">
          All healthcare providers must maintain professional liability (malpractice) insurance.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Insurance Carrier <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={currentMalpractice.carrier}
          onChange={(e) => setCurrentMalpractice({ ...currentMalpractice, carrier: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="e.g., The Doctors Company"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Policy Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={currentMalpractice.policyNumber}
          onChange={(e) => setCurrentMalpractice({ ...currentMalpractice, policyNumber: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Enter policy number"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Coverage Amount (per occurrence) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={currentMalpractice.coverageAmount}
            onChange={(e) => setCurrentMalpractice({ ...currentMalpractice, coverageAmount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="e.g., $1,000,000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Aggregate Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={currentMalpractice.aggregateAmount}
            onChange={(e) => setCurrentMalpractice({ ...currentMalpractice, aggregateAmount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="e.g., $3,000,000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Effective Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={currentMalpractice.effectiveDate}
            onChange={(e) => setCurrentMalpractice({ ...currentMalpractice, effectiveDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Expiration Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={currentMalpractice.expirationDate}
            onChange={(e) => setCurrentMalpractice({ ...currentMalpractice, expirationDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Certificate of Insurance <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-[#2196F3] transition-colors cursor-pointer">
          <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, JPG, or PNG (max 10MB)</p>
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddMalpractice}
        className="w-full px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
      >
        + Add Malpractice Insurance
      </button>

      {malpractices.length > 0 && (
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Insurance Carrier
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Policy Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Coverage Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Effective Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {malpractices.map((malpractice) => (
                <tr key={malpractice.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{malpractice.carrier}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{malpractice.policyNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{malpractice.coverageAmount}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(malpractice.effectiveDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(malpractice.expirationDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alert('View document functionality')}
                        className="text-[#2196F3] hover:text-[#1976D2] transition-colors"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMalpractice(malpractice.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
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
      )}

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}
