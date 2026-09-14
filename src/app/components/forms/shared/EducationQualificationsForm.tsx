import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { FormButtons } from "../FormButtons";
import { UKFormButtons } from "../uk/UKFormButtons";
import { CanadaFormButtons } from "../canada/CanadaFormButtons";
import { AustraliaFormButtons } from "../australia/AustraliaFormButtons";
import { UAEFormButtons } from "../uae/UAEFormButtons";
import { UK_SERVICE_CONFIG, type UKServiceType } from "../../../config/ukServiceConfig";
import { UAE_SERVICE_CONFIG, type UAEServiceType } from "../../../config/uaeServiceConfig";
import { ContextualHelpLink } from "../../shared/ContextualHelpLink";

type Country = "US" | "UK" | "Canada" | "Australia" | "UAE";

interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  country: string;
  startDate: string;
  endDate: string;
  isAttested?: boolean;
  medicalSchoolName?: string;
  residencyProgramName?: string;
  residencyHospital?: string;
  residencySpecialty?: string;
  residencyStartYear?: string;
  residencyEndYear?: string;
  fellowshipHospital?: string;
  fellowshipSpecialty?: string;
  fellowshipCompletionYear?: string;
}

interface EducationQualificationsFormProps {
  country: Country;
  onNext: (data?: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  selectedService?: UKServiceType | UAEServiceType | "";
  specialty?: string;
  selectedSpecialization?: string;
}

const DEGREES = [
  "PhD - Doctor of Philosophy",
  "PsyD - Doctor of Psychology",
  "MD - Doctor of Medicine",
  "DO - Doctor of Osteopathic Medicine",
  "EdD - Doctor of Education",
  "MSW - Master of Social Work",
  "MA - Master of Arts",
  "MS - Master of Science",
  "MEd - Master of Education",
  "MBA - Master of Business Administration",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BS)",
  "Other",
];

const FIELDS_OF_STUDY = [
  "Clinical Psychology",
  "Counseling Psychology",
  "School Psychology",
  "Neuropsychology",
  "Psychiatry",
  "Social Work",
  "Mental Health Counseling",
  "Marriage and Family Therapy",
  "Educational Psychology",
  "Behavioral Psychology",
  "Developmental Psychology",
  "Other",
];

