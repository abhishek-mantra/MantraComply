import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

interface TerminateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    terminationDate: string;
    reason: string;
    notes: string;
  }) => void;
  providerName: string;
  payerName: string;
}

export function TerminateModal({
  isOpen,
  onClose,
  onConfirm,
  providerName,
  payerName,
}: TerminateModalProps) {
  const [terminationDate, setTerminationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ terminationDate, reason, notes });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Terminate Enrollment</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to terminate <strong>{providerName}</strong>'s enrollment
            with <strong>{payerName}</strong>?
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Termination Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={terminationDate}
              onChange={(e) => setTerminationDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Reason <span className="text-red-500">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            >
              <option value="">Select a reason</option>
              <option value="Provider Left Practice">Provider Left Practice</option>
              <option value="Payer Contract Ended">Payer Contract Ended</option>
              <option value="Administrative">Administrative</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add any additional notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Terminate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
