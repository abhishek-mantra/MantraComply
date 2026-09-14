import { UKFormButtons } from "./UKFormButtons";
import { AlertCircle } from "lucide-react";

interface InsurancePanelsFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function InsurancePanelsForm({ onNext, onBack }: InsurancePanelsFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info Callout */}
      <div className="p-4 bg-[#EFF6FF] border-l-4 border-[#2563EB] rounded flex gap-3">
        <AlertCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">
          Please indicate which UK private health insurers you are currently recognised by, 
          and select which ones you would like to credential with through MantraComply.
        </p>
      </div>

      <div>
        <label htmlFor="current-panels" className="block text-sm font-medium text-gray-700 mb-2">
          Current Insurance Panels <span className="text-gray-400">(optional)</span>
        </label>
        <select
          id="current-panels"
          name="current-panels"
          multiple
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[200px]"
        >
          <option value="bupa">Bupa</option>
          <option value="axa-health">AXA Health</option>
          <option value="aviva">Aviva</option>
          <option value="wpa">WPA (Western Provident Association)</option>
          <option value="vitality-health">Vitality Health</option>
          <option value="cigna-uk">Cigna (UK)</option>
          <option value="aetna-international">Aetna International</option>
          <option value="other">Other</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
      </div>

      <div>
        <label htmlFor="desired-panels" className="block text-sm font-medium text-gray-700 mb-2">
          Desired Insurance Panels <span className="text-red-500">*</span>
        </label>
        <select
          id="desired-panels"
          name="desired-panels"
          required
          multiple
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[200px]"
        >
          <option value="bupa">Bupa</option>
          <option value="axa-health">AXA Health</option>
          <option value="aviva">Aviva</option>
          <option value="wpa">WPA (Western Provident Association)</option>
          <option value="vitality-health">Vitality Health</option>
          <option value="cigna-uk">Cigna (UK)</option>
          <option value="aetna-international">Aetna International</option>
          <option value="other">Other</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
      </div>

      <UKFormButtons onBack={onBack} />
    </form>
  );
}