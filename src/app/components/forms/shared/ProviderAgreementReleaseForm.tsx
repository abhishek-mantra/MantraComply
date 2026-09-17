import { useState } from "react";
import { FormButtons } from "../FormButtons";
import { ContextualHelpLink } from "../../shared/ContextualHelpLink";

export interface ProviderAgreementReleaseFormProps {
  country?: string;
  specialty?: string;
  selectedSpecialization?: string;
  onNext: (data?: any) => void;
  onPrevious?: () => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

interface RegionalEntityConfig {
  entityName: string;
  regionLabel: string;
  governingLaw: string;
  arbitrationVenue: string;
  platform: string;
  privacyTitle: string;
  privacyAct: string;
}

const REGIONAL_CONFIGS: Record<string, RegionalEntityConfig> = {
  us: {
    entityName: "MCH International LLC",
    regionLabel: "United States (and Rest of World)",
    governingLaw: "State of Wyoming, USA",
    arbitrationVenue: "Wyoming, USA",
    platform: "CAQH ProView / Payer Portals",
    privacyTitle: "Business Associate Agreement (BAA)",
    privacyAct: "Health Insurance Portability and Accountability Act (HIPAA) & HITECH",
  },
  uk: {
    entityName: "MANTRA RISE LTD",
    regionLabel: "United Kingdom",
    governingLaw: "Laws of England & Wales",
    arbitrationVenue: "London, United Kingdom",
    platform: "Payer Enrollment / Healthcode",
    privacyTitle: "UK GDPR & Data Processing Agreement",
    privacyAct: "UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018",
  },
  canada: {
    entityName: "MantraCare Canada Inc.",
    regionLabel: "Canada",
    governingLaw: "Laws of Ontario & Federal Laws of Canada",
    arbitrationVenue: "Toronto, Ontario, Canada",
    platform: "Provincial / Private Payer Portals (e.g., Telus Health)",
    privacyTitle: "PIPEDA & Provincial Privacy Compliance Agreement",
    privacyAct: "Personal Information Protection and Electronic Documents Act (PIPEDA) & PHIPA",
  },
  uae: {
    entityName: "MANTRARISE CONSULTING – FZCO",
    regionLabel: "United Arab Emirates",
    governingLaw: "Laws of UAE",
    arbitrationVenue: "Dubai, UAE",
    platform: "DHA / DOH / Nabidh / Malaffi",
    privacyTitle: "UAE PDPL & Health Data Protection Agreement",
    privacyAct: "UAE Federal Decree Law No. 45 of 2021 (PDPL) & Health Regulations",
  },
  australia: {
    entityName: "MCH International LLC",
    regionLabel: "Australia",
    governingLaw: "State of Wyoming, USA",
    arbitrationVenue: "Wyoming, USA",
    platform: "AHPRA & Private Health Insurer Platforms",
    privacyTitle: "Australian Privacy Principles (APP) Agreement",
    privacyAct: "Privacy Act 1988 (Cth) & Australian Privacy Principles",
  },
};

export function ProviderAgreementReleaseForm({
  country = "us",
  specialty,
  onNext,
  onPrevious,
  onBack,
  isFirstStep = false,
}: ProviderAgreementReleaseFormProps) {
  const normCountry = (country || "us").toLowerCase();
  const config = REGIONAL_CONFIGS[normCountry] || REGIONAL_CONFIGS.us;

  // Signatures and agreement states
  const [baaSignature, setBaaSignature] = useState("");
  const [baaAgreed, setBaaAgreed] = useState(false);

  const [providerSignature, setProviderSignature] = useState("");
  const [providerAgreed, setProviderAgreed] = useState(false);

  // Engagement Model Selection (From Section 2 & Annexure A)
  const [engagementModel, setEngagementModel] = useState<"model1" | "model2">("model1");
  const [includeRcmAddon, setIncludeRcmAddon] = useState(false);

  // Specific Contract Covenants (From Sections 5, 6 & 7)
  const [ackScope, setAckScope] = useState(false);
  const [ackNotice, setAckNotice] = useState(false);

  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baaAgreed || !baaSignature.trim()) {
      alert("Please review, sign, and agree to the Business Associate / Data Privacy Agreement.");
      return;
    }
    if (!providerAgreed || !providerSignature.trim() || !ackScope || !ackNotice) {
      alert("Please review, sign, and agree to the Provider Agreement and required covenants.");
      return;
    }

