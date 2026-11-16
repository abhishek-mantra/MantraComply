import { useState, useRef, useEffect } from "react";
import { Upload, X, ChevronDown, CheckCircle2, FileText } from "lucide-react";
import { IndiaFormButtons } from "./IndiaFormButtons";
import {
  INSURANCE_COMPANIES,
  MANDATORY_DOCUMENTS,
  OPTIONAL_DOCUMENTS,
} from "../../../config/indiaGicConfig";

interface DocumentationFormProps {
  initialData?: any;
  onNext: (data: any) => void;
  onBack?: () => void;
  isFirstStep?: boolean;
}

interface InsurerFileEntry {
  company: string;
  fileName?: string;
  file?: File;
}

export function DocumentationForm({
  initialData,
  onNext,
  onBack,
  isFirstStep = false,
}: DocumentationFormProps) {
  // Empaneled with any insurance company?
  const [empaneledWithInsurance, setEmpaneledWithInsurance] = useState<"Yes" | "No" | "">(
    initialData?.empaneledWithInsurance || "No"
  );

  // Selected insurers & their uploaded files
  const [selectedInsurers, setSelectedInsurers] = useState<string[]>(
    initialData?.selectedInsurers || []
  );
  const [insurerFiles, setInsurerFiles] = useState<Record<string, { fileName: string; file?: File }>>(
    initialData?.insurerFiles || {}
  );
  const [isInsurerDropdownOpen, setIsInsurerDropdownOpen] = useState(false);
  const insurerDropdownRef = useRef<HTMLDivElement>(null);

  // Uploaded documents: docName -> { fileName, file }
  const [mandatoryFiles, setMandatoryFiles] = useState<
    Record<string, { fileName: string; file?: File }>
  >(initialData?.mandatoryFiles || {});
  const [optionalFiles, setOptionalFiles] = useState<
    Record<string, { fileName: string; file?: File }>
  >(initialData?.optionalFiles || {});

  // Validation errors for missing mandatory uploads
  const [missingMandatoryDocs, setMissingMandatoryDocs] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        insurerDropdownRef.current &&
        !insurerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsInsurerDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleInsurer = (company: string) => {
    if (selectedInsurers.includes(company)) {
      setSelectedInsurers((prev) => prev.filter((c) => c !== company));
      setInsurerFiles((prev) => {
        const next = { ...prev };
        delete next[company];
        return next;
      });
    } else {
      setSelectedInsurers((prev) => [...prev, company]);
    }
  };

  const handleRemoveInsurer = (company: string) => {
    setSelectedInsurers((prev) => prev.filter((c) => c !== company));
    setInsurerFiles((prev) => {
      const next = { ...prev };
      delete next[company];
      return next;
    });
  };

  const handleInsurerFileUpload = (company: string, file: File | undefined) => {
    if (!file) return;
    setInsurerFiles((prev) => ({
      ...prev,
      [company]: { fileName: file.name, file },
    }));
  };

  const handleMandatoryUpload = (doc: string, file: File | undefined) => {
    if (!file) return;
    setMandatoryFiles((prev) => ({
      ...prev,
      [doc]: { fileName: file.name, file },
    }));
    setMissingMandatoryDocs((prev) => prev.filter((d) => d !== doc));
  };

  const handleOptionalUpload = (doc: string, file: File | undefined) => {
    if (!file) return;
    setOptionalFiles((prev) => ({
      ...prev,
      [doc]: { fileName: file.name, file },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!empaneledWithInsurance) {
      alert("Please specify if you are previously or currently empaneled with any Insurance company.");
      return;
    }

    // Validate mandatory documents: all 11 mandatory documents must be uploaded
    const missing: string[] = [];
    MANDATORY_DOCUMENTS.forEach((doc) => {
      if (!mandatoryFiles[doc]?.fileName) {
        missing.push(doc);
      }
    });

    if (missing.length > 0) {
      setMissingMandatoryDocs(missing);
      alert("Please upload all required mandatory documents before saving.");
      return;
    }

    onNext({
      empaneledWithInsurance,
      selectedInsurers: empaneledWithInsurance === "Yes" ? selectedInsurers : [],
      insurerFiles: empaneledWithInsurance === "Yes" ? insurerFiles : {},
      mandatoryFiles,
      optionalFiles,
    });
  };

  const insurerTriggerText =
    selectedInsurers.length === 0
      ? "Select insurance companies"
      : selectedInsurers.length === 1
      ? "1 insurance company selected"
      : `${selectedInsurers.length} insurance companies selected`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Empaneled With Insurance Question */}
      <div className="p-5 bg-[#E3F2FD]/40 border border-[#90CAF9] rounded-2xl space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Have you previously or currently empaneled with any Insurance company?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {(["Yes", "No"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-all ${
                  empaneledWithInsurance === opt
                    ? "border-[#2196F3] bg-white text-[#1976D2] font-medium shadow-xs"
                    : "border-gray-200 bg-white/70 hover:bg-white text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="empaneledWithInsurance"
                  value={opt}
                  required
                  checked={empaneledWithInsurance === opt}
                  onChange={() => setEmpaneledWithInsurance(opt)}
                  className="w-4 h-4 text-[#2196F3] focus:ring-[#2196F3]"
                />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Multi-select insurers if Yes */}
        {empaneledWithInsurance === "Yes" && (
          <div className="space-y-3 pt-2 border-t border-blue-200/60">
            <p className="text-xs text-gray-600">
              Please select all insurance companies you have a signed tariff / agreement with, and
              upload the latest version of the pricing document.
            </p>

            <div ref={insurerDropdownRef} className="relative max-w-md">
              <div
                onClick={() => setIsInsurerDropdownOpen(!isInsurerDropdownOpen)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl bg-white flex items-center justify-between cursor-pointer hover:border-gray-400 text-sm shadow-xs"
              >
                <span
                  className={
                    selectedInsurers.length > 0
                      ? "text-gray-900 font-medium"
                      : "text-gray-400"
                  }
                >
                  {insurerTriggerText}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isInsurerDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isInsurerDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-20 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-auto p-2">
                  <div className="space-y-1">
                    {INSURANCE_COMPANIES.map((ins) => {
                      const checked = selectedInsurers.includes(ins);
                      return (
                        <label
                          key={ins}
                          className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-blue-50 text-xs text-gray-800 ${
                            checked ? "bg-blue-50/70 font-medium text-[#1976D2]" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleToggleInsurer(ins)}
                            className="w-4 h-4 text-[#2196F3] rounded border-gray-300 focus:ring-[#2196F3]"
                          />
                          <span>{ins}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* List of selected insurer rows with upload */}
            {selectedInsurers.length > 0 && (
              <div className="space-y-2 mt-3">
                {selectedInsurers.map((ins) => {
                  const fileEntry = insurerFiles[ins];
                  return (
                    <div
                      key={ins}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-xs text-sm"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <FileText className="w-4 h-4 text-[#2196F3] shrink-0" />
                        <span className="font-medium text-gray-800 truncate">{ins}</span>
                        {fileEntry?.fileName && (
                          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-mono truncate max-w-xs">
                            {fileEntry.fileName}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2196F3] text-white rounded-lg text-xs font-medium hover:bg-[#1976D2] cursor-pointer transition-colors shadow-xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{fileEntry?.fileName ? "Replace File" : "Upload File"}</span>
                          <input
                            type="file"
                            accept=".pdf,.xlsx"
                            onChange={(e) => handleInsurerFileUpload(ins, e.target.files?.[0])}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleRemoveInsurer(ins)}
                          className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Remove insurer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <p className="text-[11px] text-gray-500 italic mt-1">
                  Only PDF or Excel (.xlsx) files up to 10MB are allowed.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mandatory Documents */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Mandatory Documents <span className="text-red-500">*</span>
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          All documents in this section are required for verification and compliance.
        </p>

        <div className="space-y-3">
          {MANDATORY_DOCUMENTS.map((doc) => {
            const uploaded = mandatoryFiles[doc];
            const isMissing = missingMandatoryDocs.includes(doc);

            return (
              <div
                key={doc}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border rounded-xl transition-all ${
                  isMissing
                    ? "border-red-300 bg-red-50/30"
                    : uploaded?.fileName
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="mb-2 sm:mb-0 pr-2">
                  <div className="text-sm font-medium text-gray-900">{doc}</div>
                  {uploaded?.fileName ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-sm">{uploaded.fileName}</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      PDF, JPG, JPEG, PNG files up to 5MB
                    </div>
                  )}
                  {isMissing && (
                    <div className="text-xs text-red-600 font-medium mt-1">
                      This document is required
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2196F3] text-white rounded-lg text-xs font-medium hover:bg-[#1976D2] cursor-pointer transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploaded?.fileName ? "Change" : "Upload"}</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleMandatoryUpload(doc, e.target.files?.[0])}
                      className="hidden"
                    />
                  </label>
                  {uploaded?.fileName && (
                    <button
                      type="button"
                      onClick={() => {
                        setMandatoryFiles((prev) => {
                          const next = { ...prev };
                          delete next[doc];
                          return next;
                        });
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional Documents */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Optional Documents (as per facility requirements)
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Upload any supporting licenses or registrations applicable to your facility.
        </p>

        <div className="space-y-3">
          {OPTIONAL_DOCUMENTS.map((doc) => {
            const uploaded = optionalFiles[doc];

            return (
              <div
                key={doc}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border rounded-xl transition-all ${
                  uploaded?.fileName
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="mb-2 sm:mb-0 pr-2">
                  <div className="text-sm font-medium text-gray-900">{doc}</div>
                  {uploaded?.fileName ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-sm">{uploaded.fileName}</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      PDF, JPG, JPEG, PNG files up to 5MB
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 cursor-pointer transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-gray-500" />
                    <span>{uploaded?.fileName ? "Change" : "Upload"}</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleOptionalUpload(doc, e.target.files?.[0])}
                      className="hidden"
                    />
                  </label>
                  {uploaded?.fileName && (
                    <button
                      type="button"
                      onClick={() => {
                        setOptionalFiles((prev) => {
                          const next = { ...prev };
                          delete next[doc];
                          return next;
                        });
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <IndiaFormButtons onBack={onBack} isFirstStep={isFirstStep} submitText="Save" />
    </form>
  );
}
