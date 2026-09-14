import { useState } from "react";
import {
  CheckCircle,
  FileText,
  Clock,
  Mail,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useReferrals } from "../contexts/ReferralContext";

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
    <div className="max-w-4xl mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Success Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-10 text-center mb-6">
        <div className="mb-5">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-100">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1.5">
            Credentialing Application Submitted
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Your application and primary documentation have been queued for credentialing verification.
          </p>
        </div>

        <button
          onClick={onViewProfile}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-lg transition-colors text-xs font-medium"
        >
          View My Profile
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* PRIORITY BOOST CARD — CLEAN & MINIMALIST */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {isPriorityBoosted
                ? "Priority Review Active ⚡ (14–30 Day Turnaround)"
                : "Unlock Priority Review (14–30 Days)"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isPriorityBoosted
                ? "5 colleagues joined. Your file has been promoted to our expedited queue."
                : `Refer 5 colleagues to bypass the 60–90 day queue (${remainingCount} more needed).`}
            </p>
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              isPriorityBoosted
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-blue-50 text-[#2196F3] border-blue-100"
            }`}
          >
            {completedCount} / {targetCount} Joined
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isPriorityBoosted ? "bg-emerald-500" : "bg-[#2196F3]"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Inline Link & Quick Invite */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs">
            <span className="text-gray-400 mr-2 font-mono">Link:</span>
            <span className="text-gray-700 truncate font-mono select-all flex-1">{referralLink}</span>
            <button
              onClick={handleCopy}
              className="ml-2 text-[#2196F3] hover:text-[#1976D2] font-medium flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-blue-50"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <button
            onClick={() => navigate("/provider/referrals")}
            className="sm:shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-lg text-xs font-medium transition-colors"
          >
            Manage Referrals
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">What Happens Next?</h2>
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#2196F3]" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Primary Source Verification</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Our credentialing team verifies your state licenses, board certifications, malpractice coverage, and work history.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-gray-900 text-sm">Processing Time</h3>
                {isPriorityBoosted ? (
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    Fast-Tracked (14–30 Days)
                  </span>
                ) : (
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                    Standard: 60–90 Days
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                {isPriorityBoosted
                  ? "Priority review applied. Expected completion in 14–30 days with a dedicated analyst."
                  : "Standard review takes 60–90 days. Refer 5 colleagues using the card above to unlock 14–30 day expedited review."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Status Updates</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                You will receive email notifications at each milestone. Track individual payer statuses anytime under Active Insurance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormSubmittedScreen;
