import React from "react";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Dialog, DialogContent } from "./ui/dialog";

interface ReferralBoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export function ReferralBoostModal({
  isOpen,
  onClose,
}: ReferralBoostModalProps) {
  const navigate = useNavigate();

  const handleGoToReferrals = () => {
    onClose();
    navigate("/provider/referrals");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Modal Header & Value Proposition */}
        <div className="p-7 sm:p-9 bg-linear-to-b from-blue-50/60 via-slate-50/30 to-white space-y-6">
          {/* Top Pill Badges */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#043570] border border-blue-200/60 shadow-2xs">
              <Zap className="size-3.5 text-amber-500 fill-amber-500" />
              <span>Priority Credentialing Fast-Track</span>
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Save 60 Days
            </span>
          </div>

          {/* Headline & Subline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Want your payer approval in 14–30 days instead of 60–90?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
              Commercial insurance panels normally take 2 to 3 months. When you invite <strong>5 healthcare colleagues</strong> to MantraComply, our CVO team elevates your file to daily proactive payer follow-ups.
            </p>
          </div>

          {/* Visual Speed Comparison Meter */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>Processing Pace Comparison</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-extrabold">
                -67% TIME
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Standard */}
              <div className="flex items-center gap-3">
                <span className="w-28 text-xs font-semibold text-slate-500 shrink-0">Standard Queue:</span>
                <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-slate-400 h-full w-full rounded-full" />
                </div>
                <span className="text-xs font-bold text-slate-400 line-through w-24 text-right shrink-0">
                  60–90 Days
                </span>
              </div>

              {/* Priority */}
              <div className="flex items-center gap-3">
                <span className="w-28 text-xs font-bold text-emerald-800 shrink-0 flex items-center gap-1">
                  <Zap className="size-3 text-amber-500 fill-amber-500" />
                  <span>Priority Review:</span>
                </span>
                <div className="flex-1 bg-emerald-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[33%] rounded-full animate-pulse shadow-xs" />
                </div>
                <span className="text-sm font-black text-emerald-700 w-24 text-right shrink-0">
                  14–30 Days ⚡
                </span>
              </div>
            </div>
          </div>

          {/* Micro Perks Row */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600 pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Save 45–60 Wait Days
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600" />
              5 Peer Signups Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600" />
              100% Free for Colleagues
            </span>
          </div>
        </div>

        {/* Clean Redirection Action Bar */}
        <div className="p-6 bg-slate-50/90 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-center sm:text-left order-2 sm:order-1"
          >
            I'll do this later (View Profile)
          </button>

          <button
            type="button"
            onClick={handleGoToReferrals}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#043570] hover:bg-[#06428c] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer group order-1 sm:order-2"
          >
            <span>Go to Refer &amp; Expedite</span>
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReferralBoostModal;
