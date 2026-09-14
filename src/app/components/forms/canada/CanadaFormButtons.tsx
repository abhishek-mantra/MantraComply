interface CanadaFormButtonsProps {
  onBack?: () => void;
  submitText?: string;
}

export function CanadaFormButtons({ onBack, submitText = "Continue" }: CanadaFormButtonsProps) {
  return (
    <div className="flex gap-4 pt-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
      )}
      <button
        type="submit"
        className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e4fc2] transition-colors flex-1"
      >
        {submitText}
      </button>
    </div>
  );
}
