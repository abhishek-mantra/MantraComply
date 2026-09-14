import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface EmploymentHistoryFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface EmploymentEntry {
  id: string;
  isGap: boolean;
  employerName: string;
  position: string;
  state: string;
  startDate: string;
  endDate: string;
}

const AUSTRALIAN_STATES = [
  "ACT",
  "NSW",
  "NT",
  "QLD",
  "SA",
  "TAS",
  "VIC",
  "WA"
];

export function EmploymentHistoryForm({ onNext, onBack }: EmploymentHistoryFormProps) {
  const [employmentEntries, setEmploymentEntries] = useState<EmploymentEntry[]>([
    { id: "1", isGap: false, employerName: "", position: "", state: "", startDate: "", endDate: "" }
  ]);

  const addEmploymentEntry = () => {
    setEmploymentEntries([
      ...employmentEntries,
      { id: Date.now().toString(), isGap: false, employerName: "", position: "", state: "", startDate: "", endDate: "" }
    ]);
  };

  const removeEmploymentEntry = (id: string) => {
    if (employmentEntries.length > 1) {
      setEmploymentEntries(employmentEntries.filter(e => e.id !== id));
    }
  };

  const updateEmploymentEntry = (id: string, field: keyof EmploymentEntry, value: string | boolean) => {
    setEmploymentEntries(employmentEntries.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ employmentHistory: employmentEntries });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          Please provide your work history for the past 5 years.
        </p>
      </div>

      {employmentEntries.map((entry, index) => (
        <div key={entry.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-900">
              Employment Entry {index + 1}
            </h3>
            {employmentEntries.length > 1 && (
              <button
                type="button"
                onClick={() => removeEmploymentEntry(entry.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={entry.isGap}
                onChange={(e) => updateEmploymentEntry(entry.id, "isGap", e.target.checked)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded"
              />
              <span className="text-gray-900">There is a gap in employment</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={entry.employerName}
              onChange={(e) => updateEmploymentEntry(entry.id, "employerName", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position / Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={entry.position}
              onChange={(e) => updateEmploymentEntry(entry.id, "position", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={entry.state}
              onChange={(e) => updateEmploymentEntry(entry.id, "state", e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select a state...</option>
              {AUSTRALIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={entry.startDate}
                onChange={(e) => updateEmploymentEntry(entry.id, "startDate", e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={entry.endDate}
                onChange={(e) => updateEmploymentEntry(entry.id, "endDate", e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEmploymentEntry}
        className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
      >
        + Add Entry
      </button>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700">
          If you have questions about documenting employment gaps or need assistance, please contact our support team.
        </p>
      </div>

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
