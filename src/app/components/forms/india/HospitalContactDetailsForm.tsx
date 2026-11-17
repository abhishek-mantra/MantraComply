import { useState } from "react";
import { IndiaFormButtons } from "./IndiaFormButtons";

interface HospitalContactDetailsFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
}

export function HospitalContactDetailsForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = false,
}: HospitalContactDetailsFormProps) {
  // CEO (Mandatory)
  const [ceoName, setCeoName] = useState(initialData?.ceoName || "");
  const [ceoEmail, setCeoEmail] = useState(initialData?.ceoEmail || "");
  const [ceoNumber, setCeoNumber] = useState(initialData?.ceoNumber || "");

  // TPA Coordinator (Mandatory)
  const [tpaCoordinatorName, setTpaCoordinatorName] = useState(
    initialData?.tpaCoordinatorName || ""
  );
  const [tpaCoordinatorEmail, setTpaCoordinatorEmail] = useState(
    initialData?.tpaCoordinatorEmail || ""
  );
  const [tpaCoordinatorNumber, setTpaCoordinatorNumber] = useState(
    initialData?.tpaCoordinatorNumber || ""
  );

  // Hospital Signing Authority (Mandatory)
  const [signingAuthorityName, setSigningAuthorityName] = useState(
    initialData?.signingAuthorityName || ""
  );
  const [signingAuthorityEmail, setSigningAuthorityEmail] = useState(
    initialData?.signingAuthorityEmail || ""
  );
  const [signingAuthorityNumber, setSigningAuthorityNumber] = useState(
    initialData?.signingAuthorityNumber || ""
  );

  // Billing Person (Mandatory)
  const [billingPersonName, setBillingPersonName] = useState(initialData?.billingPersonName || "");
  const [billingPersonEmail, setBillingPersonEmail] = useState(
    initialData?.billingPersonEmail || ""
  );
  const [billingPersonNumber, setBillingPersonNumber] = useState(
    initialData?.billingPersonNumber || ""
  );

  // Medical Superintendent (Mandatory)
  const [medicalSuperintendentName, setMedicalSuperintendentName] = useState(
    initialData?.medicalSuperintendentName || ""
  );
  const [medicalSuperintendentEmail, setMedicalSuperintendentEmail] = useState(
    initialData?.medicalSuperintendentEmail || ""
  );
  const [medicalSuperintendentNumber, setMedicalSuperintendentNumber] = useState(
    initialData?.medicalSuperintendentNumber || ""
  );

  // Medical Director (Mandatory)
  const [medicalDirectorName, setMedicalDirectorName] = useState(
    initialData?.medicalDirectorName || ""
  );
  const [medicalDirectorEmail, setMedicalDirectorEmail] = useState(
    initialData?.medicalDirectorEmail || ""
  );
  const [medicalDirectorNumber, setMedicalDirectorNumber] = useState(
    initialData?.medicalDirectorNumber || ""
  );

  // Administrator (Mandatory)
  const [administratorName, setAdministratorName] = useState(initialData?.administratorName || "");
  const [administratorEmail, setAdministratorEmail] = useState(
    initialData?.administratorEmail || ""
  );
  const [administratorNumber, setAdministratorNumber] = useState(
    initialData?.administratorNumber || ""
  );

  // Marketing Head (Mandatory)
  const [marketingHeadName, setMarketingHeadName] = useState(initialData?.marketingHeadName || "");
  const [marketingHeadEmail, setMarketingHeadEmail] = useState(
    initialData?.marketingHeadEmail || ""
  );
  const [marketingHeadNumber, setMarketingHeadNumber] = useState(
    initialData?.marketingHeadNumber || ""
  );

  // Account Details (Mandatory)
  const [accountNo, setAccountNo] = useState(initialData?.accountNo || "");
  const [ifscCode, setIfscCode] = useState(initialData?.ifscCode || "");
  const [accountType, setAccountType] = useState(initialData?.accountType || "");
  const [bankName, setBankName] = useState(initialData?.bankName || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountType) {
      alert("Please select the Account Type.");
      return;
    }

    onNext({
      ceoName,
      ceoEmail,
      ceoNumber,
      tpaCoordinatorName,
      tpaCoordinatorEmail,
      tpaCoordinatorNumber,
      signingAuthorityName,
      signingAuthorityEmail,
      signingAuthorityNumber,
      billingPersonName,
      billingPersonEmail,
      billingPersonNumber,
      medicalSuperintendentName,
      medicalSuperintendentEmail,
      medicalSuperintendentNumber,
      medicalDirectorName,
      medicalDirectorEmail,
      medicalDirectorNumber,
      administratorName,
      administratorEmail,
      administratorNumber,
      marketingHeadName,
      marketingHeadEmail,
      marketingHeadNumber,
      accountNo,
      ifscCode,
      accountType,
      bankName,
    });
  };

  const inputClass =
    "w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm transition-all bg-white placeholder:text-gray-400";
  const labelClass = "block text-sm font-medium text-gray-900 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 3-column Grid of Contacts */}
      <div className="space-y-4">
        {/* CEO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              CEO Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter CEO Name"
              value={ceoName}
              onChange={(e) => setCeoName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              CEO Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter CEO Email Address"
              value={ceoEmail}
              onChange={(e) => setCeoEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              CEO Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter CEO Contact Number"
              value={ceoNumber}
              onChange={(e) => setCeoNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* TPA Coordinator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              TPA Co-Ordinator Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter TPA Co-Ordinator Name"
              value={tpaCoordinatorName}
              onChange={(e) => setTpaCoordinatorName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              TPA Co-Ordinator Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter TPA Co-Ordinator Email"
              value={tpaCoordinatorEmail}
              onChange={(e) => setTpaCoordinatorEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              TPA Co-Ordinator Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter Contact Number"
              value={tpaCoordinatorNumber}
              onChange={(e) => setTpaCoordinatorNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Hospital Signing Authority */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Hospital Signing Authority Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Signing Authority Name"
              value={signingAuthorityName}
              onChange={(e) => setSigningAuthorityName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Hospital Signing Authority Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter Email Address"
              value={signingAuthorityEmail}
              onChange={(e) => setSigningAuthorityEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Hospital Signing Authority Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter Contact Number"
              value={signingAuthorityNumber}
              onChange={(e) => setSigningAuthorityNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Billing Person */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Billing Person Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Billing Person Name"
              value={billingPersonName}
              onChange={(e) => setBillingPersonName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Billing Person Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter Email Address"
              value={billingPersonEmail}
              onChange={(e) => setBillingPersonEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Billing Person Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter Contact Number"
              value={billingPersonNumber}
              onChange={(e) => setBillingPersonNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Medical Superintendent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Medical Superintendent Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Medical Superintendent Name"
              value={medicalSuperintendentName}
              onChange={(e) => setMedicalSuperintendentName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Medical Superintendent Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter Email Address"
              value={medicalSuperintendentEmail}
              onChange={(e) => setMedicalSuperintendentEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Medical Superintendent Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter Contact Number"
              value={medicalSuperintendentNumber}
              onChange={(e) => setMedicalSuperintendentNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Medical Director */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Medical Director Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Medical Director Name"
              value={medicalDirectorName}
              onChange={(e) => setMedicalDirectorName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Medical Director Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter Email Address"
              value={medicalDirectorEmail}
              onChange={(e) => setMedicalDirectorEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Medical Director Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter Contact Number"
              value={medicalDirectorNumber}
              onChange={(e) => setMedicalDirectorNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Administrator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Administrator Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Administrator Name"
              value={administratorName}
              onChange={(e) => setAdministratorName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Administrator Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter Email Address"
              value={administratorEmail}
              onChange={(e) => setAdministratorEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Administrator Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter Contact Number"
              value={administratorNumber}
              onChange={(e) => setAdministratorNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Marketing Head */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Marketing Head Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Marketing Head Name"
              value={marketingHeadName}
              onChange={(e) => setMarketingHeadName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Marketing Head Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter Email Address"
              value={marketingHeadEmail}
              onChange={(e) => setMarketingHeadEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Marketing Head Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter Contact Number"
              value={marketingHeadNumber}
              onChange={(e) => setMarketingHeadNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Account Details (Mandatory) */}
      <div className="pt-2">
        <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200/70 rounded-xl mb-4 font-semibold text-sm text-emerald-800 flex items-center justify-between">
          <span>Account Details</span>
          <span className="text-xs font-normal text-emerald-700">All fields required</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>
              Account No. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Account Number"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={11}
              placeholder="e.g. HDFC0001234"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Account Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HDFC Bank"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <IndiaFormButtons onBack={onBack} isFirstStep={isFirstStep} submitText="Save and Continue" />
    </form>
  );
}