    onNext({
      engagementModel,
      includeRcmAddon: engagementModel === "model2" ? includeRcmAddon : false,
      contractingEntity: config.entityName,
      effectiveDate: todayFormatted,
      baaSignature: baaSignature.trim(),
      providerSignature: providerSignature.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Warning Callout matching earlier UI */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-md p-4 flex items-start gap-2">
        <svg
          className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <p className="font-medium text-yellow-900 text-sm">
            Please review and sign the following agreements
          </p>
          <p className="text-sm text-yellow-800 mt-1">
            These documents are required to proceed with credentialing under MantraComply.
          </p>
          <ContextualHelpLink
            slug="background-checks-and-release-forms"
            label="What background checks & release authorizations do payers run?"
          />
        </div>
      </div>

      {/* 1. Business Associate / Privacy Agreement Card matching earlier UI */}
      <div className="border border-gray-200 rounded-md p-6 bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">{config.privacyTitle}</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 max-h-48 overflow-y-auto text-sm text-gray-700 leading-relaxed space-y-2.5">
          <p className="font-medium">
            DATA PROTECTION & CONFIDENTIALITY SAFEGUARDS ({config.privacyAct})
          </p>
          <p>
            This Agreement sets forth data protection obligations between MantraComply (operating through{" "}
            <strong>{config.entityName}</strong>) and the Provider signing below.
          </p>
          <p>
            <strong>1. Purpose & Protected Information:</strong> MantraComply implements administrative, physical,
            and technical safeguards complying with applicable healthcare data privacy legislation (including{" "}
            {config.privacyAct}) to protect Provider credentials and Personal Health Information (PHI).
          </p>
          <p>
            <strong>2. Permitted Uses:</strong> MantraComply may collect, verify, process, and disclose credentials
            only as strictly required to submit credentialing applications, enroll in payer networks, and facilitate
            compliance operations.
          </p>
          <p>
            <strong>3. Security Safeguards:</strong> Mantra maintains encrypted transmission, role-based access controls,
            and administrative safeguards to ensure that provider registration data and PHI remain strictly confidential
            and secure.
          </p>
          <p>
            <strong>4. Breach Notification:</strong> In the event of an unauthorized disclosure or data security incident,
            affected parties will be notified promptly in accordance with statutory privacy requirements.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Digital Signature <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={baaSignature}
            onChange={(e) => setBaaSignature(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="Type your full name to sign"
          />
          <p className="text-xs text-gray-500 mt-1">
            By typing your name, you agree to the terms of the {config.privacyTitle}.
          </p>
        </div>

        <label className="flex items-start">
          <input
            type="checkbox"
            checked={baaAgreed}
            onChange={(e) => setBaaAgreed(e.target.checked)}
            className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the {config.privacyTitle}
          </span>
        </label>
      </div>

      {/* 2. Provider Credentialing & Enrollment Services Agreement Card */}
      <div className="border border-gray-200 rounded-md p-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
          <h3 className="font-semibold text-gray-900">
            Provider Credentialing & Enrollment Services Agreement
          </h3>
          <span className="text-xs text-gray-500 font-medium">
            Effective Date: {todayFormatted}
          </span>
        </div>

        {/* Selected Engagement Model (From Section 2 & Annexure A of the Agreement) */}
        <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Select Your Engagement Model (Section 2 & Annexure A) <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="engagementModel"
                value="model1"
                checked={engagementModel === "model1"}
                onChange={() => setEngagementModel("model1")}
                className="mt-0.5 text-[#2196F3] focus:ring-[#2196F3]"
              />
              <div className="text-sm">
                <span className="font-medium text-gray-900">
                  Model 1: Under Mantra Network
                </span>{" "}
                <span className="text-emerald-700 font-semibold text-xs bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  $0 Credentialing Fee
                </span>
                <p className="text-xs text-gray-600 mt-0.5">
                  Mantra provides client referrals (B2C, B2B, insurance) (subject to availability), handles insurance billing natively, receives disbursements,
                  and remits agreed provider payouts. Mantra manages portal logins solely for the duration of engagement.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-gray-200">
              <input
                type="radio"
                name="engagementModel"
                value="model2"
                checked={engagementModel === "model2"}
                onChange={() => setEngagementModel("model2")}
                className="mt-0.5 text-[#2196F3] focus:ring-[#2196F3]"
              />
              <div className="text-sm">
                <span className="font-medium text-gray-900">
                  Model 2: Standalone MantraComply Services (Independent)
                </span>
                <p className="text-xs text-gray-600 mt-0.5">
                  Annual agreement payable monthly. Provider operates independently, retains direct payer relationships, and receives{" "}
                  <strong>100% of payer revenue directly into own bank account</strong>. Provider owns portal accounts with delegated access
                  to Mantra. Includes panel substitution if a payer is closed.
                </p>
              </div>
            </label>
          </div>

          {/* Model 2 Optional Add-on (Section 2.2) */}
          {engagementModel === "model2" && (
            <div className="mt-3 pt-3 border-t border-gray-200 pl-6">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRcmAddon}
                  onChange={(e) => setIncludeRcmAddon(e.target.checked)}
                  className="mt-0.5 text-[#2196F3] focus:ring-[#2196F3] rounded"
                />
                <span className="text-xs text-gray-800">
                  <strong>Optional Add-On:</strong> Include Insurance Billing & Revenue Cycle Management (RCM) services (for an additional
                  fee as specified in Annexure A).
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Scrollable Agreement Text Container */}
        <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5 tracking-wider">
          Agreement Terms (Scroll to review all 11 sections and annexures)
        </label>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 max-h-56 overflow-y-auto text-sm text-gray-700 leading-relaxed space-y-3">
          <p className="font-semibold text-gray-900">
            PROVIDER CREDENTIALING & ENROLLMENT SERVICES AGREEMENT
          </p>
          <p>
            <strong>Effective Date:</strong> {todayFormatted}
          </p>
          <p>
            This Agreement is entered into by and between <strong>Mantra</strong>, acting through the regional entity identified in
            Annexure B: <strong>{config.entityName}</strong> ({config.regionLabel}), together with its affiliates and its
            MantraComply division; and the <strong>Provider</strong>, an independent healthcare/wellness professional duly licensed in
            their jurisdiction.
          </p>

          <p className="font-semibold text-gray-900">RECITALS</p>
          <p>
            Mantra operates MantraComply, a global platform offering credentialing, payer enrollment, and administrative support services.
            The Provider wishes to engage MantraComply for such Services under one of the two Engagement Models outlined herein.
          </p>

          <p className="font-semibold text-gray-900">1. DEFINITIONS</p>
          <p>
            • <strong>Applicable Laws:</strong> All local, state, provincial, national, and professional regulations governing healthcare
            licensing, billing, credentialing, and data privacy ({config.privacyAct}).<br />
            • <strong>Credentialing & Enrollment Platform:</strong> Any third-party payer portal, clearinghouse, regulatory council registry,
            or credentialing system (e.g., {config.platform}) used to register, verify, or maintain Provider profiles.<br />
            • <strong>Engagement Model:</strong> Model 1 ("Under Mantra Network") or Model 2 ("Standalone MantraComply"), as selected in Annexure A.<br />
            • <strong>Payer:</strong> Any health insurer, benefits administrator, commercial payer, government health program, or employer plan.<br />
            • <strong>Services:</strong> Credentialing, re-credentialing, payer enrollment, and optional billing support provided by MantraComply.
          </p>

          <p className="font-semibold text-gray-900">2. ENGAGEMENT MODELS & SERVICES</p>
          <p>
            <strong>2.1 Model 1: Under Mantra Network:</strong> Mantra provides credentialing and enrollment services at no cost ($0) or at a
            discounted rate. Mantra provides B2C, B2B, and insurance client referrals directly to the Provider, subject to availability. Mantra maintains
            direct payer relationships, completes all billing, and receives payer disbursements, remitting the agreed provider rate.
          </p>
          <p>
            <strong>2.2 Model 2: Standalone MantraComply Services (Independent):</strong> The Provider retains full independence. Services are
            provided on an annual agreement term, payable in monthly installments in advance. The Provider retains direct payer relationships
            and receives 100% of payer disbursements into their own bank accounts. Fees paid under Model 2 are non-refundable. If a Payer's panel is
            closed to the Provider's specialty at the time of enrollment, the Provider may request that Mantra substitute that Payer with an
            alternative Payer of comparable standing at no additional cost.
          </p>

          <p className="font-semibold text-gray-900">3. ACCOUNT ACCESS & PAYER PORTALS</p>
          <p>
            • <strong>Model 1:</strong> Managed and retained solely by Mantra for the duration of engagement. Mantra has no obligation to share
            passwords, login credentials, or direct account access with the Provider, nor transfer payer contracts upon exit except as required by law.<br />
            • <strong>Model 2:</strong> Created and owned directly by the Provider; Mantra receives delegated administrative access only. Provider
            retains full ownership of account credentials, passwords, and payer enrollments.
          </p>

          <p className="font-semibold text-gray-900">4. FEES, PAYMENT & SUSPENSION FOR NON-PAYMENT</p>
          <p>
            Model 2 monthly fees are due on the 1st of each calendar month. Late payments incur a fee of 1.5% per month. If Model 2 fees or add-on
            charges remain unpaid for more than ten (10) calendar days past the due date, Mantra reserves the right to immediately suspend all
            credentialing, platform access, payer submission, and billing services without liability.
          </p>

          <p className="font-semibold text-gray-900">5. PROVIDER RESPONSIBILITIES</p>
          <p>
            The Provider represents and warrants that they: (1) Hold and maintain valid, unencumbered licenses, registrations, and malpractice
            insurance required in their jurisdiction; (2) <strong>Shall notify Mantra within three (3) Business Days of any adverse license action,
            sanction, malpractice claim, or loss of privilege</strong>; and (3) Will provide accurate, truthful, and complete documentation within
            requested deadlines.
          </p>

          <p className="font-semibold text-gray-900">6. CLINICAL RESPONSIBILITY & INSURANCE</p>
          <p>
            MantraComply provides administrative services only. Under both Engagement Models, the Provider remains solely responsible for all
            clinical decisions, care delivery, and compliance with clinical standards. The Provider must maintain professional liability insurance
            meeting or exceeding legal requirements.
          </p>

          <p className="font-semibold text-gray-900">7. LIMITATION OF LIABILITY</p>
          <p>
            • <strong>Administrative Scope:</strong> Mantra does not guarantee application approval, processing speed, or effective dates, as
            these depend entirely on Payers.<br />
            • <strong>Waiver of Claims:</strong> The Provider waives all claims against Mantra for application delays, processing errors, rejected
            claims, or lost revenue.<br />
            • <strong>Cap on Liability:</strong> Mantra’s total aggregate liability shall not exceed the fees actually paid by the Provider to
            Mantra for Services in the three (3) months preceding the claim.
          </p>

          <p className="font-semibold text-gray-900">8. CONFIDENTIALITY & DATA PROTECTION</p>
          <p>
            Each Party shall maintain strict confidentiality over proprietary information. Mantra shall implement administrative, physical, and
            technical safeguards complying with applicable data privacy laws to protect credentials and PHI.
          </p>

          <p className="font-semibold text-gray-900">9. TERM AND TERMINATION</p>
          <p>
            Begins on Effective Date and continues until terminated. Either Party may terminate upon thirty (30) days' written notice (Model 2
            remains subject to annual commitment terms). Immediate termination if Provider loses licensure, engages in fraud, or breaches confidentiality.
          </p>

          <p className="font-semibold text-gray-900">10. GOVERNING LAW & DISPUTE RESOLUTION</p>
          <p>
            Governed by the laws of <strong>{config.governingLaw}</strong>. Disputes shall first be submitted to good-faith negotiation, and if
            unresolved, resolved via binding arbitration in <strong>{config.arbitrationVenue}</strong>.
          </p>

          <p className="font-semibold text-gray-900">11. GENERAL PROVISIONS</p>
          <p>
            Amendments require 30 days' written notice. This document and its Annexures constitute the entire understanding between the Parties.
            May be executed electronically.
          </p>

          <div className="pt-2 border-t border-gray-300">
            <p className="font-semibold text-gray-900 mb-1">ANNEXURE A: COMMERCIAL TERMS SUMMARY</p>
            <p className="text-xs">
              • <strong>Eligibility:</strong> Model 1 (Mantra referral network) vs. Model 2 (Independent providers/clinics).<br />
              • <strong>Credentialing Fee:</strong> Model 1 ($0 / Free) vs. Model 2 (Annual agreement, monthly rate).<br />
              • <strong>Disbursements:</strong> Model 1 (Mantra receives payer funds, remits agreed rate) vs. Model 2 (100% direct to provider bank account).<br />
              • <strong>Panel Closure:</strong> Model 2 includes free substitution of comparable alternative Payer.
            </p>
          </div>

          <div className="pt-2 border-t border-gray-300">
            <p className="font-semibold text-gray-900 mb-1">ANNEXURE B & C: REGIONAL ENTITY & PLATFORM</p>
            <p className="text-xs">
              • <strong>Contracting Entity:</strong> {config.entityName} ({config.regionLabel})<br />
              • <strong>Governing Jurisdiction:</strong> {config.governingLaw}<br />
              • <strong>Credentialing Platform:</strong> {config.platform}
            </p>
          </div>
        </div>

        {/* Mandatory Covenants Checkboxes */}
        <div className="mb-4 space-y-2.5">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={ackScope}
              onChange={(e) => setAckScope(e.target.checked)}
              className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
            />
            <span className="text-xs text-gray-700">
              <strong>Administrative Scope & Clinical Responsibility:</strong> I acknowledge that MantraComply provides administrative
              support only and does not guarantee payer approval timelines. I retain sole responsibility for all clinical care decisions (Sections 6 & 7).
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              checked={ackNotice}
              onChange={(e) => setAckNotice(e.target.checked)}
              className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
            />
            <span className="text-xs text-gray-700">
              <strong>Active Licensure & 3-Day Notice Rule:</strong> I warrant holding active, unencumbered licensure and malpractice insurance,
              and covenant to notify Mantra in writing within <strong>three (3) Business Days</strong> of any adverse license action, sanction, or malpractice claim (Section 5).
            </span>
          </label>
        </div>

        {/* Digital Signature */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Digital Signature <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={providerSignature}
            onChange={(e) => setProviderSignature(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="Type your full name to sign"
          />
          <p className="text-xs text-gray-500 mt-1">
            By typing your name, you agree to the terms of the Provider Credentialing & Enrollment Services Agreement and your selected Engagement Model.
          </p>
        </div>

        {/* Final Agreement Checkbox */}
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={providerAgreed}
            onChange={(e) => setProviderAgreed(e.target.checked)}
            className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the Provider Credentialing & Enrollment Services Agreement
          </span>
        </label>
      </div>

      <FormButtons onPrevious={onPrevious || onBack} isFirstStep={isFirstStep} />
    </form>
  );
}
