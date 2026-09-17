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
  CheckCircle,
  Zap,
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

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-sm font-semibold animate-fade-in border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Provider Growth &amp; Acceleration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Refer &amp; Boost
          </h1>
        </div>

        <button
          onClick={() => {
            resetToDefaults();
            showToast("Reset to default 3 joined referrals");
          }}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          title="Reset to default demo data"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* HERO: VISUAL SPEED COMPARISON GAUGE & 5-SEAT MILESTONE STEPPER            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 shadow-xs space-y-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#043570] border border-blue-100">
              <Zap className="size-3.5 text-amber-500 fill-amber-500" />
              <span>Priority Credentialing Queue</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Skip 60 Days of Payer Waiting Time
            </h2>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
              Commercial insurance panels normally take 2 to 3 months. When you invite <strong>5 healthcare peers</strong> to MantraComply, our CVO elevates your file to daily proactive committee follow-ups.
            </p>

            {/* 3 Value Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                <CheckCircle className="size-4 text-emerald-600" />
                <span>Save 45–60 Wait Days</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                <CheckCircle className="size-4 text-emerald-600" />
                <span>5 Peer Signups Required</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                <CheckCircle className="size-4 text-emerald-600" />
                <span>100% Free for Colleagues</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Speed Meter */}
          <div className="lg:col-span-5 bg-linear-to-br from-slate-50 to-blue-50/40 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>Processing Pace Comparison</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-extrabold">
                -67% TIME
              </span>
            </div>

            <div className="space-y-3">
              {/* Standard Track */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Standard Payer Queue</span>
                  <span className="font-bold text-slate-400 line-through">60–90 Days</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-3.5 overflow-hidden">
                  <div className="bg-slate-400 h-full w-full rounded-full" />
                </div>
                <span className="text-[11px] text-slate-400 block">Normal insurer review batch</span>
              </div>

              {/* Priority Track */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <Zap className="size-3 text-amber-500 fill-amber-500" />
                    <span>Priority Review Queue</span>
                  </span>
                  <span className="text-base font-black text-emerald-700">14–30 Days ⚡</span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-3.5 overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[35%] rounded-full animate-pulse shadow-sm" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-700/90 block">
                  Active CVO daily payer outreach
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Seat Milestone Stepper */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-[#043570]" />
              <span className="text-sm font-bold text-slate-900">
                {isPriorityBoosted
                  ? "🏆 Priority Review Active (14–30 Days)"
                  : `${completedCount} of ${targetCount} Peer Seats Unlocked`}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {isPriorityBoosted
                ? "Your file has been promoted to daily CVO follow-up"
                : `${remainingCount} more colleague signup${remainingCount === 1 ? "" : "s"} needed`}
            </span>
          </div>

          {/* 5 Interactive Seat Slots */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((seat) => {
              const isFilled = seat <= completedCount;
              const isFinal = seat === 5;
              const refAtSeat = referrals[seat - 1];

              return (
                <div
                  key={seat}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isFilled
                      ? "bg-emerald-50/70 border-emerald-300 shadow-2xs"
                      : isFinal
                      ? "bg-amber-50/60 border-amber-300 border-dashed"
                      : "bg-slate-50/70 border-slate-200"
                  }`}
                >
                  <div
                    className={`size-9 mx-auto rounded-xl flex items-center justify-center font-bold text-xs transition-transform ${
                      isFilled
                        ? "bg-emerald-600 text-white shadow-xs"
                        : isFinal
                        ? "bg-amber-400 text-amber-950 font-black shadow-xs"
                        : "bg-white text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isFilled ? <Check className="size-4.5 stroke-3" /> : isFinal ? "🏆" : seat}
                  </div>

                  <div className="mt-2">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {isFinal
                        ? "Fast-Track"
                        : refAtSeat
                        ? refAtSeat.name.split(" ")[1] || refAtSeat.name
                        : `Seat ${seat}`}
                    </div>
                    <span
                      className={`text-[10px] font-semibold block truncate ${
                        isFilled
                          ? "text-emerald-700"
                          : isFinal
                          ? "text-amber-800 font-bold"
                          : "text-slate-400"
                      }`}
                    >
                      {isFilled ? "Joined" : isFinal ? "14–30 Days" : "Available"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STREAMLINED INVITE ACTION CARD                                            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Invite Healthcare Colleagues
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Send invitations directly to colleagues or share your private fast-track link.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddRow}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#043570] hover:text-[#00c0ff] bg-blue-50 hover:bg-blue-100/80 px-3.5 py-2 rounded-xl border border-blue-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="size-3.5" />
            <span>Add Another Colleague</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSendInvites} className="space-y-4">
          <div className="space-y-3">
            {rows.map((row, idx) => (
              <div
                key={row.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-700">Colleague {idx + 1}</span>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(row.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                      title="Remove colleague"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={row.name}
                      onChange={(e) => handleRowChange(row.id, "name", e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#043570]"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="s.jenkins@hospital.org"
                      value={row.email}
                      onChange={(e) => handleRowChange(row.id, "email", e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#043570]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={row.phone}
                      onChange={(e) => handleRowChange(row.id, "phone", e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#043570]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row: Link Copy & Send Button */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Share Link Bar */}
            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs">
              <span className="text-slate-400 mr-2 font-bold uppercase text-[10px]">Share Link:</span>
              <span className="text-slate-800 font-mono font-bold truncate select-all flex-1">
                {referralLink}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="ml-2 text-[#043570] hover:text-[#00c0ff] font-bold flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-white cursor-pointer"
              >
                {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-3 bg-[#043570] hover:bg-[#06428c] text-white rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Send className="size-3.5" />
              <span>
                {isSubmitting
                  ? "Sending..."
                  : filledCount > 1
                  ? `Send ${filledCount} Invites & Fast-Track`
                  : "Send Invites & Fast-Track"}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* INVITED COLLEAGUES TRACKER TABLE                                         */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Invited Colleagues ({referrals.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {completedCount} joined • {remainingCount} more needed to reach Priority Review (14–30 Days)
            </p>
          </div>

          <span className="text-xs font-bold text-slate-600">
            Target: {targetCount} Joined
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3 text-left">Colleague</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {referrals.map((ref) => {
                const isDone = ref.status === "Signed Up" || ref.status === "Credentialing Started";

                return (
                  <tr key={ref.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isDone
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {ref.name[0] || "C"}
                        </div>
                        <div className="font-bold text-slate-900">{ref.name}</div>
                      </div>
                    </td>

                    <td className="px-6 py-3.5 text-slate-600">
                      <div>{ref.email}</div>
                      {ref.phone && <div className="text-slate-400 text-[11px]">{ref.phone}</div>}
                    </td>

                    <td className="px-6 py-3.5">
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="size-3 text-emerald-600 stroke-3" />
                          Joined
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          Invite Sent
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!isDone && (
                          <button
                            type="button"
                            onClick={() => {
                              resendInvite(ref.id);
                              showToast(`Invite resent to ${ref.email}`);
                            }}
                            className="text-slate-600 hover:text-slate-900 font-semibold px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            Resend
                          </button>
                        )}

                        {!isDone && (
                          <button
                            type="button"
                            onClick={() => {
                              simulateStatusChange(ref.id, "Signed Up");
                              showToast(`${ref.name} signed up!`);
                            }}
                            className="text-[#043570] hover:text-[#00c0ff] font-bold px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Simulate this colleague signing up (for testing)"
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
