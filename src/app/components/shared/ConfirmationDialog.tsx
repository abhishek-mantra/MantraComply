import { AlertTriangle } from "lucide-react";
import { ModalWrapper } from "./ModalWrapper";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  confirmColor?: "red" | "blue";
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  confirmColor = "red",
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${confirmColor === "red" ? "bg-red-100" : "bg-orange-100"}`}>
            <AlertTriangle className={`w-6 h-6 ${confirmColor === "red" ? "text-red-600" : "text-orange-600"}`} />
          </div>
          <p className="text-sm text-gray-700 flex-1 pt-1">{message}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg transition-colors ${
              confirmColor === "red"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-[#2196F3] text-white hover:bg-[#1976D2]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
