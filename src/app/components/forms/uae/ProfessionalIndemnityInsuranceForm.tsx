import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface ProfessionalIndemnityInsuranceFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface InsurancePolicy {
  id: string;
  provider: string;
  policyNumber: string;
  coverageAmount: string;
  aggregateAmount: string;
  effectiveDate: string;
  expiryDate: string;
}

export function ProfessionalIndemnityInsuranceForm({ onNext, onBack }: ProfessionalIndemnityInsuranceFormProps) {
  const [arrangement, setArrangement] = useState("");
  const [employerProvider, setEmployerProvider] = useState("");
  const [employerPolicyNumber, setEmployerPolicyNumber] = useState("");
  const [policies, setPolicies] = useState<InsurancePolicy[]>([
    { id: "1", provider: "", policyNumber: "", coverageAmount: "", aggregateAmount: "", effectiveDate: "", expiryDate: "" }
  ]);

  const addPolicy = () => {
    setPolicies([...policies, { id: Date.now().toString(), provider: "", policyNumber: "", coverageAmount: "", aggregateAmount: "", effectiveDate: "", expiryDate: "" }]);
  };

  const removePolicy = (id: string) => {
    if (policies.length > 1) setPolicies(policies.filter(p => p.id !== id));
  };

  const updatePolicy = (id: string, field: keyof InsurancePolicy, value: string) => {
    setPolicies(policies.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ arrangement, policies });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          In the UAE, professional indemnity insurance is typically provided by the employer/facility. If you are self-employed or operating independently, you must obtain your own coverage.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Arrangement <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {[
            "Employer-provided — My facility covers me under their policy",
            "Individual policy — I maintain my own indemnity insurance"
          ].map(option => (
            <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="arrangement" value={option} required checked={arrangement === option} onChange={(e) => setArrangement(e.target.value)} className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]" />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {arrangement === "Employer-provided — My facility covers me under their policy" && (
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div>
            <label htmlFor="employer-provider" className="block text-sm font-medium text-gray-700 mb-2">Employer Insurance Provider</label>
            <input type="text" id="employer-provider" required value={employerProvider} onChange={(e) => setEmployerProvider(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="employer-policy" className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
            <input type="text" id="employer-policy" required value={employerPolicyNumber} onChange={(e) => setEmployerPolicyNumber(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="confirmation-letter" className="block text-sm font-medium text-gray-700 mb-2">Facility Coverage Confirmation Letter</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2563EB] transition-colors">
              <input type="file" id="confirmation-letter" required className="hidden" />
              <label htmlFor="confirmation-letter" className="cursor-pointer">
                <p className="text-sm text-gray-600"><span className="text-[#2563EB] font-medium">Upload confirmation letter</span></p>
              </label>
            </div>
          </div>
        </div>
      )}

      {arrangement === "Individual policy — I maintain my own indemnity insurance" && (
        <>
          {policies.map((policy, index) => (
            <div key={policy.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Insurance Policy {index + 1}</h3>
                {policies.length > 1 && (
                  <button type="button" onClick={() => removePolicy(policy.id)} className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider Name <span className="text-red-500">*</span></label>
                <input type="text" value={policy.provider} onChange={(e) => updatePolicy(policy.id, "provider", e.target.value)} placeholder="e.g., AXA Gulf, Allianz, RSA" required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number <span className="text-red-500">*</span></label>
                <input type="text" value={policy.policyNumber} onChange={(e) => updatePolicy(policy.id, "policyNumber", e.target.value)} required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount (per claim) <span className="text-red-500">*</span></label>
                <input type="text" value={policy.coverageAmount} onChange={(e) => updatePolicy(policy.id, "coverageAmount", e.target.value)} placeholder="e.g., AED 5,000,000" required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aggregate Amount <span className="text-red-500">*</span></label>
                <input type="text" value={policy.aggregateAmount} onChange={(e) => updatePolicy(policy.id, "aggregateAmount", e.target.value)} required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Effective Date <span className="text-red-500">*</span></label>
                  <input type="date" value={policy.effectiveDate} onChange={(e) => updatePolicy(policy.id, "effectiveDate", e.target.value)} required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date <span className="text-red-500">*</span></label>
                  <input type="date" value={policy.expiryDate} onChange={(e) => updatePolicy(policy.id, "expiryDate", e.target.value)} required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate of Insurance <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2563EB] transition-colors">
                  <input type="file" id={`cert-${policy.id}`} required className="hidden" />
                  <label htmlFor={`cert-${policy.id}`} className="cursor-pointer">
                    <p className="text-sm text-gray-600"><span className="text-[#2563EB] font-medium">Upload certificate</span></p>
                  </label>
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addPolicy} className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors">+ Add Insurance Policy</button>
        </>
      )}

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}
