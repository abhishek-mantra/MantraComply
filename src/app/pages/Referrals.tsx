import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Users,
  CheckCircle,
  Zap,
  Mail,
} from "lucide-react";
import { useReferrals } from "../contexts/ReferralContext";
import {
  InviteColleaguesModal,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  SHARE_PROMO_TEXT,
} from "../components/InviteColleaguesModal";

export function Referrals() {
  const {
    referrals,
    referralLink,
    targetCount,
    completedCount,
    remainingCount,
    isPriorityBoosted,
    simulateStatusChange,
    resendInvite,
    resetToDefaults,
  } = useReferrals();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const fullShareMessage = `${SHARE_PROMO_TEXT} ${referralLink}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    showToast("Opening WhatsApp with your referral invitation...");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(fullShareMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
    showToast("Opening Facebook share dialog...");
  };

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(fullShareMessage);
    showToast("Referral message & link copied to clipboard! Opening Instagram...");
    setTimeout(() => {
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }, 450);
  };

  const handleCopyShareMessage = () => {
    navigator.clipboard.writeText(fullShareMessage);
    setCopiedMessage(true);
    showToast("Referral invitation message & link copied!");
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold animate-fade-in border border-slate-800">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
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
            Refer &amp; Expedite
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
      {/* HERO: VALUE PROPOSITION & SPEED COMPARISON GAUGE                          */}
      {/* (5-Seat Milestone Stepper has been removed as requested in Image 1)       */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-9 shadow-xs space-y-6">
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
      </div>

      {/* ========================================================================= */}
      {/* INVITE ACTION & SOCIAL SHARE SECTION                                      */}
      {/* (Form opened in popup on click; plain link replaced by social logos)       */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="size-5 text-[#043570]" />
              <span>Invite Healthcare Colleagues</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Send email invitations directly to colleagues or share your private expedited link across social channels to unlock 14–30 day credentialing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            id="open-invite-popup-btn"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#043570] hover:bg-[#06428c] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <Mail className="size-4" />
            <span>Invite Colleagues</span>
          </button>
        </div>

        {/* Social Sharing Logos & Promo Preview */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Share Directly on Social Networks
              </span>
              <span className="text-[11px] text-slate-500">
                Click any logo to share the referral invitation with your network
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-2.5">
              {/* WhatsApp Logo Button */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                id="card-share-whatsapp-btn"
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#25D366] text-[#25D366] hover:text-white border border-slate-200 hover:border-[#25D366] font-bold text-xs shadow-2xs transition-all cursor-pointer"
                title="Share on WhatsApp"
              >
                <WhatsAppIcon className="size-4.5" />
                <span>WhatsApp</span>
              </button>

              {/* Facebook Logo Button */}
              <button
                type="button"
                onClick={handleFacebookShare}
                id="card-share-facebook-btn"
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-slate-200 hover:border-[#1877F2] font-bold text-xs shadow-2xs transition-all cursor-pointer"
                title="Share on Facebook"
              >
                <FacebookIcon className="size-4.5" />
                <span>Facebook</span>
              </button>

              {/* Instagram Logo Button */}
              <button
                type="button"
                onClick={handleInstagramShare}
                id="card-share-instagram-btn"
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-gradient-to-tr hover:from-[#FD1D1D] hover:to-[#833AB4] text-[#E1306C] hover:text-white border border-slate-200 hover:border-[#E1306C] font-bold text-xs shadow-2xs transition-all cursor-pointer"
                title="Copy message & open Instagram"
              >
                <InstagramIcon className="size-4.5" />
                <span>Instagram</span>
              </button>

              {/* Copy Message / Link Button */}
              <button
                type="button"
                onClick={handleCopyShareMessage}
                id="card-copy-message-btn"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                title="Copy promo message and link"
              >
                {copiedMessage ? (
                  <Check className="size-4 text-emerald-600 stroke-3" />
                ) : (
                  <Copy className="size-4 text-slate-400" />
                )}
                <span>{copiedMessage ? "Copied" : "Copy Message"}</span>
              </button>
            </div>
          </div>

          {/* Preview of the Message that will be shared */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 text-xs text-slate-600 flex items-start gap-3">
            <div className="size-6 rounded-lg bg-blue-50 flex items-center justify-center text-[#043570] font-bold text-[11px] shrink-0 mt-0.5">
              💬
            </div>
            <div className="space-y-1 overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Sample message shared:
              </span>
              <p className="font-medium text-slate-800 break-words leading-relaxed select-all">
                "{SHARE_PROMO_TEXT}{" "}
                <span className="text-[#043570] font-semibold underline">{referralLink}</span>"
              </p>
            </div>
          </div>
        </div>
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
              {completedCount} joined • {remainingCount} more needed to reach Expedited Review (14–30 Days)
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

      {/* ========================================================================= */}
      {/* POPUP INVITE MODAL                                                        */}
      {/* ========================================================================= */}
      <InviteColleaguesModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onToast={showToast}
      />
    </div>
  );
}

export default Referrals;
