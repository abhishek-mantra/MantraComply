// Configuration and constants for India GIC Common Empanelment for Hospital

export const INDIA_STATES = [
  "ANDAMAN & NICOBAR ISLANDS",
  "ANDHRA PRADESH",
  "ARUNACHAL PRADESH",
  "ASSAM",
  "BIHAR",
  "CHANDIGARH",
  "CHHATTISGARH",
  "DADRA & NAGAR HAVELI",
  "DELHI",
  "GOA",
  "GUJARAT",
  "HARYANA",
  "HIMACHAL PRADESH",
  "JAMMU & KASHMIR",
  "JHARKHAND",
  "KARNATAKA",
  "KERALA",
  "MADHYA PRADESH",
  "MAHARASHTRA",
  "MANIPUR",
  "MEGHALAYA",
  "MIZORAM",
  "NAGALAND",
  "ORISSA",
  "PUDUCHERRY",
  "PUNJAB",
  "RAJASTHAN",
  "SIKKIM",
  "TAMIL NADU",
  "TELANGANA",
  "TRIPURA",
  "UTTARAKHAND",
  "UTTAR PRADESH",
  "WEST BENGAL",
] as const;

export const LICENSING_LAWS = [
  "Clinical Establishments Act",
  "Andhra Pradesh Private Medical Care Establishments Act, 2002",
  "Bombay Nursing Homes Registration Act, 1949",
  "Delhi Nursing Homes Registration Act, 1953",
  "Madhya Pradesh Upcharya Griha Tatha Rujopchar Sanbabdu Sthapana Adhiniyam, 1973",
  "Manipur Homes and Clinics Registration Act, 1992",
  "Nagaland Health Care Establishments Act, 1997",
  "Orissa Clinical Establishments (Control and Regulation) Act, 1990",
  "Punjab State Nursing Home Registration Act, 1991",
  "West Bengal Clinical Establishments Act, 1950",
  "Others",
] as const;

export const OWNERSHIP_TYPES = [
  "Public Limited Company – Listed",
  "Public Limited Company – Unlisted",
  "Private Limited Company",
  "Trust",
  "Partnership Firm",
  "Sole Proprietorship",
  "Other",
] as const;

export const NABH_ACCREDITATION_TYPES = [
  "NABH- Entry Level",
  "NABH- Full",
  "NABH- Progressive",
  "NOT APPLICABLE",
] as const;

export const SERVICE_AVAILABILITY_OPTIONS = [
  "Not Available",
  "Outsourced",
  "In-house",
] as const;

// Sample Aspirational Districts from Annexure (TODO: Load complete Annexure list from NITI Aayog source)
export interface AspirationalDistrict {
  district: string;
  state: string;
}

export const ASPIRATIONAL_DISTRICTS: AspirationalDistrict[] = [
  { district: "Vizianagaram", state: "Andhra Pradesh" },
  { district: "Visakhapatnam", state: "Andhra Pradesh" },
  { district: "Y.S.R. Kadapa", state: "Andhra Pradesh" },
  { district: "Namsai", state: "Arunachal Pradesh" },
  { district: "Sonbhadra", state: "Uttar Pradesh" },
  { district: "Haridwar", state: "Uttarakhand" },
  { district: "Udham Singh Nagar", state: "Uttarakhand" },
];

// 20 Medical specialties in exact source spelling and order
export const MEDICAL_SPECIALTIES = [
  "General Surgery",
  "Medicine",
  "Plastic Surgery",
  "Orthopedics",
  "OBGY",
  "Peadriatics", // Keep source spelling
  "Burns Unit",
  "Nuclear Medicine",
  "Neonatology",
  "Cardiology",
  "CVTS",
  "ENT",
  "Ophthalmology",
  "Neurosurgery",
  "Nephrology",
  "Reconstructive Surgery",
  "Oncology",
  "Neonatal/ Paediatric Surgery",
  "Urology",
  "Bariatric Surgery",
] as const;

