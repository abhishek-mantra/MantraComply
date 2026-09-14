import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface BoardCertificationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

interface EndorsementEntry {
  id: string;
  type: string;
  dateOfEndorsement: string;
  expiryDate: string;
}

const ENDORSEMENT_TYPES = [
  "Clinical",
  "Forensic",
  "Health",
  "Educational & Developmental",
  "Neuropsychology",
  "Organisational",
  "Sport & Exercise",
  "Community"
];

export function BoardCertificationForm({ onNext, onBack }: BoardCertificationFormProps) {
  const [notApplicable, setNotApplicable] = useState(false);
  const [endorsements, setEndorsements] = useState<EndorsementEntry[]>([
    { id: "1", type: "", dateOfEndorsement: "", expiryDate: "" }
  ]);

  const addEndorsement = () => {
    setEndorsements([
      ...endorsements,
      { id: Date.now().toString(), type: "", dateOfEndorsement: "", expiryDate: "" }
    ]);
  };

  const removeEndorsement = (id: string) => {
    if (endorsements.length > 1) {
      setEndorsements(endorsements.filter(e => e.id !== id));
    }
  };

  const updateEndorsement = (id: string, field: keyof EndorsementEntry, value: string) => {
    setEndorsements(endorsements.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ endorsements: notApplicable ? [] : endorsements });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={notApplicable}
            onChange={(e) => setNotApplicable(e.target.checked)}
            className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded"
          />
          <span className="text-gray-900">N/A — I do not hold a Board-level Specialty Endorsement</span>
        </label>
      </div>

      {!notApplicable && (
        <>
          {endorsements.map((endorsement, index) => (
            <div key={endorsement.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">
                  Endorsement {index + 1}
                </h3>
                {endorsements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEndorsement(endorsement.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endorsement Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={endorsement.type}
                  onChange={(e) => updateEndorsement(endorsement.id, "type", e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">Select an endorsement type...</option>
                  {ENDORSEMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Endorsement <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={endorsement.dateOfEndorsement}
                  onChange={(e) => updateEndorsement(endorsement.id, "dateOfEndorsement", e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={endorsement.expiryDate}
                  onChange={(e) => updateEndorsement(endorsement.id, "expiryDate", e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endorsement Certificate <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
                  <input
                    type="file"
                    id={`certificate-${endorsement.id}`}
                    name={`certificate-${endorsement.id}`}
                    required
                    className="hidden"
                  />
                  <label htmlFor={`certificate-${endorsement.id}`} className="cursor-pointer">
                    <div className="text-gray-600">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="text-[#2563EB] font-medium">Upload a file</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEndorsement}
            className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
          >
            + Add Endorsement
          </button>
        </>
      )}

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
