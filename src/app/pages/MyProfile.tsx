import { useState } from "react";
import { Settings, LayoutGrid, FileCheck, User, Globe } from "lucide-react";
import { CredentialingWizard } from "../components/CredentialingWizard";
import { UKCredentialingWizard } from "../components/UKCredentialingWizard";
import { CanadaCredentialingWizard } from "../components/CanadaCredentialingWizard";
import { AustraliaCredentialingWizard } from "../components/AustraliaCredentialingWizard";
import { UAECredentialingWizard } from "../components/UAECredentialingWizard";
import { FormSubmittedScreen } from "../components/FormSubmittedScreen";
import { ProfileScreen } from "../components/ProfileScreen";

type ViewState = "credentialing" | "submitted" | "profile";
type Country = "us" | "uk" | "canada" | "australia" | "uae";

export function MyProfile() {
  const [currentView, setCurrentView] = useState<ViewState>("credentialing");
  const [selectedCountry, setSelectedCountry] = useState<Country>("us");
  const [showDevTools, setShowDevTools] = useState(true); // Set to true for easy access in dev

  const handleFormComplete = () => {
    setCurrentView("submitted");
  };

  const handleViewProfile = () => {
    setCurrentView("profile");
  };

  const handleEditCredentialing = () => {
    setCurrentView("credentialing");
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country as Country);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "credentialing":
        // Render the appropriate wizard based on selected country
        switch (selectedCountry) {
          case "us":
            return (
              <CredentialingWizard
                onFormComplete={handleFormComplete}
                showCountrySwitcher={true}
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
              />
            );
          case "uk":
            return (
              <UKCredentialingWizard
                onFormComplete={handleFormComplete}
                showCountrySwitcher={true}
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
              />
            );
          case "canada":
            return (
              <CanadaCredentialingWizard
                onFormComplete={handleFormComplete}
                showCountrySwitcher={true}
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
              />
            );
          case "australia":
            return (
              <AustraliaCredentialingWizard
                onFormComplete={handleFormComplete}
                showCountrySwitcher={true}
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
              />
            );
          case "uae":
            return (
              <UAECredentialingWizard
                onFormComplete={handleFormComplete}
                showCountrySwitcher={true}
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
              />
            );
          default:
            return <CredentialingWizard onFormComplete={handleFormComplete} />;
        }
      case "submitted":
        return <FormSubmittedScreen onViewProfile={handleViewProfile} />;
      case "profile":
        return <ProfileScreen onEditCredentialing={handleEditCredentialing} />;
      default:
        return <CredentialingWizard onFormComplete={handleFormComplete} />;
    }
  };

  const getViewIcon = (view: ViewState) => {
    switch (view) {
      case "credentialing":
        return <LayoutGrid className="w-4 h-4" />;
      case "submitted":
        return <FileCheck className="w-4 h-4" />;
      case "profile":
        return <User className="w-4 h-4" />;
    }
  };

  const getViewLabel = (view: ViewState) => {
    switch (view) {
      case "credentialing":
        return "Credentialing Form";
      case "submitted":
        return "Submitted Screen";
      case "profile":
        return "Profile View";
    }
  };

  const getCountryLabel = (country: Country) => {
    const labels = {
      us: "🇺🇸 United States",
      uk: "🇬🇧 United Kingdom",
      canada: "🇨🇦 Canada",
      australia: "🇦🇺 Australia",
      uae: "🇦🇪 UAE",
    };
    return labels[country];
  };

  return (
    <div>
      {/* Dev Mode Toggle */}
      {showDevTools && (
        <div className="fixed top-20 right-6 z-50 bg-white rounded-xl shadow-xl border-2 border-[#2196F3] p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
            <Settings className="w-5 h-5 text-[#2196F3]" />
            <h3 className="font-semibold text-gray-900">Dev Mode</h3>
            <button
              onClick={() => setShowDevTools(false)}
              className="ml-auto text-gray-400 hover:text-gray-600 text-sm"
            >
              Hide
            </button>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider font-medium">Switch View</p>
            {(["credentialing", "submitted", "profile"] as ViewState[]).map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === view
                    ? "bg-[#2196F3] text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {getViewIcon(view)}
                {getViewLabel(view)}
              </button>
            ))}
          </div>

          {/* Country Switcher in Dev Tools */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider font-medium">
              <Globe className="w-3 h-3 inline mr-1" />
              Country Form
            </p>
            <div className="space-y-1">
              {(["us", "uk", "canada", "australia", "uae"] as Country[]).map((country) => (
                <button
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setCurrentView("credentialing");
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCountry === country && currentView === "credentialing"
                      ? "bg-[#2563EB] text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {getCountryLabel(country)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <span className="font-medium text-gray-700">Current:</span>{" "}
              {getViewLabel(currentView)}
              {currentView === "credentialing" && (
                <>
                  {" • "}
                  {getCountryLabel(selectedCountry)}
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Toggle Dev Tools Button (if hidden) */}
      {!showDevTools && (
        <button
          onClick={() => setShowDevTools(true)}
          className="fixed top-20 right-6 z-50 w-12 h-12 bg-[#2196F3] text-white rounded-full shadow-xl hover:bg-[#1976D2] transition-all flex items-center justify-center"
          title="Show Dev Tools"
        >
          <Settings className="w-6 h-6" />
        </button>
      )}

      {/* Main Content */}
      {renderCurrentView()}
    </div>
  );
}

export default MyProfile;