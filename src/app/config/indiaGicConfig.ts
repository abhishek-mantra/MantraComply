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

// Complete Aspirational Districts from NITI Aayog Annexure (112 official + state reorganized/replica entries)
export interface AspirationalDistrict {
  district: string;
  state: string;
}

export const ASPIRATIONAL_DISTRICTS: AspirationalDistrict[] = [
  // Andhra Pradesh
  { district: "Alluri Sitharama Raju", state: "Andhra Pradesh" },
  { district: "Parvathipuram Manyam", state: "Andhra Pradesh" },
  { district: "Visakhapatnam", state: "Andhra Pradesh" },
  { district: "Vizianagaram", state: "Andhra Pradesh" },
  { district: "Y.S.R. Kadapa", state: "Andhra Pradesh" },
  // Arunachal Pradesh
  { district: "Namsai", state: "Arunachal Pradesh" },
  // Assam
  { district: "Baksa", state: "Assam" },
  { district: "Barpeta", state: "Assam" },
  { district: "Darrang", state: "Assam" },
  { district: "Dhubri", state: "Assam" },
  { district: "Goalpara", state: "Assam" },
  { district: "Hailakandi", state: "Assam" },
  { district: "Udalguri", state: "Assam" },
  // Bihar
  { district: "Araria", state: "Bihar" },
  { district: "Aurangabad", state: "Bihar" },
  { district: "Banka", state: "Bihar" },
  { district: "Begusarai", state: "Bihar" },
  { district: "Gaya", state: "Bihar" },
  { district: "Jamui", state: "Bihar" },
  { district: "Katihar", state: "Bihar" },
  { district: "Khagaria", state: "Bihar" },
  { district: "Muzaffarpur", state: "Bihar" },
  { district: "Nawada", state: "Bihar" },
  { district: "Purnia", state: "Bihar" },
  { district: "Sheikhpura", state: "Bihar" },
  { district: "Sitamarhi", state: "Bihar" },
  // Chhattisgarh
  { district: "Bastar", state: "Chhattisgarh" },
  { district: "Bijapur", state: "Chhattisgarh" },
  { district: "Dantewada (Dakshin Bastar)", state: "Chhattisgarh" },
  { district: "Kanker (Uttar Bastar)", state: "Chhattisgarh" },
  { district: "Kondagaon", state: "Chhattisgarh" },
  { district: "Korba", state: "Chhattisgarh" },
  { district: "Mahasamund", state: "Chhattisgarh" },
  { district: "Narayanpur", state: "Chhattisgarh" },
  { district: "Rajnandgaon", state: "Chhattisgarh" },
  { district: "Sukma", state: "Chhattisgarh" },
  // Gujarat
  { district: "Dahod", state: "Gujarat" },
  { district: "Narmada", state: "Gujarat" },
  // Haryana
  { district: "Nuh (Mewat)", state: "Haryana" },
  // Himachal Pradesh
  { district: "Chamba", state: "Himachal Pradesh" },
  // Jammu & Kashmir
  { district: "Baramulla", state: "Jammu & Kashmir" },
  { district: "Kupwara", state: "Jammu & Kashmir" },
  // Jharkhand
  { district: "Bokaro", state: "Jharkhand" },
  { district: "Chatra", state: "Jharkhand" },
  { district: "Dumka", state: "Jharkhand" },
  { district: "Garhwa", state: "Jharkhand" },
  { district: "Giridih", state: "Jharkhand" },
  { district: "Godda", state: "Jharkhand" },
  { district: "Gumla", state: "Jharkhand" },
  { district: "Hazaribagh", state: "Jharkhand" },
  { district: "Khunti", state: "Jharkhand" },
  { district: "Latehar", state: "Jharkhand" },
  { district: "Lohardaga", state: "Jharkhand" },
  { district: "Pakur", state: "Jharkhand" },
  { district: "Palamu", state: "Jharkhand" },
  { district: "Pashchimi Singhbhum (West Singhbhum)", state: "Jharkhand" },
  { district: "Purbi Singhbhum (East Singhbhum)", state: "Jharkhand" },
  { district: "Ramgarh", state: "Jharkhand" },
  { district: "Ranchi", state: "Jharkhand" },
  { district: "Sahibganj", state: "Jharkhand" },
  { district: "Simdega", state: "Jharkhand" },
  // Karnataka
  { district: "Raichur", state: "Karnataka" },
  { district: "Yadgir", state: "Karnataka" },
  // Kerala
  { district: "Wayanad", state: "Kerala" },
  // Madhya Pradesh
  { district: "Barwani", state: "Madhya Pradesh" },
  { district: "Chhatarpur", state: "Madhya Pradesh" },
  { district: "Damoh", state: "Madhya Pradesh" },
  { district: "Guna", state: "Madhya Pradesh" },
  { district: "Khandwa (East Nimar)", state: "Madhya Pradesh" },
  { district: "Rajgarh", state: "Madhya Pradesh" },
  { district: "Singrauli", state: "Madhya Pradesh" },
  { district: "Vidisha", state: "Madhya Pradesh" },
  // Maharashtra
  { district: "Gadchiroli", state: "Maharashtra" },
  { district: "Nandurbar", state: "Maharashtra" },
  { district: "Osmanabad (Dharashiv)", state: "Maharashtra" },
  { district: "Washim", state: "Maharashtra" },
  // Manipur
  { district: "Chandel", state: "Manipur" },
  // Meghalaya
  { district: "Ri Bhoi", state: "Meghalaya" },
  // Mizoram
  { district: "Mamit", state: "Mizoram" },
  { district: "Saiha", state: "Mizoram" },
  // Nagaland
  { district: "Kiphire", state: "Nagaland" },
  // Odisha
  { district: "Balangir", state: "Odisha" },
  { district: "Dhenkanal", state: "Odisha" },
  { district: "Gajapati", state: "Odisha" },
  { district: "Kalahandi", state: "Odisha" },
  { district: "Kandhamal", state: "Odisha" },
  { district: "Koraput", state: "Odisha" },
  { district: "Malkangiri", state: "Odisha" },
  { district: "Nabarangpur", state: "Odisha" },
  { district: "Nuapada", state: "Odisha" },
  { district: "Rayagada", state: "Odisha" },
  { district: "Subarnapur (Sonepur)", state: "Odisha" },
  // Punjab
  { district: "Faridkot", state: "Punjab" },
  { district: "Ferozepur", state: "Punjab" },
  { district: "Moga", state: "Punjab" },
  // Rajasthan
  { district: "Baran", state: "Rajasthan" },
  { district: "Churu", state: "Rajasthan" },
  { district: "Dholpur", state: "Rajasthan" },
  { district: "Jaisalmer", state: "Rajasthan" },
  { district: "Karauli", state: "Rajasthan" },
  { district: "Sirohi", state: "Rajasthan" },
  // Sikkim
  { district: "West Sikkim (Gyalshing)", state: "Sikkim" },
  // Tamil Nadu
  { district: "Ramanathapuram", state: "Tamil Nadu" },
  { district: "Sivaganga", state: "Tamil Nadu" },
  { district: "Virudhunagar", state: "Tamil Nadu" },
  // Telangana
  { district: "Asifabad (Kumuram Bheem)", state: "Telangana" },
  { district: "Bhadradri Kothagudem", state: "Telangana" },
  { district: "Jayashankar Bhupalpally", state: "Telangana" },
  // Tripura
  { district: "Dhalai", state: "Tripura" },
  // Uttar Pradesh
  { district: "Bahraich", state: "Uttar Pradesh" },
  { district: "Balrampur", state: "Uttar Pradesh" },
  { district: "Chandauli", state: "Uttar Pradesh" },
  { district: "Chitrakoot", state: "Uttar Pradesh" },
  { district: "Fatehpur", state: "Uttar Pradesh" },
  { district: "Shravasti", state: "Uttar Pradesh" },
  { district: "Siddharthnagar", state: "Uttar Pradesh" },
  { district: "Sonbhadra", state: "Uttar Pradesh" },
  // Uttarakhand
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
  "Documents saved successfully!",
  "General information saved successfully!",
  "Provider information saved successfully!",
  "Infrastructure information saved successfully!",
  "Staff & quality information saved successfully!",
  "Contact information saved successfully!",
  "Proposed rates saved successfully!",
  "Infrastructure images and application submitted successfully!",
] as const;
