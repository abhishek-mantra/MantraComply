import { useState } from "react";
import { CanadaFormButtons } from "./CanadaFormButtons";
import { CountrySwitcher } from "../../CountrySwitcher";

interface ProvinceServiceFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland & Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

const PROFESSIONAL_TITLES: Record<string, string[]> = {
  "Ontario": [
    "Registered Psychotherapist (RP)",
    "RP (Qualifying)",
    "Registered Social Worker (RSW)",
    "Psychologist (C.Psych)",
    "Other"
  ],
  "British Columbia": [
    "Registered Clinical Counsellor (RCC)",
    "Registered Psychologist (R.Psych)",
    "Registered Social Worker",
    "Other"
  ],
  "Quebec": [
    "Psychologist (Ordre OPQ)",
    "Authorized Psychotherapist",
    "Other"
  ],
  "Alberta": [
    "Registered Psychologist (R.Psych)",
    "Counselling Therapist",
    "Registered Social Worker",
    "Other"
  ],
  "New Brunswick": [
    "Licensed Counselling Therapist",
    "Registered Psychologist",
    "Other"
  ],
  "Prince Edward Island": [
    "Licensed Counselling Therapist",
    "Registered Psychologist",
    "Other"
  ],
  "default": [
    "Registered Psychologist",
    "Canadian Certified Counsellor (CCC)",
    "Registered Social Worker",
    "Other"
  ]
};

const GOVERNING_COLLEGES: Record<string, Record<string, string>> = {
  "Ontario": {
    "Registered Psychotherapist (RP)": "College of Registered Psychotherapists of Ontario (CRPO)",
    "RP (Qualifying)": "College of Registered Psychotherapists of Ontario (CRPO)",
    "Registered Social Worker (RSW)": "Ontario College of Social Workers and Social Service Workers (OCSWSSW)",
    "Psychologist (C.Psych)": "College of Psychologists of Ontario (CPO)",
    "Other": "N/A"
  },
  "British Columbia": {
    "Registered Clinical Counsellor (RCC)": "BC Association of Clinical Counsellors (BCACC)",
    "Registered Psychologist (R.Psych)": "College of Psychologists of British Columbia (CPBC)",
    "Registered Social Worker": "BC College of Social Workers (BCCSW)",
    "Other": "N/A"
  },
  "Quebec": {
    "Psychologist (Ordre OPQ)": "Ordre des psychologues du Québec (OPQ)",
    "Authorized Psychotherapist": "Ordre des psychologues du Québec (OPQ)",
    "Other": "N/A"
  },
  "Alberta": {
    "Registered Psychologist (R.Psych)": "College of Alberta Psychologists (CAP)",
    "Counselling Therapist": "N/A",
    "Registered Social Worker": "Alberta College of Social Workers (ACSW)",
    "Other": "N/A"
  }
};

export function ProvinceServiceForm({
  onNext,
  onBack,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange
}: ProvinceServiceFormProps) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedTelehealthProvinces, setSelectedTelehealthProvinces] = useState<string[]>([]);

  const getTitles = (province: string) => {
    return PROFESSIONAL_TITLES[province] || PROFESSIONAL_TITLES["default"];
  };

  const getGoverningCollege = (province: string, title: string) => {
    const provinceColleges = GOVERNING_COLLEGES[province];
    if (!provinceColleges) return "N/A";
    return provinceColleges[title] || "N/A";
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedTitle(""); // Reset title when province changes
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(e.target.value);
  };

  const handleTelehealthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.selectedOptions;
    const values = Array.from(options).map(option => option.value);
    setSelectedTelehealthProvinces(values);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onNext({ specialty: selectedTitle });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showCountrySwitcher && (
        <CountrySwitcher
          selectedCountry={selectedCountry || ""}
          onCountryChange={onCountryChange || (() => {})}
        />
      )}

      <div>
        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
          Select your Province / Territory <span className="text-red-500">*</span>
        </label>
        <select
          id="province"
          name="province"
          required
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select a province...</option>
          {PROVINCES.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      {selectedProvince && (
        <div>
          <label htmlFor="professional-title" className="block text-sm font-medium text-gray-700 mb-2">
            Regulated Professional Title <span className="text-red-500">*</span>
          </label>
          <select
            id="professional-title"
            name="professional-title"
            required
            value={selectedTitle}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="">Select a title...</option>
            {getTitles(selectedProvince).map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedProvince && selectedTitle && (
        <div>
          <label htmlFor="governing-college" className="block text-sm font-medium text-gray-700 mb-2">
            Governing College
          </label>
          <input
            type="text"
            id="governing-college"
            name="governing-college"
            value={getGoverningCollege(selectedProvince, selectedTitle)}
            readOnly
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg bg-gray-50 text-gray-700"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Type <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {['Talk Therapy', 'Medication Management', 'Both'].map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="service-type"
                value={type.toLowerCase().replace(/ /g, '-')}
                required
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="telehealth-provinces" className="block text-sm font-medium text-gray-700 mb-2">
          Telehealth / Additional Provinces of Practice <span className="text-gray-400">(optional)</span>
        </label>
        <select
          id="telehealth-provinces"
          name="telehealth-provinces"
          multiple
          size={5}
          onChange={handleTelehealthChange}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {PROVINCES.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          If you provide services via telehealth to clients in other provinces, select all applicable provinces. 
          Each province may require separate registration.
        </p>
      </div>

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
