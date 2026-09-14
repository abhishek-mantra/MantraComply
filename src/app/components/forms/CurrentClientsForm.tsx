import { FormButtons } from "./FormButtons";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function CurrentClientsForm({ onNext, onPrevious, isFirstStep }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-gray-700">
          List any current clients who may need benefit verification for insurance credentialing purposes.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Number of Current Active Clients
        </label>
        <input
          type="number"
          min="0"
          defaultValue="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Client Names (Optional)
        </label>
        <textarea
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="List client names, one per line&#10;John Doe&#10;Jane Smith"
        />
        <p className="text-xs text-gray-500 mt-2">
          This information is kept confidential and used only for verification purposes.
        </p>
      </div>

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}
