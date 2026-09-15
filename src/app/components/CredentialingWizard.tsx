import { useState, useEffect } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { NPIForm } from "./forms/NPIForm";
import { CAQHAuthForm } from "./forms/CAQHAuthForm";
import { CAQHUpdatesForm } from "./forms/CAQHUpdatesForm";
import { LicenseInfoForm } from "./forms/LicenseInfoForm";
import { BoardCertificationForm } from "./forms/BoardCertificationForm";
import { InsuranceForm } from "./forms/InsuranceForm";
import { ReleaseFormsForm } from "./forms/ReleaseFormsForm";
import { HelpSection } from "./forms/HelpSection";
import { PersonalInformationForm } from "./forms/shared/PersonalInformationForm";
import { EmploymentHistoryForm } from "./forms/shared/EmploymentHistoryForm";
import { PracticeInfoForm } from "./forms/PracticeInfoForm";
import { MalpracticeInsuranceForm } from "./forms/shared/MalpracticeInsuranceForm";
import { EducationQualificationsForm } from "./forms/shared/EducationQualificationsForm";

const STEPS = [
  { id: 1, name: "National Provider Identifier (NPI)", component: NPIForm },
  { id: 2, name: "CAQH Authorization", component: CAQHAuthForm },
  { id: 3, name: "CAQH Account Updates", component: CAQHUpdatesForm },
  { 
    id: 4, 
    name: "Personal Information", 
    component: (props: any) => <PersonalInformationForm {...props} country="US" />
  },
  { id: 5, name: "License Information", component: LicenseInfoForm },
  { id: 6, name: "Board Certification", component: BoardCertificationForm },
  { 
    id: 7, 
    name: "Malpractice Information", 
    component: (props: any) => <MalpracticeInsuranceForm {...props} country="US" />
  },
  { 
    id: 8, 
    name: "Education", 
    component: (props: any) => <EducationQualificationsForm {...props} country="US" />
  },
  { 
    id: 9, 
    name: "Employment Information", 
    component: (props: any) => <EmploymentHistoryForm {...props} country="US" />
  },
  { 
    id: 10, 
    name: "Practice Information", 
    component: PracticeInfoForm
  },
  { id: 11, name: "Insurance", component: InsuranceForm },
  { id: 12, name: "Release Forms", component: ReleaseFormsForm },
];

interface CredentialingWizardProps {
  onFormComplete?: () => void;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

export function CredentialingWizard({
  onFormComplete,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange
}: CredentialingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [specialty, setSpecialty] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");

  // Check if all steps are completed
  useEffect(() => {
    if (completedSteps.size === STEPS.length && onFormComplete) {
      onFormComplete();
    }
  }, [completedSteps, onFormComplete]);

  const handleStepComplete = (data?: any) => {
    // If this is step 1 (NPI), save the specialty and specialization
    if (currentStep === 0 && data?.specialty) {
      setSpecialty(data.specialty);
      if (data.selectedSpecialization) {
        setSelectedSpecialization(data.selectedSpecialization);
      }
    }

    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to any step
    setCurrentStep(stepIndex);
  };

  const CurrentFormComponent = STEPS[currentStep]?.component;
  const progressCount = completedSteps.size > 0 ? completedSteps.size : currentStep + 1;
  const progressPercent = Math.round((progressCount / STEPS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            {specialty && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Specialty</div>
                <div className="font-medium text-gray-900 capitalize">{specialty}</div>
              </div>
            )}

            {/* Progress indicator matching Figma design */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                <span>PROGRESS</span>
                <span className="text-[#2196F3] font-bold">{progressPercent}%</span>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-xl font-bold text-gray-900">
                  {progressCount} <span className="text-sm font-normal text-gray-400">/{STEPS.length}</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#2196F3] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              {STEPS.map((step, index) => {
                const isCompleted = completedSteps.has(index);
                const isCurrent = index === currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      isCurrent
                        ? "bg-[#E3F2FD] text-[#2196F3] font-medium"
                        : isCompleted
                        ? "text-gray-700 hover:bg-gray-50"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                        isCompleted
                          ? "bg-[#10B981] text-white"
                          : isCurrent
                          ? "bg-[#2196F3] text-white"
                          : "border border-gray-300 text-gray-400 bg-white"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : isCurrent ? (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      ) : (
                        <span className="text-[11px]">{step.id}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium flex-1 leading-tight">{step.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Header matching Figma screenshots */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{STEPS[currentStep].name}</h2>
              <p className="text-sm text-gray-500 mt-1">Complete your provider profile to start using the platform.</p>
            </div>

            {CurrentFormComponent && (
              <CurrentFormComponent
                specialty={specialty}
                selectedSpecialization={selectedSpecialization}
                onNext={handleStepComplete}
                onPrevious={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                onBack={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                isFirstStep={currentStep === 0}
                isLastStep={currentStep === STEPS.length - 1}
                showCountrySwitcher={showCountrySwitcher && currentStep === 0}
                selectedCountry={selectedCountry}
                onCountryChange={onCountryChange}
              />
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8">
            <HelpSection />
          </div>
        </div>
      </div>
    </div>
  );
}