import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { FormButtons } from "../FormButtons";
import { UKFormButtons } from "../uk/UKFormButtons";
import { CanadaFormButtons } from "../canada/CanadaFormButtons";
import { AustraliaFormButtons } from "../australia/AustraliaFormButtons";
import { UAEFormButtons } from "../uae/UAEFormButtons";
import { StateDropdown } from "../StateDropdown";
import { UK_SERVICE_CONFIG, type UKServiceType } from "../../../config/ukServiceConfig";
import { UAE_SERVICE_CONFIG, type UAEServiceType } from "../../../config/uaeServiceConfig";
import { ContextualHelpLink } from "../../shared/ContextualHelpLink";

type Country = "US" | "UK" | "Canada" | "Australia" | "UAE";

interface PracticeInformationFormProps {
  country: Country;
  onNext: (data?: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  selectedService?: UKServiceType | UAEServiceType | "";
  specialty?: string;
  selectedSpecialization?: string;
}

interface HospitalAffiliation {
  id: string;
  name: string;
  state: string;
  admittingPrivileges: string;
}

const PRACTICE_SETTINGS = {
  US: ["Solo Practice", "Group Practice", "Hospital", "Clinic", "Telehealth", "Other"],
  UK: ["NHS Hospital", "Private Hospital", "GP Practice", "Private Clinic", "Mental Health Trust", "Community Service", "Independent Practice"],
  Canada: ["Solo Practice", "Group Practice", "Hospital", "Community Health Centre", "Walk-in Clinic", "Virtual Care", "Other"],
  Australia: ["Private Practice", "Public Hospital", "Private Hospital", "Community Health", "Telehealth", "Other"],
  UAE: ["Private Practice", "Hospital", "Clinic", "Telehealth", "Other"],
};

const SPECIALTIES = [
  "Psychiatry",
  "Psychology",
  "Clinical Psychology",
  "Counseling Psychology",
  "Neuropsychology",
  "Family Therapy",
  "Marriage and Family Therapy",
  "Mental Health Counseling",
  "Addiction Counseling",
  "Child and Adolescent Psychiatry",
  "Geriatric Psychiatry",
  "Other",
];

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "Arabic",
  "Mandarin",
  "Hindi",
  "Portuguese",
  "German",
  "Japanese",
  "Russian",
  "Other",
];

const CLIENT_POPULATIONS_BASE = [
  "Children",
  "Adolescents",
  "Adults",
  "Seniors",
  "Couples",
  "Families",
  "LGBTQ+",
  "Veterans",
  "Expatriates",
];

const CLIENT_POPULATIONS_WITH_UAE = [
  ...CLIENT_POPULATIONS_BASE,
  "UAE Nationals",
];

