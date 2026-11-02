import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { MultiSelect } from "./MultiSelect";
import { StateDropdown } from "./StateDropdown";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";

interface PracticeInfoFormProps {
  specialty?: string;
  selectedSpecialization?: string;
  onNext: (data?: any) => void;
  onPrevious?: () => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export function PracticeInfoForm({
  onNext,
  onPrevious,
  onBack,
  isFirstStep = false,
  isLastStep = false,
}: PracticeInfoFormProps) {
  const [practiceType, setPracticeType] = useState<string>("Physical/Hybrid");
  const [officePhone, setOfficePhone] = useState<string>("123");
  const [clinicalSpecialties, setClinicalSpecialties] = useState<string[]>(["Anxiety"]);
  const [therapeuticApproaches, setTherapeuticApproaches] = useState<string[]>(["CBT"]);
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  const isPhysicalHybrid = practiceType === "Physical/Hybrid";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      practiceType,
      officePhone,
      clinicalSpecialties,
      therapeuticApproaches,
      languages,
      streetAddress: isPhysicalHybrid ? streetAddress : "",
      city: isPhysicalHybrid ? city : "",
      state: isPhysicalHybrid ? state : "",
      zipCode: isPhysicalHybrid ? zipCode : "",
    });
  };

  const practiceTypeOptions = [
    { id: "Virtual Only", label: "Virtual Only" },
    { id: "Physical/Hybrid", label: "Physical/Hybrid" },
  ];

  const clinicalSpecialtyOptions = [
    "Anxiety",
    "Depression",
    "PTSD",
    "OCD",
    "ADHD",
    "Bipolar Disorder",
    "CBT",
    "DBT",
    "Grief & Loss",
    "Relationship Issues",
    "Trauma",
    "Sleep Disorders",
    "Stress Management",
    "Self-Esteem",
    "Life Transitions",
    "Anger Management",
    "Eating Disorders",
    "Substance Abuse",
    "Chronic Illness",
  ];

  const therapeuticApproachOptions = [
    "CBT",
    "DBT",
    "EMDR",
    "Psychodynamic Therapy",
    "Solution-Focused Therapy",
    "Mindfulness-Based Therapy",
    "Acceptance and Commitment Therapy (ACT)",
    "Motivational Interviewing",
    "Interpersonal Therapy",
    "Family Systems Therapy",
    "Play Therapy",
    "Art Therapy",
    "Narrative Therapy",
    "Gottman Method",
    "Exposure Therapy",
    "Trauma-Focused Therapy",
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "Mandarin",
    "Arabic",
    "Hindi",
    "Portuguese",
    "German",
    "Japanese",
    "Russian",
    "Korean",
    "Italian",
    "Vietnamese",
    "Tagalog",
    "Polish",
    "Hebrew",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Practice Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Practice Type <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {practiceTypeOptions.map((option) => {
              const isSelected = practiceType === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setPracticeType(option.id)}
                  className={`w-full flex items-center px-4 py-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#2196F3] bg-[#F0F7FF] text-gray-900 font-medium shadow-sm"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                      isSelected ? "border-[#2196F3] bg-white" : "border-gray-300"
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#2196F3]" />}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Office Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Office Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={officePhone}
            onChange={(e) => setOfficePhone(e.target.value)}
            placeholder="123"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3] outline-none text-sm text-gray-900 transition-all placeholder:text-gray-400"
          />
          <ContextualHelpLink
            slug="practice-location-and-tax-id-rules"
            label="Virtual vs. physical practice settings, W-9 Tax IDs & billing rules"
          />
        </div>

        {/* Clinical Specialties */}
        <MultiSelect
          label="Clinical Specialties"
          options={clinicalSpecialtyOptions}
          value={clinicalSpecialties}
          onChange={setClinicalSpecialties}
          placeholder="Select clinical specialties..."
          required
        />

        {/* Therapeutic Approaches */}
        <MultiSelect
          label="Therapeutic Approaches"
          options={therapeuticApproachOptions}
          value={therapeuticApproaches}
          onChange={setTherapeuticApproaches}
          placeholder="Select therapeutic approaches..."
          required
        />

        {/* Languages Spoken Fluently */}
        <MultiSelect
          label="Languages Spoken Fluently"
          options={languageOptions}
          value={languages}
          onChange={setLanguages}
          placeholder="Select languages..."
          required
        />

        {/* Street Address (Physical/Hybrid only) */}
        {isPhysicalHybrid && (
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required={isPhysicalHybrid}
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Enter Street Address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3] outline-none text-sm text-gray-900 transition-all placeholder:text-gray-400"
            />
          </div>
        )}

        {/* City & State (Physical/Hybrid only) */}
        {isPhysicalHybrid && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required={isPhysicalHybrid}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3] outline-none text-sm text-gray-900 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <StateDropdown
                value={state}
                onChange={setState}
                className="w-full"
              />
            </div>

            {/* ZIP Code (Physical/Hybrid only) */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required={isPhysicalHybrid}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter ZIP Code"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3] outline-none text-sm text-gray-900 transition-all placeholder:text-gray-400"
              />
            </div>
          </>
        )}
      </div>

      {/* Form Navigation Buttons */}
      <FormButtons
        onPrevious={onPrevious || onBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </form>
  );
}
