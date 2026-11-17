import { useState } from "react";
import { UploadCloud, CheckCircle2, X } from "lucide-react";
import { IndiaFormButtons } from "./IndiaFormButtons";
import { INFRASTRUCTURE_IMAGE_SLOTS } from "../../../config/indiaGicConfig";

interface InfrastructureImagesFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

interface ImageUploadData {
  fileName: string;
  previewUrl?: string;
  file?: File;
}

export function InfrastructureImagesForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = false,
  isLastStep = true,
}: InfrastructureImagesFormProps) {
  const [images, setImages] = useState<Record<string, ImageUploadData>>(
    initialData?.images || {}
  );
  const [missingRequiredSlots, setMissingRequiredSlots] = useState<string[]>([]);
  const [draggingSlot, setDraggingSlot] = useState<string | null>(null);

  const handleFile = (slotId: string, file: File | undefined) => {
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => ({
          ...prev,
          [slotId]: {
            fileName: file.name,
            previewUrl: typeof reader.result === "string" ? reader.result : undefined,
            file,
          },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImages((prev) => ({
        ...prev,
        [slotId]: { fileName: file.name, file },
      }));
    }

    setMissingRequiredSlots((prev) => prev.filter((id) => id !== slotId));
  };

  const handleRemove = (slotId: string) => {
    setImages((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const missing: string[] = [];
    INFRASTRUCTURE_IMAGE_SLOTS.forEach((slot) => {
      if (slot.required && !images[slot.id]?.fileName) {
        missing.push(slot.id);
      }
    });

    if (missing.length > 0) {
      setMissingRequiredSlots(missing);
      alert("Please upload all required infrastructure images before submitting your application.");
      return;
    }

    onNext({ images });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Hospital Infrastructure Images
        </h3>
        <p className="text-xs text-gray-500">
          Please upload clear images of your hospital infrastructure. These images help us better
          understand your facility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INFRASTRUCTURE_IMAGE_SLOTS.map((slot) => {
          const item = images[slot.id];
          const isMissing = missingRequiredSlots.includes(slot.id);
          const isDragging = draggingSlot === slot.id;

          return (
            <div key={slot.id} className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-800">
                {slot.label} {slot.required && <span className="text-red-500">*</span>}
              </label>

              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDraggingSlot(slot.id);
                }}
                onDragLeave={() => setDraggingSlot(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDraggingSlot(null);
                  handleFile(slot.id, e.dataTransfer.files?.[0]);
                }}
                className={`flex flex-col items-center justify-center min-h-[140px] px-4 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  isDragging
                    ? "border-[#2196F3] bg-blue-50/60"
                    : isMissing
                    ? "border-red-300 bg-red-50/20"
                    : item?.fileName
                    ? "border-emerald-300 bg-emerald-50/20"
                    : "border-gray-300 bg-gray-50/60 hover:border-[#2196F3] hover:bg-blue-50/20"
                }`}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFile(slot.id, e.target.files?.[0])}
                  className="hidden"
                />

                {item?.fileName ? (
                  <div className="flex flex-col items-center gap-2 w-full text-center">
                    {item.previewUrl && (
                      <img
                        src={item.previewUrl}
                        alt={slot.label}
                        className="max-h-24 max-w-full object-contain rounded-lg border border-gray-200 shadow-xs"
                      />
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[200px]">{item.fileName}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(slot.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <UploadCloud className="w-7 h-7 text-gray-400 mb-1" />
                    <span className="text-xs font-semibold text-[#1976D2]">Upload a file</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">
                      JPG, PNG, JPEG, PDF up to 10MB
                    </span>
                  </div>
                )}
              </label>

              {isMissing && (
                <div className="text-[11px] text-red-600 font-medium">This image is required</div>
              )}
            </div>
          );
        })}
      </div>

      <IndiaFormButtons
        onBack={onBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        submitText={isLastStep ? "Submit Application" : "Save"}
      />
    </form>
  );
}
