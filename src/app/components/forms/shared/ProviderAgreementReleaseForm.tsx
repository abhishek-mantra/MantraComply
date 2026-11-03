import { useState } from "react";
import { Info } from "lucide-react";
import { FormButtons } from "../FormButtons";

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
  const [providerSignature, setProviderSignature] = useState("");
  const [providerAgreed, setProviderAgreed] = useState(false);

  // Engagement Model Selection (From Section 2 & Annexure A)
  const [engagementModel, setEngagementModel] = useState<"model1" | "model2">("model1");
  const [includeRcmAddon, setIncludeRcmAddon] = useState(false);
  const [ackModel1StateTerms, setAckModel1StateTerms] = useState(false);

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
    if (engagementModel === "model1" && !ackModel1StateTerms) {
      alert("Please acknowledge that state-specific enrollment and billing terms may apply to your Model 1 engagement.");
      return;
    }

    if (!providerAgreed || !providerSignature.trim() || !ackScope || !ackNotice) {
      alert("Please review, sign, and agree to the Provider Agreement and required covenants.");
      return;
    }

    onNext({
      engagementModel,
      includeRcmAddon: engagementModel === "model2" ? includeRcmAddon : false,
      ackModel1StateTerms: engagementModel === "model1" ? ackModel1StateTerms : false,
      contractingEntity: config.entityName,
      effectiveDate: todayFormatted,
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
        </div>
      </div>

      {/* Provider Credentialing & Enrollment Services Agreement Card */}
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

            {/* Model 1 State-Specific Terms (shown when Model 1 is selected) */}
            {engagementModel === "model1" && (
              <div className="mt-2.5 ml-6 p-4 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-gray-700 space-y-3 animate-in fade-in duration-200 shadow-2xs">
                <div className="flex items-center gap-2 text-[#002B49] font-bold text-sm">
                  <Info className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Important: State-Specific Credentialing, Enrollment &amp; Billing Terms</span>
                </div>

                <p className="leading-relaxed">
                  In certain US states, Mantra may arrange for credentialing, payer enrollment and billing under your name and NPI, where permitted by applicable law and payer requirements. In these cases, payer payments may be made directly to your designated bank account, and additional terms governing enrollment fees, billing fees, authorization, responsibilities, commitment, termination, liability and HIPAA compliance will apply.
                </p>

                <div className="bg-white/90 border border-blue-100 rounded-md p-3 space-y-1.5">
                  <p className="font-semibold text-gray-900">Applicable states</p>
                  <p className="text-gray-700 leading-relaxed">
                    California, Connecticut, Georgia, Hawaii, Illinois, Iowa, Kentucky, Maryland, Massachusetts, Michigan, Minnesota, Missouri, Nevada, New Jersey, New York, North Carolina, Ohio, Oregon, Pennsylvania, Rhode Island, Tennessee, Texas, Virginia, Washington and Wisconsin.
                  </p>
                  <p className="text-[11px] text-gray-500 italic">
                    The applicable arrangement depends on your state and payer. Listing a state here does not guarantee that this arrangement is available to every provider in that state.
                  </p>
                </div>

                <label className="flex items-start gap-2.5 pt-2 border-t border-blue-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ackModel1StateTerms}
                    onChange={(e) => setAckModel1StateTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
                  />
                  <span className="text-xs font-semibold text-gray-900">
                    I acknowledge that state-specific enrollment and billing terms may apply to my Model 1 engagement.
                  </span>
                </label>
              </div>
            )}

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

          {/* Universal Notice for both Model 1 & Model 2 */}
          <div className="mt-3.5 pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-600 bg-white/70 p-2.5 rounded border border-gray-200/80">
            <Info className="w-4 h-4 text-[#2196F3] shrink-0" />
            <span className="font-medium text-gray-700">
              Please read the full contract below for detailed terms and conditions applicable to your selected engagement model.
            </span>
          </div>
        </div>

        {/* Scrollable Agreement Text Container */}
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase text-gray-500 tracking-wider">
            Agreement Terms (Scroll to review all 11 sections and annexures)
          </label>
          <span className="text-[11px] text-gray-400 font-medium">Full Contract Document</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 max-h-[460px] overflow-y-auto text-xs text-gray-700 leading-relaxed space-y-4 shadow-2xs divide-y divide-gray-100">
          {/* Header */}
          <div className="pb-3">
            <h4 className="text-base font-bold text-gray-900 tracking-tight text-center sm:text-left">
              PROVIDER CREDENTIALING &amp; ENROLLMENT SERVICES AGREEMENT
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              <strong>Effective Date:</strong> {todayFormatted}
            </p>
            <p className="mt-2.5 text-gray-700 leading-relaxed">
              This Agreement is entered into between <strong>MCH International LLC</strong>, a Wyoming limited liability company, together with its affiliates and MantraComply division (collectively, “Mantra”), and the undersigned independent healthcare or wellness professional or professional entity (“Provider”).
            </p>
            <p className="mt-2 text-gray-700 leading-relaxed">
              Mantra provides credentialing, payer enrollment and administrative services through MantraComply. The Provider agrees to engage Mantra under one of the following models.
            </p>
          </div>

          {/* Section 1 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">1. DEFINITIONS</h5>
            <p><strong>Applicable Laws:</strong> All laws and professional regulations governing healthcare, credentialing, billing and data protection, including HIPAA, UK GDPR and other applicable privacy laws.</p>
            <p><strong>Payer:</strong> Any health insurer, benefits administrator, government health program or employer plan.</p>
            <p><strong>Services:</strong> Credentialing, re-credentialing, payer enrollment and any agreed billing or revenue cycle management (RCM) services.</p>
          </div>

          {/* Section 2 */}
          <div className="pt-3 space-y-3">
            <h5 className="font-bold text-gray-900 text-sm">2. ENGAGEMENT MODELS &amp; SERVICES</h5>
            
            <div className="space-y-2">
              <h6 className="font-semibold text-gray-900 text-xs text-blue-900">2.1 Model 1: Under Mantra Network</h6>
              <ul className="space-y-1 list-disc pl-4 text-gray-700">
                <li><strong>Credentialing:</strong> Provided free or at a discounted rate as specified in Annexure A.</li>
                <li><strong>Referrals:</strong> Mantra may provide B2C, B2B and insurance client referrals, subject to availability. No referral volume is guaranteed.</li>
                <li><strong>Payer Relationships &amp; Billing:</strong> Mantra generally manages payer relationships, insurance billing and follow-up, receives payer disbursements and pays the Provider an agreed rate under Annexure A.</li>
                <li><strong>Portal Access:</strong> Mantra manages applicable credentialing accounts and portal access during the engagement, as detailed in Annexure C.</li>
              </ul>

              {/* State-Specific Terms sub-block inside 2.1 */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5 text-gray-700 mt-2">
                <p className="font-bold text-gray-900">State-Specific Credentialing, Enrollment &amp; Billing Terms</p>
                <p>
                  For Providers practicing in <strong>California, Connecticut, Georgia, Hawaii, Illinois, Iowa, Kentucky, Maryland, Massachusetts, Michigan, Minnesota, Missouri, Nevada, New Jersey, New York, North Carolina, Ohio, Oregon, Pennsylvania, Rhode Island, Tennessee, Texas, Virginia, Washington or Wisconsin</strong>, Mantra may, where applicable and permitted by law and payer rules, arrange credentialing, payer enrollment and billing under the Provider’s name and NPI, with payer payments made directly to the Provider’s designated bank account. The applicable arrangement will be determined by Mantra based on the Provider’s circumstances and payer requirements.
                </p>
                <p className="font-semibold text-gray-800">Where this arrangement applies:</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>
                    <strong>Enrollments &amp; Fees:</strong> The first five (5) payer enrollments, each covering one payer in one state, are free and counted upon submission. Each additional enrollment costs $180, payable upon submission. CAQH maintenance and re-credentialing with enrolled payers are included at no additional charge while the relevant payer arrangement remains active.
                  </li>
                  <li>
                    <strong>Commitment &amp; Exit Fee:</strong> The commitment period is 36 months, beginning on the earlier of the first enrollment approval or six (6) months after the Effective Date. Early termination by the Provider, or termination by Mantra due to the Provider’s breach or conduct, attracts an exit fee of $180 multiplied by the number of free enrollments completed, subject to the exceptions below.
                  </li>
                  <li>
                    <strong>Billing Fees:</strong> Mantra charges 7% of collections actually received on claims it submits or works, including qualifying collections received after termination. Where percentage-based fees are prohibited by law or payer rules, a fee of $10 per claim applies instead. Invoices are payable within fifteen (15) days. Overdue amounts accrue interest at 1.5% per month, or the legal maximum if lower. Mantra may suspend services after the applicable notice requirements are met.
                  </li>
                  <li>
                    <strong>Provider Responsibilities &amp; Authorization:</strong> The Provider authorizes Mantra to submit enrollment applications and claims, access payer portals, CAQH and clearinghouses, and sign routine forms where permitted. Mantra may not sign payer contracts on the Provider’s behalf, receive payer payments under this arrangement, or change the Provider’s bank details. The Provider remains responsible for accurate information, clinical care, documentation, coding, medical necessity and overpayments.
                  </li>
                  <li>
                    <strong>Termination:</strong> After the commitment period, either party may terminate on one (1) month’s written notice without an exit fee. The Provider may terminate earlier on thirty (30) days’ notice, subject to any applicable exit fee. No exit fee applies in the specified circumstances of Mantra’s uncured material breach, repeated service-level failures, qualifying billing errors, or the Provider’s death, permanent disability or retirement. Mantra may terminate immediately for specified licensing, government-program exclusion, fraud, false billing, or material HIPAA breaches; on notice for qualifying non-payment or uncured material breach; or for convenience on ninety (90) days’ notice without an exit fee. If the Provider loses an active license in every applicable state, Mantra may terminate by written notice, subject to the applicable exit-fee provisions.
                  </li>
                  <li>
                    <strong>Compliance &amp; Risk:</strong> Applicable legal, payer, HIPAA, confidentiality, liability, indemnity and dispute-resolution provisions in this Agreement apply to this arrangement. Mantra does not guarantee payer approval, timing, rates or revenue.
                  </li>
                </ol>
                <p className="text-[11px] text-gray-500 italic pt-1 border-t border-slate-200">
                  These state-specific terms apply only when this alternative arrangement is used and prevail over inconsistent Model 1 payment or portal provisions to the extent necessary. Listing a state does not guarantee eligibility or payer availability.
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <h6 className="font-semibold text-gray-900 text-xs text-blue-900">2.2 Model 2: Standalone MantraComply Services</h6>
              <ul className="space-y-1 list-disc pl-4 text-gray-700">
                <li><strong>Independence &amp; Fees:</strong> The Provider retains independent payer relationships and pays the annual agreement fee in monthly installments in advance, as set out in Annexure A.</li>
                <li><strong>Referrals:</strong> No Mantra client referrals are included.</li>
                <li><strong>Billing/RCM:</strong> Available as an optional paid add-on.</li>
                <li><strong>Payer Payments:</strong> The Provider receives payer disbursements directly into their own bank account.</li>
                <li><strong>Panel Closure &amp; Refunds:</strong> Fees are non-refundable. If a selected payer’s panel is closed to the Provider’s specialty or service line, the Provider may request substitution with a comparable alternative payer at no additional enrollment fee, subject to panel availability and payer requirements.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">3. ACCOUNT ACCESS &amp; PAYER PORTALS</h5>
            <p>
              Under Model 1, Mantra manages and retains applicable portal credentials during the engagement and is not required to transfer passwords, payer contracts or accounts upon exit, except as required by law.
            </p>
            <p>
              Under Model 2, the Provider owns the accounts and credentials and grants Mantra delegated administrative access only. The Provider retains account ownership and payer enrollments.
            </p>
          </div>

          {/* Section 4 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">4. FEES, PAYMENT &amp; SUSPENSION</h5>
            <p>
              Model 2 fees are due on the first day of each calendar month. Overdue amounts accrue interest at 1.5% per month, or the maximum permitted by law. If fees or billing charges remain unpaid for more than ten (10) calendar days after the due date, Mantra may suspend credentialing, platform access, payer submissions and billing services without liability for resulting claim rejections or lost revenue.
            </p>
            <p>
              Model 2 fees are non-refundable, including where a payer panel is closed; substitution under Section 2.2 is the sole remedy for such closure.
            </p>
          </div>

          {/* Section 5 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">5. PROVIDER RESPONSIBILITIES</h5>
            <p className="font-medium text-gray-800">The Provider shall:</p>
            <ul className="space-y-1 list-disc pl-4 text-gray-700">
              <li>Maintain valid, unrestricted licenses, registrations and required professional liability insurance.</li>
              <li>Notify Mantra within three (3) business days of adverse licensing action, sanctions, malpractice claims or loss of privileges.</li>
              <li>Provide complete, accurate and truthful documentation within requested deadlines.</li>
              <li>Comply with applicable laws, payer requirements and professional standards.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">6. CLINICAL RESPONSIBILITY &amp; INSURANCE</h5>
            <p>
              Mantra provides administrative services only. The Provider retains sole responsibility for clinical decisions, care delivery, documentation, coding and compliance with clinical standards, and must maintain professional liability insurance meeting applicable legal requirements.
            </p>
          </div>

          {/* Section 7 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">7. LIABILITY &amp; INDEMNITY</h5>
            <p>
              Mantra does not guarantee payer approval, processing speed or effective dates. To the extent permitted by law, the Provider waives claims against Mantra arising from application delays, processing errors, rejected claims or lost revenue. Mantra’s aggregate liability shall not exceed the fees actually paid to Mantra for Services during the three (3) months preceding the claim. Mantra shall not be liable for indirect, incidental or consequential damages.
            </p>
            <p>
              For state-specific arrangements under Section 2.1, the more detailed liability and indemnity terms applicable to that arrangement shall govern: the Provider shall defend and indemnify Mantra against claims, penalties, recoupments and costs arising from the Provider’s services, documentation, coding, information, breach or legal/payer-rule violations. Subject to the applicable liability cap, Mantra shall indemnify the Provider against third-party claims caused by Mantra’s gross negligence or willful misconduct. Any contractual limitation period applies only to the extent permitted by law.
            </p>
          </div>

          {/* Section 8 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">8. CONFIDENTIALITY &amp; DATA PROTECTION</h5>
            <p>
              Each party shall protect the other’s confidential and proprietary information. Mantra shall maintain appropriate administrative, physical and technical safeguards for Provider information and protected health information (PHI), comply with applicable data protection laws, limit PHI use and disclosure to permitted purposes, report relevant security incidents or breaches within ten (10) business days of discovery, bind relevant subcontractors to equivalent obligations, assist with patient requests within fifteen (15) days, and return or destroy PHI upon termination unless retention is legally required. The Provider shall obtain necessary patient consents. Either party may terminate for an uncured material breach of these obligations after thirty (30) days’ notice.
            </p>
            <p>
              The Provider owns patient and billing records. Mantra retains ownership of its software, templates and processes and may use aggregated, de-identified data to improve its services. During the engagement and for twelve (12) months afterward, the Provider shall not solicit Mantra personnel who worked on the Provider’s account.
            </p>
          </div>

          {/* Section 9 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">9. TERM &amp; TERMINATION</h5>
            <p>
              This Agreement begins on the Effective Date and continues until terminated. Either party may terminate on thirty (30) days’ written notice, subject to Model 2’s annual commitment and the special commitment and termination terms under Section 2.1 where applicable. Mantra may terminate immediately for loss of required licensure, fraud or other material circumstances specified in this Agreement, including material confidentiality or HIPAA breaches.
            </p>
            <p>
              Upon termination of a state-specific arrangement, any applicable exit fee remains payable. Mantra shall provide a report of open claims and an export of the Provider’s billing data within sixty (60) days. Payer enrollments remain with the Provider, subject to applicable payer rules and law.
            </p>
          </div>

          {/* Section 10 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">10. GOVERNING LAW &amp; DISPUTE RESOLUTION</h5>
            <p>
              The law and dispute-resolution venue of the applicable Contracting Entity in Annexure B govern this Agreement. The parties shall first attempt good-faith negotiation. Unresolved disputes shall be referred to binding arbitration at the venue specified in Annexure B.
            </p>
          </div>

          {/* Section 11 */}
          <div className="pt-3 space-y-1.5">
            <h5 className="font-bold text-gray-900 text-sm">11. GENERAL TERMS</h5>
            <p>
              The parties are independent contractors. Mantra may use subcontractors, including those outside the United States, subject to appropriate confidentiality and data protection obligations, and remains responsible for their work. The Provider may not assign this Agreement without Mantra’s consent. Mantra may assign it to an affiliate or successor on notice. Neither party is liable for delays beyond its reasonable control, except payment obligations.
            </p>
            <p>
              Notices must be in writing. Amendments must be in writing and signed by both parties, except where a specific provision expressly permits another process. This Agreement and its annexures constitute the entire agreement. Unenforceable terms shall be limited to the minimum extent necessary, and the remainder shall continue in effect. Fee, exit-fee, liability, indemnity, confidentiality, data protection and dispute provisions survive termination to the extent applicable. Electronic signatures and counterparts are permitted.
            </p>
          </div>

          {/* Annexure A */}
          <div className="pt-4 border-t-2 border-gray-200 space-y-2">
            <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
              ANNEXURE A: COMMERCIAL TERMS
            </h5>
            <div className="overflow-x-auto rounded-lg border border-gray-200 my-2">
              <table className="min-w-full text-left text-xs divide-y divide-gray-200">
                <thead className="bg-[#002B49] text-white">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider w-1/4">Feature</th>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider w-3/8 border-l border-blue-900">Model 1: Under Mantra Network</th>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider w-3/8 border-l border-blue-900">Model 2: Standalone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900 bg-gray-50/50">Eligibility</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Providers within Mantra’s network</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Independent providers, groups or clinics</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900 bg-gray-50/50">Referrals</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">B2C, B2B and insurance referrals, subject to availability; not guaranteed</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">None</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900 bg-gray-50/50">Credentialing Fee</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Free or discounted as agreed in writing</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Annual fee, payable monthly under the applicable Rate Card</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900 bg-gray-50/50">Billing/RCM</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Included under the standard Mantra arrangement; state-specific arrangements may carry the fees in Section 2.1</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Optional paid add-on</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900 bg-gray-50/50">Payer Payments</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Generally received by Mantra, with agreed Provider payouts; state-specific arrangements may pay the Provider directly</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Paid directly to Provider</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900 bg-gray-50/50">Portal Ownership</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Managed by Mantra</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Owned by Provider; delegated access to Mantra</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900 bg-gray-50/50">Suspension</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">As applicable to the arrangement</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Services may be suspended when payment is more than ten (10) calendar days overdue</td>
                  </tr>
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900 bg-gray-50/50">Refunds / Panel Closure</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">As applicable to the arrangement</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">No refunds; eligible panel substitution may be requested</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-600 italic leading-relaxed">
              For state-specific arrangements, the first five enrollments are free; additional enrollments cost $180 each; billing fees are 7% of collections or $10 per claim where required; and the 36-month commitment and applicable exit fee in Section 2.1 apply.
            </p>
          </div>

          {/* Annexure B */}
          <div className="pt-3 space-y-2">
            <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
              ANNEXURE B: REGIONAL CONTRACTING ENTITY
            </h5>
            <div className="overflow-x-auto rounded-lg border border-gray-200 my-2">
              <table className="min-w-full text-left text-xs divide-y divide-gray-200">
                <thead className="bg-[#002B49] text-white">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider">Contracting Entity</th>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider border-l border-blue-900">Region Covered</th>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider border-l border-blue-900">Governing Law</th>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider border-l border-blue-900">Arbitration Venue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2 px-3 font-medium text-gray-900">MCH International LLC</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">United States and other regions not assigned to another listed entity</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Wyoming, USA</td>
                    <td className="py-2 px-3 text-gray-700 border-l border-gray-100">Wyoming, USA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Annexure C */}
          <div className="pt-3 space-y-2">
            <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
              ANNEXURE C: COUNTRY-SPECIFIC CREDENTIALING &amp; ACCESS
            </h5>
            <div className="overflow-x-auto rounded-lg border border-gray-200 my-2">
              <table className="min-w-full text-left text-xs divide-y divide-gray-200">
                <thead className="bg-[#002B49] text-white">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider w-1/6">Country</th>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider w-1/4 border-l border-blue-900">Platform / Process</th>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider w-3/8 border-l border-blue-900">Model 1</th>
                    <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider w-1/4 border-l border-blue-900">Model 2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50/70">
                    <td className="py-2.5 px-3 font-medium text-gray-900 bg-gray-50/50">United States</td>
                    <td className="py-2.5 px-3 text-gray-700 border-l border-gray-100">CAQH ProView and payer portals</td>
                    <td className="py-2.5 px-3 text-gray-700 border-l border-gray-100">
                      Mantra manages applicable credentials and payer relationships. For state-specific arrangements, the Provider may be enrolled under their own name and NPI, with payer payments made directly to the Provider, as described in Section 2.1.
                    </td>
                    <td className="py-2.5 px-3 text-gray-700 border-l border-gray-100">
                      Provider owns portal accounts and grants Mantra delegated administrative access.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs font-medium text-gray-800">
              By signing, the parties acknowledge that the selected Engagement Model and any applicable state-specific terms form part of this Agreement.
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
