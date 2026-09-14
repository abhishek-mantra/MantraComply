import { useState } from "react";
import { AustraliaFormButtons } from "./AustraliaFormButtons";

interface ReleaseFormsFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function ReleaseFormsForm({ onNext, onBack }: ReleaseFormsFormProps) {
  const [baaSignature, setBaaSignature] = useState("");
  const [baaChecked, setBaaChecked] = useState(false);
  const [providerSignature, setProviderSignature] = useState("");
  const [providerChecked, setProviderChecked] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      baaSignature,
      baaChecked,
      providerSignature,
      providerChecked,
      privacyConsent
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>⚠ Please review and sign the following agreements.</strong>
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">
          Section 1: Business Associate Agreement (BAA)
        </h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto text-sm text-gray-700">
          <p className="mb-4">
            <strong>BUSINESS ASSOCIATE AGREEMENT</strong>
          </p>
          <p className="mb-4">
            This Business Associate Agreement ("Agreement") is entered into in accordance with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs).
          </p>
          <p className="mb-4">
            <strong>1. Purpose and Scope</strong>
          </p>
          <p className="mb-4">
            MantraComply Pty Ltd ("MantraComply") acknowledges its obligations under the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs) in handling personal and health information provided by healthcare providers ("Provider").
          </p>
          <p className="mb-4">
            <strong>2. Permitted Uses and Disclosures</strong>
          </p>
          <p className="mb-4">
            MantraComply may collect, use, and disclose personal information only for the purposes of:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Provider credentialing and verification</li>
            <li>Insurance panel enrollment facilitation</li>
            <li>Compliance with regulatory requirements</li>
            <li>Service delivery and support</li>
          </ul>
          <p className="mb-4">
            <strong>3. Safeguards</strong>
          </p>
          <p className="mb-4">
            MantraComply implements appropriate technical and organizational measures to protect personal information against misuse, interference, loss, unauthorized access, modification, or disclosure, including:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Encryption of data in transit and at rest</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular security audits and assessments</li>
            <li>Staff training on privacy obligations</li>
          </ul>
          <p className="mb-4">
            <strong>4. Individual Rights</strong>
          </p>
          <p className="mb-4">
            Providers have the right to:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Access their personal information held by MantraComply</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Make a complaint about privacy practices</li>
            <li>Request deletion of information (subject to legal obligations)</li>
          </ul>
          <p className="mb-4">
            <strong>5. Data Breach Notification</strong>
          </p>
          <p className="mb-4">
            MantraComply will notify affected Providers and the Office of the Australian Information Commissioner (OAIC) of any eligible data breach in accordance with the Notifiable Data Breaches (NDB) scheme under the Privacy Act.
          </p>
          <p className="mb-4">
            <strong>6. Compliance with APPs</strong>
          </p>
          <p className="mb-4">
            MantraComply agrees to comply with all applicable Australian Privacy Principles, including but not limited to:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>APP 1: Open and transparent management of personal information</li>
            <li>APP 3: Collection of solicited personal information</li>
            <li>APP 5: Notification of the collection of personal information</li>
            <li>APP 6: Use or disclosure of personal information</li>
            <li>APP 11: Security of personal information</li>
          </ul>
        </div>

        <div>
          <label htmlFor="baa-signature" className="block text-sm font-medium text-gray-700 mb-2">
            Digital Signature <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="baa-signature"
            name="baa-signature"
            required
            value={baaSignature}
            onChange={(e) => setBaaSignature(e.target.value)}
            placeholder="Type your full name"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div>
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              required
              checked={baaChecked}
              onChange={(e) => setBaaChecked(e.target.checked)}
              className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded"
            />
            <span className="text-gray-900">I agree to the Business Associate Agreement</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">
          Section 2: Provider Agreement
        </h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto text-sm text-gray-700">
          <p className="mb-4">
            <strong>PROVIDER AGREEMENT</strong>
          </p>
          <p className="mb-4">
            This Provider Agreement ("Agreement") governs the relationship between MantraComply Pty Ltd ("MantraComply") and the healthcare provider ("Provider") using the MantraComply credentialing platform.
          </p>
          <p className="mb-4">
            <strong>1. Services</strong>
          </p>
          <p className="mb-4">
            MantraComply will provide credentialing services including:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>AHPRA registration verification</li>
            <li>Medicare provider number assistance</li>
            <li>Private health insurance fund panel applications</li>
            <li>Document management and storage</li>
            <li>Credentialing status tracking</li>
          </ul>
          <p className="mb-4">
            <strong>2. Provider Responsibilities</strong>
          </p>
          <p className="mb-4">
            The Provider agrees to:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Provide accurate and complete information</li>
            <li>Maintain current AHPRA registration</li>
            <li>Update credentials and information promptly</li>
            <li>Maintain required professional indemnity insurance</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
          <p className="mb-4">
            <strong>3. Fees and Payment</strong>
          </p>
          <p className="mb-4">
            Fees for MantraComply services will be communicated separately and may include subscription fees, per-application fees, or other charges as agreed.
          </p>
          <p className="mb-4">
            <strong>4. Confidentiality</strong>
          </p>
          <p className="mb-4">
            MantraComply agrees to maintain the confidentiality of all Provider information and will not disclose such information except as required for credentialing purposes or as required by law.
          </p>
          <p className="mb-4">
            <strong>5. Limitation of Liability</strong>
          </p>
          <p className="mb-4">
            MantraComply's liability is limited to the fees paid for services. MantraComply is not responsible for decisions made by insurance panels, regulatory bodies, or other third parties.
          </p>
          <p className="mb-4">
            <strong>6. Termination</strong>
          </p>
          <p className="mb-4">
            Either party may terminate this Agreement with 30 days' written notice. Provider data will be retained in accordance with applicable laws and regulations.
          </p>
        </div>

        <div>
          <label htmlFor="provider-signature" className="block text-sm font-medium text-gray-700 mb-2">
            Digital Signature <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="provider-signature"
            name="provider-signature"
            required
            value={providerSignature}
            onChange={(e) => setProviderSignature(e.target.value)}
            placeholder="Type your full name"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div>
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              required
              checked={providerChecked}
              onChange={(e) => setProviderChecked(e.target.checked)}
              className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded"
            />
            <span className="text-gray-900">I agree to the Provider Agreement</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">
          Section 3: Australian Privacy Act Consent
        </h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-48 overflow-y-auto text-sm text-gray-700">
          <p className="mb-4">
            <strong>PRIVACY CONSENT</strong>
          </p>
          <p className="mb-4">
            In accordance with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs), specifically:
          </p>
          <p className="mb-4">
            <strong>APP 3 (Collection of Solicited Personal Information)</strong>
          </p>
          <p className="mb-4">
            MantraComply collects personal and sensitive information (including health information) that is reasonably necessary for the purpose of provider credentialing, verification, and insurance panel enrollment.
          </p>
          <p className="mb-4">
            <strong>APP 5 (Notification of Collection of Personal Information)</strong>
          </p>
          <p className="mb-4">
            You are hereby notified that MantraComply is collecting your personal information for the purposes stated above. The information may be disclosed to:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>AHPRA for verification purposes</li>
            <li>Services Australia (Medicare) for provider number verification</li>
            <li>Private health insurance funds for panel applications</li>
            <li>Professional indemnity insurance providers for verification</li>
            <li>Educational institutions for qualification verification</li>
          </ul>
          <p className="mb-4">
            Your information will be stored securely and handled in accordance with the Privacy Act 1988 and APPs. You have the right to access and correct your personal information. For privacy concerns, contact our Privacy Officer at privacy@mantracomply.com.au
          </p>
        </div>

        <div>
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              required
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded"
            />
            <span className="text-gray-900">
              I consent to MantraComply collecting and processing my data in accordance with the Australian Privacy Act 1988
            </span>
          </label>
        </div>
      </div>

      <AustraliaFormButtons onBack={onBack} isLastStep={true} />
    </form>
  );
}
