import { useState } from "react";
import { IndiaFormButtons } from "./IndiaFormButtons";

interface StaffQualityFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
}

export function StaffQualityForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = false,
}: StaffQualityFormProps) {
  // Full Time Doctors
  const [superSpecialists, setSuperSpecialists] = useState(initialData?.superSpecialists ?? 0);
  const [specialists, setSpecialists] = useState(initialData?.specialists ?? 0);
  const [mbbs, setMbbs] = useState(initialData?.mbbs ?? 0);
  const [alternateMedicineDrs, setAlternateMedicineDrs] = useState(
    initialData?.alternateMedicineDrs ?? 0
  );

  // Nurses
  const [registeredNurses, setRegisteredNurses] = useState(initialData?.registeredNurses ?? 0);

  // Round the Clock
  const [anaesthetistRtc, setAnaesthetistRtc] = useState(initialData?.anaesthetistRtc ?? 0);
  const [surgeonRtc, setSurgeonRtc] = useState(initialData?.surgeonRtc ?? 0);
  const [orthopaedicianRtc, setOrthopaedicianRtc] = useState(initialData?.orthopaedicianRtc ?? 0);
  const [obgyRtc, setObgyRtc] = useState(initialData?.obgyRtc ?? 0);
  const [medicalPractitionersRtc, setMedicalPractitionersRtc] = useState(
    initialData?.medicalPractitionersRtc ?? 0
  );
  const [nursingStaffRtc, setNursingStaffRtc] = useState(initialData?.nursingStaffRtc ?? 0);

  // Trained Technicians
  const [otTech, setOtTech] = useState(initialData?.otTech ?? 0);
  const [radiologyTech, setRadiologyTech] = useState(initialData?.radiologyTech ?? 0);
  const [pathologyTech, setPathologyTech] = useState(initialData?.pathologyTech ?? 0);
  const [emergencyMedicineTech, setEmergencyMedicineTech] = useState(
    initialData?.emergencyMedicineTech ?? 0
  );
  const [audiologyTech, setAudiologyTech] = useState(initialData?.audiologyTech ?? 0);
  const [ancillaryServicesTech, setAncillaryServicesTech] = useState(
    initialData?.ancillaryServicesTech ?? 0
  );

  // Qualified Resources
  const [qualifiedPharmacists, setQualifiedPharmacists] = useState(
    initialData?.qualifiedPharmacists ?? 0
  );
  const [qualifiedParamedicalStaff, setQualifiedParamedicalStaff] = useState(
    initialData?.qualifiedParamedicalStaff ?? 0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      superSpecialists,
      specialists,
      mbbs,
      alternateMedicineDrs,
      registeredNurses,
      anaesthetistRtc,
      surgeonRtc,
      orthopaedicianRtc,
      obgyRtc,
      medicalPractitionersRtc,
      nursingStaffRtc,
      otTech,
      radiologyTech,
      pathologyTech,
      emergencyMedicineTech,
      audiologyTech,
      ancillaryServicesTech,
      qualifiedPharmacists,
      qualifiedParamedicalStaff,
    });
  };

  const inputClass =
    "w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm transition-all bg-white";
  const labelClass = "block text-sm font-medium text-gray-900 mb-1.5";
  const sectionTitleClass = "text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-3";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Time Doctors */}
      <div>
        <h4 className={sectionTitleClass}>
          Full Time Doctors on the Rolls of the Hospital/Daycare Centre
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>
              Super Specialists <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={superSpecialists}
              onChange={(e) => setSuperSpecialists(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Specialists <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={specialists}
              onChange={(e) => setSpecialists(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              MBBS <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={mbbs}
              onChange={(e) => setMbbs(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Alternate Medicine Drs <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={alternateMedicineDrs}
              onChange={(e) => setAlternateMedicineDrs(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Nurses */}
      <div>
        <h4 className={sectionTitleClass}>Nurses</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Registered Nurses <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={registeredNurses}
              onChange={(e) => setRegisteredNurses(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Round the Clock */}
      <div>
        <h4 className={sectionTitleClass}>Round the Clock</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Anaesthetist <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={anaesthetistRtc}
              onChange={(e) => setAnaesthetistRtc(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Surgeon <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={surgeonRtc}
              onChange={(e) => setSurgeonRtc(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Orthopaedician <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={orthopaedicianRtc}
              onChange={(e) => setOrthopaedicianRtc(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              OBGY <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={obgyRtc}
              onChange={(e) => setObgyRtc(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Qualified Medical Practitioners <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={medicalPractitionersRtc}
              onChange={(e) => setMedicalPractitionersRtc(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Qualified Nursing Staff <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={nursingStaffRtc}
              onChange={(e) => setNursingStaffRtc(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Trained Technicians */}
      <div>
        <h4 className={sectionTitleClass}>Trained Technicians</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              OT <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={otTech}
              onChange={(e) => setOtTech(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Radiology <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={radiologyTech}
              onChange={(e) => setRadiologyTech(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Pathology <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={pathologyTech}
              onChange={(e) => setPathologyTech(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Emergency Medicine <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={emergencyMedicineTech}
              onChange={(e) => setEmergencyMedicineTech(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Audiology <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={audiologyTech}
              onChange={(e) => setAudiologyTech(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Ancillary Services <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={ancillaryServicesTech}
              onChange={(e) => setAncillaryServicesTech(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Qualified Resources */}
      <div>
        <h4 className={sectionTitleClass}>Qualified Resources</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Qualified Pharmacist(s) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={qualifiedPharmacists}
              onChange={(e) => setQualifiedPharmacists(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Qualified Paramedical Staff <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={qualifiedParamedicalStaff}
              onChange={(e) => setQualifiedParamedicalStaff(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <IndiaFormButtons onBack={onBack} isFirstStep={isFirstStep} submitText="Save" />
    </form>
  );
}
