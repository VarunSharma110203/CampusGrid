# Product Requirements Document (PRD): CampusGrid
**Version**: 1.1 | **Author**: Varun Sharma | **Role Applied For**: Associate Product Manager

---

## 1. Problem Statement & Framing

**Background**: A mid-sized university in India (15,000 students, 500 faculty, 200 teaching spaces) relies on disjointed Google Sheets and offline WhatsApp communication to manage day-to-day room operations. While a Student Information System (SIS) handles core enrollments and grades, the operational reality of managing physical spaces — projector breakdowns, faculty absences, room swaps, exam blocks — happens entirely offline and ad-hoc.

**The Problem**: The absence of a real-time operational layer causes cascading failures. When a lab requires emergency maintenance, the facilities team communicates via WhatsApp, the admin scrambles to find a replacement room, and students arrive at the wrong location. There is no single source of truth.

**The Goal**: Build **CampusGrid** — a lightweight, real-time spatial operations platform that sits *on top of* the existing SIS (without altering it). It serves as the single source of truth for day-to-day space allocation, exception handling, and operational communications across four roles: Admin, Faculty, Facilities, and Student.

---

## 2. Clarifying Questions I Would Ask Before Building

Before locking scope, a real engagement would need answers to:

1. **Is the SIS a live API or a batch export?** This determines whether student schedule updates are real-time or next-day, which directly impacts the notification strategy.
2. **Who owns the Master Timetable today, and how often does it change?** If it changes weekly (not just per-semester), sync frequency must be higher.
3. **What is the policy when no suitable replacement room exists?** Does the admin have the authority to cancel a class, or must it escalate to the Registrar?
4. **Are faculty mobile-first users?** This determines whether to prioritize a native mobile app or a mobile-responsive web app for the faculty role.
5. **Does the university have an existing SMS or email broadcast system?** To avoid building a notification pipeline from scratch in Phase 1.5.

---

## 3. Assumptions & Constraints

- **Building Constraints**: We model 8 primary academic blocks (rather than 80 standalone buildings) to reflect typical Indian campus density — multiple departments co-located in large blocks. The 200 rooms vary by type (Lecture Hall, Seminar Room, Lab) and capacity (30 to 500+). One block is designated as a Lab Block with specialized equipment; displacing a lab class to a standard room is treated as a hard system warning.
- **SIS Integration**: The SIS is a black box that cannot be altered. CampusGrid ingests a nightly CSV export of the Master Timetable (Course IDs, Enrollment counts, Faculty assignments, Default Room allocations).
- **Peak Load Reality**: Not all 15,000 students have class simultaneously. Students average 4 out of 6 daily slots. Prime slots (10 AM–1 PM) see ~90% room utilization, making real-time reallocation the hardest operational problem.
- **Developer Bandwidth**: Limited. Automated algorithmic scheduling is deferred to V2. The MVP strictly covers operational exception handling — not timetable generation.

---

## 4. User Personas & Jobs-to-be-Done (JTBD)

### 1. The Administrator — "The Orchestrator"
- **Context**: Typically the Scheduling Officer or Registrar's office staff. Manages 200 rooms across 8 blocks daily.
- **Goal**: Ensure smooth daily operations, resolve conflicts, and maximize space utilization.
- **Pain Point**: Re-routing a class of 175 students from a broken 200-seater room during peak hours when only smaller rooms appear vacant — but a 500-seater holding 95 students could be swapped.
- **JTBD**: *"When a room becomes unusable, help me instantly identify an alternative room with adequate capacity so I can reroute the class without disrupting the schedule."*

### 2. The Faculty — "The Practitioner"
- **Context**: 500 faculty members, each teaching 2–4 slots/day. High variance in tech-comfort.
- **Goal**: Teach classes without logistical friction. Have operational requests actioned quickly.
- **Pain Point**: Deciding to take a class virtually means physically messaging the admin and separately messaging students. The room sits empty all period.
- **JTBD**: *"When I decide to take my class virtually, let me update the system with one click so students are notified and the room is released for others to use."*

### 3. Facilities Manager — "The Maintainer"
- **Context**: Manages maintenance requests across campus. Typically receives requests through WhatsApp, email, and in-person.
- **Goal**: Fix infrastructure issues efficiently without disrupting classes.
- **Pain Point**: Arriving to fix a projector only to find a 150-person lecture in progress. Work delayed by a full slot.
- **JTBD**: *"When a room requires heavy maintenance, let me request a formal block so I can schedule work without interrupting academic activities."*

### 4. The Student — "The End-User"
- **Context**: 15,000 students, primarily mobile users. Highest volume, lowest decision-making power in the system.
- **Goal**: Know exactly where to be and when without checking multiple sources.
- **Pain Point**: Walking across campus to a lab only to find a handwritten "Class Cancelled" note on the door.
- **JTBD**: *"When my schedule changes unexpectedly, notify me instantly so I don't waste time going to the wrong room."*

---

## 5. System Architecture & Data Flow

CampusGrid has a clear data hierarchy. No step operates independently:

```
SIS (Master Timetable — read-only black box)
   │
   │  nightly CSV / API sync
   ▼
CampusGrid: Master Schedule Builder
   │
   │  Admin reviews and publishes
   ▼
Daily Cockpit Grid  ◄──── Single Source of Truth
   │                │                   │
   │                │                   │
Faculty Actions  Admin Actions    Facilities Actions
(Mark Virtual /  (Bulk Block /    (Report Issue →
 Cancel Class)    Room Swap /      Request Block →
   │              Approve Req.)    Admin Approves)
   │                │                   │
   └────────────────┴───────────────────┘
                    │
             Student Timeline
          (real-time, read-only)
                    │
           Push Notification Layer
         (Phase 1.5 — SMS / Browser)
```

