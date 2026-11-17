import { useState, useEffect } from "react";
import { ChevronLeft, Check, CheckCircle2 } from "lucide-react";
import { GeneralInformationForm } from "./forms/india/GeneralInformationForm";
import { SpecialtiesOfferedForm } from "./forms/india/SpecialtiesOfferedForm";
import { InfraDetailsForm } from "./forms/india/InfraDetailsForm";
import { StaffQualityForm } from "./forms/india/StaffQualityForm";
import { HospitalContactDetailsForm } from "./forms/india/HospitalContactDetailsForm";
import { ProposedRatesForm } from "./forms/india/ProposedRatesForm";
import { DocumentationForm } from "./forms/india/DocumentationForm";
import { InfrastructureImagesForm } from "./forms/india/InfrastructureImagesForm";
import { STEP_SAVE_MESSAGES } from "../config/indiaGicConfig";

const DRAFT_STORAGE_KEY = "mantra_india_gic_empanelment_draft";

export const INDIA_GIC_STEPS = [
  { id: 1, name: "Documentation", component: DocumentationForm },
  { id: 2, name: "General Information", component: GeneralInformationForm },
  { id: 3, name: "Provider Information", component: SpecialtiesOfferedForm },
  { id: 4, name: "Infra Details", component: InfraDetailsForm },
  { id: 5, name: "Staff & Quality", component: StaffQualityForm },
  { id: 6, name: "Hospital Contact Details", component: HospitalContactDetailsForm },
  { id: 7, name: "Proposed Rates", component: ProposedRatesForm },
  { id: 8, name: "Infrastructure Images", component: InfrastructureImagesForm },
];

interface IndiaCredentialingWizardProps {
  onFormComplete?: () => void;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

export function IndiaCredentialingWizard({
  onFormComplete,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange,
}: IndiaCredentialingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<Record<number, any>>({});
  const [isRatesLocked, setIsRatesLocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (Array.isArray(parsed.completedSteps)) {
          setCompletedSteps(new Set(parsed.completedSteps));
        }
        if (typeof parsed.currentStep === "number") {
          setCurrentStep(parsed.currentStep);
        }
        if (parsed.isRatesLocked) {
          setIsRatesLocked(true);
        }
      }
    } catch (e) {
      console.warn("Could not load India GIC draft from storage", e);
    }
  }, []);

  // Save draft to localStorage on state changes
  const saveDraft = (
    newFormData: Record<number, any>,
    newCompleted: Set<number>,
    nextStep: number,
    locked = isRatesLocked
  ) => {
    try {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({
          formData: newFormData,
          completedSteps: Array.from(newCompleted),
          currentStep: nextStep,
          isRatesLocked: locked,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn("Could not save India GIC draft to storage", e);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleStepComplete = (stepData?: any) => {
    const updatedFormData = { ...formData, [currentStep]: stepData };
    setFormData(updatedFormData);

    const updatedCompleted = new Set([...completedSteps, currentStep]);
    setCompletedSteps(updatedCompleted);

    // Show step success toast
    const msg = STEP_SAVE_MESSAGES[currentStep] || "Information saved successfully!";
    showToast(msg);

    if (currentStep === INDIA_GIC_STEPS.length - 1) {
      // Final submission
      setIsRatesLocked(true);
      saveDraft(updatedFormData, updatedCompleted, currentStep, true);
      if (onFormComplete) {
        onFormComplete();
      }
    } else {
      const next = currentStep + 1;
      setCurrentStep(next);
      saveDraft(updatedFormData, updatedCompleted, next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      saveDraft(formData, completedSteps, prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const CurrentFormComponent = INDIA_GIC_STEPS[currentStep]?.component;
  const progressPercent = Math.round(((completedSteps.size) / INDIA_GIC_STEPS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Credentialing</h1>
      </div>

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-xl text-sm font-medium text-gray-800 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80 sticky top-24">
            <div className="mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Progress
                </span>
                <span className="text-xs font-bold text-gray-900">
                  {completedSteps.size}/{INDIA_GIC_STEPS.length} Steps
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#2196F3] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              {INDIA_GIC_STEPS.map((step, index) => {
                const isCompleted = completedSteps.has(index);
                const isCurrent = index === currentStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleStepClick(index)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      isCurrent
                        ? "bg-[#E3F2FD] text-[#1976D2] font-semibold"
                        : isCompleted
                        ? "text-gray-700 hover:bg-gray-50 font-medium"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-[#2196F3] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
                    </div>
                    <span className="text-xs leading-tight flex-1">{step.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Form Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200/80">
            {/* Step Header */}
            <div className="mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {INDIA_GIC_STEPS[currentStep].name}
                </h2>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Step {currentStep + 1} of {INDIA_GIC_STEPS.length}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                <div
                  className="bg-[#2196F3] h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / INDIA_GIC_STEPS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Active Step Component */}
            {CurrentFormComponent && (
              <CurrentFormComponent
                initialData={formData[currentStep]}
                onNext={handleStepComplete}
                onBack={currentStep > 0 ? handleBack : undefined}
                isFirstStep={currentStep === 0}
                isLastStep={currentStep === INDIA_GIC_STEPS.length - 1}
                isLocked={isRatesLocked}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
