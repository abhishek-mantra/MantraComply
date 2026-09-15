import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  required,
  helperText,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (option === "None") {
      if (value.includes("None")) {
        onChange([]);
      } else {
        onChange(["None"]);
      }
      return;
    }

    const withoutNone = value.filter((v) => v !== "None");
    if (withoutNone.includes(option)) {
      onChange(withoutNone.filter((v) => v !== option));
    } else {
      onChange([...withoutNone, option]);
    }
  };

  const removeOption = (option: string) => {
    onChange(value.filter((v) => v !== option));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[46px] px-3.5 py-2 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#2196F3] focus-within:border-[#2196F3] cursor-pointer bg-white transition-all hover:border-gray-300 flex items-center justify-between"
      >
        <div className="flex flex-wrap gap-1.5 items-center flex-1 pr-2">
          {value.length === 0 ? (
            <span className="text-sm text-gray-400">{placeholder || "Select options..."}</span>
          ) : (
            value.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E3F2FD] text-[#2196F3] rounded-lg text-xs font-medium"
              >
                {item}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(item);
                  }}
                  className="text-[#2196F3] hover:text-[#1565C0] p-0.5 rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {helperText && <p className="text-xs text-gray-500 mt-1.5">{helperText}</p>}

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-auto py-1">
          {options.map((option) => {
            const isChecked = value.includes(option);
            return (
              <label
                key={option}
                className={`flex items-center px-3.5 py-2 cursor-pointer transition-colors text-sm ${
                  isChecked ? "bg-blue-50/50 text-[#2196F3] font-medium" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleOption(option)}
                  className="mr-2.5 w-4 h-4 text-[#2196F3] rounded border-gray-300 focus:ring-[#2196F3]"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
