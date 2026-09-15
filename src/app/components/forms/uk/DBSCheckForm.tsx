import { useState } from "react";
import { UKFormButtons } from "./UKFormButtons";
import { AlertCircle } from "lucide-react";

interface DBSCheckFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function DBSCheckForm({ onNext, onBack }: DBSCheckFormProps) {
  const [practiceCountry, setPracticeCountry] = useState("");
  const [updateService, setUpdateService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info Callout */}
      <div className="p-4 bg-[#EFF6FF] border-l-4 border-[#2563EB] rounded flex gap-3">
        <AlertCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">
          All UK private insurers require an Enhanced DBS (Disclosure and Barring Service) certificate. 
          For Scotland, this is a PVG Scheme Record. For Northern Ireland, this is an AccessNI certificate.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country of Practice <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'england-wales', label: 'England & Wales (Enhanced DBS)' },
            { value: 'scotland', label: 'Scotland (PVG Scheme Record)' },
            { value: 'northern-ireland', label: 'Northern Ireland (AccessNI Certificate)' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="practice-country"
                value={option.value}
                checked={practiceCountry === option.value}
                onChange={(e) => setPracticeCountry(e.target.value)}
                required
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="dbs-number" className="block text-sm font-medium text-gray-700 mb-2">
          DBS Certificate Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="dbs-number"
          name="dbs-number"
          required
          placeholder="Enter your DBS certificate number"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="dbs-issue-date" className="block text-sm font-medium text-gray-700 mb-2">
          DBS Issue Date <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="dbs-issue-date"
          name="dbs-issue-date"
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          placeholder="MM/DD/YYYY"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {practiceCountry === 'scotland' 
            ? 'PVG Scheme Record' 
            : practiceCountry === 'northern-ireland' 
            ? 'AccessNI Certificate' 
            : 'Enhanced DBS Certificate'} <span className="text-red-500">*</span>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Update Service Subscription <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'yes', label: 'Yes — I am subscribed to the DBS Update Service' },
            { value: 'no', label: 'No — I am not subscribed' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="update-service"
                value={option.value}
                checked={updateService === option.value}
                onChange={(e) => setUpdateService(e.target.value)}
                required
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          The DBS Update Service allows insurers to check your certificate online. Subscribing is strongly recommended.
        </p>
      </div>

      {updateService === 'yes' && (
        <div>
          <label htmlFor="update-service-id" className="block text-sm font-medium text-gray-700 mb-2">
            Update Service ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="update-service-id"
            name="update-service-id"
            required
            placeholder="Enter your DBS Update Service ID"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      )}

      <UKFormButtons onBack={onBack} />
    </form>
  );
}