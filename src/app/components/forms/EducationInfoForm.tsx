import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { Trash2, Eye } from "lucide-react";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationDate: string;
  fieldOfStudy: string;
}

export function EducationInfoForm({ onNext, onPrevious, isFirstStep }: FormProps) {
  const [educations, setEducations] = useState<Education[]>([]);
  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    institution: "",
    graduationDate: "",
    fieldOfStudy: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const degreeOptions = [
    "MSW - Master of Social Work",
    "MA - Master of Arts",
    "MS - Master of Science",
    "PsyD - Doctor of Psychology",
    "PhD - Doctor of Philosophy",
    "MD - Doctor of Medicine",
    "DO - Doctor of Osteopathic Medicine",
    "MSN - Master of Science in Nursing",
    "DNP - Doctor of Nursing Practice"
  ];

  const handleAddEducation = () => {
    if (currentEducation.degree && currentEducation.institution && currentEducation.graduationDate) {
      const newEducation: Education = {
        id: Date.now().toString(),
        ...currentEducation,
      };
      setEducations([...educations, newEducation]);
      setCurrentEducation({
        degree: "",
        institution: "",
        graduationDate: "",
        fieldOfStudy: "",
      });
    }
  };

  const handleDeleteEducation = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Degree <span className="text-red-500">*</span>
        </label>
        <select
          value={currentEducation.degree}
          onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
        >
          <option value="">Select degree</option>
          {degreeOptions.map((degree) => (
            <option key={degree} value={degree}>
              {degree}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Institution <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={currentEducation.institution}
          onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="e.g., Columbia University"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Graduation Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={currentEducation.graduationDate}
          onChange={(e) => setCurrentEducation({ ...currentEducation, graduationDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Field of Study
        </label>
        <input
          type="text"
          value={currentEducation.fieldOfStudy}
          onChange={(e) => setCurrentEducation({ ...currentEducation, fieldOfStudy: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
          placeholder="e.g., Clinical Psychology"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Diploma/Transcript <span className="text-red-500">*</span>
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
        onClick={handleAddEducation}
        className="w-full px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
      >
        + Add Education
      </button>

      {educations.length > 0 && (
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Degree
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Graduation Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Field of Study
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {educations.map((education) => (
                <tr key={education.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{education.degree}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{education.institution}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(education.graduationDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {education.fieldOfStudy || "-"}
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
                        onClick={() => handleDeleteEducation(education.id)}
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
