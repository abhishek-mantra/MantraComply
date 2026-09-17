import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";

interface FormProps {
  specialty?: string;
  onNext: (data?: any) => void;
  onPrevious?: () => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export function CAQHAuthForm({
  onNext,
  onPrevious,
  onBack,
  isFirstStep = false,
  isLastStep = false,
}: FormProps) {
  const [caqhId, setCaqhId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authorizeModify, setAuthorizeModify] = useState(false);
  const [attestAccuracy, setAttestAccuracy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorizeModify || !attestAccuracy) {
      alert("Please review and accept both authorization and attestation statements to proceed.");
      return;
    }
    onNext({
      caqhId,
      username,
      password,
      authorizeModify,
      attestAccuracy,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          CAQH Provider ID <span className="text-red-500">*</span>
          <span className="ml-2 text-gray-400 cursor-help" title="Your unique CAQH identification number">
            ⓘ
          </span>
        </label>
        <input
          type="text"
          required
          value={caqhId}
          onChange={(e) => setCaqhId(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Enter your CAQH Provider ID"
        />
        <p className="text-xs text-gray-500 mt-1.5">
          Don't have a CAQH ID?{" "}
          <a 
            href="https://proview.caqh.org/PR/Registration/SelfRegistration" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#2196F3] hover:underline font-medium"
          >
            Create an account
          </a>
        </p>
        <ContextualHelpLink
          slug="caqh-authorization-and-cvo-access"
          label="Why is CAQH authorization required?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          CAQH ProView Username <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Enter your CAQH ProView username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          CAQH ProView Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Enter your CAQH ProView password"
        />
        <div className="flex items-start gap-2 mt-2">
          <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-gray-600">
            This information is encrypted and securely stored
          </p>
        </div>
      </div>

      {/* CAQH Authorization & Attestation Box */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 sm:p-5 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            CAQH Profile Authorization &amp; Attestation
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            To get credentialed, we'll need to update your CAQH profile with the information you just provided. To make things easy, MantraComply will do this on your behalf.
          </p>
        </div>

        <div className="space-y-3.5 pt-3 border-t border-blue-100">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              checked={authorizeModify}
              onChange={(e) => setAuthorizeModify(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] shrink-0 cursor-pointer"
            />
            <span className="text-xs text-gray-700 leading-relaxed group-hover:text-gray-900 select-none">
              I authorize MantraComply and its third-party vendors to access, use, modify, and disclose my information in my CAQH account in order to credential me with third-party payers. I acknowledge that I am solely responsible for any information I provide to MantraComply and will indemnify, defend, and hold MantraComply and its third-party vendors harmless from and against any loss arising out of the information I provide. <span className="text-red-500">*</span>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              checked={attestAccuracy}
              onChange={(e) => setAttestAccuracy(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] shrink-0 cursor-pointer"
            />
            <span className="text-xs text-gray-700 leading-relaxed group-hover:text-gray-900 select-none">
              I attest to the accuracy of my CAQH login credentials and the information I have provided, and I give MantraComply permission to update my profile and attest on my behalf if necessary. <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>

      <FormButtons
        onPrevious={onPrevious || onBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </form>
  );
}

export default CAQHAuthForm;