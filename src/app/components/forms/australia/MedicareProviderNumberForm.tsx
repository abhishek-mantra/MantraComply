import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface MedicareProviderNumberFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface ProviderNumberEntry {
  id: string;
  number: string;
  practiceName: string;
  practiceAddress: string;
  providerType: string;
}

const PROVIDER_TYPES = [
  "Clinical Psychologist (higher rebate)",
  "Registered Psychologist",
  "Other Allied Health"
];

export function MedicareProviderNumberForm({ onNext, onBack }: MedicareProviderNumberFormProps) {
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [providerEntries, setProviderEntries] = useState<ProviderNumberEntry[]>([
    { id: "1", number: "", practiceName: "", practiceAddress: "", providerType: "" }
  ]);
  const [bulkBillingStatus, setBulkBillingStatus] = useState("");
  const [abn, setAbn] = useState("");

  const addProviderEntry = () => {
    setProviderEntries([
      ...providerEntries,
      { id: Date.now().toString(), number: "", practiceName: "", practiceAddress: "", providerType: "" }
    ]);
  };

  const removeProviderEntry = (id: string) => {
    if (providerEntries.length > 1) {
      setProviderEntries(providerEntries.filter(entry => entry.id !== id));
    }
  };

  const updateProviderEntry = (id: string, field: keyof ProviderNumberEntry, value: string) => {
    setProviderEntries(providerEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ providerNumbers: providerEntries });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          Medicare Provider Numbers are location-specific. You must have a separate Provider Number for each practice location where you see clients. This is required to bill Medicare under the Better Access initiative.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registered with Services Australia (Medicare)? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: "yes", label: "Yes — I am registered with Services Australia" },
            { value: "no", label: "No — I am not yet registered" },
            { value: "in-progress", label: "In Progress — I have applied" }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="registration-status"
                value={option.value}
                required
                checked={registrationStatus === option.value}
                onChange={(e) => setRegistrationStatus(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {registrationStatus === "yes" && (
        <div className="space-y-4">
          {providerEntries.map((entry, index) => (
            <div key={entry.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">
                  Provider Number Entry {index + 1}
                </h3>
                {providerEntries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProviderEntry(entry.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicare Provider Number
                </label>
                <input
                  type="text"
                  value={entry.number}
                  onChange={(e) => updateProviderEntry(entry.id, "number", e.target.value)}
                  placeholder="e.g., 1234567A"
                  required
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Associated Practice Name
                </label>
                <input
                  type="text"
                  value={entry.practiceName}
                  onChange={(e) => updateProviderEntry(entry.id, "practiceName", e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Practice Address
                </label>
                <input
                  type="text"
                  value={entry.practiceAddress}
                  onChange={(e) => updateProviderEntry(entry.id, "practiceAddress", e.target.value)}
                  placeholder="Street + Suburb + State + Postcode"
                  required
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Type at this location
                </label>
                <div className="space-y-2">
                  {PROVIDER_TYPES.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name={`provider-type-${entry.id}`}
                        value={type}
                        required
                        checked={entry.providerType === type}
                        onChange={(e) => updateProviderEntry(entry.id, "providerType", e.target.value)}
                        className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      <span className="text-sm text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addProviderEntry}
            className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
          >
            + Add Another Provider Number / Location
          </button>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bulk Billing Status <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: "bulk-bill", label: "I bulk bill all eligible clients (Medicare-only, no gap fee)" },
            { value: "gap-fee", label: "I charge a gap fee (client pays Medicare rebate + gap)" },
            { value: "no-medicare", label: "I do not accept Medicare / Better Access clients" }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="bulk-billing"
                value={option.value}
                required
                checked={bulkBillingStatus === option.value}
                onChange={(e) => setBulkBillingStatus(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Bulk billing means you accept the Medicare rebate as full payment. Gap fees mean clients pay the difference between your fee and the Medicare rebate.
        </p>
      </div>

      <div>
        <label htmlFor="abn" className="block text-sm font-medium text-gray-700 mb-2">
          Australian Business Number (ABN) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="abn"
          name="abn"
          required
          value={abn}
          onChange={(e) => setAbn(e.target.value)}
          placeholder="Enter your 11-digit ABN"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
        <p className="mt-1 text-sm text-gray-500">
          Your ABN is required for invoicing and tax purposes. Find it at abr.business.gov.au
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700">
          If you need assistance with Medicare registration or Provider Numbers, contact Services Australia at 132 150 or visit servicesaustralia.gov.au
        </p>
      </div>

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
