I have an existing admin dashboard at the route /admin/groups/:id. 
On this page, add a new tab called "Profile" to the existing tab bar.

When the Profile tab is active, render the following multi-step group 
onboarding form. Base the visual design exactly on the reference UI 
described below.

---

## VISUAL DESIGN REFERENCE

### Layout
- Two-column layout inside the tab content area
- LEFT COLUMN (fixed, ~240px wide): vertical step navigator
- RIGHT COLUMN (fluid): active step form content
- White background, light gray page background (#F5F5F0 or similar)
- Clean sans-serif font, generous whitespace

### Left Step Navigator
- Each step is a row with: circle number badge + step label + 
  completion percentage (e.g. "100%")
- Active step: circle badge is filled solid purple/violet 
  (#6C63FF or similar), label is bold
- Completed steps: circle badge is outlined with a muted color, 
  label is regular weight, percentage shown in muted gray
- Incomplete steps: circle badge is outlined gray, no percentage shown
- A thin green progress bar runs along the bottom of the navigator 
  with a green checkmark circle at the right end when all steps complete
- Steps in order:
  1. Basic Info
  2. Financial Info
  3. Operational Info
  4. Group Officials
  5. External Accounts
  6. Practice Locations
  7. Documents

### Form Fields (Right Column)
- Section heading (e.g. "Basic Info") in large bold text at top right
- Fields use full-width white input boxes with thin border, 
  rounded corners, light gray placeholder text
- Optional fields are labeled with "– optional" in italic next to 
  the label
- Multi-select tag inputs (like Lines of Business) show removable 
  pill tags inside the input box
- Dropdown fields have a chevron icon on the right
- Date fields have a calendar icon on the right
- Field labels are small, semibold, above each input
- Info icon (ⓘ) appears next to field labels that need explanation 
  (e.g. NPI Number, Lines of Business, Service Types)
- Two-column grid for side-by-side fields 
  (e.g. State of Incorporation + Date of Incorporation)

---

## STEP-BY-STEP FORM CONTENT

### Step 1 — Basic Info
Fields:
- Group Name [text, required]
- Fictitious Business Name / Doing Business As (dba) [text, optional]
- Internal Group ID [text, optional]
- NPI Number ⓘ [text, required]
- Lines of Business ⓘ [multi-select tags, required]
  Options: Exchange/Marketplace/ACA, Managed Medicaid, Government, 
  Medicare Advantage, Commercial, Traditional Medicare
- State of Incorporation [dropdown, required] + 
  Date of Incorporation [date picker, required] — side by side
- Service Types ⓘ [multi-select, required]

### Step 2 — Financial Info
Fields:
- Tax ID / EIN [text, required]
- W-9 Tax Classification [dropdown, required]
  Options: Individual/Sole proprietor, C Corporation, S Corporation, 
  Partnership, Trust/estate, LLC, Other
- Billing Address [address block: street, city, state, zip, required]
- Remittance Address same as billing? [checkbox]
- Payment Method [radio: EFT / Check]
- Bank Name [text, conditional on EFT]
- Bank Routing Number [text, conditional on EFT]
- Bank Account Number [text, conditional on EFT]
- Accounts Receivable Contact Name [text, optional]
- Accounts Receivable Contact Email [email, optional]
- Billing Company Name (if outsourced) [text, optional]

### Step 3 — Operational Info
Fields:
- Primary Phone [tel, required]
- Primary Fax [tel, optional]
- Primary Contact Email [email, required]
- Website URL [url, optional]
- Credentialing Contact Name [text, required]
- Credentialing Contact Email [email, required]
- Billing / Enrollment Contact Name [text, required]
- Billing / Enrollment Contact Email [email, required]
- Hours of Operation [time range picker per day, optional]
- Taxonomy / Specialty Codes [multi-select tag input, required]
- Languages Spoken [multi-select, optional]
- Accepting New Patients [toggle: Yes / No]
- Telehealth Available [toggle: Yes / No]

### Step 4 — Group Officials
Repeatable section — user can add multiple officials.
Per official:
- Full Name [text, required]
- Title / Role [dropdown: CEO, Medical Director, CFO, 
  Compliance Officer, Authorized Signatory, Other]
- Email [email, required]
- Phone [tel, required]
- Is Authorized Signer? [checkbox]
- Ownership Percentage [number, optional, show only if entity type 
  is relevant]
- SSN (for authorized signer) [masked text, conditional]
- Date of Birth (for authorized signer) [date, conditional]
Add another official button at bottom of section.

### Step 5 — External Accounts
Fields:
- CAQH Organization ID [text, optional]
- Medicare PTAN [text, optional]
- PECOS Enrollment Status [dropdown: Enrolled / Pending / Not enrolled]
- Medicaid Provider Number [text, optional] + 
  Medicaid State [dropdown] — side by side
  Allow adding multiple Medicaid entries (repeatable row)
- TRICARE Provider ID [text, optional]
- EDI Submitter ID [text, optional]
- Clearinghouse Name [text, optional]
- Additional Payer IDs [repeatable: Payer Name + ID pairs]

### Step 6 — Practice Locations
Repeatable section — each location is a card.
Per location:
- Location Name [text, required]
- Is Primary Location? [toggle]
- Physical Address [address block: street, city, state, zip]
- Mailing Address same as physical? [checkbox]
- Phone [tel, required]
- Fax [tel, optional]
- Location-specific NPI [text, optional]
- Services Offered at this Location [multi-select]
- ADA / Wheelchair Accessible [toggle]
- Accepting New Patients at this Location [toggle]
- After-hours / On-call Coverage [toggle]
Add another location button.

### Step 7 — Documents
Upload cards for each document type. Each card shows:
- Document name
- Description of what's accepted
- Upload button (drag and drop or click)
- Uploaded file name + date + delete option once uploaded
- Required vs optional badge on each card

Document cards:
- IRS Form W-9 [required]
- Articles of Incorporation [required]
- State Business License [required]
- Malpractice / Liability Insurance Certificate of Insurance [required]
- Group NPI Confirmation Letter [required]
- IRS EIN Determination Letter [optional]
- Accreditation Certificate (NCQA, JCAHO, etc.) [optional]
- Voided Check (for EFT setup) [conditional on EFT payment method]
- DEA Registration [optional]

---

## BEHAVIOR & INTERACTIONS

- Clicking a step in the left navigator jumps to that step
- Each step has a "Save & Continue" button that validates required 
  fields and advances to the next step
- Completed steps show "100%" next to their label in the navigator
- The green progress bar at the bottom of the navigator fills 
  proportionally as steps are completed
- When all 7 steps reach 100%, show a completion state with a 
  green checkmark
- Unsaved changes trigger a "You have unsaved changes" warning if 
  the user tries to navigate away
- All data persists per group ID (/admin/groups/:id)
- Form state is saved to the group record on "Save & Continue"

---

## TECH NOTES
- Use the existing design system / component library already in the project
- Match the color scheme in the screenshot: white cards, purple/violet 
  active states, muted grays for inactive, green for completion
- The left step navigator should be sticky while scrolling the form
- Mobile: collapse the step navigator into a horizontal stepper at top
- Validate required fields inline (red border + error message below field)