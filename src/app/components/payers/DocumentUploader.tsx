import { useState } from "react";
import { Upload, X, FileText } from "lucide-react";

interface DocumentUploaderProps {
  accept?: string;
  maxMB?: number;
  onFilesChange?: (files: File[]) => void;
}

export function DocumentUploader({ 
  accept = ".pdf,.jpg,.jpeg,.png", 
  maxMB = 10,
  onFilesChange 
}: DocumentUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const sizeInMB = file.size / (1024 * 1024);
      return sizeInMB <= maxMB;
    });

    const newFiles = [...files, ...validFiles];
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const sizeInMB = file.size / (1024 * 1024);
      return sizeInMB <= maxMB;
    });

    const newFiles = [...files, ...validFiles];
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  return (
    <div className="space-y-3">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-[#2196F3] bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            <span className="text-[#2196F3] font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            {accept.split(',').join(', ').toUpperCase()} (Max {maxMB}MB each)
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
