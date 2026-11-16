import { ChevronLeft, ChevronRight } from "lucide-react";

interface IndiaFormButtonsProps {
  onBack?: () => void;
  onPrevious?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  submitText?: string;
  isSubmitting?: boolean;
}

export function IndiaFormButtons({
  onBack,
  onPrevious,
  isFirstStep = false,
  isLastStep = false,
  submitText,
  isSubmitting = false,
}: IndiaFormButtonsProps) {
  const handleBack = onBack || onPrevious;

  return (
    <div className="flex justify-between items-center pt-8 mt-6 border-t border-gray-100">
      {!isFirstStep && handleBack ? (
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-400 shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-1.5 px-8 py-2.5 bg-[#2196F3] text-white rounded-xl text-sm font-medium hover:bg-[#1976D2] active:bg-[#1565C0] shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitText || (isLastStep ? "Submit Application" : "Save")}
        {!isLastStep && <ChevronRight className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
}
