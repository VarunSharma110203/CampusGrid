# CampusGrid Multi-Tenant Isolation & Excel Roster Management Walkthrough

We have successfully migrated the Firestore database architecture of **CampusGrid** to a multi-tenant structure scoped by **Customer ID** (`customerId`) and introduced client-side **Excel/CSV (.xlsx, .xls, .csv)** roster parsing and pre-populated template downloads.

## Key Changes Implemented

### 1. Database Scoping Utility
- Created `getTenantRef(collectionName)` in `app.js` to route all university-specific Firestore collection calls dynamically based on the active user's `customerId`:
  - `config/calendar` -> `customers/{customerId}/config/calendar`
  - `config/buildings` -> `customers/{customerId}/config/buildings`
  - `config/slots` -> `customers/{customerId}/config/slots`
  - `schedules` -> `customers/{customerId}/schedules`
  - `unassigned` -> `customers/{customerId}/unassigned`
  - `issues` -> `customers/{customerId}/issues`
  - `approvalRequests` -> `customers/{customerId}/approvalRequests`
  - `masterSchedule` -> `customers/{customerId}/masterSchedule`

### 2. Multi-Tenant User Registry & Session Discovery
- Kept the `users` collection global at the root level (`users/{email}`) so that users can log in from the main portal with just their email.
- Tagged every user record with a `customerId` property.
- On login or session restoration (`fbAuth.onAuthStateChanged`), the app retrieves the user's document from `users/{email}`, extracts their `customerId`, and automatically loads/listens to configuration and schedule collections scoped under `customers/{customerId}/`.
- Configured the User Directory Settings Dashboard to retrieve only the users matching the active tenant's `customerId` via a `.where('customerId', '==', customerId)` query.

### 6. Clean Cockpit & Local State Clearing
- Introduced `clearLocalState()` in `app.js` to completely wipe out default/in-memory prototype demo data when logging into a fresh/new tenant workspace where Firestore collections are empty.
- Overwrote the global user roster state (`state.users`) with the retrieved database users directly to avoid retaining the hardcoded demo roster directory.
- Forced a page reload (`window.location.reload()`) on sign out to guarantee a clean, unpolluted DOM and javascript memory state when switching users or sessions.

### 7. Production-Ready Authentication & Tenant Data Isolation
- **Case-Insensitive Email Handlers**: Enforced systematic `.toLowerCase()` conversion on all email addresses entered during registration, login, user creation, deletion, and bulk sheet uploads. This resolves issues where mixed-case inputs caused Firebase Authentication to succeed but Firestore user document lookups (which are case-sensitive) to fail.
- **Strict Seeding Isolation**: Restricted the automatic Firestore database seeder (`seedFirestoreIfEmpty`) to run **only** for the default demo tenant (`CUST-DEMO77`). Fresh custom universities will no longer be polluted with demo schedule matrices, issues, or unassigned lectures.
- **Empty Fresh Calendars**: Custom registered institutions now start with an empty calendar configuration events list, removing pre-filled default holidays (e.g. Labor Day) and exam periods belonging to the demo university.
- **Offline Registration Reset**: Registration of a new offline demo university now calls `clearLocalState()` and initializes a clean calendar config, preventing demo records from leaking into the new local institution.

### 3. Excel & CSV Spreadsheet Roster Parsing (SheetJS)
- Integrated the **SheetJS (XLSX)** library to enable administrators to directly upload standard Excel spreadsheets (`.xlsx`, `.xls`) or Comma-Separated Values (`.csv`) for bulk user uploads.
- Written a dynamic column-header mapping function (`parseExcelOrCsv`) to process rows regardless of column layout case or ordering (mapping aliases like *Name / Student Name*, *Email / Email Address*, *Student ID / roll number*).

### 4. Dynamic Pre-Populated Excel Downloads & Template Loop
- Added **📥 Template Download** links next to all upload portals.
- **Global User Directory**: Downloads pre-structured starter templates with sample rows for Faculty and Student bulk rosters.
- **Specific Course Builder Modal**:
  - If a course already has students enrolled, the **Download Template** button generates an Excel sheet pre-populated with all currently enrolled students (`Name`, `Email`, `Student ID`).
  - This allows a complete round-trip edit loop: administrators download the roster, easily add, remove, or modify rows in Excel, and upload it back to save changes dynamically!

### 5. Production Login View Refinement
- Dynamically hides the demo-only persona quick-selector cards and auto-fill labels when the sign-in modal is switched to **Firebase Live** mode, transforming it into a clean credentials portal for production users.

---

## How to Test the Changes

### 1. Hard Refresh (Required)
Since we loaded SheetJS via a script CDN and updated the stylesheets, please open **[http://localhost:3000](http://localhost:3000)** and perform a **Hard Refresh** (`Cmd + Shift + R` or `Ctrl + F5`) to make sure all cached static assets are cleared.

### 2. Testing the Excel template loop (Course builder):
1. Sign in as Admin.
2. Go to **Master Scheduling** screen and click **Edit** (pencil icon) on any course (e.g. *Data Structures* inside slot group A).
3. Under the **Course Student Roster** panel, click **Download Template**.
4. Open the downloaded Excel file. You will see it contains the current student list.
5. Add a new row in the spreadsheet (e.g. name: `Alex Mercer`, email: `alex@univ.edu`, student ID: `STU-8899`), delete a row, or edit a name. Save the file.
6. Click **Upload Student Roster** and select the saved Excel file. 
7. Verify that the updated list is parsed instantly in the UI preview list, displaying the newly added student.
8. Click **Add/Save to Master Schedule** to persist the changes.
