import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface PracticeInformationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

const THERAPEUTIC_APPROACHES = [
  "CBT",
  "ACT",
  "DBT",
  "Schema Therapy",
  "EMDR",
  "Psychodynamic",
  "Interpersonal Therapy",
  "Mindfulness-Based",
  "Other"
];

export function PracticeInformationForm({ onNext, onBack }: PracticeInformationFormProps) {
  const [practiceSetting, setPracticeSetting] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [clinicalSpecialties, setClinicalSpecialties] = useState<string[]>([]);
  const [therapeuticApproaches, setTherapeuticApproaches] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [ndisStatus, setNdisStatus] = useState("");
  const [ndisNumber, setNdisNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      practiceSetting,
      officePhone,
      clinicalSpecialties,
      therapeuticApproaches,
      languages,
      ndisStatus,
      ndisNumber
    });
  };

  const toggleTherapeuticApproach = (approach: string) => {
    setTherapeuticApproaches(prev =>
      prev.includes(approach)
        ? prev.filter(a => a !== approach)
        : [...prev, approach]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Practice Setting <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: "virtual", label: "Virtual / Telehealth Only" },
            { value: "physical", label: "Physical Office Location" },
            { value: "hybrid", label: "Hybrid (Both Virtual and Physical)" }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="practice-setting"
                value={option.value}
                required
                checked={practiceSetting === option.value}
                onChange={(e) => setPracticeSetting(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="office-phone" className="block text-sm font-medium text-gray-700 mb-2">
          Office Phone Number <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="tel"
          id="office-phone"
          name="office-phone"
          value={officePhone}
          onChange={(e) => setOfficePhone(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="clinical-specialties" className="block text-sm font-medium text-gray-700 mb-2">
          Clinical Specialties <span className="text-red-500">*</span>
        </label>
        <select
          id="clinical-specialties"
          name="clinical-specialties"
          multiple
          size={5}
          required
          onChange={(e) => {
            const options = e.target.selectedOptions;
            const values = Array.from(options).map(option => option.value);
            setClinicalSpecialties(values);
          }}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="anxiety">Anxiety Disorders</option>
          <option value="depression">Depression</option>
          <option value="trauma">Trauma & PTSD</option>
          <option value="relationships">Relationship Issues</option>
          <option value="grief">Grief & Loss</option>
          <option value="stress">Stress Management</option>
          <option value="adhd">ADHD</option>
          <option value="ocd">OCD</option>
          <option value="eating">Eating Disorders</option>
          <option value="addiction">Addiction</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple options
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Therapeutic Approaches <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {THERAPEUTIC_APPROACHES.map((approach) => (
            <label
              key={approach}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={therapeuticApproaches.includes(approach)}
                onChange={() => toggleTherapeuticApproach(approach)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded"
              />
              <span className="text-gray-900">{approach}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
          Languages Spoken Fluently <span className="text-red-500">*</span>
        </label>
        <select
          id="languages"
          name="languages"
          multiple
          size={5}
          required
          onChange={(e) => {
            const options = e.target.selectedOptions;
            const values = Array.from(options).map(option => option.value);
            setLanguages(values);
          }}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="english">English</option>
          <option value="mandarin">Mandarin</option>
          <option value="cantonese">Cantonese</option>
          <option value="arabic">Arabic</option>
          <option value="vietnamese">Vietnamese</option>
          <option value="italian">Italian</option>
          <option value="greek">Greek</option>
          <option value="spanish">Spanish</option>
          <option value="hindi">Hindi</option>
          <option value="punjabi">Punjabi</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple options
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          NDIS Registration <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: "registered", label: "Registered NDIS Provider" },
            { value: "not-registered", label: "Not NDIS Registered" }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="ndis-status"
                value={option.value}
                required
                checked={ndisStatus === option.value}
                onChange={(e) => setNdisStatus(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {ndisStatus === "registered" && (
        <div>
          <label htmlFor="ndis-number" className="block text-sm font-medium text-gray-700 mb-2">
            NDIS Provider Registration Number
          </label>
          <input
            type="text"
            id="ndis-number"
            name="ndis-number"
            value={ndisNumber}
            onChange={(e) => setNdisNumber(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          <p className="mt-1 text-sm text-gray-500">
            NDIS (National Disability Insurance Scheme) registration is separate from AHPRA and Medicare, but relevant for MantraComply matching.
          </p>
        </div>
      )}

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
