import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { CountrySwitcher } from "../CountrySwitcher";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";
import { ChevronUp, ChevronDown, ExternalLink, Phone, CheckCircle2 } from "lucide-react";

interface FormProps {
  specialty?: string;
  onNext: (data?: any) => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

export function NPIForm({
  specialty: initialSpecialty,
  onNext,
  onPrevious,
  isFirstStep,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange
}: FormProps) {
  const [specialty, setSpecialty] = useState(initialSpecialty || "therapy");
  const [selectedService, setSelectedService] = useState("Talk Therapy");
  const [doctorSpecialization, setDoctorSpecialization] = useState("");
  const [taxonomyCode, setTaxonomyCode] = useState("");
  const [npiNumber, setNpiNumber] = useState("");
  const [isNpiGuideOpen, setIsNpiGuideOpen] = useState(true);
  const [autoFetch, setAutoFetch] = useState<"yes" | "no">("yes");
  const [showConsultantModal, setShowConsultantModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass specialty, doctor specialization, service, and autoFetch
    onNext({
      specialty,
      selectedSpecialization: specialty === "doctor" ? doctorSpecialization : "",
      serviceType: selectedService,
      npiNumber,
      autoFetch,
    });
  };

  const doctorSpecializations = [
    "Cardiologist",
    "Dentist",
    "Dermatologist",
    "Endocrinologist",
    "ENT Specialist",
    "Fertility / IVF Specialist",
    "Gastroenterologist",
    "General Physician",
    "General Surgery",
    "Gynecologist",
    "Hypertension",
    "Nephrologist",
    "Neurosurgeon",
    "Oncologist",
    "Ophthalmologist",
    "Orthopedician",
    "Paediatrician",
    "Pulmonologist (Lung)",
    "Rheumatologist",
    "Sexologist",
    "Urologist (Kidney & Urinary Tract)"
  ];

  const doctorTaxonomyCodes: { [key: string]: { code: string; description: string } } = {
    "Cardiologist": { code: "207RC0000X", description: "Cardiovascular Disease" },
    "Dentist": { code: "122300000X", description: "Dentist" },
    "Dermatologist": { code: "207N00000X", description: "Dermatology" },
    "Endocrinologist": { code: "207RE0101X", description: "Endocrinology, Diabetes & Metabolism" },
    "ENT Specialist": { code: "207Y00000X", description: "Otolaryngology" },
    "Fertility / IVF Specialist": { code: "207VE0102X", description: "Reproductive Endocrinology" },
    "Gastroenterologist": { code: "207RG0100X", description: "Gastroenterology" },
    "General Physician": { code: "208D00000X", description: "General Practice" },
    "General Surgery": { code: "208600000X", description: "Surgery" },
    "Gynecologist": { code: "207VG0400X", description: "Gynecology" },
    "Hypertension": { code: "207RI0200X", description: "Internal Medicine - Hypertension Specialist" },
    "Nephrologist": { code: "207RN0300X", description: "Nephrology" },
    "Neurosurgeon": { code: "207T00000X", description: "Neurological Surgery" },
    "Oncologist": { code: "207RX0202X", description: "Medical Oncology" },
    "Ophthalmologist": { code: "207W00000X", description: "Ophthalmology" },
    "Orthopedician": { code: "207X00000X", description: "Orthopaedic Surgery" },
    "Paediatrician": { code: "208000000X", description: "Pediatrics" },
    "Pulmonologist (Lung)": { code: "207RP1001X", description: "Pulmonary Disease" },
    "Rheumatologist": { code: "207RR0500X", description: "Rheumatology" },
    "Sexologist": { code: "207Q00000X", description: "Family Medicine - Sexual Health" },
    "Urologist (Kidney & Urinary Tract)": { code: "208800000X", description: "Urology" }
  };

  const serviceOptions = {
    therapy: [
      { label: "Talk Therapy", value: "Talk Therapy" },
      { label: "Medication Management", value: "Medication Management" },
      { label: "Both", value: "Both" }
    ],
    doctor: [
      { label: "In-person Consultation", value: "In-person Consultation" },
      { label: "Telehealth", value: "Telehealth" },
      { label: "Both", value: "Both" }
    ],
    dietitian: [
      { label: "Medical Nutrition Therapy (MNT)", value: "Medical Nutrition Therapy (MNT)" }
    ],
    physiotherapy: [
      { label: "Physical Therapy (PT)", value: "Physical Therapy (PT)" }
    ],
  };

  const taxonomyCodes = {
    therapy: [
      { code: "101YP2500X", description: "Professional Counselor" },
      { code: "101YM0800X", description: "Mental Health Counselor" },
      { code: "106H00000X", description: "Marriage & Family Therapist" },
      { code: "1041C0700X", description: "Clinical Social Worker" },
      { code: "103TC0700X", description: "Clinical Psychologist" },
      { code: "103T00000X", description: "Psychologist (General)" }
    ],
    dietitian: [
      { code: "133V00000X", description: "Dietitian, Registered" },
      { code: "133N00000X", description: "Nutritionist" }
    ],
    physiotherapy: [
      { code: "225100000X", description: "Physical Therapist" },
      { code: "2251E1200X", description: "Physical Therapist, Ergonomics" },
      { code: "2251G0304X", description: "Physical Therapist, Geriatrics" },
      { code: "2251N0400X", description: "Physical Therapist, Neurology" },
      { code: "2251S0007X", description: "Physical Therapist, Sports" }
    ]
  };

  const getSpecialtyLabel = () => {
    if (specialty === "therapy") return "THERAPY (Mental & Behavioral Health)";
    if (specialty === "dietitian") return "DIETITIAN / NUTRITION";
    if (specialty === "physiotherapy") return "PHYSIOTHERAPY (Physical Therapy)";
    return "";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Select your service <span className="text-red-500">*</span>
        </label>
        <select
          value={specialty}
          onChange={(e) => {
            setSpecialty(e.target.value);
            setSelectedService("");
            setDoctorSpecialization("");
            setTaxonomyCode("");
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
        >
          <option value="">Select a service</option>
          <option value="therapy">Therapy</option>
          <option value="doctor">Doctor</option>
          <option value="dietitian">Dietitian</option>
          <option value="physiotherapy">Physiotherapy</option>
        </select>
      </div>

      {specialty === "doctor" && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Select Specialization <span className="text-red-500">*</span>
          </label>
          <select
            value={doctorSpecialization}
            onChange={(e) => {
              setDoctorSpecialization(e.target.value);
              const taxonomyData = doctorTaxonomyCodes[e.target.value];
              if (taxonomyData) {
                setTaxonomyCode(taxonomyData.code);
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          >
            <option value="">Select specialization...</option>
            {doctorSpecializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      )}

      {specialty && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Type 1 NPI <span className="text-red-500">*</span>
              <span className="ml-2 text-gray-400 cursor-help" title="Your National Provider Identifier (NPI) is a 10-digit number">
                ⓘ
              </span>
            </label>
            <input
              type="text"
              required
              maxLength={10}
              value={npiNumber}
              onChange={(e) => setNpiNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
              placeholder="Enter your 10-digit NPI number"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your National Provider Identifier (NPI) is a 10-digit number.
            </p>
            <ContextualHelpLink
              slug="why-npi-is-needed-and-how-to-find-it"
              label="Why NPI is needed and how to verify in NPPES"
            />
          </div>

          {/* Don't remember your NPI? Dropdown Card (Matching Image 1) */}
          <div className="border border-gray-200 rounded-2xl bg-[#FAFAFA] p-5 shadow-sm transition-all">
            <button
              type="button"
              onClick={() => setIsNpiGuideOpen(!isNpiGuideOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none group"
            >
              <span className="text-sm font-semibold text-gray-900 group-hover:text-[#2196F3] transition-colors">
                Don't remember your NPI?
              </span>
              {isNpiGuideOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {isNpiGuideOpen && (
              <div className="mt-4 pt-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-gray-500 font-normal shrink-0">
                    Guide to find your NPI number
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-200" />
                </div>

                <ol className="space-y-3 mb-5">
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span>Go to the NPPES NPI Registry use the button below</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span>Enter your first and last name</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span>Click Search</span>
                  </li>
                </ol>

                <div className="mb-4">
                  <a
                    href="https://npiregistry.cms.hhs.gov/search"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
                  >
                    <span>Find my NPI</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                  </a>
                </div>

                <p className="text-xs text-gray-600 mb-4">
                  If you don't have an NPI,{" "}
                  <a
                    href="https://nppes.cms.hhs.gov/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium text-gray-900 hover:text-[#2196F3]"
                  >
                    apply
                  </a>{" "}
                  for one now
                </p>

                <div className="pt-3.5 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Need help?</p>
                    <p className="text-xs text-gray-500">Book with your dedicated consultant</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConsultantModal(true)}
                    className="p-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-sm"
                    title="Book with your dedicated consultant"
                  >
                    <Phone className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Taxonomy Code <span className="text-red-500">*</span>
            </label>
            {specialty === "doctor" ? (
              <input
                type="text"
                value={taxonomyCode}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 text-sm"
                placeholder="Auto-filled when specialization is selected"
              />
            ) : (
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
              >
                <option value="">Select taxonomy code</option>
                {taxonomyCodes[specialty as keyof typeof taxonomyCodes]?.map((taxonomy) => (
                  <option key={taxonomy.code} value={taxonomy.code}>
                    {taxonomy.code} - {taxonomy.description}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Service Type <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {serviceOptions[specialty as keyof typeof serviceOptions]?.map((option) => (
                <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="serviceType"
                    value={option.value}
                    checked={selectedService === option.value}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="mr-3 w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
                  />
                  <span className="text-sm text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              If you don't have an NPI, you can register for an NPI{" "}
              <a href="https://nppes.cms.hhs.gov" target="_blank" rel="noopener noreferrer" className="text-[#2196F3] hover:underline">
                here
              </a>
            </p>
          </div>

          {/* Do you want to auto fetch? yes / no (if yes > then CAQH) */}
          <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Do you want to auto fetch? <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mt-0.5">
                If yes &gt; then CAQH will be used to auto-populate your provider details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label
                className={`flex items-start p-3.5 border rounded-xl cursor-pointer transition-all ${
                  autoFetch === "yes"
                    ? "border-[#2196F3] bg-blue-50/50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="autoFetch"
                  value="yes"
                  checked={autoFetch === "yes"}
                  onChange={() => setAutoFetch("yes")}
                  className="mt-0.5 mr-3 w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-gray-900">Yes, auto-fetch details</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Recommended — retrieve information from your CAQH ProView account
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start p-3.5 border rounded-xl cursor-pointer transition-all ${
                  autoFetch === "no"
                    ? "border-[#2196F3] bg-blue-50/50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="autoFetch"
                  value="no"
                  checked={autoFetch === "no"}
                  onChange={() => setAutoFetch("no")}
                  className="mt-0.5 mr-3 w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">No, enter manually</span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Provide all provider information manually in subsequent sections
                  </p>
                </div>
              </label>
            </div>
          </div>
        </>
      )}

      {/* Consultant Modal */}
      {showConsultantModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2196F3] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Dedicated Consultant Support</h3>
                <p className="text-xs text-gray-500">MantraComply Credentialing Team</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Need assistance finding your NPI or setting up your NPPES registry profile? Our dedicated credentialing team is available Monday through Friday, 8am – 6pm EST.
            </p>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1.5 mb-5">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Direct Phone:</span>
                <span className="font-semibold text-gray-900">+1 (800) 555-6268</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="font-semibold text-[#2196F3]">support@mantracomply.com</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowConsultantModal(false)}
              className="w-full py-2.5 bg-[#2196F3] hover:bg-[#1976D2] text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
            >
              Got it, close
            </button>
          </div>
        </div>
      )}

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}