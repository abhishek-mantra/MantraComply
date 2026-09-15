import { HELP_CENTER_BASE_URL, getHelpArticleUrl } from "../../config/helpCenter";
import { BookOpen, ExternalLink, HelpCircle } from "lucide-react";

interface HelpSectionProps {
  currentStep?: number;
}

const STEP_ARTICLES: Record<number, { title: string; slug: string }[]> = {
  0: [{ title: "Why NPI is needed and how to verify in NPPES", slug: "why-npi-is-needed-and-how-to-find-it" }],
  1: [{ title: "Why is CAQH authorization required?", slug: "caqh-authorization-and-cvo-access" }],
  2: [{ title: "How to reach 100% CAQH completion & avoid 120-day gaps", slug: "how-to-fill-out-caqh-in-2026" }],
  3: [{ title: "Why SSN is required for primary source verification", slug: "primary-source-verification-and-identity" }],
  4: [{ title: "How state licenses & compacts (PSYPACT/IMLC) are verified", slug: "state-medical-license-verification" }],
  5: [{ title: "Board certification cycles & payer tier placement", slug: "board-certification-and-payer-tiers" }],
  6: [{ title: "Malpractice insurance minimum limits ($1M/$3M) & COI rules", slug: "malpractice-insurance-and-coi-requirements" }],
  7: [{ title: "Medical education, residency & ECFMG verification", slug: "medical-education-and-residency-documentation" }],
  8: [{ title: "Work history gap explanations & 30-day compliance", slug: "work-history-gaps-and-attestations" }],
  9: [
    { title: "Virtual vs. physical practice settings, W-9 Tax IDs & billing rules", slug: "practice-location-and-tax-id-rules" },
    { title: "Credentialing guidelines for private & telehealth practices", slug: "credentialing-for-private-practice" },
  ],
  10: [
    { title: "Choosing commercial vs. government health plans for your practice", slug: "choosing-commercial-vs-government-health-plans" },
    { title: "Why I&A, One Healthcare ID & Availity accounts are required for payer portals", slug: "tracking-active-insurance-status" },
  ],
  11: [{ title: "What background checks & release authorizations do payers run?", slug: "background-checks-and-release-forms" }],
};

export function HelpSection({ currentStep }: HelpSectionProps) {
  const articles = currentStep !== undefined ? STEP_ARTICLES[currentStep] : undefined;

  return (
    <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-5 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5 text-[#2196F3]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900 text-sm">Need Help?</p>
            <a
              href={HELP_CENTER_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#2196F3] hover:text-[#1976D2] hover:underline inline-flex items-center gap-1"
            >
              <span>Visit MantraComply Help Center</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">
            Our credentialing specialists and compliance guides are here to assist you through every step.
          </p>

          {articles && articles.length > 0 && (
            <div className="mt-3 pt-3 border-t border-blue-200/70">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#2196F3]" />
                Help Center Guides for this step:
              </p>
              <div className="flex flex-wrap gap-2">
                {articles.map((art) => (
                  <a
                    key={art.slug}
                    href={getHelpArticleUrl(art.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-200 rounded-xl text-xs font-medium text-[#2196F3] hover:bg-blue-50 hover:border-blue-300 transition-all shadow-2xs"
                  >
                    <span>{art.title}</span>
                    <ExternalLink className="w-3 h-3 text-blue-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}