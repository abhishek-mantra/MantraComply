import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";
import { DOCTOR_SPECIALIZATIONS } from "../../../config/uaeServiceConfig";

interface SpecializationSelectionFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  doctorSpecialization?: string;
}

export function SpecializationSelectionForm({
  onNext,
  onBack,
  doctorSpecialization: initialSpecialization
}: SpecializationSelectionFormProps) {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>(initialSpecialization || "");
  const [otherSpecialization, setOtherSpecialization] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specialization = selectedSpecialization === "Other" ? otherSpecialization : selectedSpecialization;
    if (specialization) {
      onNext({ doctorSpecialization: specialization });
    }
  };

  const handleSpecializationSelect = (specialization: string) => {
    setSelectedSpecialization(specialization);
    if (specialization !== "Other") {
      setOtherSpecialization("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700">
          Your specialization determines the specific licensing pathway, exam requirements, and documentation needed for your UAE health authority application.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {DOCTOR_SPECIALIZATIONS.map((specialization) => (
          <button
            key={specialization}
            type="button"
            onClick={() => handleSpecializationSelect(specialization)}
            className={`text-left p-4 border-2 rounded-lg transition-all ${
              selectedSpecialization === specialization
                ? "border-[#2196F3] bg-blue-50"
                : "border-gray-200 hover:border-[#2196F3] hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-900">{specialization}</h3>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedSpecialization === specialization
                    ? "border-[#2196F3] bg-[#2196F3]"
                    : "border-gray-300"
                }`}
              >
                {selectedSpecialization === specialization && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Other Specialization Text Input */}
      {selectedSpecialization === "Other" && (
        <div className="mt-4">
          <label htmlFor="other-specialization" className="block text-sm font-medium text-gray-700 mb-2">
            Please specify your specialization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="other-specialization"
            name="other-specialization"
            required
            value={otherSpecialization}
            onChange={(e) => setOtherSpecialization(e.target.value)}
            placeholder="Enter your specialization"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      )}

      <UAEFormButtons
        onBack={onBack}
        isLastStep={false}
        submitDisabled={!selectedSpecialization || (selectedSpecialization === "Other" && !otherSpecialization)}
      />
    </form>
  );
}
