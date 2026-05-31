# CampusGrid: APM Interview Discussion Guide & Prep Kit
**Candidate**: Varun Sharma | **Interviewer**: Nishit Khanna (Senior PM, Peoplebox)
**Role**: Associate Product Manager (APM) | **Date**: Monday, May 25, 2026

---

## Hello Varun! 👋

First, **breathe. You are in an incredibly strong position.** 
Most APM candidates submit text-only Google Docs or simple mockups. You have:
1. A **highly detailed, 150-line PRD** ([CampusGrid_PRD.md](file:///Users/varunsharma/Documents/Codex/2026-05-23/you-are-a-senior-product-designer/CampusGrid_PRD.md)) covering personas, JTBDs, data architecture, edge cases, and metrics.
2. A **fully interactive, functional, multi-persona prototype** in Vanilla JS with a live product tour, real-time reactive scheduling state, conflict detection, and individual views for all 4 roles.

This guide is designed to help you connect the dots, understand the code you have, and align your talking points with **Peoplebox's product philosophy** so you can ace your discussion with Nishit.

---

## Part 1: The Peoplebox Mindset & Product Alignment

Peoplebox is an **AI-native talent management and OKR platform**. Their entire business is built on:
- **Alignment**: Aligning individuals (faculty/students) with organization goals (academic execution).
- **Replacing Manual Workflows**: Moving teams away from static Google Sheets/spreadsheets into dynamic, automated, real-time dashboards.
- **Continuous Feedback & Loops**: Making sure updates from one team (facilities reporting a broken room) immediately notify and unblock other teams (admin/students).

**How to frame CampusGrid to Nishit**:
> *"Just like Peoplebox takes companies out of disjointed Google Sheets and weekly status updates into a live, real-time performance cockpit, CampusGrid takes university room management out of WhatsApp groups and messy Excel sheets and puts it into a real-time operational cockpit where faculty, admins, facilities, and students are instantly aligned."*

---

## Part 2: Your Core Narrative (The 2-Minute Pitch)

When Nishit asks, *"Tell me about this project and why you built it,"* use this structured pitch:

1. **The Core Hook**: *"CampusGrid is a real-time operational cockpit for managing daily class schedules and lecture halls at a mid-sized Indian university. It doesn't replace the Student Information System (SIS); instead, it sits on top of it to manage daily operational friction."*
2. **The Problem**: *"Indian universities have extremely high space utilization (~90% at peak slots) and high operational volatility—faculty sudden absences, projector failures, emergency maintenance. Today, this is managed via chaotic WhatsApp messages and paper notices, leading to empty classrooms while classes are cancelled, or students walking across campus only to find a locked door."*
3. **The Solution (The "Release & Reclaim" Loop)**: *"I designed a multi-role system where an action by one user instantly frees resources for another. For example, if a Faculty member toggles a class to 'Virtual' on their mobile dashboard, the physical room is instantly marked vacant in the Admin's grid, allowing them to reallocate it to a class displaced by maintenance. Students see their schedule update dynamically on their timeline."*

---

## Part 3: Deconstructing Your Design & Tradeoffs (Product Sense)

Nishit will test your prioritization and product sense. Here are the core decisions you made and how to justify them:

### 1. Daily Cockpit vs. Algorithmic Auto-Scheduler
* **The Question**: *"Why didn't you build an automated timetabling algorithm that creates the schedule?"*
* **Your Answer**: 
  - **Constraints/Bandwidth**: An automated timetabling solver (resolving constraints for 500 faculty, 200 rooms, and 15,000 students) is a highly complex computational problem (NP-hard) that would take months.
  - **The Operational Reality**: The primary pain point isn't creating the semester timetable (which happens once a semester); it's *handling daily exceptions* (projector broke in Block C, Prof. Sharma is sick). CampusGrid is designed to be the daily execution layer, not the planner.

### 2. Physical Layout: 8 Academic Blocks vs. 80 Buildings
* **The Question**: *"Why did you model the campus as 8 large blocks instead of 80 smaller buildings?"*
* **Your Answer**: 
  - **Indian Context & Density**: Indian campuses (like IITs, BITS, or private universities) are characterized by dense, multi-department academic blocks (e.g., 'C-Block', 'D-Block') holding dozens of classrooms rather than dozens of tiny standalone buildings. This reduces search friction for admins and matches real-world spatial density.

### 3. Feature Prioritization: Bulk Exam Blocking in MVP
* **The Question**: *"Why did you include 'Bulk Exam Blocking' in the MVP instead of pushing it to Phase 2?"*
* **Your Answer**: 
  - In Indian higher education, mid-terms and finals completely hijack normal operations twice a semester. If the system couldn't easily block out rooms for exams and temporarily displace/restore regular classes in bulk, admins would revert to Excel sheets immediately, killing user adoption.

---

## Part 4: Code & Architecture Overview (Technical Sense)

Nishit might ask how your prototype is structured. 

- **Single Page Architecture**: The prototype is built entirely with semantic HTML5, clean vanilla CSS, and single-state vanilla JS. This makes it lightning fast, dependency-free, and easy to run locally by opening `index.html`.
- **State Management**: It maintains a global in-memory state object representing:
  - `masterSchedule`: The baseline semester patterns.
  - `dailyGrid`: The actual live matrix of `Date` x `Room` x `Slot`.
  - `facilitiesIssues`: The Kanban list of room issues.
  - `activeRole`: Admin, Faculty, Facilities, or Student.
- **Reactivity**: The UI is re-rendered dynamically whenever the state changes. For instance, when a faculty member clicks "Mark Virtual" in `renderFacultyHome()`, it updates `dailyGrid` and immediately triggers `renderScheduleGrid()` and `renderStudentHome()`, making the update visible across all roles.

---

## Part 5: Mock Interview Q&A (Prepare to Win)

Here are the top 5 questions Nishit is most likely to ask and how you should answer them:

### Q1: "How would you define and measure the success of CampusGrid?"
* **Framework**: AARRR or Goals-Signal-Metric.
* **Your Answer**:
  - *"Our primary goal is operational efficiency and reducing space wastage. I would track three core metrics:"*
  1. **Ghost Room Rate (Efficiency)**: % of rooms that were booked but remained empty. (Goal: decrease by 20% by using the Faculty "Release & Reclaim" toggle).
  2. **Time-to-Resolution (Operations)**: Average time elapsed from when a room issue is reported by Facilities to when the Admin reallocates the displaced class. (Goal: under 30 minutes, down from 6 hours).
  3. **Student Sentiment/Confusion Rate**: Surveying students on how often they arrived at the wrong room. (Goal: reduce to near zero).

### Q2: "What is the biggest operational risk of this product, and how did you design around it?"
* **Your Answer**:
  - **Risk**: *Admin double-bookings* or *Capacity mismatches* during emergency swaps (e.g., swapping a 120-student lecture into a 60-seat room).
  - **Design Solution**: 
    1. Built **active enrollment capacity checks** into the swap room selector. The UI shows a warning if the target room has a lower capacity than the course's active enrollment.
    2. Built **accessibility checking**: If a class has students with mobility restrictions, the system flags a warning if the admin attempts to assign it to an upper-floor room lacking lift access.

### Q3: "The SIS is a read-only black box. How does CampusGrid sync with it?"
* **Your Answer**:
  - *"In our MVP, we utilize a nightly CSV upload from the SIS. Every night at 2:00 AM, the SIS exports the student course-enrollment matrix, faculty registers, and room baseline. CampusGrid ingests this to populate the Master Timetable Builder. Any adjustments made in CampusGrid during the day are operational overrides and do not push back to the SIS, ensuring the SIS remains the secure, immutable system of record."*

### Q4: "If you had 2 more weeks and 1 developer, what is the next feature you would prioritize?"
* **Your Answer**:
  - *"I would build the **Push Notification & Alert Trigger System** (what we scoped as Phase 1.5). Currently, students and faculty must open the app to see room changes. If a room change happens within 1 hour of the slot, we need to push an SMS or WhatsApp notification (vital for the Indian market where mobile web data can be spotty, but WhatsApp is ubiquitous). This closes the loop and guarantees zero student misdirection."*

### Q5: "How would you roll this out to a university that is resistant to change?"
* **Your Answer**:
  - **Empathy-driven Rollout**: *"I wouldn't force a campus-wide change overnight. I would run a pilot with **one academic block** (e.g., Block A) and **two departments** (e.g., Computer Science and Mechanical Engineering) for 2 weeks. This allows us to train a small group of admins and faculty, fix local bugs, demonstrate a drop in 'Ghost Rooms', and use their success story to drive adoption across the rest of the campus."*

---

## Part 6: How to Run a Flawless Live Demo

If Nishit asks you to showcase the prototype, follow this script to show the **Wow Moments**:

1. **Step 1: The Onboarding (Product Tour)**
   - Open the app. The **Guided Tour** will appear automatically (or click the 'Tour' button). Explain that you built this to ensure high adoption for low-tech faculty and busy admins.
2. **Step 2: The Faculty Toggle (Release)**
   - Switch to the **Faculty view** (simulate being "Prof. Rajesh Kumar"). 
   - Click **"Mark Virtual"** on a morning slot class. 
   - Show the toast message: *"Class marked virtual. Physical room released!"*
3. **Step 3: The Admin Swap (Reclaim)**
   - Switch to the **Admin view**. 
   - Show that the physical room (e.g., Room 102) now has a green badge or is marked **Vacant (Released)**.
   - Click on an unassigned class from the queue and assign it to Room 102. Show that there are no capacity warnings because the size matches.
4. **Step 4: The Student View (Real-time update)**
   - Switch to the **Student view** for a student enrolled in that class.
   - Show that their timeline has automatically updated to the new room, with a visual highlight indicating a change.

---

## Final Tip: You've Got This! 🚀

Go in with confidence. You have a real product that solves a real operational problem, designed with empathy and built with functional code. Nishit is going to be impressed by your execution, structure, and clarity.

*Good luck tomorrow!*
