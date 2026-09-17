import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Send,
  Plus,
  Trash2,
  Users,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useReferrals, ReferralInviteInput } from "../contexts/ReferralContext";

interface ColleagueRow {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function Referrals() {
  const {
    referrals,
    referralLink,
    targetCount,
    completedCount,
    remainingCount,
    isPriorityBoosted,
    addMultipleReferrals,
    simulateStatusChange,
    resendInvite,
    resetToDefaults,
  } = useReferrals();

  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Multi-invite rows
  const [rows, setRows] = useState<ColleagueRow[]>([
    { id: "row-1", name: "", email: "", phone: "" },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showToast("Referral link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: `row-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        name: "",
        email: "",
        phone: "",
      },
    ]);
  };

  const handleRemoveRow = (id: string) => {
    if (rows.length === 1) {
      setRows([{ id: "row-1", name: "", email: "", phone: "" }]);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRowChange = (id: string, field: keyof ColleagueRow, value: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSendInvites = (e: React.FormEvent) => {
    e.preventDefault();

    const validInvites: ReferralInviteInput[] = rows
      .filter((r) => r.email.trim() && r.email.includes("@"))
      .map((r) => ({
        name: r.name.trim() || r.email.split("@")[0],
        email: r.email.trim(),
        phone: r.phone.trim() || undefined,
      }));

    if (validInvites.length === 0) {
      showToast("Please enter at least one colleague's name and email");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = addMultipleReferrals(validInvites);
      setIsSubmitting(false);

      if (res.added > 0) {
        showToast(
          res.added === 1
            ? "Invite sent successfully"
            : `${res.added} colleague invites sent successfully`
        );
        setRows([{ id: "row-1", name: "", email: "", phone: "" }]);
      } else {
        showToast("The email address(es) provided have already been invited");
      }
    }, 300);
  };

  const filledCount = rows.filter((r) => r.email.trim().includes("@")).length;
  const progressPercent = Math.min(100, Math.round((completedCount / targetCount) * 100));

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-fade-in border border-gray-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Reset Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Refer &amp; Boost
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Fast-track your credentialing review from 60–90 days down to 14–30 days by inviting fellow healthcare providers.
          </p>
        </div>

        <button
          onClick={() => {
            resetToDefaults();
            showToast("Reset to default 3 joined referrals");
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-colors self-start sm:self-auto shadow-2xs"
          title="Reset to default demo data"
        >
          <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* 2. Executive Value Proposition Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-7 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Clear value explanation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-[#043570] border border-blue-100">
              <Clock className="w-3.5 h-3.5 text-[#043570]" />
              <span>Priority Credentialing Queue</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug">
              Reduce Your Payer Wait Time by up to 60 Days
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              Commercial insurance panels normally take 2 to 3 months to complete committee reviews. When you invite <strong>5 healthcare colleagues</strong> to MantraComply, our Credentials Verification Organization (CVO) promotes your file to our <strong>Priority Review Queue</strong> with dedicated daily payer follow-ups.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-5 text-xs font-medium text-gray-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>100% Free for Colleagues</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Real-Time Status Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Save 45–60 Wait Days</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Timeline Comparison */}
          <div className="lg:col-span-5 bg-gray-50/70 border border-gray-200 rounded-xl p-5 space-y-3.5">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Processing Pace Comparison
            </div>

            <div className="space-y-2.5">
              {/* Standard */}
              <div className="p-3.5 rounded-lg bg-white border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-gray-700">Standard Payer Queue</div>
                  <div className="text-[11px] text-gray-500">Normal insurer review batch</div>
                </div>
                <div className="text-sm font-semibold text-gray-400 line-through">
                  60 – 90 Days
                </div>
              </div>

              {/* Priority */}
              <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <span>Priority Review Queue</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      5 Referrals
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700/80">Proactive verification priority</div>
                </div>
                <div className="text-base font-bold text-emerald-700">
                  14 – 30 Days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Progress Overview Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>
                {isPriorityBoosted
                  ? "Priority Review Active (14–30 Days)"
                  : `${completedCount} of ${targetCount} Colleagues Joined`}
              </span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {isPriorityBoosted ? (
                <span className="text-emerald-700 font-medium">
                  Your application has been promoted to priority processing.
                </span>
              ) : (
                <span>
                  {remainingCount} more colleague{remainingCount === 1 ? "" : "s"} required to unlock expedited turnaround.
                </span>
              )}
            </p>
          </div>

          <span
            className={`self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded-md border ${
              isPriorityBoosted
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-blue-50 text-[#043570] border-blue-100"
            }`}
          >
            {isPriorityBoosted ? "Expedited Active" : `${progressPercent}% Complete`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isPriorityBoosted ? "bg-emerald-600" : "bg-[#043570]"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 4. Multi-Colleague Invite Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Invite Healthcare Colleagues
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Add provider names, work emails, and optional phone numbers to send invitations in a single batch.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddRow}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#043570] hover:text-[#2196F3] bg-blue-50 hover:bg-blue-100/80 px-3 py-2 rounded-lg border border-blue-200 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Colleague</span>
          </button>
        </div>

        <form onSubmit={handleSendInvites} className="space-y-4">
          {/* Dynamic Rows */}
          <div className="space-y-3">
            {rows.map((row, idx) => (
              <div
                key={row.id}
                className="p-3.5 rounded-lg border border-gray-200 bg-gray-50/50 hover:border-gray-300 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium text-gray-700">Colleague {idx + 1}</span>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(row.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                      title="Remove this colleague"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Name */}
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={row.name}
                      onChange={(e) => handleRowChange(row.id, "name", e.target.value)}
                      className="w-full text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
                    />
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-medium text-gray-700 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="s.jenkins@hospital.org"
                      value={row.email}
                      onChange={(e) => handleRowChange(row.id, "email", e.target.value)}
                      className="w-full text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
                    />
                  </div>

                  {/* Phone (Optional) */}
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={row.phone}
                      onChange={(e) => handleRowChange(row.id, "phone", e.target.value)}
                      className="w-full text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Direct Link */}
            <div className="w-full sm:w-auto flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs">
              <span className="text-gray-500 mr-2 font-medium">Link:</span>
              <span className="text-gray-700 truncate font-mono select-all flex-1">
                {referralLink}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="ml-2 text-[#043570] hover:text-[#2196F3] font-medium flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-gray-100"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Link"}</span>
              </button>
            </div>

            {/* Batch Send Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#043570] hover:bg-[#032855] text-white rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSubmitting
                  ? "Sending Invites..."
                  : filledCount > 1
                  ? `Send ${filledCount} Invites & Boost Queue`
                  : "Send Invite & Boost Queue"}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* 5. Invited Colleagues Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              Invited Colleagues ({referrals.length})
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {completedCount} joined • {remainingCount} more needed for Priority Review
            </p>
          </div>

          <span className="text-xs font-medium text-gray-600">
            Target: {targetCount} Joined
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Colleague
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {referrals.map((ref) => {
                const isDone = ref.status === "Signed Up" || ref.status === "Credentialing Started";

                return (
                  <tr key={ref.id} className="hover:bg-gray-50 transition-colors text-xs">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-xs shrink-0 ${
                            isDone
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {ref.name[0] || "C"}
                        </div>
                        <div className="font-medium text-gray-900">
                          {ref.name}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-3.5 text-gray-600">
                      <div>{ref.email}</div>
                      {ref.phone && <div className="text-gray-400 text-[11px]">{ref.phone}</div>}
                    </td>

                    <td className="px-6 py-3.5">
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Joined
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          Invite Sent
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!isDone && (
                          <button
                            onClick={() => {
                              resendInvite(ref.id);
                              showToast(`Invite resent to ${ref.email}`);
                            }}
                            className="text-gray-600 hover:text-gray-900 font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                          >
                            Resend
                          </button>
                        )}

                        {!isDone && (
                          <button
                            onClick={() => {
                              simulateStatusChange(ref.id, "Signed Up");
                              showToast(`${ref.name} signed up`);
                            }}
                            className="text-[#043570] hover:text-[#2196F3] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            title="Simulate this colleague signing up (for demo)"
                          >
                            Simulate Join
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Referrals;
