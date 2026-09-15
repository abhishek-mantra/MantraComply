import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";
import { UAE_SERVICE_CONFIG, type UAEServiceType } from "../../../config/uaeServiceConfig";

interface PrometricExaminationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
  selectedService?: UAEServiceType | "";
}

export function PrometricExaminationForm({ onNext, onBack, selectedService }: PrometricExaminationFormProps) {
  const [examStatus, setExamStatus] = useState("");
  const [passDate, setPassDate] = useState("");
  const [examCategory, setExamCategory] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examLocation, setExamLocation] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [previousAttempts, setPreviousAttempts] = useState("");

  // Get service-specific options or use default therapy options
  const serviceConfig = selectedService ? UAE_SERVICE_CONFIG[selectedService] : UAE_SERVICE_CONFIG.therapy;
  const prometricIntroText = serviceConfig.prometricIntroText;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ examStatus, previousAttempts });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          {prometricIntroText}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prometric Exam Status <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            "Passed — I have passed the Prometric exam",
            "Scheduled — My exam is scheduled",
            "Awaiting Scheduling — I have not yet scheduled",
            "Exempt — My category is exempt (confirm with your authority)"
          ].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="exam-status"
                value={option}
                required
                checked={examStatus === option}
                onChange={(e) => setExamStatus(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {examStatus === "Passed — I have passed the Prometric exam" && (
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div>
            <label htmlFor="score-report" className="block text-sm font-medium text-gray-700 mb-2">
              Prometric Score Report
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
              <input type="file" id="score-report" required className="hidden" />
              <label htmlFor="score-report" className="cursor-pointer">
                <p className="text-sm text-gray-600">
                  <span className="text-[#2563EB] font-medium">Upload score report</span>
                </p>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="pass-date" className="block text-sm font-medium text-gray-700 mb-2">
              Pass Date
            </label>
            <input
              type="text"
              id="pass-date"
              name="pass-date"
              required
              value={passDate}
              onChange={(e) => setPassDate(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div>
            <label htmlFor="exam-category" className="block text-sm font-medium text-gray-700 mb-2">
              Exam Category / Code
            </label>
            <input
              type="text"
              id="exam-category"
              name="exam-category"
              required
              value={examCategory}
              onChange={(e) => setExamCategory(e.target.value)}
              placeholder="e.g., Clinical Psychologist — DHA"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>
      )}

      {examStatus === "Scheduled — My exam is scheduled" && (
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div>
            <label htmlFor="exam-date" className="block text-sm font-medium text-gray-700 mb-2">
              Exam Date
            </label>
            <input
              type="text"
              id="exam-date"
              name="exam-date"
              required
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div>
            <label htmlFor="exam-location" className="block text-sm font-medium text-gray-700 mb-2">
              Exam Location
            </label>
            <input
              type="text"
              id="exam-location"
              name="exam-location"
              required
              value={examLocation}
              onChange={(e) => setExamLocation(e.target.value)}
              placeholder="Prometric test centre name/city"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="booking-reference" className="block text-sm font-medium text-gray-700 mb-2">
              Prometric Booking Reference
            </label>
            <input
              type="text"
              id="booking-reference"
              name="booking-reference"
              required
              value={bookingReference}
              onChange={(e) => setBookingReference(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>
      )}

      {examStatus === "Awaiting Scheduling — I have not yet scheduled" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">
            You can schedule your Prometric exam at prometric.com. Select your UAE authority (DHA / DOH / MOHAP) to find the correct exam.
          </p>
          <a
            href="https://www.prometric.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-[#2563EB] hover:text-[#1e40af] font-medium"
          >
            Schedule Prometric Exam →
          </a>
        </div>
      )}

      <div>
        <label htmlFor="previous-attempts" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Previous Attempts
        </label>
        <select
          id="previous-attempts"
          name="previous-attempts"
          required
          value={previousAttempts}
          onChange={(e) => setPreviousAttempts(e.target.value)}
          className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Select...</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        {previousAttempts === "2" && (
          <p className="mt-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
            ⚠ You have 1 remaining attempt. Please prepare carefully before your next exam.
          </p>
        )}
      </div>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}