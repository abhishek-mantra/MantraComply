import { useState, useEffect } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { HelpSection } from "./forms/HelpSection";
import { ProvinceServiceForm } from "./forms/canada/ProvinceServiceForm";
import { ProvincialCollegeRegistrationForm } from "./forms/canada/ProvincialCollegeRegistrationForm";
import { NationalCertificationForm } from "./forms/canada/NationalCertificationForm";
import { QualificationDegreeForm } from "./forms/canada/QualificationDegreeForm";
import { TaxBusinessInformationForm } from "./forms/canada/TaxBusinessInformationForm";
import { InsurancePanelsForm } from "./forms/canada/InsurancePanelsForm";
import { ReleaseFormsForm } from "./forms/canada/ReleaseFormsForm";
import { PersonalInformationForm } from "./forms/shared/PersonalInformationForm";
import { EmploymentHistoryForm } from "./forms/shared/EmploymentHistoryForm";
import { PracticeInformationForm } from "./forms/shared/PracticeInformationForm";
import { MalpracticeInsuranceForm } from "./forms/shared/MalpracticeInsuranceForm";
import { EducationQualificationsForm } from "./forms/shared/EducationQualificationsForm";

const CANADA_STEPS = [
  { id: 1, name: "Provincial License", component: ProvinceServiceForm, showHelp: false },
  { id: 2, name: "Provincial College Registration", component: ProvincialCollegeRegistrationForm, showHelp: true },
  { id: 3, name: "National Certification (CCC)", component: NationalCertificationForm, showHelp: false },
  { 
    id: 4, 
    name: "Personal Information", 
    component: (props: any) => <PersonalInformationForm {...props} country="Canada" />,
    showHelp: false 
  },
  { 
    id: 5, 
    name: "Education & Qualifications", 
    component: (props: any) => <EducationQualificationsForm {...props} country="Canada" />,
    showHelp: false 
  },
  { 
    id: 6, 
    name: "Malpractice Insurance", 
    component: (props: any) => <MalpracticeInsuranceForm {...props} country="Canada" />,
    showHelp: false 
  },
  { 
    id: 7, 
    name: "Employment History", 
    component: (props: any) => <EmploymentHistoryForm {...props} country="Canada" />,
    showHelp: true 
  },
  { 
    id: 8, 
    name: "Practice Information", 
    component: (props: any) => <PracticeInformationForm {...props} country="Canada" />,
    showHelp: false 
  },
  { id: 9, name: "Tax & Business Information", component: TaxBusinessInformationForm, showHelp: true },
  { id: 10, name: "Insurance Panels", component: InsurancePanelsForm, showHelp: true },
  { id: 11, name: "Release Forms", component: ReleaseFormsForm, showHelp: false },
];

interface CanadaCredentialingWizardProps {
  onFormComplete?: () => void;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

export function CanadaCredentialingWizard({ 
  onFormComplete, 
  showCountrySwitcher, 
  selectedCountry, 
  onCountryChange 
}: CanadaCredentialingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [specialty, setSpecialty] = useState<string>("");

  useEffect(() => {
    if (completedSteps.size === CANADA_STEPS.length && onFormComplete) {
      onFormComplete();
    }
  }, [completedSteps, onFormComplete]);

  const handleStepComplete = (data?: any) => {
    if (currentStep === 0 && data?.specialty) {
      setSpecialty(data.specialty);
    }

    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < CANADA_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentFormComponent = CANADA_STEPS[currentStep]?.component;
  const showHelp = CANADA_STEPS[currentStep]?.showHelp;

  return (
    <div className="max-w-7xl mx-auto">
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
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
            {specialty && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Specialty</div>
                <div className="font-medium text-gray-900 capitalize">{specialty}</div>
              </div>
            )}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Progress</div>
              <div className="font-medium text-gray-900">{completedSteps.size}/{CANADA_STEPS.length}</div>
            </div>
            <div className="space-y-1">
              {CANADA_STEPS.map((step, index) => {
                const isCompleted = completedSteps.has(index);
                const isCurrent = index === currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      isCurrent
                        ? "bg-[#E3F2FD] text-[#2563EB]"
                        : isCompleted
                        ? "text-gray-700 hover:bg-gray-50"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        isCompleted
                          ? "bg-[#2563EB] text-white"
                          : isCurrent
                          ? "bg-[#2563EB] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className="text-sm font-medium flex-1 leading-tight">{step.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{CANADA_STEPS[currentStep].name}</h2>
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {CANADA_STEPS.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-[#2563EB] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / CANADA_STEPS.length) * 100}%` }}
                />
              </div>
            </div>

            {CurrentFormComponent && (
              <CurrentFormComponent
                specialty={specialty}
                onNext={handleStepComplete}
                onBack={currentStep > 0 ? handleBack : undefined}
                stepNumber={currentStep + 1}
                totalSteps={CANADA_STEPS.length}
                isLastStep={currentStep === CANADA_STEPS.length - 1}
                showCountrySwitcher={showCountrySwitcher && currentStep === 0}
                selectedCountry={selectedCountry}
                onCountryChange={onCountryChange}
              />
            )}
          </div>

          {showHelp && (
            <div className="mt-6">
              <HelpSection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}