import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface AcademicCredentialsAttestationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface QualificationEntry {
  id: string;
  degree: string;
  degreeTitle: string;
  institution: string;
  country: string;
  graduationYear: string;
  mofaStatus: string;
  moeStatus: string;
}

const DEGREES = ["Bachelor's", "Master's", "Postgraduate Diploma", "Doctorate", "PhD", "Other"];

export function AcademicCredentialsAttestationForm({ onNext, onBack }: AcademicCredentialsAttestationFormProps) {
  const [qualifications, setQualifications] = useState<QualificationEntry[]>([
    { id: "1", degree: "", degreeTitle: "", institution: "", country: "", graduationYear: "", mofaStatus: "", moeStatus: "" }
  ]);

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      { id: Date.now().toString(), degree: "", degreeTitle: "", institution: "", country: "", graduationYear: "", mofaStatus: "", moeStatus: "" }
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>⚠ Foreign academic qualifications must be attested by (1) the UAE Ministry of Foreign Affairs (MoFA) AND (2) certified as equivalent by the UAE Ministry of Education (MoE). This is mandatory for all non-UAE qualifications.</strong>
        </p>
      </div>

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
              <option value="">Select degree...</option>
              {DEGREES.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={qual.degreeTitle}
              onChange={(e) => updateQualification(qual.id, "degreeTitle", e.target.value)}
              placeholder="e.g., MSc Clinical Psychology"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={qual.institution}
              onChange={(e) => updateQualification(qual.id, "institution", e.target.value)}
              placeholder="e.g., University of Edinburgh"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country of Institution <span className="text-red-500">*</span>
            </label>
            <select
              value={qual.country}
              onChange={(e) => updateQualification(qual.id, "country", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select country...</option>
              <option value="united-states">United States</option>
              <option value="united-kingdom">United Kingdom</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graduation Year <span className="text-red-500">*</span>
            </label>
            <select
              value={qual.graduationYear}
              onChange={(e) => updateQualification(qual.id, "graduationYear", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select year...</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree Certificate <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2563EB] transition-colors">
              <input type="file" id={`degree-cert-${qual.id}`} required className="hidden" />
              <label htmlFor={`degree-cert-${qual.id}`} className="cursor-pointer">
                <p className="text-sm text-gray-600">
                  <span className="text-[#2563EB] font-medium">Upload original degree certificate</span>
                </p>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Official Transcript <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2563EB] transition-colors">
              <input type="file" id={`transcript-${qual.id}`} required className="hidden" />
              <label htmlFor={`transcript-${qual.id}`} className="cursor-pointer">
                <p className="text-sm text-gray-600">
                  <span className="text-[#2563EB] font-medium">Upload transcript</span>
                </p>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MoFA Attestation Status <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {["Completed — I have MoFA attestation", "In Progress — Attestation is being processed", "Not Yet Started"].map((status) => (
                <label key={status} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name={`mofa-${qual.id}`}
                    value={status}
                    required
                    checked={qual.mofaStatus === status}
                    onChange={(e) => updateQualification(qual.id, "mofaStatus", e.target.value)}
                    className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-sm text-gray-900">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {qual.mofaStatus === "Completed — I have MoFA attestation" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MoFA Attested Degree Certificate
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2563EB] transition-colors">
                <input type="file" id={`mofa-cert-${qual.id}`} required className="hidden" />
                <label htmlFor={`mofa-cert-${qual.id}`} className="cursor-pointer">
                  <p className="text-sm text-gray-600">
                    <span className="text-[#2563EB] font-medium">Upload MoFA attested certificate</span>
                  </p>
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MoE Equivalency Certificate Status <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {["Completed — I have the MoE Equivalency Certificate", "In Progress", "Not Yet Started"].map((status) => (
                <label key={status} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name={`moe-${qual.id}`}
                    value={status}
                    required
                    checked={qual.moeStatus === status}
                    onChange={(e) => updateQualification(qual.id, "moeStatus", e.target.value)}
                    className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-sm text-gray-900">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {qual.moeStatus === "Completed — I have the MoE Equivalency Certificate" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MoE Equivalency Certificate
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2563EB] transition-colors">
                <input type="file" id={`moe-cert-${qual.id}`} required className="hidden" />
                <label htmlFor={`moe-cert-${qual.id}`} className="cursor-pointer">
                  <p className="text-sm text-gray-600">
                    <span className="text-[#2563EB] font-medium">Upload MoE equivalency certificate</span>
                  </p>
                </label>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500">
            MoE Equivalency assessment can be initiated at: https://www.moe.gov.ae/. This process typically takes 4–12 weeks.
          </p>
        </div>
      ))}

      <button
        type="button"
        onClick={addQualification}
        className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
      >
        + Add Qualification
      </button>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}
