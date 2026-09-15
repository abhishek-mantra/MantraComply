import { useState } from "react";
import { UKFormButtons } from "./UKFormButtons";
import { Plus } from "lucide-react";
import { UK_SERVICE_CONFIG, type UKServiceType } from "../../../config/ukServiceConfig";

interface BoardAccreditationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  selectedService?: UKServiceType | "";
}

interface Accreditation {
  id: number;
  body: string;
  type: string;
  date: string;
  expiryDate: string;
}

export function BoardAccreditationForm({ onNext, onBack, selectedService }: BoardAccreditationFormProps) {
  const [noAccreditation, setNoAccreditation] = useState(false);
  const [accreditations, setAccreditations] = useState<Accreditation[]>([
    {
      id: 1,
      body: "",
      type: "",
      date: "",
      expiryDate: "",
    },
  ]);

  // Get service-specific options or use default therapy options
  const serviceConfig = selectedService ? UK_SERVICE_CONFIG[selectedService] : UK_SERVICE_CONFIG.therapy;
  const accreditingBodies = serviceConfig.accreditingBodies;
  const accreditationSpecialties = serviceConfig.accreditationSpecialties;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addAccreditation = () => {
    setAccreditations([
      ...accreditations,
      {
        id: Date.now(),
        body: "",
        type: "",
        date: "",
        expiryDate: "",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
        <input
          type="checkbox"
          id="no-accreditation"
          name="no-accreditation"
          checked={noAccreditation}
          onChange={(e) => setNoAccreditation(e.target.checked)}
          className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded"
        />
        <label htmlFor="no-accreditation" className="text-sm text-gray-900 cursor-pointer">
          N/A — I do not hold any specialist accreditations
        </label>
      </div>

      {!noAccreditation && (
        <>
          {accreditations.map((accreditation, index) => (
            <div key={accreditation.id} className="space-y-6">
              {index > 0 && <hr className="border-gray-200" />}
              {index > 0 && (
                <h3 className="text-lg font-medium text-gray-900">Accreditation {index + 1}</h3>
              )}

              <div>
                <label htmlFor={`body-${accreditation.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Accrediting Body <span className="text-red-500">*</span>
                </label>
                <select
                  id={`body-${accreditation.id}`}
                  name={`body-${accreditation.id}`}
                  required
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">Select accrediting body...</option>
                  {accreditingBodies.map((body) => (
                    <option key={body} value={body.toLowerCase().replace(/ /g, '-')}>
                      {body}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`type-${accreditation.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Accreditation Type / Specialty <span className="text-red-500">*</span>
                </label>
                <select
                  id={`type-${accreditation.id}`}
                  name={`type-${accreditation.id}`}
                  required
                  className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">Select accreditation type...</option>
                  {accreditationSpecialties.map((specialty) => (
                    <option key={specialty} value={specialty.toLowerCase().replace(/ /g, '-')}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`date-${accreditation.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Accreditation Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`date-${accreditation.id}`}
                    name={`date-${accreditation.id}`}
                    required
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    placeholder="MM/DD/YYYY"
                  />
                </div>

                <div>
                  <label htmlFor={`expiry-date-${accreditation.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`expiry-date-${accreditation.id}`}
                    name={`expiry-date-${accreditation.id}`}
                    required
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    placeholder="MM/DD/YYYY"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accreditation Certificate <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-[#CBD5E0] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-3"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, JPG, or PNG (max 10MB)</p>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addAccreditation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Accreditation
          </button>
        </>
      )}

      <UKFormButtons onBack={onBack} />
    </form>
  );
}
