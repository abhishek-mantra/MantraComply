export type RoleType = 'SUPER_ADMIN' | 'ADMIN' | 'CREDENTIALING_SPECIALIST' | 'REPRESENTATIVE' | 'ORG ADMIN' | 'PROVIDER' | string;

export interface PermissionSet {
  module: string;
  view: boolean;
  edit: boolean;
  approve: boolean;
  assign: boolean;
}

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  userCount: number;
  dataScope: 'ALL' | 'ASSIGNED_ONLY';
  permissions: PermissionSet[];
}

export interface ProviderApplication {
  id: number;
  name: string;
  date: string;
  email: string;
  phone: string;
  organization: string;
  organizations?: string[];
  service: string;
  country: string;
  countryFlag?: string;
  status: 'DRAFT' | 'NEEDS INFO' | 'APPROVED' | 'SUBMITTED' | 'UNDER REVIEW' | 'REJECTED';
  assignedSpecialist?: string | null;
  referredBy?: string;
  onboardedBy?: string;
  opsResponsible?: string;
  credentialingStartDate?: string;
  enrollmentStartDate?: string;
  notes?: string;
}

export interface FacilityApplication {
  id: string;
  name: string;
  type: 'GROUP' | 'FACILITY';
  date: string;
  email: string;
  phone: string;
  organization: string;
  organizations?: string[];
  service: string;
  country: string;
  countryFlag?: string;
  status: 'DRAFT' | 'NEEDS INFO' | 'APPROVED' | 'SUBMITTED' | 'UNDER REVIEW' | 'REJECTED';
  assignedSpecialist?: string | null;
  referredBy?: string;
  onboardedBy?: string;
  opsResponsible?: string;
  credentialingStartDate?: string;
  enrollmentStartDate?: string;
}

export interface ClientActivity {
  id: string;
  type: 'STAGE_UPDATED' | 'VERIFICATION_COMPLETED' | 'NOTE_ADDED' | 'SANCTION_CHECK' | 'CAQH_ATTESTED' | 'DOCUMENT_VERIFIED';
  title: string;
  subtitle?: string;
  badgeText?: string;
  timestamp: string;
}

export interface ClientDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  expiryDate?: string;
  status: 'VERIFIED' | 'PENDING' | 'RESUBMITTED';
  documentNumber?: string;
  uploadedBy?: string;
  size?: string;
}

export interface EnrollmentRecord {
  id: number;
  providerName: string;
  organization: string;
  service: string;
  state: string;
  type: string;
  payer: string;
  insurance?: string;
  priority: 'High' | 'Medium' | 'Low' | string;
  status: string;
  dateOfSubmission?: string;
  referenceNumber?: string;
  followUpDate?: string;
  responsibleUser?: string;
  assignedSpecialist?: string;
  effectiveDate?: string;
  recredentialingDate?: string;
  providerInsuranceId?: string;
  notes?: string;
  date?: string;
  progressStep?: number;
  category?: string;
  email?: string;
  phone?: string;
  timezone?: string;
  payerNetwork?: string;
  applicationType?: string;
  medicalGroup?: string;
  startDate?: string;
  approvalDate?: string;
  resubmittedDate?: string;
  activities?: ClientActivity[];
  documents?: ClientDocument[];
}

export interface DocumentRecord {
  id: string;
  userName: string;
  uploadDate: string;
  documentName: string;
  expiryDate: string;
  documentType: string;
  status: 'PENDING' | 'VERIFIED' | 'UNVERIFIED' | 'RESUBMITTED';
  opsResponsible?: string;
}

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  organization: string;
  organizations?: string[];
  country: string;
  countryFlag: string;
  service: string;
  signupDate: string;
  role: RoleType;
  status: 'Active' | 'Inactive' | 'Suspended';
  credits?: {
    used: number;
    total: number;
  };
  referredBy?: string;
  onboardedBy?: string;
  opsResponsible?: string;
  credentialingStartDate?: string;
  enrollmentStartDate?: string;
}

export const availableSpecialists = [
  "Anshul Gupta01",
  "Sarah Jenkins",
  "David Miller",
  "Alex Chen",
  "Marcus Vance"
];

