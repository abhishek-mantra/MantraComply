import { useState } from "react";
import { IndiaFormButtons } from "./IndiaFormButtons";
import { MEDICAL_SPECIALTIES } from "../../../config/indiaGicConfig";

interface SpecialtiesOfferedFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
}

export function SpecialtiesOfferedForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = false,
}: SpecialtiesOfferedFormProps) {
  const [offerSpecialities, setOfferSpecialities] = useState<"Yes" | "No" | "">(
    initialData?.offerSpecialities || "Yes"
  );

  // Initialize all 20 specialties with previous data or empty
  const [specialtyChoices, setSpecialtyChoices] = useState<Record<string, "Yes" | "No">>(() => {
    const initial: Record<string, "Yes" | "No"> = {};
    MEDICAL_SPECIALTIES.forEach((spec) => {
      initial[spec] = initialData?.specialtyChoices?.[spec] || "No";
    });
    return initial;
  });

  const handleChoiceChange = (spec: string, value: "Yes" | "No") => {
    setSpecialtyChoices((prev) => ({ ...prev, [spec]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!offerSpecialities) {
      alert("Please indicate whether your facility offers medical specialities.");
      return;
    }

    onNext({
      offerSpecialities,
      specialtyChoices,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Blue highlighted box for Does your facility offer medical specialities */}
      <div className="p-4 bg-[#E3F2FD]/40 border border-[#90CAF9]/80 rounded-xl">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Does your facility offer medical specialities? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          {(["Yes", "No"] as const).map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-all ${
                offerSpecialities === opt
                  ? "border-[#2196F3] bg-white text-[#1976D2] font-medium shadow-xs"
                  : "border-gray-200 bg-white/70 hover:bg-white text-gray-700"
              }`}
            >
              <input
                type="radio"
                name="offerSpecialities"
                value={opt}
                required
                checked={offerSpecialities === opt}
                onChange={() => setOfferSpecialities(opt)}
                className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Helper text */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900">
          Medical Specialties <span className="text-red-500">*</span>
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Please indicate which medical specialties your facility offers by selecting Yes or No
          for each specialty.
        </p>
      </div>

      {/* 3-column grid for the 20 specialties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {MEDICAL_SPECIALTIES.map((spec) => (
          <div
            key={spec}
            className="flex flex-col justify-between p-3.5 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-all space-y-2.5"
          >
            <div className="text-sm font-medium text-gray-900 leading-snug">
              {spec} <span className="text-red-500">*</span>
            </div>

            <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
              <label
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  specialtyChoices[spec] === "Yes"
                    ? "bg-[#E3F2FD] border-[#2196F3] text-[#1976D2]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`spec_${spec}`}
                  value="Yes"
                  checked={specialtyChoices[spec] === "Yes"}
                  onChange={() => handleChoiceChange(spec, "Yes")}
                  className="sr-only"
                />
                Yes
              </label>

              <label
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  specialtyChoices[spec] === "No"
                    ? "bg-gray-100 border-gray-300 text-gray-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`spec_${spec}`}
                  value="No"
                  checked={specialtyChoices[spec] === "No"}
                  onChange={() => handleChoiceChange(spec, "No")}
                  className="sr-only"
                />
                No
              </label>
            </div>
          </div>
        ))}
      </div>

      <IndiaFormButtons onBack={onBack} isFirstStep={isFirstStep} submitText="Save" />
    </form>
  );
}
