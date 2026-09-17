import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";

export interface DateInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

function parseDateString(dateStr: string): Date | undefined {
  if (!dateStr) return undefined;
  // Handle MM/DD/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [mm, dd, yyyy] = dateStr.split("/").map(Number);
    const d = new Date(yyyy, mm - 1, dd);
    if (!isNaN(d.getTime()) && d.getMonth() === mm - 1 && d.getDate() === dd) {
      return d;
    }
  }
  // Handle YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [yyyy, mm, dd] = dateStr.split("-").map(Number);
    const d = new Date(yyyy, mm - 1, dd);
    if (!isNaN(d.getTime())) {
      return d;
    }
  }
  // Fallback
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d;
}

function formatDateToUS(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  return `${mm}/${dd}/${yyyy}`;
}

function maskDateInput(val: string): string {
  const digits = val.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function DateInput({
  value = "",
  onChange,
  placeholder = "mm/dd/yyyy",
  className = "",
  required = false,
  disabled = false,
  id,
  name,
}: DateInputProps) {
  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState(() => {
    if (!value) return "";
    const parsed = parseDateString(value);
    return parsed ? formatDateToUS(parsed) : value;
  });

  // Sync display value when incoming prop changes
  useEffect(() => {
    if (!value) {
      setDisplayValue("");
      return;
    }
    const parsed = parseDateString(value);
    if (parsed) {
      setDisplayValue(formatDateToUS(parsed));
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const masked = maskDateInput(rawVal);
    setDisplayValue(masked);
    onChange(masked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If user presses slash after entering month or day, pad if needed
    if (e.key === "/" && (displayValue.length === 1 || displayValue.length === 2)) {
      e.preventDefault();
      const padded = displayValue.padStart(2, "0") + "/";
      setDisplayValue(padded);
      onChange(padded);
    } else if (e.key === "/" && (displayValue.length === 4 || displayValue.length === 5)) {
      const parts = displayValue.split("/");
      if (parts.length === 2 && parts[1].length === 1) {
        e.preventDefault();
        const padded = `${parts[0]}/${parts[1].padStart(2, "0")}/`;
        setDisplayValue(padded);
        onChange(padded);
      }
    }
  };

  const selectedDate = parseDateString(displayValue);

  return (
    <div className="relative w-full">
      <input
        type="text"
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={10}
        autoComplete="off"
        className={`w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm placeholder:text-gray-400 bg-white transition-colors ${
          disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-900"
        } ${className}`}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#2196F3] disabled:opacity-40 disabled:hover:text-gray-400 transition-colors rounded cursor-pointer"
            title="Open calendar"
          >
            <CalendarIcon className="w-4 h-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white border border-gray-200 shadow-xl rounded-xl z-50"
          align="end"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                const formatted = formatDateToUS(date);
                setDisplayValue(formatted);
                onChange(formatted);
                setOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateInput;
