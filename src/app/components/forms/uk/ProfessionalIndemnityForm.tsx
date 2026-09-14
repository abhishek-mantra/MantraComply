import { useState } from "react";
import { UKFormButtons } from "./UKFormButtons";
import { AlertCircle, Plus } from "lucide-react";

interface ProfessionalIndemnityFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface InsurancePolicy {
  id: number;
  provider: string;
  policyNumber: string;
  coverageAmount: string;
  aggregateAmount: string;
  effectiveDate: string;
  expiryDate: string;
}

export function ProfessionalIndemnityForm({ onNext, onBack }: ProfessionalIndemnityFormProps) {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([
    {
      id: 1,
      provider: "",
      policyNumber: "",
      coverageAmount: "",
      aggregateAmount: "",
      effectiveDate: "",
      expiryDate: "",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addPolicy = () => {
    setPolicies([
      ...policies,
      {
        id: Date.now(),
        provider: "",
        policyNumber: "",
        coverageAmount: "",
        aggregateAmount: "",
        effectiveDate: "",
        expiryDate: "",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info Callout */}
      <div className="p-4 bg-[#EFF6FF] border-l-4 border-[#2563EB] rounded flex gap-3">
        <AlertCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">
          All UK therapists must maintain Professional Indemnity Insurance (equivalent to malpractice insurance). 
          This is required by all private insurers including Bupa, AXA Health, Aviva, and WPA.
        </p>
      </div>

      {policies.map((policy, index) => (
        <div key={policy.id} className="space-y-6">
          {index > 0 && <hr className="border-gray-200" />}
          {index > 0 && (
            <h3 className="text-lg font-medium text-gray-900">Insurance Policy {index + 1}</h3>
          )}

          <div>
            <label htmlFor={`provider-${policy.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`provider-${policy.id}`}
              name={`provider-${policy.id}`}
              required
              placeholder="e.g., Hiscox, Markel, BACP-affiliated insurer"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`policy-number-${policy.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`policy-number-${policy.id}`}
              name={`policy-number-${policy.id}`}
              required
              placeholder="Enter policy number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`coverage-amount-${policy.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Coverage Amount (per claim) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`coverage-amount-${policy.id}`}
              name={`coverage-amount-${policy.id}`}
              required
              placeholder="e.g., £1,000,000"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`aggregate-amount-${policy.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Aggregate Amount (annual) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`aggregate-amount-${policy.id}`}
              name={`aggregate-amount-${policy.id}`}
              required
              placeholder="e.g., £3,000,000"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`effective-date-${policy.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id={`effective-date-${policy.id}`}
                name={`effective-date-${policy.id}`}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label htmlFor={`expiry-date-${policy.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id={`expiry-date-${policy.id}`}
                name={`expiry-date-${policy.id}`}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificate of Professional Indemnity Insurance <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-[#CBD5E0] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-3"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, JPG, or PNG (max 10MB)</p>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addPolicy}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Insurance Policy
      </button>

      <UKFormButtons onBack={onBack} />
    </form>
  );
}