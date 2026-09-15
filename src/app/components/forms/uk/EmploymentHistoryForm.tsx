import { useState } from "react";
import { UKFormButtons } from "./UKFormButtons";
import { AlertCircle, Plus } from "lucide-react";

interface EmploymentHistoryFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface EmploymentEntry {
  id: number;
  isGap: boolean;
  employerName: string;
  position: string;
  startDate: string;
  endDate: string;
}

export function EmploymentHistoryForm({ onNext, onBack }: EmploymentHistoryFormProps) {
  const [entries, setEntries] = useState<EmploymentEntry[]>([
    {
      id: 1,
      isGap: false,
      employerName: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        id: Date.now(),
        isGap: false,
        employerName: "",
        position: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const toggleGap = (id: number) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, isGap: !entry.isGap } : entry
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info Callout */}
      <div className="p-4 bg-[#EFF6FF] border-l-4 border-[#2563EB] rounded flex gap-3">
        <AlertCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">
          Please provide your work history for the past 5 years. Include all employment, gaps, and explanations.
        </p>
      </div>

      {entries.map((entry, index) => (
        <div key={entry.id} className="border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {index === 0 ? "New Entry" : `Entry ${index + 1}`}
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={entry.isGap}
                onChange={() => toggleGap(entry.id)}
                className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB] rounded"
              />
              <span className="text-sm text-gray-700">There is a gap in employment</span>
            </label>
          </div>

          <div>
            <label htmlFor={`employer-${entry.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Employer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`employer-${entry.id}`}
              name={`employer-${entry.id}`}
              required
              placeholder="Enter employer name"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor={`position-${entry.id}`} className="block text-sm font-medium text-gray-700 mb-2">
              Position / Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id={`position-${entry.id}`}
              name={`position-${entry.id}`}
              required
              placeholder="Enter position or title"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`start-date-${entry.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`start-date-${entry.id}`}
                name={`start-date-${entry.id}`}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="MM/DD/YYYY"
              />
            </div>

            <div>
              <label htmlFor={`end-date-${entry.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`end-date-${entry.id}`}
                name={`end-date-${entry.id}`}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="MM/DD/YYYY"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Entry
      </button>

      <UKFormButtons onBack={onBack} />
    </form>
  );
}