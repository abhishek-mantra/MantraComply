import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface PassportPersonalInformationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function PassportPersonalInformationForm({ onNext, onBack }: PassportPersonalInformationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportIssueDate, setPassportIssueDate] = useState("");
  const [passportExpiryDate, setPassportExpiryDate] = useState("");
  const [uaeVisaNumber, setUaeVisaNumber] = useState("");
  const [emiratesId, setEmiratesId] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [emirate, setEmirate] = useState("");
  const [poBox, setPoBox] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      gender,
      nationality,
      passportNumber,
      phone,
      email
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          All UAE health authority applications require a valid passport. Ensure your passport has at least 6 months validity.
        </p>
      </div>

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
          type="date"
          id="dob"
          name="dob"
          required
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {["Male", "Female"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="gender"
                value={option.toLowerCase()}
                required
                checked={gender === option.toLowerCase()}
                onChange={(e) => setGender(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
          Nationality <span className="text-red-500">*</span>
        </label>
        <select
          id="nationality"
          name="nationality"
          required
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select nationality...</option>
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
        <label htmlFor="passport-number" className="block text-sm font-medium text-gray-700 mb-2">
          Passport Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="passport-number"
          name="passport-number"
          required
          value={passportNumber}
          onChange={(e) => setPassportNumber(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="passport-issue-date" className="block text-sm font-medium text-gray-700 mb-2">
            Passport Issue Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="passport-issue-date"
            name="passport-issue-date"
            required
            value={passportIssueDate}
            onChange={(e) => setPassportIssueDate(e.target.value)}
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div>
          <label htmlFor="passport-expiry-date" className="block text-sm font-medium text-gray-700 mb-2">
            Passport Expiry Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="passport-expiry-date"
            name="passport-expiry-date"
            required
            value={passportExpiryDate}
            onChange={(e) => setPassportExpiryDate(e.target.value)}
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="passport-copy" className="block text-sm font-medium text-gray-700 mb-2">
          Passport Copy <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
          <input
            type="file"
            id="passport-copy"
            name="passport-copy"
            required
            className="hidden"
          />
          <label htmlFor="passport-copy" className="cursor-pointer">
            <div className="text-gray-600">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <span className="text-[#2563EB] font-medium">Upload passport copy</span>
              </p>
              <p className="text-xs text-gray-500">Colour scan of all pages, PDF or JPG</p>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="passport-photo" className="block text-sm font-medium text-gray-700 mb-2">
          Passport Photo <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
          <input
            type="file"
            id="passport-photo"
            name="passport-photo"
            required
            className="hidden"
          />
          <label htmlFor="passport-photo" className="cursor-pointer">
            <div className="text-gray-600">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <span className="text-[#2563EB] font-medium">Upload passport photo</span>
              </p>
              <p className="text-xs text-gray-500">White background, recent, JPG format</p>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="uae-visa" className="block text-sm font-medium text-gray-700 mb-2">
          UAE Residence Visa Number <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="uae-visa"
          name="uae-visa"
          value={uaeVisaNumber}
          onChange={(e) => setUaeVisaNumber(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="emirates-id" className="block text-sm font-medium text-gray-700 mb-2">
          Emirates ID Number <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="emirates-id"
          name="emirates-id"
          value={emiratesId}
          onChange={(e) => setEmiratesId(e.target.value)}
          placeholder="784-XXXX-XXXXXXX-X"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Home Address in UAE</h3>

        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
              Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="emirate" className="block text-sm font-medium text-gray-700 mb-2">
              Emirate
            </label>
            <input
              type="text"
              id="emirate"
              name="emirate"
              value={emirate}
              onChange={(e) => setEmirate(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="po-box" className="block text-sm font-medium text-gray-700 mb-2">
              PO Box
            </label>
            <input
              type="text"
              id="po-box"
              name="po-box"
              value={poBox}
              onChange={(e) => setPoBox(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Contact Phone Number <span className="text-red-500">*</span>
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

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Personal Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700">
          If you need assistance with your UAE application or have questions about required documents, our team is here to help.
        </p>
      </div>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}
