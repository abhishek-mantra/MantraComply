import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { MultiSelect } from "./MultiSelect";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function InsuranceForm({ onNext, onPrevious, isFirstStep, isLastStep }: FormProps) {
  const [currentPanels, setCurrentPanels] = useState<string[]>([]);
  const [desiredCarriers, setDesiredCarriers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      alert("Credentialing application submitted successfully! Our team will review your application and contact you within 3-5 business days.");
    }
    onNext();
  };

  const insuranceOptions = [
    "Aetna",
    "Cigna",
    "UnitedHealthcare",
    "Blue Cross Blue Shield",
    "Humana",
    "Oscar Health",
    "Anthem",
    "Medicare",
    "Medicaid",
    "Optum",
    "Magellan",
    "Tricare",
    "Kaiser Permanente"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-gray-700">
          Please indicate which insurance panels you are currently credentialed with (if any), and select which insurance carriers you'd like to credential with through Mantra.
        </p>
      </div>

      <MultiSelect
        label="Current Insurance Panels"
        options={insuranceOptions}
        value={currentPanels}
        onChange={setCurrentPanels}
        placeholder="Select insurance panels you're currently credentialed with"
      />

      <MultiSelect
        label="Desired Insurance Carriers"
        options={insuranceOptions}
        value={desiredCarriers}
        onChange={setDesiredCarriers}
        placeholder="Select insurance carriers you'd like to credential with"
        required
      />

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} isLastStep={isLastStep} />
    </form>
  );
}
