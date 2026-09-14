import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface TaxBusinessInformationFormProps {
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

export function TaxBusinessInformationForm({ onNext, onBack }: TaxBusinessInformationFormProps) {
  const [businessStructure, setBusinessStructure] = useState("");
  const [hstGstRegistered, setHstGstRegistered] = useState("");

  const showCraField = businessStructure === 'sole-proprietor' || businessStructure === 'incorporated';
  const showIncorporatedFields = businessStructure === 'incorporated';

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
            This information is required for invoicing and tax compliance in Canada.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Structure <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'sole-proprietor', label: 'Sole Proprietor (Self-Employed)' },
            { value: 'incorporated', label: 'Incorporated (Professional Corporation)' },
            { value: 'employee', label: 'Employee of a Clinic / Organization' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="business-structure"
                value={option.value}
                required
                onChange={(e) => setBusinessStructure(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {showCraField && (
        <div>
          <label htmlFor="cra-number" className="block text-sm font-medium text-gray-700 mb-2">
            CRA Business Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="cra-number"
            name="cra-number"
            required
            placeholder="Enter your 9-digit CRA Business Number"
            maxLength={9}
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          <p className="mt-1 text-sm text-gray-500">
            Your Canada Revenue Agency Business Number (BN) is used for invoicing. Format: 123456789
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HST / GST Registered? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="hst-gst-registered"
                value={option.value}
                required
                onChange={(e) => setHstGstRegistered(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {hstGstRegistered === 'yes' && (
        <>
          <div>
            <label htmlFor="gst-number" className="block text-sm font-medium text-gray-700 mb-2">
              GST/HST Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="gst-number"
              name="gst-number"
              required
              placeholder="Enter GST/HST registration number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="tax-province" className="block text-sm font-medium text-gray-700 mb-2">
              Province of Tax Registration <span className="text-red-500">*</span>
            </label>
            <select
              id="tax-province"
              name="tax-province"
              required
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

      {showIncorporatedFields && (
        <>
          <div>
            <label htmlFor="corp-name" className="block text-sm font-medium text-gray-700 mb-2">
              Professional Corporation Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="corp-name"
              name="corp-name"
              required
              placeholder="e.g., Dr. Jane Smith Professional Corporation"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="corp-registration" className="block text-sm font-medium text-gray-700 mb-2">
              Professional Corporation Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="corp-registration"
              name="corp-registration"
              required
              placeholder="Enter corporation registration number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </>
      )}

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
              If you're having trouble with tax and business information, contact our support team at 
              support@mantracomplly.com.
            </p>
          </div>
        </div>
      </div>

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
