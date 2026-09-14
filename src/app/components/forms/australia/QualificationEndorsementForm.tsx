import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface QualificationEndorsementFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface QualificationEntry {
  id: string;
  degree: string;
  institution: string;
  state: string;
  graduationDate: string;
  fieldOfStudy: string;
}

const DEGREES = [
  "BBSc",
  "BA Psychology",
  "BSc (Hons) Psychology",
  "MA Clinical Psychology",
  "MPsych (Clinical)",
  "MPsych (Forensic)",
  "MPsych (Health)",
  "MPsych (Organisational)",
  "MPsych (Educational)",
  "DClinPsy",
  "PhD (Psychology)",
  "Other"
];

const AUSTRALIAN_STATES = [
  "ACT",
  "NSW",
  "NT",
  "QLD",
  "SA",
  "TAS",
  "VIC",
  "WA",
  "Overseas"
];

export function QualificationEndorsementForm({ onNext, onBack }: QualificationEndorsementFormProps) {
  const [qualifications, setQualifications] = useState<QualificationEntry[]>([
    { id: "1", degree: "", institution: "", state: "", graduationDate: "", fieldOfStudy: "" }
  ]);

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      { id: Date.now().toString(), degree: "", institution: "", state: "", graduationDate: "", fieldOfStudy: "" }
    ]);
  };

  const removeQualification = (id: string) => {
    if (qualifications.length > 1) {
      setQualifications(qualifications.filter(q => q.id !== id));
    }
  };

  const updateQualification = (id: string, field: keyof QualificationEntry, value: string) => {
    setQualifications(qualifications.map(q =>
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ qualifications });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {qualifications.map((qual, index) => (
        <div key={qual.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-900">
              Qualification {index + 1}
            </h3>
            {qualifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeQualification(qual.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highest Relevant Degree <span className="text-red-500">*</span>
            </label>
            <select
              value={qual.degree}
              onChange={(e) => updateQualification(qual.id, "degree", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select a degree...</option>
              {DEGREES.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={qual.institution}
              onChange={(e) => updateQualification(qual.id, "institution", e.target.value)}
              placeholder="e.g., University of Melbourne"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State of Institution <span className="text-red-500">*</span>
            </label>
            <select
              value={qual.state}
              onChange={(e) => updateQualification(qual.id, "state", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select a state...</option>
              {AUSTRALIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={qual.graduationDate}
              onChange={(e) => updateQualification(qual.id, "graduationDate", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field of Study <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={qual.fieldOfStudy}
              onChange={(e) => updateQualification(qual.id, "fieldOfStudy", e.target.value)}
              placeholder="e.g., Clinical Psychology"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree Certificate / Official Transcript <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
              <input
                type="file"
                id={`certificate-${qual.id}`}
                name={`certificate-${qual.id}`}
                required
                className="hidden"
              />
              <label htmlFor={`certificate-${qual.id}`} className="cursor-pointer">
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
        </div>
      ))}

      <button
        type="button"
        onClick={addQualification}
        className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
      >
        + Add Qualification
      </button>

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
