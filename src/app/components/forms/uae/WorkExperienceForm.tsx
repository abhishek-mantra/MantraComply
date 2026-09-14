import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";
import { UAE_SERVICE_CONFIG, type UAEServiceType } from "../../../config/uaeServiceConfig";

interface WorkExperienceFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  selectedService?: UAEServiceType | "";
}

interface ExperienceEntry {
  id: string;
  employer: string;
  country: string;
  position: string;
  startDate: string;
  endDate: string;
}

export function WorkExperienceForm({ onNext, onBack, selectedService }: WorkExperienceFormProps) {
  const [totalExperience, setTotalExperience] = useState("");
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([
    { id: "1", employer: "", country: "", position: "", startDate: "", endDate: "" }
  ]);

  // Get service-specific options or use default therapy options
  const serviceConfig = selectedService ? UAE_SERVICE_CONFIG[selectedService] : UAE_SERVICE_CONFIG.therapy;
  const workExperienceIntroText = serviceConfig.workExperienceIntroText;

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now().toString(), employer: "", country: "", position: "", startDate: "", endDate: "" }]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(e => e.id !== id));
    }
  };

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ totalExperience, experiences });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          {workExperienceIntroText}
        </p>
      </div>

      <div>
        <label htmlFor="total-experience" className="block text-sm font-medium text-gray-700 mb-2">
          Total Post-Qualification Years of Experience <span className="text-red-500">*</span>
        </label>
        <select
          id="total-experience"
          required
          value={totalExperience}
          onChange={(e) => setTotalExperience(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select...</option>
          <option value="less-than-1">Less than 1 year</option>
          <option value="1-2">1–2 years</option>
          <option value="2-5">2–5 years</option>
          <option value="5-10">5–10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>

      {experiences.map((exp, index) => (
        <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-900">Experience Entry {index + 1}</h3>
            {experiences.length > 1 && (
              <button type="button" onClick={() => removeExperience(exp.id)} className="text-red-600 hover:text-red-700 text-sm">
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employer / Institution Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={exp.employer}
              onChange={(e) => updateExperience(exp.id, "employer", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={exp.country}
              onChange={(e) => updateExperience(exp.id, "country", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position / Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={exp.position}
              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employment Letter from Employer <span className="text-red-500">*</span></label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2563EB] transition-colors">
              <input type="file" id={`letter-${exp.id}`} required className="hidden" />
              <label htmlFor={`letter-${exp.id}`} className="cursor-pointer">
                <p className="text-sm text-gray-600">
                  <span className="text-[#2563EB] font-medium">Upload employment letter</span>
                </p>
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">Must be on official letterhead, confirming dates, role, and clinical duties.</p>
          </div>
        </div>
      ))}

      <button type="button" onClick={addExperience} className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors">
        + Add Experience Entry
      </button>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}