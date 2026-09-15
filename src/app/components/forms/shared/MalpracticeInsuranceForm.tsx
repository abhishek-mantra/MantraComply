import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { FormButtons } from "../FormButtons";
import { UKFormButtons } from "../uk/UKFormButtons";
import { CanadaFormButtons } from "../canada/CanadaFormButtons";
import { AustraliaFormButtons } from "../australia/AustraliaFormButtons";
import { UAEFormButtons } from "../uae/UAEFormButtons";
import { ContextualHelpLink } from "../../shared/ContextualHelpLink";

type Country = "US" | "UK" | "Canada" | "Australia" | "UAE";

interface MalpracticeInsuranceFormProps {
  country: Country;
  onNext: (data?: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  selectedService?: string;
}

export function MalpracticeInsuranceForm({
  country,
  onNext,
  onBack,
  isFirstStep = false,
  isLastStep = false,
  selectedService = "",
}: MalpracticeInsuranceFormProps) {
  const [hasInsurance, setHasInsurance] = useState("");
  const [insuranceCarrier, setInsuranceCarrier] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [aggregateAmount, setAggregateAmount] = useState("");
  const [tailCoverage, setTailCoverage] = useState("");

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

  const insuranceTitle =
    country === "UK" || country === "Australia" || country === "UAE"
      ? "Professional Indemnity Insurance"
      : "Malpractice Insurance";

  const getMinCoverageNote = () => {
    const defaultNotes = {
      US: "$1,000,000 per occurrence / $3,000,000 aggregate",
      UK: "£6,000,000 per claim",
      Canada: "$2,000,000 per occurrence / $4,000,000 aggregate",
      Australia: "$20,000,000 per claim",
      UAE: "AED 500,000 per claim",
    };

    // Override UK coverage for doctors
    if (country === "UK" && selectedService === "doctor") {
      return "£10,000,000 per claim";
    }

    return defaultNotes[country];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-700 font-medium mb-1">
            {insuranceTitle} Required
          </p>
          <p className="text-sm text-gray-600">
            {country === "US" && "All providers must maintain malpractice insurance to be credentialed with insurance panels. Minimum coverage typically required: "}
            {country === "UK" && "Professional indemnity insurance is required for all healthcare providers in the UK. Minimum coverage typically required: "}
            {country === "Canada" && "Professional liability insurance is required. Minimum coverage typically required: "}
            {country === "Australia" && "Professional indemnity insurance is mandatory for all AHPRA-registered practitioners. Minimum coverage required: "}
            {country === "UAE" && "Professional indemnity insurance is mandatory for all licensed healthcare providers in the UAE. Minimum coverage required: "}
            <strong>{getMinCoverageNote()}</strong>
          </p>
          <ContextualHelpLink
            slug="malpractice-insurance-and-coi-requirements"
            label="Malpractice insurance COI limits ($1M/$3M), policy types & tail coverage"
          />
        </div>
      </div>

      {/* Do you have insurance? */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you currently have {insuranceTitle.toLowerCase()}? <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={hasInsurance}
          onChange={(e) => setHasInsurance(e.target.value)}
          className={inputClassName}
        >
          <option value="">Select...</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="pending">Pending/In Process</option>
        </select>
      </div>

      {hasInsurance === "yes" && (
        <>
          {/* Insurance Carrier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Carrier/Provider <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={insuranceCarrier}
              onChange={(e) => setInsuranceCarrier(e.target.value)}
              placeholder="Enter insurance carrier name"
              className={inputClassName}
            />
          </div>

          {/* Policy Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              placeholder="Enter policy number"
              className={inputClassName}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Effective Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className={inputClassName}
                placeholder="MM/DD/YYYY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className={inputClassName}
                placeholder="MM/DD/YYYY"
              />
            </div>
          </div>

          {/* Coverage Amounts */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coverage Per {country === "US" || country === "Canada" ? "Occurrence" : "Claim"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(e.target.value)}
                placeholder={
                  country === "US" ? "$1,000,000" :
                  country === "UK" ? "£6,000,000" :
                  country === "Canada" ? "$2,000,000" :
                  country === "Australia" ? "$20,000,000" :
                  "AED 500,000"
                }
                className={inputClassName}
              />
            </div>

            {(country === "US" || country === "Canada") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aggregate Coverage <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={aggregateAmount}
                  onChange={(e) => setAggregateAmount(e.target.value)}
                  placeholder={country === "US" ? "$3,000,000" : "$4,000,000"}
                  className={inputClassName}
                />
              </div>
            )}
          </div>

          {/* Tail Coverage - US only */}
          {country === "US" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have tail coverage? <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={tailCoverage}
                onChange={(e) => setTailCoverage(e.target.value)}
                className={inputClassName}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="not-applicable">Not Applicable</option>
              </select>
            </div>
          )}

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Certificate of Insurance <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2196F3] transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, PNG, or JPG (max. 10MB)</p>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
              />
            </div>
          </div>
        </>
      )}

      {hasInsurance === "no" && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> {insuranceTitle} is typically required for credentialing. 
            {country === "UK" && " You may need to obtain coverage through providers such as Medical Protection Society (MPS), Medical Defence Union (MDU), or Dental Protection."}
            {country === "Australia" && " You may obtain coverage through providers such as MIGA, Avant, or MDA National."}
            {country === "Canada" && " You may obtain coverage through providers such as CMPA (Canadian Medical Protective Association) or private insurers."}
            {country === "UAE" && " You must obtain coverage from an approved insurance provider in the UAE before licensure can be finalized."}
            {country === "US" && " Please contact insurance providers to obtain coverage before proceeding with credentialing."}
          </p>
        </div>
      )}

      {hasInsurance === "pending" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            Please complete this section once your insurance is finalized. You can save your progress and return to complete it later.
          </p>
        </div>
      )}

      {renderFormButtons()}
    </form>
  );
}
