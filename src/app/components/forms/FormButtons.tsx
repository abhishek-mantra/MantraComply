interface FormButtonsProps {
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep?: boolean;
}

export function FormButtons({ onPrevious, isFirstStep, isLastStep }: FormButtonsProps) {
  return (
    <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstStep}
          className={`px-6 py-2.5 rounded-md font-medium transition-all ${
            isFirstStep
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#2196F3] text-white rounded-md font-medium hover:bg-[#1976D2] transition-colors"
        >
          {isLastStep ? "Submit Application" : "Save and Continue"}
        </button>
      </div>
  );
}