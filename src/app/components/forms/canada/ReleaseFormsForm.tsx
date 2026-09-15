import { ProviderAgreementReleaseForm } from "../shared/ProviderAgreementReleaseForm";

interface ReleaseFormsFormProps {
  specialty?: string;
  selectedSpecialization?: string;
  onNext: (data?: any) => void;
  onBack?: () => void;
  isLastStep?: boolean;
}

export function ReleaseFormsForm({ onNext, onBack, isLastStep = true, specialty, selectedSpecialization }: ReleaseFormsFormProps) {
  return (
    <ProviderAgreementReleaseForm
      country="canada"
      specialty={specialty}
      selectedSpecialization={selectedSpecialization}
      onNext={onNext}
      onBack={onBack}
      isLastStep={isLastStep}
    />
  );
}
