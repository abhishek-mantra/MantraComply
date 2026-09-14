import { UKFormButtons } from "./UKFormButtons";

interface PersonalInformationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function PersonalInformationForm({ onNext, onBack }: PersonalInformationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            required
            placeholder="Enter first name"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            required
            placeholder="Enter last name"
            className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="middle-name" className="block text-sm font-medium text-gray-700 mb-2">
          Middle Name <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="middle-name"
          name="middle-name"
          placeholder="Enter middle name"
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          required
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Home Address <span className="text-red-500">*</span>
        </label>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              id="street-address"
              name="street-address"
              required
              placeholder="Street address"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder="City"
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <input
                type="text"
                id="county"
                name="county"
                required
                placeholder="County"
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <input
                type="text"
                id="postcode"
                name="postcode"
                required
                placeholder="Postcode"
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <select
              id="country"
              name="country"
              required
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="">Select country...</option>
              <option value="england">England</option>
              <option value="scotland">Scotland</option>
              <option value="wales">Wales</option>
              <option value="northern-ireland">Northern Ireland</option>
            </select>
          </div>
        </div>
      </div>

      <UKFormButtons onBack={onBack} />
    </form>
  );
}