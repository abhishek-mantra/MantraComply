import { useState } from "react";
import {
  CheckCircle,
  FileText,
  Clock,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { ReferralBoostModal } from "./ReferralBoostModal";

interface FormSubmittedScreenProps {
  onViewProfile: () => void;
}

export function FormSubmittedScreen({ onViewProfile }: FormSubmittedScreenProps) {
  const navigate = useNavigate();

  // Auto-open Refer & Boost modal popup on form completion
  const [isBoostPopupOpen, setIsBoostPopupOpen] = useState(true);

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      {/* Refer & Boost Modal Popup (Automatically triggered on submission) */}
      <ReferralBoostModal
        isOpen={isBoostPopupOpen}
        onClose={() => setIsBoostPopupOpen(false)}
      />

      {/* 1. Success Header */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 sm:p-10 text-center">
        <div className="mb-5">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-100 shadow-2xs">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Credentialing Application Submitted
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Your application and primary documentation have been queued for credentialing verification.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onViewProfile}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#043570] hover:bg-[#06428c] text-white rounded-xl transition-all text-xs sm:text-sm font-semibold shadow-xs cursor-pointer"
          >
            <span>View My Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate("/provider/referrals")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#043570] border border-blue-200 rounded-xl transition-colors text-xs sm:text-sm font-semibold shadow-2xs cursor-pointer"
          >
            <Clock className="w-4 h-4 text-[#043570]" />
            <span>Refer &amp; Expedite (14–30 Days)</span>
          </button>
        </div>
      </div>

      {/* 2. What Happens Next Walkthrough */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">What Happens Next?</h2>
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                <FileText className="w-5 h-5 text-[#043570]" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Primary Source Verification</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our credentialing coordinators verify your licenses, education, board certification, and malpractice coverage with issuing authorities.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                <Clock className="w-5 h-5 text-[#043570]" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Payer Application Submissions</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Once attested, your files are submitted to each selected commercial or government health plan via CAQH and Availity.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                <Mail className="w-5 h-5 text-[#043570]" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Status Notifications &amp; Actions</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                You will receive automated updates at each milestone. If a payer requests additional documentation, an alert will appear in your Tasks tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormSubmittedScreen;
