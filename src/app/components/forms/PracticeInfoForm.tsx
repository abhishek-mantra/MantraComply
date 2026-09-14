import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { MultiSelect } from "./MultiSelect";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function PracticeInfoForm({ specialty, onNext, onPrevious, isFirstStep }: FormProps) {
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [modalities, setModalities] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const getFocusAreas = () => {
    if (specialty === "therapy") {
      return [
        "Anxiety", "Depression", "PTSD", "OCD", "ADHD", "Bipolar Disorder",
        "CBT", "DBT", "Grief & Loss", "Relationship Issues", "Trauma", "Sleep Disorders",
        "Stress Management", "Self-Esteem", "Life Transitions", "Anger Management"
      ];
    } else if (specialty === "dietitian") {
      return [
        "Weight Management", "Diabetes", "Heart Health", "Sports Nutrition",
        "Eating Disorders", "Food Allergies", "Digestive Health", "Pediatric Nutrition"
      ];
    } else if (specialty === "physiotherapy") {
      return [
        "Sports Injuries", "Post-Surgery Rehab", "Chronic Pain", "Back Pain",
        "Neck Pain", "Joint Pain", "Balance Training", "Mobility Issues"
      ];
    }
    return [];
  };

  const getModalities = () => {
    if (specialty === "therapy") {
      return [
        "CBT (Cognitive Behavioral Therapy)",
        "DBT (Dialectical Behavior Therapy)",
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
        "Trauma-Focused Therapy"
      ];
    } else if (specialty === "dietitian") {
      return [
        "Medical Nutrition Therapy",
        "Behavioral Nutrition",
        "Intuitive Eating",
        "Meal Planning"
      ];
    } else if (specialty === "physiotherapy") {
      return [
        "Manual Therapy",
        "Exercise Therapy",
        "Dry Needling",
        "Aquatic Therapy"
      ];
    }
    return [];
  };

  const getLanguages = () => {
    return [
      "English", "Spanish",
      "Mandarin", "French",
      "Arabic", "Hindi",
      "Portuguese", "Russian",
      "German", "Japanese",
      "Korean", "Italian",
      "Vietnamese", "Tagalog",
      "Polish", "Urdu",
      "Bengali", "Hebrew"
    ];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Practice Setting <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <input type="radio" name="practiceSetting" value="virtual" className="mr-3" />
            <span className="text-sm">Virtual/Telehealth Only</span>
          </label>
          <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <input type="radio" name="practiceSetting" value="physical" className="mr-3" />
            <span className="text-sm">Physical Office Location</span>
          </label>
          <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
            <input type="radio" name="practiceSetting" value="hybrid" className="mr-3" />
            <span className="text-sm">Hybrid (Both Virtual and Physical)</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Office Phone Number
        </label>
        <input
          type="tel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="(XXX) XXX-XXXX"
        />
      </div>

      <MultiSelect
        label="Clinical Specialties"
        options={getFocusAreas()}
        value={focusAreas}
        onChange={setFocusAreas}
        placeholder="Select clinical areas you treat"
        required
      />

      <MultiSelect
        label="Therapeutic Approaches"
        options={getModalities()}
        value={modalities}
        onChange={setModalities}
        placeholder="Select therapeutic approaches you practice"
        required
      />

      <MultiSelect
        label="Languages Spoken Fluently"
        options={getLanguages()}
        value={languages}
        onChange={setLanguages}
        placeholder="Select languages you can provide services in"
        required
      />

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}
