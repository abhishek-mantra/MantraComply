import { Plus, Upload } from "lucide-react";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

interface GroupProfileFormsProps {
  activeStep: number;
  onNext: () => void;
  showToast: (message: string, type: string) => void;
}

export function GroupProfileForms({ activeStep, onNext, showToast }: GroupProfileFormsProps) {
  return (
    <>
      {/* Step 2 - Financial Info */}
      {activeStep === 2 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Financial Info</h2>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID / EIN
                </label>
                <input
                  type="text"
                  placeholder="12-3456789"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  W-9 Tax Classification
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none">
                  <option value="">Select classification...</option>
                  <option>Individual/Sole proprietor</option>
                  <option>C Corporation</option>
                  <option>S Corporation</option>
                  <option>Partnership</option>
                  <option>Trust/estate</option>
                  <option>LLC</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none">
                      <option value="">Select state...</option>
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      placeholder="12345"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="sameAddress" className="w-4 h-4 text-[#2196F3] border-gray-300 rounded" />
              <label htmlFor="sameAddress" className="text-sm text-gray-700">Remittance address same as billing</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="paymentMethod" value="eft" className="w-4 h-4 text-[#2196F3]" />
                  <span className="text-sm">EFT</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="paymentMethod" value="check" className="w-4 h-4 text-[#2196F3]" />
                  <span className="text-sm">Check</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Accounts Receivable Contact Name <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Contact name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Accounts Receivable Contact Email <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="email"
                  placeholder="ar@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  showToast("Financial info saved", "success");
                  onNext();
                }}
                className="px-6 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 3 - Operational Info */}
      {activeStep === 3 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Operational Info</h2>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Primary Fax <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Contact Email</label>
                <input
                  type="email"
                  placeholder="contact@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Website URL <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credentialing Contact Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credentialing Contact Email</label>
                <input
                  type="email"
                  placeholder="credentialing@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing / Enrollment Contact Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing / Enrollment Contact Email</label>
                <input
                  type="email"
                  placeholder="billing@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Accepting New Patients</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                </label>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Telehealth Available</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  showToast("Operational info saved", "success");
                  onNext();
                }}
                className="px-6 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 4 - Group Officials */}
      {activeStep === 4 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Group Officials</h2>
            <button
              onClick={() => showToast("Add another official", "info")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Official
            </button>
          </div>
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title / Role</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none">
                    <option value="">Select role...</option>
                    <option>CEO</option>
                    <option>Medical Director</option>
                    <option>CFO</option>
                    <option>Compliance Officer</option>
                    <option>Authorized Signatory</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="johndoe@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="authorizedSigner" className="w-4 h-4 text-[#2196F3] border-gray-300 rounded" />
                <label htmlFor="authorizedSigner" className="text-sm text-gray-700">Is Authorized Signer?</label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Ownership Percentage <span className="text-gray-400">- optional</span>
                  </label>
                  <input
                    type="number"
                    placeholder="25"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  showToast("Group officials saved", "success");
                  onNext();
                }}
                className="px-6 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 5 - External Accounts */}
      {activeStep === 5 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">External Accounts</h2>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  CAQH Organization ID <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter CAQH ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Medicare PTAN <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter PTAN"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PECOS Enrollment Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none">
                  <option value="">Select status...</option>
                  <option>Enrolled</option>
                  <option>Pending</option>
                  <option>Not enrolled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  TRICARE Provider ID <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter TRICARE ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  EDI Submitter ID <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter EDI ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Clearinghouse Name <span className="text-gray-400">- optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter clearinghouse name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Medicaid Provider Numbers</h3>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Provider Number"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none">
                    <option value="">State...</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => showToast("Add another Medicaid entry", "info")}
                  className="text-sm text-[#2196F3] hover:underline"
                >
                  + Add another Medicaid entry
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  showToast("External accounts saved", "success");
                  onNext();
                }}
                className="px-6 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 6 - Practice Locations */}
      {activeStep === 6 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Practice Locations</h2>
            <button
              onClick={() => showToast("Add another location", "info")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Location
            </button>
          </div>
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                  <input
                    type="text"
                    placeholder="Main Office"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Is Primary Location?</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                  </label>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Physical Address</label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none">
                    <option value="">State...</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="ZIP"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Fax <span className="text-gray-400">- optional</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">ADA / Wheelchair Accessible</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Accepting New Patients</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2196F3]"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  showToast("Practice locations saved", "success");
                  onNext();
                }}
                className="px-6 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 7 - Documents */}
      {activeStep === 7 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Documents</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: "IRS Form W-9", required: true, description: "Current W-9 tax form" },
              { name: "Articles of Incorporation", required: true, description: "Official incorporation documents" },
              { name: "State Business License", required: true, description: "Valid business license" },
              { name: "Malpractice / Liability Insurance Certificate", required: true, description: "Current insurance certificate" },
              { name: "Group NPI Confirmation Letter", required: true, description: "NPI verification letter" },
              { name: "IRS EIN Determination Letter", required: false, description: "EIN assignment letter" },
              { name: "Accreditation Certificate (NCQA, JCAHO, etc.)", required: false, description: "If applicable" },
              { name: "Voided Check (for EFT setup)", required: false, description: "For electronic payments" },
            ].map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{doc.name}</h3>
                      {doc.required && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Required
                        </span>
                      )}
                      {!doc.required && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2196F3] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <button className="text-[#2196F3] hover:underline">Click to upload</button> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                onClick={() => showToast("All documents uploaded successfully", "success")}
                className="px-6 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