export function PracticeInformationForm({
  country,
  onNext,
  onBack,
  isFirstStep = false,
  isLastStep = false,
  selectedService = "",
  specialty = "",
  selectedSpecialization = "",
}: PracticeInformationFormProps) {

  const hospitalAffiliationsSpecializations = [
    "Cardiologist",
    "Neurosurgeon",
    "General Surgery",
    "Orthopedician",
    "ENT Specialist"
  ];
  const [practiceSetting, setPracticeSetting] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [officeFax, setOfficeFax] = useState("");
  const [officeEmail, setOfficeEmail] = useState("");
  const [practiceWebsite, setPracticeWebsite] = useState("");
  const [primarySpecialty, setPrimarySpecialty] = useState("");
  const [secondarySpecialty, setSecondarySpecialty] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPopulations, setSelectedPopulations] = useState<string[]>([]);
  const [acceptingNewPatients, setAcceptingNewPatients] = useState("");
  const [telehealth, setTelehealth] = useState("");
  const [directBilling, setDirectBilling] = useState("");
  const [healthcodeRegistered, setHealthcodeRegistered] = useState("");
  const [nhsSpineRegistered, setNhsSpineRegistered] = useState("");
  const [nhsContract, setNhsContract] = useState("");
  const [hospitalAffiliations, setHospitalAffiliations] = useState<HospitalAffiliation[]>([]);
  const [currentAffiliation, setCurrentAffiliation] = useState({
    name: "",
    state: "",
    admittingPrivileges: "",
  });

  // Auto-select primary specialty and pre-check populations for doctors
  useEffect(() => {
    if ((country === "US" || country === "UK" || country === "UAE") && specialty === "doctor" && selectedSpecialization) {
      // Auto-select primary specialty
      setPrimarySpecialty(selectedSpecialization);

      // Pre-check populations based on specialization (for US only)
      if (country === "US") {
        let populations: string[] = [];
        if (selectedSpecialization === "Paediatrician") {
          populations = ["Children", "Adolescents"];
        } else if (selectedSpecialization === "Gynecologist") {
          populations = ["Adults"];
        } else if (selectedSpecialization === "Fertility / IVF Specialist") {
          populations = ["Adults", "Couples"];
        } else {
          // All other doctor specialties
          populations = ["Adults", "Seniors"];
        }
        setSelectedPopulations(populations);
      }
    }
  }, [country, specialty, selectedSpecialization]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const togglePopulation = (population: string) => {
    setSelectedPopulations((prev) =>
      prev.includes(population)
        ? prev.filter((p) => p !== population)
        : [...prev, population]
    );
  };

  const handleAddAffiliation = () => {
    if (currentAffiliation.name && currentAffiliation.state && currentAffiliation.admittingPrivileges) {
      const newAffiliation: HospitalAffiliation = {
        id: Date.now().toString(),
        ...currentAffiliation,
      };
      setHospitalAffiliations([...hospitalAffiliations, newAffiliation]);
      setCurrentAffiliation({
        name: "",
        state: "",
        admittingPrivileges: "",
      });
    }
  };

  const handleDeleteAffiliation = (id: string) => {
    setHospitalAffiliations(hospitalAffiliations.filter((aff) => aff.id !== id));
  };

  const renderFormButtons = () => {
    switch (country) {
      case "US":
        return <FormButtons onPrevious={onBack} isFirstStep={isFirstStep} />;
      case "UK":
        return <UKFormButtons onBack={onBack} />;
      case "Canada":
        return <CanadaFormButtons onBack={onBack} />;
      case "Australia":
        return <AustraliaFormButtons onBack={onBack} />;
      case "UAE":
        return <UAEFormButtons onBack={onBack} isLastStep={isLastStep} />;
      default:
        return <FormButtons onPrevious={onBack} isFirstStep={isFirstStep} />;
    }
  };

  const inputClassName =
    country === "US"
      ? "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
      : "w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]";

  // Get practice settings based on country and service
  const getPracticeSettings = () => {
    if (country === "UK" && selectedService === "doctor") {
      return ["NHS Hospital", "Private Hospital / Clinic", "GP Practice", "Polyclinic", "Telehealth Only", "Mixed (NHS + Private)"];
    }
    return PRACTICE_SETTINGS[country] || PRACTICE_SETTINGS.US;
  };

  const practiceSettingsForCountry = getPracticeSettings();

  // Get service-specific options or use default
  let specialtiesOptions = SPECIALTIES;
  let clientPopulationsOptions = country === "US" ? CLIENT_POPULATIONS_BASE : CLIENT_POPULATIONS_WITH_UAE;

  if (country === "UK" && selectedService) {
    const ukConfig = UK_SERVICE_CONFIG[selectedService as UKServiceType];
    if (ukConfig) {
      specialtiesOptions = ukConfig.primarySpecialties;
      clientPopulationsOptions = [...CLIENT_POPULATIONS_BASE, ...ukConfig.additionalPopulations];
    }
  } else if (country === "UAE" && selectedService) {
    const uaeConfig = UAE_SERVICE_CONFIG[selectedService as UAEServiceType];
    if (uaeConfig) {
      specialtiesOptions = uaeConfig.specialties;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Practice Setting */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Practice Setting <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={practiceSetting}
          onChange={(e) => setPracticeSetting(e.target.value)}
          className={inputClassName}
        >
          <option value="">Select practice setting...</option>
          {practiceSettingsForCountry.map((setting) => (
            <option key={setting} value={setting}>
              {setting}
            </option>
          ))}
        </select>
        <ContextualHelpLink
          slug="practice-location-and-tax-id-rules"
          label="W-9 Tax IDs, group vs. solo billing & multi-location rules"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={officePhone}
            onChange={(e) => setOfficePhone(e.target.value)}
            placeholder={country === "US" ? "(555) 123-4567" : "Enter phone number"}
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office Fax {country !== "US" && <span className="text-gray-400">(optional)</span>}
          </label>
          <input
            type="tel"
            value={officeFax}
            onChange={(e) => setOfficeFax(e.target.value)}
            placeholder={country === "US" ? "(555) 123-4567" : "Enter fax number"}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Office Email and Website */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Office Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={officeEmail}
            onChange={(e) => setOfficeEmail(e.target.value)}
            placeholder="practice@example.com"
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Practice Website {country !== "US" && <span className="text-gray-400">(optional)</span>}
          </label>
          <input
            type="url"
            value={practiceWebsite}
            onChange={(e) => setPracticeWebsite(e.target.value)}
            placeholder="https://www.example.com"
            className={inputClassName}
          />
        </div>
      </div>

      {/* Specialties */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Specialty <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={primarySpecialty}
            onChange={(e) => setPrimarySpecialty(e.target.value)}
            className={inputClassName}
          >
            <option value="">Select specialty...</option>
            {specialtiesOptions.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secondary Specialty <span className="text-gray-400">(optional)</span>
          </label>
          <select
            value={secondarySpecialty}
            onChange={(e) => setSecondarySpecialty(e.target.value)}
            className={inputClassName}
          >
            <option value="">Select specialty...</option>
            {specialtiesOptions.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Languages Spoken <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {LANGUAGES.map((language) => (
            <label key={language} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language)}
                onChange={() => toggleLanguage(language)}
                className="w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
              />
              <span className="text-sm text-gray-700">{language}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Client Populations */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Client Populations Served <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {clientPopulationsOptions.map((population) => (
            <label key={population} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPopulations.includes(population)}
                onChange={() => togglePopulation(population)}
                className="w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
              />
              <span className="text-sm text-gray-700">{population}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Practice Preferences */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accepting New Patients? <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={acceptingNewPatients}
            onChange={(e) => setAcceptingNewPatients(e.target.value)}
            className={inputClassName}
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="waitlist">Waitlist Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Offer Telehealth Services? <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={telehealth}
            onChange={(e) => setTelehealth(e.target.value)}
            className={inputClassName}
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      {/* Canada-specific: Direct Billing */}
      {country === "Canada" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you offer direct billing to extended health benefit providers? <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={directBilling}
            onChange={(e) => setDirectBilling(e.target.value)}
            className={inputClassName}
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      )}

      {/* UK-specific: Healthcode Registration (for non-doctors) */}
      {country === "UK" && selectedService !== "doctor" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Are you registered with Healthcode? <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={healthcodeRegistered}
            onChange={(e) => setHealthcodeRegistered(e.target.value)}
            className={inputClassName}
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>
      )}

      {/* UK-specific: NHS Registration (for doctors) */}
      {country === "UK" && selectedService === "doctor" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you registered with the NHS Spine? <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={nhsSpineRegistered}
              onChange={(e) => setNhsSpineRegistered(e.target.value)}
              className={inputClassName}
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you hold an NHS contract? <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={nhsContract}
              onChange={(e) => setNhsContract(e.target.value)}
              className={inputClassName}
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </>
      )}

      {/* Hospital Affiliations for specific doctor specializations */}
      {country === "US" && specialty === "doctor" && selectedSpecialization && hospitalAffiliationsSpecializations.includes(selectedSpecialization) && (
        <div className="space-y-4 border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-base font-medium text-gray-900">Hospital Affiliations</h3>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentAffiliation.name}
                onChange={(e) => setCurrentAffiliation({ ...currentAffiliation, name: e.target.value })}
                className={inputClassName}
                placeholder="Enter hospital name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <StateDropdown
                value={currentAffiliation.state}
                onChange={(value) => setCurrentAffiliation({ ...currentAffiliation, state: value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Admitting Privileges <span className="text-red-500">*</span>
              </label>
              <select
                value={currentAffiliation.admittingPrivileges}
                onChange={(e) => setCurrentAffiliation({ ...currentAffiliation, admittingPrivileges: e.target.value })}
                className={inputClassName}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddAffiliation}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Another Hospital
          </button>

          {hospitalAffiliations.length > 0 && (
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Hospital Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Admitting Privileges
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hospitalAffiliations.map((affiliation) => (
                    <tr key={affiliation.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{affiliation.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{affiliation.state}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 capitalize">{affiliation.admittingPrivileges}</td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          type="button"
                          onClick={() => handleDeleteAffiliation(affiliation.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {renderFormButtons()}
    </form>
  );
}