import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { FormButtons } from "../FormButtons";
import { UKFormButtons } from "../uk/UKFormButtons";
import { CanadaFormButtons } from "../canada/CanadaFormButtons";
import { AustraliaFormButtons } from "../australia/AustraliaFormButtons";
import { UAEFormButtons } from "../uae/UAEFormButtons";
import { ContextualHelpLink } from "../../shared/ContextualHelpLink";

type Country = "US" | "UK" | "Canada" | "Australia" | "UAE";

interface EmploymentEntry {
  id: string;
  isGap: boolean;
  employer?: string;
  employerName?: string;
  position?: string;
  state?: string;
  province?: string;
  country?: string;
  startDate: string;
  endDate: string;
  gapReason?: string;
  wasUAE?: string;
  wasLicensed?: string;
}

interface EmploymentHistoryFormProps {
  country: Country;
  onNext: (data?: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
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

const AUSTRALIAN_STATES = [
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
];

export function EmploymentHistoryForm({
  country,
  onNext,
  onBack,
  isFirstStep = false,
  isLastStep = false,
}: EmploymentHistoryFormProps) {
  const [entries, setEntries] = useState<EmploymentEntry[]>([
    {
      id: "1",
      isGap: false,
      employer: "",
      employerName: "",
      position: "",
      state: "",
      province: "",
      country: "",
      startDate: "",
      endDate: "",
      wasUAE: "",
      wasLicensed: "",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addEntry = (isGap: boolean) => {
    const newEntry: EmploymentEntry = {
      id: Date.now().toString(),
      isGap,
      employer: "",
      employerName: "",
      position: "",
      state: "",
      province: "",
      country: "",
      startDate: "",
      endDate: "",
      gapReason: "",
      wasUAE: "",
      wasLicensed: "",
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const updateEntry = (id: string, field: keyof EmploymentEntry, value: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const renderFormButtons = () => {
    switch (country) {
      case "US":
        return <FormButtons onPrevious={onBack} isFirstStep={isFirstStep} />;
      case "UK":
        return <UKFormButtons onBack={onBack} />;
      case "Canada":
        return <CanadaFormButtons onBack={onBack} />;
      case "Australia":
        return <AustraliaFormButtons onBack={onBack} />;
      case "UAE":
        return <UAEFormButtons onBack={onBack} isLastStep={isLastStep} />;
      default:
        return <FormButtons onPrevious={onBack} isFirstStep={isFirstStep} />;
    }
  };

  const inputClassName =
    country === "US"
      ? "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
      : "w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-700 font-medium mb-1">
            Complete Employment History
          </p>
          <p className="text-sm text-gray-600">
            {country === "UAE"
              ? "Provide complete employment history for the last 5 years. Include gaps in employment."
              : "Please provide a complete employment history. If there are gaps in employment, use the 'Add Gap' button to explain them."}
          </p>
          <ContextualHelpLink
            slug="work-history-gaps-and-attestations"
            label="How do payers review employment gaps & what explanation counts? →"
          />
        </div>
      </div>

      {/* Employment Entries */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="border border-gray-200 rounded-lg p-4 bg-white space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">
                {entry.isGap ? `Gap ${index + 1}` : `Employment ${index + 1}`}
              </h3>
              {entries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            {!entry.isGap ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={entry.employer || entry.employerName || ""}
                      onChange={(e) =>
                        updateEntry(entry.id, country === "Australia" || country === "UAE" ? "employerName" : "employer", e.target.value)
                      }
                      placeholder="Enter employer name"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position/Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={entry.position || ""}
                      onChange={(e) => updateEntry(entry.id, "position", e.target.value)}
                      placeholder="Enter position"
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Location Fields */}
                <div className="grid grid-cols-2 gap-4">
                  {country === "Canada" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Province <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={entry.province || ""}
                        onChange={(e) => updateEntry(entry.id, "province", e.target.value)}
                        className={inputClassName}
                      >
                        <option value="">Select province...</option>
                        {PROVINCES.map((prov) => (
                          <option key={prov} value={prov}>
                            {prov}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {country === "Australia" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={entry.state || ""}
                        onChange={(e) => updateEntry(entry.id, "state", e.target.value)}
                        className={inputClassName}
                      >
                        <option value="">Select state...</option>
                        {AUSTRALIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {country === "UAE" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={entry.country || ""}
                        onChange={(e) => updateEntry(entry.id, "country", e.target.value)}
                        placeholder="Enter country"
                        className={inputClassName}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={entry.startDate}
                      onChange={(e) => updateEntry(entry.id, "startDate", e.target.value)}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={entry.endDate}
                      onChange={(e) => updateEntry(entry.id, "endDate", e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* UAE-specific questions */}
                {country === "UAE" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Was this in the UAE? <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={entry.wasUAE || ""}
                        onChange={(e) => updateEntry(entry.id, "wasUAE", e.target.value)}
                        className={inputClassName}
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Were you licensed? <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={entry.wasLicensed || ""}
                        onChange={(e) => updateEntry(entry.id, "wasLicensed", e.target.value)}
                        className={inputClassName}
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gap Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={entry.startDate}
                      onChange={(e) => updateEntry(entry.id, "startDate", e.target.value)}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gap End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={entry.endDate}
                      onChange={(e) => updateEntry(entry.id, "endDate", e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Gap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={entry.gapReason || ""}
                    onChange={(e) => updateEntry(entry.id, "gapReason", e.target.value)}
                    placeholder="Please explain the reason for this gap in employment"
                    className={inputClassName}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => addEntry(false)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Employment
        </button>
        <button
          type="button"
          onClick={() => addEntry(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Gap
        </button>
      </div>

      {renderFormButtons()}
    </form>
  );
}
