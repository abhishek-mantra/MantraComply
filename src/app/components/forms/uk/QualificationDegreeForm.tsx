import { useState } from "react";
import { UKFormButtons } from "./UKFormButtons";
import { Plus } from "lucide-react";

interface QualificationDegreeFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface Qualification {
  id: number;
  degree: string;
  institution: string;
  country: string;
  graduationDate: string;
  fieldOfStudy: string;
}

export function QualificationDegreeForm({ onNext, onBack }: QualificationDegreeFormProps) {
  const [qualifications, setQualifications] = useState<Qualification[]>([
    {
      id: 1,
      degree: "",
      institution: "",
      country: "",
      graduationDate: "",
      fieldOfStudy: "",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      {
        id: Date.now(),
        degree: "",
        institution: "",
        country: "",
        graduationDate: "",
        fieldOfStudy: "",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {qualifications.map((qualification, index) => (
        <div key={qualification.id} className="space-y-6">
          {index > 0 && <hr className="border-gray-200" />}
          {index > 0 && (
            <h3 className="text-lg font-medium text-gray-900">Qualification {index + 1}</h3>
          )}

          <div>
            <label htmlFor={`degree-${qualification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Highest Relevant Degree <span className="text-red-500">*</span>
            </label>
            <select
              id={`degree-${qualification.id}`}
              name={`degree-${qualification.id}`}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select degree...</option>
              <option value="bsc-psychology">BSc Psychology</option>
              <option value="ba-counselling">BA Counselling</option>
              <option value="msc-clinical-psychology">MSc Clinical Psychology</option>
              <option value="msc-psychotherapy">MSc Psychotherapy</option>
              <option value="msc-counselling">MSc Counselling</option>
              <option value="pgdip">PGDip</option>
              <option value="dclinpsy">DClinPsy (Doctorate)</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor={`institution-${qualification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`institution-${qualification.id}`}
              name={`institution-${qualification.id}`}
              required
              placeholder="e.g., University of Edinburgh"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`country-${qualification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Country of Study <span className="text-red-500">*</span>
            </label>
            <select
              id={`country-${qualification.id}`}
              name={`country-${qualification.id}`}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select country...</option>
              <option value="united-kingdom">United Kingdom</option>
              <option value="ireland">Ireland</option>
              <option value="other">Other (specify)</option>
            </select>
          </div>

          <div>
            <label htmlFor={`graduation-date-${qualification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`graduation-date-${qualification.id}`}
              name={`graduation-date-${qualification.id}`}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div>
            <label htmlFor={`field-of-study-${qualification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Field of Study <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              id={`field-of-study-${qualification.id}`}
              name={`field-of-study-${qualification.id}`}
              placeholder="e.g., Clinical Psychology"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree Certificate / Transcript <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-[#CBD5E0] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-3"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, JPG, or PNG (max 10MB)</p>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQualification}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Qualification
      </button>

      <UKFormButtons onBack={onBack} />
    </form>
  );
}