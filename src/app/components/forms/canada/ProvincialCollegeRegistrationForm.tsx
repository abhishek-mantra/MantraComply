import { useState } from "react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface ProvincialCollegeRegistrationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function ProvincialCollegeRegistrationForm({ onNext, onBack }: ProvincialCollegeRegistrationFormProps) {
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [showSupervisedFields, setShowSupervisedFields] = useState(false);

  const handleRegistrationChange = (value: string) => {
    setRegistrationStatus(value);
    setShowSupervisedFields(value === "qualifying" || value === "supervised");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="registration-number" className="block text-sm font-medium text-gray-700 mb-2">
          College Registration Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="registration-number"
          name="registration-number"
          required
          placeholder="Enter your college registration number"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
        <p className="mt-1 text-sm text-gray-500">
          Your CRPO registration number is found on your registration certificate.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registration Status <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            { value: 'full', label: 'Full / General Registration' },
            { value: 'qualifying', label: 'Qualifying / Provisional Registration' },
            { value: 'supervised', label: 'Supervised Practice' },
            { value: 'non-practising', label: 'Non-Practising' }
          ].map((status) => (
            <label
              key={status.value}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="registration-status"
                value={status.value}
                required
                onChange={() => handleRegistrationChange(status.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{status.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="renewal-date" className="block text-sm font-medium text-gray-700 mb-2">
          Registration Expiry / Renewal Date <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="renewal-date"
          name="renewal-date"
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          placeholder="MM/DD/YYYY"
        />
      </div>

      <div>
        <label htmlFor="registration-certificate" className="block text-sm font-medium text-gray-700 mb-2">
          Registration Certificate <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-[#CBD5E0] rounded-lg p-8 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
          <input
            type="file"
            id="registration-certificate"
            name="registration-certificate"
            required
            className="hidden"
          />
          <label htmlFor="registration-certificate" className="cursor-pointer">
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

      {showSupervisedFields && (
        <>
          <div>
            <label htmlFor="supervised-hours" className="block text-sm font-medium text-gray-700 mb-2">
              Supervised Hours Completed <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="supervised-hours"
              name="supervised-hours"
              required
              placeholder="e.g., 450"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter the number of supervised clinical hours completed to date.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="supervisor-name" className="block text-sm font-medium text-gray-700 mb-2">
                Supervisor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="supervisor-name"
                name="supervisor-name"
                required
                placeholder="Supervisor name"
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label htmlFor="supervisor-registration" className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="supervisor-registration"
                name="supervisor-registration"
                required
                placeholder="Supervisor registration number"
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
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
              If you're having trouble finding your registration information, contact your provincial college directly 
              or reach out to our support team at support@mantracomplly.com.
            </p>
          </div>
        </div>
      </div>

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
