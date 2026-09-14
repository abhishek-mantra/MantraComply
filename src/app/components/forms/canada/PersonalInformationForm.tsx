import { CanadaFormButtons } from "./CanadaFormButtons";

interface PersonalInformationFormProps {
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

export function PersonalInformationForm({ onNext, onBack }: PersonalInformationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            required
            placeholder="First name"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            required
            placeholder="Last name"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="middle-name" className="block text-sm font-medium text-gray-700 mb-2">
          Middle Name <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="middle-name"
          name="middle-name"
          placeholder="Middle name"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Home Address <span className="text-red-500">*</span>
        </label>
        <div className="space-y-4">
          <input
            type="text"
            id="street-address"
            name="street-address"
            required
            placeholder="Street address"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder="City"
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <select
                id="province"
                name="province"
                required
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="">Province</option>
                {PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                id="postal-code"
                name="postal-code"
                required
                placeholder="Postal Code"
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Primary Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder="(123) 456-7890"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Language <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {['English', 'French', 'Bilingual'].map((language) => (
            <label
              key={language}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="preferred-language"
                value={language.toLowerCase()}
                required
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{language}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Social Security Number (SSN) is not collected for Canadian credentialing.
        </p>
      </div>

      <CanadaFormButtons onBack={onBack} />
    </form>
  );
}
