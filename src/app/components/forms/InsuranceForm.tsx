import { useState } from "react";
import { Info } from "lucide-react";
import { FormButtons } from "./FormButtons";
import { MultiSelect } from "./MultiSelect";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";

interface InsuranceFormProps {
  specialty?: string;
  selectedSpecialization?: string;
  onNext: (data?: any) => void;
  onPrevious?: () => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export function InsuranceForm({
  onNext,
  onPrevious,
  onBack,
  isFirstStep = false,
  isLastStep = false,
}: InsuranceFormProps) {
  const [currentPanels, setCurrentPanels] = useState<string[]>(["None"]);
  const [desiredCarriers, setDesiredCarriers] = useState<string[]>([
    "Aetna",
    "Cigna",
    "UnitedHealthcare",
    "Blue Cross Blue Shield",
  ]);
  const [hasIAAccount, setHasIAAccount] = useState<string>("");
  const [hasOneHealthcareId, setHasOneHealthcareId] = useState<string>("");
  const [hasAvailityAccount, setHasAvailityAccount] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      alert(
        "Credentialing application submitted successfully! Our team will review your application and contact you within 3-5 business days."
      );
    }
    onNext({
      currentPanels,
      desiredCarriers,
      hasIAAccount,
      hasOneHealthcareId,
      hasAvailityAccount,
    });
  };

  const insuranceOptions = [
    "None",
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
    "Kaiser Permanente",
  ];

  const renderRadioCards = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    required: boolean = true
  ) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="space-y-3">
          {[
            { id: "Yes", label: "Yes" },
            { id: "No", label: "No" },
          ].map((option) => {
            const isSelected = value === option.id;
            return (
              <div
                key={option.id}
                onClick={() => onChange(option.id)}
                className={`w-full flex items-center px-4 py-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#2196F3] bg-[#F0F7FF] text-gray-900 font-medium shadow-sm"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                    isSelected ? "border-[#2196F3] bg-white" : "border-gray-300"
                  }`}
                >
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#2196F3]" />}
                </div>
                <span className="text-sm">{option.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Row 1: Current Insurance Panels & Desired Insurance Carriers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MultiSelect
          label="Current Insurance Panels"
          options={insuranceOptions}
          value={currentPanels}
          onChange={setCurrentPanels}
          placeholder="Select current panels..."
          helperText="Payors you are currently active and in-network with."
          required
        />

        <div>
          <MultiSelect
            label="Desired Insurance Carriers"
            options={insuranceOptions.filter((opt) => opt !== "None")}
            value={desiredCarriers}
            onChange={setDesiredCarriers}
            placeholder="Select desired carriers..."
            helperText="Choose all insurance payors you want to enroll or credential with"
            required
          />
          <ContextualHelpLink
            slug="choosing-commercial-vs-government-health-plans"
            label="Choosing commercial vs. government health plans for your practice"
          />
        </div>
      </div>

      {/* Row 2: I&A Account & One Healthcare ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderRadioCards("Do you have an I&A account?", hasIAAccount, setHasIAAccount)}
        {renderRadioCards(
          "Do you have a One Healthcare ID?",
          hasOneHealthcareId,
          setHasOneHealthcareId
        )}
      </div>

      {/* Row 3: Availity Account */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderRadioCards(
          "Do you have an Availity account?",
          hasAvailityAccount,
          setHasAvailityAccount
        )}
      </div>

      {/* Form Navigation Buttons */}
      <FormButtons
        onPrevious={onPrevious || onBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </form>
  );
}
