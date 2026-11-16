import { useState, useRef, useEffect } from "react";
import { ChevronDown, ExternalLink, Pencil } from "lucide-react";
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
  const [speciality, setSpeciality] = useState(initialData?.speciality || "Multi Speciality");
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);

  const [hospitalName, setHospitalName] = useState(initialData?.hospitalName || "");
  const [address1, setAddress1] = useState(initialData?.address1 || "");
  const [address2, setAddress2] = useState(initialData?.address2 || "");
  const [address3, setAddress3] = useState(initialData?.address3 || "");
  const [city, setCity] = useState(initialData?.city || "");

  const [inAspirationalDistrict, setInAspirationalDistrict] = useState<"Yes" | "No" | "">(
    initialData?.inAspirationalDistrict || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState<AspirationalDistrict | null>(
    initialData?.selectedDistrict || null
  );
  const [districtSearch, setDistrictSearch] = useState("");
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const districtDropdownRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(initialData?.state || "");
  const [pincode, setPincode] = useState(initialData?.pincode || "");
  const [panNumber, setPanNumber] = useState(initialData?.panNumber || "");
  const [regnNumber, setRegnNumber] = useState(initialData?.regnNumber || "");

  const [licensingLaw, setLicensingLaw] = useState(initialData?.licensingLaw || "");
  const [otherLicensingLaw, setOtherLicensingLaw] = useState(initialData?.otherLicensingLaw || "");
  const [authorityAgency, setAuthorityAgency] = useState(initialData?.authorityAgency || "");

  const [registeredWithHfr, setRegisteredWithHfr] = useState<"Yes" | "No" | "">(
    initialData?.registeredWithHfr || ""
  );
  const [hfrNumber, setHfrNumber] = useState(initialData?.hfrNumber || "");

  const [providerCategory, setProviderCategory] = useState<"Hospital" | "Day Care" | "">(
    initialData?.providerCategory || ""
  );
  const [providerStream, setProviderStream] = useState<
    "Allopathy" | "Ayush" | "Allopathy and Ayush" | ""
  >(initialData?.providerStream || "");
  const [natureOfOwnership, setNatureOfOwnership] = useState(initialData?.natureOfOwnership || "");

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

  const [contactName, setContactName] = useState(initialData?.contactName || "");
  const [contactNumber, setContactNumber] = useState(initialData?.contactNumber || "");
  const [contactEmail, setContactEmail] = useState(initialData?.contactEmail || "");
  const [latitude, setLatitude] = useState(initialData?.latitude || "");
  const [longitude, setLongitude] = useState(initialData?.longitude || "");

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

    // Validate conditional fields
    if (inAspirationalDistrict === "Yes" && !selectedDistrict) {
      alert("Please select the Aspirational District.");
      return;
    }
    if (licensingLaw === "Others" && !otherLicensingLaw.trim()) {
      alert("Please state the law under which your Hospital/Daycare Centre is Licensed.");
      return;
    }
    if (registeredWithHfr === "Yes" && !hfrNumber.trim()) {
      alert("Please provide the HFR National Identification Number.");
      return;
    }
    if (nabhAccreditation === "Yes" && !nabhType) {
      alert("Please select the NABH Accreditation Type.");
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
    "w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm transition-all bg-white";
  const labelClass = "block text-sm font-medium text-gray-900 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Speciality Card with Edit Modal */}
      <div className="flex items-center justify-between p-4 bg-[#E3F2FD]/50 border border-[#90CAF9] rounded-xl">
        <div>
          <div className="text-[11px] font-semibold text-[#1976D2] tracking-wider uppercase">
            HOSPITAL/DAYCARE CENTRE SPECIALITY
          </div>
          <div className="text-base font-semibold text-gray-900 mt-0.5">{speciality}</div>
        </div>
        <button
          type="button"
          onClick={() => setIsSpecModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-xs"
        >
          <Pencil className="w-3.5 h-3.5 text-gray-500" />
          Edit
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
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Address 3: Location</label>
          <input
            type="text"
            value={address3}
            onChange={(e) => setAddress3(e.target.value)}
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
            className={inputClass}
          />
        </div>
      </div>

      {/* Aspirational District Radio + Conditional Searchable Dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Is the Hospital/Daycare Centre situated in any of the{" "}
            <a
              href="#annexure"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Aspirational Districts list based on NITI Aayog Annexure. Sample entries available."
                );
              }}
              className="text-[#2196F3] underline hover:text-[#1976D2]"
            >
              Aspirational Districts listed in Annexure
            </a>{" "}
            ? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all ${
                  inAspirationalDistrict === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="inAspirationalDistrict"
                  value={opt}
                  required
                  checked={inAspirationalDistrict === opt}
                  onChange={() => setInAspirationalDistrict(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {inAspirationalDistrict === "Yes" && (
          <div ref={districtDropdownRef} className="relative">
            <label className={labelClass}>
              If Yes, which District? <span className="text-red-500">*</span>
            </label>
            <div
              onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white flex items-center justify-between cursor-pointer hover:border-gray-400 text-sm"
            >
              <span className={selectedDistrict ? "text-gray-900 font-medium" : "text-gray-400"}>
                {selectedDistrict
                  ? `${selectedDistrict.district}, ${selectedDistrict.state}`
                  : "Search and select aspirational district"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {isDistrictDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 z-20 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto p-2">
                <input
                  type="text"
                  placeholder="Search districts..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs mb-2 outline-none focus:border-[#2196F3]"
                />
                <div className="space-y-1">
                  {filteredDistricts.map((item) => (
                    <div
                      key={item.district}
                      onClick={() => {
                        setSelectedDistrict(item);
                        setIsDistrictDropdownOpen(false);
                      }}
                      className="p-2 hover:bg-blue-50 rounded-lg cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-gray-900">{item.district}</div>
                      <div className="text-xs text-gray-500">{item.state}</div>
                    </div>
                  ))}
                  {filteredDistricts.length === 0 && (
                    <div className="p-2 text-xs text-gray-400 text-center">No districts found</div>
                  )}
                  {/* Marked TODO for full Annexure */}
                  <div className="pt-2 mt-1 border-t border-gray-100 text-[11px] text-gray-400 italic px-2">
                    (Full Annexure list not available: sample entries only - TODO: load complete list)
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* State, Pincode, PAN, REGN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Hospital/Daycare Centre PAN Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
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
            value={regnNumber}
            onChange={(e) => setRegnNumber(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Licensing Law & Conditional Others */}
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
        <div>
          <label className={labelClass}>
            If the answer to the previous question is 'Others', please state the law under which
            your Hospital/Daycare Centre is Licensed <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={otherLicensingLaw}
            onChange={(e) => setOtherLicensingLaw(e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      {/* Authority / Agency */}
      <div>
        <label className={labelClass}>
          Please state the Authority/Agency with whom the Hospital is registered as required under
          law <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={authorityAgency}
          onChange={(e) => setAuthorityAgency(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* HFR Registration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Is your Hospital/Daycare Centre Registered with the National Health Facility Registry
            (HFR) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all ${
                  registeredWithHfr === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="registeredWithHfr"
                  value={opt}
                  required
                  checked={registeredWithHfr === opt}
                  onChange={() => setRegisteredWithHfr(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {registeredWithHfr === "Yes" && (
          <div>
            <label className={labelClass}>
              If Registered with HFR, please provide National Identification Number{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={hfrNumber}
              onChange={(e) => setHfrNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        )}
      </div>

      {/* Provider Category & Provider Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Provider Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Hospital", "Day Care"] as const).map((cat) => (
              <label
                key={cat}
                className={`flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all ${
                  providerCategory === cat
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="providerCategory"
                  value={cat}
                  required
                  checked={providerCategory === cat}
                  onChange={() => setProviderCategory(cat)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Provider Stream <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Allopathy", "Ayush", "Allopathy and Ayush"] as const).map((stream) => (
              <label
                key={stream}
                className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition-all text-center ${
                  providerStream === stream
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="providerStream"
                  value={stream}
                  required
                  checked={providerStream === stream}
                  onChange={() => setProviderStream(stream)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-xs font-medium text-gray-800">{stream}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Nature of Ownership of the Hospital */}
      <div>
        <label className={labelClass}>
          Nature of Ownership of the Hospital <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {OWNERSHIP_TYPES.map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all ${
                natureOfOwnership === type
                  ? "border-[#2196F3] bg-blue-50/40"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="natureOfOwnership"
                value={type}
                required
                checked={natureOfOwnership === type}
                onChange={() => setNatureOfOwnership(type)}
                className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-800">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Compliance / Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pharmacy */}
        <div>
          <label className={labelClass}>
            Pharmacy <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Yes", "No", "Not Applicable"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  pharmacy === opt ? "border-[#2196F3] bg-blue-50/40" : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="pharmacy"
                  value={opt}
                  required
                  checked={pharmacy === opt}
                  onChange={() => setPharmacy(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-xs font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fire NOC */}
        <div>
          <label className={labelClass}>
            Fire NOC <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  fireNoc === opt ? "border-[#2196F3] bg-blue-50/40" : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="fireNoc"
                  value={opt}
                  required
                  checked={fireNoc === opt}
                  onChange={() => setFireNoc(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* State level certificate */}
        <div>
          <label className={labelClass}>
            State level certificate <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  stateCertificate === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="stateCertificate"
                  value={opt}
                  required
                  checked={stateCertificate === opt}
                  onChange={() => setStateCertificate(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pollution Control */}
        <div>
          <label className={labelClass}>
            Pollution Control <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  pollutionControl === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="pollutionControl"
                  value={opt}
                  required
                  checked={pollutionControl === opt}
                  onChange={() => setPollutionControl(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* BMW management */}
        <div>
          <label className={labelClass}>
            BMW management <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  bmwManagement === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="bmwManagement"
                  value={opt}
                  required
                  checked={bmwManagement === opt}
                  onChange={() => setBmwManagement(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Legal obligations compliance */}
        <div>
          <label className={labelClass}>
            Compliance with all the obligations as laid down by the circulars, guidelines, orders of
            the Government and other legally required compliances <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  govCompliance === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="govCompliance"
                  value={opt}
                  required
                  checked={govCompliance === opt}
                  onChange={() => setGovCompliance(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* NABH Accreditation + Conditional Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            NABH Accreditation <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  nabhAccreditation === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="nabhAccreditation"
                  value={opt}
                  required
                  checked={nabhAccreditation === opt}
                  onChange={() => setNabhAccreditation(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {nabhAccreditation === "Yes" && (
          <div>
            <label className={labelClass}>
              If Yes, Type of NABH Accreditation <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={nabhType}
              onChange={(e) => setNabhType(e.target.value)}
              className={inputClass}
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

      {/* JCI, Daily Medical Records, Helpdesk */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>
            JCI Accreditation <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  jciAccreditation === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="jciAccreditation"
                  value={opt}
                  required
                  checked={jciAccreditation === opt}
                  onChange={() => setJciAccreditation(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Maintenance of daily medical records <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  dailyMedicalRecords === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="dailyMedicalRecords"
                  value={opt}
                  required
                  checked={dailyMedicalRecords === opt}
                  onChange={() => setDailyMedicalRecords(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Does the Hospital/Daycare Centre have a Helpdesk to facilitate Cashless access?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  cashlessHelpdesk === opt
                    ? "border-[#2196F3] bg-blue-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="cashlessHelpdesk"
                  value={opt}
                  required
                  checked={cashlessHelpdesk === opt}
                  onChange={() => setCashlessHelpdesk(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Hospital Contact Info */}
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
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Hospital/Daycare Centre Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Hospital/Daycare Centre Email id (Contact Email) <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Latitude & Longitude */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Latitude <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 28.338774"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Longitude <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 77.32056"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <IndiaFormButtons onBack={onBack} isFirstStep={isFirstStep} submitText="Save" />
    </form>
  );
}
