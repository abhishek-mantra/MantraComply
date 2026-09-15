import { useState } from "react";
import { UAEFormButtons } from "./UAEFormButtons";

interface DataFlowVerificationFormProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}

export function DataFlowVerificationForm({ onNext, onBack }: DataFlowVerificationFormProps) {
  const [status, setStatus] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [estimatedDate, setEstimatedDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ dataflowStatus: status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          DataFlow Group provides Primary Source Verification (PSV) for all UAE health authority applications. This involves DataFlow verifying your credentials directly with your issuing institutions. This is mandatory.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          DataFlow PSV Status <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            "Completed — I have a DataFlow PSV reference number",
            "In Progress — DataFlow verification is underway",
            "Not Started — I have not yet initiated DataFlow verification"
          ].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="dataflow-status"
                value={option}
                required
                checked={status === option}
                onChange={(e) => setStatus(e.target.value)}
                className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {status === "Completed — I have a DataFlow PSV reference number" && (
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div>
            <label htmlFor="reference-number" className="block text-sm font-medium text-gray-700 mb-2">
              DataFlow Reference Number
            </label>
            <input
              type="text"
              id="reference-number"
              name="reference-number"
              required
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="Enter your DataFlow reference number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="completion-certificate" className="block text-sm font-medium text-gray-700 mb-2">
              DataFlow Completion Certificate
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors">
              <input type="file" id="completion-certificate" required className="hidden" />
              <label htmlFor="completion-certificate" className="cursor-pointer">
                <p className="text-sm text-gray-600">
                  <span className="text-[#2563EB] font-medium">Upload DataFlow certificate</span>
                </p>
              </label>
            </div>
          </div>
        </div>
      )}

      {status === "In Progress — DataFlow verification is underway" && (
        <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div>
            <label htmlFor="application-number" className="block text-sm font-medium text-gray-700 mb-2">
              DataFlow Application Number
            </label>
            <input
              type="text"
              id="application-number"
              name="application-number"
              required
              value={applicationNumber}
              onChange={(e) => setApplicationNumber(e.target.value)}
              placeholder="Enter your DataFlow application/tracking number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="estimated-date" className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Completion Date
            </label>
            <input
              type="text"
              id="estimated-date"
              name="estimated-date"
              required
              value={estimatedDate}
              onChange={(e) => setEstimatedDate(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="MM/DD/YYYY"
            />
          </div>
        </div>
      )}

      {status === "Not Started — I have not yet initiated DataFlow verification" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">
            You can initiate DataFlow verification at dataflowgroup.com. The process typically costs USD 180–250 and takes 4–8 weeks. MantraComply can assist you in initiating this process.
          </p>
          <a
            href="https://www.dataflowgroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-[#2563EB] hover:text-[#1e40af] font-medium"
          >
            Start DataFlow Verification →
          </a>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700">
          Our team can help you navigate the DataFlow verification process and ensure all requirements are met.
        </p>
      </div>

      <UAEFormButtons onBack={onBack} />
    </form>
  );
}
