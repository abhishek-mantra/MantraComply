import { useState } from "react";
import { FormButtons } from "../FormButtons";
import { UKFormButtons } from "../uk/UKFormButtons";
import { CanadaFormButtons } from "../canada/CanadaFormButtons";
import { AustraliaFormButtons } from "../australia/AustraliaFormButtons";
import { UAEFormButtons } from "../uae/UAEFormButtons";
import { StateDropdown } from "../StateDropdown";
import { ContextualHelpLink } from "../../shared/ContextualHelpLink";

type Country = "US" | "UK" | "Canada" | "Australia" | "UAE";

interface PersonalInformationFormProps {
  country: Country;
  onNext: (data?: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
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

const AUSTRALIAN_STATES = [
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
];

const UK_COUNTRIES = ["England", "Scotland", "Wales", "Northern Ireland"];

const EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

export function PersonalInformationForm({
  country,
  onNext,
  onBack,
  isFirstStep = false,
  isLastStep = false,
}: PersonalInformationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dob, setDob] = useState("");
  const [ssn, setSSN] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvinceCounty, setStateProvinceCounty] = useState("");
  const [zipPostcode, setZipPostcode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const renderFormButtons = () => {
    switch (country) {
      case "US":
        return <FormButtons onPrevious={onBack} isFirstStep={isFirstStep} />;
      case "UK":
        return <UKFormButtons onBack={onBack} />;
      case "Canada":
        return <CanadaFormButtons onBack={onBack} />;
      case "Australia":
        return <AustraliaFormButtons onBack={onBack} />;
      case "UAE":
        return <UAEFormButtons onBack={onBack} isLastStep={isLastStep} />;
      default:
        return <FormButtons onPrevious={onBack} isFirstStep={isFirstStep} />;
    }
  };

  const inputClassName =
    country === "US"
      ? "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
      : "w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
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
            placeholder={country === "US" ? "First name" : "Enter first name"}
            className={inputClassName}
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
            placeholder={country === "US" ? "Last name" : "Enter last name"}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Middle Name */}
      <div>
        <label htmlFor="middle-name" className="block text-sm font-medium text-gray-700 mb-2">
          Middle Name {country !== "US" && <span className="text-gray-400">(optional)</span>}
        </label>
        <input
          type="text"
          id="middle-name"
          name="middle-name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          placeholder={country === "US" ? "Middle name (optional)" : "Enter middle name"}
          className={inputClassName}
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="dob"
          name="dob"
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className={inputClassName}
          placeholder="MM/DD/YYYY"
        />
      </div>

      {/* SSN - US Only */}
      {country === "US" && (
        <div>
          <label htmlFor="ssn" className="block text-sm font-medium text-gray-900 mb-2">
            Social Security Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ssn"
            name="ssn"
            required
            value={ssn}
            onChange={(e) => setSSN(e.target.value)}
            placeholder="XXX-XX-XXXX"
            className={inputClassName}
          />
          <div className="flex items-start gap-2 mt-2">
            <svg className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-gray-600">This information is encrypted and securely stored</p>
          </div>
          <ContextualHelpLink
            slug="primary-source-verification-and-identity"
            label="Why SSN is required for primary source verification & OIG checks"
          />
        </div>
      )}

      {/* Passport Number - UAE, Australia */}
      {(country === "UAE" || country === "Australia") && (
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
            placeholder="Enter passport number"
            className={inputClassName}
          />
        </div>
      )}

      {/* Nationality - UAE */}
      {country === "UAE" && (
        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
            Nationality <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            required
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Enter nationality"
            className={inputClassName}
          />
        </div>
      )}

      {/* Place of Birth - UAE */}
      {country === "UAE" && (
        <div>
          <label htmlFor="place-of-birth" className="block text-sm font-medium text-gray-700 mb-2">
            Place of Birth (City, Country) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="place-of-birth"
            name="place-of-birth"
            required
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
            placeholder="e.g., London, United Kingdom"
            className={inputClassName}
          />
        </div>
      )}

      {/* Home Address */}
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
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder="Street address"
            className={inputClassName}
          />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className={inputClassName}
              />
            </div>

            <div>
              {country === "US" ? (
                <StateDropdown />
              ) : country === "Canada" ? (
                <select
                  id="province"
                  name="province"
                  required
                  value={stateProvinceCounty}
                  onChange={(e) => setStateProvinceCounty(e.target.value)}
                  className={inputClassName}
                >
                  <option value="">Province...</option>
                  {PROVINCES.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              ) : country === "Australia" ? (
                <select
                  id="state"
                  name="state"
                  required
                  value={stateProvinceCounty}
                  onChange={(e) => setStateProvinceCounty(e.target.value)}
                  className={inputClassName}
                >
                  <option value="">State...</option>
                  {AUSTRALIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              ) : country === "UAE" ? (
                <select
                  id="emirate"
                  name="emirate"
                  required
                  value={stateProvinceCounty}
                  onChange={(e) => setStateProvinceCounty(e.target.value)}
                  className={inputClassName}
                >
                  <option value="">Emirate...</option>
                  {EMIRATES.map((emirate) => (
                    <option key={emirate} value={emirate}>
                      {emirate}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id="county"
                  name="county"
                  required
                  value={stateProvinceCounty}
                  onChange={(e) => setStateProvinceCounty(e.target.value)}
                  placeholder="County"
                  className={inputClassName}
                />
              )}
            </div>

            <div>
              <input
                type="text"
                id="zip-postcode"
                name="zip-postcode"
                required
                value={zipPostcode}
                onChange={(e) => setZipPostcode(e.target.value)}
                placeholder={country === "US" ? "ZIP" : "Postcode"}
                className={inputClassName}
              />
            </div>
          </div>

          {/* Country selector for UK */}
          {country === "UK" && (
            <div>
              <select
                id="country"
                name="country"
                required
                value={addressCountry}
                onChange={(e) => setAddressCountry(e.target.value)}
                className={inputClassName}
              >
                <option value="">Select country...</option>
                {UK_COUNTRIES.map((ukCountry) => (
                  <option key={ukCountry} value={ukCountry.toLowerCase().replace(" ", "-")}>
                    {ukCountry}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Info Notes for Canada and Australia */}
      {country === "Canada" && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Social Security Number (SSN) is not collected for Canadian credentialing.
          </p>
        </div>
      )}

      {country === "Australia" && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Do NOT include Tax File Number (TFN) or SSN — not collected for credentialing purposes.
          </p>
        </div>
      )}

      {renderFormButtons()}
    </form>
  );
}
