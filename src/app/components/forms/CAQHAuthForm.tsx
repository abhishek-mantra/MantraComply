import { FormButtons } from "./FormButtons";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function CAQHAuthForm({ onNext, onPrevious, isFirstStep }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Enter your CAQH Provider ID"
        />
        <p className="text-xs text-gray-500 mt-1">
          Don't have a CAQH ID?{" "}
          <a 
            href="https://proview.caqh.org/PR/Registration/SelfRegistration" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#2196F3] hover:underline"
          >
            Create an account
          </a>
        </p>
        <ContextualHelpLink
          slug="caqh-authorization-and-cvo-access"
          label="Why is CAQH authorization required & how does CVO access work? →"
          hint="Learn how MantraComply uses authorized CVO access to fast-track payer approvals"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          CAQH ProView Username<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Enter your CAQH ProView username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          CAQH ProView Password<span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Enter your CAQH ProView password"
        />
        <div className="flex items-start gap-2 mt-2">
          <svg className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-gray-600">
            This information is encrypted and securely stored
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Grant Global Authorization</h3>
            <p className="text-xs text-gray-700">
              I authorize MantraCare to access my CAQH profile and share my information with insurance companies for credentialing purposes.
            </p>
          </div>
        </label>
      </div>

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}