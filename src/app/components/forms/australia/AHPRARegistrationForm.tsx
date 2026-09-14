import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";
import { CountrySwitcher } from "../../CountrySwitcher";

interface AHPRARegistrationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

const SERVICES = [
  "Psychology",
  "Social Work",
  "Counselling",
  "Mental Health Nursing",
  "Occupational Therapy"
];

const REGISTRATION_TYPES = [
  "General Registration",
  "Provisional Registration (under supervision)",
  "Non-Practising Registration",
  "Student Registration"
];

const ENDORSEMENTS = [
  "No Endorsement (General Registration only)",
  "Clinical Psychology",
  "Forensic Psychology",
  "Health Psychology",
  "Educational & Developmental Psychology",
  "Neuropsychology",
  "Organisational Psychology",
  "Sport & Exercise Psychology",
  "Community Psychology"
];

export function AHPRARegistrationForm({
  onNext,
  onBack,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange
}: AHPRARegistrationFormProps) {
  const [selectedService, setSelectedService] = useState("");
  const [ahpraNumber, setAhpraNumber] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const [endorsement, setEndorsement] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [cpdHours, setCpdHours] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ specialty: selectedService });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showCountrySwitcher && (
        <CountrySwitcher
          selectedCountry={selectedCountry || ""}
          onCountryChange={onCountryChange || (() => {})}
        />
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>AHPRA (Australian Health Practitioner Regulation Agency)</strong> is the national regulator for all registered health practitioners in Australia. AHPRA registration is mandatory to legally use the title 'Psychologist'.
        </p>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Select your service <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select a service...</option>
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ahpra-number" className="block text-sm font-medium text-gray-700 mb-2">
          AHPRA Registration Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="ahpra-number"
          name="ahpra-number"
          required
          value={ahpraNumber}
          onChange={(e) => setAhpraNumber(e.target.value)}
          placeholder="e.g., PSY0001234567"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
        <p className="mt-1 text-sm text-gray-500">
          Your AHPRA registration number is in the format PSY followed by 10 digits.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registration Type <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {REGISTRATION_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="registration-type"
                value={type}
                required
                checked={registrationType === type}
                onChange={(e) => setRegistrationType(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="endorsement" className="block text-sm font-medium text-gray-700 mb-2">
          Area of Practice Endorsement <span className="text-red-500">*</span>
        </label>
        <select
          id="endorsement"
          name="endorsement"
          required
          value={endorsement}
          onChange={(e) => setEndorsement(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select an endorsement...</option>
          {ENDORSEMENTS.map((end) => (
            <option key={end} value={end}>
              {end}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Clinical Psychologists attract a higher Medicare rebate than General Psychologists under the Better Access initiative.
        </p>
      </div>

      <div>
        <label htmlFor="renewal-date" className="block text-sm font-medium text-gray-700 mb-2">
          AHPRA Registration Renewal Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="renewal-date"
          name="renewal-date"
          required
          value={renewalDate}
          onChange={(e) => setRenewalDate(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 mb-2">
          AHPRA Registration Certificate <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
          <input
            type="file"
            id="certificate"
            name="certificate"
            required
            className="hidden"
            onChange={(e) => {}}
          />
          <label htmlFor="certificate" className="cursor-pointer">
            <div className="text-gray-600">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <span className="text-[#2563EB] font-medium">Upload a file</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="cpd-hours" className="block text-sm font-medium text-gray-700 mb-2">
          CPD Hours Completed (current registration year) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="cpd-hours"
          name="cpd-hours"
          required
          value={cpdHours}
          onChange={(e) => setCpdHours(e.target.value)}
          placeholder="e.g., 30"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
        <p className="mt-1 text-sm text-gray-500">
          AHPRA requires a minimum of 30 CPD hours per registration year.
        </p>
      </div>

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
