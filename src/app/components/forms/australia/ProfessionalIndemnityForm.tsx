import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface ProfessionalIndemnityFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface InsuranceEntry {
  id: string;
  provider: string;
  policyNumber: string;
  coverageAmount: string;
  aggregateAmount: string;
  effectiveDate: string;
  expiryDate: string;
}

export function ProfessionalIndemnityForm({ onNext, onBack }: ProfessionalIndemnityFormProps) {
  const [insurancePolicies, setInsurancePolicies] = useState<InsuranceEntry[]>([
    { id: "1", provider: "", policyNumber: "", coverageAmount: "", aggregateAmount: "", effectiveDate: "", expiryDate: "" }
  ]);

  const addInsurancePolicy = () => {
    setInsurancePolicies([
      ...insurancePolicies,
      { id: Date.now().toString(), provider: "", policyNumber: "", coverageAmount: "", aggregateAmount: "", effectiveDate: "", expiryDate: "" }
    ]);
  };

  const removeInsurancePolicy = (id: string) => {
    if (insurancePolicies.length > 1) {
      setInsurancePolicies(insurancePolicies.filter(p => p.id !== id));
    }
  };

  const updateInsurancePolicy = (id: string, field: keyof InsuranceEntry, value: string) => {
    setInsurancePolicies(insurancePolicies.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ insurancePolicies });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          All AHPRA-registered practitioners must maintain professional indemnity insurance. Common providers include MIGA, BMS Group, Guild Insurance, and Aon.
        </p>
      </div>

      {insurancePolicies.map((policy, index) => (
        <div key={policy.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-900">
              Insurance Policy {index + 1}
            </h3>
            {insurancePolicies.length > 1 && (
              <button
                type="button"
                onClick={() => removeInsurancePolicy(policy.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={policy.provider}
              onChange={(e) => updateInsurancePolicy(policy.id, "provider", e.target.value)}
              placeholder="e.g., MIGA, BMS Group, Guild Insurance"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={policy.policyNumber}
              onChange={(e) => updateInsurancePolicy(policy.id, "policyNumber", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coverage Amount (per claim) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={policy.coverageAmount}
              onChange={(e) => updateInsurancePolicy(policy.id, "coverageAmount", e.target.value)}
              placeholder="e.g., $20,000,000"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            <p className="mt-1 text-sm text-gray-500">
              Note: Australian amounts in AUD
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aggregate Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={policy.aggregateAmount}
              onChange={(e) => updateInsurancePolicy(policy.id, "aggregateAmount", e.target.value)}
              placeholder="e.g., $20,000,000"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={policy.effectiveDate}
                onChange={(e) => updateInsurancePolicy(policy.id, "effectiveDate", e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={policy.expiryDate}
                onChange={(e) => updateInsurancePolicy(policy.id, "expiryDate", e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificate of Currency <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
              <input
                type="file"
                id={`certificate-${policy.id}`}
                name={`certificate-${policy.id}`}
                required
                className="hidden"
              />
              <label htmlFor={`certificate-${policy.id}`} className="cursor-pointer">
                <div className="text-gray-600">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="text-[#2563EB] font-medium">Upload a file</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addInsurancePolicy}
        className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
      >
        + Add Insurance Policy
      </button>

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