export const availableOnboarders = [
  "Self (Portal)",
  "Sarah Jenkins",
  "David Miller",
  "Alex Chen",
  "Anshul Gupta01",
  "Abhishek Madan",
  "Ops Intake",
  "Admin"
];

export const availableOrganizations = [
  "MantraCare",
  "PhysioMantra",
  "MantraCare UK",
  "Lavender Vision PLLC",
  "Aetna Network Group",
  "Kaiser Permanente",
  "UnitedHealth Group",
  "Cigna Behavioral"
];

export const initialRoles: RoleDefinition[] = [
  {
    id: "super_admin",
    name: "SUPER_ADMIN",
    description: "Complete control over the entire platform, including role definition, user role assignments, and all system workflows.",
    isSystem: true,
    userCount: 1,
    dataScope: "ALL",
    permissions: [
      { module: "Credential Applications", view: true, edit: true, approve: true, assign: true },
      { module: "Document Verification", view: true, edit: true, approve: true, assign: true },
      { module: "Enrollment Applications", view: true, edit: true, approve: true, assign: true },
      { module: "User Management", view: true, edit: true, approve: true, assign: true },
      { module: "Plans & Pricing", view: true, edit: true, approve: true, assign: true },
      { module: "Credits Management", view: true, edit: true, approve: true, assign: true },
      { module: "Subscriptions & Orders", view: true, edit: true, approve: true, assign: true }
    ]
  },
  {
    id: "admin",
    name: "ADMIN",
    description: "System administration privileges: manage users, view all compliance modules, assign ops personnel.",
    isSystem: true,
    userCount: 3,
    dataScope: "ALL",
    permissions: [
      { module: "Credential Applications", view: true, edit: true, approve: true, assign: true },
      { module: "Document Verification", view: true, edit: true, approve: true, assign: true },
      { module: "Enrollment Applications", view: true, edit: true, approve: true, assign: true },
      { module: "User Management", view: true, edit: true, approve: false, assign: false },
      { module: "Plans & Pricing", view: true, edit: false, approve: false, assign: false },
      { module: "Credits Management", view: true, edit: true, approve: false, assign: false },
      { module: "Subscriptions & Orders", view: true, edit: false, approve: false, assign: false }
    ]
  },
  {
    id: "org_admin",
    name: "ORG ADMIN",
    description: "Organization level administrator with permissions to manage organization providers, enrollments, and facility details.",
    isSystem: true,
    userCount: 1,
    dataScope: "ALL",
    permissions: [
      { module: "Credential Applications", view: true, edit: true, approve: true, assign: false },
      { module: "Document Verification", view: true, edit: true, approve: false, assign: false },
      { module: "Enrollment Applications", view: true, edit: true, approve: true, assign: false },
      { module: "User Management", view: true, edit: true, approve: false, assign: false },
      { module: "Plans & Pricing", view: true, edit: false, approve: false, assign: false },
      { module: "Credits Management", view: true, edit: false, approve: false, assign: false },
      { module: "Subscriptions & Orders", view: true, edit: false, approve: false, assign: false }
    ]
  },
  {
    id: "specialist",
    name: "CREDENTIALING_SPECIALIST",
    description: "Responsible for reviewing primary source verifications, document validation, and payer enrollment submissions.",
    isSystem: true,
    userCount: 2,
    dataScope: "ASSIGNED_ONLY",
    permissions: [
      { module: "Credential Applications", view: true, edit: true, approve: false, assign: false },
      { module: "Document Verification", view: true, edit: true, approve: true, assign: false },
      { module: "Enrollment Applications", view: true, edit: true, approve: false, assign: false },
      { module: "User Management", view: false, edit: false, approve: false, assign: false },
      { module: "Plans & Pricing", view: false, edit: false, approve: false, assign: false },
      { module: "Credits Management", view: false, edit: false, approve: false, assign: false },
      { module: "Subscriptions & Orders", view: false, edit: false, approve: false, assign: false }
    ]
  },
  {
    id: "provider",
    name: "PROVIDER",
    description: "Healthcare provider with access to their own credentialing application and document uploads.",
    isSystem: true,
    userCount: 12,
    dataScope: "ASSIGNED_ONLY",
    permissions: [
      { module: "Credential Applications", view: true, edit: true, approve: false, assign: false },
      { module: "Document Verification", view: true, edit: true, approve: false, assign: false },
      { module: "Enrollment Applications", view: true, edit: false, approve: false, assign: false },
      { module: "User Management", view: false, edit: false, approve: false, assign: false },
      { module: "Plans & Pricing", view: false, edit: false, approve: false, assign: false },
      { module: "Credits Management", view: false, edit: false, approve: false, assign: false },
      { module: "Subscriptions & Orders", view: false, edit: false, approve: false, assign: false }
    ]
  }
];

