import { Eye, Mail, Phone, MapPin, Calendar } from "lucide-react";

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
    }
  }
};

export function ProfileScreen({ onEditCredentialing }: ProfileScreenProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
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
        </div>
      </div>
    </div>
  );
}