import { useState } from "react";
import {
  Zap,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Send,
  Plus,
} from "lucide-react";
import { useReferrals } from "../contexts/ReferralContext";

export function Referrals() {
  const {
    referrals,
    referralLink,
    targetCount,
    completedCount,
    remainingCount,
    isPriorityBoosted,
    addReferral,
    simulateStatusChange,
    resendInvite,
    resetToDefaults,
  } = useReferrals();

  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showToast("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const success = addReferral("", inviteEmail.trim());
      setIsSubmitting(false);

      if (success) {
        showToast(`Invite sent to ${inviteEmail.trim()}`);
        setInviteEmail("");
      } else {
        showToast("This email has already been invited");
      }
    }, 250);
  };

  const progressPercent = Math.min(100, Math.round((completedCount / targetCount) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Referrals</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Refer 5 colleagues to unlock Priority Review (14–30 day turnaround).
          </p>
        </div>

        <button
          onClick={() => {
            resetToDefaults();
            showToast("Reset to 3 joined referrals");
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-lg transition-colors"
          title="Reset demo data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo
        </button>
      </div>

      {/* Progress & Sharing Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        {/* Top: Milestone Counter */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {completedCount} of {targetCount} Colleagues Joined
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isPriorityBoosted ? (
                <span className="text-emerald-600 font-medium">
                  Priority Review active — your application is expedited (14–30 days).
                </span>
              ) : (
                <span>
                  {remainingCount} more colleague{remainingCount === 1 ? "" : "s"} needed to unlock Priority Review.
                </span>
              )}
            </p>
          </div>

          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              isPriorityBoosted
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold"
                : "bg-blue-50 text-[#2196F3] border-blue-100"
            }`}
          >
            {isPriorityBoosted ? "Priority Active ⚡" : `${progressPercent}% Complete`}
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isPriorityBoosted ? "bg-emerald-500" : "bg-[#2196F3]"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 5 Milestone Slots */}
        <div className="grid grid-cols-5 gap-3 py-4 border-y border-gray-100 mb-6">
          {[1, 2, 3, 4, 5].map((slot) => {
            const isCompleted = completedCount >= slot;
            const isFinal = slot === 5;
            const ref = referrals[slot - 1];

            return (
              <div key={slot} className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold mb-1.5 transition-all ${
                    isCompleted
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                      : isFinal
                      ? "bg-blue-50 text-[#2196F3] border-2 border-dashed border-[#2196F3]"
                      : "bg-gray-50 text-gray-400 border border-dashed border-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : isFinal ? (
                    <Zap className="w-4 h-4 fill-current" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-300" />
                  )}
                </div>

                <div className="text-xs font-medium text-gray-900 truncate max-w-[90px]">
                  {isCompleted && ref ? ref.name.replace("Dr. ", "") : isFinal ? "Priority" : `Colleague ${slot}`}
                </div>

                <div className="text-[11px] text-gray-400">
                  {isCompleted ? "Joined" : isFinal ? "14–30 Days" : "Pending"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Invite & Share Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          {/* Referral Link Box */}
          <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs">
            <span className="text-gray-400 mr-2 font-mono">Link:</span>
            <span className="text-gray-700 truncate font-mono select-all flex-1">
              {referralLink}
            </span>
            <button
              onClick={handleCopyLink}
              className="ml-2 text-[#2196F3] hover:text-[#1976D2] font-medium flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-blue-50"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Direct Email Invite */}
          <form onSubmit={handleSendInvite} className="flex gap-2 sm:w-80">
            <input
              type="email"
              placeholder="Colleague's work email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
            >
              <Send className="w-3 h-3" />
              Invite
            </button>
          </form>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">
            Invited Colleagues ({referrals.length})
          </h3>
          <span className="text-xs text-gray-500">
            {completedCount} joined • {remainingCount} to unlock Priority
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {referrals.map((ref) => {
            const isDone = ref.status === "Signed Up" || ref.status === "Credentialing Started";

            return (
              <div key={ref.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50/70 transition-colors text-xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${
                      isDone
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {ref.name[0] || "D"}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{ref.name}</div>
                    <div className="text-gray-400 font-mono text-[11px]">{ref.email}</div>
                  </div>
                </div>

                <div className="hidden sm:block text-gray-500 text-left">
                  {ref.specialty}
                </div>

                <div className="flex items-center gap-3">
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Joined
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      Invite Sent
                    </span>
                  )}

                  {!isDone && (
                    <button
                      onClick={() => {
                        simulateStatusChange(ref.id, "Signed Up");
                        showToast(`${ref.name} signed up!`);
                      }}
                      className="text-[11px] text-[#2196F3] hover:text-[#1976D2] font-medium px-2 py-0.5 rounded bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
                      title="Simulate this colleague joining"
                    >
                      Simulate ⚡
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Referrals;