export const initialUsers: UserRecord[] = [
  {
    id: 1038,
    name: "Nancy Brooks",
    email: "drnancybrooks@gmail.com",
    phone: "+1 7174905619",
    organization: "MantraCare",
    organizations: ["MantraCare", "MantraCare UK"],
    country: "Canada",
    countryFlag: "🇨🇦",
    service: "THERAPY",
    signupDate: "Oct 29, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 100 },
    referredBy: "Portal (Direct)",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 29, 2026",
    enrollmentStartDate: "Nov 15, 2026"
  },
  {
    id: 1037,
    name: "Nataly Briceno Guerrero",
    email: "bricenoguerreronataly@gmail.com",
    phone: "+1 2172009031",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    country: "United States",
    countryFlag: "🇺🇸",
    service: "OCCUPATIONAL THERAPIST",
    signupDate: "Oct 29, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 100 },
    referredBy: "Dr. Robert Vance",
    onboardedBy: "David Miller",
    opsResponsible: "David Miller",
    credentialingStartDate: "Oct 29, 2026",
    enrollmentStartDate: "Pending"
  },
  {
    id: 1036,
    name: "Sara Hernandez",
    email: "sara1345@aol.com",
    phone: "+1 9152616396",
    organization: "MantraCare",
    organizations: ["MantraCare", "Aetna Network Group"],
    country: "United States",
    countryFlag: "🇺🇸",
    service: "—",
    signupDate: "Oct 28, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 100 },
    referredBy: "Self Referral",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 28, 2026",
    enrollmentStartDate: "Nov 02, 2026"
  },
  {
    id: 1035,
    name: "Roschelle Bailey",
    email: "speechrxpllc@gmail.com",
    phone: "+1 7042995569",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    country: "United States",
    countryFlag: "🇺🇸",
    service: "—",
    signupDate: "Oct 28, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 100 },
    referredBy: "Healthcare Staffing",
    onboardedBy: "David Miller",
    opsResponsible: "David Miller",
    credentialingStartDate: "Oct 28, 2026",
    enrollmentStartDate: "—"
  },
  {
    id: 1034,
    name: "Jack Norwood",
    email: "jack.norwood@hotmail.com",
    phone: "+44 07752068136",
    organization: "MantraCare",
    organizations: ["MantraCare", "MantraCare UK"],
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    service: "THERAPY",
    signupDate: "Oct 28, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 100 },
    referredBy: "NHS Transition Partner",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 28, 2026",
    enrollmentStartDate: "Nov 12, 2026"
  },
  {
    id: 1033,
    name: "Timothy Everton Wilson",
    email: "tim@twilsonassociates.com",
    phone: "+1 4166271019",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    country: "Canada",
    countryFlag: "🇨🇦",
    service: "THERAPY",
    signupDate: "Oct 28, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 100 },
    referredBy: "Canadian Health Network",
    onboardedBy: "Alex Chen",
    opsResponsible: "Alex Chen",
    credentialingStartDate: "Oct 28, 2026",
    enrollmentStartDate: "Nov 20, 2026"
  },
  {
    id: 1031,
    name: "Anshul Gupta01",
    email: "eyemantratirupur04@gmail.com",
    phone: "+1 6502391024",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    country: "United States",
    countryFlag: "🇺🇸",
    service: "OPERATIONS",
    signupDate: "Aug 10, 2026",
    role: "ADMIN",
    status: "Active",
    credits: { used: 0, total: 0 },
    referredBy: "Internal",
    onboardedBy: "Admin",
    opsResponsible: "Anshul Gupta01",
    credentialingStartDate: "Aug 10, 2026",
    enrollmentStartDate: "Aug 15, 2026"
  },
  {
    id: 1030,
    name: "Parker Layne",
    email: "parkerlayne77@gmail.com",
    phone: "+1 4342034048",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    country: "United States",
    countryFlag: "🇺🇸",
    service: "—",
    signupDate: "Oct 27, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 0 },
    referredBy: "Portal (Direct)",
    onboardedBy: "David Miller",
    opsResponsible: "David Miller",
    credentialingStartDate: "Oct 27, 2026",
    enrollmentStartDate: "—"
  },
  {
    id: 1029,
    name: "Sophia Kariotaki",
    email: "skariotaki@yahoo.com",
    phone: "+44 07593236943",
    organization: "MantraCare",
    organizations: ["MantraCare UK"],
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    service: "—",
    signupDate: "Oct 27, 2026",
    role: "CREDENTIALING_SPECIALIST",
    status: "Active",
    credits: { used: 0, total: 0 },
    referredBy: "Ops Recruitment",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 27, 2026",
    enrollmentStartDate: "—"
  },
  {
    id: 1028,
    name: "Tracey Rowlands",
    email: "tracey700@aol.com",
    phone: "+44 07753511109",
    organization: "MantraCare",
    organizations: ["MantraCare UK"],
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    service: "—",
    signupDate: "Oct 27, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 0 },
    referredBy: "Healthcare Staffing",
    onboardedBy: "Alex Chen",
    opsResponsible: "Alex Chen",
    credentialingStartDate: "Oct 27, 2026",
    enrollmentStartDate: "Nov 05, 2026"
  },
  {
    id: 1027,
    name: "Elizabeth Self Lingle",
    email: "lizzyself002@gmail.com",
    phone: "+1 6019415803",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    country: "United States",
    countryFlag: "🇺🇸",
    service: "—",
    signupDate: "Oct 27, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 0 },
    referredBy: "Portal (Direct)",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 27, 2026",
    enrollmentStartDate: "—"
  },
  {
    id: 1026,
    name: "Nicole Jean Magpayo",
    email: "nicolemagpayo3@gmail.com",
    phone: "+63 9164641521",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    country: "Philippines",
    countryFlag: "🇵🇭",
    service: "—",
    signupDate: "Oct 27, 2026",
    role: "ADMIN",
    status: "Active",
    credits: { used: 0, total: 0 },
    referredBy: "Internal",
    onboardedBy: "Admin",
    opsResponsible: "Anshul Gupta01",
    credentialingStartDate: "Oct 27, 2026",
    enrollmentStartDate: "—"
  },
  {
    id: 1025,
    name: "Kathleen Diblin",
    email: "profslp1929@gmail.com",
    phone: "+1 6402869150",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    country: "United States",
    countryFlag: "🇺🇸",
    service: "SPEECH THERAPIST",
    signupDate: "Oct 27, 2026",
    role: "PROVIDER",
    status: "Active",
    credits: { used: 0, total: 0 },
    referredBy: "Self Referral",
    onboardedBy: "David Miller",
    opsResponsible: "David Miller",
    credentialingStartDate: "Oct 27, 2026",
    enrollmentStartDate: "Nov 14, 2026"
  },
  {
    id: 1020,
    name: "Emily Richards",
    email: "drk@lavendervisioncare.com",
    phone: "5039294442",
    organization: "Lavender Vision PLLC",
    organizations: ["Lavender Vision PLLC"],
    country: "United States",
    countryFlag: "🇺🇸",
    service: "OTHERSERVICES",
    signupDate: "Oct 27, 2026",
    role: "ORG ADMIN",
    status: "Active",
    credits: { used: 0, total: 0 },
    referredBy: "Direct Clinic Onboarding",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 27, 2026",
    enrollmentStartDate: "Nov 01, 2026"
  }
];