// 31 Insurance companies for empanelment
export const INSURANCE_COMPANIES = [
  "Acko General Insurance Limited",
  "Bajaj General Insurance Ltd",
  "Cholamandalam MS GIC",
  "Generali Central Insurance Co Ltd",
  "Go Digit General Insurance Ltd",
  "HDFC Ergo General Insurance Co Ltd",
  "ICICI Lombard GIC Ltd",
  "IFFCO-Tokio GIC Ltd",
  "Zurich Kotak General Insurance",
  "Liberty General Insurance Ltd",
  "Magma General Insurance Ltd",
  "Navi General Insurance Limited",
  "Raheja QBE GIC Ltd",
  "IndusInd General Insurance Co Ltd",
  "Royal Sundaram GIC Ltd",
  "SBI General Insurance Co Ltd",
  "Shriram General Insurance Co Ltd",
  "Tata-AIG General Insurance Co Ltd",
  "Universal Sompo GIC Ltd",
  "Zuno General Insurance Ltd",
  "Aditya Birla Health Insurance",
  "Care Health Insurance Ltd",
  "Galaxy Health Insurance Co Ltd",
  "ManipalCigna-TTK Health Insurance Co Ltd",
  "Narayana Health Insurance Ltd",
  "Niva Bupa Health Insurance Co Ltd",
  "Star Health & Allied Insurance Co Ltd",
  "National Insurance Company (NIC)",
  "The New India Assurance Co. Ltd",
  "United India Insurance Co Ltd",
  "Oriental Insurance Co Ltd",
] as const;

// Documents
export const MANDATORY_DOCUMENTS = [
  "Hospital Registration Certificate",
  "Rohini Reg Certificate",
  "Proof of Ownership or Lease",
  "KYC documents of the Owner Entity",
  "KYC documents Authorized Signatory/ Beneficiary",
  "Hospital's Pan Card Copy",
  "Hospital's Cancelled Cheque",
  "Building plan authorised by civic body",
  "PCB NOC",
  "Fire Safety NOC",
  "BMW management certificate",
] as const;

export const OPTIONAL_DOCUMENTS = [
  "GST number of the Hospital, if applicable",
  "SOC",
  "Accreditation certificate-NABH,JCI,JACHO",
  "Lift commission certificate",
  "PCPNDT Reg Certificate",
  "MTP certificate",
  "AERB Licences for imaging services",
  "FDA Licences for Inhouse Pharmacy",
  "FDA Licences for Inhouse Blood bank",
  "NDPS licences for inhouse pharmacy",
  "HOTA Registration Certificate",
  "Others",
] as const;

// Infrastructure Images
export interface ImageSlotConfig {
  id: string;
  label: string;
  required: boolean;
}

export const INFRASTRUCTURE_IMAGE_SLOTS: ImageSlotConfig[] = [
  { id: "addressProof", label: "Hospitals Address Proof Photo", required: true },
  { id: "frontEntrance", label: "Hospital Front Entrance Photo", required: true },
  { id: "exteriorView", label: "Hospital Exterior View (Optional)", required: false },
  { id: "mainReception", label: "Main Reception Area (Optional)", required: false },
  { id: "patientWaiting", label: "Patient Waiting Area (Optional)", required: false },
  { id: "opdView", label: "OPD View (Optional)", required: false },
  { id: "otView", label: "Operation Theatre (OT) View (Optional)", required: false },
  { id: "icuView", label: "ICU View (Optional)", required: false },
  { id: "consultationChamber", label: "Consultation Chamber (Optional)", required: false },
  { id: "patientRoomInterior", label: "Patient Room Interior (Optional)", required: false },
  { id: "pathologyLab", label: "Pathology Lab (Optional)", required: false },
  { id: "specializedEquipment", label: "Specialized Equipment (Optional)", required: false },
  { id: "otherSupporting", label: "Other Supporting Image (Optional)", required: false },
];

export const STEP_SAVE_MESSAGES = [
  "General information saved successfully!",
  "Provider information saved successfully!",
  "Infrastructure information saved successfully!",
  "Staff & quality information saved successfully!",
  "Contact information saved successfully!",
  "Proposed rates saved successfully!",
  "Documents saved successfully!",
  "Images saved successfully!",
  "Application submitted successfully!",
] as const;
