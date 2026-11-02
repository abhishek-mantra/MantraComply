import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: string;
  onChange?: (newPriority: 'High' | 'Medium' | 'Low') => void;
  interactive?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ 
  priority, 
  onChange,
  interactive = true 
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStyle = (p: string) => {
    switch (p) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';
      case 'Low':
      case 'Standard':
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';
    }
  };

  const options: Array<'High' | 'Medium' | 'Low'> = ['High', 'Medium', 'Low'];
  const displayLabel = priority === 'Standard' ? 'Low' : (priority || 'Low');

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        disabled={!interactive || !onChange}
        onClick={() => interactive && onChange && setOpen(!open)}
        className={`inline-flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
          interactive && onChange ? 'cursor-pointer shadow-2xs' : 'cursor-default'
        } min-w-[82px] ${getStyle(displayLabel)}`}
        title="Click to change priority"
      >
        <span>{displayLabel}</span>
        {interactive && onChange && <ChevronDown size={11} className="opacity-70" />}
      </button>

      {open && interactive && onChange && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-28 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 text-center font-semibold text-xs tracking-wide overflow-hidden animate-in fade-in duration-150">
          {options.map((option) => {
            const isSelected = option === displayLabel;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full py-1.5 px-2 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
