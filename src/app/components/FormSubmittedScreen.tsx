import { useState } from "react";
import {
  CheckCircle,
  CheckCircle2,
  FileText,
  Clock,
  Mail,
  ArrowRight,
  Copy,
  Check,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useReferrals } from "../contexts/ReferralContext";
import { ReferralBoostModal } from "./ReferralBoostModal";

interface FormSubmittedScreenProps {
  onViewProfile: () => void;
}

export function FormSubmittedScreen({ onViewProfile }: FormSubmittedScreenProps) {
  const navigate = useNavigate();
  const {
    referralLink,
    completedCount,
    targetCount,
    remainingCount,
    isPriorityBoosted,
  } = useReferrals();

  // Auto-open Refer & Boost modal popup on form completion
  const [isBoostPopupOpen, setIsBoostPopupOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showToast("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.min(100, Math.round((completedCount / targetCount) * 100));

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-fade-in border border-gray-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

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

          {!isPriorityBoosted && (
            <button
              onClick={() => setIsBoostPopupOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#043570] border border-blue-200 rounded-lg transition-colors text-xs sm:text-sm font-medium shadow-2xs"
            >
              <Clock className="w-4 h-4 text-[#043570]" />
              <span>Fast-Track Review (14–30 Days)</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Priority Boost Queue Banner */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-blue-50 text-[#043570] border border-blue-100">
                <Clock className="w-4 h-4 text-[#043570]" />
              </span>
              <h2 className="text-base font-semibold text-gray-900">
                {isPriorityBoosted
                  ? "Priority Review Active (14–30 Day Turnaround)"
                  : "Accelerate to 14–30 Day Priority Review"}
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {isPriorityBoosted
                ? "5 colleagues joined. Your file has been promoted to our priority queue."
                : `Invite 5 colleagues to bypass the 60–90 day queue (${remainingCount} more needed).`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                isPriorityBoosted
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-blue-50 text-[#043570] border-blue-100"
              }`}
            >
              {completedCount} / {targetCount} Joined
            </span>

            <button
              onClick={() => setIsBoostPopupOpen(true)}
              className="text-xs font-medium px-3 py-1 bg-[#043570] text-white hover:bg-[#032855] rounded-md transition-colors"
            >
              Open Referral Modal
            </button>
          </div>
        </div>

        {/* Clean Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isPriorityBoosted ? "bg-emerald-600" : "bg-[#043570]"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Link & Direct Action */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-gray-500 mr-2 font-medium">Share Link:</span>
            <span className="text-gray-700 truncate font-mono select-all flex-1">{referralLink}</span>
            <button
              onClick={handleCopy}
              className="ml-2 text-[#043570] hover:text-[#2196F3] font-medium flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-gray-100"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <button
            onClick={() => navigate("/provider/referrals")}
            className="sm:shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium transition-colors"
          >
            <span>View All Referrals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. What Happens Next Walkthrough */}
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
