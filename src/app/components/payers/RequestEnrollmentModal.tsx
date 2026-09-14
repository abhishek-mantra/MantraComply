import { useState, useRef, useEffect } from "react";
import { X, Search, ChevronDown } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  specialty: string;
  npi: string;
  tin: string;
  groupName?: string;
  activeEnrollments: number;
  currentPayers: string[];
}

interface PayerState {
  id: string;
  name: string;
  state: string;
  type: "Commercial" | "Government" | "Managed Care";
}

interface RequestEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  providers: Provider[];
  onSubmit: (data: {
    selectedProvider: string;
    selectedPayers: string[];
    notes: string;
  }) => void;
  preSelectedProvider?: string;
  payers?: any[];
}

// Realistic payer options with states
const PAYER_OPTIONS: PayerState[] = [
  // Aetna
  { id: "aetna-ca", name: "Aetna", state: "CA", type: "Commercial" },
  { id: "aetna-ny", name: "Aetna", state: "NY", type: "Commercial" },
  { id: "aetna-tx", name: "Aetna", state: "TX", type: "Commercial" },
  { id: "aetna-fl", name: "Aetna", state: "FL", type: "Commercial" },
  { id: "aetna-il", name: "Aetna", state: "IL", type: "Commercial" },
  
  // Blue Cross Blue Shield
  { id: "bcbs-ca", name: "Blue Cross Blue Shield", state: "CA", type: "Commercial" },
  { id: "bcbs-ny", name: "Blue Cross Blue Shield", state: "NY", type: "Commercial" },
  { id: "bcbs-tx", name: "Blue Cross Blue Shield", state: "TX", type: "Commercial" },
  { id: "bcbs-fl", name: "Blue Cross Blue Shield", state: "FL", type: "Commercial" },
  { id: "bcbs-ma", name: "Blue Cross Blue Shield", state: "MA", type: "Commercial" },
  
  // UnitedHealthcare
  { id: "uhc-ca", name: "UnitedHealthcare", state: "CA", type: "Commercial" },
  { id: "uhc-ny", name: "UnitedHealthcare", state: "NY", type: "Commercial" },
  { id: "uhc-tx", name: "UnitedHealthcare", state: "TX", type: "Commercial" },
  { id: "uhc-fl", name: "UnitedHealthcare", state: "FL", type: "Commercial" },
  { id: "uhc-il", name: "UnitedHealthcare", state: "IL", type: "Commercial" },
  
  // Cigna
  { id: "cigna-ca", name: "Cigna", state: "CA", type: "Commercial" },
  { id: "cigna-ny", name: "Cigna", state: "NY", type: "Commercial" },
  { id: "cigna-tx", name: "Cigna", state: "TX", type: "Commercial" },
  { id: "cigna-fl", name: "Cigna", state: "FL", type: "Commercial" },
  
  // Humana
  { id: "humana-ca", name: "Humana", state: "CA", type: "Commercial" },
  { id: "humana-tx", name: "Humana", state: "TX", type: "Commercial" },
  { id: "humana-fl", name: "Humana", state: "FL", type: "Commercial" },
  
  // Medicare/Medicaid
  { id: "medicare-ca", name: "Medicare", state: "CA", type: "Government" },
  { id: "medicare-ny", name: "Medicare", state: "NY", type: "Government" },
  { id: "medicare-tx", name: "Medicare", state: "TX", type: "Government" },
  { id: "medicaid-ca", name: "Medicaid", state: "CA", type: "Government" },
  { id: "medicaid-ny", name: "Medicaid", state: "NY", type: "Government" },
  { id: "medicaid-tx", name: "Medicaid", state: "TX", type: "Government" },
];

