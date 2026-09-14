interface AustraliaFormButtonsProps {
  onBack?: () => void;
  isLastStep?: boolean;
}

export function AustraliaFormButtons({ onBack, isLastStep }: AustraliaFormButtonsProps) {
  return (
    <div className="flex justify-between pt-6">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
      ) : (
        <div />
      )}
      <button
        type="submit"
        className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
      >
        {isLastStep ? 'Submit Application' : 'Next'}
      </button>
    </div>
  );
}
