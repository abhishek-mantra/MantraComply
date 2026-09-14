import { useState } from "react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface PracticeInformationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

const SPECIALTIES = [
  "Anxiety",
  "Depression",
  "Trauma & PTSD",
  "Relationship Issues",
  "Grief",
  "Addiction",
  "Eating Disorders",
  "OCD",
  "Autism",
  "ADHD",
  "Child & Adolescent",
  "Couples",
  "Family",
  "Other"
];

const APPROACHES = [
  "CBT",
  "DBT",
  "ACT",
  "EMDR",
  "Psychodynamic",
  "Narrative",
  "Solution-Focused",
  "EFT",
  "Mindfulness-Based",
  "Other"
];

const LANGUAGES = [
  "English",
  "French",
  "Mandarin",
  "Spanish",
  "Punjabi",
  "Cantonese",
  "Arabic",
  "Tagalog",
  "Italian",
  "German",
  "Portuguese",
  "Hindi",
  "Korean",
  "Other"
];

export function PracticeInformationForm({ onNext, onBack }: PracticeInformationFormProps) {
  const [practiceSetting, setPracticeSetting] = useState("");
  const [directBilling, setDirectBilling] = useState("");
  const [telusRegistered, setTelusRegistered] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Practice Setting <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'virtual', label: 'Virtual / Telehealth Only' },
            { value: 'physical', label: 'Physical Office Location' },
            { value: 'hybrid', label: 'Hybrid (Both Virtual and Physical)' }
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
          placeholder="(123) 456-7890"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 mb-2">
          Clinical Specialties <span className="text-red-500">*</span>
        </label>
        <select
          id="specialties"
          name="specialties"
          multiple
          size={8}
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {SPECIALTIES.map((specialty) => (
            <option key={specialty} value={specialty.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}>
              {specialty}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Cmd/Ctrl to select multiple options</p>
      </div>

      <div>
        <label htmlFor="approaches" className="block text-sm font-medium text-gray-700 mb-2">
          Therapeutic Approaches <span className="text-red-500">*</span>
        </label>
        <select
          id="approaches"
          name="approaches"
          multiple
          size={6}
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {APPROACHES.map((approach) => (
            <option key={approach} value={approach.toLowerCase().replace(/ /g, '-')}>
              {approach}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Cmd/Ctrl to select multiple options</p>
      </div>

      <div>
        <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
          Languages Spoken Fluently <span className="text-red-500">*</span>
        </label>
        <select
          id="languages"
          name="languages"
          multiple
          size={6}
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {LANGUAGES.map((language) => (
            <option key={language} value={language.toLowerCase()}>
              {language}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Cmd/Ctrl to select multiple options</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Direct Billing Capability <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'yes', label: 'Yes — I can direct bill to insurance' },
            { value: 'no', label: 'No — Client must submit claims themselves' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="direct-billing"
                value={option.value}
                required
                onChange={(e) => setDirectBilling(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {directBilling === 'yes' && (
        <div className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telus Health eClaims Registration <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'registered', label: 'Registered' },
                { value: 'not-registered', label: 'Not Registered' }
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="telus-registration"
                    value={option.value}
                    required
                    onChange={(e) => setTelusRegistered(e.target.value)}
                    className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {telusRegistered === 'registered' && (
            <div>
              <label htmlFor="telus-id" className="block text-sm font-medium text-gray-700 mb-2">
                Telus Health Provider ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="telus-id"
                name="telus-id"
                required
                placeholder="Enter your Telus Health Provider ID"
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          )}

          <p className="text-sm text-gray-500">
            Telus Health eClaims is Canada's primary direct billing platform for extended health benefits.
          </p>
        </div>
      )}

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
