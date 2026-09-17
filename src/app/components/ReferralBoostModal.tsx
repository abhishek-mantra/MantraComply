import React, { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Check,
  Plus,
  Trash2,
  Send,
  Clock,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useReferrals, ReferralInviteInput } from "../contexts/ReferralContext";

interface ReferralBoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

interface ColleagueRow {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function ReferralBoostModal({
  isOpen,
  onClose,
  onComplete,
}: ReferralBoostModalProps) {
  const {
    referralLink,
    targetCount,
    completedCount,
    remainingCount,
    isPriorityBoosted,
    addMultipleReferrals,
  } = useReferrals();

  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Multiple invite rows
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validInvites: ReferralInviteInput[] = rows
      .filter((r) => r.email.trim() && r.email.includes("@"))
      .map((r) => ({
        name: r.name.trim() || r.email.split("@")[0],
        email: r.email.trim(),
        phone: r.phone.trim() || undefined,
      }));

    if (validInvites.length === 0) {
      showToast("Please enter at least one valid colleague email");
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
            : `${res.added} invites sent successfully`
        );
        setRows([{ id: "row-1", name: "", email: "", phone: "" }]);
        if (onComplete) {
          setTimeout(() => onComplete(), 1000);
        } else {
          setTimeout(() => onClose(), 1000);
        }
      } else {
        showToast("The entered email address(es) have already been invited");
      }
    }, 300);
  };

  const filledCount = rows.filter((r) => r.email.trim().includes("@")).length;
  const progressPercent = Math.min(100, Math.round((completedCount / targetCount) * 100));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border border-gray-200 bg-white shadow-xl">
        {/* Toast */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Clean Enterprise Header */}
        <div className="p-6 sm:p-7 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-[#043570] border border-blue-100">
              <Clock className="w-3.5 h-3.5 text-[#043570]" />
              Priority Review Program
            </span>
            {isPriorityBoosted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Active
              </span>
            )}
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Fast-Track Your Credentialing Review
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-600 mt-1.5 leading-relaxed">
            Commercial payer panels standardly take <strong>60 to 90 days</strong>. Invite 5 healthcare colleagues to join MantraComply — once they sign up, your file is elevated to our <strong>Priority Verification Queue (14–30 days)</strong> with dedicated coordinator outreach.
          </DialogDescription>

          {/* Clean 2-Column Comparison Card */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Standard Queue
              </div>
              <div className="text-lg font-bold text-gray-400 line-through mt-0.5">
                60 – 90 Days
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Standard commercial payer review pace
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                  Priority Review
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  5 Referrals
                </span>
              </div>
              <div className="text-lg font-bold text-emerald-700 mt-0.5">
                14 – 30 Days
              </div>
              <p className="text-xs text-emerald-700/90 mt-1">
                Proactive daily payer follow-ups by CVO team
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 bg-white">
          {/* Progress Status Bar */}
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-gray-900 font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-gray-500" />
                {isPriorityBoosted
                  ? "Priority Review Unlocked (14–30 Days)"
                  : `${completedCount} of ${targetCount} Colleagues Joined`}
              </span>
              <span className="text-gray-600">
                {isPriorityBoosted ? "Expedited" : `${remainingCount} more needed`}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isPriorityBoosted ? "bg-emerald-600" : "bg-[#043570]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  Colleague Information
                </h4>
                <p className="text-xs text-gray-500">
                  Name and email required; phone is optional.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddRow}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#043570] hover:text-[#2196F3] bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1.5 rounded-lg border border-blue-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another</span>
              </button>
            </div>

            {/* Rows List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {rows.map((row, idx) => (
                <div
                  key={row.id}
                  className="p-3 bg-white border border-gray-200 rounded-xl space-y-2 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Colleague {idx + 1}</span>
                    {rows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(row.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    {/* Name */}
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={row.name}
                        onChange={(e) => handleRowChange(row.id, "name", e.target.value)}
                        className="w-full text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
                      />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-4">
                      <input
                        type="email"
                        placeholder="Work Email *"
                        value={row.email}
                        onChange={(e) => handleRowChange(row.id, "email", e.target.value)}
                        className="w-full text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
                      />
                    </div>

                    {/* Phone (Optional) */}
                    <div className="sm:col-span-4">
                      <input
                        type="tel"
                        placeholder="Phone (Optional)"
                        value={row.phone}
                        onChange={(e) => handleRowChange(row.id, "phone", e.target.value)}
                        className="w-full text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Share Link */}
            <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-gray-500 font-medium">Or copy direct link:</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="truncate max-w-[240px] text-gray-600 font-mono bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
                  {referralLink}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto text-xs font-medium text-gray-500 hover:text-gray-800 py-2.5 px-3 transition-colors"
              >
                Skip for now, I'll do this later
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#043570] hover:bg-[#032855] text-white font-medium text-xs sm:text-sm transition-colors shadow-sm disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? "Sending..."
                    : filledCount > 1
                    ? `Send ${filledCount} Invites & Fast-Track`
                    : "Send Invite & Fast-Track"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReferralBoostModal;
