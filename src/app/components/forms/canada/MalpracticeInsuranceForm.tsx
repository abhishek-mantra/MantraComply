import { useState } from "react";
import { Plus, X, AlertCircle } from "lucide-react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface InsurancePolicy {
  carrier: string;
  bundled: string;
  policyNumber: string;
  coverageAmount: string;
  aggregateAmount: string;
  effectiveDate: string;
  expiryDate: string;
}

interface MalpracticeInsuranceFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function MalpracticeInsuranceForm({ onNext, onBack }: MalpracticeInsuranceFormProps) {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([
    { carrier: "", bundled: "", policyNumber: "", coverageAmount: "", aggregateAmount: "", effectiveDate: "", expiryDate: "" }
  ]);

  const addPolicy = () => {
    setPolicies([...policies, { carrier: "", bundled: "", policyNumber: "", coverageAmount: "", aggregateAmount: "", effectiveDate: "", expiryDate: "" }]);
  };

  const removePolicy = (index: number) => {
    if (policies.length > 1) {
      setPolicies(policies.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            All healthcare providers must maintain professional liability (malpractice) insurance. In Canada, 
            this is often bundled with professional association membership (e.g., CCPA, BCACC).
          </p>
        </div>
      </div>

      {policies.map((policy, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-6 relative">
          {index > 0 && (
            <button
              type="button"
              onClick={() => removePolicy(index)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {policies.length > 1 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Insurance Policy {index + 1}</h3>
            </div>
          )}

          <div>
            <label htmlFor={`carrier-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Carrier <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`carrier-${index}`}
              name={`carrier-${index}`}
              required
              placeholder="e.g., CCPA-affiliated insurer, Encon, BMS"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Is this bundled with your association membership? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {['Yes', 'No'].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name={`bundled-${index}`}
                    value={option.toLowerCase()}
                    required
                    className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor={`policy-number-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`policy-number-${index}`}
              name={`policy-number-${index}`}
              required
              placeholder="Enter policy number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`coverage-amount-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Coverage Amount (per occurrence) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`coverage-amount-${index}`}
              name={`coverage-amount-${index}`}
              required
              placeholder="e.g., $2,000,000"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`aggregate-amount-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Aggregate Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`aggregate-amount-${index}`}
              name={`aggregate-amount-${index}`}
              required
              placeholder="e.g., $4,000,000"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`effective-date-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id={`effective-date-${index}`}
                name={`effective-date-${index}`}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label htmlFor={`expiry-date-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id={`expiry-date-${index}`}
                name={`expiry-date-${index}`}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`certificate-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Certificate of Insurance <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-[#CBD5E0] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
              <input
                type="file"
                id={`certificate-${index}`}
                name={`certificate-${index}`}
                required
                className="hidden"
              />
              <label htmlFor={`certificate-${index}`} className="cursor-pointer">
                <div className="text-gray-600 mb-2">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="text-[#2563EB] font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (max. 10MB)</p>
              </label>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addPolicy}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Malpractice Insurance</span>
      </button>

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
