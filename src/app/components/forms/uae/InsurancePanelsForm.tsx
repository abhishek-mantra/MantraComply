import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface InsurancePanelsFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

const PMI_PROVIDERS = [
  "AXA Gulf",
  "Bupa Global / Bupa Arabia",
  "Allianz Care",
  "Cigna International",
  "Daman (National Health Insurance Company)",
  "MetLife",
  "Oman Insurance / Orient Insurance",
  "Noor Takaful",
  "Islamic Arab Insurance Co. (SALAMA)",
  "Other"
];

export function InsurancePanelsForm({ onNext, onBack }: InsurancePanelsFormProps) {
  const [currentCoverage, setCurrentCoverage] = useState<string[]>([]);
  const [desiredCoverage, setDesiredCoverage] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ currentCoverage, desiredCoverage });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          In the UAE, mental health coverage is primarily provided through international Private Medical Insurance (PMI) for expatriate employees, and through mandatory basic health insurance in Dubai and Abu Dhabi. Holding a valid DHA/DOH license automatically qualifies you for recognition by most PMI providers.
        </p>
      </div>

      <div>
        <label htmlFor="current-coverage" className="block text-sm font-medium text-gray-700 mb-2">
          Currently covered by <span className="text-gray-400">(optional)</span>
        </label>
        <select
          id="current-coverage"
          name="current-coverage"
          multiple
          size={10}
          onChange={(e) => {
            const options = e.target.selectedOptions;
            const values = Array.from(options).map(option => option.value);
            setCurrentCoverage(values);
          }}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {PMI_PROVIDERS.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple options
        </p>
      </div>

      <div>
        <label htmlFor="desired-coverage" className="block text-sm font-medium text-gray-700 mb-2">
          Desired PMI Coverage <span className="text-red-500">*</span>
        </label>
        <select
          id="desired-coverage"
          name="desired-coverage"
          multiple
          size={10}
          required
          onChange={(e) => {
            const options = e.target.selectedOptions;
            const values = Array.from(options).map(option => option.value);
            setDesiredCoverage(values);
          }}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {PMI_PROVIDERS.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple options
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700">
          If you need assistance with PMI provider enrollment or have questions about coverage requirements, our team can guide you through the process.
        </p>
      </div>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}
