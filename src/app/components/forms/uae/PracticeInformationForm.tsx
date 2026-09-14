import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface PracticeInformationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

const UAE_LANGUAGES = ["Arabic", "English", "Hindi", "Urdu", "Tagalog", "Malayalam", "Bengali", "Tamil", "Persian", "French", "Russian", "Mandarin"];
const THERAPEUTIC_APPROACHES = ["CBT", "ACT", "DBT", "Schema Therapy", "EMDR", "Psychodynamic", "Interpersonal Therapy", "Mindfulness-Based", "Solution-Focused", "Other"];
const CLIENT_POPULATIONS = ["Expatriates", "UAE Nationals", "Children", "Adolescents", "Adults", "Couples", "Families", "LGBTQ+"];

export function PracticeInformationForm({ onNext, onBack }: PracticeInformationFormProps) {
  const [practiceSetting, setPracticeSetting] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [approaches, setApproaches] = useState<string[]>([]);
  const [populations, setPopulations] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ practiceSetting, languages, specialties, approaches, populations });
  };

  const toggleApproach = (approach: string) => {
    setApproaches(prev => prev.includes(approach) ? prev.filter(a => a !== approach) : [...prev, approach]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Practice Setting <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {[
            "In-person (at licensed facility only)",
            "Telehealth Only",
            "Both In-person and Telehealth"
          ].map(option => (
            <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="practice-setting" value={option} required checked={practiceSetting === option} onChange={(e) => setPracticeSetting(e.target.value)} className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]" />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">Consultation Language(s) <span className="text-red-500">*</span></label>
        <select id="languages" multiple size={6} required onChange={(e) => {
          const options = e.target.selectedOptions;
          const values = Array.from(options).map(option => option.value);
          setLanguages(values);
        }} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
          {UAE_LANGUAGES.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
      </div>

      <div>
        <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 mb-2">Clinical Specialties <span className="text-red-500">*</span></label>
        <select id="specialties" multiple size={5} required onChange={(e) => {
          const options = e.target.selectedOptions;
          const values = Array.from(options).map(option => option.value);
          setSpecialties(values);
        }} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
          <option value="anxiety">Anxiety Disorders</option>
          <option value="depression">Depression</option>
          <option value="trauma">Trauma & PTSD</option>
          <option value="relationships">Relationship Issues</option>
          <option value="stress">Stress Management</option>
          <option value="addiction">Addiction</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Therapeutic Approaches <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {THERAPEUTIC_APPROACHES.map(approach => (
            <label key={approach} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" checked={approaches.includes(approach)} onChange={() => toggleApproach(approach)} className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded" />
              <span className="text-gray-900">{approach}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="populations" className="block text-sm font-medium text-gray-700 mb-2">Client Populations <span className="text-red-500">*</span></label>
        <select id="populations" multiple size={6} required onChange={(e) => {
          const options = e.target.selectedOptions;
          const values = Array.from(options).map(option => option.value);
          setPopulations(values);
        }} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
          {CLIENT_POPULATIONS.map(pop => (
            <option key={pop} value={pop}>{pop}</option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
      </div>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}
