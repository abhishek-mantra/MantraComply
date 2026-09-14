CONTEXT:
I have an existing 10-step credentialing form built for UK-based therapists 
on a platform called MantraComply. The form is accessed by providers under 
"My Profile > Credentialing". The logged-in user is a Provider (e.g., 
John Wilson). The form has a left sidebar progress tracker (Steps 1–10) 
and a main content area.

DO NOT change anything related to:
- The USA version of this form
- The UAE version of this form
- Any other service type (Therapy, Dietitian, Physiotherapy)
- Navigation, sidebar, header, logout, or any other page outside 
  the UK Credentialing flow
- The visual design system (colors, fonts, button styles, layout grid)

ONLY modify the UK Credentialing form to make it dynamic when the 
selected Service = "Doctor".

---

CHANGE 1 — STEP 1: GMC/Professional Registration (Service Selection)

The very first field is "Select your service". Currently options include 
"Therapy". Add "Doctor" as a new selectable option in this dropdown.

When the user selects "Doctor", the rest of Step 1 must dynamically 
change as follows:

1a. SHOW a new required dropdown immediately below "Select your service" 
    labeled: "Select Specialization *"
    Options (in this exact order):
    - Cardiologist
    - Dentist
    - Dermatologist
    - Endocrinologist
    - ENT Specialist
    - Fertility / IVF Specialist
    - Gastroenterologist
    - General Physician
    - General Surgery
    - Gynecologist
    - Hypertension Specialist
    - Nephrologist
    - Neurosurgeon
    - Oncologist
    - Ophthalmologist
    - Orthopedician
    - Paediatrician
    - Pulmonologist (Lung)
    - Rheumatologist
    - Sexologist
    - Urologist (Kidney & Urinary Tract)

1b. Change the "Primary Professional Body *" dropdown options to the 
    following (replacing the therapy-specific bodies):
    - GMC (General Medical Council) — pre-selected as default
    - GDC (General Dental Council) — shown only if specialization = Dentist
    - RCOG (Royal College of Obstetricians and Gynaecologists) — shown 
      if specialization = Gynecologist or Fertility/IVF Specialist
    - RCP (Royal College of Physicians)
    - RCS (Royal College of Surgeons)
    - RCPCH (Royal College of Paediatrics and Child Health) — shown if 
      specialization = Paediatrician
    - Other (with a free-text field)

    Logic: GMC should be default and always visible. Specialty-specific 
    colleges should appear as additional options based on the specialization 
    selected above.

1c. The field "Registration / Membership Number *" label should change to 
    "GMC Registration Number *" with helper text:
    "This is your unique number issued by the General Medical Council (GMC)."
    For Dentist specialization, label = "GDC Registration Number *" with 
    helper text: "This is your unique number issued by the General Dental 
    Council (GDC)."

1d. The "Accreditation Level *" radio options should change from:
    - Full Accredited Member / Registered Member / Associate Member
    To:
    - Full Registration (Specialist)
    - Full Registration (GP)
    - Provisional Registration
    - Limited Registration

1e. The "Service Type *" radio options should change from:
    Talk Therapy / Medication Management / Both
    To be dynamic based on specialization:

    DEFAULT for most specializations:
    - In-Person Consultation
    - Teleconsultation
    - Both

    ADDITIONAL option shown only for these specializations 
    (Cardiologist, Oncologist, Neurosurgeon, General Surgery, Orthopedician):
    - Surgical Procedures

    ADDITIONAL option shown only for Fertility/IVF Specialist:
    - IVF & Assisted Reproduction

    ADDITIONAL option shown only for Dentist:
    - Routine Dental Care
    - Cosmetic Dentistry
    - Oral Surgery

1f. The info banner at the bottom of Step 1 should change from:
    "If you are not yet registered with a professional body, visit BACP or 
    HCPC to apply."
    To:
    "If you are not yet registered with the GMC, visit www.gmc-uk.org to 
    apply. For dental registration, visit www.gdc-uk.org."

---

CHANGE 2 — STEP 2: DBS Check

No changes needed. This step remains identical for Doctor service. 
The existing England & Wales / Scotland / Northern Ireland logic stays.

---

CHANGE 3 — STEP 3: Professional Indemnity Insurance

Change the info banner text only (when Service = Doctor):
From: "Minimum coverage typically required: £6,000,000 per claim"
To:   "Minimum coverage typically required: £10,000,000 per claim"

All other fields (carrier, policy number, dates, upload) remain the same.

---

