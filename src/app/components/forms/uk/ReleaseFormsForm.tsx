import { useState } from "react";
import { UKFormButtons } from "./UKFormButtons";
import { AlertTriangle } from "lucide-react";

interface ReleaseFormsFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  isLastStep?: boolean;
}

export function ReleaseFormsForm({ onNext, onBack, isLastStep }: ReleaseFormsFormProps) {
  const [baaSignature, setBaaSignature] = useState("");
  const [baaAgreed, setBaaAgreed] = useState(false);
  const [providerSignature, setProviderSignature] = useState("");
  const [providerAgreed, setProviderAgreed] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Warning Callout */}
      <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">
          Please review and sign the following agreements. These documents are required to proceed with credentialing.
        </p>
      </div>

      {/* Section 1: Business Associate Agreement */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Section 1: Business Associate Agreement (BAA)</h3>
        
        <div className="border border-gray-200 rounded-lg p-4 h-[150px] overflow-y-auto bg-gray-50 text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold mb-2">BUSINESS ASSOCIATE AGREEMENT</p>
          <p className="mb-2">
            This Business Associate Agreement ("Agreement") is entered into by and between MantraComply Ltd ("Covered Entity") 
            and the healthcare provider ("Business Associate") signing below.
          </p>
          <p className="mb-2">
            This Agreement is made in compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>
          <p className="mb-2">
            1. <strong>Definitions:</strong> Terms used but not otherwise defined in this Agreement shall have the meanings 
            given to them in the UK GDPR and Data Protection Act 2018.
          </p>
          <p className="mb-2">
            2. <strong>Obligations of Business Associate:</strong> Business Associate agrees to not use or disclose 
            Protected Health Information other than as permitted or required by this Agreement or as Required by Law.
          </p>
          <p className="mb-2">
            3. <strong>Data Protection:</strong> Business Associate will implement appropriate technical and organisational 
            measures to ensure a level of security appropriate to the risk, including encryption of personal data.
          </p>
          <p className="mb-2">
            4. <strong>Data Breach Notification:</strong> Business Associate shall notify Covered Entity within 72 hours 
            of becoming aware of any personal data breach.
          </p>
          <p>
            5. <strong>Term and Termination:</strong> This Agreement shall remain in effect until terminated by either party 
            with 30 days written notice, or immediately upon material breach.
          </p>
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
            placeholder="Type your full name to sign"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          <p className="mt-1 text-sm text-gray-500">
            By typing your name, you agree to the terms of the Business Associate Agreement.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={baaAgreed}
            onChange={(e) => setBaaAgreed(e.target.checked)}
            required
            className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded mt-0.5"
          />
          <span className="text-sm text-gray-900">
            I have read and agree to the Business Associate Agreement
          </span>
        </label>
      </div>

      {/* Section 2: Provider Agreement */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Section 2: Provider Agreement</h3>
        
        <div className="border border-gray-200 rounded-lg p-4 h-[150px] overflow-y-auto bg-gray-50 text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold mb-2">PROVIDER AGREEMENT</p>
          <p className="mb-2">
            This Provider Agreement ("Agreement") establishes the terms under which MantraComply Ltd ("Company") 
            will provide credentialing services to the healthcare provider ("Provider") signing below.
          </p>
          <p className="mb-2">
            1. <strong>Services:</strong> Company agrees to assist Provider with credentialing applications to UK private 
            health insurance panels, including but not limited to Bupa, AXA Health, Aviva, and WPA.
          </p>
          <p className="mb-2">
            2. <strong>Provider Obligations:</strong> Provider agrees to provide accurate and complete information, 
            maintain current professional indemnity insurance, and comply with all applicable professional standards and regulations.
          </p>
          <p className="mb-2">
            3. <strong>Professional Responsibility:</strong> Provider acknowledges sole responsibility for clinical care 
            and professional conduct. Company provides administrative support only and assumes no clinical liability.
          </p>
          <p className="mb-2">
            4. <strong>Confidentiality:</strong> Both parties agree to maintain confidentiality of proprietary information 
            and comply with UK GDPR and Data Protection Act 2018.
          </p>
          <p>
            5. <strong>Termination:</strong> Either party may terminate this Agreement with 30 days written notice.
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
            placeholder="Type your full name to sign"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          <p className="mt-1 text-sm text-gray-500">
            By typing your name, you agree to the terms of the Provider Agreement.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={providerAgreed}
            onChange={(e) => setProviderAgreed(e.target.checked)}
            required
            className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded mt-0.5"
          />
          <span className="text-sm text-gray-900">
            I have read and agree to the Provider Agreement
          </span>
        </label>
      </div>

      {/* Section 3: UK GDPR Data Processing Consent */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Section 3: UK GDPR Data Processing Consent</h3>
        
        <div className="border border-gray-200 rounded-lg p-4 h-[150px] overflow-y-auto bg-gray-50 text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold mb-2">UK GDPR DATA PROCESSING CONSENT</p>
          <p className="mb-2">
            MantraComply Ltd ("Data Controller") processes personal data in accordance with the UK General Data Protection 
            Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>
          <p className="mb-2">
            <strong>Lawful Basis for Processing:</strong> We process your personal data on the basis of:
          </p>
          <ul className="list-disc pl-5 mb-2 space-y-1">
            <li>Consent: You have given clear consent for us to process your personal data for credentialing purposes</li>
            <li>Contract: Processing is necessary for the performance of our credentialing services</li>
            <li>Legal Obligation: Processing is necessary for compliance with applicable laws and regulations</li>
          </ul>
          <p className="mb-2">
            <strong>Data We Collect:</strong> Professional qualifications, employment history, registration details, 
            insurance information, and other information necessary for credentialing.
          </p>
          <p className="mb-2">
            <strong>How We Use Your Data:</strong> To submit credentialing applications to UK private health insurers, 
            maintain records, and provide ongoing credentialing support.
          </p>
          <p className="mb-2">
            <strong>Your Rights:</strong> You have the right to access, rectify, erase, restrict processing, data portability, 
            and to object to processing of your personal data. You may withdraw consent at any time.
          </p>
          <p>
            <strong>Data Retention:</strong> We retain your data for as long as necessary to provide services and comply 
            with legal obligations, typically 7 years following termination of services.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            required
            className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] rounded mt-0.5"
          />
          <span className="text-sm text-gray-900">
            I consent to MantraComply processing my data for credentialing purposes under UK GDPR
          </span>
        </label>
      </div>

      <UKFormButtons 
        onBack={onBack} 
        submitText={isLastStep ? "Submit Credentialing Application" : undefined}
      />
    </form>
  );
}