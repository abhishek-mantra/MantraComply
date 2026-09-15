import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface PersonalInformationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

const AUSTRALIAN_STATES = [
  "ACT",
  "NSW",
  "NT",
  "QLD",
  "SA",
  "TAS",
  "VIC",
  "WA"
];

export function PersonalInformationForm({ onNext, onBack }: PersonalInformationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      address: { streetAddress, suburb, state, postcode },
      phone
    });
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="dob"
          name="dob"
          required
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          placeholder="MM/DD/YYYY"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Home Address</h3>

        <div>
          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address
          </label>
          <input
            type="text"
            id="street-address"
            name="street-address"
            required
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="suburb" className="block text-sm font-medium text-gray-700 mb-2">
              Suburb
            </label>
            <input
              type="text"
              id="suburb"
              name="suburb"
              required
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              id="state"
              name="state"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select...</option>
              {AUSTRALIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              required
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              maxLength={4}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Do NOT include Tax File Number (TFN) or SSN — not collected for credentialing purposes.
        </p>
      </div>

      <AustraliaFormButtons onBack={onBack} />
    </form>
  );
}
