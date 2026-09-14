// Service-specific configuration for UK Credentialing Form
// Supports: Therapy, Dietetics, Physiotherapy, Doctor

export type UKServiceType = "therapy" | "dietetics" | "physiotherapy" | "doctor";

interface ServiceConfig {
  // Step 1 - Professional Registration
  professionalBodies: string[];
  accreditationLevels: string[];
  serviceTypes: string[];
  helpTextLinks: string;
  
  // Step 5 - Education & Qualifications
  degrees: string[];
  fieldsOfStudy: string[];
  
  // Step 6 - Board & Specialist Accreditation
  accreditingBodies: string[];
  accreditationSpecialties: string[];
  
  // Step 8 - Practice Information
  primarySpecialties: string[];
  additionalPopulations: string[];
}

export const UK_SERVICE_CONFIG: Record<UKServiceType, ServiceConfig> = {
  therapy: {
    // Step 1
    professionalBodies: ["BACP", "UKCP", "BPS", "HCPC", "BPC"],
    accreditationLevels: ["Full Accredited Member", "Registered Member", "Associate Member"],
    serviceTypes: ["Talk Therapy", "Medication Management", "Both"],
    helpTextLinks: "visit BACP or HCPC to apply",
    
    // Step 5
    degrees: [
      "BSc Psychology",
      "MSc Psychology",
      "PGDip Counselling",
      "MA Psychotherapy",
      "MSc CBT",
      "BACP-accredited Diploma"
    ],
    fieldsOfStudy: ["Counselling", "Psychotherapy", "Clinical Psychology", "CBT"],
    
    // Step 6
    accreditingBodies: ["BABCP", "EMDR Association UK", "ISSTD", "COSRT", "BACP"],
    accreditationSpecialties: [
      "CBT",
      "EMDR",
      "Trauma-focused",
      "Couples Therapy",
      "Eating Disorders"
    ],
    
    // Step 8
    primarySpecialties: ["CBT", "Psychodynamic", "DBT", "EMDR", "Integrative", "Systemic"],
    additionalPopulations: [] // No additional populations for therapy
  },
  
  dietetics: {
    // Step 1
    professionalBodies: ["HCPC", "BDA (British Dietetic Association)", "AfN"],
    accreditationLevels: ["Full Member", "Associate Member", "Student Member"],
    serviceTypes: ["Clinical Dietetics", "Community Dietetics", "Sports Nutrition", "All of the above"],
    helpTextLinks: "visit HCPC or BDA to apply",
    
    // Step 5
    degrees: [
      "BSc Dietetics",
      "BSc Nutrition & Dietetics",
      "PGDip Dietetics",
      "MSc Clinical Nutrition"
    ],
    fieldsOfStudy: ["Dietetics", "Nutrition", "Nutrition & Dietetics", "Clinical Nutrition"],
    
    // Step 6
    accreditingBodies: ["BDA", "HCPC", "SENR"],
    accreditationSpecialties: [
      "Renal Dietetics",
      "Oncology",
      "Paediatric Dietetics",
      "Gastroenterology",
      "Eating Disorders",
      "Sports Nutrition"
    ],
    
    // Step 8
    primarySpecialties: [
      "Clinical Dietetics",
      "Sports Nutrition",
      "Paediatric Dietetics",
      "Renal Dietetics",
      "Oncology Dietetics",
      "Community Dietetics"
    ],
    additionalPopulations: ["Athletes", "Renal Patients", "Oncology Patients"]
  },
  
  physiotherapy: {
    // Step 1
    professionalBodies: ["HCPC", "CSP (Chartered Society of Physiotherapy)"],
    accreditationLevels: ["Full Member (MCSP)", "Associate Member", "Graduate Member"],
    serviceTypes: [
      "Musculoskeletal",
      "Neurological",
      "Sports & Exercise",
      "Paediatric",
      "All of the above"
    ],
    helpTextLinks: "visit HCPC or CSP to apply",
    
    // Step 5
    degrees: [
      "BSc Physiotherapy",
      "MSc Physiotherapy",
      "PGDip Physiotherapy",
      "BSc Sports Science"
    ],
    fieldsOfStudy: ["Physiotherapy", "Sports & Exercise Science", "Rehabilitation Science"],
    
    // Step 6
    accreditingBodies: ["MACP", "ACPICR", "APCP", "ACPAT", "CSP"],
    accreditationSpecialties: [
      "MSK / Orthopaedics",
      "Neurological",
      "Sports Physiotherapy",
      "Paediatric",
      "Respiratory",
      "Women's Health"
    ],
    
    // Step 8
    primarySpecialties: [
      "MSK / Orthopaedics",
      "Neurological",
      "Sports & Exercise",
      "Paediatric",
      "Respiratory",
      "Women's Health"
    ],
    additionalPopulations: ["Post-surgical", "Stroke Rehab", "Sports Injury"]
  },

  doctor: {
    // Step 1
    professionalBodies: ["GMC (General Medical Council)", "GDC (General Dental Council)", "RCOG (Royal College of Obstetricians and Gynaecologists)", "RCP (Royal College of Physicians)", "RCS (Royal College of Surgeons)", "RCPCH (Royal College of Paediatrics and Child Health)", "Other"],
    accreditationLevels: ["Full Registration (Specialist)", "Full Registration (GP)", "Provisional Registration", "Limited Registration"],
    serviceTypes: ["In-Person Consultation", "Teleconsultation", "Both"],
    helpTextLinks: "visit www.gmc-uk.org to apply. For dental registration, visit www.gdc-uk.org",

    // Step 5
    degrees: [
      "MBBS",
      "MBChB",
      "MD (Doctor of Medicine)",
      "BDS (Bachelor of Dental Surgery)",
      "MDS (Master of Dental Surgery)",
      "MRCP (Member of the Royal College of Physicians)",
      "MRCS (Member of the Royal College of Surgeons)",
      "FRCS (Fellow of the Royal College of Surgeons)",
      "FRCOG (Fellow of the Royal College of Obstetricians)",
      "PhD",
      "Other"
    ],
    fieldsOfStudy: [
      "Medicine (General)",
      "Surgery",
      "Cardiology",
      "Dentistry",
      "Dermatology",
      "Endocrinology",
      "ENT",
      "Gastroenterology",
      "Gynaecology & Obstetrics",
      "Nephrology",
      "Neurology / Neurosurgery",
      "Oncology",
      "Ophthalmology",
      "Orthopaedics",
      "Paediatrics",
      "Pulmonology",
      "Urology",
      "Other"
    ],

    // Step 6
    accreditingBodies: [
      "Royal College of Physicians (RCP)",
      "Royal College of Surgeons (RCS)",
      "Royal College of General Practitioners (RCGP)",
      "Royal College of Obstetricians and Gynaecologists (RCOG)",
      "Royal College of Paediatrics and Child Health (RCPCH)",
      "Royal College of Ophthalmologists (RCOphth)",
      "Royal College of Psychiatrists (RCPsych)",
      "British Dental Association (BDA)",
      "General Medical Council (GMC)",
      "Joint Royal Colleges of Physicians Training Board (JRCPTB)",
      "Other"
    ],
    accreditationSpecialties: [
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
      "Urologist (Kidney & Urinary Tract)"
    ],

    // Step 8
    primarySpecialties: [
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
      "Urologist (Kidney & Urinary Tract)"
    ],
    additionalPopulations: ["Inpatients", "Outpatients", "Emergency / Acute Care"]
  }
};

// Service display names for dropdowns
export const UK_SERVICE_OPTIONS = [
  { value: "therapy", label: "Therapy" },
  { value: "doctor", label: "Doctor" },
  { value: "dietetics", label: "Dietetics" },
  { value: "physiotherapy", label: "Physiotherapy" }
];
