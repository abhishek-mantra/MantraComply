import { useState } from "react";
import { X } from "lucide-react";

interface SpecialityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpeciality: string;
  onSave: (speciality: string) => void;
}

export function SpecialityModal({
  isOpen,
  onClose,
  currentSpeciality,
  onSave,
}: SpecialityModalProps) {
  const isInitialSingle =
    currentSpeciality.includes("ENT") || currentSpeciality.includes("Ophthalmology");
  const [specialityMode, setSpecialityMode] = useState<"Single" | "Multi Speciality">(
    isInitialSingle ? "Single" : "Multi Speciality"
  );
  const [singleType, setSingleType] = useState<string>(
    isInitialSingle ? currentSpeciality : ""
  );

  if (!isOpen) return null;

  const isValid = specialityMode === "Multi Speciality" || singleType !== "";

  const handleApply = () => {
    if (!isValid) return;
    if (specialityMode === "Single") {
      onSave(singleType);
    } else {
      onSave("Multi Speciality");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">
            Hospital/Daycare Centre Speciality
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hospital/Daycare Centre speciality <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                  specialityMode === "Single"
                    ? "border-[#2196F3] bg-blue-50/50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="modalSpecialityMode"
                  value="Single"
                  checked={specialityMode === "Single"}
                  onChange={() => setSpecialityMode("Single")}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-900">Single</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                  specialityMode === "Multi Speciality"
                    ? "border-[#2196F3] bg-blue-50/50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="modalSpecialityMode"
                  value="Multi Speciality"
                  checked={specialityMode === "Multi Speciality"}
                  onChange={() => setSpecialityMode("Multi Speciality")}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-900">Multi Speciality</span>
              </label>
            </div>
          </div>

          {specialityMode === "Single" && (
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                If Single Speciality, choose the type of Speciality{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                value={singleType}
                onChange={(e) => setSingleType(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm transition-all bg-white"
              >
                <option value="">Select the Specialty Type</option>
                <option value="ENT (Ear, Nose, and Throat)">ENT (Ear, Nose, and Throat)</option>
                <option value="Ophthalmology (Eye Care)">Ophthalmology (Eye Care)</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/80 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isValid}
            onClick={handleApply}
            className="px-6 py-2 text-sm font-medium text-white bg-[#2196F3] rounded-xl hover:bg-[#1976D2] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
