Rebuild the entire /admin/payers section from scratch with the following 
specifications. Keep all other pages intact.

---

## PAYERS PAGE — TOP LEVEL (/admin/payers)

Tab bar (underline style, blue active): 
  Payer List | Enrollment Requests | Existing Enrollments | 
  CAQH Management | Delegated Agreements

Top-right: "Request Enrollment" button (blue, primary) — 
  visible on ALL tabs, always accessible.

---

## TAB 1: PAYER LIST

Purpose: Master list of all insurance companies in the system.

Top bar:
- Search input: "Search payers..."
- Filter chips: All | Medicare | Medicaid | Commercial | Managed Care
- "+ Add Payer" button (secondary/outlined)

Table columns:
  Payer Name | Type | States Covered | Contract Type | 
  Enrollment Type | Status | Actions

Sample rows:
  Aetna | Commercial | Multi-state | Participating | 
    Electronic | Active | [View] [Edit]
  Anthem (Health Net of CA) | Commercial | CA | Participating | 
    Paper | Active | [View] [Edit]
  Cigna | Commercial | Multi-state | Non-Par | 
    Electronic | Active | [View] [Edit]
  Medicare | Government | All States | Participating | 
    Electronic | Active | [View] [Edit]
  Medicaid - FL | Government | FL | Participating | 
    Paper | Active | [View] [Edit]
  Medicaid - WY | Government | WY | Participating | 
    Paper | Active | [View] [Edit]
  Optum | Managed Care | AZ, TX, FL | Participating | 
    Electronic | Active | [View] [Edit]
  Humana | Commercial | Multi-state | Participating | 
    Electronic | Active | [View] [Edit]
  UnitedHealthcare | Commercial | Multi-state | Participating | 
    Electronic | Active | [View] [Edit]
  Magellan | Managed Care | Multi-state | Non-Par | 
    Paper | Inactive | [View] [Edit]

Status badge: Active = green pill, Inactive = gray pill.

This Payer List is the source of truth for the 
"Request Enrollment" modal (step 3 — payer selection).

---

## REQUEST ENROLLMENT — MODAL (triggered from button)

This is a multi-step modal (wizard style with step indicator at top):

STEP 1 OF 3 — Select Providers
  Header: "Request Enrollment — Step 1 of 3: Select Providers"
  
  Search bar: "Search providers by name..."
  
  Scrollable provider list with checkboxes. Each row shows:
    [ ] Provider avatar + Full Name | Specialty | NPI | 
        # Current Enrollments (e.g. "4 active")
  
  "Select All" checkbox at top.
  Selected count shown: "3 providers selected"
  
  Bottom: Cancel | Next →

STEP 2 OF 3 — Review Existing Enrollments
  Header: "Step 2 of 3: Existing Enrollments"
  Subtext: "Review what each selected provider is already enrolled in."
  
  For each selected provider, show a collapsible card:
    [Provider Name] — [Specialty]
    Enrolled in: [chip list of current payers in green]
    e.g. "Medicare | Aetna | Cigna | Humana"
    If none: "No current enrollments"
  
  This is read-only / informational — no actions here.
  
  Bottom: ← Back | Next →

STEP 3 OF 3 — Select Payers to Enroll In
  Header: "Step 3 of 3: Select Payers"
  Subtext: "Select insurance companies to request enrollment for. 
            Already enrolled payers are shown but cannot be re-selected."
  
  Search bar: "Search payers..."
  Filter chips: All | Medicare | Medicaid | Commercial | Managed Care
  
  Scrollable payer list. Each row:
    [ ] Payer Name | Type | States | Enrollment Type
  
  Rules:
  - If ALL selected providers are already enrolled with a payer → 
    show that payer row grayed out with a "Already Enrolled" tag, 
    checkbox disabled.
  - If SOME providers are enrolled → show payer with 
    "Partial — X/Y enrolled" warning tag in orange, still selectable.
  - Unrolled payers → normal selectable rows.
  
  Below payer list:
  "Additional Details" section (optional but shown):
    - Priority: Normal | Urgent (toggle)
    - Target Effective Date: date picker
    - Notes for payer: textarea (placeholder: 
      "Add any notes for the credentialing team...")
    - Attach Documents (drag & drop): 
      accepts W9, CAQH attestation, voided check, 
      other supporting docs. 
      Show accepted file types: PDF, JPG, PNG. Max 10MB each.
  
  Summary bar at bottom of modal (sticky):
    "Submitting for: [3 providers] to enroll in [5 payers] 
     = 15 enrollment requests"
  
  Bottom: ← Back | Submit Request (blue, primary)

