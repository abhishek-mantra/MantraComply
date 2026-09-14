import { FormButtons } from "./FormButtons";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function InsurancePlansForm({ onNext, onPrevious, isFirstStep, isLastStep }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const insuranceCarriers = [
    "Aetna",
    "Cigna",
    "UnitedHealthcare",
    "Blue Cross Blue Shield",
    "Humana",
    "Oscar Health",
    "Anthem"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-gray-700">
          Select which insurance carriers you'd like to credential with and review the reimbursement rates.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Desired Insurance Carriers <span className="text-red-500">*</span>
        </label>
        
        <div className="space-y-2">
          {insuranceCarriers.map((carrier, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                name="desiredInsurance"
                value={carrier}
                className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
              />
              <span className="text-sm text-gray-900">{carrier}</span>
            </label>
          ))}
        </div>
      </div>

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} isLastStep={isLastStep} />
    </form>
  );
}
