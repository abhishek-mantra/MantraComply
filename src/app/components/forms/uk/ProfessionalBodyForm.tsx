import { useState } from "react";
import { UKFormButtons } from "./UKFormButtons";
import { UK_SERVICE_CONFIG, UK_SERVICE_OPTIONS, type UKServiceType } from "../../../config/ukServiceConfig";

interface ProfessionalBodyFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  selectedService?: UKServiceType | "";
}

export function ProfessionalBodyForm({ onNext, onBack, selectedService: initialService }: ProfessionalBodyFormProps) {
  const [selectedService, setSelectedService] = useState<UKServiceType | "">(initialService || "");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const serviceConfig = selectedService ? UK_SERVICE_CONFIG[selectedService] : null;

  const doctorSpecializations = [
    "Cardiologist",
    "Dentist",
    "Dermatologist",
    "Endocrinologist",
    "ENT Specialist",
    "Fertility / IVF Specialist",
    "Gastroenterologist",
    "General Physician",
    "General Surgery",
    "Gynecologist",
    "Hypertension Specialist",
    "Nephrologist",
    "Neurosurgeon",
    "Oncologist",
    "Ophthalmologist",
    "Orthopedician",
    "Paediatrician",
    "Pulmonologist (Lung)",
    "Rheumatologist",
    "Sexologist",
    "Urologist (Kidney & Urinary Tract)"
  ];

  // Get professional bodies based on specialization for doctors
  const getProfessionalBodies = () => {
    if (selectedService !== "doctor" || !serviceConfig) {
      return serviceConfig?.professionalBodies || [];
    }

    const baseBodies = ["GMC (General Medical Council)", "RCP (Royal College of Physicians)", "RCS (Royal College of Surgeons)", "Other"];

    if (selectedSpecialization === "Dentist") {
      return ["GDC (General Dental Council)", ...baseBodies];
    } else if (selectedSpecialization === "Gynecologist" || selectedSpecialization === "Fertility / IVF Specialist") {
      return ["GMC (General Medical Council)", "RCOG (Royal College of Obstetricians and Gynaecologists)", "RCP (Royal College of Physicians)", "RCS (Royal College of Surgeons)", "Other"];
    } else if (selectedSpecialization === "Paediatrician") {
      return ["GMC (General Medical Council)", "RCPCH (Royal College of Paediatrics and Child Health)", "RCP (Royal College of Physicians)", "RCS (Royal College of Surgeons)", "Other"];
    }

    return baseBodies;
  };

  // Get service types based on specialization for doctors
  const getServiceTypes = () => {
    if (selectedService !== "doctor" || !serviceConfig) {
      return serviceConfig?.serviceTypes || [];
    }

    const baseTypes = ["In-Person Consultation", "Teleconsultation", "Both"];

    if (selectedSpecialization === "Dentist") {
      return ["Routine Dental Care", "Cosmetic Dentistry", "Oral Surgery"];
    } else if (["Cardiologist", "Oncologist", "Neurosurgeon", "General Surgery", "Orthopedician"].includes(selectedSpecialization)) {
      return [...baseTypes, "Surgical Procedures"];
    } else if (selectedSpecialization === "Fertility / IVF Specialist") {
      return [...baseTypes, "IVF & Assisted Reproduction"];
    }

    return baseTypes;
  };

  // Get registration number label based on specialization
  const getRegistrationLabel = () => {
    if (selectedService === "doctor" && selectedSpecialization === "Dentist") {
      return {
        label: "GDC Registration Number",
        helpText: "This is your unique number issued by the General Dental Council (GDC)."
      };
    } else if (selectedService === "doctor") {
      return {
        label: "GMC Registration Number",
        helpText: "This is your unique number issued by the General Medical Council (GMC)."
      };
    }
    return {
      label: "Registration / Membership Number",
      helpText: "This is the unique number issued by your professional body."
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onNext({
      specialty: selectedService,
      selectedService: selectedService,
      selectedSpecialization: selectedService === "doctor" ? selectedSpecialization : ""
    });
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value as UKServiceType | "");
    setSelectedSpecialization(""); // Reset specialization when service changes
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Selection */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Select your service <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={selectedService}
          onChange={handleServiceChange}
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select a service...</option>
          {UK_SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor Specialization */}
      {selectedService === "doctor" && (
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
            Select Specialization <span className="text-red-500">*</span>
          </label>
          <select
            id="specialization"
            name="specialization"
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="">Select specialization...</option>
            {doctorSpecializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Show remaining fields only when service is selected */}
      {selectedService && serviceConfig && (selectedService !== "doctor" || selectedSpecialization) && (
        <>
          {/* Primary Professional Body */}
          <div>
            <label htmlFor="professional-body" className="block text-sm font-medium text-gray-700 mb-2">
              Primary Professional Body <span className="text-red-500">*</span>
            </label>
            <select
              id="professional-body"
              name="professional-body"
              required
              defaultValue={selectedService === "doctor" ? "gmc-(general-medical-council)" : ""}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select professional body...</option>
              {getProfessionalBodies().map((body) => (
                <option key={body} value={body.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-')}>
                  {body}
                </option>
              ))}
            </select>
          </div>

          {/* Registration Number */}
          <div>
            <label htmlFor="registration-number" className="block text-sm font-medium text-gray-700 mb-2">
              {getRegistrationLabel().label} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="registration-number"
              name="registration-number"
              required
              placeholder="Enter your registration number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            <p className="mt-1 text-sm text-gray-500">{getRegistrationLabel().helpText}</p>
          </div>

          {/* Accreditation Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accreditation Level <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {serviceConfig.accreditationLevels.map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="accreditation-level"
                    value={level.toLowerCase().replace(/ /g, '-')}
                    required
                    className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-gray-900">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Registration Expiry Date */}
          <div>
            <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-2">
              Registration Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="expiry-date"
              name="expiry-date"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="MM/DD/YYYY"
            />
          </div>

          {/* Secondary Professional Body */}
          <div>
            <label htmlFor="secondary-body" className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Professional Body <span className="text-gray-400">(optional)</span>
            </label>
            <select
              id="secondary-body"
              name="secondary-body"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select secondary body (if applicable)...</option>
              {serviceConfig.professionalBodies.map((body) => (
                <option key={body} value={body.toLowerCase()}>
                  {body}
                </option>
              ))}
            </select>
          </div>

          {/* Secondary Registration Number */}
          <div>
            <label htmlFor="secondary-registration" className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Registration Number <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id="secondary-registration"
              name="secondary-registration"
              placeholder="Enter secondary registration number (if applicable)"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {getServiceTypes().map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="service-type"
                    value={type.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}
                    required
                    className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-gray-900">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="p-4 bg-blue-50 border-l-4 border-[#2563EB] rounded text-sm text-gray-700">
            If you are not yet registered with a professional body, {serviceConfig.helpTextLinks}.
          </div>
        </>
      )}

      <UKFormButtons onBack={onBack} />
    </form>
  );
}
