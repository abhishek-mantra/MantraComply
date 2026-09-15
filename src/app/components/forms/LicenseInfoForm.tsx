import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { StateDropdown } from "./StateDropdown";
import { Trash2, Eye } from "lucide-react";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  selectedSpecialization?: string;
}

interface License {
  id: string;
  type: string;
  number: string;
  state: string;
  expirationDate: string;
  deaNumber?: string;
}

export function LicenseInfoForm({ specialty, onNext, onPrevious, isFirstStep, selectedSpecialization }: FormProps) {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [currentLicense, setCurrentLicense] = useState({
    type: "",
    number: "",
    state: "",
    expirationDate: "",
    deaNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const getLicenseTypes = () => {
    if (specialty === "therapy") {
      return [
        "LCSW - Licensed Clinical Social Worker",
        "LMHC - Licensed Mental Health Counselor",
        "PsyD - Doctor of Psychology",
        "NP - Nurse Practitioner"
      ];
    } else if (specialty === "doctor") {
      const baseTypes = ["MD", "DO", "MBBS", "MS (Surgery)", "DNB"];
      if (selectedSpecialization === "Dentist") {
        return [...baseTypes, "DDS", "DMD"];
      }
      return baseTypes;
    } else if (specialty === "dietitian") {
      return [
        "RD - Registered Dietitian",
        "RDN - Registered Dietitian Nutritionist",
        "LD - Licensed Dietitian"
      ];
    } else if (specialty === "physiotherapy") {
      return [
        "PT - Physical Therapist",
        "PTA - Physical Therapist Assistant",
        "DPT - Doctor of Physical Therapy"
      ];
    }
    return [];
  };

  const handleAddLicense = () => {
    if (currentLicense.type && currentLicense.number && currentLicense.state && currentLicense.expirationDate) {
      const newLicense: License = {
        id: Date.now().toString(),
        type: currentLicense.type,
        number: currentLicense.number,
        state: currentLicense.state,
        expirationDate: currentLicense.expirationDate,
        ...(specialty === "doctor" && currentLicense.deaNumber && { deaNumber: currentLicense.deaNumber }),
      };
      setLicenses([...licenses, newLicense]);
      setCurrentLicense({
        type: "",
        number: "",
        state: "",
        expirationDate: "",
        deaNumber: "",
      });
    }
  };

  const handleDeleteLicense = (id: string) => {
    setLicenses(licenses.filter((license) => license.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          License Type <span className="text-red-500">*</span>
        </label>
        <select
          value={currentLicense.type}
          onChange={(e) => setCurrentLicense({ ...currentLicense, type: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
        >
          <option value="">Select license type</option>
          {getLicenseTypes().map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          License Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={currentLicense.number}
          onChange={(e) => setCurrentLicense({ ...currentLicense, number: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="Enter license number"
        />
        <ContextualHelpLink
          slug="state-medical-license-verification"
          label="How state licenses, compacts (PSYPACT/IMLC) & expirations are verified"
        />
      </div>

      {specialty === "doctor" && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            DEA Registration Number <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={currentLicense.deaNumber}
            onChange={(e) => setCurrentLicense({ ...currentLicense, deaNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="Enter DEA number"
          />
          <p className="text-xs text-gray-500 mt-1">
            Required if prescribing controlled substances.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <StateDropdown
            value={currentLicense.state}
            onChange={(value) => setCurrentLicense({ ...currentLicense, state: value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Expiration Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={currentLicense.expirationDate}
            onChange={(e) => setCurrentLicense({ ...currentLicense, expirationDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            placeholder="mm-dd-yyyy"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          License Certificate <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-[#2196F3] transition-colors cursor-pointer">
          <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, JPG, or PNG (max 10MB)</p>
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddLicense}
        className="w-full px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
      >
        + Add License
      </button>

      {licenses.length > 0 && (
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  License Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  License Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  State
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {licenses.map((license) => (
                <tr key={license.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{license.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{license.number}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{license.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(license.expirationDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alert('View document functionality')}
                        className="text-[#2196F3] hover:text-[#1976D2] transition-colors"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLicense(license.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}
