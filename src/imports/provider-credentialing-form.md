Objective:
Update the provider profile flow so that, upon landing on the “My Profile” section, the 17-step credentialing form opens directly—removing the need for an “Apply for Credentialing” button.

Form Structure Overview
Build a 17-step credentialing form using the schema below.
Each step corresponds to a specific data category. Include progress navigation (1–17) and allow saving at any step.

17-Step Form Schema
National Provider Identifier (NPI)

Input field for Type 1 NPI

Radio buttons: Talk Therapy, Medication Management, or Both

CAQH Authorization

Fields: CAQH Provider ID, CAQH ProView Username, CAQH Password

Toggle/checkbox: “Grant Global Authorization”

CAQH Account Updates

Verification checklist confirming CAQH profile is current (e.g., W-9 uploaded, signed attestation complete)

Personal Information

Inputs: Legal Name, Date of Birth, SSN, Home Address

License Information

Dropdown for License Type

License Number, Issuing State, Expiration Date

File upload for license certificate

Board Certification

Input for board details or checkbox for “N/A”

Malpractice Information

Inputs: Carrier Name, Policy Number, Coverage Amounts ($1M/$3M)

File upload for Certificate of Insurance (COI)

Education

Degree, Institution, Graduation Date

Employment Information

Dynamic, repeatable list for employment history (past 5 years)

Option to note “Gap in employment” with explanation

Practice Information

Physical office address or checkbox for “Virtual/Telehealth Only”

Focus Areas

Multi-select checkboxes for clinical specialties (e.g., Anxiety, Depression, PTSD)

Practice Modalities

Multi-select checkboxes for therapeutic approaches (e.g., CBT, EMDR)

Practice Languages

Multi-select or searchable dropdown for language fluency

Current Insurance Plans

Checklist of current paneling/credentialing

Current Clients

Fields for listing existing clients (for benefit verification)

Release Forms

Digital signature fields for Business Associate Agreement (BAA) and Provider Agreement

Insurance Plans and Rates

Multi-select for desired carriers (e.g., Aetna, Cigna, United)

Dynamic preview table of CPT code reimbursement rates

Dynamic Behavior Based on Provider Type
The form dynamically adjusts certain fields depending on the selected service type from Step 1:

Step	Field Name	If “Therapy”	If “Diet”	If “Physiotherapy”
1	Service Selection	Talk Therapy / Med Management	Medical Nutrition Therapy (MNT)	Physical Therapy (PT)
5	License Type	LCSW, LMHC, PsyD, NP	RD, RDN, LD, CD	PT, DPT, PTA
6	Board Certification	ABPN, ABCFP	CDR Specialty (Renal, Pediatric)	ABPTS (Orthopedic, Geriatric)
11	Focus Areas	Anxiety, Depression, Trauma	Diabetes, Eating Disorders, IBS	ACL Recovery, Sports Injuries, Stroke Rehab
12	Modalities	CBT, DBT, EMDR	Intuitive Eating, Keto-Therapeutic	Manual Therapy, Gait Training, Dry Needling
17	Rates Table	CPT 90837, 90791	CPT 97802, 97803	CPT 97110, 97116
Additional UI Notes:

Follow attached screenshot only for reference (colors, spacing, etc.) — not exact replication.

Include autosave progress and “Save & Continue” navigation.

Each section should show validation errors inline.

On completion, trigger “Credentialing Submitted” status and store data in provider’s profile collection.

