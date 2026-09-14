import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { CountrySwitcher } from "../CountrySwitcher";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";

interface FormProps {
  specialty: string;
  onNext: (data?: any) => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

export function NPIForm({
  onNext,
  onPrevious,
  isFirstStep,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange
}: FormProps) {
  const [specialty, setSpecialty] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [taxonomyCode, setTaxonomyCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass both specialty and doctor specialization
    onNext({
      specialty,
      selectedSpecialization: specialty === "doctor" ? doctorSpecialization : "",
      serviceType: selectedService
    });
  };

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
    "Hypertension",
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

  const doctorTaxonomyCodes: { [key: string]: { code: string; description: string } } = {
    "Cardiologist": { code: "207RC0000X", description: "Cardiovascular Disease" },
    "Dentist": { code: "122300000X", description: "Dentist" },
    "Dermatologist": { code: "207N00000X", description: "Dermatology" },
    "Endocrinologist": { code: "207RE0101X", description: "Endocrinology, Diabetes & Metabolism" },
    "ENT Specialist": { code: "207Y00000X", description: "Otolaryngology" },
    "Fertility / IVF Specialist": { code: "207VE0102X", description: "Reproductive Endocrinology" },
    "Gastroenterologist": { code: "207RG0100X", description: "Gastroenterology" },
    "General Physician": { code: "208D00000X", description: "General Practice" },
    "General Surgery": { code: "208600000X", description: "Surgery" },
    "Gynecologist": { code: "207VG0400X", description: "Gynecology" },
    "Hypertension": { code: "207RI0200X", description: "Internal Medicine - Hypertension Specialist" },
    "Nephrologist": { code: "207RN0300X", description: "Nephrology" },
    "Neurosurgeon": { code: "207T00000X", description: "Neurological Surgery" },
    "Oncologist": { code: "207RX0202X", description: "Medical Oncology" },
    "Ophthalmologist": { code: "207W00000X", description: "Ophthalmology" },
    "Orthopedician": { code: "207X00000X", description: "Orthopaedic Surgery" },
    "Paediatrician": { code: "208000000X", description: "Pediatrics" },
    "Pulmonologist (Lung)": { code: "207RP1001X", description: "Pulmonary Disease" },
    "Rheumatologist": { code: "207RR0500X", description: "Rheumatology" },
    "Sexologist": { code: "207Q00000X", description: "Family Medicine - Sexual Health" },
    "Urologist (Kidney & Urinary Tract)": { code: "208800000X", description: "Urology" }
  };

  const serviceOptions = {
    therapy: [
      { label: "Talk Therapy", value: "Talk Therapy" },
      { label: "Medication Management", value: "Medication Management" },
      { label: "Both", value: "Both" }
    ],
    doctor: [
      { label: "In-person Consultation", value: "In-person Consultation" },
      { label: "Telehealth", value: "Telehealth" },
      { label: "Both", value: "Both" }
    ],
    dietitian: [
      { label: "Medical Nutrition Therapy (MNT)", value: "Medical Nutrition Therapy (MNT)" }
    ],
    physiotherapy: [
      { label: "Physical Therapy (PT)", value: "Physical Therapy (PT)" }
    ],
  };

  const taxonomyCodes = {
    therapy: [
      { code: "101YP2500X", description: "Professional Counselor" },
      { code: "101YM0800X", description: "Mental Health Counselor" },
      { code: "106H00000X", description: "Marriage & Family Therapist" },
      { code: "1041C0700X", description: "Clinical Social Worker" },
      { code: "103TC0700X", description: "Clinical Psychologist" },
      { code: "103T00000X", description: "Psychologist (General)" }
    ],
    dietitian: [
      { code: "133V00000X", description: "Dietitian, Registered" },
      { code: "133N00000X", description: "Nutritionist" }
    ],
    physiotherapy: [
      { code: "225100000X", description: "Physical Therapist" },
      { code: "2251E1200X", description: "Physical Therapist, Ergonomics" },
      { code: "2251G0304X", description: "Physical Therapist, Geriatrics" },
      { code: "2251N0400X", description: "Physical Therapist, Neurology" },
      { code: "2251S0007X", description: "Physical Therapist, Sports" }
    ]
  };

  const getSpecialtyLabel = () => {
    if (specialty === "therapy") return "THERAPY (Mental & Behavioral Health)";
    if (specialty === "dietitian") return "DIETITIAN / NUTRITION";
    if (specialty === "physiotherapy") return "PHYSIOTHERAPY (Physical Therapy)";
    return "";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Select your service <span className="text-red-500">*</span>
        </label>
        <select
          value={specialty}
          onChange={(e) => {
            setSpecialty(e.target.value);
            setSelectedService("");
            setDoctorSpecialization("");
            setTaxonomyCode("");
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
        >
          <option value="">Select a service</option>
          <option value="therapy">Therapy</option>
          <option value="doctor">Doctor</option>
          <option value="dietitian">Dietitian</option>
          <option value="physiotherapy">Physiotherapy</option>
        </select>
      </div>

      {specialty === "doctor" && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Select Specialization <span className="text-red-500">*</span>
          </label>
          <select
            value={doctorSpecialization}
            onChange={(e) => {
              setDoctorSpecialization(e.target.value);
              const taxonomyData = doctorTaxonomyCodes[e.target.value];
              if (taxonomyData) {
                setTaxonomyCode(taxonomyData.code);
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
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

      {specialty && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Type 1 NPI <span className="text-red-500">*</span>
              <span className="ml-2 text-gray-400 cursor-help" title="Your National Provider Identifier (NPI) is a 10-digit number">
                ⓘ
              </span>
            </label>
            <input
              type="text"
              maxLength={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
              placeholder="Enter your 10-digit NPI number"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your National Provider Identifier (NPI) is a 10-digit number.
            </p>
            <ContextualHelpLink
              slug="why-npi-is-needed-and-how-to-find-it"
              label="Why NPI is needed and how to verify in NPPES"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Taxonomy Code <span className="text-red-500">*</span>
            </label>
            {specialty === "doctor" ? (
              <input
                type="text"
                value={taxonomyCode}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 text-sm"
                placeholder="Auto-filled when specialization is selected"
              />
            ) : (
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
              >
                <option value="">Select taxonomy code</option>
                {taxonomyCodes[specialty as keyof typeof taxonomyCodes]?.map((taxonomy) => (
                  <option key={taxonomy.code} value={taxonomy.code}>
                    {taxonomy.code} - {taxonomy.description}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Service Type <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {serviceOptions[specialty as keyof typeof serviceOptions]?.map((option) => (
                <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="serviceType"
                    value={option.value}
                    checked={selectedService === option.value}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="mr-3 w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
                  />
                  <span className="text-sm text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              If you don't have an NPI, you can register for an NPI{" "}
              <a href="https://nppes.cms.hhs.gov" target="_blank" rel="noopener noreferrer" className="text-[#2196F3] hover:underline">
                here
              </a>
            </p>
          </div>
        </>
      )}

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}