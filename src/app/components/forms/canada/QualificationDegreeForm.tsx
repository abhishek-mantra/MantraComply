import { useState } from "react";
import { Plus, X } from "lucide-react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface Qualification {
  degree: string;
  institution: string;
  provinceCountry: string;
  graduationDate: string;
  fieldOfStudy: string;
}

interface QualificationDegreeFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
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
  "Other Country",
];

const DEGREES = [
  "BA",
  "BSc",
  "BEd (Social Work)",
  "BA (Hons)",
  "MA",
  "MSc",
  "MEd",
  "MFT",
  "PhD",
  "PsyD",
  "Other"
];

export function QualificationDegreeForm({ onNext, onBack }: QualificationDegreeFormProps) {
  const [qualifications, setQualifications] = useState<Qualification[]>([
    { degree: "", institution: "", provinceCountry: "", graduationDate: "", fieldOfStudy: "" }
  ]);

  const addQualification = () => {
    setQualifications([...qualifications, { degree: "", institution: "", provinceCountry: "", graduationDate: "", fieldOfStudy: "" }]);
  };

  const removeQualification = (index: number) => {
    if (qualifications.length > 1) {
      setQualifications(qualifications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {qualifications.map((qualification, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-6 relative">
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeQualification(index)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {qualifications.length > 1 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Qualification {index + 1}</h3>
            </div>
          )}

          <div>
            <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Highest Relevant Degree <span className="text-red-500">*</span>
            </label>
            <select
              id={`degree-${index}`}
              name={`degree-${index}`}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select degree...</option>
              {DEGREES.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`institution-${index}`}
              name={`institution-${index}`}
              required
              placeholder="e.g., University of Toronto"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`province-country-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Province / Country of Institution <span className="text-red-500">*</span>
            </label>
            <select
              id={`province-country-${index}`}
              name={`province-country-${index}`}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select province/country...</option>
              {PROVINCES.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`graduation-date-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id={`graduation-date-${index}`}
              name={`graduation-date-${index}`}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`field-of-study-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Field of Study <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id={`field-of-study-${index}`}
              name={`field-of-study-${index}`}
              placeholder="e.g., Clinical Psychology"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`degree-certificate-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Degree Certificate / Official Transcript <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-[#CBD5E0] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
              <input
                type="file"
                id={`degree-certificate-${index}`}
                name={`degree-certificate-${index}`}
                required
                className="hidden"
              />
              <label htmlFor={`degree-certificate-${index}`} className="cursor-pointer">
                <div className="text-gray-600 mb-2">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="text-[#2563EB] font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (max. 10MB)</p>
              </label>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQualification}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Qualification</span>
      </button>

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
