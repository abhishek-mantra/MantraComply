import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";
import { UAE_SERVICE_OPTIONS, DOCTOR_SPECIALIZATIONS, type UAEServiceType } from "../../../config/uaeServiceConfig";

interface ServiceSelectionFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  selectedService?: UAEServiceType | "";
  doctorSpecialization?: string;
}

export function ServiceSelectionForm({
  onNext,
  onBack,
  selectedService: initialService,
  doctorSpecialization: initialSpecialization
}: ServiceSelectionFormProps) {
  const [selectedService, setSelectedService] = useState<UAEServiceType | "">(initialService || "");
  const [doctorSpecialization, setDoctorSpecialization] = useState<string>(initialSpecialization || "");
  const [otherSpecialization, setOtherSpecialization] = useState("");

  const handleServiceChange = (service: UAEServiceType | "") => {
    setSelectedService(service);
    // Reset specialization when changing service
    if (service !== "doctor") {
      setDoctorSpecialization("");
      setOtherSpecialization("");
    }
  };

  const handleSpecializationChange = (specialization: string) => {
    setDoctorSpecialization(specialization);
    if (specialization !== "Other") {
      setOtherSpecialization("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedService === "doctor") {
      const finalSpecialization = doctorSpecialization === "Other" ? otherSpecialization : doctorSpecialization;
      if (selectedService && finalSpecialization) {
        onNext({ selectedService, doctorSpecialization: finalSpecialization });
      }
    } else if (selectedService) {
      onNext({ selectedService });
    }
  };

  const isFormValid = () => {
    if (!selectedService) return false;
    if (selectedService === "doctor") {
      if (!doctorSpecialization) return false;
      if (doctorSpecialization === "Other" && !otherSpecialization) return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700">
          <strong>Select your primary healthcare service.</strong> This will customize the credentialing requirements and regulatory information specific to your profession.
        </p>
      </div>

      {/* Service Selection Dropdown */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Select your service <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={selectedService}
          onChange={(e) => handleServiceChange(e.target.value as UAEServiceType | "")}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select service...</option>
          {UAE_SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Specialization Dropdown - Only shown for doctors */}
      {selectedService === "doctor" && (
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
            Select Specialization <span className="text-red-500">*</span>
          </label>
          <select
            id="specialization"
            name="specialization"
            required
            value={doctorSpecialization}
            onChange={(e) => handleSpecializationChange(e.target.value)}
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="">Select specialization...</option>
            {DOCTOR_SPECIALIZATIONS.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Other Specialization Text Input */}
      {selectedService === "doctor" && doctorSpecialization === "Other" && (
        <div>
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

      <UAEFormButtons onBack={onBack} isLastStep={false} submitDisabled={!isFormValid()} />
    </form>
  );
}