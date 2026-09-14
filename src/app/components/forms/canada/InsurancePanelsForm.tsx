import { AlertCircle } from "lucide-react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface InsurancePanelsFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

const CANADIAN_INSURERS = [
  "Sun Life Financial",
  "Manulife",
  "Canada Life (Great-West Life)",
  "Blue Cross (Alberta)",
  "Blue Cross (Ontario)",
  "Blue Cross (Quebec)",
  "Blue Cross (Atlantic)",
  "Blue Cross (Pacific)",
  "Desjardins Insurance",
  "Equitable Life of Canada",
  "Green Shield Canada",
  "Industrial Alliance (iA Financial)",
  "Co-operators",
  "Other"
];

export function InsurancePanelsForm({ onNext, onBack }: InsurancePanelsFormProps) {
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
            Please indicate which Canadian extended health benefit providers you currently direct bill to, 
            and select which ones you would like to credential with through MantraComply.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="current-panels" className="block text-sm font-medium text-gray-700 mb-2">
          Currently Direct Billing To <span className="text-gray-400">(optional)</span>
        </label>
        <select
          id="current-panels"
          name="current-panels"
          multiple
          size={10}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {CANADIAN_INSURERS.map((insurer) => (
            <option key={insurer} value={insurer.toLowerCase().replace(/ \(/g, '-').replace(/\)/g, '').replace(/ /g, '-')}>
              {insurer}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Cmd/Ctrl to select multiple options</p>
      </div>

      <div>
        <label htmlFor="desired-panels" className="block text-sm font-medium text-gray-700 mb-2">
          Desired Insurance Panels <span className="text-red-500">*</span>
        </label>
        <select
          id="desired-panels"
          name="desired-panels"
          multiple
          size={10}
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {CANADIAN_INSURERS.map((insurer) => (
            <option key={insurer} value={insurer.toLowerCase().replace(/ \(/g, '-').replace(/\)/g, '').replace(/ /g, '-')}>
              {insurer}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Cmd/Ctrl to select multiple options</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">Need Help?</h3>
            <p className="text-sm text-blue-800">
              If you're unsure which insurance panels to select, contact our credentialing specialists at 
              support@mantracomplly.com for guidance.
            </p>
          </div>
        </div>
      </div>

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
