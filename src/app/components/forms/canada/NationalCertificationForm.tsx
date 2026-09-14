import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface NationalCertificationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function NationalCertificationForm({ onNext, onBack }: NationalCertificationFormProps) {
  const [cccStatus, setCccStatus] = useState("");

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
            The Canadian Certified Counsellor (CCC) designation is issued by the Canadian Counselling and 
            Psychotherapy Association (CCPA). In provinces where counselling is not yet regulated, the CCC 
            is the primary credential recognised by private insurers.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you hold the CCC designation? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'yes', label: 'Yes — I hold the CCC designation' },
            { value: 'no', label: 'No — I do not hold the CCC designation' },
            { value: 'in-progress', label: 'In Progress — I have applied for CCC' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="ccc-status"
                value={option.value}
                required
                onChange={() => setCccStatus(option.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {cccStatus === 'yes' && (
        <>
          <div>
            <label htmlFor="ccc-number" className="block text-sm font-medium text-gray-700 mb-2">
              CCC Certification Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ccc-number"
              name="ccc-number"
              required
              placeholder="Enter your CCC certification number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="ccc-expiry" className="block text-sm font-medium text-gray-700 mb-2">
              CCC Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="ccc-expiry"
              name="ccc-expiry"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="ccc-certificate" className="block text-sm font-medium text-gray-700 mb-2">
              CCC Certificate <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-[#CBD5E0] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
              <input
                type="file"
                id="ccc-certificate"
                name="ccc-certificate"
                required
                className="hidden"
              />
              <label htmlFor="ccc-certificate" className="cursor-pointer">
                <div className="text-gray-600 mb-2">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="text-[#2563EB] font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (max. 10MB)</p>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CCPA Membership Status <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {['Active Member', 'Lapsed', 'Non-member'].map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="ccpa-membership"
                    value={status.toLowerCase().replace(/ /g, '-')}
                    required
                    className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-gray-900">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {cccStatus === 'in-progress' && (
        <>
          <div>
            <label htmlFor="ccpa-reference" className="block text-sm font-medium text-gray-700 mb-2">
              CCPA Application Reference Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ccpa-reference"
              name="ccpa-reference"
              required
              placeholder="Enter your application reference number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="application-date" className="block text-sm font-medium text-gray-700 mb-2">
              Application Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="application-date"
              name="application-date"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </>
      )}

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