export function RequestEnrollmentModal({
  isOpen,
  onClose,
  providers,
  onSubmit,
  preSelectedProvider,
}: RequestEnrollmentModalProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [searchPayer, setSearchPayer] = useState("");
  const [selectedPayers, setSelectedPayers] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [showPayerDropdown, setShowPayerDropdown] = useState(false);
  const [createAnother, setCreateAnother] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pre-fill provider when preSelectedProvider is provided
  useEffect(() => {
    if (preSelectedProvider && isOpen) {
      setSelectedProvider(preSelectedProvider);
    }
  }, [preSelectedProvider, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPayerDropdown(false);
      }
    };

    if (showPayerDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPayerDropdown]);

  if (!isOpen) return null;

  const selectedProviderObject = providers.find((p) => p.id === selectedProvider);

  // Check if a payer is already enrolled for the selected provider
  const isPayerEnrolled = (payerState: PayerState) => {
    if (!selectedProviderObject) return false;
    // Check if provider is enrolled in this payer (name + state combination)
    return selectedProviderObject.currentPayers.some(
      (enrolled) => enrolled.toLowerCase().includes(payerState.name.toLowerCase())
    );
  };

  const filteredPayers = PAYER_OPTIONS.filter((payer) => {
    const searchTerm = searchPayer.toLowerCase();
    const matchesSearch =
      payer.name.toLowerCase().includes(searchTerm) ||
      payer.state.toLowerCase().includes(searchTerm);
    return matchesSearch;
  });

  const togglePayer = (id: string) => {
    setSelectedPayers((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!selectedProvider || selectedPayers.length === 0) return;
    
    onSubmit({
      selectedProvider,
      selectedPayers,
      notes,
    });
    
    // Reset state
    setSelectedProvider("");
    setSelectedPayers([]);
    setNotes("");
    setSearchPayer("");
    if (!createAnother) {
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedProvider("");
    setSelectedPayers([]);
    setNotes("");
    setSearchPayer("");
    onClose();
  };

  const selectedPayerObjects = PAYER_OPTIONS.filter((p) => selectedPayers.includes(p.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Request a New Payer Enrollment</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">{/* Removed flex-1 and overflow-y-auto to prevent main scroll */}
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Who is this enrollment for? <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => {
                setSelectedProvider(e.target.value);
                setSelectedPayers([]); // Reset payer selection when provider changes
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
            >
              <option value="">Select provider...</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} — {provider.specialty} (NPI: {provider.npi})
                </option>
              ))}
            </select>
            
            {selectedProviderObject && (
              <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Provider Details</div>
                <div className="text-sm text-gray-900">
                  <span className="font-medium">{selectedProviderObject.name}</span>
                  {selectedProviderObject.groupName && (
                    <span className="text-gray-600"> • {selectedProviderObject.groupName}</span>
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  NPI: {selectedProviderObject.npi} | TIN: {selectedProviderObject.tin}
                </div>
              </div>
            )}
          </div>

          {/* Payer Selection */}
          {selectedProvider && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Payer(s) <span className="text-red-500">*</span>
              </label>
              
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search for payers..."
                    value={searchPayer}
                    onChange={(e) => {
                      setSearchPayer(e.target.value);
                      setShowPayerDropdown(e.target.value.length > 0);
                    }}
                    onFocus={() => searchPayer.length > 0 && setShowPayerDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm"
                  />
                </div>

                {/* Dropdown List - Shows max 4 items at once */}
                {showPayerDropdown && filteredPayers.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden" ref={dropdownRef} style={{ maxHeight: '240px' }}>
                    <div className="overflow-y-auto" style={{ maxHeight: '240px' }}>
                      {filteredPayers.map((payer) => {
                        const enrolled = isPayerEnrolled(payer);
                        const selected = selectedPayers.includes(payer.id);
                        
                        return (
                          <button
                            key={payer.id}
                            onClick={() => {
                              if (!enrolled) {
                                togglePayer(payer.id);
                              }
                            }}
                            disabled={enrolled}
                            className={`w-full text-left px-4 py-2.5 border-b border-gray-100 last:border-b-0 transition-colors ${
                              enrolled
                                ? "bg-gray-50 cursor-not-allowed opacity-50"
                                : selected
                                ? "bg-blue-50 hover:bg-blue-100"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">
                                  {payer.name} — {payer.state}
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5">
                                  {payer.type}
                                </div>
                              </div>
                              {enrolled && (
                                <div className="text-xs text-gray-500 ml-2">
                                  Already Enrolled
                                </div>
                              )}
                              {selected && !enrolled && (
                                <div className="w-5 h-5 bg-[#2196F3] rounded flex items-center justify-center ml-2">
                                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Payers */}
              {selectedPayerObjects.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs text-blue-900 font-medium mb-2">
                    Selected Payers ({selectedPayerObjects.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPayerObjects.map((payer) => (
                      <div
                        key={payer.id}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-md text-sm"
                      >
                        <span className="text-gray-900">
                          {payer.name} — {payer.state}
                        </span>
                        <button
                          onClick={() => togglePayer(payer.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          {selectedProvider && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Notes <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any additional notes or special instructions..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm resize-none"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={createAnother}
              onChange={(e) => setCreateAnother(e.target.checked)}
              className="w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
            />
            <span className="text-sm text-gray-700">Create another request after submission</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedProvider || selectedPayers.length === 0}
              className="px-5 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}