export const initialCredentialProviders: ProviderApplication[] = [
  {
    id: 1038,
    name: "Nancy Brooks",
    date: "Oct 29, 2026",
    email: "drnancybrooks@gmail.com",
    phone: "+1 7174905619",
    organization: "MantraCare",
    organizations: ["MantraCare", "MantraCare UK"],
    service: "THERAPY",
    country: "Canada",
    countryFlag: "🇨🇦",
    status: "APPROVED",
    assignedSpecialist: "Sarah Jenkins",
    referredBy: "Portal (Direct)",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 29, 2026"
  },
  {
    id: 1037,
    name: "Nataly Briceno Guerrero",
    date: "Oct 29, 2026",
    email: "bricenoguerreronataly@gmail.com",
    phone: "+1 2172009031",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    service: "OCCUPATIONAL THERAPIST",
    country: "United States",
    countryFlag: "🇺🇸",
    status: "UNDER REVIEW",
    assignedSpecialist: "David Miller",
    referredBy: "Dr. Robert Vance",
    onboardedBy: "David Miller",
    opsResponsible: "David Miller",
    credentialingStartDate: "Oct 29, 2026"
  },
  {
    id: 1036,
    name: "Sara Hernandez",
    date: "Oct 28, 2026",
    email: "sara1345@aol.com",
    phone: "+1 9152616396",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    service: "THERAPY",
    country: "United States",
    countryFlag: "🇺🇸",
    status: "SUBMITTED",
    assignedSpecialist: "Sarah Jenkins",
    referredBy: "Self Referral",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 28, 2026"
  },
  {
    id: 1035,
    name: "Roschelle Bailey",
    date: "Oct 28, 2026",
    email: "speechrxpllc@gmail.com",
    phone: "+1 7042995569",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    service: "SPEECH THERAPIST",
    country: "United States",
    countryFlag: "🇺🇸",
    status: "NEEDS INFO",
    assignedSpecialist: "David Miller",
    referredBy: "Healthcare Staffing",
    onboardedBy: "David Miller",
    opsResponsible: "David Miller",
    credentialingStartDate: "Oct 28, 2026"
  },
  {
    id: 1034,
    name: "Jack Norwood",
    date: "Oct 28, 2026",
    email: "jack.norwood@hotmail.com",
    phone: "+44 07752068136",
    organization: "MantraCare",
    organizations: ["MantraCare", "MantraCare UK"],
    service: "THERAPY",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "APPROVED",
    assignedSpecialist: "Sarah Jenkins",
    referredBy: "NHS Transition Partner",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 28, 2026"
  },
  {
    id: 1033,
    name: "Timothy Everton Wilson",
    date: "Oct 28, 2026",
    email: "tim@twilsonassociates.com",
    phone: "+1 4166271019",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    service: "THERAPY",
    country: "Canada",
    countryFlag: "🇨🇦",
    status: "DRAFT",
    assignedSpecialist: "Alex Chen",
    referredBy: "Canadian Health Network",
    onboardedBy: "Alex Chen",
    opsResponsible: "Alex Chen",
    credentialingStartDate: "Oct 28, 2026"
  },
  {
    id: 1025,
    name: "Kathleen Diblin",
    date: "Oct 27, 2026",
    email: "profslp1929@gmail.com",
    phone: "+1 6402869150",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    service: "SPEECH THERAPIST",
    country: "United States",
    countryFlag: "🇺🇸",
    status: "APPROVED",
    assignedSpecialist: "Sarah Jenkins",
    referredBy: "Self Referral",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 27, 2026"
  },
  {
    id: 1020,
    name: "Emily Richards",
    date: "Oct 27, 2026",
    email: "drk@lavendervisioncare.com",
    phone: "5039294442",
    organization: "Lavender Vision PLLC",
    organizations: ["Lavender Vision PLLC"],
    service: "OTHERSERVICES",
    country: "United States",
    countryFlag: "🇺🇸",
    status: "APPROVED",
    assignedSpecialist: "Sarah Jenkins",
    referredBy: "Direct Clinic Onboarding",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 27, 2026"
  }
];

