import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface FacilityEmployerInformationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function FacilityEmployerInformationForm({ onNext, onBack }: FacilityEmployerInformationFormProps) {
  const [arrangement, setArrangement] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [facilityLicense, setFacilityLicense] = useState("");
  const [facilityAddress, setFacilityAddress] = useState("");
  const [hrContactName, setHrContactName] = useState("");
  const [hrContactEmail, setHrContactEmail] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicLicense, setClinicLicense] = useState("");
  const [clinicEmirate, setClinicEmirate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ arrangement });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          UAE health licenses must be activated through a licensed healthcare facility or employer. Independent private practice without a licensed facility is not permitted for most mental health categories.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Arrangement <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {[
            "I am employed by / contracted with a licensed UAE healthcare facility",
            "I am establishing or already operate my own licensed clinic",
            "I am seeking employment (MantraComply to match me with facilities)"
          ].map(option => (
            <label key={option} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="arrangement" value={option} required checked={arrangement === option} onChange={(e) => setArrangement(e.target.value)} className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB] mt-0.5" />
              <span className="text-gray-900 text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {arrangement === "I am employed by / contracted with a licensed UAE healthcare facility" && (
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div>
            <label htmlFor="facility-name" className="block text-sm font-medium text-gray-700 mb-2">Facility Name <span className="text-red-500">*</span></label>
            <input type="text" id="facility-name" required value={facilityName} onChange={(e) => setFacilityName(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="facility-license" className="block text-sm font-medium text-gray-700 mb-2">Facility DHA / DOH / MOHAP License Number <span className="text-red-500">*</span></label>
            <input type="text" id="facility-license" required value={facilityLicense} onChange={(e) => setFacilityLicense(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="facility-address" className="block text-sm font-medium text-gray-700 mb-2">Facility Address <span className="text-red-500">*</span></label>
            <input type="text" id="facility-address" required value={facilityAddress} onChange={(e) => setFacilityAddress(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="hr-contact-name" className="block text-sm font-medium text-gray-700 mb-2">HR / Licensing Contact Name <span className="text-gray-400">(optional)</span></label>
            <input type="text" id="hr-contact-name" value={hrContactName} onChange={(e) => setHrContactName(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="hr-contact-email" className="block text-sm font-medium text-gray-700 mb-2">HR / Licensing Contact Email <span className="text-gray-400">(optional)</span></label>
            <input type="email" id="hr-contact-email" value={hrContactEmail} onChange={(e) => setHrContactEmail(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="employment-contract" className="block text-sm font-medium text-gray-700 mb-2">Letter of Intent / Employment Contract <span className="text-red-500">*</span></label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2563EB] transition-colors">
              <input type="file" id="employment-contract" required className="hidden" />
              <label htmlFor="employment-contract" className="cursor-pointer">
                <p className="text-sm text-gray-600"><span className="text-[#2563EB] font-medium">Upload contract</span></p>
              </label>
            </div>
          </div>
        </div>
      )}

      {arrangement === "I am establishing or already operate my own licensed clinic" && (
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div>
            <label htmlFor="clinic-name" className="block text-sm font-medium text-gray-700 mb-2">Clinic Name <span className="text-red-500">*</span></label>
            <input type="text" id="clinic-name" required value={clinicName} onChange={(e) => setClinicName(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="clinic-license" className="block text-sm font-medium text-gray-700 mb-2">Clinic License Number <span className="text-red-500">*</span></label>
            <input type="text" id="clinic-license" required value={clinicLicense} onChange={(e) => setClinicLicense(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
          <div>
            <label htmlFor="clinic-emirate" className="block text-sm font-medium text-gray-700 mb-2">Clinic Emirate <span className="text-red-500">*</span></label>
            <input type="text" id="clinic-emirate" required value={clinicEmirate} onChange={(e) => setClinicEmirate(e.target.value)} className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
          </div>
        </div>
      )}

      {arrangement === "I am seeking employment (MantraComply to match me with facilities)" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            MantraComply will connect you with DHA/DOH-licensed healthcare facilities in your emirate. Your application will be prepared and held pending facility placement.
          </p>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700">If you need assistance finding a licensed facility or have questions about employment requirements, we're here to help.</p>
      </div>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}
