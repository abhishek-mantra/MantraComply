import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { CanadaFormButtons } from "./CanadaFormButtons";

interface ReleaseFormsFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function ReleaseFormsForm({ onNext, onBack }: ReleaseFormsFormProps) {
  const [baaSignature, setBaaSignature] = useState("");
  const [baaChecked, setBaaChecked] = useState(false);
  const [providerSignature, setProviderSignature] = useState("");
  const [providerChecked, setProviderChecked] = useState(false);
  const [pipedaConsent, setPipedaConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baaSignature || !baaChecked || !providerSignature || !providerChecked || !pipedaConsent) {
      alert("Please complete all required fields and signatures.");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 font-medium">
            ⚠ Please review and sign the following agreements.
          </p>
        </div>
      </div>

      {/* Section 1: Business Associate Agreement */}
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Section 1: Business Associate Agreement (BAA)
        </h3>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto text-sm text-gray-700 space-y-3">
          <p className="font-semibold">BUSINESS ASSOCIATE AGREEMENT</p>
          
          <p>
            This Business Associate Agreement ("Agreement") is entered into between MantraComply ("Covered Entity") 
            and the healthcare provider identified in this credentialing application ("Business Associate").
          </p>
          
          <p className="font-semibold">1. PIPEDA Compliance</p>
          <p>
            Business Associate agrees to comply with all applicable provisions of the Personal Information Protection 
            and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation, including but not 
            limited to Ontario's Personal Health Information Protection Act (PHIPA), Quebec's Act respecting the 
            protection of personal information in the private sector, and British Columbia's Personal Information 
            Protection Act (PIPA).
          </p>
          
          <p className="font-semibold">2. Use and Disclosure of Protected Information</p>
          <p>
            Business Associate shall use and disclose Protected Personal Information only as permitted by this 
            Agreement, PIPEDA, and applicable provincial privacy laws, or as required by law.
          </p>
          
          <p className="font-semibold">3. Safeguards</p>
          <p>
            Business Associate shall implement appropriate administrative, technical, and physical safeguards to 
            protect Protected Personal Information against unauthorized access, collection, use, disclosure, copying, 
            modification, disposal or similar risks.
          </p>
          
          <p className="font-semibold">4. Reporting</p>
          <p>
            Business Associate shall report to Covered Entity any privacy breach or unauthorized access to Protected 
            Personal Information within 24 hours of becoming aware of such breach.
          </p>
          
          <p className="font-semibold">5. Term and Termination</p>
          <p>
            This Agreement shall be effective as of the date signed and shall terminate when all Protected Personal 
            Information is destroyed or returned to Covered Entity.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="baa-signature" className="block text-sm font-medium text-gray-700 mb-2">
              Digital Signature <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="baa-signature"
              value={baaSignature}
              onChange={(e) => setBaaSignature(e.target.value)}
              required
              placeholder="Type your full legal name"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={baaChecked}
              onChange={(e) => setBaaChecked(e.target.checked)}
              required
              className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded mt-0.5"
            />
            <span className="text-sm text-gray-700">
              I have read and agree to the terms of the Business Associate Agreement under PIPEDA and applicable 
              provincial privacy legislation.
            </span>
          </label>
        </div>
      </div>

      {/* Section 2: Provider Agreement */}
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Section 2: Provider Agreement
        </h3>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto text-sm text-gray-700 space-y-3">
          <p className="font-semibold">PROVIDER AGREEMENT</p>
          
          <p>
            This Provider Agreement ("Agreement") governs the relationship between MantraComply and the healthcare 
            provider applying for credentialing services.
          </p>
          
          <p className="font-semibold">1. Credentialing Services</p>
          <p>
            MantraComply agrees to provide credentialing services to facilitate Provider's enrollment with Canadian 
            extended health benefit insurance providers. Services include application preparation, submission, 
            follow-up, and ongoing credential maintenance.
          </p>
          
          <p className="font-semibold">2. Provider Obligations</p>
          <p>
            Provider agrees to provide accurate and complete information, maintain current professional indemnity 
            insurance, maintain valid provincial/territorial registration, comply with all applicable professional 
            standards and regulations, and notify MantraComply of any changes to credentials within 30 days.
          </p>
          
          <p className="font-semibold">3. Representations and Warranties</p>
          <p>
            Provider represents that all information provided is true, accurate, and complete. Provider warrants 
            that they hold all required licenses, registrations, and certifications in good standing.
          </p>
          
          <p className="font-semibold">4. Fees and Payment</p>
          <p>
            Provider agrees to pay MantraComply's credentialing fees as outlined in the fee schedule. Fees are 
            non-refundable once credentialing applications have been submitted.
          </p>
          
          <p className="font-semibold">5. Termination</p>
          <p>
            Either party may terminate this Agreement with 30 days written notice. Upon termination, Provider 
            remains responsible for any outstanding fees.
          </p>
          
          <p className="font-semibold">6. Governing Law</p>
          <p>
            This Agreement shall be governed by the laws of the Province of Ontario and the federal laws of Canada 
            applicable therein.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="provider-signature" className="block text-sm font-medium text-gray-700 mb-2">
              Digital Signature <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="provider-signature"
              value={providerSignature}
              onChange={(e) => setProviderSignature(e.target.value)}
              required
              placeholder="Type your full legal name"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={providerChecked}
              onChange={(e) => setProviderChecked(e.target.checked)}
              required
              className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded mt-0.5"
            />
            <span className="text-sm text-gray-700">
              I have read and agree to the terms of the Provider Agreement.
            </span>
          </label>
        </div>
      </div>

      {/* Section 3: PIPEDA Data Processing Consent */}
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Section 3: PIPEDA Data Processing Consent
        </h3>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto text-sm text-gray-700 space-y-3">
          <p className="font-semibold">DATA PROCESSING CONSENT UNDER PIPEDA</p>
          
          <p>
            By providing consent, you authorize MantraComply to collect, use, and disclose your personal information 
            for the purposes of:
          </p>
          
          <ul className="list-disc pl-5 space-y-1">
            <li>Processing your credentialing applications with insurance providers</li>
            <li>Verifying your credentials, licenses, and certifications</li>
            <li>Communicating with provincial regulatory colleges and professional associations</li>
            <li>Maintaining your credentialing records</li>
            <li>Providing customer support and services</li>
          </ul>
          
          <p>
            Your personal information will be protected in accordance with PIPEDA and applicable provincial privacy 
            legislation. You have the right to access, correct, and request deletion of your personal information, 
            subject to legal and contractual restrictions.
          </p>
          
          <p>
            This consent remains in effect until you revoke it in writing. You may withdraw consent at any time by 
            contacting privacy@mantracomplly.com, subject to legal or contractual restrictions and reasonable notice.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={pipedaConsent}
            onChange={(e) => setPipedaConsent(e.target.checked)}
            required
            className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded mt-0.5"
          />
          <span className="text-sm text-gray-700">
            ☐ I consent to MantraComply processing my data for credentialing purposes under PIPEDA and applicable 
            provincial privacy legislation.
          </span>
        </label>
      </div>

      <CanadaFormButtons onBack={onBack} submitText="Submit Credentialing Application" />
    </form>
  );
}
