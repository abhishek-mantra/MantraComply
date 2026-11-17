import { useState } from "react";
import { IndiaFormButtons } from "./IndiaFormButtons";
import { SERVICE_AVAILABILITY_OPTIONS } from "../../../config/indiaGicConfig";

interface InfraDetailsFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
}

export function InfraDetailsForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = false,
}: InfraDetailsFormProps) {
  // Number of Beds
  const [bedsGeneralWards, setBedsGeneralWards] = useState(initialData?.bedsGeneralWards ?? "0");
  const [bedsSemiPrivate, setBedsSemiPrivate] = useState(initialData?.bedsSemiPrivate ?? "0");
  const [bedsPrivateRooms, setBedsPrivateRooms] = useState(initialData?.bedsPrivateRooms ?? "0");
  const [bedsSuites, setBedsSuites] = useState(initialData?.bedsSuites ?? "0");

  // Bed to Washroom Ratio
  const [washroomRatioSemiPrivate, setWashroomRatioSemiPrivate] = useState(
    initialData?.washroomRatioSemiPrivate || "4:1"
  );
  const [washroomRatioGeneral, setWashroomRatioGeneral] = useState(
    initialData?.washroomRatioGeneral || "4:1"
  );
  const [washroomRatioPrivate, setWashroomRatioPrivate] = useState(
    initialData?.washroomRatioPrivate || "1:1"
  );

  // Area per bed
  const [areaSemiPrivate, setAreaSemiPrivate] = useState(initialData?.areaSemiPrivate || "6.5");
  const [areaGeneral, setAreaGeneral] = useState(initialData?.areaGeneral || "6.0");
  const [areaPrivate, setAreaPrivate] = useState(initialData?.areaPrivate || "10.0");

  // Ratios & Years
  const [yearsOfEstablishment, setYearsOfEstablishment] = useState(
    initialData?.yearsOfEstablishment || ""
  );
  const [drBedRatio, setDrBedRatio] = useState(initialData?.drBedRatio || "1:4");
  const [nurseBedRatio, setNurseBedRatio] = useState(initialData?.nurseBedRatio || "4:1");

  // Intensive Care Beds
  const [icuBeds, setIcuBeds] = useState(initialData?.icuBeds ?? 0);
  const [iccuBeds, setIccuBeds] = useState(initialData?.iccuBeds ?? 0);
  const [nicuBeds, setNicuBeds] = useState(initialData?.nicuBeds ?? 0);
  const [picuBeds, setPicuBeds] = useState(initialData?.picuBeds ?? 0);
  const [isolationBeds, setIsolationBeds] = useState(initialData?.isolationBeds ?? 0);
  const [burnUnitBeds, setBurnUnitBeds] = useState(initialData?.burnUnitBeds ?? 0);
  const [hduBeds, setHduBeds] = useState(initialData?.hduBeds ?? 0);

  // Emergency Infrastructure
  const [ventilators, setVentilators] = useState(initialData?.ventilators ?? 0);
  const [defribillators, setDefribillators] = useState(initialData?.defribillators ?? 0);
  const [crashCarts, setCrashCarts] = useState<"Yes" | "No" | "">(initialData?.crashCarts || "Yes");
  const [pipedGas, setPipedGas] = useState<"Yes" | "No" | "">(initialData?.pipedGas || "Yes");
  const [fireSafety, setFireSafety] = useState<"Yes" | "No" | "">(initialData?.fireSafety || "Yes");

  // Services
  const [ambulanceServices, setAmbulanceServices] = useState(
    initialData?.ambulanceServices || ""
  );
  const [ambulanceServiceType, setAmbulanceServiceType] = useState(
    initialData?.ambulanceServiceType || ""
  );
  const [bloodBank, setBloodBank] = useState(initialData?.bloodBank || "");
  const [pharmacyService, setPharmacyService] = useState(initialData?.pharmacyService || "");

  // Operation Theatres
  const [modularOt, setModularOt] = useState(initialData?.modularOt ?? 0);
  const [majorOt, setMajorOt] = useState(initialData?.majorOt ?? 0);
  const [minorOt, setMinorOt] = useState(initialData?.minorOt ?? 0);
  const [laborRoom, setLaborRoom] = useState(initialData?.laborRoom ?? 0);
  const [cardiaThoracicOt, setCardiaThoracicOt] = useState(initialData?.cardiaThoracicOt ?? 0);
  const [dialysisUnit, setDialysisUnit] = useState(initialData?.dialysisUnit ?? 0);
  const [endoscope, setEndoscope] = useState(initialData?.endoscope ?? 0);
  const [roboticArm, setRoboticArm] = useState(initialData?.roboticArm ?? 0);
  const [cArm, setCArm] = useState(initialData?.cArm ?? 0);
  const [cathLab, setCathLab] = useState(initialData?.cathLab ?? 0);
  const [stepDownOt, setStepDownOt] = useState(initialData?.stepDownOt ?? 0);
  const [resuscitationEquipment, setResuscitationEquipment] = useState(
    initialData?.resuscitationEquipment ?? 0
  );
  const [lithotripsyEquipment, setLithotripsyEquipment] = useState(
    initialData?.lithotripsyEquipment ?? 0
  );

  // Mandatory Requirements
  const [legalStatutesCompliance, setLegalStatutesCompliance] = useState<"Yes" | "No" | "">(
    initialData?.legalStatutesCompliance || "Yes"
  );
  const [itTaxDeptRegistration, setItTaxDeptRegistration] = useState<"Yes" | "No" | "">(
    initialData?.itTaxDeptRegistration || "Yes"
  );
  const [uninterruptedElectricity, setUninterruptedElectricity] = useState<"Yes" | "No" | "">(
    initialData?.uninterruptedElectricity || "Yes"
  );
  const [safeDrinkingWater, setSafeDrinkingWater] = useState<"Yes" | "No" | "">(
    initialData?.safeDrinkingWater || "Yes"
  );
  const [liftRampFacility, setLiftRampFacility] = useState<"Yes" | "No" | "">(
    initialData?.liftRampFacility || "Yes"
  );
  const [legalRecordMaintenance, setLegalRecordMaintenance] = useState<"Yes" | "No" | "">(
    initialData?.legalRecordMaintenance || "Yes"
  );

  // Diagnostics
  const [biochemistry, setBiochemistry] = useState(initialData?.biochemistry || "");
  const [microbiology, setMicrobiology] = useState(initialData?.microbiology || "");
  const [immunoChemistry, setImmunoChemistry] = useState(initialData?.immunoChemistry || "");
  const [imaging, setImaging] = useState(initialData?.imaging || "");
  const [xrays, setXrays] = useState(initialData?.xrays || "");
  const [mri, setMri] = useState(initialData?.mri || "");
  const [usg, setUsg] = useState(initialData?.usg || "");
  const [pet, setPet] = useState(initialData?.pet || "");
  const [ct, setCt] = useState(initialData?.ct || "");
  const [echo, setEcho] = useState(initialData?.echo || "");

  // Other Services
  const [mortuaryServices, setMortuaryServices] = useState<"Yes" | "No" | "">(
    initialData?.mortuaryServices || "No"
  );
  const [cssd, setCssd] = useState<"Yes" | "No" | "">(initialData?.cssd || "Yes");
  const [displayHospitalCharges, setDisplayHospitalCharges] = useState<"Yes" | "No" | "">(
    initialData?.displayHospitalCharges || "Yes"
  );
  const [infectionRatesMonitoring, setInfectionRatesMonitoring] = useState<"Yes" | "No" | "">(
    initialData?.infectionRatesMonitoring || "Yes"
  );
  const [deathRatesMonitoring, setDeathRatesMonitoring] = useState<"Yes" | "No" | "">(
    initialData?.deathRatesMonitoring || "Yes"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      bedsGeneralWards,
      bedsSemiPrivate,
      bedsPrivateRooms,
      bedsSuites,
      washroomRatioSemiPrivate,
      washroomRatioGeneral,
      washroomRatioPrivate,
      areaSemiPrivate,
      areaGeneral,
      areaPrivate,
      yearsOfEstablishment,
      drBedRatio,
      nurseBedRatio,
      icuBeds,
      iccuBeds,
      nicuBeds,
      picuBeds,
      isolationBeds,
      burnUnitBeds,
      hduBeds,
      ventilators,
      defribillators,
      crashCarts,
      pipedGas,
      fireSafety,
      ambulanceServices,
      ambulanceServiceType,
      bloodBank,
      pharmacyService,
      modularOt,
      majorOt,
      minorOt,
      laborRoom,
      cardiaThoracicOt,
      dialysisUnit,
      endoscope,
      roboticArm,
      cArm,
      cathLab,
      stepDownOt,
      resuscitationEquipment,
      lithotripsyEquipment,
      legalStatutesCompliance,
      itTaxDeptRegistration,
      uninterruptedElectricity,
      safeDrinkingWater,
      liftRampFacility,
      legalRecordMaintenance,
      biochemistry,
      microbiology,
      immunoChemistry,
      imaging,
      xrays,
      mri,
      usg,
      pet,
      ct,
      echo,
      mortuaryServices,
      cssd,
      displayHospitalCharges,
      infectionRatesMonitoring,
      deathRatesMonitoring,
    });
  };

  const inputClass =
    "w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm transition-all bg-white";
  const labelClass = "block text-sm font-medium text-gray-900 mb-1.5";

  const renderYesNoRadio = (
    label: string,
    value: "Yes" | "No" | "",
    onChange: (val: "Yes" | "No") => void,
    required = true
  ) => (
    <div className="flex flex-col justify-between p-3 border border-gray-200 rounded-xl bg-white">
      <div className="text-xs font-medium text-gray-800 mb-2 leading-snug">
        {label} {required && <span className="text-red-500">*</span>}
      </div>
      <div className="flex items-center gap-2">
        {(["Yes", "No"] as const).map((opt) => (
          <label
            key={opt}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
              value === opt
                ? opt === "Yes"
                  ? "bg-[#E3F2FD] border-[#2196F3] text-[#1976D2]"
                  : "bg-gray-100 border-gray-300 text-gray-800"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Number of Beds */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900">
            Number of Beds <span className="text-red-500">*</span>
          </h3>
        </div>
        <p className="text-xs text-red-600 font-medium mb-3">
          Disclaimer: Classification is based solely on the number of beds in each room/ward.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className={labelClass}>General Wards</label>
            <input
              type="number"
              min="0"
              value={bedsGeneralWards}
              onChange={(e) => setBedsGeneralWards(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Semi Private Rooms</label>
            <input
              type="number"
              min="0"
              value={bedsSemiPrivate}
              onChange={(e) => setBedsSemiPrivate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Private Rooms</label>
            <input
              type="number"
              min="0"
              value={bedsPrivateRooms}
              onChange={(e) => setBedsPrivateRooms(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Suites</label>
            <input
              type="number"
              min="0"
              value={bedsSuites}
              onChange={(e) => setBedsSuites(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Bed to Washroom Ratio */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Bed to Washroom Ratio <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>
              For Semi Private Rooms <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 4:1"
              value={washroomRatioSemiPrivate}
              onChange={(e) => setWashroomRatioSemiPrivate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              For General Wards <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 4:1"
              value={washroomRatioGeneral}
              onChange={(e) => setWashroomRatioGeneral(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              For Private Rooms <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1:1"
              value={washroomRatioPrivate}
              onChange={(e) => setWashroomRatioPrivate(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Format Guidelines Box */}
        <div className="mt-2.5 p-3.5 bg-gray-50 border-l-4 border-[#2196F3] rounded-r-xl text-xs text-gray-600 space-y-1">
          <div className="font-semibold text-gray-800">Format Guidelines:</div>
          <ul className="list-disc list-inside space-y-0.5 pl-1">
            <li>Ratio format: Enter as "4:1" (4 beds per 1 washroom)</li>
            <li>Decimal format: Enter as "4.0" or "4" (beds per washroom)</li>
            <li>Examples: "4:1", "6:2", "8", "4.5"</li>
          </ul>
        </div>
      </div>

      {/* Area per bed & Ratios */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Area per bed <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>
              For Semi Private Rooms <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 6.5"
              value={areaSemiPrivate}
              onChange={(e) => setAreaSemiPrivate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              For General Wards <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 6.0"
              value={areaGeneral}
              onChange={(e) => setAreaGeneral(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              For Private Rooms <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 10.0"
              value={areaPrivate}
              onChange={(e) => setAreaPrivate(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          <div>
            <label className={labelClass}>
              Years of Establishment <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 2020"
              value={yearsOfEstablishment}
              onChange={(e) => setYearsOfEstablishment(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Dr. Bed Ratio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1:4"
              value={drBedRatio}
              onChange={(e) => setDrBedRatio(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Nurse Bed Ratio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 4:1"
              value={nurseBedRatio}
              onChange={(e) => setNurseBedRatio(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Guidelines for Area and Establishment */}
        <div className="mt-2.5 p-3.5 bg-gray-50 border-l-4 border-[#2196F3] rounded-r-xl text-xs text-gray-600 space-y-2">
          <div>
            <span className="font-semibold text-gray-800">Years of Establishment Guidelines:</span>
            <p className="mt-0.5">
              Enter the year from when the hospital has been operating under its current
              name/ownership (do not include any previous names or ownership periods).
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-800">Area Measurement Guidelines:</span>
            <ul className="list-disc list-inside mt-0.5 space-y-0.5 pl-1">
              <li>Unit: Enter area in square meters (sq.m)</li>
              <li>Format: Decimal numbers allowed (e.g., 6.5, 10.2, 8)</li>
              <li>Examples: "6.5" for 6.5 sq.m, "10" for 10 sq.m, "12.75" for 12.75 sq.m</li>
              <li>Note: Must be positive numbers only</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Intensive Care Beds */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Intensive Care Beds <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "ICU Beds*", val: icuBeds, set: setIcuBeds },
            { label: "ICCU Beds*", val: iccuBeds, set: setIccuBeds },
            { label: "NICU Beds*", val: nicuBeds, set: setNicuBeds },
            { label: "PICU Beds*", val: picuBeds, set: setPicuBeds },
            { label: "Isolation Beds*", val: isolationBeds, set: setIsolationBeds },
            { label: "Burn Unit*", val: burnUnitBeds, set: setBurnUnitBeds },
            { label: "HDU beds*", val: hduBeds, set: setHduBeds },
          ].map((item) => (
            <div key={item.label}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{item.label}</label>
              <input
                type="number"
                min="0"
                required
                value={item.val}
                onChange={(e) => item.set(parseInt(e.target.value) || 0)}
                className={inputClass}
              />
            </div>
          ))}
        </div>

        <div className="mt-2.5 p-3.5 bg-gray-50 border-l-4 border-[#2196F3] rounded-r-xl text-xs text-gray-600 space-y-1">
          <div className="font-semibold text-gray-800">Intensive Care Bed Types:</div>
          <p className="leading-relaxed">
            ICU: Intensive Care Unit beds; ICCU: Intensive Cardiac Care Unit beds; NICU: Neonatal
            Intensive Care Unit beds; PICU: Pediatric Intensive Care Unit beds; Isolation: Beds for
            isolation of patients; Burn Unit: Specialized beds for burn patients; HDU: High
            Dependency Unit beds.
          </p>
          <p className="font-semibold text-gray-800 pt-1">
            Note: Enter 0 if you don't have that particular type of intensive care bed
          </p>
        </div>
      </div>

      {/* Emergency Infrastructure */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Emergency Infrastructure <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <label className={labelClass}>
              Ventilators <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={ventilators}
              onChange={(e) => setVentilators(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Defribillators <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={defribillators}
              onChange={(e) => setDefribillators(parseInt(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          {renderYesNoRadio("Crash Carts", crashCarts, setCrashCarts)}
          {renderYesNoRadio("Piped Gas (Central Oxygen & Suction)", pipedGas, setPipedGas)}
          {renderYesNoRadio("Fire Safety", fireSafety, setFireSafety)}
        </div>
      </div>

      {/* Services Dropdowns */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Services <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className={labelClass}>
              Ambulance Services <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={ambulanceServices}
              onChange={(e) => setAmbulanceServices(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Ambulance Services type</option>
              {SERVICE_AVAILABILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Ambulance Service Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={ambulanceServiceType}
              onChange={(e) => setAmbulanceServiceType(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Ambulance Service Type</option>
              <option value="ALS">ALS</option>
              <option value="BLS">BLS</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Blood Bank <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={bloodBank}
              onChange={(e) => setBloodBank(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Blood Bank service type</option>
              {SERVICE_AVAILABILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Pharmacy <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={pharmacyService}
              onChange={(e) => setPharmacyService(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Pharmacy service type</option>
              {SERVICE_AVAILABILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Operation Theatres */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Operation Theatres <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "Modular OT*", val: modularOt, set: setModularOt },
            { label: "Major OT*", val: majorOt, set: setMajorOt },
            { label: "Minor OT*", val: minorOt, set: setMinorOt },
            { label: "Labor Room*", val: laborRoom, set: setLaborRoom },
            { label: "Cardia Thoracic OT*", val: cardiaThoracicOt, set: setCardiaThoracicOt },
            { label: "Dialysis Unit*", val: dialysisUnit, set: setDialysisUnit },
            { label: "Endoscope*", val: endoscope, set: setEndoscope },
            { label: "Robotic Arm*", val: roboticArm, set: setRoboticArm },
            { label: "C- Arm*", val: cArm, set: setCArm },
            { label: "Cath Lab*", val: cathLab, set: setCathLab },
            { label: "Step Down OT*", val: stepDownOt, set: setStepDownOt },
            { label: "Resuscitation equipment*", val: resuscitationEquipment, set: setResuscitationEquipment },
            { label: "Lithotripsy Equipment*", val: lithotripsyEquipment, set: setLithotripsyEquipment },
          ].map((item) => (
            <div key={item.label}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{item.label}</label>
              <input
                type="number"
                min="0"
                required
                value={item.val}
                onChange={(e) => item.set(parseInt(e.target.value) || 0)}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Requirements */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Mandatory Requirements <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {renderYesNoRadio("Legal Statutes Compliance", legalStatutesCompliance, setLegalStatutesCompliance)}
          {renderYesNoRadio("Registration with IT Tax Dept", itTaxDeptRegistration, setItTaxDeptRegistration)}
          {renderYesNoRadio("Unintterupted Electricity Back up", uninterruptedElectricity, setUninterruptedElectricity)}
          {renderYesNoRadio("Safe Drinking Water", safeDrinkingWater, setSafeDrinkingWater)}
          {renderYesNoRadio(
            "Lift / Ramp Facility (For Multi-storey building)",
            liftRampFacility,
            setLiftRampFacility,
            false // No asterisk in spec
          )}
          {renderYesNoRadio("Legal Record Maintenance", legalRecordMaintenance, setLegalRecordMaintenance)}
        </div>
      </div>

      {/* Diagnostics */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Diagnostics <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Biochemistry*", val: biochemistry, set: setBiochemistry, ph: "Biochemistry" },
            { label: "Microbiology*", val: microbiology, set: setMicrobiology, ph: "Microbiology" },
            { label: "ImmunoChemistry*", val: immunoChemistry, set: setImmunoChemistry, ph: "ImmunoChemistry" },
            { label: "Imaging*", val: imaging, set: setImaging, ph: "Imaging" },
            { label: "Xrays*", val: xrays, set: setXrays, ph: "Xrays" },
            { label: "MRI*", val: mri, set: setMri, ph: "MRI" },
            { label: "USG*", val: usg, set: setUsg, ph: "USG" },
            { label: "PET*", val: pet, set: setPet, ph: "PET" },
            { label: "CT*", val: ct, set: setCt, ph: "CT" },
            { label: "ECHO*", val: echo, set: setEcho, ph: "ECHO" },
          ].map((item) => (
            <div key={item.label}>
              <label className={labelClass}>{item.label}</label>
              <select
                required
                value={item.val}
                onChange={(e) => item.set(e.target.value)}
                className={inputClass}
              >
                <option value="">Select {item.ph} service type</option>
                {SERVICE_AVAILABILITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Other Services */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Other Services <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {renderYesNoRadio("Mortuary Services", mortuaryServices, setMortuaryServices)}
          {renderYesNoRadio("CSSD", cssd, setCssd)}
          {renderYesNoRadio("Display of Hospital Charges", displayHospitalCharges, setDisplayHospitalCharges)}
          {renderYesNoRadio("Monitoring of Infection Rates", infectionRatesMonitoring, setInfectionRatesMonitoring)}
          {renderYesNoRadio("Monitoring of Death Rates", deathRatesMonitoring, setDeathRatesMonitoring)}
        </div>
      </div>

      <IndiaFormButtons onBack={onBack} isFirstStep={isFirstStep} submitText="Save and Continue" />
    </form>
  );
}
