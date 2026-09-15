import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface EmploymentHistoryFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface HistoryEntry {
  id: string;
  isGap: boolean;
  employer: string;
  country: string;
  position: string;
  startDate: string;
  endDate: string;
  wasUAE: string;
  wasLicensed: string;
}

export function EmploymentHistoryForm({ onNext, onBack }: EmploymentHistoryFormProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([
    { id: "1", isGap: false, employer: "", country: "", position: "", startDate: "", endDate: "", wasUAE: "", wasLicensed: "" }
  ]);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now().toString(), isGap: false, employer: "", country: "", position: "", startDate: "", endDate: "", wasUAE: "", wasLicensed: "" }]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) setEntries(entries.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof HistoryEntry, value: string | boolean) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ employmentHistory: entries });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          Please provide your complete work history for the past 5 years including any UAE-based employment.
        </p>
      </div>

      {entries.map((entry, index) => (
        <div key={entry.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-900">Employment Entry {index + 1}</h3>
            {entries.length > 1 && (
              <button type="button" onClick={() => removeEntry(entry.id)} className="text-red-600 hover:text-red-700 text-sm">Remove</button>
            )}
          </div>

          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={entry.isGap}
              onChange={(e) => updateEntry(entry.id, "isGap", e.target.checked)}
              className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded"
            />
            <span className="text-gray-900">There is a gap in employment</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employer Name <span className="text-red-500">*</span></label>
            <input type="text" value={entry.employer} onChange={(e) => updateEntry(entry.id, "employer", e.target.value)} required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
            <select value={entry.country} onChange={(e) => updateEntry(entry.id, "country", e.target.value)} required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
              <option value="">Select...</option>
              <option value="uae">United Arab Emirates</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position / Title <span className="text-red-500">*</span></label>
            <input type="text" value={entry.position} onChange={(e) => updateEntry(entry.id, "position", e.target.value)} required className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input type="text" value={entry.startDate} onChange={(e) => updateEntry(entry.id, "startDate", e.target.value)} required placeholder="MM/DD/YYYY" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input type="text" value={entry.endDate} onChange={(e) => updateEntry(entry.id, "endDate", e.target.value)} required placeholder="MM/DD/YYYY" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Was this employment in the UAE?</label>
            <div className="grid grid-cols-2 gap-2">
              {["Yes", "No"].map(option => (
                <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name={`was-uae-${entry.id}`} value={option.toLowerCase()} checked={entry.wasUAE === option.toLowerCase()} onChange={(e) => updateEntry(entry.id, "wasUAE", e.target.value)} className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]" />
                  <span className="text-sm text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {entry.wasUAE === "yes" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Was employer DHA/DOH/MOHAP licensed?</label>
              <div className="grid grid-cols-2 gap-2">
                {["Yes", "No"].map(option => (
                  <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name={`was-licensed-${entry.id}`} value={option.toLowerCase()} checked={entry.wasLicensed === option.toLowerCase()} onChange={(e) => updateEntry(entry.id, "wasLicensed", e.target.value)} className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]" />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <button type="button" onClick={addEntry} className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors">+ Add Entry</button>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700">If you have questions about documenting your employment history, our team is here to assist.</p>
      </div>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}