export const initialCredentialFacilities: FacilityApplication[] = [
  {
    id: "FAC-101",
    name: "Metro Health Group",
    type: "GROUP",
    date: "Oct 25, 2026",
    email: "contact@metrohealth.org",
    phone: "555-0199",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    service: "BEHAVIORAL HEALTH",
    country: "United States",
    countryFlag: "🇺🇸",
    status: "APPROVED",
    assignedSpecialist: "Sarah Jenkins",
    referredBy: "Hospital Affiliation",
    onboardedBy: "Sarah Jenkins",
    opsResponsible: "Sarah Jenkins",
    credentialingStartDate: "Oct 25, 2026"
  },
  {
    id: "FAC-102",
    name: "St. Jude Clinic Facility",
    type: "FACILITY",
    date: "Oct 20, 2026",
    email: "admin@stjudeclinic.org",
    phone: "555-0245",
    organization: "MantraCare",
    organizations: ["MantraCare"],
    service: "PRIMARY CARE",
    country: "United States",
    countryFlag: "🇺🇸",
    status: "UNDER REVIEW",
    assignedSpecialist: "David Miller",
    referredBy: "State Health System",
    onboardedBy: "David Miller",
    opsResponsible: "David Miller",
    credentialingStartDate: "Oct 20, 2026"
  }
];

