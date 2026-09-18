import React, { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Send,
  Check,
  Copy,
  Sparkles,
} from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { ReferralInviteInput, useReferrals } from "../contexts/ReferralContext";

export function WhatsAppIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.83a8.17 8.17 0 0 1-5.83 2.42c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.55 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.6.12.16 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29" />
    </svg>
  );
}

export function FacebookIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export const SHARE_PROMO_TEXT =
  "Mantra is offering healthcare provider credentialing for free to expedite payer approvals! Join using my referral link:";

interface ColleagueRow {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface InviteColleaguesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function InviteColleaguesModal({
  isOpen,
  onClose,
  onToast,
}: InviteColleaguesModalProps) {
  const { referralLink, addMultipleReferrals } = useReferrals();

  const [rows, setRows] = useState<ColleagueRow[]>([
    { id: "row-1", name: "", email: "", phone: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fullShareMessage = `${SHARE_PROMO_TEXT} ${referralLink}`;

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
      onToast("Please enter at least one colleague's name and email");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = addMultipleReferrals(validInvites);
      setIsSubmitting(false);

      if (res.added > 0) {
        onToast(
          res.added === 1
            ? "Invite sent successfully"
            : `${res.added} colleague invites sent successfully`
        );
        setRows([{ id: "row-1", name: "", email: "", phone: "" }]);
        onClose();
      } else {
        onToast("The email address(es) provided have already been invited");
      }
    }, 350);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onToast("Opening WhatsApp with your referral invitation...");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(fullShareMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
    onToast("Opening Facebook share dialog...");
  };

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(fullShareMessage);
    onToast("Referral message & link copied to clipboard! Opening Instagram...");
    setTimeout(() => {
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }, 450);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullShareMessage);
    setCopiedLink(true);
    onToast("Referral invitation message & link copied!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filledCount = rows.filter((r) => r.email.trim().includes("@")).length;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-w-3xl p-0 rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden [&>button]:hidden">
        {/* Modal Top Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50 relative">
          {/* Top-Right Clean Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            title="Close modal"
            id="modal-close-btn"
          >
            <X className="size-4" />
          </button>

          <div className="pr-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#043570] border border-blue-200/70 mb-1">
              <Sparkles className="size-3 text-amber-500 fill-amber-500" />
              <span>Fast-Track Credentialing</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Invite Healthcare Colleagues
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Send invitations directly to colleagues or share your private fast-track link.
            </p>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSendInvites}>
          <div className="p-6 sm:p-7 max-h-[60vh] overflow-y-auto space-y-3.5">
            {rows.map((row, idx) => (
              <div
                key={row.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all space-y-2.5"
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
                    {/* Changed from WORK EMAIL * to EMAIL * as requested */}
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Email *
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

            {/* Single Add Colleague Button */}
            <button
              type="button"
              onClick={handleAddRow}
              id="modal-add-colleague-btn"
              className="w-full py-3 rounded-2xl border-2 border-dashed border-blue-200 hover:border-[#043570] text-[#043570] bg-blue-50/40 hover:bg-blue-50 text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="size-5 rounded-full bg-blue-100 text-[#043570] group-hover:bg-[#043570] group-hover:text-white flex items-center justify-center transition-colors">
                <Plus className="size-3.5" />
              </div>
              <span>Add Another Colleague</span>
            </button>
          </div>

          {/* Modal Footer: Replaced Share Link with Facebook, Instagram, WhatsApp Logos */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Social Sharing Logos */}
            <div className="flex items-center flex-wrap gap-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Share via:
              </span>

              <div className="flex items-center gap-2">
                {/* WhatsApp Logo */}
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  id="modal-share-whatsapp-btn"
                  className="group relative flex items-center justify-center size-9 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 transition-all shadow-2xs hover:scale-105 cursor-pointer"
                  title="Share on WhatsApp with prefilled message & link"
                >
                  <WhatsAppIcon className="size-5" />
                </button>

                {/* Facebook Logo */}
                <button
                  type="button"
                  onClick={handleFacebookShare}
                  id="modal-share-facebook-btn"
                  className="group relative flex items-center justify-center size-9 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/30 transition-all shadow-2xs hover:scale-105 cursor-pointer"
                  title="Share on Facebook with referral link"
                >
                  <FacebookIcon className="size-5" />
                </button>

                {/* Instagram Logo */}
                <button
                  type="button"
                  onClick={handleInstagramShare}
                  id="modal-share-instagram-btn"
                  className="group relative flex items-center justify-center size-9 rounded-xl bg-gradient-to-tr from-[#FD1D1D]/10 to-[#833AB4]/10 hover:from-[#FD1D1D] hover:to-[#833AB4] text-[#E1306C] hover:text-white border border-[#E1306C]/30 transition-all shadow-2xs hover:scale-105 cursor-pointer"
                  title="Copy message & open Instagram"
                >
                  <InstagramIcon className="size-5" />
                </button>

                {/* Copy Message / Link Icon Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  id="modal-copy-message-btn"
                  className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                  title="Copy full invitation message & referral link"
                >
                  {copiedLink ? (
                    <Check className="size-3.5 text-emerald-600 stroke-3" />
                  ) : (
                    <Copy className="size-3.5 text-slate-500" />
                  )}
                  <span>{copiedLink ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Send Invites Submission Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="modal-submit-invites-btn"
              className="px-6 py-2.5 bg-[#043570] hover:bg-[#06428c] text-white rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Send className="size-3.5" />
              <span>
                {isSubmitting
                  ? "Sending..."
                  : filledCount > 1
                  ? `Send ${filledCount} Invites & Expedite`
                  : "Send Invites & Expedite"}
              </span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
