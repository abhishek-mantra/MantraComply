import { ProviderAgreementReleaseForm } from "./shared/ProviderAgreementReleaseForm";

interface FormProps {
  specialty?: string;
  selectedSpecialization?: string;
  onNext: (data?: any) => void;
  onPrevious?: () => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  selectedCountry?: string;
}

export function ReleaseFormsForm({
  specialty,
  selectedSpecialization,
  onNext,
  onPrevious,
  onBack,
  isFirstStep = false,
  isLastStep = true,
  selectedCountry = "us",
}: FormProps) {
  return (
    <ProviderAgreementReleaseForm
      country={selectedCountry || "us"}
      specialty={specialty}
      selectedSpecialization={selectedSpecialization}
      onNext={onNext}
      onPrevious={onPrevious}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
    />
  );
}