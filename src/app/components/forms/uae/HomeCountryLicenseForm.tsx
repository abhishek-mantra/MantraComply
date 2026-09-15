import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";
import { UAE_SERVICE_CONFIG, type UAEServiceType } from "../../../config/uaeServiceConfig";

interface HomeCountryLicenseFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  selectedService?: UAEServiceType | "";
}

export function HomeCountryLicenseForm({ onNext, onBack, selectedService }: HomeCountryLicenseFormProps) {
  const [countryOfQualification, setCountryOfQualification] = useState("");
  const [regulatoryBody, setRegulatoryBody] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseStatus, setLicenseStatus] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

  // Get service-specific options or use default therapy options
  const serviceConfig = selectedService ? UAE_SERVICE_CONFIG[selectedService] : UAE_SERVICE_CONFIG.therapy;
  const regulatoryBodyPlaceholder = serviceConfig.homeCountryRegulatoryBodyPlaceholder;
  const experienceHelperText = serviceConfig.experienceHelperText;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ countryOfQualification, regulatoryBody, yearsExperience });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          A current, active license or registration from your home country is required by all UAE health authorities. If your country of training does not have a licensing system, you must provide equivalent proof of competence.
        </p>
      </div>

      <div>
        <label htmlFor="country-qualification" className="block text-sm font-medium text-gray-700 mb-2">
          Country of Qualification / Original Licensure <span className="text-red-500">*</span>
        </label>
        <select
          id="country-qualification"
          name="country-qualification"
          required
          value={countryOfQualification}
          onChange={(e) => setCountryOfQualification(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select country...</option>
          <option value="united-states">United States</option>
          <option value="united-kingdom">United Kingdom</option>
          <option value="canada">Canada</option>
          <option value="australia">Australia</option>
          <option value="india">India</option>
          <option value="pakistan">Pakistan</option>
          <option value="philippines">Philippines</option>
          <option value="egypt">Egypt</option>
          <option value="jordan">Jordan</option>
          <option value="lebanon">Lebanon</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="regulatory-body" className="block text-sm font-medium text-gray-700 mb-2">
          Home Country Regulatory Body <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="regulatory-body"
          name="regulatory-body"
          required
          value={regulatoryBody}
          onChange={(e) => setRegulatoryBody(e.target.value)}
          placeholder={regulatoryBodyPlaceholder}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="license-number" className="block text-sm font-medium text-gray-700 mb-2">
          Home Country License / Registration Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="license-number"
          name="license-number"
          required
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          License Status <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {["Active", "Expired", "Surrendered"].map((status) => (
            <label
              key={status}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="license-status"
                value={status.toLowerCase()}
                required
                checked={licenseStatus === status.toLowerCase()}
                onChange={(e) => setLicenseStatus(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="license-expiry" className="block text-sm font-medium text-gray-700 mb-2">
          License Expiry Date <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="license-expiry"
          name="license-expiry"
          required
          value={licenseExpiry}
          onChange={(e) => setLicenseExpiry(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          placeholder="MM/DD/YYYY"
        />
      </div>

      <div>
        <label htmlFor="license-certificate" className="block text-sm font-medium text-gray-700 mb-2">
          Home Country License Certificate <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
          <input
            type="file"
            id="license-certificate"
            name="license-certificate"
            required
            className="hidden"
          />
          <label htmlFor="license-certificate" className="cursor-pointer">
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

      <div>
        <label htmlFor="good-standing" className="block text-sm font-medium text-gray-700 mb-2">
          Good Standing Letter <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
          <input
            type="file"
            id="good-standing"
            name="good-standing"
            required
            className="hidden"
          />
          <label htmlFor="good-standing" className="cursor-pointer">
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
        <p className="mt-1 text-sm text-gray-500">
          A letter from your home country regulatory body confirming you are in good standing and have no disciplinary actions.
        </p>
      </div>

      <div>
        <label htmlFor="years-experience" className="block text-sm font-medium text-gray-700 mb-2">
          Years of Post-Qualification Experience <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="years-experience"
          name="years-experience"
          required
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
          placeholder="e.g., 3"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
        <p className="mt-1 text-sm text-gray-500">
          {experienceHelperText}
        </p>
      </div>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}