import { CheckCircle, FileText, Clock, Mail, ArrowRight } from "lucide-react";

interface FormSubmittedScreenProps {
  onViewProfile: () => void;
}

export function FormSubmittedScreen({ onViewProfile }: FormSubmittedScreenProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center mb-6">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-[scale-in_0.3s_ease-out]">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Credentialing Application Submitted!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for completing your credentialing application. We've received all your information and will begin processing it shortly.
          </p>
        </div>

        <button
          onClick={onViewProfile}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors font-medium"
        >
          View My Profile
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* What Happens Next */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">What Happens Next?</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#2196F3]" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Application Review</h3>
              <p className="text-gray-600 text-sm">
                Our credentialing team will review your application and verify all submitted information, including licenses, certifications, and work history.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Processing Time</h3>
              <p className="text-gray-600 text-sm">
                The credentialing process typically takes 60-90 days. We'll keep you updated on the status throughout the process.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Stay Informed</h3>
              <p className="text-gray-600 text-sm">
                You'll receive email notifications at each stage of the process. You can also check your application status anytime in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Important Information</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#2196F3] mt-0.5">•</span>
            <span>Keep your licenses and certifications up to date. You'll be notified 60 days before any expiration dates.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2196F3] mt-0.5">•</span>
            <span>If you need to update any information, you can do so from your profile page.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2196F3] mt-0.5">•</span>
            <span>For urgent matters or questions, contact our credentialing team at credentialing@mantracomply.com</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
