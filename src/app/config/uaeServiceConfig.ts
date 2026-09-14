// Service-specific configuration for UAE Credentialing Form
// Supports: Doctor, Therapy, Dietetics, Physiotherapy

export type UAEServiceType = "doctor" | "therapy" | "dietetics" | "physiotherapy";

interface ServiceConfig {
  // Step 1 (now 2) - Emirate & Authority Selection
  professionalCategories: string[];
  showCDANote: boolean;

  // Step 3 (now 4) - Home Country License
  homeCountryRegulatoryBodyPlaceholder: string;
  experienceHelperText: string;

  // Step 4 (now 5) - Education & Qualifications
  degrees: string[];
  fieldsOfStudy?: string[];

  // Step 6 (now 7) - Prometric Examination
  prometricIntroText: string;

  // Step 7 (now 8) - Work Experience
  workExperienceIntroText: string;

  // Step 11 (now 12) - Practice Information
  specialties: string[];
}

export const UAE_SERVICE_CONFIG: Record<UAEServiceType, ServiceConfig> = {
  doctor: {
    professionalCategories: [
      "General Practitioner (GP)",
      "Specialist",
      "Consultant",
      "Senior Specialist / Senior Consultant",
      "Dental Practitioner",
      "Specialist Dentist",
      "Resident / Trainee Doctor"
    ],
    showCDANote: false,
    homeCountryRegulatoryBodyPlaceholder: "e.g., GMC (UK), MCI (India), AHPRA (Australia), USMLE/ECFMG (USA)",
    experienceHelperText: "DHA requires minimum 2 years post-qualification experience for Specialists. GP track requires minimum 1 year.",
    degrees: [
      "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
      "MBChB",
      "MD (Doctor of Medicine)",
      "BDS (Bachelor of Dental Surgery)",
      "MDS (Master of Dental Surgery)",
      "MS (Master of Surgery)",
      "MCh (Magister Chirurgiae)",
      "DM (Doctorate of Medicine)",
      "FRCS / MRCS",
      "FRCP / MRCP",
      "Other Postgraduate Medical Qualification"
    ],
    fieldsOfStudy: [
      "Cardiologist",
      "Dentist",
      "Dermatologist",
      "Endocrinologist",
      "ENT Specialist",
      "Fertility / IVF Specialist",
      "Gastroenterologist",
      "General Physician",
      "General Surgery",
      "Gynecologist",
      "Hypertension Specialist",
      "Nephrologist",
      "Neurosurgeon",
      "Oncologist",
      "Ophthalmologist",
      "Orthopedician",
      "Paediatrician",
      "Pulmonologist (Lung)",
      "Rheumatologist",
      "Sexologist",
      "Urologist (Kidney & Urinary Tract)",
      "General Medicine",
      "Basic Medical Sciences"
    ],
    prometricIntroText: "Doctor categories in the UAE must pass a Prometric computer-based assessment before a license can be issued. You are allowed 3 attempts across all UAE health authorities combined.",
    workExperienceIntroText: "UAE health authorities require documented post-qualification work experience. DHA requires a minimum of 2 years for Specialists. GP track requires minimum 1 year.",
    specialties: [
      "Cardiologist",
      "Dentist",
      "Dermatologist",
      "Endocrinologist",
      "ENT Specialist",
      "Fertility / IVF Specialist",
      "Gastroenterologist",
      "General Physician",
      "General Surgery",
      "Gynecologist",
      "Hypertension Specialist",
      "Nephrologist",
      "Neurosurgeon",
      "Oncologist",
      "Ophthalmologist",
      "Orthopedician",
      "Paediatrician",
      "Pulmonologist (Lung)",
      "Rheumatologist",
      "Sexologist",
      "Urologist (Kidney & Urinary Tract)",
      "General Medicine",
      "Basic Medical Sciences"
    ]
  },
  therapy: {
    professionalCategories: [
      "Clinical Psychologist",
      "Counsellor",
      "Psychotherapist",
      "Art Therapist",
      "Play Therapist"
    ],
    showCDANote: true,
    homeCountryRegulatoryBodyPlaceholder: "e.g. HCPC (UK), AHPRA (Australia), CRPO (Ontario, Canada)",
    experienceHelperText: "DHA requires minimum 2 years for Clinical Psychologists. CDA requires minimum 1 year.",
    degrees: [
      "BSc Psychology",
      "MSc Psychology",
      "MA Counselling",
      "MSc Psychotherapy",
      "PsyD",
      "PhD Clinical Psychology"
    ],
    prometricIntroText: "Most mental health professional categories in the UAE must pass a Prometric computer-based assessment before a license can be issued. You are allowed 3 attempts across all UAE health authorities combined.",
    workExperienceIntroText: "UAE health authorities require documented post-qualification work experience. DHA Clinical Psychologists require a minimum of 2 years. CDA counsellors require a minimum of 1 year.",
    specialties: [
      "Clinical Psychology",
      "Counselling",
      "Cognitive Behavioural Therapy (CBT)",
      "Dialectical Behaviour Therapy (DBT)",
      "Psychotherapy",
      "Child & Adolescent",
      "Trauma & PTSD",
      "Couples & Family",
      "Neuropsychology"
    ]
  },
  
  dietetics: {
    professionalCategories: [
      "Clinical Dietitian",
      "Nutritionist",
      "Sports Dietitian",
      "Pediatric Dietitian"
    ],
    showCDANote: false,
    homeCountryRegulatoryBodyPlaceholder: "e.g. BDA (UK), Dietitians Australia, AND (USA)",
    experienceHelperText: "DHA requires minimum 2 years post-qualification for Dietitians.",
    degrees: [
      "BSc Nutrition & Dietetics",
      "MSc Clinical Nutrition",
      "MSc Dietetics",
      "PG Diploma in Dietetics"
    ],
    prometricIntroText: "Dietitian categories in the UAE must pass a Prometric computer-based assessment before a license can be issued. You are allowed 3 attempts across all UAE health authorities combined.",
    workExperienceIntroText: "UAE health authorities require documented post-qualification work experience. DHA requires a minimum of 2 years for Dietitians.",
    specialties: [
      "Clinical Nutrition",
      "Sports & Performance Nutrition",
      "Pediatric Nutrition",
      "Renal Dietetics",
      "Oncology Nutrition",
      "Eating Disorders",
      "Diabetes Management",
      "Bariatric Nutrition"
    ]
  },
  
  physiotherapy: {
    professionalCategories: [
      "Physiotherapist",
      "Sports Physiotherapist",
      "Pediatric Physiotherapist",
      "Neurological Physiotherapist"
    ],
    showCDANote: false,
    homeCountryRegulatoryBodyPlaceholder: "e.g. HCPC (UK), AHPRA (Australia), APTA (USA)",
    experienceHelperText: "DHA requires minimum 2 years post-qualification for Physiotherapists.",
    degrees: [
      "BSc Physiotherapy",
      "MSc Physiotherapy",
      "DPT (Doctor of Physical Therapy)"
    ],
    prometricIntroText: "Physiotherapy categories in the UAE must pass a Prometric computer-based assessment before a license can be issued. You are allowed 3 attempts across all UAE health authorities combined.",
    workExperienceIntroText: "UAE health authorities require documented post-qualification work experience. DHA requires a minimum of 2 years for Physiotherapists.",
    specialties: [
      "Musculoskeletal",
      "Neurological Rehabilitation",
      "Pediatric Physiotherapy",
      "Cardiorespiratory",
      "Sports & Exercise",
      "Post-surgical Rehabilitation",
      "Women's Health",
      "Geriatric"
    ]
  }
};

// Service display names for the selection step
export const UAE_SERVICE_OPTIONS = [
  { value: "doctor", label: "Doctor", description: "Medical and surgical healthcare services" },
  { value: "therapy", label: "Therapy", description: "Mental health counseling and psychological services" },
  { value: "dietetics", label: "Dietetics", description: "Nutrition and dietetic services" },
  { value: "physiotherapy", label: "Physiotherapy", description: "Physical therapy and rehabilitation services" }
];

// Doctor specializations for Step 1B
export const DOCTOR_SPECIALIZATIONS = [
  "Cardiologist",
  "Dentist",
  "Dermatologist",
  "Endocrinologist",
  "ENT Specialist",
  "Fertility / IVF Specialist",
  "Gastroenterologist",
  "General Physician",
  "General Surgery",
  "Gynecologist",
  "Hypertension Specialist",
  "Nephrologist",
  "Neurosurgeon",
  "Oncologist",
  "Ophthalmologist",
  "Orthopedician",
  "Paediatrician",
  "Pulmonologist (Lung)",
  "Rheumatologist",
  "Sexologist",
  "Urologist (Kidney & Urinary Tract)",
  "Other"
];
