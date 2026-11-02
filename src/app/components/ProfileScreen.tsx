import { Eye, Mail, Phone, MapPin, Calendar, FileText, Building, ShieldCheck } from "lucide-react";

interface ProfileScreenProps {
  onEditCredentialing: () => void;
}

// Mock data - in real app this would come from the credentialing form submissions
const PROFILE_DATA = {
  personalInfo: {
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    middleName: "Marie",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "January 15, 1985",
    ssn: "***-**-4567",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94102"
    },
    w9Status: "Uploaded (W-9_Sarah_Johnson_Signed.pdf)",
    bankInfo: {
      bankName: "JPMorgan Chase Bank, N.A.",
      accountType: "Checking",
      accountHolder: "Dr. Sarah Johnson",
      routingNumber: "•••••4821",
      accountNumber: "••••••••5829"
    }
  }
};

export function ProfileScreen({ onEditCredentialing }: ProfileScreenProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">View and manage your personal information</p>
        </div>
        <button
          onClick={onEditCredentialing}
          className="flex items-center gap-2 px-4 py-2 border border-[#2196F3] text-[#2196F3] rounded-lg hover:bg-[#E3F2FD] transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Credentialing
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-[#2196F3]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
              Full Name
            </label>
            <p className="text-base font-medium text-gray-900">
              {PROFILE_DATA.personalInfo.firstName} {PROFILE_DATA.personalInfo.middleName} {PROFILE_DATA.personalInfo.lastName}
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
              Date of Birth
            </label>
            <div className="flex items-center gap-2 text-base font-medium text-gray-900">
              <Calendar className="w-4 h-4 text-gray-400" />
              {PROFILE_DATA.personalInfo.dateOfBirth}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
              Email Address
            </label>
            <div className="flex items-center gap-2 text-base font-medium text-gray-900">
              <Mail className="w-4 h-4 text-gray-400" />
              {PROFILE_DATA.personalInfo.email}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
              Phone Number
            </label>
            <div className="flex items-center gap-2 text-base font-medium text-gray-900">
              <Phone className="w-4 h-4 text-gray-400" />
              {PROFILE_DATA.personalInfo.phone}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
              Address
            </label>
            <div className="flex items-start gap-2 text-base font-medium text-gray-900">
              <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
              <span>
                {PROFILE_DATA.personalInfo.address.street}, {PROFILE_DATA.personalInfo.address.city}, {PROFILE_DATA.personalInfo.address.state} {PROFILE_DATA.personalInfo.address.zip}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
              Social Security Number
            </label>
            <p className="text-base font-medium text-gray-900">{PROFILE_DATA.personalInfo.ssn}</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block">
              Signed W-9 Form
            </label>
            <div className="flex items-center gap-2 text-base font-medium text-emerald-700">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>{PROFILE_DATA.personalInfo.w9Status}</span>
            </div>
          </div>
        </div>

        {/* Payment & Banking Information */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-2.5 mb-6">
            <Building className="w-5 h-5 text-[#2196F3]" />
            <h3 className="text-lg font-semibold text-gray-900">Payment &amp; Direct Deposit</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/70 p-5 rounded-xl border border-gray-100">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 block">
                Bank Name
              </label>
              <p className="text-sm font-semibold text-gray-900">{PROFILE_DATA.personalInfo.bankInfo.bankName}</p>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 block">
                Account Type
              </label>
              <p className="text-sm font-semibold text-gray-900">{PROFILE_DATA.personalInfo.bankInfo.accountType}</p>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 block">
                Account Holder
              </label>
              <p className="text-sm font-semibold text-gray-900">{PROFILE_DATA.personalInfo.bankInfo.accountHolder}</p>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 block">
                Routing &amp; Account Number
              </label>
              <p className="text-sm font-semibold text-gray-900">
                Routing: {PROFILE_DATA.personalInfo.bankInfo.routingNumber} | Acct: {PROFILE_DATA.personalInfo.bankInfo.accountNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}