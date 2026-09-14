import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface ReleaseFormsDeclarationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function ReleaseFormsDeclarationForm({ onNext, onBack }: ReleaseFormsDeclarationFormProps) {
  const [baaSignature, setBaaSignature] = useState("");
  const [baaChecked, setBaaChecked] = useState(false);
  const [providerSignature, setProviderSignature] = useState("");
  const [providerChecked, setProviderChecked] = useState(false);
  const [pdplConsent, setPdplConsent] = useState(false);
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [declarationSignature, setDeclarationSignature] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      baaSignature,
      baaChecked,
      providerSignature,
      providerChecked,
      pdplConsent,
      declarationChecked,
      declarationSignature
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>⚠ Please review and sign all agreements. These are required to submit your UAE credentialing application.</strong>
        </p>
      </div>

      {/* Section 1: BAA */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">Section 1: Business Associate Agreement (BAA)</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto text-sm text-gray-700">
          <p className="mb-4"><strong>BUSINESS ASSOCIATE AGREEMENT</strong></p>
          <p className="mb-4">This Business Associate Agreement ("Agreement") is entered into in accordance with UAE Federal Decree Law No. 45 of 2021 (Personal Data Protection Law - PDPL).</p>
          <p className="mb-4"><strong>1. Purpose and Scope</strong></p>
          <p className="mb-4">MantraComply operates in compliance with UAE PDPL requirements for handling personal data of healthcare providers.</p>
          <p className="mb-4"><strong>2. Permitted Uses</strong></p>
          <p className="mb-4">MantraComply may process personal data only for: UAE health authority credentialing, license application support, facility placement, and compliance verification.</p>
          <p className="mb-4"><strong>3. Data Security</strong></p>
          <p className="mb-4">MantraComply implements appropriate technical and organizational measures including encryption, access controls, and regular security assessments.</p>
          <p className="mb-4"><strong>4. Data Subject Rights</strong></p>
          <p className="mb-4">Providers have the right to access, correct, delete their personal data, and file complaints with UAE regulatory authorities.</p>
          <p className="mb-4"><strong>5. Breach Notification</strong></p>
          <p className="mb-4">MantraComply will notify affected providers and UAE authorities of any data breaches in accordance with PDPL requirements.</p>
        </div>

        <div>
          <label htmlFor="baa-signature" className="block text-sm font-medium text-gray-700 mb-2">Digital Signature <span className="text-red-500">*</span></label>
          <input type="text" id="baa-signature" required value={baaSignature} onChange={(e) => setBaaSignature(e.target.value)} placeholder="Type your full name" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
        </div>

        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input type="checkbox" required checked={baaChecked} onChange={(e) => setBaaChecked(e.target.checked)} className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded" />
          <span className="text-gray-900">I agree to the Business Associate Agreement</span>
        </label>
      </div>

      {/* Section 2: Provider Agreement */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">Section 2: Provider Agreement</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto text-sm text-gray-700">
          <p className="mb-4"><strong>PROVIDER AGREEMENT</strong></p>
          <p className="mb-4"><strong>1. Services</strong></p>
          <p className="mb-4">MantraComply provides: DHA/DOH/MOHAP license application support, DataFlow verification assistance, Prometric exam guidance, facility placement, and ongoing compliance support.</p>
          <p className="mb-4"><strong>2. Provider Responsibilities</strong></p>
          <p className="mb-4">Provider agrees to: provide accurate information, maintain home country license, update credentials promptly, maintain professional indemnity insurance, and comply with UAE health authority regulations.</p>
          <p className="mb-4"><strong>3. Fees</strong></p>
          <p className="mb-4">Fees for services will be communicated separately and may include application fees, placement fees, or subscription charges.</p>
          <p className="mb-4"><strong>4. Limitation of Liability</strong></p>
          <p className="mb-4">MantraComply is not responsible for decisions made by UAE health authorities, DataFlow, Prometric, or other third parties.</p>
          <p className="mb-4"><strong>5. Termination</strong></p>
          <p className="mb-4">Either party may terminate with 30 days' notice. Data will be retained per UAE legal requirements.</p>
        </div>

        <div>
          <label htmlFor="provider-signature" className="block text-sm font-medium text-gray-700 mb-2">Digital Signature <span className="text-red-500">*</span></label>
          <input type="text" id="provider-signature" required value={providerSignature} onChange={(e) => setProviderSignature(e.target.value)} placeholder="Type your full name" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
        </div>

        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input type="checkbox" required checked={providerChecked} onChange={(e) => setProviderChecked(e.target.checked)} className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded" />
          <span className="text-gray-900">I agree to the Provider Agreement</span>
        </label>
      </div>

      {/* Section 3: UAE PDPL Consent */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">Section 3: UAE PDPL Data Consent</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-48 overflow-y-auto text-sm text-gray-700">
          <p className="mb-4"><strong>PRIVACY CONSENT</strong></p>
          <p className="mb-4">In accordance with UAE Federal Decree Law No. 45 of 2021 (Personal Data Protection Law), MantraComply collects and processes your personal data for UAE health authority credentialing purposes.</p>
          <p className="mb-4"><strong>Cross-Border Data Transfer</strong></p>
          <p className="mb-4">Your data may be transferred to: DHA, DOH, MOHAP, DataFlow Group, Prometric, healthcare facilities, and educational institutions for verification purposes.</p>
          <p className="mb-4"><strong>Your Rights</strong></p>
          <p className="mb-4">You have the right to access, correct, delete your data, and file complaints. Contact our Data Protection Officer at privacy@mantracomply.com</p>
        </div>

        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input type="checkbox" required checked={pdplConsent} onChange={(e) => setPdplConsent(e.target.checked)} className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded" />
          <span className="text-gray-900">I consent to MantraComply processing my data in accordance with UAE Federal Decree Law No. 45 of 2021 (PDPL)</span>
        </label>
      </div>

      {/* Section 4: Applicant Declaration */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-gray-900">Section 4: Applicant Declaration</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            I declare that all information provided in this application is true, accurate, and complete to the best of my knowledge. I understand that providing false or misleading information may result in the rejection of my application and/or disciplinary action by the relevant UAE health authority. I authorise MantraComply to submit this application on my behalf to the relevant UAE health authority.
          </p>
        </div>

        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input type="checkbox" required checked={declarationChecked} onChange={(e) => setDeclarationChecked(e.target.checked)} className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded" />
          <span className="text-gray-900">I confirm the above declaration</span>
        </label>

        <div>
          <label htmlFor="declaration-signature" className="block text-sm font-medium text-gray-700 mb-2">
            Digital Signature <span className="text-red-500">*</span>
          </label>
          <input type="text" id="declaration-signature" required value={declarationSignature} onChange={(e) => setDeclarationSignature(e.target.value)} placeholder="Type your full legal name as it appears on your passport" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input type="text" id="date" value={today} readOnly className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg bg-gray-100 text-gray-700" />
        </div>
      </div>

      <UAEFormButtons onBack={onBack} isLastStep={true} />
    </form>
  );
}
