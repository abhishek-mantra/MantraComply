Build a full MantraComply web dashboard with two separate dashboards — a Provider Dashboard (already exists) and a new Admin Dashboard — distinguished by role-based login flow.

---

## DESIGN SYSTEM 
- match existing Provider Dashboard
---

## LOGIN FLOW
Two roles at /login:
- Role selector: "Provider" | "Admin" (toggle or dropdown)
- Provider login → routes to /provider/credentialing (existing dashboard)
- Admin login → routes to /admin/overview
---

## EXISTING PROVIDER DASHBOARD (DO NOT BREAK)
Keep it as it is, dont change anything in it.
---

## ADMIN DASHBOARD — LAYOUT
- Left sidebar (collapsible with "<" toggle): MantraComply logo + org name dropdown (e.g. PhysioMantra)
- Sidebar nav items: Overview, Providers, Groups/Facilities, Licenses, Credentialing, Payers, Reporting
- Bottom sidebar: Account, Support, Logout
- Top right: logged-in admin name + avatar

---

## PAGE 1: OVERVIEW (/admin/overview)
Summary cards row:
- Total Providers | In Process | Completed | Re-Credential Due
- Total Groups | Active Licenses | Expiring Soon | Payer Enrollments
Below: Quick-action buttons: + Add Provider, Request License, New Payer Enrollment
Recent Activity feed (mocked)

---

## PAGE 2: PROVIDERS (/admin/providers)
Top bar: Search by name/phone/email | "+ Add Provider" button
Table columns: checkbox | Provider Name | Specialty | Credentialing Status | Health Status | Actions
- Credentialing Status badges: "In process" (yellow), "Done" (green), "Not started" (gray), "Re-credential" (orange)
- Health badges: "Ok" (green), "Issues" (red), "Expirations" (yellow)
- Actions column: Expirations | Lock | Edit | Activate/Deactivate | Request/Task (icon buttons)

ADD PROVIDER MODAL (triggered by "+ Add Provider"):
Fields: First Name, Last Name, Email
Checkbox: "Send Invite — Sends an invite giving providers access to update/edit the MantraComply profile"
Buttons: Cancel | Add | Prepopulate Details

PROVIDER DETAIL VIEW (click provider row):
Tabs across top: Directory | CAQH Bulk Import | CAQH Application Imports | Provider Supervision
Filter bar: Sort By | Profession filter | State filter | CAQH Eligible filter
Extended table: Provider | Team | NPI | CAQH | Groups | Practices | Primary Specialty | Employment Status | Credential %
Right-side panel on row click showing provider card + "Invite Member" modal with role tabs (Provider / Admin / BHI / Admin & Provider / Auditor / Drafts / Team Manager / Provider & Team Manager) + fields: Email, First Name, Last Name, Estimated Start Date, Permissions checkboxes, Send invitation email toggle

REQUEST dropdown menu (blue button top right):
Options: New License | License Renewal | License Reinstatement | Provider Credentialing | New Payer Enrollment | Single Demographic Update | Bulk Demographic Update | Request Revalidation

---

## PAGE 3: GROUPS / FACILITIES (/admin/groups)
Two sub-tabs: Group Profiles | Practice Locations

GROUP PROFILES tab:
"Add Group Profile" button top left
Table: Name | State | NPI Number | Tax ID Number | Practices (linked count) | % Complete (green progress bar)
Sample rows: Community Health Center (LA), Longmont Medical Group LLC (TN)

GROUP DETAIL PAGE (click group name):
Header: Group name + NPI + Tax ID + location
Top tabs: Overview | Profile | Providers | Practices | Payers | Notes
Left progress sidebar (like provider credentialing):
- Basic Info (with % complete)
- Credentialing Info
- Group Officers
- Upload Profile
- Confirm/Submit
Basic Info fields: Organization Name, Organization DBA, Internal Group ID, Federal Group ID, NPI Number (Type dropdown), NPI Status, Law of Proximity, Taxonomy (Primary/Additional dropdowns)
Documents tab: "All file uploads are secure and protected" notice | Additional Suggested Documents section | Uploaded Documents table (Info | File Name | Type | Signature | Uploaded By | Upload Date | X)

PRACTICES tab (inside group detail):
"Add Practice" button
Table: Name | State | City | Street Address | Postal Code | % Complete
5 sample practices with green progress bars

FACILITIES tab (admin/groups/facilities):
"Add Facility" button + Request button
Table: Name | Address | City | State | Postal Code | TIN | NPI | % Complete
3 sample facilities: Broomfield Medical Laboratory, St. Mary's Medical Center, UCHealth

FACILITY DETAIL PAGE:
Header: Facility Name + TIN + NPI
Left progress nav: Facility Details (90%) | Accreditation (100%) | Site Visits (100%) | CLIA (100%) | Existing Licenses (100%) | Malpractice Insurance (100%) | Hospital Admitting Arrangements (100%) | Facility Officer (80%) | Credentialing Contacts
Facility Details fields: Facility Name, Facility TIN, Facility NPI, Facility Type(s) (multi-select chips), Primary Taxonomy, Secondary Taxonomy (optional), Additional Taxonomies (optional)

PAYERS tab (inside facility):
Table: Name | Relationship | Processing | Start Date | Notes | Status | Report
"Click to comment" inline action on rows

---

## PAGE 4: LICENSES (/admin/licenses)
Header: "Licenses" + org name
Table: Provider Name | License Number | State | Status | Exp Date | Expiration | Last Updated | Actions (icons: view, edit, download, alert)
Sample data with statuses: active, active with caveat, 3 days left warning
Bottom section: DEA Licenses table with same structure
"OneView — Credentialing Report" banner overlay at bottom

---

