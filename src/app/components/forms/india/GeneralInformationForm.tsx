import { useState, useRef, useEffect } from "react";
import {
  Building2,
  MapPin,
  FileText,
  ShieldCheck,
  Award,
  Phone,
  ChevronDown,
  Pencil,
  Search,
} from "lucide-react";
import { IndiaFormButtons } from "./IndiaFormButtons";
import { SpecialityModal } from "./SpecialityModal";
import {
  INDIA_STATES,
  LICENSING_LAWS,
  OWNERSHIP_TYPES,
  NABH_ACCREDITATION_TYPES,
  ASPIRATIONAL_DISTRICTS,
  type AspirationalDistrict,
} from "../../../config/indiaGicConfig";

interface GeneralInformationFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
}

export function GeneralInformationForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = true,
}: GeneralInformationFormProps) {
  // Speciality
  const [speciality, setSpeciality] = useState(initialData?.speciality || "Multi Speciality");
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);

  // Profile & Classification
  const [hospitalName, setHospitalName] = useState(initialData?.hospitalName || "");
  const [providerCategory, setProviderCategory] = useState<"Hospital" | "Day Care" | "">(
    initialData?.providerCategory || ""
  );
  const [providerStream, setProviderStream] = useState<
    "Allopathy" | "Ayush" | "Allopathy and Ayush" | ""
  >(initialData?.providerStream || "");
  const [natureOfOwnership, setNatureOfOwnership] = useState(initialData?.natureOfOwnership || "");

  // Address & Location
  const [address1, setAddress1] = useState(initialData?.address1 || "");
  const [address2, setAddress2] = useState(initialData?.address2 || "");
  const [address3, setAddress3] = useState(initialData?.address3 || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [state, setState] = useState(initialData?.state || "");
  const [pincode, setPincode] = useState(initialData?.pincode || "");
  const [latitude, setLatitude] = useState(initialData?.latitude || "");
  const [longitude, setLongitude] = useState(initialData?.longitude || "");

  // Aspirational District
  const [inAspirationalDistrict, setInAspirationalDistrict] = useState<"Yes" | "No" | "">(
    initialData?.inAspirationalDistrict || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState<AspirationalDistrict | null>(
    initialData?.selectedDistrict || null
  );
  const [districtSearch, setDistrictSearch] = useState("");
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const districtDropdownRef = useRef<HTMLDivElement>(null);

  // Licensing & Registrations
  const [panNumber, setPanNumber] = useState(initialData?.panNumber || "");
  const [regnNumber, setRegnNumber] = useState(initialData?.regnNumber || "");
  const [licensingLaw, setLicensingLaw] = useState(initialData?.licensingLaw || "");
  const [otherLicensingLaw, setOtherLicensingLaw] = useState(initialData?.otherLicensingLaw || "");
  const [authorityAgency, setAuthorityAgency] = useState(initialData?.authorityAgency || "");
  const [registeredWithHfr, setRegisteredWithHfr] = useState<"Yes" | "No" | "">(
    initialData?.registeredWithHfr || ""
  );
  const [hfrNumber, setHfrNumber] = useState(initialData?.hfrNumber || "");

  // Statutory Compliances
  const [pharmacy, setPharmacy] = useState<"Yes" | "No" | "Not Applicable" | "">(
    initialData?.pharmacy || ""
  );
  const [fireNoc, setFireNoc] = useState<"Yes" | "No" | "">(initialData?.fireNoc || "");
  const [stateCertificate, setStateCertificate] = useState<"Yes" | "No" | "">(
    initialData?.stateCertificate || ""
  );
  const [pollutionControl, setPollutionControl] = useState<"Yes" | "No" | "">(
    initialData?.pollutionControl || ""
  );
  const [bmwManagement, setBmwManagement] = useState<"Yes" | "No" | "">(
    initialData?.bmwManagement || ""
  );
  const [govCompliance, setGovCompliance] = useState<"Yes" | "No" | "">(
    initialData?.govCompliance || ""
  );

  // Accreditations & Services
  const [nabhAccreditation, setNabhAccreditation] = useState<"Yes" | "No" | "">(
    initialData?.nabhAccreditation || ""
  );
  const [nabhType, setNabhType] = useState(initialData?.nabhType || "");
  const [jciAccreditation, setJciAccreditation] = useState<"Yes" | "No" | "">(
    initialData?.jciAccreditation || ""
  );
  const [dailyMedicalRecords, setDailyMedicalRecords] = useState<"Yes" | "No" | "">(
    initialData?.dailyMedicalRecords || ""
  );
  const [cashlessHelpdesk, setCashlessHelpdesk] = useState<"Yes" | "No" | "">(
    initialData?.cashlessHelpdesk || ""
  );

  // Contact Info
  const [contactName, setContactName] = useState(initialData?.contactName || "");
  const [contactNumber, setContactNumber] = useState(initialData?.contactNumber || "");
  const [contactEmail, setContactEmail] = useState(initialData?.contactEmail || "");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        districtDropdownRef.current &&
        !districtDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDistrictDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDistricts = ASPIRATIONAL_DISTRICTS.filter((d) =>
    `${d.district} ${d.state}`.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Required radio/toggle validations
    if (!providerCategory) {
      alert("Please select the Provider Category.");
      return;
    }
    if (!providerStream) {
      alert("Please select the Provider Stream.");
      return;
    }
    if (!natureOfOwnership) {
      alert("Please select the Nature of Ownership.");
      return;
    }
    if (!inAspirationalDistrict) {
      alert("Please indicate if the facility is in an Aspirational District.");
      return;
    }
    if (inAspirationalDistrict === "Yes" && !selectedDistrict) {
      alert("Please select the Aspirational District from the dropdown.");
      return;
    }
    if (licensingLaw === "Others" && !otherLicensingLaw.trim()) {
      alert("Please state the law under which your Hospital/Daycare Centre is Licensed.");
      return;
    }
    if (!registeredWithHfr) {
      alert("Please indicate if the facility is registered with HFR.");
      return;
    }
    if (registeredWithHfr === "Yes" && !hfrNumber.trim()) {
      alert("Please provide the HFR National Identification Number.");
      return;
    }
    if (!pharmacy) {
      alert("Please specify the Pharmacy compliance status.");
      return;
    }
    if (!fireNoc) {
      alert("Please specify Fire NOC compliance.");
      return;
    }
    if (!stateCertificate) {
      alert("Please specify State level certificate compliance.");
      return;
    }
    if (!pollutionControl) {
      alert("Please specify Pollution Control compliance.");
      return;
    }
    if (!bmwManagement) {
      alert("Please specify BMW management compliance.");
      return;
    }
    if (!govCompliance) {
      alert("Please specify compliance with Government circulars and orders.");
      return;
    }
    if (!nabhAccreditation) {
      alert("Please specify NABH accreditation status.");
      return;
    }
    if (nabhAccreditation === "Yes" && !nabhType) {
      alert("Please select the NABH Accreditation Type.");
      return;
    }
    if (!jciAccreditation) {
      alert("Please specify JCI accreditation status.");
      return;
    }
    if (!dailyMedicalRecords) {
      alert("Please specify whether daily medical records are maintained.");
      return;
    }
    if (!cashlessHelpdesk) {
      alert("Please specify whether the hospital has a Cashless Helpdesk.");
      return;
    }

    onNext({
      speciality,
      hospitalName,
      address1,
      address2,
      address3,
      city,
      inAspirationalDistrict,
      selectedDistrict,
      state,
      pincode,
      panNumber,
      regnNumber,
      licensingLaw,
      otherLicensingLaw,
      authorityAgency,
      registeredWithHfr,
      hfrNumber,
      providerCategory,
      providerStream,
      natureOfOwnership,
      pharmacy,
      fireNoc,
      stateCertificate,
      pollutionControl,
      bmwManagement,
      govCompliance,
      nabhAccreditation,
      nabhType,
      jciAccreditation,
      dailyMedicalRecords,
      cashlessHelpdesk,
      contactName,
      contactNumber,
      contactEmail,
      latitude,
      longitude,
    });
  };

  const inputClass =
    "w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3]/20 focus:border-[#2196F3] outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-all shadow-2xs";
  const labelClass = "block text-sm font-medium text-gray-800 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. Facility Profile & Speciality */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] border border-blue-100 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-[#2196F3]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Hospital Profile & Speciality</h3>
            <p className="text-xs text-gray-500">
              Basic facility details, hospital categorization, and ownership structure
            </p>
          </div>
        </div>

        {/* Speciality Badge Card */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/40 border border-blue-200/70 rounded-2xl">
          <div>
            <div className="text-[11px] font-bold text-[#1976D2] tracking-wider uppercase">
              Hospital / Daycare Centre Speciality
            </div>
            <div className="text-base font-bold text-gray-900 mt-0.5">{speciality}</div>
          </div>
          <button
            type="button"
            onClick={() => setIsSpecModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-2xs"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
            Edit Speciality
          </button>
        </div>

        <SpecialityModal
          isOpen={isSpecModalOpen}
          onClose={() => setIsSpecModalOpen(false)}
          currentSpeciality={speciality}
          onSave={(newSpec) => setSpeciality(newSpec)}
        />

        {/* Hospital Name */}
        <div>
          <label className={labelClass}>
            Hospital/Daycare Centre Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Enter Hospital / Daycare Centre Name"
            className={inputClass}
          />
        </div>

        {/* Provider Category & Provider Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Provider Category */}
          <div>
            <label className={labelClass}>
              Provider Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 mt-1.5">
              {(["Hospital", "Day Care"] as const).map((cat) => {
                const isSelected = providerCategory === cat;
                return (
                  <div
                    key={cat}
                    onClick={() => setProviderCategory(cat)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#2196F3] bg-blue-50/50 text-gray-900 shadow-2xs"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "border-[#2196F3] bg-[#2196F3]" : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-semibold">{cat}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Provider Stream */}
          <div>
            <label className={labelClass}>
              Provider Stream <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {(["Allopathy", "Ayush", "Allopathy and Ayush"] as const).map((stream) => {
                const isSelected = providerStream === stream;
                return (
                  <div
                    key={stream}
                    onClick={() => setProviderStream(stream)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer text-center justify-center ${
                      isSelected
                        ? "border-[#2196F3] bg-blue-50/50 text-gray-900 shadow-2xs font-medium"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                  >
                    <span className="text-xs leading-tight">{stream}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Nature of Ownership */}
        <div className="pt-2">
          <label className={labelClass}>
            Nature of Ownership of the Hospital <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-1.5">
            {OWNERSHIP_TYPES.map((type) => {
              const isSelected = natureOfOwnership === type;
              return (
                <div
                  key={type}
                  onClick={() => setNatureOfOwnership(type)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#2196F3] bg-blue-50/50 text-gray-900 shadow-2xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? "border-[#2196F3] bg-[#2196F3]" : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs sm:text-sm font-medium leading-snug">{type}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. Hospital Location & Geographic Coordinates */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] border border-blue-100 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#2196F3]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Hospital Location & Address</h3>
            <p className="text-xs text-gray-500">
              Registered physical address, district classification, and GPS coordinates
            </p>
          </div>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Address 1: Door/Block Number and building name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="e.g. Plot No. 12, Tower A"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Address 2: Street Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="e.g. Ring Road, Sector 5"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Address 3: Location / Landmark</label>
            <input
              type="text"
              value={address3}
              onChange={(e) => setAddress3(e.target.value)}
              placeholder="e.g. Near Central Park"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              State <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={inputClass}
            >
              <option value="">Select State</option>
              {INDIA_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
              placeholder="6-digit pincode"
              className={inputClass}
            />
          </div>
        </div>

        {/* Aspirational District Card */}
        <div className="p-4 bg-gray-50/70 border border-gray-200/80 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Is the Hospital situated in an Aspirational District?{" "}
                <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Check whether your district is part of NITI Aayog's Aspirational Districts
                initiative.
              </p>
            </div>

            <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setInAspirationalDistrict(opt);
                    if (opt === "No") setSelectedDistrict(null);
                  }}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    inAspirationalDistrict === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Searchable Dropdown */}
          {inAspirationalDistrict === "Yes" && (
            <div ref={districtDropdownRef} className="relative pt-2">
              <label className={labelClass}>
                Select Aspirational District <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white flex items-center justify-between cursor-pointer hover:border-gray-400 text-sm transition-all shadow-2xs"
              >
                <span
                  className={selectedDistrict ? "text-gray-900 font-medium" : "text-gray-400"}
                >
                  {selectedDistrict
                    ? `${selectedDistrict.district}, ${selectedDistrict.state}`
                    : "Search and select district"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              {isDistrictDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-20 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-64 overflow-auto p-2 animate-in fade-in zoom-in-95 duration-100">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search district or state..."
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:border-[#2196F3]"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-1">
                    {filteredDistricts.map((item) => (
                      <div
                        key={item.district}
                        onClick={() => {
                          setSelectedDistrict(item);
                          setIsDistrictDropdownOpen(false);
                        }}
                        className="p-2 hover:bg-blue-50/80 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-bold text-gray-900">{item.district}</div>
                        <div className="text-[11px] text-gray-500">{item.state}</div>
                      </div>
                    ))}
                    {filteredDistricts.length === 0 && (
                      <div className="p-3 text-xs text-gray-400 text-center">
                        No districts found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* GPS Coordinates */}
        <div>
          <label className={labelClass}>
            Hospital GPS Coordinates <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                required
                placeholder="Latitude (e.g. 28.338774)"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <input
                type="text"
                required
                placeholder="Longitude (e.g. 77.320560)"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. Licensing & Statutory Registrations */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] border border-blue-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#2196F3]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Licensing & Statutory Registrations
            </h3>
            <p className="text-xs text-gray-500">
              PAN, official state registration, licensing statutes, and HFR credentials
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Hospital/Daycare Centre PAN Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={10}
              placeholder="e.g. AAACP1234F"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Hospital/Daycare center REGN number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Registration Number"
              value={regnNumber}
              onChange={(e) => setRegnNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Licensing Law */}
        <div>
          <label className={labelClass}>
            Mention the relevant law under which your Hospital/Daycare Centre is Licensed{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={licensingLaw}
            onChange={(e) => setLicensingLaw(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose relevant law</option>
            {LICENSING_LAWS.map((law) => (
              <option key={law} value={law}>
                {law}
              </option>
            ))}
          </select>
        </div>

        {licensingLaw === "Others" && (
          <div className="animate-in fade-in duration-200">
            <label className={labelClass}>
              If 'Others', please state the relevant licensing law{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={otherLicensingLaw}
              onChange={(e) => setOtherLicensingLaw(e.target.value)}
              placeholder="State the applicable law or registration act"
              className={inputClass}
            />
          </div>
        )}

        {/* Authority / Agency */}
        <div>
          <label className={labelClass}>
            Please state the Authority/Agency with whom the Hospital is registered as required
            under law <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={authorityAgency}
            onChange={(e) => setAuthorityAgency(e.target.value)}
            placeholder="e.g. Directorate of Health Services / Municipal Corporation"
            className={inputClass}
          />
        </div>

        {/* HFR Registration */}
        <div className="p-4 bg-gray-50/70 border border-gray-200/80 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Is your Hospital registered with the National Health Facility Registry (HFR)?{" "}
                <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Ayushman Bharat Digital Mission (ABDM) registry identification
              </p>
            </div>

            <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setRegisteredWithHfr(opt);
                    if (opt === "No") setHfrNumber("");
                  }}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    registeredWithHfr === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {registeredWithHfr === "Yes" && (
            <div className="pt-2 animate-in fade-in duration-200">
              <label className={labelClass}>
                HFR National Identification Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={hfrNumber}
                onChange={(e) => setHfrNumber(e.target.value)}
                placeholder="Enter HFR ID (e.g. IN12345678)"
                className={inputClass}
              />
            </div>
          )}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. Statutory Compliances & Environmental Clearances */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] border border-blue-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#2196F3]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Statutory Compliances & Clearances
            </h3>
            <p className="text-xs text-gray-500">
              Confirm valid statutory certifications, environmental clearances, and legal
              compliances
            </p>
          </div>
        </div>

        {/* Structured Compliance Rows */}
        <div className="border border-gray-200/90 rounded-2xl divide-y divide-gray-100 overflow-hidden bg-white shadow-2xs">
          {/* Pharmacy */}
          <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                In-house Pharmacy <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">Licensed pharmacy facility within premises</p>
            </div>
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No", "Not Applicable"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPharmacy(opt)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pharmacy === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Fire NOC */}
          <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Fire NOC (No Objection Certificate) <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">
                Current fire safety clearance from competent authority
              </p>
            </div>
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFireNoc(opt)}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    fireNoc === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* State level certificate */}
          <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                State Level Certificate <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">
                State health department authorization / clinical establishment certificate
              </p>
            </div>
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setStateCertificate(opt)}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    stateCertificate === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Pollution Control */}
          <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Pollution Control Consent <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">
                Consent to operate from State Pollution Control Board
              </p>
            </div>
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPollutionControl(opt)}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    pollutionControl === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* BMW management */}
          <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Biomedical Waste (BMW) Management <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">
                Valid authorization and tie-up for biomedical waste disposal
              </p>
            </div>
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBmwManagement(opt)}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    bmwManagement === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Government Compliance */}
          <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Government Circulars & Legal Compliances <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">
                Full compliance with all obligations laid down by Government circulars & orders
              </p>
            </div>
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setGovCompliance(opt)}
                  className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    govCompliance === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 5. Quality Accreditations & Hospital Services */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] border border-blue-100 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-[#2196F3]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Accreditations & Quality Services
            </h3>
            <p className="text-xs text-gray-500">
              NABH/JCI accreditation status, patient medical records, and cashless helpdesk facility
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NABH Accreditation Card */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  NABH Accreditation <span className="text-red-500">*</span>
                </div>
                <p className="text-xs text-gray-500">Accredited by NABH</p>
              </div>
              <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 shrink-0">
                {(["Yes", "No"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setNabhAccreditation(opt);
                      if (opt === "No") setNabhType("");
                    }}
                    className={`px-4 py-1 rounded-lg text-xs font-semibold transition-all ${
                      nabhAccreditation === opt
                        ? "bg-[#2196F3] text-white shadow-2xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {nabhAccreditation === "Yes" && (
              <div className="pt-1 animate-in fade-in duration-150">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  NABH Accreditation Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={nabhType}
                  onChange={(e) => setNabhType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium outline-none focus:border-[#2196F3]"
                >
                  <option value="">Select NABH Accreditation Type</option>
                  {NABH_ACCREDITATION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* JCI Accreditation */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/40 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                JCI Accreditation <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">Joint Commission International</p>
            </div>
            <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setJciAccreditation(opt)}
                  className={`px-4 py-1 rounded-lg text-xs font-semibold transition-all ${
                    jciAccreditation === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Medical Records */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/40 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Daily Medical Records <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">Maintenance of daily medical records</p>
            </div>
            <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDailyMedicalRecords(opt)}
                  className={`px-4 py-1 rounded-lg text-xs font-semibold transition-all ${
                    dailyMedicalRecords === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Cashless Helpdesk */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/40 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Cashless Helpdesk <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500">Dedicated desk for cashless claims</p>
            </div>
            <div className="inline-flex p-1 bg-white rounded-xl border border-gray-200 shrink-0">
              {(["Yes", "No"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCashlessHelpdesk(opt)}
                  className={`px-4 py-1 rounded-lg text-xs font-semibold transition-all ${
                    cashlessHelpdesk === opt
                      ? "bg-[#2196F3] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6. Hospital Contact Person */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] border border-blue-100 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-[#2196F3]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Hospital Contact Person</h3>
            <p className="text-xs text-gray-500">
              Designated nodal officer or liaison for empanelment communications
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Hospital/Daycare Centre Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Full name of contact person"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Hospital/Daycare Centre Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Hospital/Daycare Centre Email ID (Contact Email) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="e.g. contact@hospital.org"
            className={inputClass}
          />
        </div>
      </div>

      {/* Buttons */}
      <IndiaFormButtons onBack={onBack} isFirstStep={isFirstStep} submitText="Save and Continue" />
    </form>
  );
}
