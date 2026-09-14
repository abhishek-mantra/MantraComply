interface UKFormButtonsProps {
  onBack?: () => void;
  submitText?: string;
}

export function UKFormButtons({ onBack, submitText }: UKFormButtonsProps) {
  return (
    <div className="flex justify-between pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onBack}
        disabled={!onBack}
        className={`px-6 py-2.5 rounded-md font-medium transition-all ${
          !onBack
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        Back
      </button>
      <button
        type="submit"
        className="px-6 py-2.5 bg-[#2563EB] text-white rounded-md font-medium hover:bg-[#1d4ed8] transition-colors"
      >
        {submitText || "Save and Continue"}
      </button>
    </div>
  );
}
