import { FormButtons } from "./FormButtons";
import { StateDropdown } from "./StateDropdown";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function PersonalInfoForm({ onNext, onPrevious, isFirstStep }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="First name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="Last name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Middle Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Middle name (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="MM/DD/YYYY"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Social Security Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="XXX-XX-XXXX"
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

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Home Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm mb-3"
          placeholder="Street address"
        />
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="City"
          />
          <StateDropdown />
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="ZIP"
          />
        </div>
      </div>

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}