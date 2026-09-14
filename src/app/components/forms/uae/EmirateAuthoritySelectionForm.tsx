import { useState, useEffect } from "react";
import { UAEFormButtons } from "./UAEFormButtons";
import { CountrySwitcher } from "../../CountrySwitcher";
import { UAE_SERVICE_CONFIG, type UAEServiceType } from "../../../config/uaeServiceConfig";

interface EmirateAuthoritySelectionFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
  selectedService?: UAEServiceType | "";
}

const EMIRATES = [
  { value: "dubai", label: "Dubai — DHA (Dubai Health Authority) for clinical roles; CDA (Community Development Authority) for non-clinical counsellors" },
  { value: "abu-dhabi", label: "Abu Dhabi — DOH (Department of Health — Abu Dhabi)" },
  { value: "sharjah", label: "Sharjah — SHA (Sharjah Health Authority) / MOHAP" },
  { value: "other", label: "Ajman / Ras Al Khaimah / Umm Al Quwain / Fujairah — MOHAP (Ministry of Health & Prevention)" }
];

const AUTHORITIES = ["DHA", "CDA", "DOH", "MOHAP", "SHA"];

export function EmirateAuthoritySelectionForm({
  onNext,
  onBack,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange,
  selectedService
}: EmirateAuthoritySelectionFormProps) {
  const [emirate, setEmirate] = useState("");
  const [professionalCategory, setProfessionalCategory] = useState("");
  const [authority, setAuthority] = useState("");
  const [hasUAELicense, setHasUAELicense] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [issuingAuthority, setIssuingAuthority] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");

  // Get service-specific options or use default therapy options
  const serviceConfig = selectedService ? UAE_SERVICE_CONFIG[selectedService] : UAE_SERVICE_CONFIG.therapy;
  const professionalCategories = serviceConfig.professionalCategories;
  const showCDANote = serviceConfig.showCDANote;

  useEffect(() => {
    // Auto-determine authority based on emirate and professional category
    if (emirate && professionalCategory) {
      let determinedAuthority = "";
      
      if (emirate === "dubai") {
        if (["Clinical Psychologist", "Psychiatrist"].includes(professionalCategory)) {
          determinedAuthority = "DHA (Sheryan Portal)";
        } else if (["Counsellor", "Marriage & Family Therapist", "Clinical Social Worker / Mental Health Social Worker"].includes(professionalCategory)) {
          determinedAuthority = "CDA (Community-Based)";
        } else {
          determinedAuthority = "DHA";
        }
      } else if (emirate === "abu-dhabi") {
        determinedAuthority = "DOH";
      } else if (emirate === "sharjah") {
        determinedAuthority = "SHA / MOHAP";
      } else if (emirate === "other") {
        determinedAuthority = "MOHAP";
      }
      
      setAuthority(determinedAuthority);
    }
  }, [emirate, professionalCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ specialty: professionalCategory });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showCountrySwitcher && (
        <CountrySwitcher
          selectedCountry={selectedCountry || ""}
          onCountryChange={onCountryChange || (() => {})}
        />
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          The UAE has a multi-emirate licensing system. Different health authorities govern different geographic areas. Please select the emirate where you intend to practice to determine the correct authority for your application.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Emirate of Practice <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {EMIRATES.map((em) => (
            <label
              key={em.value}
              className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="emirate"
                value={em.value}
                required
                checked={emirate === em.value}
                onChange={(e) => setEmirate(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] mt-0.5"
              />
              <span className="text-gray-900 text-sm">{em.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="professional-category" className="block text-sm font-medium text-gray-700 mb-2">
          Professional Category <span className="text-red-500">*</span>
        </label>
        <select
          id="professional-category"
          name="professional-category"
          required
          value={professionalCategory}
          onChange={(e) => setProfessionalCategory(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select a category...</option>
          {professionalCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {authority && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-900 mb-1">Authority Applicable</p>
          <p className="text-sm text-gray-700">
            Your application will be processed through: <strong>{authority}</strong>
          </p>
          {showCDANote && (
            <p className="text-sm text-gray-700 mt-2">
              Note: If you are a non-clinical counsellor, you may need to apply through the CDA (Community Development Authority).
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you already hold a UAE license? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="has-uae-license"
                value={option.toLowerCase()}
                required
                checked={hasUAELicense === option.toLowerCase()}
                onChange={(e) => setHasUAELicense(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {hasUAELicense === "yes" && (
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div>
            <label htmlFor="license-number" className="block text-sm font-medium text-gray-700 mb-2">
              Current License Number
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
            <label htmlFor="issuing-authority" className="block text-sm font-medium text-gray-700 mb-2">
              Issuing Authority
            </label>
            <select
              id="issuing-authority"
              name="issuing-authority"
              required
              value={issuingAuthority}
              onChange={(e) => setIssuingAuthority(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select authority...</option>
              {AUTHORITIES.map((auth) => (
                <option key={auth} value={auth}>
                  {auth}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="license-expiry" className="block text-sm font-medium text-gray-700 mb-2">
              License Expiry Date
            </label>
            <input
              type="date"
              id="license-expiry"
              name="license-expiry"
              required
              value={licenseExpiry}
              onChange={(e) => setLicenseExpiry(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>
      )}

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}