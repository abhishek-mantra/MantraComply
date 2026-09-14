import { FormButtons } from "./FormButtons";
import { CountrySwitcher } from "../CountrySwitcher";

interface GenericFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  specialty?: string;
  stepNumber?: number;
  totalSteps?: number;
  isLastStep?: boolean;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

export function GenericForm({ 
  onNext, 
  onBack, 
  specialty, 
  stepNumber, 
  totalSteps, 
  isLastStep,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange
}: GenericFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showCountrySwitcher && selectedCountry && onCountryChange && (
        <CountrySwitcher 
          selectedCountry={selectedCountry} 
          onCountryChange={onCountryChange}
        />
      )}

      <div className="p-4 bg-blue-50 border-l-4 border-[#2563EB] rounded text-sm text-gray-700">
        This form is currently under development. Please continue to the next step.
      </div>

      <div>
        <label htmlFor="sample-field" className="block text-sm font-medium text-gray-700 mb-2">
          Sample Field
        </label>
        <input
          type="text"
          id="sample-field"
          name="sample-field"
          placeholder="Enter information"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <FormButtons onBack={onBack} submitLabel={isLastStep ? "Submit Credentialing Application" : undefined} />
    </form>
  );
}
