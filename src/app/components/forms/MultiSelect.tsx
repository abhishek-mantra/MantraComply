import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

export function MultiSelect({ label, options, value, onChange, placeholder, required }: MultiSelectProps) {
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
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
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
        className="w-full min-h-[42px] px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-[#2196F3] focus-within:border-[#2196F3] cursor-pointer bg-white"
      >
        <div className="flex flex-wrap gap-1.5 items-center">
          {value.length === 0 ? (
            <span className="text-sm text-gray-500">{placeholder || "Select options..."}</span>
          ) : (
            value.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#E3F2FD] text-[#2196F3] rounded text-xs font-medium"
              >
                {item}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(item);
                  }}
                  className="hover:text-[#1976D2]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
          <ChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
              />
              <span className="text-sm text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
