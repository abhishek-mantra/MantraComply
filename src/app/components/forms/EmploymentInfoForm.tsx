import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { Trash2 } from "lucide-react";

interface FormProps {
  specialty: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface Employment {
  id: string;
  isGap: boolean;
  employerName?: string;
  position?: string;
  startDate: string;
  endDate: string;
  gapReason?: string;
}

export function EmploymentInfoForm({ onNext, onPrevious, isFirstStep }: FormProps) {
  const [employments, setEmployments] = useState<Employment[]>([]);
  const [isGap, setIsGap] = useState(false);
  const [currentEmployment, setCurrentEmployment] = useState({
    employerName: "",
    position: "",
    startDate: "",
    endDate: "",
    gapReason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleAddEntry = () => {
    if (isGap) {
      if (currentEmployment.startDate && currentEmployment.endDate && currentEmployment.gapReason) {
        const newEntry: Employment = {
          id: Date.now().toString(),
          isGap: true,
          startDate: currentEmployment.startDate,
          endDate: currentEmployment.endDate,
          gapReason: currentEmployment.gapReason,
        };
        setEmployments([...employments, newEntry]);
        resetForm();
      }
    } else {
      if (currentEmployment.employerName && currentEmployment.position && currentEmployment.startDate && currentEmployment.endDate) {
        const newEntry: Employment = {
          id: Date.now().toString(),
          isGap: false,
          employerName: currentEmployment.employerName,
          position: currentEmployment.position,
          startDate: currentEmployment.startDate,
          endDate: currentEmployment.endDate,
        };
        setEmployments([...employments, newEntry]);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setCurrentEmployment({
      employerName: "",
      position: "",
      startDate: "",
      endDate: "",
      gapReason: "",
    });
    setIsGap(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEmployments(employments.filter((emp) => emp.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-gray-700">
          Please provide your work history for the past 5 years. Include all employment, gaps, and explanations.
        </p>
      </div>

      <div className="border border-gray-200 rounded-md p-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">New Entry</h3>
          <label className="flex items-center text-sm text-gray-600">
            <input 
              type="checkbox" 
              checked={isGap}
              onChange={(e) => setIsGap(e.target.checked)}
              className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]" 
            />
            There is a gap in employment
          </label>
        </div>

        {isGap ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gap Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={currentEmployment.startDate}
                  onChange={(e) => setCurrentEmployment({ ...currentEmployment, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gap End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={currentEmployment.endDate}
                  onChange={(e) => setCurrentEmployment({ ...currentEmployment, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Gap <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={currentEmployment.gapReason}
                onChange={(e) => setCurrentEmployment({ ...currentEmployment, gapReason: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                placeholder="Please explain the reason for the employment gap"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentEmployment.employerName}
                onChange={(e) => setCurrentEmployment({ ...currentEmployment, employerName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                placeholder="Enter employer name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position/Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentEmployment.position}
                onChange={(e) => setCurrentEmployment({ ...currentEmployment, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                placeholder="Enter position/title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={currentEmployment.startDate}
                  onChange={(e) => setCurrentEmployment({ ...currentEmployment, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={currentEmployment.endDate}
                  onChange={(e) => setCurrentEmployment({ ...currentEmployment, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={handleAddEntry}
        className="w-full px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
      >
        + Add Entry
      </button>

      {employments.length > 0 && (
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Employer/Reason
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employments.map((employment) => (
                <tr key={employment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      employment.isGap 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {employment.isGap ? "Gap" : "Employment"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {employment.isGap ? employment.gapReason : employment.employerName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {employment.position || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(employment.startDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(employment.endDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      type="button"
                      onClick={() => handleDeleteEntry(employment.id)}
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

      <FormButtons onPrevious={onPrevious} isFirstStep={isFirstStep} />
    </form>
  );
}