export const initialEnrollments: EnrollmentRecord[] = [
  {
    id: 101,
    providerName: "Nancy Brooks",
    organization: "MantraCare",
    service: "THERAPY",
    state: "NY",
    type: "Commercial",
    payer: "Aetna",
    insurance: "Aetna",
    priority: "High",
    status: "Enrolled",
    dateOfSubmission: "10/15/2026",
    referenceNumber: "REF-AET-99214",
    followUpDate: "11/14/2026",
    responsibleUser: "Sarah Jenkins",
    assignedSpecialist: "Sarah Jenkins",
    effectiveDate: "10/25/2026",
    recredentialingDate: "10/25/2028",
    providerInsuranceId: "AET-7890123",
    notes: "Enrollment contract counter-signed by network manager."
  },
  {
    id: 102,
    providerName: "Nataly Briceno Guerrero",
    organization: "MantraCare",
    service: "OCCUPATIONAL THERAPIST",
    state: "IL",
    type: "Medicaid",
    payer: "Blue Cross Blue Shield",
    insurance: "Blue Cross Blue Shield",
    priority: "High",
    status: "In Progress",
    dateOfSubmission: "10/18/2026",
    referenceNumber: "REF-BCBS-4412",
    followUpDate: "11/08/2026",
    responsibleUser: "David Miller",
    assignedSpecialist: "David Miller",
    effectiveDate: "—",
    recredentialingDate: "—",
    providerInsuranceId: "PENDING-001",
    notes: "Awaiting committee review scheduled for first week of November."
  },
  {
    id: 103,
    providerName: "Sara Hernandez",
    organization: "MantraCare",
    service: "THERAPY",
    state: "TX",
    type: "Commercial",
    payer: "Cigna",
    insurance: "Cigna",
    priority: "Medium",
    status: "LOI Submitted",
    dateOfSubmission: "10/20/2026",
    referenceNumber: "REF-CIG-8821",
    followUpDate: "11/10/2026",
    responsibleUser: "Sarah Jenkins",
    assignedSpecialist: "Sarah Jenkins",
    effectiveDate: "—",
    recredentialingDate: "—",
    providerInsuranceId: "—",
    notes: "Letter of intent submitted to regional contracting department."
  },
  {
    id: 104,
    providerName: "Roschelle Bailey",
    organization: "MantraCare",
    service: "SPEECH THERAPIST",
    state: "NC",
    type: "Medicare",
    payer: "UnitedHealthcare",
    insurance: "UnitedHealthcare",
    priority: "Medium",
    status: "Network Status Verification",
    dateOfSubmission: "10/22/2026",
    referenceNumber: "REF-UHC-3109",
    followUpDate: "11/05/2026",
    responsibleUser: "David Miller",
    assignedSpecialist: "David Miller",
    effectiveDate: "—",
    recredentialingDate: "—",
    providerInsuranceId: "—",
    notes: "Verifying network adequacy for Speech Pathology specialization."
  },
  {
    id: 105,
    providerName: "Jack Norwood",
    organization: "MantraCare",
    service: "THERAPY",
    state: "FL",
    type: "Commercial",
    payer: "Humana",
    insurance: "Humana",
    priority: "Low",
    status: "Submitted",
    dateOfSubmission: "10/26/2026",
    referenceNumber: "REF-HUM-5521",
    followUpDate: "11/20/2026",
    responsibleUser: "Sarah Jenkins",
    assignedSpecialist: "Sarah Jenkins",
    effectiveDate: "—",
    recredentialingDate: "—",
    providerInsuranceId: "—",
    notes: "Application packet submitted via Availity payer portal."
  },
  {
    id: 106,
    providerName: "Timothy Everton Wilson",
    organization: "MantraCare",
    service: "THERAPY",
    state: "CA",
    type: "Commercial",
    payer: "Kaiser Permanente",
    insurance: "Kaiser Permanente",
    priority: "Low",
    status: "Pending",
    dateOfSubmission: "10/28/2026",
    referenceNumber: "REF-KP-1029",
    followUpDate: "11/25/2026",
    responsibleUser: "Alex Chen",
    assignedSpecialist: "Alex Chen",
    effectiveDate: "—",
    recredentialingDate: "—",
    providerInsuranceId: "—",
    notes: "Initial intake gathered. Ready for provider signature."
  }
];

