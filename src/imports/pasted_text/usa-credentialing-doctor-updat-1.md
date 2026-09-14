I have an existing multi-step credentialing form (12 steps) built for the USA market. 
Do NOT modify any other country forms (UK, UAE) or any other service flows (Therapy, 
Dietitian, Physiotherapist). Only make the following changes to the USA credentialing 
form:

---

CHANGE 1 — STEP 1: National Provider Identifier (NPI)

The first field in Step 1 is "Select your service." Add "Doctor" as a new option in 
this dropdown alongside the existing "Therapy" option.

When the user selects "Doctor," immediately show a new required field below the 
service dropdown called "Select Specialization" (dropdown). Populate it with exactly 
these 21 options in this order:
Cardiologist, Dentist, Dermatologist, Endocrinologist, ENT Specialist, Fertility / IVF 
Specialist, Gastroenterologist, General Physician, General Surgery, Gynecologist, 
Hypertension, Nephrologist, Neurosurgeon, Oncologist, Ophthalmologist, Orthopedician, 
Paediatrician, Pulmonologist (Lung), Rheumatologist, Sexologist, 
Urologist (Kidney & Urinary Tract)

When a specialization is selected, auto-fill the "Taxonomy Code" field with the 
corresponding NUCC taxonomy code for that specialty.

Replace the "Service Type" radio options (Talk Therapy / Medication Management / Both) 
with these three options when Doctor is selected:
- In-person Consultation
- Telehealth
- Both

When "Therapy" is selected, everything in Step 1 must behave exactly as it does today. 
No changes.

---

CHANGE 2 — STEP 5: License Information

When service = Doctor, change the "License Type" dropdown options to:
MD, DO, MBBS, DDS (show only for Dentist specialty), DMD (show only for Dentist 
specialty), MS (Surgery), DNB

Add a new optional field below License Number called "DEA Registration Number" with 
placeholder "Enter DEA number" and helper text "Required if prescribing controlled 
substances."

All other fields (State, Expiration Date, License Certificate upload, + Add License 
button) remain unchanged.

When service = Therapy, Step 5 must behave exactly as it does today.

---

CHANGE 3 — STEP 6: Board Certification

When service = Doctor, change the "Certifying Board" dropdown to show 
specialty-specific boards. The board shown should match the selected specialization 
from Step 1. For example: Cardiologist → American Board of Internal Medicine – 
Cardiovascular Disease; Neurosurgeon → American Board of Neurological Surgery; 
Dentist → American Board of General Dentistry; etc.

Add two new fields below the existing ones:
1. "Residency Program" (text input, required) — label: "Residency Program Name & 
   Hospital"
2. "Residency Years" (two date pickers: Start Year, End Year, required)

For these specializations only — Cardiologist, Gastroenterologist, Endocrinologist, 
Nephrologist, Pulmonologist, Rheumatologist, Oncologist, Fertility / IVF Specialist — 
show two additional fields:
3. "Fellowship Program Name & Hospital" (text input, optional)
4. "Fellowship Completion Year" (year picker, optional)

For these specializations only — Neurosurgeon, General Surgery, Orthopedician, ENT 
Specialist — show one additional field:
5. "Hospital Surgical Privileges" (file upload, PDF/JPG/PNG max 10MB, optional)

When service = Therapy, Step 6 must behave exactly as it does today.

---

CHANGE 4 — STEP 8: Education & Qualifications

When service = Doctor, change the "Degree" dropdown options to:
MD, DO, MBBS, MS (Surgery), DNB, DDS (Dentist only), DMD (Dentist only)

Add the following new required fields inside the Education block, below the existing 
fields:
1. "Medical School Name" (text input)
2. "Country Where Medical Degree Was Obtained" (text input — this already exists, 
   keep it)
3. "Residency Program Name" (text input)
4. "Residency Hospital" (text input)
5. "Residency Specialty" (text input)
6. "Residency Start & End Year" (two year pickers)

For these specializations only — Cardiologist, Gastroenterologist, Endocrinologist, 
Nephrologist, Pulmonologist, Rheumatologist, Oncologist, Fertility / IVF Specialist — 
add these optional fields:
7. "Fellowship Hospital" (text input)
8. "Fellowship Specialty" (text input)
9. "Fellowship Completion Year" (year picker)

The existing "Upload Degree Certificate" and "Upload Official Transcript" fields must 
remain unchanged.

When service = Therapy, Step 8 must behave exactly as it does today.

---

CHANGE 5 — STEP 10: Practice Information

When service = Doctor:
- Auto-select the "Primary Specialty" dropdown value to match the specialization 
  chosen in Step 1
- Pre-check the "Client Populations Served" checkboxes based on specialty:
  Paediatrician → pre-check Children, Adolescents
  Gynecologist → pre-check Adults
  Fertility / IVF Specialist → pre-check Adults, Couples
  All other doctor specialties → pre-check Adults, Seniors
  (User can still change these selections)

- Remove "UAE Nationals" from the Client Populations list (this is a USA form only)

For these specializations only — Cardiologist, Neurosurgeon, General Surgery, 
Orthopedician, ENT Specialist — add a new repeatable section called 
"Hospital Affiliations" with these fields:
  - Hospital Name (text input, required)
  - State (dropdown, required)
  - Admitting Privileges (Yes / No toggle, required)
  - Add Another Hospital button

When service = Therapy, Step 10 must behave exactly as it does today.

---

GLOBAL RULES — apply to all of the above changes:

1. All changes are scoped to the USA credentialing form only. Do not touch UK or UAE 
   form variants.
2. All changes are scoped to the Doctor service flow only. The Therapy, Dietitian, and 
   Physiotherapist flows must remain completely unchanged.
3. The left-side progress sidebar (steps 1–12) and the "Save and Continue" / "Back" 
   navigation must work identically for the Doctor flow as they do for Therapy.
4. The form state must carry the selected "Specialization" value from Step 1 through 
   all subsequent steps so that conditional fields render correctly on Steps 5, 6, 8, 
   and 10.
5. Steps 2 (CAQH Authorization), 3 (CAQH Account Updates), 4 (Personal Information), 
   7 (Malpractice Insurance), 9 (Employment History), 11 (Insurance), and 
   12 (Release Forms) must remain completely unchanged for both Doctor and Therapy flows.
6. All new fields marked "required" must have client-side validation before the 
   user can proceed to the next step.
7. All new file upload fields must accept PDF, JPG, PNG and enforce a 10MB max size, 
   consistent with existing upload fields in the form.