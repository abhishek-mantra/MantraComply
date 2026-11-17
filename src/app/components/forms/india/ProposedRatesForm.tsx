import { useState, useMemo } from "react";
import { IndiaFormButtons } from "./IndiaFormButtons";
import {
  GIC_PACKAGE_PROCEDURES,
  GIC_SURGERY_GRADES,
  GIC_ROOM_VISIT_CHARGES,
  GIC_ICU_CHARGES,
  GIC_INVESTIGATION_CHARGES,
  GIC_RADIOLOGY_CHARGES,
} from "../../../data/gicRatesData";

interface ProposedRatesFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLocked?: boolean;
}

export function ProposedRatesForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = false,
  isLocked = false,
}: ProposedRatesFormProps) {
  // Package rates: procedureId -> rate
  const [packageRates, setPackageRates] = useState<Record<string, number>>(() => {
    const rates: Record<string, number> = {};
    GIC_PACKAGE_PROCEDURES.forEach((p) => {
      rates[p.id] = initialData?.packageRates?.[p.id] ?? p.defaultSingleAcRate;
    });
    return rates;
  });

  // Surgery grades: gradeIndex-particularIndex -> rate
  const [surgeryRates, setSurgeryRates] = useState<Record<string, number>>(() => {
    const rates: Record<string, number> = {};
    GIC_SURGERY_GRADES.forEach((g) => {
      g.particulars.forEach((p, pIndex) => {
        const key = `g${g.grade}_p${pIndex}`;
        rates[key] = initialData?.surgeryRates?.[key] ?? p.defaultRate;
      });
    });
    return rates;
  });

  // Room & Visit rates
  const [roomVisitRates, setRoomVisitRates] = useState<Record<string, number>>(() => {
    const rates: Record<string, number> = {};
    GIC_ROOM_VISIT_CHARGES.forEach((item) => {
      rates[item.id] = initialData?.roomVisitRates?.[item.id] ?? item.defaultRate;
    });
    return rates;
  });

  // ICU rates
  const [icuRates, setIcuRates] = useState<Record<string, number>>(() => {
    const rates: Record<string, number> = {};
    GIC_ICU_CHARGES.forEach((item) => {
      rates[item.id] = initialData?.icuRates?.[item.id] ?? item.defaultRate;
    });
    return rates;
  });

  // Investigation rates
  const [investigationRates, setInvestigationRates] = useState<Record<string, number>>(() => {
    const rates: Record<string, number> = {};
    GIC_INVESTIGATION_CHARGES.forEach((item) => {
      rates[item.id] = initialData?.investigationRates?.[item.id] ?? item.defaultRate;
    });
    return rates;
  });

  // Radiology rates
  const [radiologyRates, setRadiologyRates] = useState<Record<string, number>>(() => {
    const rates: Record<string, number> = {};
    GIC_RADIOLOGY_CHARGES.forEach((item) => {
      rates[item.id] = initialData?.radiologyRates?.[item.id] ?? item.defaultRate;
    });
    return rates;
  });

  // Group procedures by specialty
  const proceduresBySpecialty = useMemo(() => {
    const groups: { specialty: string; items: typeof GIC_PACKAGE_PROCEDURES }[] = [];
    GIC_PACKAGE_PROCEDURES.forEach((p) => {
      let group = groups.find((g) => g.specialty === p.specialty);
      if (!group) {
        group = { specialty: p.specialty, items: [] };
        groups.push(group);
      }
      group.items.push(p);
    });
    return groups;
  }, []);

  const handlePackageRateChange = (id: string, value: string) => {
    if (isLocked) return;
    const num = parseFloat(value) || 0;
    setPackageRates((prev) => ({ ...prev, [id]: num }));
  };

  const handleSurgeryRateChange = (key: string, value: string) => {
    if (isLocked) return;
    const num = parseFloat(value) || 0;
    setSurgeryRates((prev) => ({ ...prev, [key]: num }));
  };

  const calculateGradeTotal = (grade: number, particularCount: number) => {
    let total = 0;
    for (let i = 0; i < particularCount; i++) {
      total += surgeryRates[`g${grade}_p${i}`] || 0;
    }
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      packageRates,
      surgeryRates,
      roomVisitRates,
      icuRates,
      investigationRates,
      radiologyRates,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Proposed Tariffs Notice Box */}
      <div className="p-5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl">
        <h3 className="text-base font-semibold text-gray-900 mb-2.5">
          Enter your hospital’s proposed tariffs (in INR ₹) for tariff negotiation
        </h3>
        <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
          <li>Do not leave any cell blank; enter 0 if a procedure is not applicable.</li>
          <li>Check all inclusions and exclusions carefully before entering rates.</li>
        </ul>
      </div>

      {/* Level Types Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-xs">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[#1F4E79] text-white">
              <th className="px-4 py-2.5 text-left font-semibold w-24">Level Types</th>
              <th className="px-4 py-2.5 text-left font-semibold">Categories</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-4 py-2.5 font-bold text-gray-900">L1</td>
              <td className="px-4 py-2.5 text-gray-700 leading-relaxed">
                Doctor's fee, OT charges, Anasthetic Charges, Drugs, Investigations, Professional
                charges, Room rents, Nursing &amp; administrative charges, Medicines and Consumables
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-bold text-gray-900">L2</td>
              <td className="px-4 py-2.5 text-gray-700 leading-relaxed">
                IOL, Pacemaker, Ortho prosthesis, Stents, Staplers, Catheters, Balloons, Guidewires
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-bold text-gray-900">L3</td>
              <td className="px-4 py-2.5 text-gray-700 leading-relaxed">
                Assays, high end hormonal studies, SPECT, A scans, etc.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-bold text-gray-900">L4</td>
              <td className="px-4 py-2.5 text-gray-700 leading-relaxed">
                Laproscopy/abdominal/vaginal/laser, etc
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6A. Package Rates Table */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Package Surgeries</h3>
        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-xs">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#1F4E79] text-white">
                <th className="px-3.5 py-3 text-left font-semibold min-w-[220px]">Procedure Name</th>
                <th className="px-3 py-3 text-left font-semibold w-24">Inclusions</th>
                <th className="px-3 py-3 text-left font-semibold w-20">Exclusions</th>
                <th className="px-3 py-3 text-left font-semibold w-40">
                  Hospital proposed package
                  <br />
                  <span className="text-[10px] font-normal opacity-90">for single AC room (INR)</span>
                </th>
                <th className="px-3 py-3 text-center font-semibold w-32">
                  Twin Sharing (INR)
                  <br />
                  <span className="text-[10px] font-normal opacity-90">85% of single AC room</span>
                </th>
                <th className="px-3 py-3 text-center font-semibold w-32">
                  General Ward (INR)
                  <br />
                  <span className="text-[10px] font-normal opacity-90">70% of single AC room</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {proceduresBySpecialty.map((group) => (
                <div key={group.specialty} className="contents">
                  <tr className="bg-blue-50/70 border-y border-blue-100">
                    <td colSpan={6} className="px-4 py-2 font-bold text-[#1976D2] uppercase tracking-wide">
                      {group.specialty}
                    </td>
                  </tr>
                  {group.items.map((proc) => {
                    const rate = packageRates[proc.id] || 0;
                    const twinRate = rate > 0 ? (rate * 0.85).toFixed(2) : "-";
                    const generalRate = rate > 0 ? (rate * 0.7).toFixed(2) : "-";

                    return (
                      <tr key={proc.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-3.5 py-2 font-medium text-gray-800">{proc.name}</td>
                        <td className="px-3 py-2 text-gray-600 font-mono text-[11px]">{proc.inclusions}</td>
                        <td className="px-3 py-2 text-gray-600 font-mono text-[11px]">{proc.exclusions}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500 font-semibold">₹</span>
                            <input
                              type="number"
                              min="0"
                              disabled={isLocked}
                              value={rate}
                              onChange={(e) => handlePackageRateChange(proc.id, e.target.value)}
                              className="w-28 px-2 py-1 border border-gray-300 rounded-lg text-right font-medium text-gray-900 focus:ring-1 focus:ring-[#2196F3] outline-none disabled:bg-gray-100"
                            />
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center text-gray-600 font-medium">
                          {twinRate === "-" ? "-" : `₹${twinRate}`}
                        </td>
                        <td className="px-3 py-2 text-center text-gray-600 font-medium">
                          {generalRate === "-" ? "-" : `₹${generalRate}`}
                        </td>
                      </tr>
                    );
                  })}
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6B. Surgery Charges (other than Package surgeries) */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          Surgery Charges (other than Package surgeries)
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Enter the suggested benchmark rate (single AC) for each particular. The Total per grade
          is calculated automatically.
        </p>

        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-xs">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#1F4E79] text-white">
                <th className="px-4 py-2.5 text-left font-semibold w-28">Levels</th>
                <th className="px-4 py-2.5 text-left font-semibold">Particulars</th>
                <th className="px-4 py-2.5 text-left font-semibold w-64">
                  Suggested Benchmark rate for single AC (INR)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {GIC_SURGERY_GRADES.map((grade) => {
                const total = calculateGradeTotal(grade.grade, grade.particulars.length);

                return (
                  <div key={grade.grade} className="contents">
                    {grade.particulars.map((part, pIdx) => {
                      const key = `g${grade.grade}_p${pIdx}`;
                      const val = surgeryRates[key] ?? 0;

                      return (
                        <tr key={key} className="hover:bg-gray-50/80">
                          {pIdx === 0 && (
                            <td
                              rowSpan={grade.particulars.length + 1}
                              className="px-4 py-3 font-bold text-gray-900 bg-[#EEF2F7] align-middle border-r border-gray-200"
                            >
                              {grade.label}
                            </td>
                          )}
                          <td className="px-4 py-2 text-gray-700">{part.particular}</td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-500 font-semibold">₹</span>
                              <input
                                type="number"
                                min="0"
                                disabled={isLocked}
                                value={val}
                                onChange={(e) => handleSurgeryRateChange(key, e.target.value)}
                                className="w-32 px-2.5 py-1 border border-gray-300 rounded-lg text-right font-medium text-gray-900 focus:ring-1 focus:ring-[#2196F3] outline-none disabled:bg-gray-100"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-50/80 font-bold border-b-2 border-gray-200">
                      <td className="px-4 py-2.5 text-gray-900 font-semibold">Total</td>
                      <td className="px-4 py-2.5 text-emerald-700 font-bold">
                        ₹{total.toFixed(2)}
                      </td>
                    </tr>
                  </div>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6C. Room & Visit Charges (Non-ICU) and ICU Charges */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Room &amp; Visit Charges (Non-ICU)</h3>
        <p className="text-xs text-gray-500 mb-3">Enter the charges (in INR) for each particular.</p>

        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-xs">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#1F4E79] text-white">
                <th className="px-4 py-2.5 text-left font-semibold">Particulars</th>
                <th className="px-4 py-2.5 text-left font-semibold w-64">Charges (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {GIC_ROOM_VISIT_CHARGES.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800 font-medium">{item.name}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500 font-semibold">₹</span>
                      <input
                        type="number"
                        min="0"
                        disabled={isLocked}
                        value={roomVisitRates[item.id] ?? 0}
                        onChange={(e) =>
                          setRoomVisitRates((prev) => ({
                            ...prev,
                            [item.id]: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-32 px-2.5 py-1 border border-gray-300 rounded-lg text-right font-medium text-gray-900 focus:ring-1 focus:ring-[#2196F3] outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </td>
                </tr>
              ))}

              <tr className="bg-blue-50/70 border-y border-blue-100">
                <td colSpan={2} className="px-4 py-2 font-bold text-[#1976D2] uppercase tracking-wide">
                  ICU CHARGES
                </td>
              </tr>
              {GIC_ICU_CHARGES.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800 font-medium">{item.name}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500 font-semibold">₹</span>
                      <input
                        type="number"
                        min="0"
                        disabled={isLocked}
                        value={icuRates[item.id] ?? 0}
                        onChange={(e) =>
                          setIcuRates((prev) => ({
                            ...prev,
                            [item.id]: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-32 px-2.5 py-1 border border-gray-300 rounded-lg text-right font-medium text-gray-900 focus:ring-1 focus:ring-[#2196F3] outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6D. Investigations (66) and Radiology (4) */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          Investigation &amp; Radiology Charges
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Investigation charges to be the same irrespective of occupancy.
        </p>

        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-xs">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#1F4E79] text-white">
                <th className="px-4 py-2.5 text-left font-semibold">Test Name</th>
                <th className="px-4 py-2.5 text-left font-semibold w-64">Charges (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <tr className="bg-blue-50/70 border-y border-blue-100">
                <td colSpan={2} className="px-4 py-2 font-bold text-[#1976D2] uppercase tracking-wide">
                  INVESTIGATIONS (66)
                </td>
              </tr>
              {GIC_INVESTIGATION_CHARGES.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{item.name}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500 font-semibold">₹</span>
                      <input
                        type="number"
                        min="0"
                        disabled={isLocked}
                        value={investigationRates[item.id] ?? 0}
                        onChange={(e) =>
                          setInvestigationRates((prev) => ({
                            ...prev,
                            [item.id]: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-32 px-2.5 py-1 border border-gray-300 rounded-lg text-right font-medium text-gray-900 focus:ring-1 focus:ring-[#2196F3] outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </td>
                </tr>
              ))}

              <tr className="bg-blue-50/70 border-y border-blue-100">
                <td colSpan={2} className="px-4 py-2 font-bold text-[#1976D2] uppercase tracking-wide">
                  RADIOLOGY (4)
                </td>
              </tr>
              {GIC_RADIOLOGY_CHARGES.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800 font-medium">{item.name}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500 font-semibold">₹</span>
                      <input
                        type="number"
                        min="0"
                        disabled={isLocked}
                        value={radiologyRates[item.id] ?? 0}
                        onChange={(e) =>
                          setRadiologyRates((prev) => ({
                            ...prev,
                            [item.id]: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-32 px-2.5 py-1 border border-gray-300 rounded-lg text-right font-medium text-gray-900 focus:ring-1 focus:ring-[#2196F3] outline-none disabled:bg-gray-100"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <IndiaFormButtons onBack={onBack} isFirstStep={isFirstStep} submitText="Save and Continue" />
    </form>
  );
}