ON SUBMIT:
  - Show success toast: 
    "Enrollment request submitted for 3 providers across 5 payers."
  - Close modal.
  - Automatically switch active tab to "Enrollment Requests."
  - New rows appear at top of Enrollment Requests table 
    with status "Pending."

---

## TAB 2: ENROLLMENT REQUESTS

Purpose: Track all submitted enrollment requests and their current status.

Top bar:
  - Search: "Search by provider or payer..."
  - Filter dropdowns: Status | Payer | Provider | Date Range
  - Export button: "Export CSV" (outlined, right side)

Table columns:
  checkbox | Request ID | Provider Name | Specialty | 
  Payer | State | Type | Submitted Date | 
  Status | Priority | Last Updated | Actions

Status chips (color coded):
  Pending (gray) | Submitted to Payer (blue) | 
  In Review (yellow) | More Info Needed (orange) | 
  Approved (green) | Denied (red)

Priority badges: Normal | Urgent (red)

Actions column per row:
  [View] [Update Status ▼] [Add Note] [Upload Doc]

"Update Status" is a dropdown:
  → Submitted to Payer
  → In Review  
  → More Info Needed
  → Approved
  → Denied

ROW EXPAND (click anywhere on row except action buttons):
  Expanded detail panel below the row:
    - Timeline/activity thread showing status changes with 
      timestamps and who changed it
    - Comments section: text input + "Add Comment" button, 
      threaded comments with timestamps
    - Uploaded documents list with download icons
    - If status = "More Info Needed": 
      show orange callout box with text field: 
      "Specify what additional information is required"

Sample rows (pre-populated):
  REQ-001 | Rachit | Therapist | Aetna | FL | 
    Commercial | 03/20/2026 | Pending | Normal | Today
  REQ-002 | Aman | Therapist | Medicare | WY | 
    Government | 03/19/2026 | Submitted to Payer | Normal | Yesterday
  REQ-003 | Aditya | Therapist | Cigna | AZ | 
    Commercial | 03/18/2026 | In Review | Urgent | 2 days ago
  REQ-004 | Karan | Therapist | Humana | FL | 
    Commercial | 03/15/2026 | Approved | Normal | 1 week ago
  REQ-005 | Mahima | Doctor | Optum | AZ | 
    Managed Care | 03/10/2026 | Denied | Normal | 2 weeks ago
  REQ-006 | Aheesha | Therapist | UnitedHealthcare | CA | 
    Commercial | 03/08/2026 | More Info Needed | Urgent | 2 weeks ago

Approved row → on approval, a success banner appears at top:
  "Enrollment Approved: [Provider] is now enrolled with [Payer]. 
   View in Existing Enrollments →" (linked)

Pagination: 10 rows per page. Show "1–6 of 6 requests."

---

## TAB 3: EXISTING ENROLLMENTS

Purpose: All currently active/terminated enrollments.

Top filter bar:
  Show enrollments for: 
    [Group] [Facility] [Provider] [Payer] (toggle chips, multi-select)
  Status filter: All | Active | Terminated | Pending Effective Date
  Search: "Search provider or payer..."
  "Request Enrollment" button (blue) | "Export CSV" (outlined)

Table columns:
  checkbox | Provider Name | Payer | Network Type | 
  Practice Location | Effective Date | Status | TPV | 
  Actions

Network Type chips: PPO (orange) | HMO (blue) | 
  Medicaid (teal) | Medicare (purple)

Status: Active (green) | Terminated (red) | 
  Pending Effective Date (yellow)

Actions column:
  [View] [Renew] [Terminate]

"Renew" action: 
  Opens the Request Enrollment modal pre-filled with 
  this provider + this payer already selected. 
  User skips to Step 3 directly. 
  Shows "Renewal" tag on the request in Enrollment Requests tab.

