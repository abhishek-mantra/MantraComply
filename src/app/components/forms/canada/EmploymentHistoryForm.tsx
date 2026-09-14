import { useState } from "react";
import { Plus, X, AlertCircle } from "lucide-react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface EmploymentEntry {
  isGap: boolean;
  employer: string;
  position: string;
  province: string;
  startDate: string;
  endDate: string;
}

interface EmploymentHistoryFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland & Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

export function EmploymentHistoryForm({ onNext, onBack }: EmploymentHistoryFormProps) {
  const [entries, setEntries] = useState<EmploymentEntry[]>([
    { isGap: false, employer: "", position: "", province: "", startDate: "", endDate: "" }
  ]);

  const addEntry = () => {
    setEntries([...entries, { isGap: false, employer: "", position: "", province: "", startDate: "", endDate: "" }]);
  };

  const removeEntry = (index: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  const toggleGap = (index: number) => {
    const newEntries = [...entries];
    newEntries[index].isGap = !newEntries[index].isGap;
    setEntries(newEntries);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Please provide your work history for the past 5 years. Include all employment, gaps, and explanations.
          </p>
        </div>
      </div>

      {entries.map((entry, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-6 relative">
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeEntry(index)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {entries.length > 1 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Entry {index + 1}</h3>
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={entry.isGap}
                onChange={() => toggleGap(index)}
                className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB] rounded"
              />
              <span className="text-sm text-gray-700">☐ There is a gap in employment</span>
            </label>
          </div>

          {!entry.isGap && (
            <>
              <div>
                <label htmlFor={`employer-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Employer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`employer-${index}`}
                  name={`employer-${index}`}
                  required={!entry.isGap}
                  placeholder="Enter employer name"
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label htmlFor={`position-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Position / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`position-${index}`}
                  name={`position-${index}`}
                  required={!entry.isGap}
                  placeholder="Enter position title"
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label htmlFor={`province-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Province of Employment <span className="text-red-500">*</span>
                </label>
                <select
                  id={`province-${index}`}
                  name={`province-${index}`}
                  required={!entry.isGap}
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">Select province...</option>
                  {PROVINCES.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`start-date-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id={`start-date-${index}`}
                name={`start-date-${index}`}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label htmlFor={`end-date-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id={`end-date-${index}`}
                name={`end-date-${index}`}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-blue-50 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Entry</span>
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">Need Help?</h3>
            <p className="text-sm text-blue-800">
              If you're having trouble completing your employment history, contact our support team at 
              support@mantracomplly.com.
            </p>
          </div>
        </div>
      </div>

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
