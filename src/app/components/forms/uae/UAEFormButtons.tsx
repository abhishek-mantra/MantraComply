interface UAEFormButtonsProps {
  onBack?: () => void;
  isLastStep?: boolean;
  submitDisabled?: boolean;
}

export function UAEFormButtons({ onBack, isLastStep, submitDisabled = false }: UAEFormButtonsProps) {
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
        disabled={submitDisabled}
        className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLastStep ? 'Submit UAE Credentialing Application' : 'Next'}
      </button>
    </div>
  );
}