import { FormButtons } from "./FormButtons";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function CAQHUpdatesForm({ onNext, onPrevious, isFirstStep }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-medium text-gray-900 mb-2">Verify Your CAQH Profile is Current</h3>
        <p className="text-sm text-gray-700">
          Please confirm the following items are up to date in your CAQH profile:
        </p>
        <ContextualHelpLink
          slug="how-to-fill-out-caqh-in-2026"
          label="How to reach 100% CAQH completion & avoid 120-day attestation gaps"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mr-3 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
          />
          <span className="text-sm text-gray-700">W-9 Form is current and signed</span>
        </label>
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mr-3 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
          />
          <span className="text-sm text-gray-700">Attestation is signed within the last 120 days</span>
        </label>
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mr-3 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
          />
          <span className="text-sm text-gray-700">All sections are 100% complete</span>
        </label>
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            className="mr-3 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
          />
          <span className="text-sm text-gray-700">All required documents uploaded (licenses, certificates, etc.)</span>
        </label>
      </div>

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}