I have an existing multi-step credentialing form. I need you to make only the UAE credentialing flow dynamic to support three professions: Therapy, Dietetics, and Physiotherapy. Do not modify any other country forms (US, UK, Canada, Australia) or any other part of the app.

STEP 1 — Add a "Service Selection" screen as the very first step of the UAE flow only
Before the existing Step 1 (Emirate & Authority Selection), insert a new step titled "Service Selection" with the following three options as selectable cards:

Therapy
Dietetics
Physiotherapy

The selected profession must be stored in state and used to conditionally render content in all subsequent steps. This step should only appear in the UAE flow.

STEP 2 — Make the following UAE steps dynamic based on the selected profession. All other steps remain unchanged.
UAE Step 1 — Emirate & Authority Selection
Replace the "Professional Category" dropdown options based on profession:

Therapy: Clinical Psychologist | Counsellor | Psychotherapist | Art Therapist | Play Therapist
Dietetics: Clinical Dietitian | Nutritionist | Sports Dietitian | Pediatric Dietitian
Physiotherapy: Physiotherapist | Sports Physiotherapist | Pediatric Physiotherapist | Neurological Physiotherapist

Show the CDA note ("CDA for non-clinical counsellors") only when profession = Therapy.

UAE Step 3 — Home Country License
Change the placeholder text in the "Home Country Regulatory Body" field based on profession:

Therapy: e.g. HCPC (UK), AHPRA (Australia), CRPO (Ontario, Canada)
Dietetics: e.g. BDA (UK), Dietitians Australia, AND (USA)
Physiotherapy: e.g. HCPC (UK), AHPRA (Australia), APTA (USA)

Change the helper text under "Years of Post-Qualification Experience" based on profession:

Therapy: DHA requires minimum 2 years for Clinical Psychologists. CDA requires minimum 1 year.
Dietetics: DHA requires minimum 2 years post-qualification for Dietitians.
Physiotherapy: DHA requires minimum 2 years post-qualification for Physiotherapists.


UAE Step 4 — Education & Qualifications
Replace the "Degree" dropdown options based on profession:

Therapy: BSc Psychology | MSc Psychology | MA Counselling | MSc Psychotherapy | PsyD | PhD Clinical Psychology
Dietetics: BSc Nutrition & Dietetics | MSc Clinical Nutrition | MSc Dietetics | PG Diploma in Dietetics
Physiotherapy: BSc Physiotherapy | MSc Physiotherapy | DPT (Doctor of Physical Therapy)


UAE Step 6 — Prometric Examination
Change the introductory note text based on profession:

Therapy: Most mental health professional categories in the UAE must pass a Prometric computer-based assessment before a license can be issued. You are allowed 3 attempts across all UAE health authorities combined.
Dietetics: Dietitian categories in the UAE must pass a Prometric computer-based assessment before a license can be issued. You are allowed 3 attempts across all UAE health authorities combined.
Physiotherapy: Physiotherapy categories in the UAE must pass a Prometric computer-based assessment before a license can be issued. You are allowed 3 attempts across all UAE health authorities combined.


UAE Step 7 — Work Experience
Change the introductory note text based on profession:

Therapy: UAE health authorities require documented post-qualification work experience. DHA Clinical Psychologists require a minimum of 2 years. CDA counsellors require a minimum of 1 year.
Dietetics: UAE health authorities require documented post-qualification work experience. DHA requires a minimum of 2 years for Dietitians.
Physiotherapy: UAE health authorities require documented post-qualification work experience. DHA requires a minimum of 2 years for Physiotherapists.


UAE Step 11 — Practice Information
Replace the "Primary Specialty" and "Secondary Specialty" dropdown options based on profession:

Therapy: Clinical Psychology | Counselling | Cognitive Behavioural Therapy (CBT) | Dialectical Behaviour Therapy (DBT) | Psychotherapy | Child & Adolescent | Trauma & PTSD | Couples & Family | Neuropsychology
Dietetics: Clinical Nutrition | Sports & Performance Nutrition | Pediatric Nutrition | Renal Dietetics | Oncology Nutrition | Eating Disorders | Diabetes Management | Bariatric Nutrition
Physiotherapy: Musculoskeletal | Neurological Rehabilitation | Pediatric Physiotherapy | Cardiorespiratory | Sports & Exercise | Post-surgical Rehabilitation | Women's Health | Geriatric


CONSTRAINTS — strictly follow these:

Make zero changes to the US, UK, Canada, or Australia credentialing flows.
Make zero changes to the left-hand sidebar navigation, the top nav bar, the My Profile page, Tasks, Active Insurance, or Documents sections.
Steps 2 (Passport & Personal Information), 5 (DataFlow Verification), 8 (Employment History), 9 (Facility / Employer Information), 10 (Professional Indemnity Insurance), 12 (Insurance Panels), and 13 (Release Forms & Declaration) must remain completely unchanged for all three professions.
The step count shown in the progress tracker should update to reflect the new total (14 steps including the new Service Selection step).
If the user navigates back to the Service Selection step and changes their profession, all downstream dynamic fields must reset to empty.