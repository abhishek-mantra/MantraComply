import { useState } from "react";
import { FormButtons } from "./FormButtons";
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

interface Certification {
  id: string;
  board: string;
  specialty: string;
  certificationDate: string;
  expirationDate: string;
  residencyProgram?: string;
  residencyStartYear?: string;
  residencyEndYear?: string;
  fellowshipProgram?: string;
  fellowshipCompletionYear?: string;
}

export function BoardCertificationForm({ specialty, onNext, onPrevious, isFirstStep, selectedSpecialization }: FormProps) {
  const [noBoardCert, setNoBoardCert] = useState(false);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [currentCert, setCurrentCert] = useState({
    board: "",
    specialty: "",
    certificationDate: "",
    expirationDate: "",
    residencyProgram: "",
    residencyStartYear: "",
    residencyEndYear: "",
    fellowshipProgram: "",
    fellowshipCompletionYear: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

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

  const surgicalPrivilegesSpecializations = [
    "Neurosurgeon",
    "General Surgery",
    "Orthopedician",
    "ENT Specialist"
  ];

  const specialtyBoards: { [key: string]: string } = {
    "Cardiologist": "American Board of Internal Medicine – Cardiovascular Disease",
    "Dentist": "American Board of General Dentistry",
    "Dermatologist": "American Board of Dermatology",
    "Endocrinologist": "American Board of Internal Medicine – Endocrinology",
    "ENT Specialist": "American Board of Otolaryngology",
    "Fertility / IVF Specialist": "American Board of Obstetrics and Gynecology – Reproductive Endocrinology",
    "Gastroenterologist": "American Board of Internal Medicine – Gastroenterology",
    "General Physician": "American Board of Family Medicine",
    "General Surgery": "American Board of Surgery",
    "Gynecologist": "American Board of Obstetrics and Gynecology",
    "Hypertension": "American Board of Internal Medicine – Hypertension Specialist",
    "Nephrologist": "American Board of Internal Medicine – Nephrology",
    "Neurosurgeon": "American Board of Neurological Surgery",
    "Oncologist": "American Board of Internal Medicine – Medical Oncology",
    "Ophthalmologist": "American Board of Ophthalmology",
    "Orthopedician": "American Board of Orthopaedic Surgery",
    "Paediatrician": "American Board of Pediatrics",
    "Pulmonologist (Lung)": "American Board of Internal Medicine – Pulmonary Disease",
    "Rheumatologist": "American Board of Internal Medicine – Rheumatology",
    "Sexologist": "American Board of Family Medicine – Sexual Health",
    "Urologist (Kidney & Urinary Tract)": "American Board of Urology"
  };

  const getCertifyingBoards = () => {
    if (specialty === "therapy") {
      return [
        "American Board of Psychiatry and Neurology (ABPN)",
        "American Board of Professional Psychology (ABPP)"
      ];
    } else if (specialty === "doctor" && selectedSpecialization) {
      const board = specialtyBoards[selectedSpecialization];
      return board ? [board] : [];
    } else if (specialty === "dietitian") {
      return ["Commission on Dietetic Registration (CDR)"];
    } else if (specialty === "physiotherapy") {
      return ["American Board of Physical Therapy Specialties (ABPTS)"];
    }
    return [];
  };

  const getSpecialties = () => {
    if (specialty === "therapy") {
      return [
        "Clinical Psychology",
        "Counseling Psychology",
        "Child and Adolescent Psychiatry",
        "Geriatric Psychiatry",
        "Addiction Psychiatry",
        "Forensic Psychiatry",
        "Neuropsychology"
      ];
    } else if (specialty === "dietitian") {
      return [
        "Pediatric Nutrition",
        "Renal Nutrition",
        "Oncology Nutrition",
        "Sports Dietetics",
        "Gerontological Nutrition",
        "Obesity and Weight Management"
      ];
    } else if (specialty === "physiotherapy") {
      return [
        "Orthopedic Physical Therapy",
        "Sports Physical Therapy",
        "Neurologic Physical Therapy",
        "Cardiovascular & Pulmonary",
        "Geriatric Physical Therapy",
        "Pediatric Physical Therapy",
        "Electrophysiologic Physical Therapy"
      ];
    }
    return [];
  };

  const handleAddCertification = () => {
    const requiredFieldsFilled = specialty === "doctor"
      ? currentCert.board && currentCert.specialty && currentCert.certificationDate && currentCert.expirationDate && currentCert.residencyProgram && currentCert.residencyStartYear && currentCert.residencyEndYear
      : currentCert.board && currentCert.specialty && currentCert.certificationDate && currentCert.expirationDate;

    if (requiredFieldsFilled) {
      const newCert: Certification = {
        id: Date.now().toString(),
        board: currentCert.board,
        specialty: currentCert.specialty,
        certificationDate: currentCert.certificationDate,
        expirationDate: currentCert.expirationDate,
        ...(specialty === "doctor" && {
          residencyProgram: currentCert.residencyProgram,
          residencyStartYear: currentCert.residencyStartYear,
          residencyEndYear: currentCert.residencyEndYear,
          ...(currentCert.fellowshipProgram && { fellowshipProgram: currentCert.fellowshipProgram }),
          ...(currentCert.fellowshipCompletionYear && { fellowshipCompletionYear: currentCert.fellowshipCompletionYear }),
        }),
      };
      setCertifications([...certifications, newCert]);
      setCurrentCert({
        board: "",
        specialty: "",
        certificationDate: "",
        expirationDate: "",
        residencyProgram: "",
        residencyStartYear: "",
        residencyEndYear: "",
        fellowshipProgram: "",
        fellowshipCompletionYear: "",
      });
    }
  };

  const handleDeleteCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
        <input 
          type="checkbox" 
          id="noBoard" 
          checked={noBoardCert}
          onChange={(e) => setNoBoardCert(e.target.checked)}
          className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]" 
        />
        <label htmlFor="noBoard" className="text-sm text-gray-900 cursor-pointer flex-1">
          N/A - I do not have board certification
        </label>
      </div>
      <ContextualHelpLink
        slug="board-certification-and-payer-tiers"
        label="When do commercial and Medicaid health plans require board certification? →"
      />

      {!noBoardCert && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Certifying Board <span className="text-red-500">*</span>
            </label>
            <select 
              value={currentCert.board}
              onChange={(e) => setCurrentCert({ ...currentCert, board: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            >
              <option value="">Select certifying board</option>
              {getCertifyingBoards().map((board) => (
                <option key={board} value={board}>
                  {board}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Specialty <span className="text-red-500">*</span>
            </label>
            <select
              value={currentCert.specialty}
              onChange={(e) => setCurrentCert({ ...currentCert, specialty: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            >
              <option value="">Select specialty</option>
              {getSpecialties().map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Certification Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={currentCert.certificationDate}
                onChange={(e) => setCurrentCert({ ...currentCert, certificationDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Expiration Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={currentCert.expirationDate}
                onChange={(e) => setCurrentCert({ ...currentCert, expirationDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
              />
            </div>
          </div>

          {specialty === "doctor" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Residency Program Name & Hospital <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentCert.residencyProgram}
                  onChange={(e) => setCurrentCert({ ...currentCert, residencyProgram: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                  placeholder="Enter residency program and hospital"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Residency Start Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={currentCert.residencyStartYear}
                    onChange={(e) => setCurrentCert({ ...currentCert, residencyStartYear: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Residency End Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={currentCert.residencyEndYear}
                    onChange={(e) => setCurrentCert({ ...currentCert, residencyEndYear: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                  />
                </div>
              </div>

              {selectedSpecialization && fellowshipSpecializations.includes(selectedSpecialization) && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Fellowship Program Name & Hospital <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={currentCert.fellowshipProgram}
                      onChange={(e) => setCurrentCert({ ...currentCert, fellowshipProgram: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                      placeholder="Enter fellowship program and hospital"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Fellowship Completion Year <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="date"
                      value={currentCert.fellowshipCompletionYear}
                      onChange={(e) => setCurrentCert({ ...currentCert, fellowshipCompletionYear: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                    />
                  </div>
                </>
              )}

              {selectedSpecialization && surgicalPrivilegesSpecializations.includes(selectedSpecialization) && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Hospital Surgical Privileges <span className="text-gray-400">(optional)</span>
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
              )}
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Board Certificate <span className="text-red-500">*</span>
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
            onClick={handleAddCertification}
            className="w-full px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
          >
            + Add Certification
          </button>
        </>
      )}

      {certifications.length > 0 && (
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Certifying Board
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Certification Date
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
              {certifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{cert.board}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{cert.specialty}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(cert.certificationDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(cert.expirationDate).toLocaleDateString()}
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
                        onClick={() => handleDeleteCertification(cert.id)}
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
