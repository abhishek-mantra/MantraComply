# MantraComply — International Credentialing Forms
## Lovable.ai / No-Code Builder Prompt
### Follow-up Build on Existing MantraComply Provider Dashboard

---

> **CONTEXT FOR THE BUILDER**
> This is a follow-up prompt to an existing MantraComply Provider Dashboard already built in this project.
> Do NOT create a new app or new file structure. Extend the existing dashboard by adding new routes and components.
> All new credentialing forms must match the exact visual design system already in place:
> - Left sidebar progress tracker (circular step indicators, active step highlighted in blue with filled circle)
> - Right content panel as a white card with rounded corners on a light gray (#F0F2F5) background
> - Blue progress bar at the top of the content card
> - "Step X of Y" label top-right of the content card
> - "Back" (outlined) + "Save and Continue" (solid blue, right-aligned) footer buttons
> - "Need Help?" card (blue info icon, "Our credentialing specialists are here to assist you." + "Visit Help Center →") shown below the main card on relevant steps
> - Input style: full-width, light border (#E2E8F0), rounded, placeholder text in gray
> - Dropdown style: matching input style with chevron icon
> - Radio button options: full-width bordered rows with filled dark circle when selected
> - File upload zones: dashed border, cloud upload icon, "Click to upload or drag and drop", "PDF, JPG, or PNG (max 10MB)"
> - "+ Add [Item]" buttons: full-width solid blue buttons
> - Section header: bold, left-aligned, 18–20px
> - Typography: system sans-serif, clean, professional
> - Color palette: Primary blue #2563EB, text #1A1A2E, secondary text #64748B, border #E2E8F0, background #F0F2F5, white card #FFFFFF

---

## STEP 1 — ADD COUNTRY SWITCHER (DEVELOPER MODE)

On the very first step of the international credentialing flow, add a **Developer Country Switcher** at the top of the content card, ABOVE all form fields.

**Component spec:**
- Thin horizontal bar with label: `🌍 Dev Mode — Select Country Form` in small gray italic text
- Four pill/tab buttons side by side: `🇬🇧 United Kingdom` | `🇨🇦 Canada` | `🇦🇺 Australia` | `🇦🇪 UAE`
- Active pill: filled blue (#2563EB) background, white text
- Inactive pill: white background, gray text, gray border
- When a country pill is selected, the ENTIRE form flow (all steps, sidebar, step count, field labels, content) changes to that country's form
- This switcher persists across all steps of that form session (shown only on step 1, but the selection governs the entire flow)
- Below the switcher, render a subtle divider line, then the first step of the selected country's form

---

## ROUTE STRUCTURE

Add the following routes to the existing dashboard router:

```
/credentialing/uk          → UK Credentialing Form (10 steps)
/credentialing/canada      → Canada Credentialing Form (11 steps)
/credentialing/australia   → Australia Credentialing Form (10 steps)
/credentialing/uae         → UAE Credentialing Form (13 steps)
```

The dev switcher on step 1 navigates between these routes while preserving the multi-step form shell.

---
---

# 🇬🇧 UNITED KINGDOM CREDENTIALING FORM
## 10 Steps

**Page title:** `Credentialing` (same as US form)
**Progress tracker label:** `0/10`

---

### SIDEBAR STEP LIST (UK)

1. Professional Body Registration
2. DBS Check
3. Professional Indemnity Insurance
4. Personal Information
5. Qualification & Degree
6. Board & Specialist Accreditation
7. Employment History
8. Practice Information
9. Insurance Panels
10. Release Forms

---

### UK — STEP 1: Professional Body Registration
**Step 1 of 10**

**Field: Select your service** *(required)*
Dropdown options: `Therapy` / `Psychiatry` / `Clinical Psychology` / `Counselling`

**Field: Primary Professional Body** *(required)*
Dropdown options:
- HCPC (Health & Care Professions Council)
- BACP (British Association for Counselling & Psychotherapy)
- UKCP (UK Council for Psychotherapy)
- BABCP (British Association for Behavioural & Cognitive Psychotherapies)
- NCPS (National Counselling & Psychotherapy Society)
- BPS (British Psychological Society)
- AFT (Association for Family Therapy)
- Other

**Field: Registration / Membership Number** *(required)*
Text input — placeholder: `Enter your registration number`
Helper text: `This is the unique number issued by your professional body.`

**Field: Accreditation Level** *(required)*
Radio button rows:
- Full Accredited Member
- Registered Member
- Associate Member

**Field: Registration Expiry Date** *(required)*
Date input — placeholder: `dd-mm-yyyy`

**Field: Secondary Professional Body** *(optional)*
Dropdown — same options as Primary (for dual-accredited practitioners, e.g., AFT + UKCP)

**Field: Secondary Registration Number** *(optional)*
Text input — placeholder: `Enter secondary registration number (if applicable)`

**Field: Service Type** *(required)*
Radio button rows:
- Talk Therapy
- Medication Management
- Both

Helper text at bottom: `If you are not yet registered with a professional body, visit [BACP](https://www.bacp.co.uk) or [HCPC](https://www.hcpc-uk.org) to apply.`

---

### UK — STEP 2: DBS Check
**Step 2 of 10**

Info callout box (blue background, info icon):
`All UK private insurers require an Enhanced DBS (Disclosure and Barring Service) certificate. For Scotland, this is a PVG Scheme Record. For Northern Ireland, this is an AccessNI certificate.`

**Field: Country of Practice** *(required)*
Radio button rows:
- England & Wales (Enhanced DBS)
- Scotland (PVG Scheme Record)
- Northern Ireland (AccessNI Certificate)

**Field: DBS Certificate Number** *(required)*
Text input — placeholder: `Enter your DBS certificate number`

**Field: DBS Issue Date** *(required)*
Date input — placeholder: `dd-mm-yyyy`

**Field: Enhanced DBS Certificate** *(required)*
File upload zone — `Click to upload or drag and drop` / `PDF, JPG, or PNG (max 10MB)`

Conditional rendering:
- If "Scotland" is selected above: replace above upload label with `PVG Scheme Record`
- If "Northern Ireland" is selected: replace with `AccessNI Certificate`

**Field: Update Service Subscription** *(required)*
Radio button rows:
- Yes — I am subscribed to the DBS Update Service
- No — I am not subscribed

Helper text: `The DBS Update Service allows insurers to check your certificate online. Subscribing is strongly recommended.`

**Field: Update Service ID** *(conditional — shown only if "Yes" is selected above)*
Text input — placeholder: `Enter your DBS Update Service ID`

Show **Need Help?** card below this step.

---

### UK — STEP 3: Professional Indemnity Insurance
**Step 3 of 10**

Info callout box:
`All UK therapists must maintain Professional Indemnity Insurance (equivalent to malpractice insurance). This is required by all private insurers including Bupa, AXA Health, Aviva, and WPA.`

**Field: Insurance Provider** *(required)*
Text input — placeholder: `e.g., Hiscox, Markel, BACP-affiliated insurer`

**Field: Policy Number** *(required)*
Text input — placeholder: `Enter policy number`

**Field: Coverage Amount (per claim)** *(required)*
Text input — placeholder: `e.g., £1,000,000`

**Field: Aggregate Amount (annual)** *(required)*
Text input — placeholder: `e.g., £3,000,000`

**Field: Effective Date** *(required)*
Date input — placeholder: `dd-mm-yyyy`

**Field: Expiry Date** *(required)*
Date input — placeholder: `dd-mm-yyyy`

**Field: Certificate of Professional Indemnity Insurance** *(required)*
File upload zone

`+ Add Insurance Policy` — full-width blue button (for multiple policies)

---

### UK — STEP 4: Personal Information
**Step 4 of 10**

**Fields:**
- First Name *(required)* + Last Name *(required)* — side by side
- Middle Name *(optional)* — full width
- Date of Birth *(required)* — date input
- Home Address *(required)*:
  - Street address (full width)
  - City + County + Postcode (three columns)
  - Country dropdown: England / Scotland / Wales / Northern Ireland

**Note:** Do NOT include Social Security Number or National Insurance Number. These are not collected for UK credentialing.

Show **Need Help?** card below this step.

---

### UK — STEP 5: Qualification & Degree
**Step 5 of 10**

**Field: Highest Relevant Degree** *(required)*
Dropdown: BSc Psychology / BA Counselling / MSc Clinical Psychology / MSc Psychotherapy / MSc Counselling / PGDip / DClinPsy (Doctorate) / Other

**Field: Institution Name** *(required)*
Text input — placeholder: `e.g., University of Edinburgh`

**Field: Country of Study** *(required)*
Dropdown: United Kingdom / Ireland / Other (specify)

**Field: Graduation Date** *(required)*
Date input — placeholder: `dd-mm-yyyy`

**Field: Field of Study** *(optional)*
Text input — placeholder: `e.g., Clinical Psychology`

**Field: Degree Certificate / Transcript** *(required)*
File upload zone

`+ Add Qualification` — full-width blue button

---

### UK — STEP 6: Board & Specialist Accreditation
**Step 6 of 10**

Checkbox row (full width, bordered):
`☐ N/A — I do not hold any specialist accreditations`

If NOT checked, show:

**Field: Accrediting Body** *(required)*
Dropdown: BABCP / BPS / EMDR Association UK / BACP Accredited / UKCP Accredited / Other

**Field: Accreditation Type / Specialty** *(required)*
Dropdown: CBT / EMDR / Schema Therapy / DBT / Psychoanalytic / Family Therapy / Other

**Field: Accreditation Date** *(required)*
Date input

**Field: Expiry Date** *(required)*
Date input

**Field: Accreditation Certificate** *(required)*
File upload zone

`+ Add Accreditation` — full-width blue button

---

### UK — STEP 7: Employment History
**Step 7 of 10**

Info callout:
`Please provide your work history for the past 5 years. Include all employment, gaps, and explanations.`

**New Entry card:**
- Checkbox top-right: `☐ There is a gap in employment`
- Employer Name *(required)*
- Position / Title *(required)*
- Start Date *(required)* + End Date *(required)* — side by side

`+ Add Entry` — full-width blue button

Show **Need Help?** card.

---

### UK — STEP 8: Practice Information
**Step 8 of 10**

**Field: Practice Setting** *(required)*
Radio button rows:
- Virtual / Telehealth Only
- Physical Office Location
- Hybrid (Both Virtual and Physical)

**Field: Office Phone Number** *(optional)*
Text input — placeholder: `(XXX) XXX-XXXX`

**Field: Therapy Modalities** *(required)*
Multi-select dropdown: CBT / Psychodynamic / Integrative / Humanistic / DBT / EMDR / ACT / Solution-Focused / Person-Centred / Family Therapy / Other

**Field: Client Populations** *(required)*
Multi-select dropdown: Adults / Adolescents / Children / Couples / Families / Older Adults

**Field: Languages Spoken Fluently** *(required)*
Multi-select dropdown

**Field: Healthcode Registration** *(required)*
Radio button rows:
- Yes — I am registered with Healthcode
- No — I am not registered with Healthcode

Conditional:
- If Yes: show `Healthcode Provider ID` text input

Helper text: `Healthcode is the UK's primary e-billing platform. Most private insurers (Bupa, AXA Health) require Healthcode for electronic claims submission.`

---

### UK — STEP 9: Insurance Panels
**Step 9 of 10**

Info callout:
`Please indicate which UK private health insurers you are currently recognised by, and select which ones you would like to credential with through MantraComply.`

**Field: Current Insurance Panels** *(optional)*
Multi-select dropdown:
- Bupa
- AXA Health
- Aviva
- WPA (Western Provident Association)
- Vitality Health
- Cigna (UK)
- Aetna International
- Other

**Field: Desired Insurance Panels** *(required)*
Multi-select dropdown — same options

Show **Need Help?** card.

---

### UK — STEP 10: Release Forms
**Step 10 of 10**

Warning callout (amber background):
`⚠ Please review and sign the following agreements. These documents are required to proceed with credentialing.`

**Section 1: Business Associate Agreement (BAA)**
Scrollable text box (150px height) containing the BAA text for UK (reference UK GDPR and Data Protection Act 2018 in the agreement text).

- Digital Signature field: `Type your full name to sign`
- Helper text: `By typing your name, you agree to the terms of the Business Associate Agreement.`
- Checkbox: `☐ I have read and agree to the Business Associate Agreement`

**Section 2: Provider Agreement**
Scrollable text box (150px height) containing provider agreement text.

- Digital Signature field
- Checkbox: `☐ I have read and agree to the Provider Agreement`

**Section 3: UK GDPR Data Processing Consent**
Scrollable text box mentioning UK GDPR, Data Protection Act 2018, and lawful basis for data processing.

- Checkbox: `☐ I consent to MantraComply processing my data for credentialing purposes under UK GDPR`

**Submit button** (replaces "Save and Continue"): Solid blue, full-right — `Submit Credentialing Application`

---
---

# 🇨🇦 CANADA CREDENTIALING FORM
## 11 Steps

**Page title:** `Credentialing`
**Progress tracker label:** `0/11`

---

### SIDEBAR STEP LIST (Canada)

1. Province & Service
2. Provincial College Registration
3. National Certification (CCC)
4. Personal Information
5. Qualification & Degree
6. Malpractice Insurance
7. Employment History
8. Practice Information
9. Tax & Business Information
10. Insurance Panels
11. Release Forms

---

### CANADA — STEP 1: Province & Service
**Step 1 of 11**

Dev Country Switcher (described at top of prompt) — shown here.

**Field: Select your Province / Territory** *(required)*
Dropdown:
- Alberta
- British Columbia
- Manitoba
- New Brunswick
- Newfoundland & Labrador
- Northwest Territories
- Nova Scotia
- Nunavut
- Ontario
- Prince Edward Island
- Quebec
- Saskatchewan
- Yukon

**Field: Regulated Professional Title** *(required, options change based on province)*

Logic:
- If Ontario: Registered Psychotherapist (RP) / RP (Qualifying) / Registered Social Worker (RSW) / Psychologist (C.Psych) / Other
- If BC: Registered Clinical Counsellor (RCC) / Registered Psychologist (R.Psych) / Registered Social Worker / Other
- If Quebec: Psychologist (Ordre OPQ) / Authorized Psychotherapist / Other
- If Alberta: Registered Psychologist (R.Psych) / Counselling Therapist / Registered Social Worker / Other
- If New Brunswick / PEI: Licensed Counselling Therapist / Registered Psychologist / Other
- All other provinces: Registered Psychologist / Canadian Certified Counsellor (CCC) / Registered Social Worker / Other

**Field: Governing College** *(auto-filled based on province + title selection)*
Read-only text field (auto-populated). Examples:
- Ontario + RP → College of Registered Psychotherapists of Ontario (CRPO)
- BC + RCC → BC Association of Clinical Counsellors (BCACC)
- Ontario + C.Psych → College of Psychologists of Ontario (CPO)
- Quebec + Psychologist → Ordre des psychologues du Québec (OPQ)

**Field: Service Type** *(required)*
Radio button rows:
- Talk Therapy
- Medication Management
- Both

**Field: Telehealth / Additional Provinces of Practice** *(optional)*
Multi-select dropdown — all provinces (for practitioners who offer telehealth across provinces)
Helper text: `If you provide services via telehealth to clients in other provinces, select all applicable provinces. Each province may require separate registration.`

---

### CANADA — STEP 2: Provincial College Registration
**Step 2 of 11**

**Field: College Registration Number** *(required)*
Text input — placeholder: `Enter your college registration number`
Helper text auto-text based on province: e.g., `Your CRPO registration number is found on your registration certificate.`

**Field: Registration Status** *(required)*
Radio button rows:
- Full / General Registration
- Qualifying / Provisional Registration
- Supervised Practice
- Non-Practising

**Field: Registration Expiry / Renewal Date** *(required)*
Date input

**Field: Registration Certificate** *(required)*
File upload zone

**Field: Supervised Hours Completed** *(conditional — shown if "Qualifying/Supervised" selected)*
Number input — placeholder: `e.g., 450`
Helper text: `Enter the number of supervised clinical hours completed to date.`

**Field: Supervisor Name & Registration Number** *(conditional)*
Two text inputs side by side

Show **Need Help?** card.

---

### CANADA — STEP 3: National Certification (CCC)
**Step 3 of 11**

Info callout:
`The Canadian Certified Counsellor (CCC) designation is issued by the Canadian Counselling and Psychotherapy Association (CCPA). In provinces where counselling is not yet regulated, the CCC is the primary credential recognised by private insurers.`

**Field: Do you hold the CCC designation?** *(required)*
Radio button rows:
- Yes — I hold the CCC designation
- No — I do not hold the CCC designation
- In Progress — I have applied for CCC

Conditional (if Yes):
- CCC Certification Number — text input
- CCC Expiry Date — date input
- CCC Certificate — file upload zone
- CCPA Membership Status — radio: Active Member / Lapsed / Non-member

Conditional (if In Progress):
- CCPA Application Reference Number — text input
- Application Date — date input

---

### CANADA — STEP 4: Personal Information
**Step 4 of 11**

**Fields:**
- First Name *(required)* + Last Name *(required)* — side by side
- Middle Name *(optional)*
- Date of Birth *(required)*
- Home Address:
  - Street address (full width)
  - City + Province dropdown + Postal Code (three columns)
- Primary Phone Number *(required)*
- Preferred Language *(required)* — Radio: English / French / Bilingual

**Note:** Do NOT include Social Security Number (SSN). This is not collected for Canadian credentialing.

---

### CANADA — STEP 5: Qualification & Degree
**Step 5 of 11**

**Field: Highest Relevant Degree** *(required)*
Dropdown: BA / BSc / BEd (Social Work) / BA (Hons) / MA / MSc / MEd / MFT / PhD / PsyD / Other

**Field: Institution Name** *(required)*
Text input — placeholder: `e.g., University of Toronto`

**Field: Province / Country of Institution** *(required)*
Dropdown — Canadian provinces first, then Other Country option

**Field: Graduation Date** *(required)*
Date input

**Field: Field of Study** *(optional)*
Text input — placeholder: `e.g., Clinical Psychology`

**Field: Degree Certificate / Official Transcript** *(required)*
File upload zone

`+ Add Qualification` — full-width blue button

---

### CANADA — STEP 6: Malpractice Insurance
**Step 6 of 11**

Info callout:
`All healthcare providers must maintain professional liability (malpractice) insurance. In Canada, this is often bundled with professional association membership (e.g., CCPA, BCACC).`

**Field: Insurance Carrier** *(required)*
Text input — placeholder: `e.g., CCPA-affiliated insurer, Encon, BMS`

**Field: Is this bundled with your association membership?** *(required)*
Radio: Yes / No

**Field: Policy Number** *(required)*
Text input

**Field: Coverage Amount (per occurrence)** *(required)*
Text input — placeholder: `e.g., $2,000,000`

**Field: Aggregate Amount** *(required)*
Text input — placeholder: `e.g., $4,000,000`

**Field: Effective Date** *(required)* + **Expiry Date** *(required)* — side by side

**Field: Certificate of Insurance** *(required)*
File upload zone

`+ Add Malpractice Insurance` — full-width blue button

---

### CANADA — STEP 7: Employment History
**Step 7 of 11**

Info callout:
`Please provide your work history for the past 5 years. Include all employment, gaps, and explanations.`

**New Entry card:**
- Checkbox: `☐ There is a gap in employment`
- Employer Name *(required)*
- Position / Title *(required)*
- Province of Employment *(required)* — dropdown
- Start Date + End Date — side by side

`+ Add Entry` — full-width blue button

Show **Need Help?** card.

---

### CANADA — STEP 8: Practice Information
**Step 8 of 11**

**Field: Practice Setting** *(required)*
Radio button rows:
- Virtual / Telehealth Only
- Physical Office Location
- Hybrid (Both Virtual and Physical)

**Field: Office Phone Number** *(optional)*

**Field: Clinical Specialties** *(required)*
Multi-select dropdown: Anxiety / Depression / Trauma & PTSD / Relationship Issues / Grief / Addiction / Eating Disorders / OCD / Autism / ADHD / Child & Adolescent / Couples / Family / Other

**Field: Therapeutic Approaches** *(required)*
Multi-select dropdown: CBT / DBT / ACT / EMDR / Psychodynamic / Narrative / Solution-Focused / EFT / Mindfulness-Based / Other

**Field: Languages Spoken Fluently** *(required)*
Multi-select dropdown — include French prominently given Quebec

**Field: Direct Billing Capability** *(required)*
Radio: Yes — I can direct bill to insurance / No — Client must submit claims themselves

Conditional (if Yes):
`Telus Health eClaims Registration` — Radio: Registered / Not Registered
If Registered: `Telus Health Provider ID` — text input
Helper text: `Telus Health eClaims is Canada's primary direct billing platform for extended health benefits.`

---

### CANADA — STEP 9: Tax & Business Information
**Step 9 of 11**

Info callout:
`This information is required for invoicing and tax compliance in Canada.`

**Field: Business Structure** *(required)*
Radio button rows:
- Sole Proprietor (Self-Employed)
- Incorporated (Professional Corporation)
- Employee of a Clinic / Organization

**Field: CRA Business Number** *(required if Sole Proprietor or Incorporated)*
Text input — placeholder: `Enter your 9-digit CRA Business Number`
Helper text: `Your Canada Revenue Agency Business Number (BN) is used for invoicing. Format: 123456789`

**Field: HST / GST Registered?** *(required)*
Radio: Yes / No
Conditional (if Yes):
- GST/HST Registration Number — text input
- Province of Tax Registration — dropdown

**Field: Professional Corporation Name** *(shown if Incorporated)*
Text input — placeholder: `e.g., Dr. Jane Smith Professional Corporation`

**Field: Professional Corporation Registration Number** *(shown if Incorporated)*
Text input

Show **Need Help?** card.

---

### CANADA — STEP 10: Insurance Panels
**Step 10 of 11**

Info callout:
`Please indicate which Canadian extended health benefit providers you currently direct bill to, and select which ones you would like to credential with through MantraComply.`

**Field: Currently Direct Billing To** *(optional)*
Multi-select dropdown:
- Sun Life Financial
- Manulife
- Canada Life (Great-West Life)
- Blue Cross (Alberta / Ontario / Quebec / Atlantic / Pacific)
- Desjardins Insurance
- Equitable Life of Canada
- Green Shield Canada
- Industrial Alliance (iA Financial)
- Co-operators
- Other

**Field: Desired Insurance Panels** *(required)*
Multi-select dropdown — same options

Show **Need Help?** card.

---

### CANADA — STEP 11: Release Forms
**Step 11 of 11**

Warning callout (amber):
`⚠ Please review and sign the following agreements.`

**Section 1: Business Associate Agreement (BAA)**
Scrollable text box — BAA text referencing PIPEDA (Personal Information Protection and Electronic Documents Act) and applicable provincial privacy legislation.
- Digital Signature field + Checkbox

**Section 2: Provider Agreement**
Scrollable text box
- Digital Signature field + Checkbox

**Section 3: PIPEDA Data Processing Consent**
Short scrollable text referencing PIPEDA consent.
- Checkbox: `☐ I consent to MantraComply processing my data for credentialing purposes under PIPEDA`

**Submit button:** `Submit Credentialing Application`

---
---

# 🇦🇺 AUSTRALIA CREDENTIALING FORM
## 10 Steps

**Page title:** `Credentialing`
**Progress tracker label:** `0/10`

---

### SIDEBAR STEP LIST (Australia)

1. AHPRA Registration
2. Medicare Provider Number
3. Personal Information
4. Qualification & Endorsement
5. Board Certification
6. Malpractice / Professional Indemnity
7. Employment History
8. Practice Information
9. Private Health Insurance Funds
10. Release Forms

---

### AUSTRALIA — STEP 1: AHPRA Registration
**Step 1 of 10**

Dev Country Switcher — shown here.

Info callout:
`AHPRA (Australian Health Practitioner Regulation Agency) is the national regulator for all registered health practitioners in Australia. AHPRA registration is mandatory to legally use the title 'Psychologist'.`

**Field: Select your service** *(required)*
Dropdown: Psychology / Social Work / Counselling / Mental Health Nursing / Occupational Therapy

**Field: AHPRA Registration Number** *(required)*
Text input — placeholder: `e.g., PSY0001234567`
Helper text: `Your AHPRA registration number is in the format PSY followed by 10 digits.`

**Field: Registration Type** *(required)*
Radio button rows:
- General Registration
- Provisional Registration (under supervision)
- Non-Practising Registration
- Student Registration

**Field: Area of Practice Endorsement** *(required)*
Dropdown:
- No Endorsement (General Registration only)
- Clinical Psychology
- Forensic Psychology
- Health Psychology
- Educational & Developmental Psychology
- Neuropsychology
- Organisational Psychology
- Sport & Exercise Psychology
- Community Psychology

Helper text: `Clinical Psychologists attract a higher Medicare rebate than General Psychologists under the Better Access initiative.`

**Field: AHPRA Registration Renewal Date** *(required)*
Date input

**Field: AHPRA Registration Certificate** *(required)*
File upload zone

**Field: CPD Hours Completed (current registration year)** *(required)*
Number input — placeholder: `e.g., 30`
Helper text: `AHPRA requires a minimum of 30 CPD hours per registration year.`

---

### AUSTRALIA — STEP 2: Medicare Provider Number
**Step 2 of 10**

Info callout:
`Medicare Provider Numbers are location-specific. You must have a separate Provider Number for each practice location where you see clients. This is required to bill Medicare under the Better Access initiative.`

**Field: Registered with Services Australia (Medicare)?** *(required)*
Radio button rows:
- Yes — I am registered with Services Australia
- No — I am not yet registered
- In Progress — I have applied

Conditional (if Yes):

**Provider Number Entry 1:**
- Medicare Provider Number — text input — placeholder: `e.g., 1234567A`
- Associated Practice Name — text input
- Practice Address — text input (street + suburb + state + postcode)
- Provider Type at this location:
  - Radio: Clinical Psychologist (higher rebate) / Registered Psychologist / Other Allied Health

`+ Add Another Provider Number / Location` — full-width blue button

**Field: Bulk Billing Status** *(required)*
Radio button rows:
- I bulk bill all eligible clients (Medicare-only, no gap fee)
- I charge a gap fee (client pays Medicare rebate + gap)
- I do not accept Medicare / Better Access clients

Helper text: `Bulk billing means you accept the Medicare rebate as full payment. Gap fees mean clients pay the difference between your fee and the Medicare rebate.`

**Field: Australian Business Number (ABN)** *(required)*
Text input — placeholder: `Enter your 11-digit ABN`
Helper text: `Your ABN is required for invoicing and tax purposes. Find it at abr.business.gov.au`

Show **Need Help?** card.

---

### AUSTRALIA — STEP 3: Personal Information
**Step 3 of 10**

**Fields:**
- First Name *(required)* + Last Name *(required)* — side by side
- Middle Name *(optional)*
- Date of Birth *(required)*
- Home Address:
  - Street address
  - Suburb + State dropdown (ACT/NSW/NT/QLD/SA/TAS/VIC/WA) + Postcode — three columns
- Primary Phone Number *(required)*

**Note:** Do NOT include Tax File Number (TFN) or SSN — not collected for credentialing purposes.

---

### AUSTRALIA — STEP 4: Qualification & Endorsement
**Step 4 of 10**

**Field: Highest Relevant Degree** *(required)*
Dropdown: BBSc / BA Psychology / BSc (Hons) Psychology / MA Clinical Psychology / MPsych (Clinical) / MPsych (Forensic) / MPsych (Health) / MPsych (Organisational) / MPsych (Educational) / DClinPsy / PhD (Psychology) / Other

**Field: Institution Name** *(required)*
Text input — placeholder: `e.g., University of Melbourne`

**Field: State of Institution** *(required)*
Dropdown — Australian states + "Overseas" option

**Field: Graduation Date** *(required)*
Date input

**Field: Field of Study** *(optional)*
Text input — placeholder: `e.g., Clinical Psychology`

**Field: Degree Certificate / Official Transcript** *(required)*
File upload zone

`+ Add Qualification` — full-width blue button

---

### AUSTRALIA — STEP 5: Board Certification
**Step 5 of 10**

Checkbox row:
`☐ N/A — I do not hold a Board-level Specialty Endorsement`

If NOT checked:

**Field: Endorsement Type** *(required)*
Dropdown: Clinical / Forensic / Health / Educational & Developmental / Neuropsychology / Organisational / Sport & Exercise / Community

**Field: Date of Endorsement** *(required)*
Date input

**Field: Expiry Date** *(required)*
Date input

**Field: Endorsement Certificate** *(required)*
File upload zone

`+ Add Endorsement` — full-width blue button

---

### AUSTRALIA — STEP 6: Professional Indemnity Insurance
**Step 6 of 10**

Info callout:
`All AHPRA-registered practitioners must maintain professional indemnity insurance. Common providers include MIGA, BMS Group, Guild Insurance, and Aon.`

**Field: Insurance Provider** *(required)*
Text input — placeholder: `e.g., MIGA, BMS Group, Guild Insurance`

**Field: Policy Number** *(required)*
Text input

**Field: Coverage Amount (per claim)** *(required)*
Text input — placeholder: `e.g., $20,000,000` (note: Australian amounts in AUD)

**Field: Aggregate Amount** *(required)*
Text input — placeholder: `e.g., $20,000,000`

**Field: Effective Date** *(required)* + **Expiry Date** *(required)*

**Field: Certificate of Currency** *(required)*
File upload zone

`+ Add Insurance Policy` — full-width blue button

---

### AUSTRALIA — STEP 7: Employment History
**Step 7 of 10**

Info callout:
`Please provide your work history for the past 5 years.`

**New Entry card:**
- Checkbox: `☐ There is a gap in employment`
- Employer Name *(required)*
- Position / Title *(required)*
- State *(required)* — dropdown
- Start Date + End Date — side by side

`+ Add Entry` — full-width blue button

Show **Need Help?** card.

---

### AUSTRALIA — STEP 8: Practice Information
**Step 8 of 10**

**Field: Practice Setting** *(required)*
Radio button rows:
- Virtual / Telehealth Only
- Physical Office Location
- Hybrid (Both Virtual and Physical)

**Field: Office Phone Number** *(optional)*

**Field: Clinical Specialties** *(required)*
Multi-select dropdown

**Field: Therapeutic Approaches** *(required)*
Multi-select dropdown: CBT / ACT / DBT / Schema Therapy / EMDR / Psychodynamic / Interpersonal Therapy / Mindfulness-Based / Other

**Field: Languages Spoken Fluently** *(required)*
Multi-select dropdown

**Field: NDIS Registration** *(required)*
Radio: Registered NDIS Provider / Not NDIS Registered
Conditional (if Registered): `NDIS Provider Registration Number` — text input

Helper text: `NDIS (National Disability Insurance Scheme) registration is separate from AHPRA and Medicare, but relevant for MantraComply matching.`

---

### AUSTRALIA — STEP 9: Private Health Insurance Funds
**Step 9 of 10**

Info callout:
`Australian private health insurance funds cover psychology services under 'extras' (ancillary) cover. You can only claim through private health insurance OR Medicare for the same session — not both.`

**Field: Currently registered as a provider with** *(optional)*
Multi-select dropdown:
- Bupa Australia
- Medibank
- NIB
- HCF (Hospital Contribution Fund)
- AHM (Australian Health Management)
- CBHS
- HBF (WA only)
- GMHBA
- Westfund
- Other

**Field: Desired Health Fund Panels** *(required)*
Multi-select dropdown — same options

Show **Need Help?** card.

---

### AUSTRALIA — STEP 10: Release Forms
**Step 10 of 10**

Warning callout (amber):
`⚠ Please review and sign the following agreements.`

**Section 1: Business Associate Agreement (BAA)**
Scrollable text box — BAA text referencing the Australian Privacy Act 1988 and Australian Privacy Principles (APPs).
- Digital Signature field + Checkbox

**Section 2: Provider Agreement**
Scrollable text box
- Digital Signature field + Checkbox

**Section 3: Australian Privacy Act Consent**
Scrollable text — references APP 3 (Collection of Solicited Personal Information) and APP 5 (Notification of Collection).
- Checkbox: `☐ I consent to MantraComply collecting and processing my data in accordance with the Australian Privacy Act 1988`

**Submit button:** `Submit Credentialing Application`

---
---

# 🇦🇪 UAE CREDENTIALING FORM
## 13 Steps

**Page title:** `Credentialing`
**Progress tracker label:** `0/13`

---

### SIDEBAR STEP LIST (UAE)

1. Emirate & Authority Selection
2. Passport & Personal Information
3. Home Country License
4. Academic Credentials & Attestation
5. DataFlow Verification
6. Prometric Examination
7. Work Experience
8. Employment History
9. Facility / Employer Information
10. Professional Indemnity Insurance
11. Practice Information
12. Insurance Panels
13. Release Forms & Declaration

---

### UAE — STEP 1: Emirate & Authority Selection
**Step 1 of 13**

Dev Country Switcher — shown here.

Info callout:
`The UAE has a multi-emirate licensing system. Different health authorities govern different geographic areas. Please select the emirate where you intend to practice to determine the correct authority for your application.`

**Field: Primary Emirate of Practice** *(required)*
Radio button rows (with authority auto-display):
- Dubai — **DHA (Dubai Health Authority)** for clinical roles; **CDA (Community Development Authority)** for non-clinical counsellors
- Abu Dhabi — **DOH (Department of Health — Abu Dhabi)**
- Sharjah — **SHA (Sharjah Health Authority) / MOHAP**
- Ajman / Ras Al Khaimah / Umm Al Quwain / Fujairah — **MOHAP (Ministry of Health & Prevention)**

**Field: Professional Category** *(required)*
Dropdown (options vary based on emirate selected):
- Clinical Psychologist
- Psychotherapist
- Counsellor
- Marriage & Family Therapist
- Clinical Social Worker / Mental Health Social Worker
- Psychiatrist
- Mental Health Nurse
- Life Coach (non-clinical)

**Field: Authority Applicable** *(auto-filled, read-only)*
Logic:
- Dubai + Clinical Psychologist/Psychiatrist → DHA (Sheryan Portal)
- Dubai + Counsellor/MFT/Social Worker → CDA (Community-Based)
- Abu Dhabi → DOH
- Other emirates → MOHAP

Displayed in a blue info box: `Your application will be processed through: [Authority Name]`

**Field: Do you already hold a UAE license?** *(required)*
Radio: Yes / No

Conditional (if Yes):
- Current License Number — text input
- Issuing Authority — dropdown: DHA / CDA / DOH / MOHAP / SHA
- License Expiry Date — date input

---

### UAE — STEP 2: Passport & Personal Information
**Step 2 of 13**

Info callout:
`All UAE health authority applications require a valid passport. Ensure your passport has at least 6 months validity.`

**Fields:**
- First Name *(required)* + Last Name *(required)* — side by side
- Middle Name *(optional)*
- Date of Birth *(required)*
- Gender *(required)* — Radio: Male / Female
- Nationality *(required)* — Dropdown (country list)
- Passport Number *(required)*
- Passport Issue Date *(required)* + Passport Expiry Date *(required)* — side by side
- Passport Copy *(required)* — File upload zone — Label: `Colour scan of all pages, PDF or JPG`
- Passport Photo *(required)* — File upload zone — Label: `White background, recent, JPG format`
- UAE Residence Visa Number *(optional)* — text input
- Emirates ID Number *(optional)* — text input — placeholder: `784-XXXX-XXXXXXX-X`
- Home Address in UAE — Street / Area / Emirate / PO Box
- Contact Phone Number *(required)*
- Personal Email *(required)*

Show **Need Help?** card.

---

### UAE — STEP 3: Home Country License
**Step 3 of 13**

Info callout:
`A current, active license or registration from your home country is required by all UAE health authorities. If your country of training does not have a licensing system, you must provide equivalent proof of competence.`

**Field: Country of Qualification / Original Licensure** *(required)*
Dropdown (country list)

**Field: Home Country Regulatory Body** *(required)*
Text input — placeholder: `e.g., HCPC (UK), AHPRA (Australia), CRPO (Ontario, Canada)`

**Field: Home Country License / Registration Number** *(required)*
Text input

**Field: License Status** *(required)*
Radio: Active / Expired / Surrendered

**Field: License Expiry Date** *(required)*
Date input

**Field: Home Country License Certificate** *(required)*
File upload zone

**Field: Good Standing Letter** *(required)*
File upload zone
Helper text: `A letter from your home country regulatory body confirming you are in good standing and have no disciplinary actions.`

**Field: Years of Post-Qualification Experience** *(required)*
Number input — placeholder: `e.g., 3`
Helper text: `DHA requires minimum 2 years post-qualification experience for Clinical Psychologists. CDA requires minimum 1 year.`

---

### UAE — STEP 4: Academic Credentials & Attestation
**Step 4 of 13**

Warning callout (amber):
`⚠ Foreign academic qualifications must be attested by (1) the UAE Ministry of Foreign Affairs (MoFA) AND (2) certified as equivalent by the UAE Ministry of Education (MoE). This is mandatory for all non-UAE qualifications.`

**Field: Highest Relevant Degree** *(required)*
Dropdown: Bachelor's / Master's / Postgraduate Diploma / Doctorate / PhD / Other

**Field: Degree Title** *(required)*
Text input — placeholder: `e.g., MSc Clinical Psychology`

**Field: Institution Name** *(required)*
Text input — placeholder: `e.g., University of Edinburgh`

**Field: Country of Institution** *(required)*
Dropdown

**Field: Graduation Year** *(required)*
Dropdown — years

**Field: Degree Certificate** *(required)*
File upload zone — Label: `Original degree certificate`

**Field: Official Transcript** *(required)*
File upload zone

**Field: MoFA Attestation Status** *(required)*
Radio button rows:
- Completed — I have MoFA attestation
- In Progress — Attestation is being processed
- Not Yet Started

Conditional (if Completed): `MoFA Attested Degree Certificate` — file upload zone

**Field: MoE Equivalency Certificate Status** *(required)*
Radio button rows:
- Completed — I have the MoE Equivalency Certificate
- In Progress
- Not Yet Started

Conditional (if Completed): `MoE Equivalency Certificate` — file upload zone

Helper text: `MoE Equivalency assessment can be initiated at: https://www.moe.gov.ae/. This process typically takes 4–12 weeks.`

`+ Add Qualification` — full-width blue button

---

### UAE — STEP 5: DataFlow Verification
**Step 5 of 13**

Info callout:
`DataFlow Group provides Primary Source Verification (PSV) for all UAE health authority applications. This involves DataFlow verifying your credentials directly with your issuing institutions. This is mandatory.`

**Field: DataFlow PSV Status** *(required)*
Radio button rows:
- Completed — I have a DataFlow PSV reference number
- In Progress — DataFlow verification is underway
- Not Started — I have not yet initiated DataFlow verification

Conditional (if Completed):
- DataFlow Reference Number — text input — placeholder: `Enter your DataFlow reference number`
- DataFlow Completion Certificate — file upload zone

Conditional (if In Progress):
- DataFlow Application Number — text input — placeholder: `Enter your DataFlow application/tracking number`
- Estimated Completion Date — date input

Conditional (if Not Started):
Info box: `You can initiate DataFlow verification at dataflowgroup.com. The process typically costs USD 180–250 and takes 4–8 weeks. MantraComply can assist you in initiating this process.`
CTA link: `Start DataFlow Verification →`

Show **Need Help?** card.

---

### UAE — STEP 6: Prometric Examination
**Step 6 of 13**

Info callout:
`Most mental health professional categories in the UAE must pass a Prometric computer-based assessment before a license can be issued. You are allowed 3 attempts across all UAE health authorities combined.`

**Field: Prometric Exam Status** *(required)*
Radio button rows:
- Passed — I have passed the Prometric exam
- Scheduled — My exam is scheduled
- Awaiting Scheduling — I have not yet scheduled
- Exempt — My category is exempt (confirm with your authority)

Conditional (if Passed):
- Prometric Score Report — file upload zone
- Pass Date — date input
- Exam Category / Code — text input — placeholder: `e.g., Clinical Psychologist — DHA`

Conditional (if Scheduled):
- Exam Date — date input
- Exam Location — text input — placeholder: `Prometric test centre name/city`
- Prometric Booking Reference — text input

Conditional (if Awaiting Scheduling):
Info box: `You can schedule your Prometric exam at prometric.com. Select your UAE authority (DHA / DOH / MOHAP) to find the correct exam.`
CTA link: `Schedule Prometric Exam →`

**Field: Number of Previous Attempts** *(shown for all statuses)*
Dropdown: 0 / 1 / 2
Warning text (shown if 2 selected): `⚠ You have 1 remaining attempt. Please prepare carefully before your next exam.`

---

### UAE — STEP 7: Work Experience
**Step 7 of 13**

Info callout:
`UAE health authorities require documented post-qualification work experience. DHA Clinical Psychologists require a minimum of 2 years. CDA counsellors require a minimum of 1 year.`

**Field: Total Post-Qualification Years of Experience** *(required)*
Dropdown: Less than 1 year / 1–2 years / 2–5 years / 5–10 years / 10+ years

**Experience Entry:**
- Employer / Institution Name *(required)*
- Country *(required)*
- Position / Title *(required)*
- Start Date *(required)* + End Date *(required)* — side by side
- Employment Letter from Employer *(required)* — file upload zone
  Helper text: `Must be on official letterhead, confirming dates, role, and clinical duties.`

`+ Add Experience Entry` — full-width blue button

---

### UAE — STEP 8: Employment History (UAE Context)
**Step 8 of 13**

Info callout:
`Please provide your complete work history for the past 5 years including any UAE-based employment.`

**New Entry card:**
- Checkbox: `☐ There is a gap in employment`
- Employer Name *(required)*
- Country *(required)* — dropdown
- Position / Title *(required)*
- Start Date + End Date — side by side
- Was this employment in the UAE? — Radio: Yes / No
  - If Yes: Was employer DHA/DOH/MOHAP licensed? — Radio: Yes / No

`+ Add Entry` — full-width blue button

Show **Need Help?** card.

---

### UAE — STEP 9: Facility / Employer Information
**Step 9 of 13**

Info callout:
`UAE health licenses must be activated through a licensed healthcare facility or employer. Independent private practice without a licensed facility is not permitted for most mental health categories.`

**Field: Employment Arrangement** *(required)*
Radio button rows:
- I am employed by / contracted with a licensed UAE healthcare facility
- I am establishing or already operate my own licensed clinic
- I am seeking employment (MantraComply to match me with facilities)

Conditional (if employed/contracted):
- Facility Name *(required)* — text input
- Facility DHA / DOH / MOHAP License Number *(required)* — text input
- Facility Address *(required)* — text input
- HR / Licensing Contact Name *(optional)* — text input
- HR / Licensing Contact Email *(optional)* — text input
- Letter of Intent / Employment Contract *(required)* — file upload zone

Conditional (if own clinic):
- Clinic Name *(required)*
- Clinic License Number *(required)*
- Clinic Emirate *(required)*

Conditional (if seeking employment):
Info box: `MantraComply will connect you with DHA/DOH-licensed healthcare facilities in your emirate. Your application will be prepared and held pending facility placement.`

Show **Need Help?** card.

---

### UAE — STEP 10: Professional Indemnity Insurance
**Step 10 of 13**

Info callout:
`In the UAE, professional indemnity insurance is typically provided by the employer/facility. If you are self-employed or operating independently, you must obtain your own coverage.`

**Field: Insurance Arrangement** *(required)*
Radio button rows:
- Employer-provided — My facility covers me under their policy
- Individual policy — I maintain my own indemnity insurance

Conditional (if Employer-provided):
- Employer Insurance Provider — text input
- Policy Number — text input
- Facility Coverage Confirmation Letter — file upload zone

Conditional (if Individual policy):
- Insurance Provider Name — text input — placeholder: `e.g., AXA Gulf, Allianz, RSA`
- Policy Number — text input
- Coverage Amount (per claim) — text input — placeholder: `e.g., AED 5,000,000`
- Aggregate Amount — text input
- Effective Date + Expiry Date — side by side
- Certificate of Insurance — file upload zone

`+ Add Insurance Policy` — full-width blue button

---

### UAE — STEP 11: Practice Information
**Step 11 of 13**

**Field: Practice Setting** *(required)*
Radio button rows:
- In-person (at licensed facility only)
- Telehealth Only
- Both In-person and Telehealth

**Field: Consultation Language(s)** *(required)*
Multi-select dropdown — include Arabic, English, Hindi, Urdu, Tagalog, and other common UAE languages

**Field: Clinical Specialties** *(required)*
Multi-select dropdown

**Field: Therapeutic Approaches** *(required)*
Multi-select dropdown

**Field: Client Populations** *(required)*
Multi-select dropdown — include Expatriates / UAE Nationals / Children / Adolescents / Adults / Couples / Families

---

### UAE — STEP 12: Insurance Panels
**Step 12 of 13**

Info callout:
`In the UAE, mental health coverage is primarily provided through international Private Medical Insurance (PMI) for expatriate employees, and through mandatory basic health insurance in Dubai and Abu Dhabi. Holding a valid DHA/DOH license automatically qualifies you for recognition by most PMI providers.`

**Field: Currently covered by** *(optional)*
Multi-select dropdown:
- AXA Gulf
- Bupa Global / Bupa Arabia
- Allianz Care
- Cigna International
- Daman (National Health Insurance Company)
- MetLife
- Oman Insurance / Orient Insurance
- Noor Takaful
- Islamic Arab Insurance Co. (SALAMA)
- Other

**Field: Desired PMI Coverage** *(required)*
Multi-select dropdown — same options

Show **Need Help?** card.

---

### UAE — STEP 13: Release Forms & Declaration
**Step 13 of 13**

Warning callout (amber):
`⚠ Please review and sign all agreements. These are required to submit your UAE credentialing application.`

**Section 1: Business Associate Agreement (BAA)**
Scrollable text box — referencing UAE Federal Decree Law No. 45 of 2021 (PDPL — Personal Data Protection Law).
- Digital Signature + Checkbox

**Section 2: Provider Agreement**
Scrollable text box
- Digital Signature + Checkbox

**Section 3: UAE PDPL Data Consent**
Text referencing PDPL consent and cross-border data transfer provisions.
- Checkbox: `☐ I consent to MantraComply processing my data in accordance with UAE Federal Decree Law No. 45 of 2021 (PDPL)`

**Section 4: Applicant Declaration**
Bordered box with the following declaration text:
`I declare that all information provided in this application is true, accurate, and complete to the best of my knowledge. I understand that providing false or misleading information may result in the rejection of my application and/or disciplinary action by the relevant UAE health authority. I authorise MantraComply to submit this application on my behalf to the relevant UAE health authority.`

- Checkbox: `☐ I confirm the above declaration`
- Digital Signature — text input: `Type your full legal name as it appears on your passport`
- Date — auto-filled with today's date (read-only)

**Submit button:** `Submit UAE Credentialing Application`

---
---

## SHARED COMPONENT NOTES FOR ALL 4 FORMS

### File Upload Component (consistent across all forms)
- Dashed border (#CBD5E0), border-radius 8px
- Cloud upload SVG icon (gray, center)
- Primary text: `Click to upload or drag and drop`
- Secondary text: `PDF, JPG, or PNG (max 10MB)`
- On file selected: show file name with a trash icon to remove
- Multiple files: stack file rows vertically inside the zone
- Currency in upload zone label where country-specific: always use country's currency symbol (£ for UK, $ for Canada, A$ for Australia, AED for UAE)

### Validation Behaviour
- Required field borders turn red on attempted submission without completion
- Error message appears below the field in red text: `This field is required`
- Date fields validate for logical date ranges (expiry must be after effective date, etc.)
- File uploads show error if wrong format: `Please upload a PDF, JPG, or PNG file`

### Progress Sidebar Behaviour
- Completed steps: circle fills with blue with a white checkmark ✓
- Current step: filled blue circle (no checkmark)
- Upcoming steps: empty circle with gray text
- Step text: bold for active, regular weight for inactive
- Clicking a completed step navigates back to it (form data preserved)

### Navigation
- "Back" button: outlined, gray text, navigates to previous step (data preserved)
- "Save and Continue" button: solid blue (#2563EB), white text, right-aligned
- On final step "Submit Credentialing Application" replaces "Save and Continue"
- Progress bar at top of content card fills proportionally per step (e.g., Step 3 of 10 = 30% filled)

### "Need Help?" Card
- Light blue background (#EFF6FF), rounded, below the main card
- Blue info circle icon (ℹ)
- Bold: `Need Help?`
- Body: `Our credentialing specialists are here to assist you.`
- Link: `Visit Help Center →` in blue

### Info / Warning Callout Boxes
- Blue info callout: light blue background (#EFF6FF), left blue border (4px solid #2563EB)
- Amber warning callout: light amber background (#FFFBEB), left amber border (#D97706), amber warning icon ⚠
- Full width inside the content card

### Conditional Field Visibility
- Use smooth CSS transition (opacity + height) when fields appear/disappear conditionally
- Do not use jarring layout jumps

---

## DO NOT:
- Do not create a new app, new Tailwind config, or new design system — extend the existing one
- Do not mix form data between countries — each country form is completely independent
- Do not use the US CAQH, NPI, or SSN fields in any international form
- Do not use US insurer names (Aetna, BCBS, UHC) in any international form
- Do not add new colour variables — use the existing blue (#2563EB) primary system
- Do not add animations that don't exist in the current dashboard

---

*End of MantraComply International Credentialing Form Prompt — v1.0*
*Country coverage: 🇬🇧 UK (10 steps) | 🇨🇦 Canada (11 steps) | 🇦🇺 Australia (10 steps) | 🇦🇪 UAE (13 steps)*