"Terminate" action: 
  Opens confirmation modal:
    "Terminate Enrollment"
    "Are you sure you want to terminate [Provider]'s 
    enrollment with [Payer]?"
    Termination Date: date picker (defaults to today)
    Reason: dropdown (Provider Left Practice | Payer Contract Ended | 
      Administrative | Other)
    Notes: textarea (optional)
    Buttons: Cancel | Terminate (red button)
  On confirm: row status changes to "Terminated" (red badge).

Grouped by Provider (collapsible rows with expand arrow).
Each provider group shows sub-rows for each enrollment.

---

## TAB 4: CAQH MANAGEMENT

Purpose: Track CAQH profile status for all providers.

Top bar:
  Search | Filter: CAQH Status | Export CSV

Table columns:
  Provider Name | Specialty | CAQH ID | 
  Last Attestation Date | Attestation Expiry | 
  CAQH Status | Sync Status | Actions

CAQH Status chips:
  Authorized (green) | Expired (red) | 
  Not Authorized (gray) | In Progress (yellow)

Sync Status chips:
  Synced (green) | Sync Pending (yellow) | Failed (red)

Actions: [View CAQH] [Re-attest] [Sync Now]

"Re-attest" → opens modal:
  "Send Re-attestation Request"
  Provider: [pre-filled]
  Message to provider: textarea
  [ ] Send email notification to provider
  Buttons: Cancel | Send Request

Sample rows:
  Rachit | Therapist | 12345678 | 01/15/2026 | 04/15/2026 | 
    Authorized | Synced | ...
  Aman | Therapist | 23456789 | 10/01/2025 | 01/01/2026 | 
    Expired | Sync Pending | ...
  Aditya | Therapist | — | — | — | 
    Not Authorized | — | ...

---

## TAB 5: DELEGATED AGREEMENTS

Purpose: Manage payer delegation agreements.

Top bar:
  Search | "+ Upload Agreement" button

Table columns:
  Payer Name | Agreement Type | Effective Date | 
  Expiry Date | Status | Uploaded By | Upload Date | Actions

Actions: [Download] [Replace] [Delete]

"+ Upload Agreement" modal:
  Select Payer: dropdown (from Payer List)
  Agreement Type: dropdown 
    (Credentialing Delegation | Billing Delegation | 
     Full Delegation | Other)
  Effective Date: date picker
  Expiry Date: date picker
  Upload file: drag & drop (PDF only, max 20MB)
  Notes: textarea
  Buttons: Cancel | Upload

Sample rows:
  Aetna | Credentialing Delegation | 01/01/2025 | 
    12/31/2025 | Active | Admin | 01/05/2025 | ...
  Cigna | Full Delegation | 06/01/2025 | 
    05/31/2026 | Active | Admin | 06/03/2025 | ...

---

## STATE MANAGEMENT

Use React Context or Zustand to manage:
  - payerList: array of all payers (source of truth)
  - enrollmentRequests: array, updated when modal submits
  - existingEnrollments: array with status field
  - selectedProvidersInModal: temp state during modal flow
  - selectedPayersInModal: temp state during modal flow

On Request Enrollment submit:
  - Create one enrollmentRequest object per 
    provider+payer combination
  - Push all to enrollmentRequests array
  - Auto-navigate to Enrollment Requests tab
  - Clear modal state

On Enrollment Approved (status update):
  - Add corresponding entry to existingEnrollments array 
    with status "Active"

On Terminate:
  - Update existingEnrollments entry status to "Terminated"

---

## REUSABLE COMPONENTS TO BUILD

- <PayerBadge type="PPO|HMO|Medicaid|Medicare" />
- <EnrollmentStatusBadge status="Pending|Approved|..." />
- <RequestEnrollmentModal step={1|2|3} />
- <EnrollmentTimeline events={[]} />
- <TerminateModal onConfirm={fn} />
- <DocumentUploader accept=".pdf,.jpg,.png" maxMB={10} />

---

## DO NOT CHANGE

- All other admin pages (Overview, Providers, Groups, 
  Licenses, Credentialing, Reporting, Settings)
- The Provider Dashboard (/provider/*)
- The login flow
- The sidebar navigation and design system