## PAGE 5: CREDENTIALING (/admin/credentialing)
Tab bar: In Progress | Ready | Complete | Not Credential
Filter bar: Request Type filter | Assignee filter
Table columns: checkbox | Provider (name + CAQH tag + specialty) | Name | State | All (count) | SLA ↑ | SLA Timer | Holding on 3rd Party | Needs QC | Credential File

RIGHT PANEL — Credentialing Checklist (slides in on row select):
Checklist items with expand arrows:
☐ Application
☐ Work History Validation  
☐ Disclosure Answers
☐ Malpractice Insurance Records
☐ Board Certification
☐ CSR
☐ DEA
☐ Death Master
☐ Education and Training
☐ Licenses
☐ Medicaid Exclusions
☐ Medicare Opt-Out

Each item shows: SLA | SLA Timer | Holding on 3rd Party | Needs QC | Credential File columns
Status chips: Passed | Unlocked | Exempt | Credential (blue link)

SECOND CREDENTIALING VIEW (sub-tab/filter = "Done"):
Compact table with: Assignee | Since Start | Days | All | Years | SLA | SLA... | Advanced Payers | Credentialing (link)
Row with green highlight = completed item

---

## PAGE 6: PAYERS (/admin/payers)
Sub-tabs: Payer List | Enrollment Requests | Existing Enrollments | CAQH Management | Delegated Agreements

PAYER LIST tab:
"Payers with submitted enrollment requests" section header
List of payer names: Aetna, Anthem from Health Net of California, Anthem from Louisiana Healthcare Connections, America's Choice Provider Network, Ascension Care Management, AvMed, CareSource, Cigna, Health Network One, Humana, Magellan, Medicaid-CO, Medicaid-KS, Medicaid-OH

ENROLLMENT REQUESTS tab:
Filter: Show enrollments for: Group | Facility | Provider | Payer
"Add to Existing Enrollment" button
Table: checkbox | Status | Provider (name + CAQH + specialty) | Networks | Practice Location | # Locations | New Information | First Prac. Active | Prac Status | TPV | Note
Sample rows with statuses: Enrolled, Processing

EXISTING ENROLLMENTS tab:
Filter: Show enrollments for Group | Facility | Provider | Payer (chips)
"+ Add to Existing Enrollment" button
Table: Provider Name | Individual Networks | Practice Location | Status | Effective Date | Note | TPV
Grouped by provider with expand arrow
Status colors: PPO (orange), HMO (blue), Medicaid (teal)

---

## PAGE 7: REPORTING (/admin/reporting)
Top tab bar: Licensing | Enrollment | Credentialing | Ongoing Monitoring

ENROLLMENT sub-tab (default):
"Completed Enrollments" section:
Table: Provider Name | Payor | State | Completed Date
Rows: XXXX Medicare FL 1/2/2025, XXXX Medicaid WY 1/2/2025, XXXX Optum AZ 1/2/2025, XXXX Cigna Cigna

"Enrollment by Month" bar chart (use Recharts):
X-axis: months, Y-axis: count of enrollments, Blue bars
Right side: "New Enrollment Requests by Status" legend table:
- Under, Active Completed, Pending Credentialing Provider, Pending Response from Payer, Measured, Sent Request for Enrollment
"Completed Enrollments" detail table below chart: Provider Last Name | Payer | State | Completion Date

EXPIRABLES section (sub-nav under Reporting):
Table: Provider | Name | Category | Document Type | Valid Till | Expiry Status
Expiry Status chips: Expired (red), Nearing (orange)
Sample rows:
- Aheesha | NY state license | Licenses | State Registration | 12/12/23 | Expired
- Aheesha | NY state license | Licenses | State Registration | 12/12/23 | Nearing
- Aheesha | Humana Malpractice | Insurance | Malpractice | 12/12/23 | Expired
- Aheesha | Humana Malpractice | Education | University | 12/12/23 | Expired
- Mahima | Humana Malpractice | Education | University | 12/12/23 | Expired

PAYER ENROLLMENT sub-nav:
Table: Provider Name | Payor | State | Completion Date
With rows: Cynthia/Megs/Medicare/FL, Christine/Lodge/Humana/FL, Albia/Sean/Medicaid/AZ, Christian/Lodge/Optum/AZ, Brady/Humana/NY

---

## SETTINGS (/admin/settings)
Top tabs: Roles and Permissions | Industries | Custom Fields | Other Settings

ROLES AND PERMISSIONS tab:
Left panel: Users list (search bar + Employees dropdown) + "+ Add User" button → "No users found / Try a different search or add a user"
Right panel: "Select a User — Click on a user from the list on the left to view and modify their permissions"
Role types defined: Provider | Admin | Viewer | Auditor | Manager

---

## GLOBAL COMPONENTS
- Toast notifications for all save/submit actions
- Loading skeletons on all tables
- Empty states with icon + message
- Confirmation modals for destructive actions (lock, deactivate)
- Responsive sidebar collapse on smaller screens
- All data is mocked with realistic fake data (no backend required)
- Use React Router for all navigation
- Use Recharts for all charts
- Use Tailwind CSS exclusively for styling
- Component library: build reusable StatusBadge, DataTable, SidebarNav, ModalWrapper, ProgressSidebar components

---

## ROUTING STRUCTURE
/ → /login
/login → role selector + login form
/provider/* → Provider Dashboard (existing)
/provider/credentialing → 12-step wizard
/admin/overview
/admin/providers
/admin/providers/:id
/admin/groups
/admin/groups/:id
/admin/groups/:id/facilities
/admin/groups/:id/facilities/:facilityId
/admin/licenses
/admin/credentialing
/admin/payers
/admin/reporting
/admin/settings

