import { useState, useEffect } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { HelpSection } from "./forms/HelpSection";
import { ServiceSelectionForm } from "./forms/uae/ServiceSelectionForm";
import { EmirateAuthoritySelectionForm } from "./forms/uae/EmirateAuthoritySelectionForm";
import { HomeCountryLicenseForm } from "./forms/uae/HomeCountryLicenseForm";
import { AcademicCredentialsAttestationForm } from "./forms/uae/AcademicCredentialsAttestationForm";
import { DataFlowVerificationForm } from "./forms/uae/DataFlowVerificationForm";
import { PrometricExaminationForm } from "./forms/uae/PrometricExaminationForm";
import { WorkExperienceForm } from "./forms/uae/WorkExperienceForm";
import { FacilityEmployerInformationForm } from "./forms/uae/FacilityEmployerInformationForm";
import { InsurancePanelsForm } from "./forms/uae/InsurancePanelsForm";
import { ReleaseFormsDeclarationForm } from "./forms/uae/ReleaseFormsDeclarationForm";
import { PersonalInformationForm } from "./forms/shared/PersonalInformationForm";
import { EmploymentHistoryForm } from "./forms/shared/EmploymentHistoryForm";
import { PracticeInformationForm } from "./forms/shared/PracticeInformationForm";
import { MalpracticeInsuranceForm } from "./forms/shared/MalpracticeInsuranceForm";
import { EducationQualificationsForm } from "./forms/shared/EducationQualificationsForm";
import type { UAEServiceType } from "../config/uaeServiceConfig";

const UAE_STEPS = [
  { id: 1, name: "Service Selection", component: ServiceSelectionForm, showHelp: false },
  { id: 2, name: "Emirate & Authority Selection", component: EmirateAuthoritySelectionForm, showHelp: false },
  { 
    id: 3, 
    name: "Passport & Personal Information", 
    component: (props: any) => <PersonalInformationForm {...props} country="UAE" />,
    showHelp: true 
  },
  { id: 4, name: "Home Country License", component: HomeCountryLicenseForm, showHelp: false },
  { 
    id: 5, 
    name: "Education & Qualifications", 
    component: (props: any) => <EducationQualificationsForm {...props} country="UAE" />,
    showHelp: false 
  },
  { id: 6, name: "DataFlow Verification", component: DataFlowVerificationForm, showHelp: false },
  { id: 7, name: "Prometric Examination", component: PrometricExaminationForm, showHelp: false },
  { id: 8, name: "Work Experience", component: WorkExperienceForm, showHelp: false },
  { 
    id: 9, 
    name: "Employment History", 
    component: (props: any) => <EmploymentHistoryForm {...props} country="UAE" />,
    showHelp: true 
  },
  { id: 10, name: "Facility / Employer Information", component: FacilityEmployerInformationForm, showHelp: true },
  { 
    id: 11, 
    name: "Professional Indemnity Insurance", 
    component: (props: any) => <MalpracticeInsuranceForm {...props} country="UAE" />,
    showHelp: false 
  },
  { 
    id: 12, 
    name: "Practice Information", 
    component: (props: any) => <PracticeInformationForm {...props} country="UAE" />,
    showHelp: false 
  },
  { id: 13, name: "Insurance Panels", component: InsurancePanelsForm, showHelp: true },
  { id: 14, name: "Release Forms & Declaration", component: ReleaseFormsDeclarationForm, showHelp: false },
];

interface UAECredentialingWizardProps {
  onFormComplete?: () => void;
  showCountrySwitcher?: boolean;
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
}

export function UAECredentialingWizard({
  onFormComplete,
  showCountrySwitcher,
  selectedCountry,
  onCountryChange
}: UAECredentialingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [specialty, setSpecialty] = useState<string>("");
  const [selectedService, setSelectedService] = useState<UAEServiceType | "">("");
  const [doctorSpecialization, setDoctorSpecialization] = useState<string>("");
  const [formData, setFormData] = useState<Record<number, any>>({});

  const steps = UAE_STEPS;

  useEffect(() => {
    if (completedSteps.size === steps.length && onFormComplete) {
      onFormComplete();
    }
  }, [completedSteps, steps.length, onFormComplete]);

  const handleStepComplete = (data?: any) => {
    // Store form data for this step
    setFormData((prev) => ({ ...prev, [currentStep]: data }));

    // Track service selection from Step 1 (Service Selection)
    if (currentStep === 0 && data?.selectedService) {
      // If service changed, reset all dependent steps
      if (data.selectedService !== selectedService) {
        setSelectedService(data.selectedService);
        setSpecialty(data.selectedService);
        // Clear doctor specialization if switching away from doctor
        if (data.selectedService !== "doctor") {
          setDoctorSpecialization("");
        }
        // Reset form data for service-dependent steps
        setFormData((prev) => {
          const newData = { ...prev };
          delete newData[0]; // Step 1 - Service Selection
          delete newData[1]; // Step 2 - Emirate & Authority
          delete newData[3]; // Step 4 - Home Country License
          delete newData[4]; // Step 5 - Education
          delete newData[6]; // Step 7 - Prometric
          delete newData[7]; // Step 8 - Work Experience
          delete newData[11]; // Step 12 - Practice Information
          return newData;
        });
        // Reset completion for dependent steps
        setCompletedSteps((prev) => {
          const newCompleted = new Set(prev);
          newCompleted.delete(0);
          newCompleted.delete(1);
          newCompleted.delete(3);
          newCompleted.delete(4);
          newCompleted.delete(6);
          newCompleted.delete(7);
          newCompleted.delete(11);
          return newCompleted;
        });
      }

      // Track doctor specialization from Step 1
      if (data.selectedService === "doctor" && data.doctorSpecialization) {
        setDoctorSpecialization(data.doctorSpecialization);
      }
    }

    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
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

  const CurrentFormComponent = steps[currentStep]?.component;
  const showHelp = steps[currentStep]?.showHelp;

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
              <div className="font-medium text-gray-900">{completedSteps.size}/{steps.length}</div>
            </div>
            <div className="space-y-1">
              {steps.map((step, index) => {
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
                <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep].name}</h2>
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-[#2563EB] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {CurrentFormComponent && (
              <CurrentFormComponent
                specialty={specialty}
                selectedService={selectedService}
                doctorSpecialization={doctorSpecialization}
                selectedSpecialization={doctorSpecialization}
                onNext={handleStepComplete}
                onBack={currentStep > 0 ? handleBack : undefined}
                stepNumber={currentStep + 1}
                totalSteps={steps.length}
                isLastStep={currentStep === steps.length - 1}
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