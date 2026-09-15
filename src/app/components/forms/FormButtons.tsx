import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormButtonsProps {
  onPrevious?: () => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  submitText?: string;
}

export function FormButtons({
  onPrevious,
  onBack,
  isFirstStep,
  isLastStep,
  submitText,
}: FormButtonsProps) {
  const handlePrevious = onPrevious || onBack;

  return (
    <div className="flex justify-between items-center pt-8 mt-6">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isFirstStep || !handlePrevious}
        className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isFirstStep || !handlePrevious
            ? "bg-gray-50 text-gray-300 border border-gray-200 cursor-not-allowed"
            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
        }`}
      >
        <ChevronLeft className="w-4 h-4 text-gray-500" />
        Back
      </button>

      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-7 py-2.5 bg-[#2196F3] text-white rounded-xl text-sm font-medium hover:bg-[#1976D2] active:bg-[#1565C0] shadow-sm transition-all"
      >
        {submitText || (isLastStep ? "Submit Application" : "Save and Continue")}
        <ChevronRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}