export const initialAdminDocuments: DocumentRecord[] = [
  {
    id: "DOC-001",
    userName: "Nancy Brooks",
    uploadDate: "10/29/2026",
    documentName: "State Medical License - NY.pdf",
    expiryDate: "12/31/2027",
    documentType: "Medical License",
    status: "VERIFIED",
    opsResponsible: "Sarah Jenkins"
  },
  {
    id: "DOC-002",
    userName: "Nancy Brooks",
    uploadDate: "10/29/2026",
    documentName: "Malpractice Insurance Certificate 2026.pdf",
    expiryDate: "10/15/2027",
    documentType: "Malpractice Insurance",
    status: "VERIFIED",
    opsResponsible: "Sarah Jenkins"
  },
  {
    id: "DOC-003",
    userName: "Nataly Briceno Guerrero",
    uploadDate: "10/29/2026",
    documentName: "OT State License Board Certification.pdf",
    expiryDate: "08/30/2027",
    documentType: "Board Certification",
    status: "PENDING",
    opsResponsible: "David Miller"
  },
  {
    id: "DOC-004",
    userName: "Sara Hernandez",
    uploadDate: "10/28/2026",
    documentName: "DEA Registration Schedule II-V.pdf",
    expiryDate: "05/14/2028",
    documentType: "DEA Certificate",
    status: "PENDING",
    opsResponsible: "Sarah Jenkins"
  },
  {
    id: "DOC-005",
    userName: "Roschelle Bailey",
    uploadDate: "10/28/2026",
    documentName: "Speech Pathology Certificate of Clinical Competence.pdf",
    expiryDate: "04/01/2027",
    documentType: "Clinical Competence",
    status: "RESUBMITTED",
    opsResponsible: "David Miller"
  },
  {
    id: "DOC-006",
    userName: "Jack Norwood",
    uploadDate: "10/28/2026",
    documentName: "GMC Registration & Good Standing Certificate.pdf",
    expiryDate: "11/30/2027",
    documentType: "Registration Certificate",
    status: "VERIFIED",
    opsResponsible: "Sarah Jenkins"
  },
  {
    id: "DOC-007",
    userName: "Timothy Everton Wilson",
    uploadDate: "10/28/2026",
    documentName: "CPO Provincial License Renewal.pdf",
    expiryDate: "01/15/2028",
    documentType: "Medical License",
    status: "UNVERIFIED",
    opsResponsible: "Alex Chen"
  }
];
