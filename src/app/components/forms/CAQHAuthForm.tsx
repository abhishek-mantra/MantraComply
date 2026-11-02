import { useState } from "react";
import { FormButtons } from "./FormButtons";
import { ContextualHelpLink } from "../shared/ContextualHelpLink";
import { 
  CheckCircle2, 
  ClipboardList, 
  ExternalLink, 
  Lock, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  CheckSquare, 
  ShieldCheck,
  UserPlus
} from "lucide-react";

interface FormProps {
  specialty?: string;
  onNext: (data?: any) => void;
  onPrevious?: () => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export function CAQHAuthForm({
  onNext,
  onPrevious,
  onBack,
  isFirstStep = false,
  isLastStep = false,
}: FormProps) {
  // Step 1: Has CAQH Account
  const [hasCaqhAccount, setHasCaqhAccount] = useState<"yes" | "no">("yes");

  // IN CASE OF YES:
  // 2. Connect your CAQH account
  const [caqhId, setCaqhId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 3. Auto-fetch data from CAQH profile
  const [autoFetchOption, setAutoFetchOption] = useState<"yes" | "no">("yes");

  // 4. Confirm your CAQH profile is current
  const [sectionsComplete, setSectionsComplete] = useState(false);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);
  const [w9Signed, setW9Signed] = useState(false);
  const [attestationValid, setAttestationValid] = useState(false);

  // Authorization checkboxes
  const [authorizeModify, setAuthorizeModify] = useState(false);
  const [attestAccuracy, setAttestAccuracy] = useState(false);

  // IN CASE OF NO:
  const [noCaqhAction, setNoCaqhAction] = useState<"help_create" | "create_myself">("help_create");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasCaqhAccount === "yes") {
      if (!caqhId || !username || !password) {
        alert("Please enter your CAQH Provider ID, Username, and Password.");
        return;
      }
      if (!authorizeModify || !attestAccuracy) {
        alert("Please review and accept both authorization and attestation statements to proceed.");
        return;
      }
      onNext({
        hasCaqhAccount: "yes",
        caqhId,
        username,
        password,
        autoFetchOption,
        profileConfirmation: {
          sectionsComplete,
          documentsUploaded,
          w9Signed,
          attestationValid,
        },
        authorizeModify,
        attestAccuracy,
      });
    } else {
      onNext({
        hasCaqhAccount: "no",
        noCaqhAction,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Do you already have a CAQH ProView account? */}
      <div className="space-y-3 pb-6 border-b border-gray-100">
        <label className="block text-base font-semibold text-gray-900">
          1. Do you already have a CAQH ProView account? <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500">
          CAQH ProView is the primary credentialing database used by health plans nationwide.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <label
            className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
              hasCaqhAccount === "yes"
                ? "border-[#2196F3] bg-blue-50/50 shadow-xs ring-1 ring-[#2196F3]/30"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="hasCaqhAccount"
              value="yes"
              checked={hasCaqhAccount === "yes"}
              onChange={() => setHasCaqhAccount("yes")}
              className="mt-0.5 mr-3 w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
            />
            <div>
              <span className="text-sm font-semibold text-gray-900">
                Yes, I have a CAQH ProView account
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect your account to auto-populate credentialing data and authorize MantraComply
              </p>
            </div>
          </label>

          <label
            className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
              hasCaqhAccount === "no"
                ? "border-[#2196F3] bg-blue-50/50 shadow-xs ring-1 ring-[#2196F3]/30"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="hasCaqhAccount"
              value="no"
              checked={hasCaqhAccount === "no"}
              onChange={() => setHasCaqhAccount("no")}
              className="mt-0.5 mr-3 w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
            />
            <div>
              <span className="text-sm font-semibold text-gray-900">
                No, I don't have a CAQH ProView account
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                We'll guide you through setting one up or our team can assist you directly
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* IN CASE OF YES */}
      {/* ───────────────────────────────────────────────────────────── */}
      {hasCaqhAccount === "yes" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* 2. Connect your CAQH account */}
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                2. Connect your CAQH account
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Enter your CAQH ProView details so we can help manage your credentialing and enrollment applications.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  CAQH Provider ID <span className="text-red-500">*</span>
                  <span
                    className="ml-2 text-gray-400 cursor-help"
                    title="Your unique 8-digit CAQH identification number"
                  >
                    ⓘ
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={caqhId}
                  onChange={(e) => setCaqhId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm transition-all"
                  placeholder="Enter your CAQH Provider ID"
                />
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5">
                  <p className="text-xs text-gray-500">
                    Don't have a CAQH ID?{" "}
                    <a
                      href="https://proview.caqh.org/PR/Registration/SelfRegistration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2196F3] hover:underline font-medium"
                    >
                      Create an account
                    </a>
                  </p>
                  <a
                    href="https://help.mantracomply.com/articles/caqh-authorization-and-cvo-access"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#2196F3] hover:underline font-medium"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#2196F3]" />
                    <span>Why is CAQH authorization required?</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  CAQH ProView Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm transition-all"
                  placeholder="Enter your CAQH ProView username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  CAQH ProView Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none text-sm transition-all"
                    placeholder="Enter your CAQH ProView password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <p className="text-xs text-gray-600 font-medium">
                    Your credentials are encrypted and securely stored.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Auto-fetch data from your CAQH profile (Matching Images 3 & 4) */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                3. Auto-fetch data from your CAQH profile
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Would you like MantraComply to automatically retrieve your details from CAQH?
              </p>
            </div>

            <div className="space-y-3">
              {/* Option 1: Yes, auto-fetch my details */}
              <label
                className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                  autoFetchOption === "yes"
                    ? "border-[#2196F3] bg-blue-50/30 ring-1 ring-[#2196F3]/30"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="autoFetchOption"
                    value="yes"
                    checked={autoFetchOption === "yes"}
                    onChange={() => setAutoFetchOption("yes")}
                    className="w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    Yes, auto-fetch my details
                  </span>
                </div>

                {autoFetchOption === "yes" && (
                  <div className="mt-3 ml-7 pt-3 border-t border-blue-100">
                    <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Recommended — save time</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      We'll use your CAQH credentials to retrieve available profile information and prefill relevant sections of your application, subject to your authorization.
                    </p>
                  </div>
                )}
              </label>

              {/* Option 2: No, I'll provide my details manually */}
              <label
                className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                  autoFetchOption === "no"
                    ? "border-[#2196F3] bg-blue-50/30 ring-1 ring-[#2196F3]/30"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="autoFetchOption"
                    value="no"
                    checked={autoFetchOption === "no"}
                    onChange={() => setAutoFetchOption("no")}
                    className="w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    No, I'll provide my details manually
                  </span>
                </div>

                {autoFetchOption === "no" && (
                  <div className="mt-3 ml-7 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-900 font-semibold text-xs mb-1">
                      <ClipboardList className="w-4 h-4 text-gray-800 shrink-0" />
                      <span>Manual entry</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Continue to the next sections and enter your provider information yourself.
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* 4. Confirm your CAQH profile is current */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                4. Confirm your CAQH profile is current
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Please confirm the following before continuing:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50/80 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={sectionsComplete}
                  onChange={(e) => setSectionsComplete(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
                />
                <span className="text-xs text-gray-700 leading-tight">
                  All CAQH profile sections are 100% complete
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50/80 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={documentsUploaded}
                  onChange={(e) => setDocumentsUploaded(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
                />
                <span className="text-xs text-gray-700 leading-tight">
                  All required documents are uploaded
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50/80 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={w9Signed}
                  onChange={(e) => setW9Signed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
                />
                <span className="text-xs text-gray-700 leading-tight">
                  W-9 is current and signed
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50/80 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={attestationValid}
                  onChange={(e) => setAttestationValid(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3]"
                />
                <span className="text-xs text-gray-700 leading-tight">
                  CAQH attestation is signed within the last 120 days
                </span>
              </label>
            </div>

            <div className="pt-2">
              <a
                href="https://help.mantracomply.com/articles/how-to-fill-out-caqh-in-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#2196F3] hover:underline font-medium"
              >
                <span>Need help? Learn how to update and attest your CAQH profile.</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* CAQH Profile Authorization & Attestation (from Figma Step 2) */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#2196F3]" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  CAQH Profile Authorization &amp; Attestation
                </h3>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                To get credentialed, we'll need to update your CAQH profile with the information you just provided. To make things easy, MantraComply will do this on your behalf.
              </p>
            </div>

            <div className="space-y-3.5 pt-3 border-t border-blue-100">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={authorizeModify}
                  onChange={(e) => setAuthorizeModify(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] shrink-0 cursor-pointer"
                />
                <span className="text-xs text-gray-700 leading-relaxed group-hover:text-gray-900 select-none">
                  I authorize MantraComply and its third-party vendors to access, use, modify, and disclose my information in my CAQH account in order to credential me with third-party payers. I acknowledge that I am solely responsible for any information I provide to MantraComply and will indemnify, defend, and hold MantraComply and its third-party vendors harmless from and against any loss arising out of the information I provide. <span className="text-red-500">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={attestAccuracy}
                  onChange={(e) => setAttestAccuracy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 rounded focus:ring-[#2196F3] shrink-0 cursor-pointer"
                />
                <span className="text-xs text-gray-700 leading-relaxed group-hover:text-gray-900 select-none">
                  I attest to the accuracy of my CAQH login credentials and the information I have provided, and I give MantraComply permission to update my profile and attest on my behalf if necessary. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* IN CASE OF NO */}
      {/* ───────────────────────────────────────────────────────────── */}
      {hasCaqhAccount === "no" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              No CAQH ProView account?
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              You can create your account yourself or ask MantraComply for assistance. You can continue your provider profile in either case.
            </p>
          </div>

          <div className="space-y-4">
            <label
              className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                noCaqhAction === "help_create"
                  ? "border-[#2196F3] bg-blue-50/40 ring-1 ring-[#2196F3]/30"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="noCaqhAction"
                  value="help_create"
                  checked={noCaqhAction === "help_create"}
                  onChange={() => setNoCaqhAction("help_create")}
                  className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-[#2196F3]" />
                    <span className="text-sm font-semibold text-gray-900">
                      Help me create my CAQH ProView account
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Please continue completing the remaining steps of your application. Our team will contact you shortly to assist you with setting up your CAQH ProView account.
                  </p>
                </div>
              </div>
            </label>

            <label
              className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                noCaqhAction === "create_myself"
                  ? "border-[#2196F3] bg-blue-50/40 ring-1 ring-[#2196F3]/30"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="noCaqhAction"
                  value="create_myself"
                  checked={noCaqhAction === "create_myself"}
                  onChange={() => setNoCaqhAction("create_myself")}
                  className="mt-0.5 w-4 h-4 text-[#2196F3] border-gray-300 focus:ring-[#2196F3]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      I'll create my own CAQH ProView account
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Create your account directly through CAQH{" "}
                    <a
                      href="https://proview.caqh.org/PR/Registration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium text-[#2196F3] hover:text-[#1976D2]"
                    >
                      here
                    </a>{" "}
                    (opens in a new tab). You can return to enter your details anytime.
                  </p>
                </div>
              </div>
            </label>
          </div>

          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              You can proceed to the remaining application steps now without delay.
            </span>
          </div>
        </div>
      )}

      <FormButtons
        onPrevious={onPrevious || onBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </form>
  );
}

export default CAQHAuthForm;
