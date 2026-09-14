import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface PrivateHealthInsuranceFundsFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

const HEALTH_FUNDS = [
  "Bupa Australia",
  "Medibank",
  "NIB",
  "HCF (Hospital Contribution Fund)",
  "AHM (Australian Health Management)",
  "CBHS",
  "HBF (WA only)",
  "GMHBA",
  "Westfund",
  "Other"
];

export function PrivateHealthInsuranceFundsForm({ onNext, onBack }: PrivateHealthInsuranceFundsFormProps) {
  const [currentProviders, setCurrentProviders] = useState<string[]>([]);
  const [desiredPanels, setDesiredPanels] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ currentProviders, desiredPanels });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          Australian private health insurance funds cover psychology services under 'extras' (ancillary) cover. You can only claim through private health insurance OR Medicare for the same session — not both.
        </p>
      </div>

      <div>
        <label htmlFor="current-providers" className="block text-sm font-medium text-gray-700 mb-2">
          Currently registered as a provider with <span className="text-gray-400">(optional)</span>
        </label>
        <select
          id="current-providers"
          name="current-providers"
          multiple
          size={10}
          onChange={(e) => {
            const options = e.target.selectedOptions;
            const values = Array.from(options).map(option => option.value);
            setCurrentProviders(values);
          }}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {HEALTH_FUNDS.map((fund) => (
            <option key={fund} value={fund}>
              {fund}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple options
        </p>
      </div>

      <div>
        <label htmlFor="desired-panels" className="block text-sm font-medium text-gray-700 mb-2">
          Desired Health Fund Panels <span className="text-red-500">*</span>
        </label>
        <select
          id="desired-panels"
          name="desired-panels"
          multiple
          size={10}
          required
          onChange={(e) => {
            const options = e.target.selectedOptions;
            const values = Array.from(options).map(option => option.value);
            setDesiredPanels(values);
          }}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {HEALTH_FUNDS.map((fund) => (
            <option key={fund} value={fund}>
              {fund}
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
          If you need assistance with private health insurance fund registration, our team can help guide you through the process for each fund.
        </p>
      </div>

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
