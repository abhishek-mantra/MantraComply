I have an existing multi-step credentialing form (10 steps) for a platform 
called MantraComply. The form currently supports only Therapy as a service 
type for UK providers. 

I need you to make the form dynamic to also support Dietetics and 
Physiotherapy — for the UK region only. Do not change any other region's 
forms, any other user flows, or any other part of the application.

─────────────────────────────────────────
CONTEXT: HOW THE FORM CURRENTLY WORKS
─────────────────────────────────────────
- The form has 10 steps shown in a left sidebar with a progress tracker.
- Step 1 starts with a "Select your service" dropdown — this is the 
  branching point.
- Currently the only option in that dropdown is a therapy-related service.
- All logic below is scoped to: country = UK, form = Credentialing.

─────────────────────────────────────────
WHAT TO CHANGE — STEP BY STEP
─────────────────────────────────────────

STEP 1 — GMC / Professional Registration
This is the only step with major field-level changes.
Make the following fields dynamic based on the selected service:

[A] "Select your service" dropdown — add these new options:
    - Dietetics
    - Physiotherapy
    (Keep existing Therapy option exactly as is)

[B] "Primary Professional Body" dropdown — swap options based on service:
    - Therapy (existing):   BACP, UKCP, BPS, HCPC, BPC
    - Dietetics (new):      HCPC, BDA (British Dietetic Association), AfN
    - Physiotherapy (new):  HCPC, CSP (Chartered Society of Physiotherapy)

[C] "Accreditation Level" radio options — swap based on service:
    - Therapy (existing):   Full Accredited Member, Registered Member, 
                            Associate Member
    - Dietetics (new):      Full Member, Associate Member, Student Member
    - Physiotherapy (new):  Full Member (MCSP), Associate Member, 
                            Graduate Member

[D] "Service Type" radio options — swap based on service:
    - Therapy (existing):   Talk Therapy, Medication Management, Both
    - Dietetics (new):      Clinical Dietetics, Community Dietetics, 
                            Sports Nutrition, All of the above
    - Physiotherapy (new):  Musculoskeletal, Neurological, 
                            Sports & Exercise, Paediatric, All of the above

[E] Help text at the bottom of Step 1 — swap the links based on service:
    - Therapy (existing):   "visit BACP or HCPC to apply"
    - Dietetics (new):      "visit HCPC or BDA to apply"
    - Physiotherapy (new):  "visit HCPC or CSP to apply"

---

STEP 5 — Education & Qualifications
Only the dropdown options change. All other fields (dates, uploads, 
"Add Another Degree" button) stay exactly the same.

[A] "Degree" dropdown — swap options based on service:
    - Therapy (existing):   BSc Psychology, MSc Psychology, 
                            PGDip Counselling, MA Psychotherapy, 
                            MSc CBT, BACP-accredited Diploma
    - Dietetics (new):      BSc Dietetics, BSc Nutrition & Dietetics, 
                            PGDip Dietetics, MSc Clinical Nutrition
    - Physiotherapy (new):  BSc Physiotherapy, MSc Physiotherapy, 
                            PGDip Physiotherapy, BSc Sports Science

[B] "Field of Study" dropdown — swap options based on service:
    - Therapy (existing):   Counselling, Psychotherapy, 
                            Clinical Psychology, CBT
    - Dietetics (new):      Dietetics, Nutrition, 
                            Nutrition & Dietetics, Clinical Nutrition
    - Physiotherapy (new):  Physiotherapy, Sports & Exercise Science, 
                            Rehabilitation Science

---

STEP 6 — Board & Specialist Accreditation
Only the two dropdowns change. All other fields (dates, file upload, 
"Add Accreditation" button, and the N/A checkbox) stay exactly the same.

[A] "Accrediting Body" dropdown — swap based on service:
    - Therapy (existing):   BABCP, EMDR Association UK, ISSTD, 
                            COSRT, BACP
    - Dietetics (new):      BDA, HCPC, SENR
    - Physiotherapy (new):  MACP, ACPICR, APCP, ACPAT, CSP

[B] "Accreditation Type / Specialty" dropdown — swap based on service:
    - Therapy (existing):   CBT, EMDR, Trauma-focused, 
                            Couples Therapy, Eating Disorders
    - Dietetics (new):      Renal Dietetics, Oncology, 
                            Paediatric Dietetics, Gastroenterology, 
                            Eating Disorders, Sports Nutrition
    - Physiotherapy (new):  MSK / Orthopaedics, Neurological, 
                            Sports Physiotherapy, Paediatric, 
                            Respiratory, Women's Health

---

STEP 8 — Practice Information
Only two sections change. Everything else (office phone, email, 
website, Healthcode question, telehealth dropdown, accepting patients 
dropdown) stays exactly the same.

[A] "Primary Specialty" dropdown — swap based on service:
    - Therapy (existing):   CBT, Psychodynamic, DBT, EMDR, 
                            Integrative, Systemic
    - Dietetics (new):      Clinical Dietetics, Sports Nutrition, 
                            Paediatric Dietetics, Renal Dietetics, 
                            Oncology Dietetics, Community Dietetics
    - Physiotherapy (new):  MSK / Orthopaedics, Neurological, 
                            Sports & Exercise, Paediatric, 
                            Respiratory, Women's Health

[B] "Client Populations Served" checkboxes — add these to the 
    existing list only when the relevant service is selected 
    (do not remove existing options for Therapy):
    - Dietetics: add → Athletes, Renal Patients, Oncology Patients
    - Physiotherapy: add → Post-surgical, Stroke Rehab, Sports Injury

---

STEPS WITH NO CHANGES (do not touch):
- Step 2:  DBS Check
- Step 3:  Professional Indemnity Insurance
- Step 4:  Personal Information
- Step 7:  Employment History
- Step 9:  Insurance Panels
- Step 10: Release Forms

─────────────────────────────────────────
IMPLEMENTATION RULES
─────────────────────────────────────────
1. Store all service-specific field config (dropdown options, radio 
   labels, help text links) in a single config object or JSON file 
   keyed by service type: "therapy" | "dietetics" | "physiotherapy". 
   Do not hardcode them separately in each step component.

2. The selected service from Step 1 must be stored in shared form 
   state and passed down to Steps 5, 6, and 8 so they can read 
   the correct config without re-asking the user.

3. When a user changes the service selection on Step 1, reset all 
   service-dependent field values in Steps 1, 5, 6, and 8 to avoid 
   stale data from a previous selection.

4. These changes apply ONLY to the UK credentialing form. 
   Do not touch any other region, any other form, any global 
   config, or any other part of the application.

5. The visual design, layout, step structure, progress tracker, 
   sidebar, navigation buttons (Back / Save and Continue), 
   and all non-listed fields must remain identical to the 
   current form.