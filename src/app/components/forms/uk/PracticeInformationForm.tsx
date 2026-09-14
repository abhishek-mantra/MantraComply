import { useState } from "react";
import { UKFormButtons } from "./UKFormButtons";

interface PracticeInformationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function PracticeInformationForm({ onNext, onBack }: PracticeInformationFormProps) {
  const [practiceSetting, setPracticeSetting] = useState("");
  const [healthcodeRegistered, setHealthcodeRegistered] = useState("");

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
                checked={practiceSetting === option.value}
                onChange={(e) => setPracticeSetting(e.target.value)}
                required
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
          placeholder="(XXX) XXX-XXXX"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="therapy-modalities" className="block text-sm font-medium text-gray-700 mb-2">
          Therapy Modalities <span className="text-red-500">*</span>
        </label>
        <select
          id="therapy-modalities"
          name="therapy-modalities"
          required
          multiple
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[120px]"
        >
          <option value="cbt">CBT</option>
          <option value="psychodynamic">Psychodynamic</option>
          <option value="integrative">Integrative</option>
          <option value="humanistic">Humanistic</option>
          <option value="dbt">DBT</option>
          <option value="emdr">EMDR</option>
          <option value="act">ACT</option>
          <option value="solution-focused">Solution-Focused</option>
          <option value="person-centred">Person-Centred</option>
          <option value="family-therapy">Family Therapy</option>
          <option value="other">Other</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
      </div>

      <div>
        <label htmlFor="client-populations" className="block text-sm font-medium text-gray-700 mb-2">
          Client Populations <span className="text-red-500">*</span>
        </label>
        <select
          id="client-populations"
          name="client-populations"
          required
          multiple
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[120px]"
        >
          <option value="adults">Adults</option>
          <option value="adolescents">Adolescents</option>
          <option value="children">Children</option>
          <option value="couples">Couples</option>
          <option value="families">Families</option>
          <option value="older-adults">Older Adults</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
      </div>

      <div>
        <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
          Languages Spoken Fluently <span className="text-red-500">*</span>
        </label>
        <select
          id="languages"
          name="languages"
          required
          multiple
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[120px]"
        >
          <option value="english">English</option>
          <option value="welsh">Welsh</option>
          <option value="gaelic">Scottish Gaelic</option>
          <option value="irish">Irish</option>
          <option value="polish">Polish</option>
          <option value="punjabi">Punjabi</option>
          <option value="urdu">Urdu</option>
          <option value="bengali">Bengali</option>
          <option value="gujarati">Gujarati</option>
          <option value="arabic">Arabic</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
          <option value="mandarin">Mandarin</option>
          <option value="other">Other</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Healthcode Registration <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'yes', label: 'Yes — I am registered with Healthcode' },
            { value: 'no', label: 'No — I am not registered with Healthcode' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="healthcode-registration"
                value={option.value}
                checked={healthcodeRegistered === option.value}
                onChange={(e) => setHealthcodeRegistered(e.target.value)}
                required
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Healthcode is the UK's primary e-billing platform. Most private insurers (Bupa, AXA Health) require Healthcode for electronic claims submission.
        </p>
      </div>

      {healthcodeRegistered === 'yes' && (
        <div>
          <label htmlFor="healthcode-id" className="block text-sm font-medium text-gray-700 mb-2">
            Healthcode Provider ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="healthcode-id"
            name="healthcode-id"
            required
            placeholder="Enter your Healthcode Provider ID"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      )}

      <UKFormButtons onBack={onBack} />
    </form>
  );
}