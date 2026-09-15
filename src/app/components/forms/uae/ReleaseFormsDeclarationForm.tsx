import { ProviderAgreementReleaseForm } from "../shared/ProviderAgreementReleaseForm";

interface ReleaseFormsDeclarationFormProps {
  specialty?: string;
  selectedSpecialization?: string;
  onNext: (data?: any) => void;
  onBack?: () => void;
  isLastStep?: boolean;
}

export function ReleaseFormsDeclarationForm({
  onNext,
  onBack,
  isLastStep = true,
  specialty,
  selectedSpecialization,
}: ReleaseFormsDeclarationFormProps) {
  return (
    <ProviderAgreementReleaseForm
      country="uae"
      specialty={specialty}
      selectedSpecialization={selectedSpecialization}
      onNext={onNext}
      onBack={onBack}
      isLastStep={isLastStep}
    />
  );
}
