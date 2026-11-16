import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { IndiaFormButtons } from "./IndiaFormButtons";

interface FinalConsentFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
}

export function FinalConsentForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = false,
}: FinalConsentFormProps) {
  // TODO: Once the official Final Consent screen PDF or video is provided,
  // replace this placeholder with the exact declaration checkboxes and signature fields.
  const [acknowledged, setAcknowledged] = useState(initialData?.acknowledged || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      acknowledged,
      submittedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Final Consent</h3>
      </div>

      {/* Amber Placeholder Box per Spec */}
      <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <div className="text-sm font-semibold text-amber-900">
              Placeholder — Content Pending
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              The Final Consent screen was not in the reference files provided, so its content is
              not replicated yet. Send a PDF or screenshot of this step and it will be filled in.
            </p>
            <div className="text-[11px] font-mono text-amber-700 bg-amber-100/60 p-2 rounded-lg">
              TODO: Wire official consent terms, declaration checkboxes, authorized signatory
              designation, and digital sign-off once reference assets are provided.
            </div>
          </div>
        </div>
      </div>

      {/* Temporary acknowledgment checkbox to allow completing the wizard in dev/staging */}
      <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl bg-white cursor-pointer hover:bg-gray-50 transition-colors">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          className="w-4 h-4 text-[#2196F3] rounded border-gray-300 focus:ring-[#2196F3] mt-0.5"
        />
        <div className="text-xs text-gray-700 leading-relaxed">
          <span className="font-medium text-gray-900">Acknowledge draft completion:</span> I confirm
          that all information submitted across Steps 1 through 8 is accurate and ready for GIC
          empanelment review.
        </div>
      </label>

      <IndiaFormButtons
        onBack={onBack}
        isFirstStep={isFirstStep}
        isLastStep={true}
        submitText="Submit Application"
      />
    </form>
  );
}