CHANGE 4 — STEP 4: Personal Information

No changes needed. All fields remain identical.

---

CHANGE 5 — STEP 5: Education & Qualifications

When Service = Doctor, change the "Degree *" dropdown options to include 
medical degrees at the top of the list (while keeping existing options):
- MBBS
- MBChB
- MD (Doctor of Medicine)
- BDS (Bachelor of Dental Surgery)
- MDS (Master of Dental Surgery)
- MRCP (Member of the Royal College of Physicians)
- MRCS (Member of the Royal College of Surgeons)
- FRCS (Fellow of the Royal College of Surgeons)
- FRCOG (Fellow of the Royal College of Obstetricians)
- PhD
- Other

Change the "Field of Study *" dropdown to include:
- Medicine (General)
- Surgery
- Cardiology
- Dentistry
- Dermatology
- Endocrinology
- ENT
- Gastroenterology
- Gynaecology & Obstetrics
- Nephrology
- Neurology / Neurosurgery
- Oncology
- Ophthalmology
- Orthopaedics
- Paediatrics
- Pulmonology
- Urology
- Other

All upload fields and add/remove degree logic remain the same.

---

CHANGE 6 — STEP 6: Board & Specialist Accreditation

When Service = Doctor, change the "Accrediting Body *" dropdown to:
- Royal College of Physicians (RCP)
- Royal College of Surgeons (RCS)
- Royal College of General Practitioners (RCGP)
- Royal College of Obstetricians and Gynaecologists (RCOG)
- Royal College of Paediatrics and Child Health (RCPCH)
- Royal College of Ophthalmologists (RCOphth)
- Royal College of Psychiatrists (RCPsych)
- British Dental Association (BDA)
- General Medical Council (GMC)
- Joint Royal Colleges of Physicians Training Board (JRCPTB)
- Other

Change the "Accreditation Type / Specialty *" dropdown to mirror the 
same 21 specializations listed in CHANGE 1 above.

All date fields, upload, and add accreditation logic remain the same.

---

CHANGE 7 — STEP 7: Employment History

No changes needed. All fields remain identical.

---

CHANGE 8 — STEP 8: Practice Information

When Service = Doctor, make these field changes:

8a. "Practice Setting *" dropdown options change to:
    - NHS Hospital
    - Private Hospital / Clinic
    - GP Practice
    - Polyclinic
    - Telehealth Only
    - Mixed (NHS + Private)

8b. "Primary Specialty *" dropdown should be auto-populated / 
    pre-filled with the specialization selected in Step 1 
    (but remain editable).

8c. "Client Populations Served *" checkboxes — add the following 
    additional option (while keeping all existing ones):
    - Inpatients
    - Outpatients
    - Emergency / Acute Care

8d. Replace "Are you registered with Healthcode? *" with:
    "Are you registered with the NHS Spine? *" (Yes / No dropdown)
    AND add a new field below it:
    "Do you hold an NHS contract? *" (Yes / No / In Progress dropdown)

All other fields (phone, email, languages, telehealth, new patients) 
remain unchanged.

---

CHANGE 9 — STEP 9: Insurance Panels

No changes needed. The same UK private health insurers 
(Bupa, AXA Health, Aviva, WPA, Vitality, Cigna, Aetna, Other) 
apply to doctors as well.

---

CHANGE 10 — STEP 10: Release Forms

No changes needed. The BAA, Provider Agreement, and GDPR consent 
sections remain identical.

---

DYNAMIC LOGIC SUMMARY (State Management Rules):

- IF service = "Therapy" → show the existing form exactly as-is 
  (zero changes)
- IF service = "Doctor" → apply ALL changes described above 
  (Changes 1–10)
- The specialization selection in Step 1 must persist in memory 
  throughout the session so that Steps 5, 6, and 8 can reference 
  it for auto-populating or filtering dropdowns
- The progress tracker sidebar (Steps 1–10) labels and step count 
  must remain unchanged — do not add or remove any steps
- The "Save and Continue" / "Back" button behavior and validation 
  logic must work identically to the existing therapy flow
- All required fields (*) must still be validated before proceeding
- The "Need Help?" footer banner at the bottom should remain unchanged

---

VISUAL RULES:
- Do not change any colors, typography, spacing, border-radius, 
  or button styles
- New dropdowns, radio buttons, and checkboxes must match the 
  exact existing component style
- Info banners (blue border-left style) must use the same styling
- Warning banners (yellow/amber, triangle icon) must use the same 
  styling as seen in Step 10