export function EducationQualificationsForm({
  country,
  onNext,
  onBack,
  isFirstStep = false,
  isLastStep = false,
  selectedService = "",
  specialty = "",
  selectedSpecialization = "",
}: EducationQualificationsFormProps) {

  const fellowshipSpecializations = [
    "Cardiologist",
    "Gastroenterologist",
    "Endocrinologist",
    "Nephrologist",
    "Pulmonologist (Lung)",
    "Rheumatologist",
    "Oncologist",
    "Fertility / IVF Specialist"
  ];
  const [entries, setEntries] = useState<EducationEntry[]>([
    {
      id: "1",
      institution: "",
      degree: "",
      fieldOfStudy: "",
      country: "",
      startDate: "",
      endDate: "",
      isAttested: false,
      medicalSchoolName: "",
      residencyProgramName: "",
      residencyHospital: "",
      residencySpecialty: "",
      residencyStartYear: "",
      residencyEndYear: "",
      fellowshipHospital: "",
      fellowshipSpecialty: "",
      fellowshipCompletionYear: "",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addEntry = () => {
    const newEntry: EducationEntry = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      country: "",
      startDate: "",
      endDate: "",
      isAttested: false,
      medicalSchoolName: "",
      residencyProgramName: "",
      residencyHospital: "",
      residencySpecialty: "",
      residencyStartYear: "",
      residencyEndYear: "",
      fellowshipHospital: "",
      fellowshipSpecialty: "",
      fellowshipCompletionYear: "",
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const updateEntry = (id: string, field: keyof EducationEntry, value: string | boolean) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
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

  // Get service-specific options or use default
  let degreesOptions = DEGREES;
  let fieldsOfStudyOptions = FIELDS_OF_STUDY;

  if (country === "US" && specialty === "doctor") {
    const baseDoctorDegrees = ["MD", "DO", "MBBS", "MS (Surgery)", "DNB"];
    if (selectedSpecialization === "Dentist") {
      degreesOptions = [...baseDoctorDegrees, "DDS", "DMD"];
    } else {
      degreesOptions = baseDoctorDegrees;
    }
  } else if (country === "UK" && selectedService) {
    const ukConfig = UK_SERVICE_CONFIG[selectedService as UKServiceType];
    if (ukConfig) {
      degreesOptions = ukConfig.degrees;
      fieldsOfStudyOptions = ukConfig.fieldsOfStudy;
    }
  } else if (country === "UAE" && selectedService) {
    const uaeConfig = UAE_SERVICE_CONFIG[selectedService as UAEServiceType];
    if (uaeConfig) {
      degreesOptions = uaeConfig.degrees;
      if (uaeConfig.fieldsOfStudy) {
        fieldsOfStudyOptions = uaeConfig.fieldsOfStudy;
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Provide all relevant educational qualifications</strong> starting with your highest degree. 
          {country === "UAE" && " All degrees obtained outside the UAE must be attested through the appropriate channels (MOFA, UAE Embassy, etc.)."}
          {country === "Australia" && " International qualifications may require assessment by AHPRA."}
          {country === "Canada" && " International degrees may require assessment by provincial regulatory bodies."}
          {country === "UK" && " International qualifications may need verification through UK ENIC or professional body."}
        </p>
        <ContextualHelpLink
          slug="medical-education-and-residency-documentation"
          label="Required residency, fellowship & degree verification documents"
        />
      </div>

      {/* Education Entries */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="border border-gray-200 rounded-lg p-4 bg-white space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">
                Education {index + 1}
              </h3>
              {entries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Institution Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={entry.institution}
                onChange={(e) => updateEntry(entry.id, "institution", e.target.value)}
                placeholder="Enter institution name"
                className={inputClassName}
              />
            </div>

            {/* Degree and Field */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={entry.degree}
                  onChange={(e) => updateEntry(entry.id, "degree", e.target.value)}
                  className={inputClassName}
                >
                  <option value="">Select degree...</option>
                  {degreesOptions.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={entry.fieldOfStudy}
                  onChange={(e) => updateEntry(entry.id, "fieldOfStudy", e.target.value)}
                  className={inputClassName}
                >
                  <option value="">Select field...</option>
                  {fieldsOfStudyOptions.map((field) => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Where Degree Was Obtained <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={entry.country}
                onChange={(e) => updateEntry(entry.id, "country", e.target.value)}
                placeholder="Enter country"
                className={inputClassName}
              />
            </div>

            {/* Doctor-specific fields */}
            {country === "US" && specialty === "doctor" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical School Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={entry.medicalSchoolName}
                    onChange={(e) => updateEntry(entry.id, "medicalSchoolName", e.target.value)}
                    placeholder="Enter medical school name"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Residency Program Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={entry.residencyProgramName}
                    onChange={(e) => updateEntry(entry.id, "residencyProgramName", e.target.value)}
                    placeholder="Enter residency program name"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Residency Hospital <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={entry.residencyHospital}
                    onChange={(e) => updateEntry(entry.id, "residencyHospital", e.target.value)}
                    placeholder="Enter residency hospital"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Residency Specialty <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={entry.residencySpecialty}
                    onChange={(e) => updateEntry(entry.id, "residencySpecialty", e.target.value)}
                    placeholder="Enter residency specialty"
                    className={inputClassName}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Residency Start Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={entry.residencyStartYear}
                      onChange={(e) => updateEntry(entry.id, "residencyStartYear", e.target.value)}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Residency End Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={entry.residencyEndYear}
                      onChange={(e) => updateEntry(entry.id, "residencyEndYear", e.target.value)}
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Fellowship fields for specific specializations */}
                {selectedSpecialization && fellowshipSpecializations.includes(selectedSpecialization) && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fellowship Hospital <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={entry.fellowshipHospital}
                        onChange={(e) => updateEntry(entry.id, "fellowshipHospital", e.target.value)}
                        placeholder="Enter fellowship hospital"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fellowship Specialty <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={entry.fellowshipSpecialty}
                        onChange={(e) => updateEntry(entry.id, "fellowshipSpecialty", e.target.value)}
                        placeholder="Enter fellowship specialty"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fellowship Completion Year <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="date"
                        value={entry.fellowshipCompletionYear}
                        onChange={(e) => updateEntry(entry.id, "fellowshipCompletionYear", e.target.value)}
                        className={inputClassName}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={entry.startDate}
                  onChange={(e) => updateEntry(entry.id, "startDate", e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={entry.endDate}
                  onChange={(e) => updateEntry(entry.id, "endDate", e.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>

            {/* UAE-specific: Attestation */}
            {country === "UAE" && (
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={entry.isAttested || false}
                    onChange={(e) => updateEntry(entry.id, "isAttested", e.target.checked)}
                    className="w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
                  />
                  <span className="text-sm text-gray-700">
                    This degree has been attested by MOFA/UAE Embassy
                  </span>
                </label>
              </div>
            )}

            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload {country === "UAE" && entry.isAttested ? "Attested " : ""}Degree Certificate <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2196F3] transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, PNG, or JPG (max. 10MB)</p>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                />
              </div>
            </div>

            {/* Transcript Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Official Transcript <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2196F3] transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, PNG, or JPG (max. 10MB)</p>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Education Button */}
      <button
        type="button"
        onClick={addEntry}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Another Degree/Qualification
      </button>

      {renderFormButtons()}
    </form>
  );
}