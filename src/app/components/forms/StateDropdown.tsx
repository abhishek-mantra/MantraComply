import { useState, useRef, useEffect } from "react";

interface StateDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia"
];

export function StateDropdown({ value, onChange, className = "" }: StateDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(value || "");
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

  const handleSelect = (state: string) => {
    setSelectedState(state);
    onChange?.(state);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm text-left bg-white flex items-center justify-between"
      >
        <span className={selectedState ? "text-gray-900" : "text-gray-500"}>
          {selectedState || "Select state"}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div
            className="px-3 py-2 text-sm text-[#2196F3] bg-blue-50 cursor-pointer hover:bg-blue-100"
            onClick={() => handleSelect("")}
          >
            Select state
          </div>
          {US_STATES.map((state) => (
            <div
              key={state}
              onClick={() => handleSelect(state)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                selectedState === state ? "bg-blue-50 text-[#2196F3]" : "text-gray-900"
              }`}
            >
              {state}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