**The "Release & Reclaim" Loop** is the system's highest-ROI workflow. When Faculty A marks a class virtual, Room 101 is instantly surfaced as available in the Admin Cockpit. Admin assigns Room 101 to a displaced class, and Student B's timeline updates automatically. Zero WhatsApp threads required.

---

## 6. Prioritization & MVP Scope

Priorities are weighted by **frequency of occurrence × severity of disruption if unresolved**. Items that happen every single day and directly impact students reaching the right room are Must-Have. Infrastructure features (push delivery pipelines, biometric devices) are deferred because the system delivers value even through passive awareness (students checking the app), and adding that infrastructure adds cost without being a blocker for day-1 utility.

### ✅ Must-Have (MVP — Phase 1)
| # | Feature | Rationale |
|---|---|---|
| 1 | **Master → Daily Sync** | Without this, nothing else works. Baseline data must populate the cockpit. |
| 2 | **Faculty Status Toggles** (Virtual / Cancel) | Highest-frequency event. Happens every day. Directly frees physical rooms. |
| 3 | **Manual Room Reallocation (Admin)** | Core admin job. Capacity mismatch warnings prevent new conflicts during swaps. |
| 4 | **Maintenance Block Requests (Facilities → Admin Approval)** | Formalizes what currently happens over WhatsApp. Prevents facilities teams from showing up mid-lecture. |
| 5 | **Bulk Exam Blocking** | Indian academic calendars have defined, high-volume exam periods. Cannot wait for Phase 2 — this is a recurring, campus-wide operational event (minimum twice yearly). |
| 6 | **Student Timeline Viewer** | Highest user count (15,000). Even without push notifications, a real-time web view eliminates the "wrong room" problem for self-checking students. |

### ⚡ Should-Have (Phase 1.5)
1. **Push Notifications** — Real-time browser/SMS alerts when a room changes within 1 hour of class start. Deferred because it requires integration with an SMS gateway (cost) and device token infrastructure (complexity). The Student Timeline already provides passive awareness in MVP.

### 🔮 Could-Have (Phase 2+)
- **Dynamic Biometric Attendance Integration**: CampusGrid already knows which class occupies which room at which time. A generic biometric scanner outside any room can query this API to determine the active class — eliminating the need for scanners to be statically hardcoded to a specific class schedule. A room change in CampusGrid automatically re-routes attendance logging.
- **Algorithmic Auto-Scheduling**: Automatically generating the timetable from scratch. High complexity; requires solving a constraint satisfaction problem across 500 faculty, 200 rooms, and 15,000 students. Deferred to V2.
- **IoT Occupancy Sensing**: Motion/thermal sensors to detect actual room occupancy vs. scheduled occupancy — useful for catching ghost bookings.

---

## 7. Edge Cases & Risk Scenarios

| Scenario | Risk | Resolution |
|---|---|---|
| **Capacity Cascade** | 200-seater fails at peak hour; no direct replacement available | Admin Cockpit shows real enrollment vs. capacity. Admin can cascade-swap: move a 95-person class from a 500-seater to a 100-seater, freeing the 500-seater for the displaced 175-person class. System enforces capacity warnings at each step. |
| **Lab Constraint** | Chemistry Lab class displaced; only standard lecture halls available | Rooms tagged with type metadata (`Lecture`, `Seminar`, `Lab`). System issues a hard warning when an admin attempts to assign a lab-tagged course to a non-lab room. Admin must explicitly override with a reason logged in the audit trail. |
| **Holiday / Weekend Logic** | Master Schedule generates classes on a public holiday | Global calendar config (managed by Admin) lists declared off-days and Indian national holidays. Daily grid generation skips these dates automatically. |
| **Concurrent Admin Conflict** | Two admins simultaneously assign the same available room to different classes | Room is marked "claimed" the moment Admin A begins the assignment flow. Admin B sees the room as "pending assignment" and cannot select it. Prevents double-booking at the UI layer. |
| **Accessibility Conflict** | A room swap sends a student with mobility restrictions to a 4th-floor room with no lift | Rooms carry accessibility metadata (lift access, step-free entry). System warns the admin if a proposed swap moves a class with registered accessibility needs to an inaccessible room. |

---

## 8. Success Metrics

| Metric | Baseline (Current) | Target (Post-MVP, Semester 1) |
|---|---|---|
| **Ghost Room Rate** | Unknown (no tracking exists) | 20% reduction in unused booked rooms, tracked via "rooms released/day" in admin logs |
| **Time-to-Resolution** | ~6 hours average (WhatsApp-based workflow) | Under 30 minutes from Facilities block request to Admin rerouting affected classes |
| **Student Misdirection Rate** | Unknown (anecdotal complaints to Registrar) | Zero students arriving at an incorrect room 30+ minutes after a confirmed schedule change (enabled by Phase 1.5 push notifications) |
| **Admin Swap Volume** | 0 (no system exists) | Track month-over-month to identify peak conflict windows and prioritize V2 automation |

---

## 9. What CampusGrid Is NOT

- It does not replace the SIS. Enrollments, grades, and degree planning remain in the SIS.
- It does not generate timetables from scratch. It receives a timetable and manages its operational execution.
- It is not a room booking system for ad-hoc student study sessions. Scope is strictly teaching spaces.
