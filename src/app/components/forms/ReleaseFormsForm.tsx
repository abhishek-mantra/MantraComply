import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function ReleaseFormsForm({ onNext, onPrevious, isFirstStep }: FormProps) {
  const [baaSignature, setBaaSignature] = useState("");
  const [providerSignature, setProviderSignature] = useState("");
  const [baaAgreed, setBaaAgreed] = useState(false);
  const [providerAgreed, setProviderAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baaAgreed || !providerAgreed || !baaSignature || !providerSignature) {
      alert("Please read and agree to all agreements and provide digital signatures.");
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-300 rounded-md p-4 flex items-start gap-2">
        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="font-medium text-yellow-900 text-sm">Please review and sign the following agreements</p>
          <p className="text-sm text-yellow-800 mt-1">These documents are required to proceed with credentialing</p>
          <ContextualHelpLink
            slug="background-checks-and-release-forms"
            label="What background checks & release authorizations do payers run? →"
          />
        </div>
      </div>

      {/* Business Associate Agreement */}
      <div className="border border-gray-200 rounded-md p-6 bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Business Associate Agreement (BAA)</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 max-h-48 overflow-y-auto text-sm text-gray-700">
          <p className="mb-3">
            This Business Associate Agreement ("Agreement") is entered into between MantraCare ("Covered Entity") and the Provider ("Business Associate").
          </p>
          <p className="mb-2">
            <strong>1. Purpose:</strong> This Agreement sets forth the terms under which Business Associate may use and disclose Protected Health Information (PHI) in the course of performing services for Covered Entity.
          </p>
          <p className="mb-2">
            <strong>2. Permitted Uses and Disclosures:</strong> Business Associate may use and disclose PHI only as necessary to perform the services outlined in the service agreement.
          </p>
          <p className="mb-2">
            <strong>3. Safeguards:</strong> Business Associate agrees to implement appropriate safeguards to prevent unauthorized use or disclosure of PHI.
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
            By typing your name, you agree to the terms of the Business Associate Agreement.
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
            I have read and agree to the Business Associate Agreement
          </span>
        </label>
      </div>

      {/* Provider Agreement */}
      <div className="border border-gray-200 rounded-md p-6 bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Provider Agreement</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 max-h-48 overflow-y-auto text-sm text-gray-700">
          <p className="mb-3">
            This Provider Agreement ("Agreement") is entered into between MantraCare and the Provider.
          </p>
          <p className="mb-2">
            <strong>1. Services:</strong> Provider agrees to provide mental health services to clients referred through the MantraCare platform in accordance with applicable standards.
          </p>
          <p className="mb-2">
            <strong>2. Credentialing:</strong> Provider authorizes MantraCare to submit credentialing applications on their behalf to insurance companies and managed care organizations.
          </p>
          <p className="mb-2">
            <strong>3. Compliance:</strong> Provider agrees to maintain all required licenses, certifications, and insurance coverage throughout the term of this agreement.
          </p>
        </div>

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
            By typing your name, you agree to the terms of the Provider Agreement.
          </p>
        </div>

        <label className="flex items-start">
          <input
            type="checkbox"
            checked={providerAgreed}
            onChange={(e) => setProviderAgreed(e.target.checked)}
            className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] mt-0.5"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the Provider Agreement
          </span>
        </label>
      </div>

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}