/* CampusGrid - Campus Room Management Application Controller */

// ============================================================================
// PRODUCT TOUR ENGINE
// ============================================================================

const tourSteps = {
  admin: [
    {
      target: ".brand",
      title: "Welcome to CampusGrid 👋",
      desc: "This is your university's real-time room operations platform — replacing Google Sheets with a live cockpit for 8 buildings, 200 teaching spaces, 500 faculty, and 15,000 students.",
      position: "right"
    },
    {
      target: "#primaryNav",
      title: "Role-Based Navigation",
      desc: "As an Admin, you see every module. Other roles (Faculty, Facilities, Students) only see what's relevant to them. Use 'Switch Role' at the bottom to demo each perspective.",
      position: "right"
    },
    {
      target: "#schedule",
      title: "The Daily Cockpit — Your Command Centre",
      desc: "This is the heart of CampusGrid. Every room, every slot, every day. Green = booked, amber = virtual/pending, red = blocked, grey = available. Click any cell to manage it.",
      position: "bottom",
      screen: "schedule"
    },
    {
      target: ".unassigned-panel",
      title: "Unassigned Queue",
      desc: "When a room is blocked or swapped, the displaced class lands here. These are classes that need a new home — click any card to reassign it to an available room.",
      position: "left",
      screen: "schedule"
    },
    {
      target: "#requests",
      title: "Requests & Approvals",
      desc: "Faculty and Facilities submit requests here. You review the proposed room, check for conflicts and accessibility needs, then approve or reject. All in one place.",
      position: "bottom",
      screen: "requests"
    },
    {
      target: "#exams",
      title: "Bulk Exam Blocking",
      desc: "Select multiple rooms, multiple slots, and a date range. The system suspends all displaced classes (not deletes them) and restores them in one click when the exam period ends.",
      position: "bottom",
      screen: "exams"
    },
    {
      target: "#master-schedule",
      title: "Master Schedule Builder",
      desc: "Define your semester-wide course patterns here — which faculty teaches which course, in which room, on which days. This is the source of truth that populates the daily cockpit.",
      position: "bottom",
      screen: "master-schedule"
    },
    {
      target: "#settings",
      title: "Settings & Calendar Config",
      desc: "Configure term dates, mark holidays (Diwali, Republic Day etc.), set weekly off-days. CampusGrid will never schedule a class or generate a grid row for a declared holiday.",
      position: "bottom",
      screen: "settings"
    }
  ],
  faculty: [
    {
      target: ".brand",
      title: "Welcome to CampusGrid — Faculty View 👋",
      desc: "As a faculty member, you see only what's relevant to you: your teaching schedule, room information, and tools to manage your own classes.",
      position: "right"
    },
    {
      target: "#faculty",
      title: "Your Teaching Timeline",
      desc: "This shows all classes assigned to you for today. See your room, slot, and student count at a glance. If anything changes, it updates here in real-time.",
      position: "bottom",
      screen: "faculty"
    },
    {
      target: "#faculty",
      title: "Mark Virtual or Cancel a Class",
      desc: "Need to take a class on Zoom? Click 'Manage Class' on any slot and choose 'Mark Virtual'. The physical room is instantly released back to the Admin pool — no WhatsApp needed.",
      position: "bottom",
      screen: "faculty"
    },
    {
      target: "#requests",
      title: "Request a Room or Event Block",
      desc: "Planning a seminar or guest lecture? Submit a room request here. The Admin reviews it, assigns the room, and you get notified when it's confirmed.",
      position: "bottom",
      screen: "requests"
    }
  ],
  facilities: [
    {
      target: ".brand",
      title: "Welcome to CampusGrid — Facilities View 🔧",
      desc: "As a Facilities Manager, you handle all infrastructure issues across campus — from broken projectors to AV failures — and coordinate room blocks with the Admin.",
      position: "right"
    },
    {
      target: "#issues",
      title: "Issue Inbox — Kanban Board",
      desc: "Issues flow through four stages: Reported → Validated → Block Requested → Resolved. Click any issue card to see details and take action.",
      position: "bottom",
      screen: "issues"
    },
    {
      target: "#issues",
      title: "Validate & Request a Block",
      desc: "When you validate an issue that needs downtime, submit a block request. The Admin reviews it and approves the room block so you can work without interrupting a live lecture.",
      position: "bottom",
      screen: "issues"
    }
  ],
  student: [
    {
      target: ".brand",
      title: "Welcome to CampusGrid — Student View 📚",
      desc: "Your one-stop view for today's classes. No more checking notice boards or WhatsApp groups. If anything changes, CampusGrid updates your schedule instantly.",
      position: "right"
    },
    {
      target: "#student",
      title: "Today's Timeline",
      desc: "See all your classes for today with room numbers, faculty names, and times. If a room changes or a class goes virtual, the update appears here in real-time.",
      position: "bottom",
      screen: "student"
    },
    {
      target: "#student",
      title: "Holidays & Weekends",
      desc: "CampusGrid respects the academic calendar. On weekends or declared holidays, your timeline automatically switches to a 'No Classes Today' view — no confusion.",
      position: "bottom",
      screen: "student"
    },
    {
      target: "#directory",
      title: "My University — Quick Links",
      desc: "Find the library hours, medical centre location, sports facilities, and administrative offices in one place. Static amenities that don't change live here.",
      position: "bottom",
      screen: "directory"
    }
  ]
};

let tourCurrentStep = 0;
let tourStepList = [];

window.startTour = function() {
  var role = state.currentRole;
  tourStepList = tourSteps[role] || tourSteps.admin;
  tourCurrentStep = 0;
  document.getElementById('tourOverlay').style.display = 'block';
  renderTourStep();
};

window.endTour = function() {
  document.getElementById('tourOverlay').style.display = 'none';
  var sp = document.getElementById('tourSpotlight');
  if (sp) sp.style.opacity = '0';
};

window.tourNext = function() {
  if (tourCurrentStep < tourStepList.length - 1) {
    tourCurrentStep++;
    renderTourStep();
  } else {
    endTour();
  }
};

window.tourPrev = function() {
  if (tourCurrentStep > 0) {
    tourCurrentStep--;
    renderTourStep();
  }
};

function renderTourStep() {
  var step = tourStepList[tourCurrentStep];
  var total = tourStepList.length;

  if (step.screen) showScreen(step.screen);

  document.getElementById('tourStepBadge').textContent = 'STEP ' + (tourCurrentStep + 1) + ' / ' + total;
  document.getElementById('tourTitle').textContent = step.title;
  document.getElementById('tourDesc').textContent = step.desc;

  var prevBtn = document.getElementById('tourPrev');
  prevBtn.style.opacity = tourCurrentStep === 0 ? '0.3' : '1';
  prevBtn.style.pointerEvents = tourCurrentStep === 0 ? 'none' : 'all';
  document.getElementById('tourNext').textContent = tourCurrentStep === total - 1 ? 'Finish ✓' : 'Next →';

  document.getElementById('tourDots').innerHTML = tourStepList.map(function(_, i) {
    var bg = i === tourCurrentStep ? '#6366f1' : '#e2e8f0';
    return '<div style="width:7px;height:7px;border-radius:50%;background:' + bg + ';transition:background 0.2s;"></div>';
  }).join('');

  setTimeout(function() {
    var target = document.querySelector(step.target);
    var spotlight = document.getElementById('tourSpotlight');
    var card = document.getElementById('tourCard');
    if (!target || !spotlight || !card) return;

    var rect = target.getBoundingClientRect();
    var pad = 8;
    spotlight.style.opacity = '1';
    spotlight.style.left = (rect.left - pad) + 'px';
    spotlight.style.top = (rect.top - pad) + 'px';
    spotlight.style.width = (rect.width + pad * 2) + 'px';
    spotlight.style.height = (rect.height + pad * 2) + 'px';

    var cW = 320, cH = 230, mg = 18;
    var vH = window.innerHeight, vW = window.innerWidth;
    var cTop, cLeft;

    if (step.position === 'right') {
      cTop = rect.top + rect.height / 2 - cH / 2;
      cLeft = rect.right + mg;
    } else if (step.position === 'left') {
      cTop = rect.top + rect.height / 2 - cH / 2;
      cLeft = rect.left - cW - mg;
    } else if (step.position === 'bottom') {
      cTop = rect.bottom + mg;
      cLeft = rect.left + rect.width / 2 - cW / 2;
    } else {
      cTop = rect.top - cH - mg;
      cLeft = rect.left + rect.width / 2 - cW / 2;
    }

    cLeft = Math.max(12, Math.min(cLeft, vW - cW - 12));
    cTop  = Math.max(12, Math.min(cTop,  vH - cH - 12));
    card.style.left = cLeft + 'px';
    card.style.top  = cTop  + 'px';
  }, 150);
}


// Global State
const state = {
  currentDate: "2026-05-26", // Default system date — Monday
  currentRole: "admin",      // Active RBAC role
  selectedCell: null,        // Selected grid cell coordinates
  modalStep: 1,              // Wizard step pointer
  selectedRequestId: null,   // Selected request in approvals queue
  selectedUnassignedId: null,// Selected unassigned class
  selectedIssueId: "ISS-01",  // Active facilities issue card
  
  // Suspended classes during an Exam Period block
  // { [date]: [{ title, faculty, count, courseId, requirements, originalRoom, originalSlot }] }
  suspendedClasses: {},
  
  // Dynamic Notifications List
  notifications: [
    { id: 1, message: "Welcome to CampusGrid. All systems operational.", time: "8:00 AM" },
    { id: 2, message: "D-LAB-2 optics bench validation pending review.", time: "8:45 AM" }
  ],
  
  // Campus Blocks & Rooms
  buildings: [
    {
      code: "A",
      name: "Main Academic Block",
      rooms: [
        { id: "A-101", type: "Lecture", capacity: 120, amenities: "Projector, Accessible", accessible: true },
        { id: "A-102", type: "Lecture", capacity: 80, amenities: "Projector", accessible: false }
      ]
    },
    {
      code: "B",
      name: "Seminar Block",
      rooms: [
        { id: "B-101", type: "Seminar", capacity: 60, amenities: "Projector", accessible: false },
        { id: "B-102", type: "Seminar", capacity: 60, amenities: "Mic, Accessible", accessible: true }
      ]
    },
    {
      code: "C",
      name: "Lecture Block",
      rooms: [
        { id: "C-201", type: "Lecture", capacity: 200, amenities: "Projector, Accessible", accessible: true },
        { id: "C-202", type: "Lecture", capacity: 175, amenities: "Projector", accessible: false }
      ]
    },
    {
      code: "D",
      name: "Lab Block",
      rooms: [
        { id: "D-LAB-2", type: "Lab", capacity: 36, amenities: "Optics bench, dark room", accessible: false },
        { id: "D-LAB-5", type: "Lab", capacity: 30, amenities: "Computing pods, oscilloscope", accessible: false }
      ]
    },
    {
      code: "E",
      name: "Management Block",
      rooms: [
        { id: "E-101", type: "Lecture", capacity: 90, amenities: "Projector", accessible: true },
        { id: "E-201", type: "Seminar", capacity: 50, amenities: "Whiteboard", accessible: false }
      ]
    },
    {
      code: "F",
      name: "Auditorium Block",
      rooms: [
        { id: "F-AUD-01", type: "Auditorium", capacity: 2000, amenities: "Stage, mic, projector", accessible: true },
        { id: "F-MINI-02", type: "Auditorium", capacity: 320, amenities: "Mic, Accessible", accessible: true }
      ]
    },
    {
      code: "G",
      name: "Humanities Block",
      rooms: [
        { id: "G-101", type: "Lecture", capacity: 80, amenities: "Projector", accessible: false },
        { id: "G-102", type: "Tutorial", capacity: 40, amenities: "Whiteboard", accessible: false }
      ]
    },
    {
      code: "H",
      name: "Admin & Services",
      rooms: [
        { id: "H-101", type: "Seminar", capacity: 50, amenities: "Projector", accessible: true },
        { id: "H-102", type: "Seminar", capacity: 50, amenities: "Whiteboard", accessible: false }
      ]
    }
  ],

  // Isolated Schedule and Unassigned Data by Date
  unassignedClasses: {
    "2026-05-26": [
      { title: "Linear Algebra", faculty: "Prof. Suresh Iyer", count: 120, courseId: "MA201", originalSlot: 1 },
      { title: "Cognitive Psych", faculty: "Prof. Devika Menon", count: 48, courseId: "PSY210", originalSlot: 2 },
      { title: "Corporate Finance", faculty: "Dr. Aditi Sharma", count: 60, courseId: "FIN301", originalSlot: 3 }
    ],
    "2026-05-24": []
  },
  
  cellData: {
    "2026-05-26": {
      "C-201-2": {
        status: "booked",
        title: "CS101 Data Structures",
        faculty: "Dr. Ananya Mehta",
        count: 175,
        courseId: "CS101",
        requirements: "Lecture, capacity 175+, projector, accessible",
        accessibilityRequired: true,
        audit: "SIS imported at 6:00 AM today."
      },
      "D-LAB-2-1": {
        status: "booked",
        title: "PHY Lab - Optics",
        faculty: "Prof. Suresh Iyer",
        count: 30,
        courseId: "PHY204-L",
        requirements: "Lab, optics bench, dark room",
        audit: "SIS imported at 6:00 AM today."
      },
      "F-AUD-01-5": {
        status: "booked",
        title: "Guest Talk: Product in India",
        faculty: "Prof. Rao",
        count: 95,
        courseId: "EVENT-238",
        requirements: "Auditorium, mic + projector, attendee estimate 95",
        audit: "Admin approved yesterday at 4:15 PM."
      },
      "A-101-1": {
        status: "booked",
        title: "Linear Algebra",
        faculty: "Prof. Suresh Iyer",
        count: 75,
        courseId: "MA201",
        requirements: "Lecture, projector",
        audit: "SIS imported at 6:00 AM today."
      },
      "A-102-1": {
        status: "booked",
        title: "English Composition",
        faculty: "Prof. Meera Joshi",
        count: 60,
        courseId: "EN101",
        requirements: "Lecture, projector",
        audit: "SIS imported at 6:00 AM today."
      },
      "C-202-2": {
        status: "booked",
        title: "Calculus II",
        faculty: "Prof. Suresh Iyer",
        count: 110,
        courseId: "MA202",
        requirements: "Lecture, projector",
        audit: "SIS imported at 6:00 AM today."
      },
      "G-102-3": {
        status: "booked",
        title: "Tutorial: Probability",
        faculty: "Prof. R. Subramanian",
        count: 35,
        courseId: "MA-T",
        requirements: "Tutorial, whiteboard",
        audit: "SIS imported at 6:00 AM today."
      },
      "B-102-5": {
        status: "booked",
        title: "Negotiations",
        faculty: "Prof. Anita Rao",
        count: 50,
        courseId: "MGT401",
        requirements: "Seminar, mic",
        audit: "SIS imported at 6:00 AM today."
      },
      "E-201-4": {
        status: "booked",
        title: "Game Theory",
        faculty: "Prof. Hari Krishnan",
        count: 40,
        courseId: "ECO302",
        requirements: "Seminar, whiteboard",
        audit: "SIS imported at 6:00 AM today."
      },
      "B-101-2": {
        status: "booked",
        title: "Cognitive Psych",
        faculty: "Prof. Devika Menon",
        count: 48,
        courseId: "PSY210",
        requirements: "Seminar, projector",
        audit: "SIS imported at 6:00 AM today."
      }
    },
    "2026-05-24": {
      "C-201-3": {
        status: "booked",
        title: "CS102 Data Structures II",
        faculty: "Dr. Ananya Mehta",
        count: 175,
        courseId: "CS102",
        requirements: "Lecture, capacity 175+, projector, accessible",
        audit: "SIS imported for tomorrow."
      },
      "A-101-2": {
        status: "booked",
        title: "Algebra Basics",
        faculty: "Prof. Suresh Iyer",
        count: 80,
        courseId: "MA101",
        requirements: "Lecture, projector",
        audit: "SIS imported for tomorrow."
      },
      "D-LAB-2-4": {
        status: "booked",
        title: "Optics Experiments",
        faculty: "Prof. Suresh Iyer",
        count: 30,
        courseId: "PHY204-L",
        requirements: "Lab, optics bench",
        audit: "SIS imported for tomorrow."
      }
    }
  },

  // Approvals Requests Queue
  approvalRequests: [
    {
      id: "REQ-BOOK-01",
      type: "Booking",
      title: "MBA Strategy Seminar",
      faculty: "Dr. N. Shah",
      count: 72,
      date: "2026-05-26",
      slots: [4],
      requirements: "Seminar room, whiteboard, 70+ capacity",
      status: "Requested"
    }
  ],

  // Facilities Maintenance Issues
  issues: [
    {
      id: "ISS-01",
      room: "C-201",
      description: "Projector flicker reported in Lecture C-201",
      reportedBy: "Dr. Ananya Mehta",
      date: "2026-05-26",
      status: "Requested"
    }
  ],

  // Academic Calendar Config
  calendarConfig: {
    termStart: "2026-05-01",
    termEnd: "2026-12-15",
    offDays: [0, 6], // 0 = Sunday, 6 = Saturday
    events: [
      { date: "2026-05-01", type: "holiday", name: "Labor Day" },
      { date: "2026-05-25", type: "holiday", name: "Memorial Day" },
      { date: "2026-05-18", type: "exam", name: "Midterm Exams Start" },
      { date: "2026-05-19", type: "exam", name: "Midterm Exams" },
      { date: "2026-05-20", type: "exam", name: "Midterm Exams" },
      { date: "2026-05-21", type: "exam", name: "Midterm Exams" },
      { date: "2026-05-22", type: "exam", name: "Midterm Exams End" }
    ]
  }
};

// Slots definition
const slotTimes = [
  { name: "SLOT 1", time: "9-10" },
  { name: "SLOT 2", time: "10-11" },
  { name: "SLOT 3", time: "11-12" },
  { name: "SLOT 4", time: "1-2" },
  { name: "SLOT 5", time: "2-3" },
  { name: "SLOT 6", time: "3-4" }
];

// Helper Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
}

function formatDate(dateStr) {
  const parts = dateStr.split("-");
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function addSystemNotification(message) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  state.notifications.unshift({ id: Date.now(), message, time });
  renderBellNotifications();
}

// Render Bell Icon Notifications
function renderBellNotifications() {
  const list = $("#bellNotificationsList");
  const badge = $("#bellBadge");
  
  if (state.notifications.length > 0) {
    badge.textContent = state.notifications.length;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
  
  list.innerHTML = state.notifications.map(notif => `
    <div class="bell-item">
      <div>${notif.message}</div>
      <span class="time">${notif.time}</span>
    </div>
  `).join("");
}

// Flat list of rooms
function getFlatRooms() {
  return state.buildings.flatMap(building =>
    building.rooms.map(room => ({
      ...room,
      buildingCode: building.code,
      buildingName: building.name
    }))
  );
}

// Check if a room is occupied for specific slots on a date
function checkRoomOccupancy(roomId, slots, date) {
  const daySchedule = state.cellData[date] || {};
  for (let slot of slots) {
    const key = `${roomId}-${slot}`;
    if (daySchedule[key]) {
      return daySchedule[key];
    }
  }
  return null;
}

// Render Schedule Grid
function renderScheduleGrid() {
  const grid = $("#scheduleGrid");
  if (!grid) return;

  const jsDay = new Date(state.currentDate).getDay();
  const isWeekend = state.calendarConfig.offDays.includes(jsDay);
  const holidayEvent = state.calendarConfig.events.find(e => e.date === state.currentDate && e.type === "holiday");
  const isHoliday = !!holidayEvent;

  if ((isHoliday || isWeekend) && !state.forceGridRender) {
    const title = isHoliday ? holidayEvent.name : "Scheduled Off-Day";
    const subtitle = isHoliday ? "Standard classes are suspended. Campus operations are minimal." : "Standard classes are suspended on weekends. Only ad-hoc bookings appear here.";
    const icon = isHoliday ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14h.01M12 7v5"></path>` : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>`;
    
    grid.style.display = "block"; // override grid layout for empty state
    grid.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; text-align: center; background: white; border: 1px solid var(--line); border-radius: var(--radius); margin-top: 16px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" style="margin-bottom: 16px;">
          ${icon}
        </svg>
        <h2 style="font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 8px;">${title}</h2>
        <p style="color: var(--text-muted); font-size: 14px; max-width: 400px; margin-bottom: 24px;">${subtitle}</p>
        <button class="btn" onclick="state.forceGridRender = true; renderScheduleGrid();" style="background: transparent; border: 1px solid var(--line-strong);">View Empty Grid</button>
      </div>
    `;
    
    // Reset stats to 0 since nothing is shown
    if ($("#vacantStat")) $("#vacantStat").textContent = "0";
    if ($("#bookedStat")) $("#bookedStat").textContent = "0";
    if ($("#blockedStat")) $("#blockedStat").textContent = "0";
    if ($("#pendingStat")) $("#pendingStat").textContent = "0";
    
    return;
  }
  
  // Restore grid display in case it was overridden by empty state
  grid.style.display = "grid";

  const selectedBuilding = $("#buildingFilter")?.value || "All buildings";
  const selectedType = $("#typeFilter")?.value || "All types";
  const minCapacity = Number($("#capacityFilter")?.value || 0);
  const selectedAmenity = $("#amenityFilter")?.value || "All amenities";
  const searchVal = $("#searchInput")?.value.toLowerCase() || "";

  // Grid Headers
  let html = `
    <div class="grid-header">ROOM</div>
    ${slotTimes.map(s => `<div class="grid-header"><strong>${s.name}</strong><br><small>${s.time}</small></div>`).join("")}
  `;

  // Dynamic status counters
  let vacantCount = 0;
  let bookedCount = 0;
  let blockedCount = 0;
  let pendingCount = 0;

  const daySchedule = state.cellData[state.currentDate] || {};

  state.buildings.forEach(building => {
    // Filter rooms inside this building
    const filteredRooms = building.rooms.filter(room => {
      if (selectedBuilding !== "All buildings" && building.code !== selectedBuilding) return false;
      if (selectedType !== "All types" && room.type !== selectedType) return false;
      if (room.capacity < minCapacity) return false;
      if (selectedAmenity !== "All amenities" && !room.amenities.includes(selectedAmenity)) return false;
      
      // Text search match
      if (searchVal) {
        const matchesRoom = room.id.toLowerCase().includes(searchVal);
        const matchesType = room.type.toLowerCase().includes(searchVal);
        
        let matchesClass = false;
        for (let slot = 1; slot <= 6; slot++) {
          const key = `${room.id}-${slot}`;
          const cell = daySchedule[key];
          if (cell && (
            cell.title?.toLowerCase().includes(searchVal) ||
            cell.faculty?.toLowerCase().includes(searchVal) ||
            cell.courseId?.toLowerCase().includes(searchVal)
          )) {
            matchesClass = true;
            break;
          }
        }
        return matchesRoom || matchesType || matchesClass;
      }
      return true;
    });

    if (filteredRooms.length === 0) return;

    // Building Group Header Row
    html += `
      <div class="grid-building-header">
        <span>BLOCK ${building.code} &mdash; ${building.name}</span>
        <span>${filteredRooms.length} room${filteredRooms.length === 1 ? "" : "s"}</span>
      </div>
    `;

    // Room rows
    filteredRooms.forEach(room => {
      html += `
        <div class="room-cell">
          <strong>${room.id}</strong>
          <span>${room.type} &middot; ${room.capacity} seats</span>
        </div>
      `;

      // 6 Slots
      for (let slot = 1; slot <= 6; slot++) {
        const key = `${room.id}-${slot}`;
        const cell = daySchedule[key];
        let cellClass = "slot-cell vacant";
        let cellHtml = "";

        if (cell) {
          if (cell.status === "booked") {
            cellClass = "slot-cell booked";
            bookedCount++;
            cellHtml = `
              <div class="booked-card">
                <span class="course-type">${cell.courseId || "CLASS"}</span>
                <strong>${cell.title}</strong>
                <span class="faculty">${cell.faculty}</span>
                <span class="capacity">${cell.count} stds</span>
              </div>
            `;
          } else if (cell.status === "blocked") {
            cellClass = "slot-cell blocked";
            blockedCount++;
            cellHtml = `
              <div class="blocked-card">
                <strong>BLOCKED</strong>
                <span>${cell.reason}</span>
              </div>
            `;
          } else if (cell.status === "pending") {
            cellClass = "slot-cell pending";
            pendingCount++;
            cellHtml = `
              <div class="pending-card">
                <span>PENDING<br>${cell.title}</span>
              </div>
            `;
          }
        } else {
          vacantCount++;
        }

        const isSelected = state.selectedCell && state.selectedCell.roomId === room.id && state.selectedCell.slot === slot;
        html += `
          <div class="${cellClass} ${isSelected ? 'selected' : ''}" 
               onclick="handleCellClick('${room.id}', ${slot})">
            ${cellHtml}
          </div>
        `;
      }
    });
  });

  grid.innerHTML = html;

  // Update Legend counters
  $("#legendVacantCount").textContent = vacantCount;
  $("#legendBookedCount").textContent = bookedCount;
  $("#legendBlockedCount").textContent = blockedCount;
  $("#legendPendingCount").textContent = pendingCount;
  
  updateAlertBarCounters(vacantCount, bookedCount, blockedCount, pendingCount);
}

// Update counters in warning banner — null-safe throughout
function updateAlertBarCounters(vacant, booked, blocked, pending) {
  const daySchedule = state.cellData[state.currentDate] || {};
  
  let conflicts = 0;
  for (let key in daySchedule) {
    const cell = daySchedule[key];
    if (cell.status === "booked") {
      const parts = key.split("-");
      const roomId = parts.slice(0, parts.length - 1).join("-");
      const flat = getFlatRooms().find(r => r.id === roomId);
      if (flat && cell.count > flat.capacity) conflicts++;
    }
  }
  
  const conflictBtn = $("#conflictAlertBtn");
  if (conflictBtn) {
    conflictBtn.textContent = `${conflicts} conflict${conflicts === 1 ? "" : "s"}`;
    conflictBtn.className = conflicts > 0 ? "alert-pill danger" : "alert-pill danger hidden";
  }
  
  let labBlocks = 0;
  for (let key in daySchedule) {
    if (daySchedule[key].status === "blocked" && key.includes("LAB")) labBlocks++;
  }
  const labBtn = $("#labAlertBtn");
  if (labBtn) labBtn.textContent = `${labBlocks} lab block${labBlocks === 1 ? "" : "s"}`;
  
  const pendingRequests = state.approvalRequests.filter(r => r.status === "Requested" && r.date === state.currentDate).length;
  const pendingBtn = $("#pendingAlertBtn");
  if (pendingBtn) pendingBtn.textContent = `${pendingRequests} pending request${pendingRequests === 1 ? "" : "s"}`;
  
  const unassigned = state.unassignedClasses[state.currentDate] || [];
  const alertEl = $("#unassignedAlert");
  if (alertEl) {
    alertEl.textContent = `${unassigned.length} class${unassigned.length === 1 ? "" : "es"} unassigned`;
    alertEl.classList.toggle("hidden", unassigned.length === 0);
  }
}

// Grid cell clicks
window.handleCellClick = function(roomId, slot) {
  state.selectedCell = { roomId, slot };
  renderScheduleGrid();
  renderDetailsPanel();
};

// Render Details Panel on grid click
function renderDetailsPanel() {
  const panel = $("#detailsPanel");
  if (!panel) return;
  
  if (!state.selectedCell) {
    panel.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">+</div>
        <h3>Select any grid cell</h3>
        <p>View booking details, resolve room moves, block rooms, or manage unassigned classes.</p>
      </div>
    `;
    return;
  }
  
  const { roomId, slot } = state.selectedCell;
  const daySchedule = state.cellData[state.currentDate] || {};
  const key = `${roomId}-${slot}`;
  const cell = daySchedule[key];
  const room = getFlatRooms().find(r => r.id === roomId);
  
  let html = `
    <div class="detail-header">
      <p class="eyebrow">${room.buildingName} &middot; Slot ${slot}</p>
      <h3>Room ${roomId}</h3>
    </div>
    <div class="detail-kv"><span>Room Type</span><strong>${room.type}</strong></div>
    <div class="detail-kv"><span>Capacity</span><strong>${room.capacity} seats</strong></div>
    <div class="detail-kv"><span>Amenities</span><strong>${room.amenities}</strong></div>
  `;
  
  if (cell) {
    if (cell.status === "booked") {
      html += `
        <div style="margin-top: 14px; padding: 12px; background: var(--booked-bg); border-radius: var(--radius); border: 1px solid var(--booked-border);">
          <strong style="color: var(--booked); font-size: 15px; display:block;">${cell.title}</strong>
          <span style="font-size:12px; color:var(--text-muted); display:block; margin: 4px 0 8px;">Course Code: ${cell.courseId} &middot; Faculty: ${cell.faculty}</span>
          <div class="detail-kv"><span>Enrolled Stds</span><strong>${cell.count} students</strong></div>
          <div class="detail-kv"><span>Requirements</span><strong>${cell.requirements || "None"}</strong></div>
          ${cell.accessibilityRequired ? `
            <div style="margin-top: 8px; padding: 6px 10px; background: #fffbeb; border: 1px solid #f59e0b; border-radius: 6px; color: #92400e; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 6px; width: fit-content;">
              <span>♿ Requires Accessible Classroom</span>
            </div>
          ` : ''}
          <div style="font-size:11px; margin-top:8px; color:var(--text-muted); background:white; padding:6px; border-radius:4px;">
            <strong>Audit Trail:</strong><br>${cell.audit}
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn primary" onclick="openMoveModal()">Move / Swap class</button>
          <button class="btn danger" onclick="markSelectedClassVirtual()">Mark Virtual</button>
          <button class="btn" onclick="unassignSelectedSlot()">Unassign Class</button>
        </div>
      `;
    } else if (cell.status === "blocked") {
      html += `
        <div style="margin-top: 14px; padding: 12px; background: var(--blocked-bg); border-radius: var(--radius); border: 1px solid var(--blocked-border);">
          <strong style="color: var(--blocked); font-size: 15px; display:block;">BLOCKED</strong>
          <span style="font-size:12px; color:var(--text-muted); display:block; margin: 4px 0 8px;">Reason: ${cell.reason}</span>
          <div class="detail-kv"><span>Requester</span><strong>${cell.faculty || "Admin Operations"}</strong></div>
        </div>
        <div class="detail-actions">
          <button class="btn primary" onclick="unblockSelectedSlot()">Release Block</button>
        </div>
      `;
    } else if (cell.status === "pending") {
      html += `
        <div style="margin-top: 14px; padding: 12px; background: var(--pending-bg); border-radius: var(--radius); border: 1px solid var(--pending-border);">
          <strong style="color: var(--pending); font-size: 15px; display:block;">PENDING REQUEST</strong>
          <span style="font-size:12px; color:var(--text-muted); display:block; margin: 4px 0 8px;">Title: ${cell.title}</span>
          <div class="detail-kv"><span>Faculty</span><strong>${cell.faculty}</strong></div>
          <div class="detail-kv"><span>Count</span><strong>${cell.count} stds</strong></div>
        </div>
        <div class="detail-actions">
          <button class="btn primary" onclick="showScreen('requests')">Go to Approvals</button>
        </div>
      `;
    }
  } else {
    // Vacant Slot details
    const unassignedList = state.unassignedClasses[state.currentDate] || [];
    html += `
      <div style="margin-top: 14px; padding: 12px; background: var(--vacant-bg); border-radius: var(--radius); border: 1px solid var(--vacant-border); color: #047857;">
        <strong>VACANT SLOT</strong>
        <p style="font-size:12px; margin-top:4px;">This classroom is fully available during this slot.</p>
      </div>
      <div class="detail-actions">
        ${unassignedList.length > 0 ? `
          <label class="field" style="margin-bottom:0;">
            <span>Assign Unassigned Class Here</span>
            <select id="placeUnassignedSelect">
              <option value="">-- Pick a class to place --</option>
              ${unassignedList.map(c => {
                let patternStr = "";
                mockSlotGroups.forEach(g => {
                  const found = g.courses.find(x => x.id === c.courseId || x.title === c.title);
                  if (found) {
                    patternStr = g.pattern;
                  }
                });
                const displayPattern = patternStr ? `[${patternStr}]` : `[Slot ${c.originalSlot || 'TBD'}]`;
                return `<option value="${c.courseId}">${c.courseId} ${displayPattern} · ${c.title} · ${c.count} stds</option>`;
              }).join("")}
            </select>
          </label>
          <button class="btn primary" onclick="assignUnassignedToSlot(document.getElementById('placeUnassignedSelect').value)">Assign Class</button>
        ` : ""}
        <button class="btn" onclick="openAdminBookModal()">Book Room</button>
        <button class="btn ${unassignedList.length > 0 ? '' : 'primary'}" onclick="openBlockConfigModal()">Block Room</button>
      </div>
    `;
  }
  
  panel.innerHTML = html;
}

// Admin manual booking modal
window.openAdminBookModal = function() {
  if (!state.selectedCell) return;
  const { roomId, slot } = state.selectedCell;
  
  openGenericModal("Admin: Book Room", `
    <div class="form-card">
      <div style="padding: 12px; background: #f8fafc; border: 1px solid var(--line); border-radius: 6px; margin-bottom: 16px;">
        <strong>Room: ${roomId}</strong> &middot; Slot ${slot}
      </div>
      <div class="field">
        <span>Event / Course Title</span>
        <input type="text" id="adminBookTitle" placeholder="e.g., Guest Lecture, Staff Meeting" />
      </div>
      <div class="field">
        <span>Organizer / Faculty</span>
        <input type="text" id="adminBookFaculty" placeholder="Name" />
      </div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="submitAdminBook()">Confirm Booking</button>
      </div>
    </div>
  `);
};

window.submitAdminBook = function() {
  const title = $("#adminBookTitle")?.value || "Ad-hoc Booking";
  const faculty = $("#adminBookFaculty")?.value || "Admin";
  
  const { roomId, slot } = state.selectedCell;
  const key = `${roomId}-${slot}`;
  
  state.cellData[state.currentDate] = state.cellData[state.currentDate] || {};
  state.cellData[state.currentDate][key] = {
    status: "booked",
    title: title,
    faculty: faculty,
    count: 0,
    courseId: "MANUAL",
    requirements: "None",
    audit: `Manually booked by Admin on ${state.currentDate}.`
  };
  
  addSystemNotification(`Manually booked ${roomId} (Slot ${slot}) for ${title}.`);
  showToast(`Room booked successfully.`);
  
  closeModal();
  renderScheduleGrid();
  renderDetailsPanel();
};

// Assign Unassigned Class to Vacant Slot
window.assignUnassignedToSlot = function(courseId) {
  if (!courseId || !state.selectedCell) return;
  const { roomId, slot } = state.selectedCell;
  const list = state.unassignedClasses[state.currentDate] || [];
  const index = list.findIndex(c => c.courseId === courseId);
  if (index === -1) return;

  const classObj = list[index];

  // ─── Edge case: warn if slot is different from where class originated ───
  // Use Number() to avoid type-coercion false negatives (e.g. "2" !== 2)
  const origSlot = classObj.originalSlot != null ? Number(classObj.originalSlot) : null;
  const targetSlot = Number(slot);

  if (origSlot !== null && origSlot !== targetSlot) {
    const origSlotInfo  = slotTimes[origSlot - 1]  || { name: `Slot ${origSlot}`,  time: "" };
    const newSlotInfo   = slotTimes[targetSlot - 1] || { name: `Slot ${targetSlot}`, time: "" };
    openGenericModal("\u26a0 Slot Change Warning", `
      <div style="padding:14px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;margin-bottom:16px;">
        <strong style="font-size:14px;color:#92400e;">This class is moving to a different time slot</strong>
        <p style="font-size:13px;margin-top:8px;color:#78350f;">
          <strong>${classObj.title}</strong> was originally in
          <strong>${origSlotInfo.name}${origSlotInfo.time ? ' (' + origSlotInfo.time + ')' : ''}</strong>
          and is being moved to
          <strong>${newSlotInfo.name}${newSlotInfo.time ? ' (' + newSlotInfo.time + ')' : ''}</strong>.
        </p>
      </div>
      <div style="padding:12px;background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;margin-bottom:16px;font-size:13px;">
        <strong style="color:#991b1b;">\u26a0 Student timetable conflict risk</strong>
        <p style="margin-top:6px;color:#7f1d1d;">
          Students enrolled in <strong>${classObj.title}</strong> may already have another class in
          <strong>${newSlotInfo.name}</strong>. This creates an invisible clash in their timetable
          that they won't see unless you explicitly notify them.
        </p>
        <p style="margin-top:8px;color:#7f1d1d;">
          <strong>Recommendation:</strong> verify no enrolled students have a conflict in Slot ${targetSlot} before confirming.
        </p>
      </div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel \u2014 pick same slot</button>
        <button class="btn danger" onclick="closeModal(); confirmAssignToSlot('${courseId}')">
          Confirm &amp; notify students of time change
        </button>
      </div>
    `);
    return; // Block the assignment until user explicitly confirms
  }

  // Same slot or no original slot info — proceed directly
  doAssignToSlot(courseId);
};

// Called after user confirms the slot-change warning
window.confirmAssignToSlot = function(courseId) {
  doAssignToSlot(courseId);
  addSystemNotification(`Slot change confirmed. Students in ${courseId} class notified of new time.`);
};

function doAssignToSlot(courseId) {
  if (!state.selectedCell) return;
  const { roomId, slot } = state.selectedCell;
  const list = state.unassignedClasses[state.currentDate] || [];
  const index = list.findIndex(c => c.courseId === courseId);
  if (index === -1) return;

  const classObj = list.splice(index, 1)[0];
  state.cellData[state.currentDate] = state.cellData[state.currentDate] || {};
  state.cellData[state.currentDate][`${roomId}-${slot}`] = {
    status: "booked",
    title: classObj.title,
    faculty: classObj.faculty,
    count: classObj.count,
    courseId: classObj.courseId,
    requirements: classObj.requirements,
    audit: `Assigned from unassigned queue to Room ${roomId} Slot ${slot} on ${state.currentDate}.`
  };
  
  addSystemNotification(`Assigned ${classObj.title} to Room ${roomId} Slot ${slot}.`);
  showToast(`Placed ${classObj.title} in Room ${roomId} Slot ${slot}.`);
  renderScheduleGrid();
  renderDetailsPanel();
}

// Release a block
window.unblockSelectedSlot = function() {
  if (!state.selectedCell) return;
  const { roomId, slot } = state.selectedCell;
  const key = `${roomId}-${slot}`;
  delete state.cellData[state.currentDate][key];
  
  addSystemNotification(`Room ${roomId} Block released for Slot ${slot}.`);
  showToast(`Released room block for room ${roomId}.`);
  renderScheduleGrid();
  renderDetailsPanel();
};

// Unassign class slot — removes from grid and sends to unassigned queue
window.unassignSelectedSlot = function() {
  if (!state.selectedCell) return;
  const { roomId, slot } = state.selectedCell;
  const key = `${roomId}-${slot}`;
  const cell = state.cellData[state.currentDate][key];
  if (!cell) return;
  
  state.unassignedClasses[state.currentDate] = state.unassignedClasses[state.currentDate] || [];
  state.unassignedClasses[state.currentDate].push({
    title: cell.title,
    faculty: cell.faculty,
    count: cell.count,
    courseId: cell.courseId,
    requirements: cell.requirements,
    originalSlot: slot,      // ← remember where it came from
    originalRoom: roomId
  });
  
  delete state.cellData[state.currentDate][key];
  addSystemNotification(`Class unassigned: ${cell.title} removed from Room ${roomId} Slot ${slot}. Now in unassigned queue — ready to be placed.`);
  showToast(`${cell.title} moved to unassigned queue. Room ${roomId} is now vacant.`);
  renderScheduleGrid();
  renderDetailsPanel();
};

// Mark Selected Class Virtual
window.markSelectedClassVirtual = function() {
  if (!state.selectedCell) return;
  const { roomId, slot } = state.selectedCell;
  const key = `${roomId}-${slot}`;
  const cell = state.cellData[state.currentDate][key];
  if (!cell) return;
  
  delete state.cellData[state.currentDate][key];
  addSystemNotification(`CS101 class marked virtual by Admin. Room ${roomId} Slot ${slot} is now released.`);
  showToast(`${cell.title} is now virtual. Room ${roomId} is vacant.`);
  
  // Sync faculty schedule row status
  if (cell.courseId === "CS101") {
    state.approvalRequests = state.approvalRequests.filter(r => r.title !== "Mark CS101 virtual");
    // Directly update faculty row if rendered
    const row = $('[data-faculty-class="cs101"]');
    if (row) {
      row.children[1].innerHTML = `<span class="tag approved">Virtual Delivery</span><small>Room Released</small>`;
      row.children[2].innerHTML = `<span class="tag approved">Completed</span>`;
    }
  }
  
  renderScheduleGrid();
  renderDetailsPanel();
};

// Open block configuration modal for vacant room
window.openBlockConfigModal = function() {
  if (!state.selectedCell) return;
  const { roomId, slot } = state.selectedCell;
  
  openGenericModal("Create Room Block", `
    <div class="form-card">
      <div class="field">
        <span>Room</span>
        <input value="${roomId}" disabled />
      </div>
      <div class="field">
        <span>Slot</span>
        <input value="Slot ${slot} (${slotTimes[slot - 1].time})" disabled />
      </div>
      <div class="field">
        <span>Block Type</span>
        <select id="blockTypeSelect">
          <option>Maintenance</option>
          <option>Exam Block</option>
          <option>Admin Reserve</option>
        </select>
      </div>
      <div class="field">
        <span>Reason</span>
        <textarea id="blockReasonText" placeholder="Enter reason for blocking..."></textarea>
      </div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="submitRoomBlock()">Apply Block</button>
      </div>
    </div>
  `);
};

window.submitRoomBlock = function() {
  const { roomId, slot } = state.selectedCell;
  const type = $("#blockTypeSelect").value;
  const reason = $("#blockReasonText").value || "Routine block";
  
  state.cellData[state.currentDate] = state.cellData[state.currentDate] || {};
  state.cellData[state.currentDate][`${roomId}-${slot}`] = {
    status: "blocked",
    reason: `${type} &mdash; ${reason}`,
    faculty: "Admin Operations"
  };
  
  addSystemNotification(`Blocked room ${roomId} Slot ${slot} for ${type}.`);
  showToast(`Blocked room ${roomId} Slot ${slot}.`);
  closeModal();
  renderScheduleGrid();
  renderDetailsPanel();
};

// Move / Swap modal (Screen B)
window.openMoveModal = function() {
  if (!state.selectedCell) return;
  state.modalStep = 1;
  renderMoveModal();
};

window.renderMoveModal = function() {
  const modal = $("#moveModal");
  if (!modal) return;
  
  const { roomId, slot } = state.selectedCell;
  const cell = state.cellData[state.currentDate][`${roomId}-${slot}`];
  if (!cell) return;
  
  // Set title
  $("#modalTitle").textContent = `Relocate ${cell.title}`;
  modal.classList.remove("hidden");
  
  // Set active step buttons in header
  $$(".steps .step").forEach((btn, idx) => {
    btn.classList.toggle("active", idx + 1 === state.modalStep);
  });
  
  const body = $("#modalBody");
  
  if (state.modalStep === 1) {
    // Step 1: Impact Details
    let impactHtml = `
      <div style="margin-bottom:14px;">
        <h4 style="font-weight:600; font-size:14px; margin-bottom:4px;">Impact Assessment</h4>
        <p style="font-size:13px; color:var(--text-muted);">Relocating class during peak hours creates the following constraints:</p>
      </div>
      <div class="detail-kv"><span>Course ID</span><strong>${cell.courseId}</strong></div>
      <div class="detail-kv"><span>Class Size</span><strong>${cell.count} students</strong></div>
      <div class="detail-kv"><span>Min Capacity Required</span><strong>${cell.count} seats</strong></div>
      <div class="detail-kv"><span>Special Attributes</span><strong>Projector, Accessible</strong></div>
    `;
    
    // Peak hour warning
    if (cell.count >= 150) {
      impactHtml += `
        <div class="edge-case" style="border-color: var(--danger); background: #fef2f2; color: #991b1b; padding:12px; border-radius:6px; font-size:12.5px; margin-top:14px;">
          <strong>Peak Hour Constraint:</strong> No vacant rooms with &gt;150 capacity are available on ${state.currentDate} Slot ${slot}. Theory-based fallbacks or swaps are recommended.
        </div>
      `;
    }
    
    impactHtml += `
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="state.modalStep=2; renderMoveModal();">Find Alternatives</button>
      </div>
    `;
    body.innerHTML = impactHtml;
    
  } else if (state.modalStep === 2) {
    // Step 2: Alternatives list
    const rooms = getFlatRooms();
    const vacantList = rooms.filter(r => {
      // Must be vacant in this slot
      const isOccupied = checkRoomOccupancy(r.id, [slot], state.currentDate);
      return !isOccupied && r.id !== roomId;
    });
    
    let alternativesHtml = `
      <h4 style="font-weight:600; font-size:14px; margin-bottom:8px;">Vacant Alternatives</h4>
      <div class="suggestion-list" style="max-height: 250px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;">
    `;
    
    if (vacantList.length === 0) {
      alternativesHtml += `<p style="font-size:12.5px; color:var(--text-muted);">No vacant rooms available during this slot.</p>`;
    } else {
      vacantList.forEach(r => {
        const capacityOk = r.capacity >= cell.count;
        const needsAccessibility = cell.accessibilityRequired || cell.requirements?.toLowerCase().includes("access");
        const accessibilityMismatch = needsAccessibility && !r.accessible;
        
        alternativesHtml += `
          <div class="suggestion" style="padding:10px; border:1px solid var(--line); border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${r.id} &middot; ${r.type}</strong>
              <span style="font-size:11.5px; color:var(--text-muted); display:block;">Capacity: ${r.capacity} seats (${capacityOk ? 'Fits class' : 'Underfilled capacity'})</span>
              ${accessibilityMismatch ? `<span style="font-size:10px; color:#b45309; display:block; margin-top:2px;">♿ No lift access</span>` : ''}
            </div>
            <div>
              ${!capacityOk ? `
                <span class="tag requested" style="font-size:9px;">Too Small</span>
              ` : `
                <button class="btn sm ${accessibilityMismatch ? 'danger' : 'primary'}" onclick="moveClassDirectly('${r.id}')">${accessibilityMismatch ? 'Select (Warn)' : 'Select'}</button>
              `}
            </div>
          </div>
        `;
      });
    }
    
    alternativesHtml += `
      </div>
      <div class="cta-row">
        <button class="btn" onclick="state.modalStep=1; renderMoveModal();">Back</button>
        <button class="btn primary" onclick="state.modalStep=3; renderMoveModal();">View Swaps</button>
      </div>
    `;
    body.innerHTML = alternativesHtml;
    
  } else if (state.modalStep === 3) {
    // Step 3: Swap options
    const rooms = getFlatRooms();
    const occupiedList = [];
    
    // Find all occupied rooms in this slot
    rooms.forEach(r => {
      const occ = checkRoomOccupancy(r.id, [slot], state.currentDate);
      if (occ && occ.status === "booked" && r.id !== roomId) {
        occupiedList.push({ room: r, classObj: occ });
      }
    });
    
    let swapHtml = `
      <h4 style="font-weight:600; font-size:14px; margin-bottom:8px;">Swap Opportunities</h4>
      <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">Swap rooms with an active class in Slot ${slot}. Swapping underfilled large rooms resolves peak constraints.</p>
      <div class="suggestion-list" style="max-height: 250px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;">
    `;
    
    if (occupiedList.length === 0) {
      swapHtml += `<p style="font-size:12.5px; color:var(--text-muted);">No swap candidates found.</p>`;
    } else {
      occupiedList.forEach(item => {
        // Swap feasibility: CS101 needs 175 capacity. AUD-01 capacity is 2000, so CS101 fits. 
        // Guest talk has 95 students, fits in C-201 (200 seats).
        const swapFitsSource = item.room.capacity >= cell.count;
        const swapFitsTarget = room.capacity >= item.classObj.count;
        
        const sourceNeedsAccessibility = cell.accessibilityRequired || cell.requirements?.toLowerCase().includes("access");
        const sourceAccessMismatch = sourceNeedsAccessibility && !item.room.accessible;
        
        const targetNeedsAccessibility = item.classObj.accessibilityRequired || item.classObj.requirements?.toLowerCase().includes("access");
        const targetAccessMismatch = targetNeedsAccessibility && !room.accessible;
        
        const hasAccessWarn = sourceAccessMismatch || targetAccessMismatch;
        
        let warnText = "";
        if (sourceAccessMismatch && targetAccessMismatch) {
          warnText = "♿ Both classrooms fail accessibility requirements!";
        } else if (sourceAccessMismatch) {
          warnText = `♿ Room ${item.room.id} lacks lift access for ${cell.title}`;
        } else if (targetAccessMismatch) {
          warnText = `♿ Room ${room.id} lacks lift access for ${item.classObj.title}`;
        }
        
        swapHtml += `
          <div class="suggestion" style="padding:10px; border:1px solid var(--line); border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${item.classObj.title} &middot; Room ${item.room.id}</strong>
              <span style="font-size:11.5px; color:var(--text-muted); display:block;">
                Size: ${item.classObj.count} stds (Room capacity: ${item.room.capacity} seats)
              </span>
              <span style="font-size:10px; display:block; margin-top:2px; ${swapFitsSource && swapFitsTarget && !hasAccessWarn ? 'color:#047857;' : 'color:#b45309;'}">
                ${swapFitsSource && swapFitsTarget && !hasAccessWarn ? '✓ Feasible Swap' : '⚠ Capacity/Accessibility Warning'}
              </span>
              ${hasAccessWarn ? `<span style="font-size:10.5px; color:#b45309; display:block; margin-top:2px; font-weight:500;">${warnText}</span>` : ''}
            </div>
            <div>
              <button class="btn sm ${hasAccessWarn ? 'danger' : 'primary'}" onclick="confirmSwapSelection('${item.room.id}')">${hasAccessWarn ? 'Swap (Warn)' : 'Swap'}</button>
            </div>
          </div>
        `;
      });
    }
    
    swapHtml += `
      </div>
      <div class="cta-row">
        <button class="btn" onclick="state.modalStep=2; renderMoveModal();">Back</button>
      </div>
    `;
    body.innerHTML = swapHtml;
    
  } else if (state.modalStep === 4) {
    // Step 4: Preview and Confirm Swap
    const { sourceRoomId, targetRoomId } = state.swapDetails;
    const sourceClass = state.cellData[state.currentDate][`${sourceRoomId}-${slot}`];
    const targetClass = state.cellData[state.currentDate][`${targetRoomId}-${slot}`];
    
    let confirmHtml = `
      <h4 style="font-weight:600; font-size:14px; margin-bottom:8px;">Relocation Confirmation</h4>
      <div style="background:#f8fafc; border:1px solid var(--line); border-radius:6px; padding:12px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px;">
          <span>Move <strong>${sourceClass.title}</strong></span>
          <span>&rarr; <strong>Room ${targetRoomId}</strong></span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:13px;">
          <span>Move <strong>${targetClass.title}</strong></span>
          <span>&rarr; <strong>Room ${sourceRoomId}</strong></span>
        </div>
      </div>
      
      <h5 style="font-weight:600; font-size:12px; text-transform:uppercase; color:var(--text-muted); margin-bottom:6px;">Recipient Preview</h5>
      <div style="font-size:12px; color:var(--text-main); margin-bottom:14px;">
        <p>&bull; <strong>Students:</strong> ${sourceClass.count + targetClass.count} affected students will receive instant Push/SMS alerts.</p>
        <p>&bull; <strong>Faculty:</strong> ${sourceClass.faculty} and ${targetClass.faculty} will be notified.</p>
        <p>&bull; <strong>Operations:</strong> Building Managers for Block ${sourceRoomId[0]} and Block ${targetRoomId[0]} alerted.</p>
      </div>
      
      <div class="cta-row">
        <button class="btn" onclick="state.modalStep=3; renderMoveModal();">Back</button>
        <button class="btn primary" onclick="executeSwap()">Confirm & Send Notifications</button>
      </div>
    `;
    body.innerHTML = confirmHtml;
  }
};

window.moveClassDirectly = function(targetRoomId) {
  const { roomId, slot } = state.selectedCell;
  const key = `${roomId}-${slot}`;
  const cell = state.cellData[state.currentDate][key];
  if (!cell) return;
  
  delete state.cellData[state.currentDate][key];
  state.cellData[state.currentDate][`${targetRoomId}-${slot}`] = {
    ...cell,
    audit: `Moved from Room ${roomId} by Admin on ${state.currentDate} at ${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}.`
  };
  
  addSystemNotification(`Relocated class: ${cell.title} from Room ${roomId} to vacant Room ${targetRoomId} (Slot ${slot}).`);
  showToast(`Moved ${cell.title} to room ${targetRoomId}.`);
  closeModal();
  renderScheduleGrid();
  renderDetailsPanel();
};

window.confirmSwapSelection = function(targetRoomId) {
  const { roomId } = state.selectedCell;
  state.swapDetails = {
    sourceRoomId: roomId,
    targetRoomId: targetRoomId
  };
  state.modalStep = 4;
  renderMoveModal();
};

window.executeSwap = function() {
  const { slot } = state.selectedCell;
  const { sourceRoomId, targetRoomId } = state.swapDetails;
  
  const sourceKey = `${sourceRoomId}-${slot}`;
  const targetKey = `${targetRoomId}-${slot}`;
  
  const sourceClass = state.cellData[state.currentDate][sourceKey];
  const targetClass = state.cellData[state.currentDate][targetKey];
  
  state.cellData[state.currentDate][sourceKey] = {
    ...targetClass,
    audit: `Swapped from Room ${targetRoomId} by Admin on ${state.currentDate}.`
  };
  state.cellData[state.currentDate][targetKey] = {
    ...sourceClass,
    audit: `Swapped from Room ${sourceRoomId} by Admin on ${state.currentDate}.`
  };
  
  addSystemNotification(`Swapped rooms between ${sourceClass.title} (now Room ${targetRoomId}) and ${targetClass.title} (now Room ${sourceRoomId}) in Slot ${slot}.`);
  showToast("Swap confirmed. Notification center updated.");
  closeModal();
  renderScheduleGrid();
  renderDetailsPanel();
  
  // If student view is active, update student cards
  renderStudentHome();
};

window.closeModal = function() {
  $("#moveModal").classList.add("hidden");
};

// Render Request & Approvals screen (Screen C)
function renderRequestsScreen() {
  const queue = $("#requestQueue");
  if (!queue) return;
  
  if (state.approvalRequests.length === 0) {
    queue.innerHTML = `<div class="empty-state"><p>No pending approvals</p></div>`;
    $("#approvalPanel").innerHTML = "";
    return;
  }
  
  queue.innerHTML = state.approvalRequests.map(req => {
    const isSelected = state.selectedRequestId === req.id;
    return `
      <div class="request-card ${isSelected ? 'selected' : ''}" onclick="selectApprovalRequest('${req.id}')">
        <div class="request-card-header">
          <strong>${req.title}</strong>
          <span class="tag requested">${req.status}</span>
        </div>
        <span>Requester: ${req.faculty} &middot; Date: ${req.date} &middot; Slots: ${req.slots.join(", ")}</span>
        <footer>
          <span>Requirement: ${req.requirements}</span>
          <span>ID: ${req.id}</span>
        </footer>
      </div>
    `;
  }).join("");
  
  renderApprovalPanel();
}

window.selectApprovalRequest = function(reqId) {
  state.selectedRequestId = reqId;
  renderRequestsScreen();
};

// Render Request Approval Panel
function renderApprovalPanel() {
  const panel = $("#approvalPanel");
  if (!panel) return;
  
  if (!state.selectedRequestId) {
    panel.innerHTML = `<div class="empty-state"><p>Select a request from the queue to process.</p></div>`;
    return;
  }
  
  const req = state.approvalRequests.find(r => r.id === state.selectedRequestId);
  if (!req) return;
  
  const rooms = getFlatRooms();
  
  // Render Dynamic Room Selection with conflict flags and accessibility badges
  let roomOptionsHtml = rooms.map(room => {
    const conflictClass = checkRoomOccupancy(room.id, req.slots, req.date);
    const accessTag = room.accessible ? "♿ Accessible" : "No lift access";
    const label = conflictClass 
      ? `[CONFLICT: ${conflictClass.title}] (Cap: ${room.capacity}) · ${accessTag}` 
      : `[AVAILABLE] (Cap: ${room.capacity}) · ${accessTag}`;
    
    return `<option value="${room.id}" ${conflictClass ? 'style="color:red;"' : ''}>${room.id} &mdash; ${label}</option>`;
  }).join("");
  
  panel.innerHTML = `
    <h3 style="font-weight:700; font-size:16px; margin-bottom:12px;">Process Request</h3>
    <div class="detail-kv"><span>Type</span><strong>${req.type}</strong></div>
    <div class="detail-kv"><span>Proposed Title</span><strong>${req.title}</strong></div>
    <div class="detail-kv"><span>Faculty</span><strong>${req.faculty}</strong></div>
    <div class="detail-kv"><span>Attendees</span><strong>${req.count} students</strong></div>
    <div class="detail-kv"><span>Slots</span><strong>Slots ${req.slots.join(", ")}</strong></div>
    <div class="detail-kv"><span>Proposed Date</span><strong>${req.date}</strong></div>
    <div class="detail-kv"><span>Requirements</span><strong>${req.requirements}</strong></div>
    
    <!-- Dynamic Room Assign Form -->
    ${req.type === "Block" && req.roomId ? `
      <div class="field" style="margin-top:16px;">
        <span>Target Room</span>
        <strong style="font-size:14px; padding: 8px 12px; background: #f8fafc; border: 1px solid var(--line); border-radius: 6px;">${req.roomId}</strong>
        <input type="hidden" id="approvalRoomSelect" value="${req.roomId}" />
      </div>
    ` : `
      <div class="field" style="margin-top:16px;">
        <span>Assign Room</span>
        <select id="approvalRoomSelect" onchange="checkApprovalConflict(this.value)">
          <option value="">-- Choose Classroom --</option>
          ${roomOptionsHtml}
        </select>
      </div>
    `}
    
    <div id="approvalConflictWarning" class="edge-case hidden" style="border-color: var(--danger); background: #fef2f2; color: #991b1b; padding:10px; border-radius:6px; font-size:12px; margin-bottom:10px;"></div>
    
    <div class="cta-row" style="margin-top:14px;">
      <button class="btn danger" onclick="rejectRequest('${req.id}')">Reject</button>
      <button class="btn primary" onclick="approveRequest('${req.id}')">Approve & Save</button>
    </div>
  `;
}

window.checkApprovalConflict = function(roomId) {
  const warning = $("#approvalConflictWarning");
  if (!roomId || !state.selectedRequestId) {
    warning.classList.add("hidden");
    return;
  }
  
  const req = state.approvalRequests.find(r => r.id === state.selectedRequestId);
  const conflict = checkRoomOccupancy(roomId, req.slots, req.date);
  const selectedRoom = getFlatRooms().find(r => r.id === roomId);

  // Check if this course requires accessibility and the room doesn't support it
  // Look up existing cell data for this course to find accessibilityRequired flag
  const existingCourse = Object.values(state.cellData[state.currentDate] || {})
    .find(c => c.courseId === req.courseId);
  const needsAccessibility = req.requirements?.toLowerCase().includes("access") || existingCourse?.accessibilityRequired;
  const accessibilityMismatch = needsAccessibility && selectedRoom && !selectedRoom.accessible;

  const warnings = [];
  if (conflict) {
    warnings.push(`<strong>⚠ Room Conflict:</strong> ${roomId} is occupied by <strong>${conflict.title}</strong> (${conflict.faculty}) during Slot ${req.slots.join(", ")}. Approving will displace that class to the unassigned queue.`);
  }
  if (accessibilityMismatch) {
    warnings.push(`<strong>♿ Accessibility Warning:</strong> This course has registered students with mobility needs. <strong>${roomId}</strong> does not have lift access or step-free entry. Consider choosing an accessible room (e.g., A-101, C-201, E-101).`);
  }

  if (warnings.length > 0) {
    warning.innerHTML = warnings.map(w => `<p style="margin-bottom:6px;">${w}</p>`).join("");
    warning.style.borderColor = accessibilityMismatch ? "#f59e0b" : "var(--danger)";
    warning.style.background = accessibilityMismatch ? "#fffbeb" : "#fef2f2";
    warning.style.color = accessibilityMismatch ? "#92400e" : "#991b1b";
    warning.classList.remove("hidden");
  } else {
    warning.classList.add("hidden");
  }
};

window.rejectRequest = function(reqId) {
  const req = state.approvalRequests.find(r => r.id === reqId);
  if (!req) return;
  
  req.status = "Rejected";
  state.approvalRequests = state.approvalRequests.filter(r => r.id !== reqId);
  state.selectedRequestId = state.approvalRequests[0]?.id || null;
  
  addSystemNotification(`Rejected request ${req.title} from ${req.faculty}.`);
  showToast("Request rejected.");
  renderRequestsScreen();
  renderScheduleGrid();
};

window.approveRequest = function(reqId) {
  const req = state.approvalRequests.find(r => r.id === reqId);
  const assignedRoomId = $("#approvalRoomSelect").value;
  
  if (!assignedRoomId) {
    showToast("Please assign a room before approving.");
    return;
  }
  
  const conflict = checkRoomOccupancy(assignedRoomId, req.slots, req.date);
  state.cellData[req.date] = state.cellData[req.date] || {};
  
  if (conflict) {
    // find which slot the conflict was in
    const conflictSlotKey = req.slots.find(s => state.cellData[req.date][`${assignedRoomId}-${s}`]);
    // Relocate displaced class to unassigned queue
    state.unassignedClasses[req.date] = state.unassignedClasses[req.date] || [];
    state.unassignedClasses[req.date].push({
      title: conflict.title,
      faculty: conflict.faculty,
      count: conflict.count,
      courseId: conflict.courseId,
      requirements: conflict.requirements,
      originalSlot: conflictSlotKey || req.slots[0],
      originalRoom: assignedRoomId
    });
    addSystemNotification(`Class displaced: ${conflict.title} (Room ${assignedRoomId}) moved to unassigned queue.`);
  }
  
  // Assign slots
  req.slots.forEach(slot => {
    state.cellData[req.date][`${assignedRoomId}-${slot}`] = {
      status: req.type === "Block" ? "blocked" : "booked",
      title: req.title,
      faculty: req.faculty,
      count: req.count || 0,
      courseId: req.type === "Block" ? "BLOCK" : "BOOKING",
      requirements: req.requirements,
      audit: `Approved by Admin from Requests Queue on ${state.currentDate}.`
    };
  });
  
  // If it's a facilities requested block, notify facilities and update issue status
  if (req.type === "Block" && req.faculty.includes("Facilities")) {
    addSystemNotification(`Your block request for ${assignedRoomId} on ${req.date} is approved. Kindly complete maintenance.`);
    if (req.issueId) {
      const issue = state.issues.find(i => i.id === req.issueId);
      if (issue) {
        issue.status = "In Progress";
      }
    }
  } else {
    addSystemNotification(`Request approved: ${req.title} scheduled in Room ${assignedRoomId}.`);
  }
  
  state.approvalRequests = state.approvalRequests.filter(r => r.id !== reqId);
  state.selectedRequestId = state.approvalRequests[0]?.id || null;
  
  showToast("Request approved successfully.");
  renderRequestsScreen();
  renderScheduleGrid();
};

// Faculty Home rendering & actions (Screen D)
function renderFacultyHome() {
  const container = $("#facultyCardsContainer");
  if (!container) return;

  const daySchedule = state.cellData[state.currentDate] || {};
  const activeFaculty = "Dr. Ananya Mehta"; // The demo active user
  
  // Extract all courses belonging to this faculty on the current day
  const facultyCourses = [];
  for (let key in daySchedule) {
    const cell = daySchedule[key];
    if (cell && cell.faculty && cell.faculty.includes("Mehta")) {
      const parts = key.split("-");
      const room = parts[0] + "-" + parts[1];
      const slot = parts[2];
      facultyCourses.push({ key, room, slot, ...cell });
    }
  }

  // Also manually inject CS101 or Guest Talk if they were forced into virtual/cancelled
  // so we don't lose them if they are the exact mock test cases from the user's run.
  // Actually, now that we use status flags, they will remain in `cellData`!

  if (facultyCourses.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 48px; border: 1px dashed var(--line-strong); border-radius: var(--radius); color: var(--text-muted);">
        <p>No classes scheduled for you today.</p>
      </div>`;
    return;
  }
  
  // Sort by slot
  facultyCourses.sort((a, b) => parseInt(a.slot) - parseInt(b.slot));

  container.innerHTML = facultyCourses.map(course => {
    let statusClass = "approved";
    let statusText = "Scheduled";
    let roomDisplay = course.room;
    let icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
    
    if (course.status === "virtual") {
      statusClass = "requested";
      statusText = "Virtual / Freed";
      roomDisplay = "Virtual Delivery";
      icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
    } else if (course.status === "cancelled") {
      statusClass = "blocked";
      statusText = "Cancelled";
      roomDisplay = "Room Released";
    }

    return `
      <div class="faculty-class-card" data-key="${course.key}">
        <div class="card-header">
          <div>
            <h3 class="course-title">${course.title}</h3>
            <p class="course-meta">Slot ${course.slot}</p>
          </div>
          <span class="tag ${statusClass} class-status-tag">${statusText}</span>
        </div>
        <div class="card-body">
          <div class="room-info">
            ${icon}
            <span class="room-name">${roomDisplay}</span>
          </div>
        </div>
        <div class="card-footer">
          ${course.status === "booked" 
            ? `<button class="btn sm manage-btn" onclick="openManageClassModal('${course.key}')">Manage class</button>`
            : `<span class="tag ${statusClass}">Action Complete</span>`
          }
        </div>
      </div>
    `;
  }).join("");
}

// Faculty direct Mark Virtual (Room immediately released!)
window.facultyMarkVirtual = function(targetKey) {
  const daySchedule = state.cellData[state.currentDate] || {};
  
  if (targetKey && daySchedule[targetKey]) {
    daySchedule[targetKey].status = "virtual"; // Changed from delete to flag
  }
  
  addSystemNotification(`Dr. Ananya Mehta marked a class virtual. Room is released.`);
  showToast("Class delivery set to virtual. Room is released instantly.");
  renderFacultyHome();
  if (state.currentRole === "admin") renderScheduleGrid();
};

window.facultyCancelEvent = function(targetKey) {
  const daySchedule = state.cellData[state.currentDate] || {};
  
  if (targetKey && daySchedule[targetKey]) {
    daySchedule[targetKey].status = "cancelled"; // Changed from delete to flag
  }
  
  addSystemNotification(`A class was cancelled by Faculty.`);
  showToast("Class cancelled. Room is released instantly.");
  renderFacultyHome();
  if (state.currentRole === "admin") renderScheduleGrid();
};

// Open Faculty Request Modal
window.openFacultyRequestModal = function() {
  const roomOptions = getFlatRooms().map(r => `<option value="${r.id}">${r.id} &mdash; ${r.type} (Cap: ${r.capacity})</option>`).join('');
  openGenericModal("Raise Request", `
    <div class="form-card">
      <div class="field">
        <span>Type</span>
        <select id="facultyIssueType" onchange="updateFacultyRequestBtnText()">
          <option value="issue">Report issue</option>
          <option value="block">Block time range</option>
          <option value="book">Book room</option>
        </select>
      </div>
      <div class="field">
        <span>Date</span>
        <input id="facultyRequestDate" type="date" value="${state.currentDate}" />
      </div>
      <div class="field">
        <span>Room</span>
        <select id="facultyIssueRoomSelect">
          <option value="">-- Select Room --</option>
          ${roomOptions}
        </select>
      </div>
      <div class="field">
        <span>Slots</span>
        <div class="segmented" style="flex-wrap:wrap; gap:6px;">
          <button type="button" class="active" onclick="this.classList.toggle('active')">Slot 1 (9-10)</button>
          <button type="button" onclick="this.classList.toggle('active')">Slot 2 (10-11)</button>
          <button type="button" onclick="this.classList.toggle('active')">Slot 3 (11-12)</button>
          <button type="button" onclick="this.classList.toggle('active')">Slot 4 (1-2)</button>
          <button type="button" onclick="this.classList.toggle('active')">Slot 5 (2-3)</button>
          <button type="button" onclick="this.classList.toggle('active')">Slot 6 (3-4)</button>
        </div>
      </div>
      <div class="field">
        <span>Reason / Details</span>
        <textarea id="facultyIssueDesc" placeholder="Describe the request or issue..."></textarea>
      </div>
      <p class="helper" style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">Virtual or cancelled classes free the room after admin policy approval.</p>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" id="facultySubmitRequestBtn" onclick="submitFacultyIssue()">Submit to facilities</button>
      </div>
    </div>
  `);
};


window.updateFacultyRequestBtnText = function() {
  const type = $("#facultyIssueType")?.value;
  const btn = $("#facultySubmitRequestBtn");
  if (!btn) return;
  if (type === "issue") {
    btn.innerText = "Submit to facilities";
  } else {
    btn.innerText = "Submit to admin";
  }
};

// Report Faculty Issue Form Submission
window.submitFacultyIssue = function() {
  const type = $("#facultyIssueType")?.value || "issue";
  const room = $("#facultyIssueRoomSelect")?.value || "D-LAB-2";
  const date = $("#facultyRequestDate")?.value || state.currentDate;
  const desc = $("#facultyIssueDesc")?.value || "";

  // Gather selected slots
  const slotBtns = document.querySelectorAll("#genericModal .segmented button.active");
  const slots = Array.from(slotBtns).map((_, i) => i + 1);
  if (slots.length === 0) slots.push(1); // fallback

  if (!room) { showToast("Please select a room."); return; }

  if (type === "issue") {
    const newId = `ISS-${Date.now().toString().slice(-2)}`;
    state.issues.push({
      id: newId, room, description: desc,
      reportedBy: "Dr. Ananya Mehta", date, status: "Requested"
    });
    state.selectedIssueId = newId;
    addSystemNotification(`Faculty reported issue on room ${room}: ${desc}`);
    showToast(`Issue reported on room ${room}. Facilities manager notified.`);
  } else {
    state.approvalRequests.push({
      id: `REQ-${Date.now().toString().slice(-2)}`,
      type: type === "book" ? "Book" : "Block",
      title: `${type === "book" ? "Booking" : "Block"} request for ${room}`,
      faculty: "Dr. Ananya Mehta",
      count: 0, date, slots,
      requirements: desc || "No specific reason provided.",
      status: "Requested"
    });
    addSystemNotification(`Faculty requested ${type === "book" ? "booking" : "block"} for room ${room} on ${date}, Slots ${slots.join(", ")}`);
    showToast("Request sent to Admin approval queue.");
  }

  closeModal();
  renderFacilitiesScreen();
};


// Faculty Manage Class Modal
window.openManageClassModal = function(key) {
  const daySchedule = state.cellData[state.currentDate] || {};
  const course = daySchedule[key];
  if (!course) return;

  const parts = key.split("-");
  const room = parts[0] + "-" + parts[1];
  const slot = parts[2];

  openGenericModal(`Manage: ${course.title}`, `
    <p class="helper" style="margin-bottom:16px;">${room} &mdash; Slot ${slot}</p>
    <div class="form-card">
      <div class="field">
        <span>Action</span>
        <select id="manageClassAction">
          <option value="room-change">Request Room Change</option>
          <option value="report-issue">Report Issue with Room</option>
          <option value="mark-virtual">Mark as Virtual Class</option>
          <option value="cancel">Cancel Class</option>
        </select>
      </div>
      <div class="field" id="manageClassReasonField">
        <span>Reason / Requirements</span>
        <textarea id="manageClassReason" placeholder="Provide context for this action..."></textarea>
      </div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Close</button>
        <button class="btn primary" onclick="submitManageClassAction('${key}')">Confirm Action</button>
      </div>
    </div>
  `);
};

window.submitManageClassAction = function(key) {
  const daySchedule = state.cellData[state.currentDate] || {};
  const course = daySchedule[key];
  if (!course) return;

  const parts = key.split("-");
  const room = parts[0] + "-" + parts[1];
  const slot = parts[2];

  const action = $("#manageClassAction").value;
  const reason = $("#manageClassReason").value;
  
  if (action === "room-change") {
    // Send to Admin approvals
    state.approvalRequests.push({
      id: `REQ-${Date.now().toString().slice(-2)}`,
      type: "Move",
      title: `Move ${course.title}`,
      faculty: course.faculty,
      count: course.count || 45,
      date: state.currentDate,
      slots: [slot],
      requirements: reason || "No specific reason provided.",
      status: "Requested"
    });
    addSystemNotification(`Requested room change for ${course.title}.`);
    showToast("Room change request sent to Admin.");
  } else if (action === "report-issue") {
    // Send to Facilities
    state.issues.push({
      id: `ISS-${Date.now().toString().slice(-2)}`,
      room: room,
      description: reason || `Issue reported during ${course.title}`,
      reportedBy: course.faculty,
      date: state.currentDate,
      status: "Requested"
    });
    addSystemNotification(`Reported issue in ${room}.`);
    showToast("Issue reported to Facilities.");
  } else if (action === "mark-virtual") {
    facultyMarkVirtual(key);
  } else if (action === "cancel") {
    facultyCancelEvent(key);
  }
  
  closeModal();
};


// Facilities Proactive Logging
window.openFacilitiesLogIssueModal = function() {
  const rooms = getFlatRooms().map(r => `<option value="${r.id}">${r.id} (Cap: ${r.capacity})</option>`).join("");
  openGenericModal("Log Maintenance Issue", `
    <div class="form-card">
      <div class="field">
        <span>Room</span>
        <select id="facLogRoom">
          <option value="">-- Select Room --</option>
          ${rooms}
        </select>
      </div>
      <div class="field">
        <span>Description</span>
        <textarea id="facLogDesc" placeholder="Describe the issue..."></textarea>
      </div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="submitFacilitiesIssue()">Log Issue</button>
      </div>
    </div>
  `);
};

window.submitFacilitiesIssue = function() {
  const room = $("#facLogRoom")?.value;
  const desc = $("#facLogDesc")?.value;
  
  if (!room || !desc) {
    showToast("Please select a room and describe the issue.");
    return;
  }
  
  const newId = `ISS-${Date.now().toString().slice(-2)}`;
  state.issues.push({
    id: newId,
    room: room,
    description: desc,
    reportedBy: "Facilities Team",
    date: state.currentDate,
    status: "Requested"
  });
  state.selectedIssueId = newId;
  
  addSystemNotification(`Facilities proactively logged issue in ${room}.`);
  showToast("Issue logged to inbox.");
  
  closeModal();
  renderFacilitiesScreen();
};

// Admin Proactive Dispatch Logging
window.openAdminDispatchIssueModal = function() {
  const rooms = getFlatRooms().map(r => `<option value="${r.id}">${r.id} (Cap: ${r.capacity})</option>`).join("");
  openGenericModal("Dispatch Facilities", `
    <div class="form-card">
      <div class="field">
        <span>Room to Inspect / Fix</span>
        <select id="adminDispatchRoom">
          <option value="">-- Select Room --</option>
          ${rooms}
        </select>
      </div>
      <div class="field">
        <span>Details / Instructions</span>
        <textarea id="adminDispatchDesc" placeholder="e.g. Please check the projector bulb..."></textarea>
      </div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="submitAdminDispatchIssue()">Dispatch Facilities</button>
      </div>
    </div>
  `);
};

window.submitAdminDispatchIssue = function() {
  const room = $("#adminDispatchRoom")?.value;
  const desc = $("#adminDispatchDesc")?.value;
  
  if (!room || !desc) {
    showToast("Please select a room and provide details.");
    return;
  }
  
  state.issues.push({
    id: `ISS-${Date.now().toString().slice(-2)}`,
    room: room,
    description: desc,
    reportedBy: "Admin",
    date: state.currentDate,
    status: "Requested"
  });
  
  addSystemNotification(`Admin dispatched Facilities to ${room}.`);
  showToast("Facilities team dispatched.");
  
  closeModal();
  renderFacilitiesScreen();
  renderIssuesKanban();
};

// Facilities view rendering & actions (Screen E)
function renderFacilitiesScreen() {
  const opsList = $(".ops-list");
  if (!opsList) return;
  
  // Render facilities inbox issue logs
  const inbox = $("#facilitiesInboxList") || $(".table-card");
  let inboxHtml = `<div class="table-row head"><span>Inbox Issue</span><span>Status</span><span>Reported By</span></div>`;
  
  state.issues.forEach(issue => {
    inboxHtml += `
      <div class="table-row ${state.selectedIssueId === issue.id ? 'warning-row' : ''}" style="cursor:pointer;" onclick="selectFacilityIssue('${issue.id}')">
        <span><strong>${issue.room}</strong>: ${issue.description}</span>
        <span class="tag requested">${issue.status}</span>
        <span>${issue.reportedBy}</span>
      </div>
    `;
  });
  inbox.innerHTML = inboxHtml;
  
  // Render current operations status list
  const daySchedule = state.cellData[state.currentDate] || {};
  let opsHtml = "";
  const rooms = getFlatRooms();
  
  rooms.forEach(r => {
    // Find active bookings in Slot 1/2
    const occ1 = daySchedule[`${r.id}-1`];
    const occ2 = daySchedule[`${r.id}-2`];
    let desc = "Operational";
    let tag = "approved";
    
    if (occ1 && occ1.status === "blocked") { desc = `Blocked: ${occ1.reason}`; tag = "blocked"; }
    else if (occ2 && occ2.status === "blocked") { desc = `Blocked: ${occ2.reason}`; tag = "blocked"; }
    else if (occ1) { desc = `Slot 1: ${occ1.title}`; tag = "requested"; }
    else if (occ2) { desc = `Slot 2: ${occ2.title}`; tag = "requested"; }
    
    opsHtml += `
      <article>
        <strong>${r.id}</strong>
        <span>${desc}</span>
        <em class="tag ${tag}">${tag === "approved" ? "OK" : tag === "blocked" ? "Maintenance" : "In Use"}</em>
      </article>
    `;
  });
  
  opsList.innerHTML = opsHtml;
}

window.selectFacilityIssue = function(issueId) {
  state.selectedIssueId = issueId;
  renderFacilitiesScreen();
};

// Mark an issue as resolved without needing a room block (for minor issues)
window.markIssueResolved = function(issueId) {
  const issue = state.issues.find(i => i.id === issueId);
  if (!issue) return;
  issue.status = "Resolved";
  addSystemNotification(`Facilities confirmed issue on Room ${issue.room} is resolved. No room block required.`);
  showToast(`Issue on Room ${issue.room} marked as resolved.`);
  renderFacilitiesScreen();
};

// Complete maintenance and unblock a room
window.unblockRoom = function(issueId) {
  const issue = state.issues.find(i => i.id === issueId);
  if (!issue) return;
  
  issue.status = "Resolved";
  
  // Find any blocks for this room today and release them
  const daySchedule = state.cellData[state.currentDate] || {};
  let blocksReleased = 0;
  for (let k in daySchedule) {
    if (k.startsWith(issue.room + "-") && daySchedule[k].status === "blocked") {
      delete daySchedule[k];
      blocksReleased++;
    }
  }
  
  addSystemNotification(`Maintenance complete. Room ${issue.room} is now unblocked and available.`);
  showToast(`Room unblocked. Released ${blocksReleased} slots.`);
  renderFacilitiesScreen();
  renderScheduleGrid();
};


// Validate issue and open block range modal
$("#validateIssueBtn").addEventListener("click", () => {
  const issue = state.issues.find(i => i.id === state.selectedIssueId);
  if (!issue) {
    showToast("Please select an issue from the inbox list first.");
    return;
  }
  
  if (issue.status === "Resolved") {
    showToast("This issue is already resolved.");
    return;
  }
  
  if (issue.status === "In Progress") {
    openGenericModal("Facilities: Maintenance Complete", `
      <div class="form-card">
        <div style="padding: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; margin-bottom: 16px; font-size: 13px;">
          <strong>Issue: ${issue.room}</strong><br/>
          <span style="color: var(--text-muted);">This room is currently blocked for maintenance.</span>
        </div>
        <p style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">Is the maintenance work complete?</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn primary" onclick="closeModal(); unblockRoom('${issue.id}')" style="text-align:left; padding:14px;">
            <strong style="display:block;">✓ Maintenance Complete - Unblock Room</strong>
            <span style="font-size:12px; opacity:0.8;">Marks issue as resolved and releases the room block.</span>
          </button>
        </div>
        <div class="cta-row" style="margin-top: 16px;">
          <button class="btn" onclick="closeModal()">Cancel</button>
        </div>
      </div>
    `);
    return;
  }
  
  openGenericModal("Facilities: Validate Issue", `
    <div class="form-card">
      <div style="padding: 12px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; margin-bottom: 16px; font-size: 13px;">
        <strong>Issue: ${issue.room}</strong><br/>
        <span style="color: var(--text-muted);">${issue.description}</span><br/>
        <span style="color: var(--text-muted); font-size: 11px;">Reported by: ${issue.reportedBy}</span>
      </div>
      <p style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">How do you want to handle this?</p>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn primary" onclick="closeModal(); markIssueResolved('${issue.id}')" style="text-align:left; padding:14px;">
          <strong style="display:block;">✓ Mark as Resolved</strong>
          <span style="font-size:12px; opacity:0.8;">Minor issue fixed on-site. No room block needed.</span>
        </button>
        <button class="btn" onclick="openFacBlockModal('${issue.id}')" style="text-align:left; padding:14px;">
          <strong style="display:block;">⚠ Request Room Block</strong>
          <span style="font-size:12px; opacity:0.8;">Issue requires extended downtime. Admin approval needed.</span>
        </button>
      </div>
      <div class="cta-row" style="margin-top: 16px;">
        <button class="btn" onclick="closeModal()">Close</button>
      </div>
    </div>
  `);
});

// Open the actual block request form (called from validate modal)
window.openFacBlockModal = function(issueId) {
  const issue = state.issues.find(i => i.id === issueId);
  if (!issue) return;
  openGenericModal("Request Room Block from Admin", `
    <div class="form-card">
      <div class="field">
        <span>Room to Block</span>
        <input id="facBlockRoom" value="${issue.room}" disabled />
      </div>
      <div class="field">
        <span>Proposed Date</span>
        <input id="facBlockDate" type="date" value="${state.currentDate}" />
      </div>
      <div class="field">
        <span>Select Slots to Block</span>
        <div class="segmented fac-slots-picker">
          <button type="button" class="active" onclick="this.classList.toggle('active')">Slot 1 (9-10)</button>
          <button type="button" class="active" onclick="this.classList.toggle('active')">Slot 2 (10-11)</button>
          <button type="button" class="active" onclick="this.classList.toggle('active')">Slot 3 (11-12)</button>
          <button type="button" onclick="this.classList.toggle('active')">Slot 4 (1-2)</button>
          <button type="button" onclick="this.classList.toggle('active')">Slot 5 (2-3)</button>
          <button type="button" onclick="this.classList.toggle('active')">Slot 6 (3-4)</button>
        </div>
      </div>
      <div class="field">
        <span>Validation Details</span>
        <textarea id="facBlockReason" placeholder="Validation notes...">Verified: ${issue.description}. Complete system isolation required.</textarea>
      </div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="submitFacilitiesBlockRequest()">Submit Request to Admin</button>
      </div>
    </div>
  `);
};

window.submitFacilitiesBlockRequest = function() {
  const room = $("#facBlockRoom").value;
  const date = $("#facBlockDate").value;
  const reason = $("#facBlockReason").value;
  
  // Gather selected slots
  const slots = [];
  const buttons = $$(".fac-slots-picker button");
  buttons.forEach((btn, idx) => {
    if (btn.classList.contains("active")) {
      slots.push(idx + 1);
    }
  });
  
  if (slots.length === 0) {
    showToast("Please select at least 1 slot to block.");
    return;
  }
  
  // Add to Admin approvals requests
  state.approvalRequests.push({
    id: `REQ-${Date.now().toString().slice(-2)}`,
    type: "Block",
    title: `Maintenance Block: Room ${room}`,
    faculty: `Facilities (R. Kulkarni)`,
    count: 0,
    date: date,
    roomId: room,
    slots: slots,
    requirements: `Safety Block: ${reason}`,
    status: "Requested",
    issueId: state.selectedIssueId
  });
  
  // Set issue status to Validation Requested
  const issue = state.issues.find(i => i.id === state.selectedIssueId);
  if (issue) {
    issue.status = "Requested Block";
  }
  
  addSystemNotification(`Facilities manager validated issue on room ${room} and requested a block for Slots: ${slots.join(", ")}.`);
  showToast("Issue validated and block request submitted to Admin.");
  closeModal();
  renderFacilitiesScreen();
  renderRequestsScreen();
};

// Student home screen logic (Screen F)
function renderStudentHome() {
  const container = $("#studentTimelineContainer");
  if (!container) return;
  
  const d = new Date(state.currentDate);
  const jsDay = d.getDay(); // 0 = Sunday
  const isWeekend = state.calendarConfig.offDays.includes(jsDay);
  const holidayEvent = state.calendarConfig.events.find(e => e.date === state.currentDate && e.type === "holiday");
  
  const upNextBanner = $("#studentUpNextBanner");
  const upNextTitle = $("#studentUpNextTitle");
  const upNextLabel = $("#studentUpNextLabel");
  const upNextMeta = $("#studentUpNextMeta");
  
  if (isWeekend || holidayEvent) {
    if (upNextBanner) {
      upNextBanner.style.background = "linear-gradient(135deg, #10b981 0%, #047857 100%)";
      upNextLabel.innerText = "Enjoy your day off!";
      upNextTitle.innerText = holidayEvent ? holidayEvent.name : "Weekend / Off-Day";
      if (upNextMeta) upNextMeta.style.display = "none";
    }
    
    container.innerHTML = `
      <div style="text-align:center; padding: 48px; border: 1px dashed var(--line-strong); border-radius: var(--radius); color: var(--text-muted);">
        <p>No classes scheduled for today.</p>
      </div>`;
    return;
  }
  
  // Normal Day logic
  if (upNextBanner) {
      upNextBanner.style.background = "linear-gradient(135deg, var(--booked) 0%, #1e3a8a 100%)";
      upNextLabel.innerText = "Up Next";
      upNextTitle.innerText = "CS101 Data Structures";
      if (upNextMeta) upNextMeta.style.display = "flex";
  }

  const daySchedule = state.cellData[state.currentDate] || {};
  let html = "";
  
  // Hardcoded mapping representing a specific student's registered cohort pattern
  const classesToRender = [
    { slot: 1, time: "9:00 AM", course: "MA201 Linear Algebra", prof: "Prof. Suresh Iyer" },
    { slot: 2, time: "10:00 AM", course: "CS101 Data Structures", prof: "Dr. Ananya Mehta" },
    { slot: 3, time: "11:00 AM", course: "MA-T Tutorial: Probability", prof: "Prof. R. Subramanian" },
    { slot: 4, time: "1:00 PM", course: "PHY Lab - Optics", prof: "Prof. Suresh Iyer" },
    { slot: 5, time: "2:00 PM", course: "Guest Talk: Product in India", prof: "Prof. Rao" }
  ];
  
  classesToRender.forEach((item, index) => {
    let scheduledRoom = null;
    let isVirtual = false;
    let isCancelled = false;
    let statusClass = index === 1 ? "var(--booked)" : "var(--text-muted)";
    let bgStyle = index === 1 ? "border-color: var(--booked-border); background: var(--booked-bg);" : "";
    let dotStyle = index === 1 ? "background: var(--booked); box-shadow: 0 0 0 3px var(--booked-border);" : (index === 0 ? "background: var(--line-strong);" : "background: white; border: 2px solid var(--line-strong);");
    let opacityStyle = index === 0 ? "opacity: 0.6;" : "";
    
    for (let k in daySchedule) {
      if (daySchedule[k].courseId && item.course.includes(daySchedule[k].courseId)) {
        const parts = k.split("-");
        scheduledRoom = parts[0] + "-" + parts[1];
        if (daySchedule[k].status === "virtual") isVirtual = true;
        if (daySchedule[k].status === "cancelled") isCancelled = true;
        break;
      }
    }
    
    // Default fallback if not found in grid (not mapped via builder for the demo)
    if (!scheduledRoom) scheduledRoom = item.course.includes("CS101") ? "C-201" : (item.course.includes("PHY") ? "D-LAB-2" : "A-101");
    if (item.course.includes("Guest")) scheduledRoom = "F-AUD-01";

    if (isVirtual) scheduledRoom = "Virtual Delivery";
    if (isCancelled) scheduledRoom = "Cancelled";

    if (isCancelled) {
      statusClass = "var(--blocked)";
      bgStyle = "border-color: var(--blocked-border); background: var(--blocked-bg);";
    } else if (isVirtual) {
      statusClass = "var(--pending)";
      bgStyle = "border-color: var(--pending-border); background: var(--pending-bg);";
    }

    html += `
      <div class="timeline-item" style="position: relative; ${opacityStyle}">
        <div style="position: absolute; left: -27px; top: 16px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; ${dotStyle}"></div>
        <div class="poi-card" style="margin: 0; display: grid; grid-template-columns: 100px 1fr; align-items: center; ${bgStyle}">
          <div style="font-weight: 600; font-size: 14px; color: ${statusClass};">${item.time}</div>
          <div>
            <strong style="display: block; margin-bottom: 4px;">${item.course}</strong>
            <span style="font-size: 13px; color: var(--text-muted);">${isVirtual || isCancelled ? scheduledRoom : 'Room ' + scheduledRoom} • ${item.prof}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Room Directory rendering (Screen G)
function renderRoomsScreen() {
  const list = $("#roomList");
  if (!list) return;
  
  const rooms = getFlatRooms();
  list.innerHTML = rooms.map(r => `
    <div class="room-item" onclick="selectRoomInDirectory('${r.id}')">
      <strong>Room ${r.id}</strong>
      <span>Type: ${r.type} &middot; Capacity: ${r.capacity} &middot; Amenities: ${r.amenities}</span>
    </div>
  `).join("");
}

// Global role switching (RBAC)
window.setRole = function(role) {
  state.currentRole = role;
  document.body.className = `role-${role}`;

  // Role-based nav: define which screens each persona can access
  const roleNav = {
    admin: ["dashboard", "schedule", "rooms", "requests", "exams", "issues", "notifications", "directory", "master-schedule", "settings"],
    faculty: ["faculty", "notifications", "directory"],
    facilities: ["facilities", "issues"],
    student: ["student", "directory"]
  };
  const allowed = roleNav[role] || [];
  $$(".nav-item").forEach(btn => {
    const screen = btn.dataset.screen;
    btn.style.display = allowed.includes(screen) ? "" : "none";
  });

  // Highlight active role chip
  $$("[data-role-target]").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.roleTarget === role)
  );

  // Navigate to role home screen
  const home = { admin: "schedule", faculty: "faculty", facilities: "facilities", student: "student" };
  showScreen(home[role] || "schedule");

  // Render profile card
  const profilePanel = $("#roleProfile");
  if (profilePanel) {
    const profiles = {
      admin:      ["AS", "Asha Sharma",      "Timetabling Admin"],
      faculty:    ["AM", "Dr. Ananya Mehta", "Faculty &bull; CSE"],
      facilities: ["RK", "R. Kulkarni",      "Facilities Manager"],
      student:    ["AS", "Ananya Sharma",    "B.Tech CSE III Yr"]
    };
    const [initials, name, desc] = profiles[role] || profiles.admin;
    profilePanel.innerHTML = `
      <div class="role-avatar-fallback">${initials}</div>
      <div class="role-profile-details">
        <strong>${name}</strong>
        <span>${desc}</span>
      </div>
    `;
  }

  showToast(`Signed in as ${role.charAt(0).toUpperCase() + role.slice(1)}.`);
  
  // Re-render directory to update role-based controls
  renderDirectory();
};

// Page Screen Navigations
window.showScreen = function(screenId) {
  $$(".screen").forEach(s => s.classList.add("hidden"));
  $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.screen === screenId));
  const screen = $(`#${screenId}`);
  if (screen) screen.classList.remove("hidden");

  const title = $("#pageTitle");
  const subtitle = $("#pageSubtitle");
  const titles = {
    schedule: [formatDate(state.currentDate), "SCHEDULE COCKPIT"],
    calendar: ["University Calendar", "TIME & DATES"],
    dashboard: ["Dashboard Overview", "CAMPUS OVERVIEW"],
    rooms: ["Classroom Directory", "CAMPUS GRID"],
    requests: ["Approvals Workspace", "REQUESTS QUEUE"],
    exams: ["Exams & Bulk Block", "BULK OPERATIONS"],
    issues: ["Issues & Maintenance", "MAINTENANCE QUEUE"],
    notifications: ["Notifications Centre", "ANNOUNCEMENTS"],
    directory: ["My University", "CAMPUS DIRECTORY"],
    faculty: ["Faculty Schedule", "FACULTY PORTAL"],
    facilities: ["Maintenance Operations", "FACILITIES CENTRAL"],
    student: ["My Class Schedule", "STUDENT PORTAL"],
    settings: ["Settings & Infrastructure", "ADMIN CONFIG"],
    "master-schedule": ["Master Scheduling", "ACADEMIC PLANNING"]
  };
  if (titles[screenId]) {
    if (title) title.textContent = titles[screenId][0];
    if (subtitle) subtitle.textContent = titles[screenId][1];
  }

  if (screenId === "schedule") renderScheduleGrid();
  else if (screenId === "calendar") renderCalendar();
  else if (screenId === "dashboard") renderDashboard();
  else if (screenId === "rooms") renderRoomsScreen();
  else if (screenId === "requests") renderRequestsScreen();
  else if (screenId === "exams") renderBulkRooms();
  else if (screenId === "issues") renderIssuesKanban();
  else if (screenId === "faculty") renderFacultyHome();
  else if (screenId === "facilities") renderFacilitiesScreen();
  else if (screenId === "student") renderStudentHome();
  else if (screenId === "settings") renderSettingsScreen();
  else if (screenId === "master-schedule") renderMasterScheduling();
};

// ─── Dashboard ────────────────────────────────────────────────
function renderDashboard() {
  const daySchedule = state.cellData[state.currentDate] || {};
  let booked = 0, blocked = 0, vacant = 0, pending = 0;
  const totalRooms = getFlatRooms().length;
  const totalSlots = totalRooms * 6;
  for (let k in daySchedule) {
    const s = daySchedule[k].status;
    if (s === "booked") booked++;
    else if (s === "blocked") blocked++;
    else if (s === "pending") pending++;
  }
  vacant = totalSlots - booked - blocked - pending;

  const grid = $("#dashboard .dashboard-grid");
  if (!grid) return;
  grid.innerHTML = `
    <article class="hero-panel">
      <p class="eyebrow">Today, ${formatDate(state.currentDate)}</p>
      <h2>Campus load: ${Math.round((booked/totalSlots)*100)}%</h2>
      <p>${booked} slots booked across ${totalRooms} rooms in 8 blocks.</p>
      <button class="btn primary" data-screen="schedule" onclick="showScreen('schedule')">Open cockpit</button>
    </article>
    <article class="widget-card">
      <h3>Booked</h3>
      <div class="value" style="color:var(--booked)">${booked}</div>
      <p style="font-size:12px;color:var(--text-muted);margin-top:6px;">slots occupied today</p>
    </article>
    <article class="widget-card">
      <h3>Vacant</h3>
      <div class="value" style="color:var(--vacant)">${vacant}</div>
      <p style="font-size:12px;color:var(--text-muted);margin-top:6px;">slots available now</p>
    </article>
    <article class="widget-card">
      <h3>Pending</h3>
      <div class="value" style="color:var(--pending)">${state.approvalRequests.filter(r=>r.status==="Requested").length}</div>
      <p style="font-size:12px;color:var(--text-muted);margin-top:6px;">approvals waiting</p>
    </article>
  `;
}

// ─── Issues Kanban (dynamic) ──────────────────────────────────
function renderIssuesKanban() {
  const kanban = $("#issues .kanban");
  if (!kanban) return;
  const columns = ["Requested", "Requested Block", "In Progress", "Resolved"];
  kanban.innerHTML = columns.map(col => {
    const cards = state.issues.filter(i => i.status === col);
    return `
      <article>
        <h3>${col}</h3>
        ${cards.length === 0 ? `<p style="font-size:12px;color:var(--text-muted);padding:8px 0;">No issues</p>` : ""}
        ${cards.map(issue => `
          <div class="issue-card ${state.selectedIssueId === issue.id ? 'selected' : ''}"
               onclick="selectFacilityIssue('${issue.id}')">
            <strong>${issue.room}</strong>
            <span>${issue.description}</span>
            <span style="font-size:10px;color:var(--text-muted);">By: ${issue.reportedBy} · ${issue.date}</span>
          </div>
        `).join("")}
      </article>
    `;
  }).join("");
}

// ─── Bulk Room / Exam Block ───────────────────────────────────
const selectedBulkRooms = new Set();

function renderBulkRooms() {
  const grid = $("#bulkRoomGrid");
  if (!grid) return;
  const filter = $("#bulkBuildingFilter")?.value || "All buildings";
  const rooms = getFlatRooms().filter(r =>
    filter === "All buildings" || `${r.buildingCode}: ${r.buildingName}` === filter
  );
  grid.innerHTML = rooms.map(r => `
    <div class="bulk-room-card ${selectedBulkRooms.has(r.id) ? 'active' : ''}"
         onclick="toggleBulkRoom('${r.id}', this)">
      <strong>${r.id}</strong>
      <span style="font-size:11px;color:var(--text-muted);">${r.type} · ${r.capacity} seats</span>
    </div>
  `).join("");
  const countEl = $("#bulkSelectedCount");
  if (countEl) countEl.textContent = selectedBulkRooms.size;

  // Wire filter
  $("#bulkBuildingFilter")?.addEventListener("change", renderBulkRooms);
  $("#toggleBulkRooms")?.addEventListener("click", () => {
    const visible = getFlatRooms().filter(r => filter === "All buildings" || `${r.buildingCode}: ${r.buildingName}` === filter);
    const allSel = visible.every(r => selectedBulkRooms.has(r.id));
    visible.forEach(r => allSel ? selectedBulkRooms.delete(r.id) : selectedBulkRooms.add(r.id));
    renderBulkRooms();
    if (typeof updateBulkImpact === 'function') updateBulkImpact();
  });
}

window.toggleBulkRoom = function(roomId, el) {
  if (selectedBulkRooms.has(roomId)) { selectedBulkRooms.delete(roomId); el.classList.remove("active"); }
  else { selectedBulkRooms.add(roomId); el.classList.add("active"); }
  const c = $("#bulkSelectedCount"); if (c) c.textContent = selectedBulkRooms.size;
  if (typeof updateBulkImpact === 'function') updateBulkImpact();
};

window.applyExamBlock = function() {
  const from = $("#examFromDate")?.value || state.currentDate;
  const to   = $("#examToDate")?.value   || state.currentDate;
  const type   = $("#bulkBlockType")?.value  || "Exam";
  const reason = $("#bulkBlockReason")?.value || "Exam block";
  const policy = $("#bulkConflictPolicy")?.value || "resolve-later";
  const slots  = Array.from($$(".exam-slots button.active")).map(b => {
    const m = b.textContent.match(/^(\d)/); return m ? Number(m[1]) : null;
  }).filter(Boolean);

  if (selectedBulkRooms.size === 0) { showToast("Select at least one room first."); return; }
  if (slots.length === 0) { showToast("Select at least one slot."); return; }

  let suspendedCount = 0;
  let displacedCount = 0;

  let d = new Date(from);
  const end = new Date(to);
  while (d <= end) {
    const dateStr = d.toISOString().slice(0, 10);
    state.cellData[dateStr] = state.cellData[dateStr] || {};

    selectedBulkRooms.forEach(roomId => {
      slots.forEach(slot => {
        const key = `${roomId}-${slot}`;
        const existing = state.cellData[dateStr][key];

        if (existing && existing.status === "booked") {
          if (policy === "skip") {
            // Don't block — leave class in place
            return;
          } else if (policy === "exam-period") {
            // Suspend: stash class, don't push to unassigned queue
            state.suspendedClasses[dateStr] = state.suspendedClasses[dateStr] || [];
            state.suspendedClasses[dateStr].push({
              ...existing,
              originalRoom: roomId,
              originalSlot: slot
            });
            suspendedCount++;
          } else {
            // resolve-later: push to unassigned queue as before
            state.unassignedClasses[dateStr] = state.unassignedClasses[dateStr] || [];
            state.unassignedClasses[dateStr].push({
              title: existing.title,
              faculty: existing.faculty,
              count: existing.count,
              courseId: existing.courseId,
              requirements: existing.requirements,
              originalSlot: slot,
              originalRoom: roomId
            });
            displacedCount++;
          }
        }

        state.cellData[dateStr][key] = {
          status: "blocked",
          reason: `${type}: ${reason}`,
          faculty: "Admin"
        };
      });
    });

    d.setDate(d.getDate() + 1);
  }

  const summary = policy === "exam-period"
    ? `Exam Period block applied. ${suspendedCount} class${suspendedCount === 1 ? "" : "es"} suspended — rooms freed for exams. Use "End Exam Period" to restore.`
    : `Bulk block applied to ${selectedBulkRooms.size} rooms.${ displacedCount > 0 ? ` ${displacedCount} displaced class${displacedCount === 1 ? "" : "es"} moved to unassigned queue.` : "" }`;

  addSystemNotification(summary);
  showToast(policy === "exam-period" ? `${suspendedCount} classes suspended. Rooms cleared for exams.` : `Bulk block applied to ${selectedBulkRooms.size} rooms.`);

  selectedBulkRooms.clear();
  renderBulkRooms();
  updateExamPeriodBanner();
  const box = $("#bulkImpactBox");
  if (box) box.textContent = summary;
};

window.updateBulkImpact = function() {
  const box = $("#bulkImpactBox");
  if (!box) return;
  const policy = $("#bulkConflictPolicy")?.value || "resolve-later";
  const slots = Array.from($$(".exam-slots button.active")).length;
  const conflicts = Array.from(selectedBulkRooms).reduce((acc, roomId) => {
    for (let s = 1; s <= 6; s++) {
      const cell = state.cellData[state.currentDate]?.[`${roomId}-${s}`];
      if (cell?.status === "booked") acc++;
    }
    return acc;
  }, 0);

  const policyNote = policy === "exam-period"
    ? ` · ${conflicts} class${conflicts === 1 ? "" : "es"} will be suspended (not lost).`
    : policy === "skip"
    ? ` · ${conflicts} conflicted room${conflicts === 1 ? "" : "s"} will be skipped.`
    : ` · ${conflicts} conflict${conflicts === 1 ? "" : "s"} → unassigned queue.`;

  box.textContent = `${selectedBulkRooms.size} rooms · ${slots} slots${policyNote} on ${formatDate(state.currentDate)}.`;
};

// ─── Exam Period — suspend & restore ─────────────────────────

// Restore all suspended classes back to the schedule grid
window.endExamPeriod = function() {
  let restoredCount = 0;
  const dates = Object.keys(state.suspendedClasses);

  dates.forEach(dateStr => {
    const list = state.suspendedClasses[dateStr] || [];
    state.cellData[dateStr] = state.cellData[dateStr] || {};

    list.forEach(cls => {
      const key = `${cls.originalRoom}-${cls.originalSlot}`;
      const occupant = state.cellData[dateStr][key];

      if (occupant && occupant.status === "blocked") {
        state.unassignedClasses[dateStr] = state.unassignedClasses[dateStr] || [];
        state.unassignedClasses[dateStr].push({
          title: cls.title, faculty: cls.faculty, count: cls.count,
          courseId: cls.courseId, requirements: cls.requirements,
          originalSlot: cls.originalSlot, originalRoom: cls.originalRoom
        });
      } else {
        state.cellData[dateStr][key] = {
          status: "booked",
          title: cls.title, faculty: cls.faculty, count: cls.count,
          courseId: cls.courseId, requirements: cls.requirements,
          audit: `Restored from Exam Period suspension on ${state.currentDate}.`
        };
      }
      restoredCount++;
    });

    delete state.suspendedClasses[dateStr];
  });

  updateExamPeriodBanner();
  renderScheduleGrid();
  renderBulkRooms();
  addSystemNotification(`Exam Period ended. ${restoredCount} class${restoredCount === 1 ? "" : "es"} restored (or queued if room still blocked).`);
  showToast(`Exam Period ended. ${restoredCount} class${restoredCount === 1 ? "" : "es"} restored.`);
};

// Show/hide and update the exam period status banner
function updateExamPeriodBanner() {
  const banner = $("#examPeriodBanner");
  const labelEl = $("#examPeriodLabel");
  const metaEl  = $("#examPeriodMeta");
  if (!banner) return;

  const dates = Object.keys(state.suspendedClasses).filter(d => (state.suspendedClasses[d] || []).length > 0);
  const total = dates.reduce((sum, d) => sum + (state.suspendedClasses[d] || []).length, 0);

  if (total === 0) {
    banner.classList.add("hidden");
  } else {
    banner.classList.remove("hidden");
    if (labelEl) labelEl.textContent = `⏸ Exam Period active`;
    if (metaEl) metaEl.textContent = `${total} class${total === 1 ? "" : "es"} suspended across ${dates.length} date${dates.length === 1 ? "" : "s"} — rooms cleared for exams. Classes will be re-queued if room is still blocked when you end the period.`;
  }
}

// Hint text that appears below the conflict policy dropdown
window.updateConflictPolicyHint = function() {
  const hintEl = $("#conflictPolicyHint");
  if (!hintEl) return;
  const policy = $("#bulkConflictPolicy")?.value;

  const hints = {
    "resolve-later":  { show: false, text: "" },
    "exam-period": {
      show: true,
      text: "✅ Best for university-wide exams. Displaced classes are suspended (not lost) and restored in one click when exams end. If a room is still blocked at restore time, the class goes to the unassigned queue."
    },
    "skip": {
      show: true,
      text: "⚠\ufe0f Conflicted rooms will be left as-is. Only rooms with no active classes will be blocked."
    }
  };

  const hint = hints[policy] || { show: false, text: "" };
  hintEl.style.display = hint.show ? "block" : "none";
  hintEl.textContent = hint.text;
};

// ─── Settings & Infrastructure ────────────────────────────────
let isEditingSlots = false;

window.toggleEditSlots = function() {
  isEditingSlots = !isEditingSlots;
  renderSlotConfig();
};

function renderSettingsScreen() {
  renderSlotConfig();
  renderBuildingsList();
  populateInfraBuildingSelect();
  renderCalendarSettings();

  // Tab switching
  $$(".settings-tab").forEach(btn => {
    btn.onclick = () => {
      $$(".settings-tab").forEach(b => b.classList.remove("active"));
      $$(".settings-panel").forEach(p => p.classList.add("hidden"));
      btn.classList.add("active");
      $(`#settingsPanel-${btn.dataset.tab}`)?.classList.remove("hidden");
    };
  });
}

function syncSlotInputs() {
  const names = $$(".settings-slot-name");
  const times = $$(".settings-slot-time");
  names.forEach((el, i) => {
    if (slotTimes[i]) {
      slotTimes[i].name = el.value;
      slotTimes[i].time = times[i].value;
    }
  });
}

function renderSlotConfig() {
  const list = $("#slotConfigList");
  if (!list) return;

  if (!isEditingSlots) {
    list.innerHTML = slotTimes.map(s => `
      <div class="settings-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid var(--line);">
        <strong style="width: 120px;">${s.name}</strong>
        <span style="color: var(--text-muted);">${s.time}</span>
      </div>
    `).join("") + `
      <div style="margin-top: 16px;">
        <button class="btn" onclick="toggleEditSlots()" style="background: white;">Edit Configuration</button>
      </div>
    `;
    return;
  }

  list.innerHTML = slotTimes.map((s, i) => `
    <div class="settings-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <input class="settings-slot-name" data-idx="${i}" value="${s.name}" style="width:120px;padding:8px 12px;border:1px solid var(--line-strong);border-radius:6px;font-size:13px;" />
      <input class="settings-slot-time" data-idx="${i}" value="${s.time}" style="width:160px;padding:8px 12px;border:1px solid var(--line-strong);border-radius:6px;font-size:13px;" placeholder="e.g. 9-10" />
      <button class="btn sm" onclick="deleteSlot(${i})" style="padding: 8px; background: transparent; border: none; color: var(--danger); cursor: pointer;" aria-label="Delete Slot">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    </div>
  `).join("") + `
    <div style="display: flex; gap: 12px; margin-top: 24px; border-top: 1px solid var(--line); padding-top: 16px;">
      <button class="btn" onclick="addNewSlot()" style="background: white;">+ Add Slot</button>
      <button class="btn" onclick="toggleEditSlots()" style="background: white;">Cancel</button>
      <button class="btn primary" onclick="saveAllSlots()">Save Changes</button>
    </div>
  `;
}

window.saveAllSlots = function() {
  syncSlotInputs();
  isEditingSlots = false;
  showToast("Global slot configuration saved.");
  renderSlotConfig();
  if (state.currentRole === "admin") renderScheduleGrid(); // Refresh schedule headers if needed
};

window.addNewSlot = function() {
  syncSlotInputs(); // Save current unsaved edits before re-rendering
  slotTimes.push({ name: `SLOT ${slotTimes.length + 1}`, time: "TBD" });
  renderSlotConfig();
  showToast("New slot added.");
};

window.deleteSlot = function(idx) {
  syncSlotInputs(); // Save current unsaved edits before re-rendering
  slotTimes.splice(idx, 1);
  renderSlotConfig();
  showToast("Slot deleted.");
};

let isEditingBuildings = false;

window.toggleEditBuildings = function() {
  isEditingBuildings = !isEditingBuildings;
  renderBuildingsList();
};

function syncBuildingInputs() {
  const names = $$(".settings-bld-name");
  names.forEach((el, i) => {
    if (state.buildings[i]) {
      state.buildings[i].name = el.value;
    }
  });
}

function renderBuildingsList() {
  const list = $("#buildingsList");
  if (!list) return;

  if (!isEditingBuildings) {
    list.innerHTML = state.buildings.map(b => `
      <div class="settings-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid var(--line);">
        <span style="width:40px;font-weight:700;color:var(--ink);">${b.code}</span>
        <strong style="flex:1;">${b.name}</strong>
        <span style="font-size:12px;color:var(--text-muted);">${b.rooms.length} rooms</span>
      </div>
    `).join("") + `
      <div style="margin-top: 16px;">
        <button class="btn" onclick="toggleEditBuildings()" style="background: white;">Edit Configuration</button>
      </div>
    `;
    return;
  }

  list.innerHTML = state.buildings.map((b, i) => `
    <div class="settings-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="width:40px;font-weight:700;color:var(--ink);">${b.code}</span>
      <input class="settings-bld-name" data-idx="${i}" value="${b.name}" style="flex:1;padding:8px 12px;border:1px solid var(--line-strong);border-radius:6px;font-size:13px;" />
      <span style="font-size:12px;color:var(--text-muted);width:60px;">${b.rooms.length} rooms</span>
      <button class="btn sm" onclick="deleteBuilding(${i})" style="padding: 8px; background: transparent; border: none; color: var(--danger); cursor: pointer;" aria-label="Delete Building">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    </div>
  `).join("") + `
    <div style="display: flex; gap: 12px; margin-top: 24px; border-top: 1px solid var(--line); padding-top: 16px;">
      <button class="btn" onclick="openAddBuildingModal()" style="background: white;">+ Add Building</button>
      <button class="btn" onclick="toggleEditBuildings()" style="background: white;">Cancel</button>
      <button class="btn primary" onclick="saveAllBuildings()">Save Changes</button>
    </div>
  `;
}

window.saveAllBuildings = function() {
  syncBuildingInputs();
  isEditingBuildings = false;
  populateInfraBuildingSelect();
  showToast("Buildings configuration saved.");
  renderBuildingsList();
};

let isEditingCalendar = false;

window.toggleEditCalendar = function() {
  isEditingCalendar = !isEditingCalendar;
  renderCalendarSettings();
};

window.saveCalendarConfig = function() {
  state.calendarConfig.termStart = $("#configTermStart").value;
  state.calendarConfig.termEnd = $("#configTermEnd").value;
  isEditingCalendar = false;
  showToast("Academic Calendar configuration saved.");
  if ($("#scheduleGrid") && !$("#schedule").classList.contains("hidden")) renderScheduleGrid();
  if ($("#calendar") && !$("#calendar").classList.contains("hidden")) renderCalendar();
  renderCalendarSettings();
};

function renderCalendarSettings() {
  const container = $("#calendarConfigContainer");
  if (!container) return;
  
  const eventsHtml = state.calendarConfig.events.sort((a,b) => a.date.localeCompare(b.date)).map((ev, i) => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid var(--line); border-radius: var(--radius);">
      <div style="display: flex; flex-direction: column;">
        <strong style="font-size: 14px; color: ${ev.type === 'holiday' ? 'var(--danger)' : 'var(--warning)'};">${ev.name}</strong>
        <span style="font-size: 12px; color: var(--text-muted);">${formatDate(ev.date)} &middot; ${ev.type === 'holiday' ? 'University Holiday' : 'Exam Period'}</span>
      </div>
      ${isEditingCalendar ? `
      <button class="btn sm" onclick="deleteCalendarEvent(${i})" style="padding: 8px; background: transparent; border: none; color: var(--danger); cursor: pointer;" aria-label="Delete Event">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>` : ''}
    </div>
  `).join("");
  
  if (!isEditingCalendar) {
    const offDayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const activeOffDays = state.calendarConfig.offDays.map(d => offDayLabels[d]).join(", ");
    
    container.innerHTML = `
      <div style="background: white; border: 1px solid var(--line); border-radius: var(--radius); padding: 24px; margin-bottom: 24px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Term Duration</h3>
        <div style="display: flex; gap: 48px;">
          <div>
            <span style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px;">Academic Year Start</span>
            <strong style="font-size:14px;color:var(--ink);">${formatDate(state.calendarConfig.termStart)}</strong>
          </div>
          <div>
            <span style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px;">Academic Year End</span>
            <strong style="font-size:14px;color:var(--ink);">${formatDate(state.calendarConfig.termEnd)}</strong>
          </div>
        </div>
      </div>

      <div style="background: white; border: 1px solid var(--line); border-radius: var(--radius); padding: 24px; margin-bottom: 24px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Standard Weekly Off-Days</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Select which days of the week are considered standard non-working days (e.g. Weekends).</p>
        <div style="display:flex;gap:8px;">
          ${[1, 2, 3, 4, 5, 6, 0].map(val => {
            const isActive = state.calendarConfig.offDays.includes(val);
            return `<div class="builder-toggle ${isActive ? 'active' : ''}" style="cursor:default; pointer-events:none; opacity: ${isActive ? '1' : '0.5'};">${offDayLabels[val]}</div>`;
          }).join("")}
        </div>
      </div>

      <div style="background: white; border: 1px solid var(--line); border-radius: var(--radius); padding: 24px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">Custom Holidays & Events</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Add specific dates where operations are suspended or modified.</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${eventsHtml || '<p style="font-size:13px;color:var(--text-muted);">No custom events added.</p>'}
        </div>
      </div>
      
      <div style="margin-top: 16px;">
        <button class="btn" onclick="toggleEditCalendar()" style="background: white;">Edit Configuration</button>
      </div>
    `;
    return;
  }
  
  // EDIT MODE
  const offDayLabelsMap = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 0: "Sun" };
  
  container.innerHTML = `
    <div style="background: white; border: 1px solid var(--line); border-radius: var(--radius); padding: 24px; margin-bottom: 24px;">
      <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Term Duration</h3>
      <div style="display: flex; gap: 16px;">
        <label class="field" style="flex: 1;">
          <span>Academic Year Start</span>
          <input type="date" id="configTermStart" value="${state.calendarConfig.termStart}" />
        </label>
        <label class="field" style="flex: 1;">
          <span>Academic Year End</span>
          <input type="date" id="configTermEnd" value="${state.calendarConfig.termEnd}" />
        </label>
      </div>
    </div>

    <div style="background: white; border: 1px solid var(--line); border-radius: var(--radius); padding: 24px; margin-bottom: 24px;">
      <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Standard Weekly Off-Days</h3>
      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Select which days of the week are considered standard non-working days (e.g. Weekends).</p>
      <div class="builder-toggles" id="offDayToggles">
        ${[1, 2, 3, 4, 5, 6, 0].map(val => {
          const isActive = state.calendarConfig.offDays.includes(val);
          return `<button class="builder-toggle ${isActive ? 'active' : ''}" data-val="${val}" onclick="toggleCalendarOffDay(${val}, this)">${offDayLabelsMap[val]}</button>`;
        }).join("")}
      </div>
    </div>

    <div style="background: white; border: 1px solid var(--line); border-radius: var(--radius); padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <h3 style="font-size: 16px; font-weight: 600;">Custom Holidays & Events</h3>
          <p style="font-size: 13px; color: var(--text-muted);">Add specific dates where operations are suspended or modified.</p>
        </div>
        <button class="btn" onclick="openAddHolidayModal()" style="font-size: 13px;">+ Add Event</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${eventsHtml || '<p style="font-size:13px;color:var(--text-muted);">No custom events added.</p>'}
      </div>
    </div>
    
    <div style="display: flex; gap: 12px; margin-top: 24px; border-top: 1px solid var(--line); padding-top: 16px;">
      <button class="btn" onclick="toggleEditCalendar()" style="background: white;">Cancel</button>
      <button class="btn primary" onclick="saveCalendarConfig()">Save Changes</button>
    </div>
  `;
}

window.toggleCalendarOffDay = function(val, btn) {
  btn.classList.toggle("active");
  if (btn.classList.contains("active")) {
    if (!state.calendarConfig.offDays.includes(val)) state.calendarConfig.offDays.push(val);
  } else {
    state.calendarConfig.offDays = state.calendarConfig.offDays.filter(d => d !== val);
  }
  syncMasterScheduleToDaily(); // Live sync even in edit mode to show effects
};

window.deleteCalendarEvent = function(idx) {
  state.calendarConfig.events.splice(idx, 1);
  renderCalendarSettings();
};

window.openAddHolidayModal = function() {
  const dateStr = prompt("Enter event date (YYYY-MM-DD):", state.currentDate);
  if (!dateStr) return;
  const name = prompt("Enter event name (e.g. Spring Break):", "New Event");
  if (!name) return;
  const type = prompt("Enter event type (holiday or exam):", "holiday");
  
  state.calendarConfig.events.push({ date: dateStr, name, type: type === "exam" ? "exam" : "holiday" });
  renderCalendarSettings();
};



window.deleteBuilding = function(idx) {
  syncBuildingInputs(); // Save current unsaved edits before re-rendering
  const b = state.buildings[idx];
  state.buildings.splice(idx, 1);
  renderBuildingsList();
  populateInfraBuildingSelect();
  showToast(`Building ${b.code} removed.`);
};

window.openAddBuildingModal = function() {
  openGenericModal("Add New Building", `
    <div class="form-card">
      <div class="field"><span>Block Code (single letter)</span><input id="newBldCode" placeholder="e.g. I" maxlength="1" style="text-transform:uppercase;" /></div>
      <div class="field"><span>Building Name</span><input id="newBldName" placeholder="e.g. Engineering Block" /></div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="addBuilding()">Add Building</button>
      </div>
    </div>
  `);
};

window.addBuilding = function() {
  const code = $("#newBldCode")?.value.toUpperCase();
  const name = $("#newBldName")?.value;
  if (!code || !name) { showToast("Code and name are required."); return; }
  if (state.buildings.find(b => b.code === code)) { showToast(`Block ${code} already exists.`); return; }
  
  // ensure we don't wipe out unsaved inputs since Add Building uses a modal
  if (isEditingBuildings) syncBuildingInputs();
  
  state.buildings.push({ code, name, rooms: [] });
  closeModal();
  renderBuildingsList();
  populateInfraBuildingSelect();
  showToast(`Building Block ${code} — ${name} added.`);
};

function populateInfraBuildingSelect() {
  const sel = $("#infraBuildingSelect");
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = `<option value="">-- Choose Building --</option>` +
    state.buildings.map(b => `<option value="${b.code}" ${b.code === cur ? 'selected' : ''}>${b.code}: ${b.name}</option>`).join("");
}

window.renderInfraRooms = function() {
  const code = $("#infraBuildingSelect")?.value;
  const list = $("#infraRoomsList");
  const addBtn = $("#addRoomBtn");
  if (!list) return;
  if (!code) { list.innerHTML = ""; return; }
  const bld = state.buildings.find(b => b.code === code);
  if (!bld) return;
  if (addBtn) addBtn.onclick = () => openAddRoomModal(code);

  list.innerHTML = bld.rooms.length === 0
    ? `<p style="font-size:13px;color:var(--text-muted);">No rooms in this building. Add one below.</p>`
    : bld.rooms.map((r, ri) => `
      <div class="settings-row" style="align-items:flex-start;flex-direction:column;gap:10px;">
        <div style="display:flex;gap:10px;align-items:center;width:100%;">
          <strong style="min-width:80px;">${r.id}</strong>
          <span class="tag requested" style="font-size:10px;">${r.type}</span>
          <span style="font-size:12px;color:var(--text-muted);">${r.capacity} seats · ${r.amenities}</span>
          <button class="btn sm danger" style="margin-left:auto;" onclick="deleteRoom('${code}', ${ri})">Delete</button>
        </div>
        <div style="font-size:11.5px;padding-left:8px;">
          <strong style="display:block;margin-bottom:6px;color:var(--text-muted);">ENABLED SLOTS</strong>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${slotTimes.map((s, si) => {
              const enabled = !r.disabledSlots || !r.disabledSlots.includes(si + 1);
              return `<button class="btn sm ${enabled ? 'primary' : ''}" onclick="toggleRoomSlot('${code}', ${ri}, ${si + 1}, this)">${s.name}<br><small>${s.time}</small></button>`;
            }).join("")}
          </div>
        </div>
      </div>
    `).join("");
};

window.toggleRoomSlot = function(bldCode, roomIdx, slotNum, btn) {
  const bld = state.buildings.find(b => b.code === bldCode);
  const room = bld?.rooms[roomIdx];
  if (!room) return;
  room.disabledSlots = room.disabledSlots || [];
  if (room.disabledSlots.includes(slotNum)) {
    room.disabledSlots = room.disabledSlots.filter(s => s !== slotNum);
    btn.classList.add("primary");
  } else {
    room.disabledSlots.push(slotNum);
    btn.classList.remove("primary");
  }
  showToast(`Slot ${slotNum} ${room.disabledSlots.includes(slotNum) ? 'disabled' : 'enabled'} for room ${room.id}.`);
};

window.openAddRoomModal = function(bldCode) {
  const code = bldCode || $("#infraBuildingSelect")?.value;
  if (!code) { showToast("Select a building first."); return; }
  const bld = state.buildings.find(b => b.code === code);
  openGenericModal(`Add Room to Block ${code} — ${bld?.name}`, `
    <div class="form-card">
      <div class="field"><span>Room ID</span><input id="newRoomId" placeholder="e.g. ${code}-301" /></div>
      <div class="field"><span>Type</span>
        <select id="newRoomType"><option>Lecture</option><option>Seminar</option><option>Lab</option><option>Tutorial</option><option>Auditorium</option></select>
      </div>
      <div class="field"><span>Capacity (seats)</span><input id="newRoomCap" type="number" placeholder="e.g. 120" /></div>
      <div class="field"><span>Amenities</span><input id="newRoomAmen" placeholder="e.g. Projector, Accessible" /></div>
      <div class="cta-row">
        <button class="btn" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="addRoom('${code}')">Add Room</button>
      </div>
    </div>
  `);
};

window.addRoom = function(bldCode) {
  const bld = state.buildings.find(b => b.code === bldCode);
  const id = $("#newRoomId")?.value;
  const type = $("#newRoomType")?.value;
  const capacity = Number($("#newRoomCap")?.value);
  const amenities = $("#newRoomAmen")?.value || "";
  if (!id || !type || !capacity) { showToast("All fields are required."); return; }
  if (getFlatRooms().find(r => r.id === id)) { showToast(`Room ${id} already exists.`); return; }
  const isAccessible = amenities.toLowerCase().includes("access");
  bld.rooms.push({ id, type, capacity, amenities, accessible: isAccessible });
  closeModal();
  renderInfraRooms();
  showToast(`Room ${id} added to Block ${bldCode}.`);
  addSystemNotification(`New room ${id} (${type}, ${capacity} seats) added to Block ${bldCode}.`);
};

window.deleteRoom = function(bldCode, roomIdx) {
  const bld = state.buildings.find(b => b.code === bldCode);
  const room = bld?.rooms[roomIdx];
  if (!room) return;
  bld.rooms.splice(roomIdx, 1);
  renderInfraRooms();
  showToast(`Room ${room.id} removed from Block ${bldCode}.`);
};

// ─── Generic Modal Renderer

window.openGenericModal = function(title, bodyHtml) {
  const modalEl = $("#moveModal");
  if (!modalEl) return;
  $("#modalTitle").textContent = title;
  $(".steps")?.classList.add("hidden");  // null-safe: steps only exist in move wizard
  $("#modalBody").innerHTML = bodyHtml;
  modalEl.classList.remove("hidden");
};

// Date Navigator Handlers
$("#prevDateBtn").addEventListener("click", () => {
  const d = new Date(state.currentDate);
  d.setDate(d.getDate() - 1);
  state.currentDate = d.toISOString().split("T")[0];
  syncMasterScheduleToDaily();
  updateDateDisplay();
});

$("#nextDateBtn").addEventListener("click", () => {
  const d = new Date(state.currentDate);
  d.setDate(d.getDate() + 1);
  state.currentDate = d.toISOString().split("T")[0];
  syncMasterScheduleToDaily();
  updateDateDisplay();
});

$("#dateInput").addEventListener("change", (e) => {
  if (e.target.value) {
    state.currentDate = e.target.value;
    syncMasterScheduleToDaily();
    updateDateDisplay();
  }
});

function updateDateDisplay() {
  state.forceGridRender = false;
  $("#dateDisplay").textContent = state.currentDate.split("-").reverse().join("/");
  $("#dateInput").value = state.currentDate;
  $("#pageTitle").textContent = formatDate(state.currentDate);
  renderScheduleGrid();
  
  if (state.currentRole === "student") renderStudentHome();
  if (state.currentRole === "faculty") renderFacultyHome();
  if (state.currentRole === "facilities") renderFacilitiesScreen();
  
  showToast(`Switched date context to ${formatDate(state.currentDate)}`);
}

$("#todayBtn").addEventListener("click", () => {
  state.currentDate = "2026-05-26";
  updateDateDisplay();
});

// Bell dropdown toggle
$("#bellBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  $("#bellDropdown").classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  const dropdown = $("#bellDropdown");
  if (dropdown && !dropdown.classList.contains("hidden") && !e.target.closest(".bell-container")) {
    dropdown.classList.add("hidden");
  }
});

$("#clearNotificationsBtn").addEventListener("click", () => {
  state.notifications = [];
  renderBellNotifications();
  showToast("All notifications cleared.");
});

// Print schedule action
$("#printBtn").addEventListener("click", () => {
  window.print();
});

// Hook up filter changes (null-safe)
$("#buildingFilter")?.addEventListener("change", renderScheduleGrid);
$("#typeFilter")?.addEventListener("change", renderScheduleGrid);
$("#capacityFilter")?.addEventListener("change", renderScheduleGrid);
$("#amenityFilter")?.addEventListener("change", renderScheduleGrid);
$("#searchInput")?.addEventListener("input", renderScheduleGrid);

// Exams tab buttons
document.addEventListener("click", e => {
  if (e.target.closest(".exam-slots button")) {
    e.target.closest(".exam-slots button").classList.toggle("active");
    updateBulkImpact();
  }
});
$("#previewBulkImpact")?.addEventListener("click", updateBulkImpact);
$("#applyBulkBlock")?.addEventListener("click", applyExamBlock);

// Make bulk form inputs reactive
$("#bulkConflictPolicy")?.addEventListener("change", updateBulkImpact);
$("#examFromDate")?.addEventListener("change", updateBulkImpact);
$("#examToDate")?.addEventListener("change", updateBulkImpact);

// Modal close button
$("#closeModal")?.addEventListener("click", closeModal);

// ─── Login Screen Handlers ────────────────────────────────────
let pendingLoginRole = "admin";

$$('[data-login-role]').forEach(btn => {
  btn.addEventListener('click', () => {
    pendingLoginRole = btn.dataset.loginRole;
    $$('.login-role').forEach(b => b.classList.toggle('active', b === btn));
    const emailMap = {
      admin: 'admin@univ.edu',
      faculty: 'faculty@univ.edu',
      facilities: 'facilities@univ.edu',
      student: 'student@univ.edu'
    };
    const emailInput = $('#loginEmail');
    if (emailInput) emailInput.value = emailMap[pendingLoginRole];
  });
});

$('#loginSubmit')?.addEventListener('click', () => {
  document.body.classList.remove('show-login');
  updateDateDisplay();
  setRole(pendingLoginRole);
  showToast(`Signed in as ${pendingLoginRole}.`);
});

// ─── Role switcher chips (sidebar) ───────────────────────────
document.addEventListener('click', e => {
  const chip = e.target.closest('[data-role-target]');
  if (chip) setRole(chip.dataset.roleTarget);
});

// ─── Nav items & data-screen buttons ─────────────────────────
// All buttons/links with data-screen call showScreen() on click.
// This covers the sidebar nav-items AND inline CTA buttons (e.g. "Open cockpit").
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-screen]');
  if (btn && btn.dataset.screen) showScreen(btn.dataset.screen);
});

// Initial Load — body starts with show-login, so login screen shows first
renderBellNotifications();
// Set admin as default after login screen hides
// (setRole is called on loginSubmit; nothing auto-calls it on boot so login shows correctly)
// ============================================================================
// MASTER SCHEDULING MODULE (Slot-Centric)
// ============================================================================

const mockSlotGroups = [
  {
    id: "group-A",
    name: "A Group",
    pattern: "A11 + A13 + A15",
    description: "Slot 1 (Mon, Wed, Fri)",
    courses: [
      { id: "CS201", title: "Data Structures", cohort: "B.Tech CS Year 2", faculty: "Dr. Ananya Mehta", room: "A-101", capacity: 120, enrolled: 110 },
      { id: "ME301", title: "Thermodynamics", cohort: "B.Tech ME Year 3", faculty: "Dr. R. Kumar", room: "C-201", capacity: 80, enrolled: 75 },
      { id: "EE101", title: "Basic Electronics", cohort: "B.Tech EE Year 1", faculty: "Prof. S. Rao", room: "F-AUD-01", capacity: 200, enrolled: 180 },
      { id: "FIN101", title: "Corporate Finance", cohort: "MBA Year 1", faculty: "Prof. L. Das", room: "A-102", capacity: 60, enrolled: 60 }
    ]
  },
  {
    id: "group-B",
    name: "B Group",
    pattern: "B11 + B13 + B15",
    description: "Slot 2 (Mon, Wed, Fri)",
    courses: [
      { id: "MA201", title: "Linear Algebra", cohort: "B.Tech CS Year 2", faculty: "Prof. Suresh Iyer", room: "A-101", capacity: 120, enrolled: 120 },
      { id: "ME302", title: "Fluid Mechanics", cohort: "B.Tech ME Year 3", faculty: "Prof. A. Sharma", room: "C-201", capacity: 80, enrolled: 75 }
    ]
  },
  {
    id: "group-C",
    name: "C Group",
    pattern: "C12 + C14",
    description: "Slot 3 (Tue, Thu)",
    courses: [
      { id: "MGT401", title: "Strategic Management", cohort: "MBA Year 2", faculty: "Dr. V. Singh", room: "E-101", capacity: 60, enrolled: 55 },
      { id: "PSY101", title: "Intro to Psychology", cohort: "BA Humanities Year 1", faculty: "Prof. N. Gupta", room: "G-102", capacity: 90, enrolled: 85 }
    ]
  },
  {
    id: "group-D",
    name: "D Group",
    pattern: "D12 + D14",
    description: "Slot 4 (Tue, Thu)",
    courses: [
      { id: "CS305", title: "Machine Learning", cohort: "B.Tech CS Year 3", faculty: "Dr. R. Desai", room: "A-101", capacity: 120, enrolled: 115 },
      { id: "ENG201", title: "World Literature", cohort: "BA English Year 2", faculty: "Prof. K. Sen", room: "G-101", capacity: 60, enrolled: 45 }
    ]
  },
  {
    id: "group-F",
    name: "F Group",
    pattern: "F11 + F12 + F14",
    description: "Slot 6 (Mon, Tue, Thu)",
    courses: [
      { id: "CS201-L", title: "Data Structures Lab", cohort: "B.Tech CS Year 2", faculty: "Dr. Ananya Mehta", room: "D-LAB-1", capacity: 40, enrolled: 35 },
      { id: "ME301-L", title: "Thermo Lab", cohort: "B.Tech ME Year 3", faculty: "Dr. R. Kumar", room: "D-LAB-2", capacity: 30, enrolled: 25 }
    ]
  }
];

let activeSlotGroupId = null;

function renderMasterScheduling() {
  const slotList = $("#slotList");
  if (!slotList) return;
  
  slotList.innerHTML = mockSlotGroups.map(g => `
    <div class="cohort-item ${activeSlotGroupId === g.id ? 'active' : ''}" onclick="selectSlotGroup('${g.id}')">
      <strong>${g.name}</strong>
      <span>${g.pattern} &middot; ${g.description}</span>
    </div>
  `).join("");
  
  renderConstraintsPane();
  renderCampusOccupancyGrid(false);
}

window.selectSlotGroup = function(id) {
  activeSlotGroupId = id;
  renderMasterScheduling();
};

function renderConstraintsPane() {
  const emptyState = $("#constraintsEmptyState");
  const content = $("#constraintsContent");
  const list = $("#courseConstraintsList");
  const title = $("#activeCohortTitle");
  
  if (!activeSlotGroupId) {
    emptyState.classList.remove("hidden");
    content.classList.add("hidden");
    return;
  }
  
  const group = mockSlotGroups.find(g => g.id === activeSlotGroupId);
  if (!group) return;
  
  emptyState.classList.add("hidden");
  content.classList.remove("hidden");
  
  title.innerHTML = `${group.name} (${group.pattern})`;
  content.querySelector(".tag").innerText = `${group.courses.length} Courses`;
  
  list.innerHTML = group.courses.map(course => `
    <div class="constraint-card" style="position: relative;">
      <div class="constraint-card-header" style="padding-right: 48px;">
        <strong>${course.title} (${course.id})</strong>
        <span style="font-size: 11px; color: var(--text-muted);">${course.faculty}</span>
      </div>
      <div style="position: absolute; top: 12px; right: 12px; display: flex; gap: 4px;">
        <button onclick="editMasterCourse('${group.id}', '${course.id}')" style="background: transparent; border: none; color: var(--primary); cursor: pointer;" aria-label="Edit Course" title="Edit Course">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </button>
        <button onclick="deleteMasterCourse('${group.id}', '${course.id}')" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer;" aria-label="Delete Course" title="Delete Course">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
      <div class="workload-badges" style="justify-content: space-between; align-items: center;">
        <span class="workload-badge" style="background: transparent; border: none; padding: 0;">${course.cohort}</span>
        <span class="workload-badge" style="color:var(--primary); border-color:var(--primary);">Room: ${course.room}</span>
      </div>
    </div>
  `).join("");
}

window.deleteMasterCourse = function(groupId, courseId) {
  const group = mockSlotGroups.find(g => g.id === groupId);
  if (!group) return;
  
  const courseIdx = group.courses.findIndex(c => c.id === courseId);
  if (courseIdx === -1) return;
  
  group.courses.splice(courseIdx, 1);
  
  // Wipe out the cell data completely so sync Master Schedule regenerates cleanly
  // In a real app we'd selectively remove or just re-sync cleanly
  Object.keys(state.cellData).forEach(date => {
    state.cellData[date] = {}; 
  });
  
  syncMasterScheduleToDaily(); // Re-sync the clean grid
  
  renderMasterScheduling();
  if (state.currentRole === "admin") renderScheduleGrid(); // Refresh UI if in cockpit
  
  showToast(`Course ${courseId} removed from Master Schedule.`);
};

function renderCampusOccupancyGrid(isGenerated) {
  const container = $("#campusMapContainer");
  if (!container) return;
  
  if (!isGenerated || !activeSlotGroupId) {
    container.innerHTML = `
      <div class="empty-state" style="height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
        <p>Click "Publish Slot Matrix" to view the campus-wide classroom map for this slot.</p>
      </div>
    `;
    return;
  }
  
  const group = mockSlotGroups.find(g => g.id === activeSlotGroupId);
  
  // Extract all rooms from infrastructure
  const allRooms = getFlatRooms();
  
  // Group rooms by building
  const buildingGroups = {};
  allRooms.forEach(room => {
    if (!buildingGroups[room.building]) buildingGroups[room.building] = [];
    buildingGroups[room.building].push(room);
  });
  
  let mapHtml = `<div style="display: flex; flex-direction: column; gap: 24px;">`;
  
  Object.keys(buildingGroups).forEach(building => {
    mapHtml += `
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 13px; color: var(--text-muted); border-bottom: 1px solid var(--line); padding-bottom: 4px;">${building} Building</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px;">
    `;
    
    buildingGroups[building].forEach(room => {
      // Check if any course in the active slot group is assigned to this room
      const assignedCourse = group.courses.find(c => c.room === room.id);
      
      if (assignedCourse) {
        mapHtml += `
          <div class="constraint-card" style="border-color: var(--primary); background: #eff6ff; display: flex; flex-direction: column; gap: 4px;">
            <strong style="font-size: 13px; color: var(--primary);">${room.id}</strong>
            <span style="font-size: 11px; font-weight: 600; color: var(--text-main);">${assignedCourse.id}</span>
            <span style="font-size: 10px; color: var(--text-muted);">${assignedCourse.cohort}</span>
          </div>
        `;
      } else {
        mapHtml += `
          <div class="constraint-card" style="background: white; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px; min-height: 70px;">
            <strong style="font-size: 13px; color: var(--text-main);">${room.id}</strong>
            <span style="font-size: 10px; font-weight: 600; color: var(--vacant);">VACANT</span>
          </div>
        `;
      }
    });
    
    mapHtml += `</div></div>`;
  });
  
  mapHtml += `</div>`;
  container.innerHTML = mapHtml;
}

$("#generateTimetableBtn")?.addEventListener("click", () => {
  if (!activeSlotGroupId) {
    showToast("Please select a Slot Group first.");
    return;
  }
  
  const btn = $("#generateTimetableBtn");
  btn.innerText = "Publishing Matrix...";
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerText = "Publish Slot Matrix";
    btn.disabled = false;
    renderCampusOccupancyGrid(true);
    syncMasterScheduleToDaily(); // Sync to daily grid
    if (state.currentRole === "admin") renderScheduleGrid(); // Refresh UI if on the grid
    addSystemNotification("Global slot matrix published successfully.");
    showToast("Campus Grid generated for Slot Group.");
  }, 800);
});

// ============================================================================
// COURSE PATTERN BUILDER MODAL
// ============================================================================

let editingMasterCourseData = null;

window.openPatternBuilderModal = function() {
  editingMasterCourseData = null;
  const modal = $("#patternBuilderModal");
  if (!modal) return;
  
  // Populate Room Dropdown dynamically
  const roomSelect = $("#builderRoomSelect");
  if (roomSelect) {
    let optionsHtml = `<option value="">-- Pick an available room --</option>`;
    state.buildings.forEach(building => {
      optionsHtml += `<optgroup label="Block ${building.code} - ${building.name}">`;
      building.rooms.forEach(room => {
        optionsHtml += `<option value="${room.id}">${room.id} (${room.type}, Capacity ${room.capacity})</option>`;
      });
      optionsHtml += `</optgroup>`;
    });
    roomSelect.innerHTML = optionsHtml;
  }
  
  // Reset fields
  $("#builderCourseId").value = "";
  $("#builderCourseName").value = "";
  $("#builderFacultyName").value = "";
  $("#builderCohort").value = "";
  $("#builderEffectiveDate").value = "";
  $("#builderRoomSelect").value = "";
  const accessibilityCheckbox = $("#builderAccessibilityRequired");
  if (accessibilityCheckbox) accessibilityCheckbox.checked = false;
  
  // Reset toggles
  $$(".builder-toggle").forEach(btn => btn.classList.remove("active"));
  
  updateLivePreview();
  modal.classList.remove("hidden");
};

window.editMasterCourse = function(groupId, courseId) {
  const group = mockSlotGroups.find(g => g.id === groupId);
  if (!group) return;
  const course = group.courses.find(c => c.id === courseId);
  if (!course) return;

  editingMasterCourseData = { groupId, courseId };

  // Parse the base code. Since id is generated as baseCode + pattern - room
  // This is a rough estimation to repopulate the builder.
  // Best effort reverse engineering of the auto-generated ID:
  // Usually base code is everything before the first slot letter
  const slotLetter = group.pattern.charAt(0);
  const baseCodeSplit = course.id.split(slotLetter);
  const baseCode = baseCodeSplit.length > 0 ? baseCodeSplit[0] : course.id;

  const modal = $("#patternBuilderModal");
  if (!modal) return;

  // Populate Room Dropdown dynamically
  const roomSelect = $("#builderRoomSelect");
  if (roomSelect) {
    let optionsHtml = `<option value="">-- Pick an available room --</option>`;
    state.buildings.forEach(building => {
      optionsHtml += `<optgroup label="Block ${building.code} - ${building.name}">`;
      building.rooms.forEach(room => {
        optionsHtml += `<option value="${room.id}">${room.id} (${room.type}, Capacity ${room.capacity})</option>`;
      });
      optionsHtml += `</optgroup>`;
    });
    roomSelect.innerHTML = optionsHtml;
  }

  // Populate fields
  $("#builderCourseId").value = baseCode;
  $("#builderCourseName").value = course.title;
  $("#builderFacultyName").value = course.faculty;
  $("#builderCohort").value = course.cohort;
  $("#builderEffectiveDate").value = course.effectiveDate || "";
  $("#builderRoomSelect").value = course.room;
  const accessibilityCheckbox = $("#builderAccessibilityRequired");
  if (accessibilityCheckbox) accessibilityCheckbox.checked = course.accessibilityRequired || false;

  // Populate toggles based on group pattern (e.g. A11 + A13 + A15)
  $$(".builder-toggle").forEach(btn => btn.classList.remove("active"));
  
  const slotBtn = Array.from($$("#slotToggles .builder-toggle")).find(b => b.dataset.val === slotLetter);
  if (slotBtn) slotBtn.classList.add("active");

  const days = group.pattern.match(/\d{2}/g) || [];
  days.forEach(d => {
    const dayBtn = Array.from($$("#dayToggles .builder-toggle")).find(b => b.dataset.val === d);
    if (dayBtn) dayBtn.classList.add("active");
  });

  updateLivePreview();
  modal.classList.remove("hidden");
};

window.closePatternBuilderModal = function() {
  const modal = $("#patternBuilderModal");
  if (modal) modal.classList.add("hidden");
};

$$(".builder-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    // If it's a Slot toggle (A-F), it should be exclusive (radio behavior)
    if (btn.parentElement.id === "slotToggles") {
      $$("#slotToggles .builder-toggle").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    } 
    // If it's a Day toggle (11-15), it can be multi-select (checkbox behavior)
    else if (btn.parentElement.id === "dayToggles") {
      btn.classList.toggle("active");
    }
    updateLivePreview();
  });
});

function updateLivePreview() {
  const activeSlotBtn = $("#slotToggles .builder-toggle.active");
  const activeDayBtns = $$("#dayToggles .builder-toggle.active");
  const preview = $("#builderLivePreview");
  const idPreview = $("#builderCourseIdPreview");
  
  if (!activeSlotBtn || activeDayBtns.length === 0) {
    preview.innerText = "Select options above";
    preview.style.color = "var(--text-muted)";
    preview.style.borderColor = "var(--line)";
    preview.style.background = "#f8fafc";
    
    if (idPreview) idPreview.innerText = "Awaiting inputs...";
    return null;
  }
  
  const slotLetter = activeSlotBtn.dataset.val; // e.g. "A"
  
  // Sort days chronologically (11, 12, 13)
  const days = Array.from(activeDayBtns).map(b => b.dataset.val).sort();
  
  // Generate nomenclature: A11 + A13 + A15
  const patternParts = days.map(day => `${slotLetter}${day}`);
  const patternString = patternParts.join(" + ");
  
  preview.innerText = patternString;
  preview.style.color = "var(--primary)";
  preview.style.borderColor = "var(--primary)";
  preview.style.background = "#eff6ff";
  
  // Generate the Course ID requested by the user: Base + CompactPattern - Room
  const baseCode = $("#builderCourseId").value.trim().toUpperCase() || "[BASE]";
  const compactPattern = `${slotLetter}${days.join("+")}`; // e.g. A12+14
  const room = $("#builderRoomSelect").value || "[ROOM]";
  const fullCourseId = `${baseCode}${compactPattern}-${room}`;
  
  if (idPreview) idPreview.innerText = fullCourseId;
  
  return { patternString, fullCourseId };
}

window.submitNewCourse = function() {
  const baseCode = $("#builderCourseId").value.trim();
  const courseName = $("#builderCourseName").value.trim();
  const facultyName = $("#builderFacultyName")?.value.trim() || "TBD";
  const cohort = $("#builderCohort")?.value.trim() || "Custom Added";
  const effectiveDate = $("#builderEffectiveDate")?.value || state.currentDate;
  const room = $("#builderRoomSelect").value;
  const accessibilityRequired = $("#builderAccessibilityRequired")?.checked || false;
  
  if (!baseCode || !courseName) {
    showToast("Please enter the Base Course Code and Name.");
    return;
  }
  
  const previewData = updateLivePreview();
  if (!previewData) {
    showToast("Please select a Slot and at least one Day.");
    return;
  }
  
  const pattern = previewData.patternString;
  const courseId = previewData.fullCourseId;
  
  if (!room) {
    showToast("Please assign a classroom.");
    return;
  }
  
  const slotLetter = pattern.charAt(0); // 'A', 'B', 'F'
  
  // Conflict Validation across all groups based on overlapping blocks
  const newBlocks = pattern.split("+").map(s => s.trim());
  let conflictCourse = null;
  let conflictGroup = null;
  
  mockSlotGroups.forEach(g => {
    const existingBlocks = g.pattern.split("+").map(s => s.trim());
    const hasOverlap = newBlocks.some(b => existingBlocks.includes(b));
    if (hasOverlap) {
      const c = g.courses.find(course => course.room === room);
      if (c && (!editingMasterCourseData || c.id !== editingMasterCourseData.courseId)) {
        conflictCourse = c;
        conflictGroup = g;
      }
    }
  });

  if (conflictCourse) {
    showToast(`Conflict: Room ${room} is already assigned to ${conflictCourse.id} during overlapping slots (${conflictGroup.pattern})!`);
    return;
  }

  // If editing, remove the old course first
  if (editingMasterCourseData) {
    const oldGroup = mockSlotGroups.find(g => g.id === editingMasterCourseData.groupId);
    if (oldGroup) {
      const oldIdx = oldGroup.courses.findIndex(c => c.id === editingMasterCourseData.courseId);
      if (oldIdx !== -1) oldGroup.courses.splice(oldIdx, 1);
    }
  }

  // Find existing group with the EXACT same pattern, or create a new one
  let group = mockSlotGroups.find(g => g.pattern === pattern);
  
  if (!group) {
    group = {
      id: `group-${pattern.replace(/\s+/g, '').replace(/\+/g, '-')}`,
      name: `${slotLetter} Group`,
      pattern: pattern,
      description: `Custom Pattern (${pattern})`,
      courses: []
    };
    mockSlotGroups.push(group);
  }

  group.courses.push({
    id: courseId,
    title: courseName,
    cohort: cohort,
    faculty: facultyName,
    effectiveDate: effectiveDate,
    room: room,
    capacity: 0,
    enrolled: 0,
    accessibilityRequired: accessibilityRequired
  });
  
  // Wipe cell data to force a clean re-sync
  Object.keys(state.cellData).forEach(date => {
    state.cellData[date] = {}; 
  });

  closePatternBuilderModal();
  activeSlotGroupId = group.id; // Switch view to the new/updated group
  renderMasterScheduling();
  syncMasterScheduleToDaily(); // Sync to daily ledger
  if (state.currentRole === "admin") renderScheduleGrid(); // Refresh UI
  showToast(`${courseId} added to Master Schedule!`);
  addSystemNotification(`Course ${courseId} mapped to pattern ${pattern}.`);
};

// ============================================================================
// DATA SYNC: MASTER -> DAILY COCKPIT
// ============================================================================

function syncMasterScheduleToDaily() {
  const dateStr = state.currentDate;
  state.cellData[dateStr] = state.cellData[dateStr] || {};
  
  const d = new Date(dateStr);
  const jsDay = d.getDay(); // 0 = Sunday, 1 = Monday
  
  if (state.calendarConfig.offDays.includes(jsDay)) return; // No master courses on standard off-days
  
  const targetDay = (jsDay + 10).toString(); // 1 -> "11", 2 -> "12"...
  
  mockSlotGroups.forEach(group => {
    // e.g. group.pattern = "A11 + A13 + A15"
    const blocks = group.pattern.split("+").map(s => s.trim());
    blocks.forEach(block => {
      if (block.endsWith(targetDay)) {
        const slotLetter = block.charAt(0);
        const slotMap = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6 };
        const slotNum = slotMap[slotLetter];
        
        if (slotNum) {
          group.courses.forEach(course => {
            // Check effective date
            if (course.effectiveDate && dateStr < course.effectiveDate) {
              return; // Skip syncing this course if the sync date is before its effective start date
            }
            
            const key = `${course.room}-${slotNum}`;
            // If the cell is empty or already booked by a master course, overwrite it.
            // If it was manually modified (e.g. ad-hoc booking), we ideally wouldn't overwrite, but for demo we will.
            state.cellData[dateStr][key] = {
              status: "booked",
              title: course.title,
              faculty: course.faculty || "TBA",
              count: course.capacity || 50,
              courseId: course.id,
              requirements: course.accessibilityRequired ? "Lecture, capacity 50+, accessible" : "Synced from Master Schedule",
              accessibilityRequired: course.accessibilityRequired || false,
              audit: `Auto-published from Master Matrix (${group.name})`
            };
          });
        }
      }
    });
  });
}

// ============================================================================
// UNIVERSITY CALENDAR
// ============================================================================

function renderCalendar() {
  const grid = $("#universityCalendarGrid");
  if (!grid) return;
  
  // Hardcoded to May 2026 for demo purposes. May 1st 2026 is a Friday.
  const daysInMonth = 31;
  const startDayOfWeek = 5; // Friday (0 = Sun, 1 = Mon)
  
  let html = "";
  
  // Empty slots before May 1st
  for (let i = 0; i < startDayOfWeek; i++) {
    html += `<div class="calendar-day empty"></div>`;
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `2026-05-${i.toString().padStart(2, '0')}`;
    const d = new Date(dateStr);
    const dayOfWeek = d.getDay();
    
    const isHoliday = state.calendarConfig.events.some(e => e.date === dateStr && e.type === "holiday");
    const isExam = state.calendarConfig.events.some(e => e.date === dateStr && e.type === "exam");
    const holidayEvent = state.calendarConfig.events.find(e => e.date === dateStr);
    const isWeekend = state.calendarConfig.offDays.includes(dayOfWeek);
    let isActive = dateStr === state.currentDate;
    
    let classes = "calendar-day";
    if (isHoliday) classes += " holiday";
    else if (isExam) classes += " exam";
    if (isActive) classes += " active-day";
    
    let eventsHtml = "";
    if (isHoliday) {
      eventsHtml += `<div class="calendar-event">${holidayEvent.name}</div>`;
    } else if (isExam) {
      eventsHtml += `<div class="calendar-event">${holidayEvent.name}</div>`;
    } else if (!isWeekend) {
      // Calculate how many courses run this day
      let count = 0;
      const targetDay = (dayOfWeek + 10).toString();
      mockSlotGroups.forEach(group => {
        const blocks = group.pattern.split("+").map(s => s.trim());
        blocks.forEach(block => {
          if (block.endsWith(targetDay)) count += group.courses.length;
        });
      });
      eventsHtml += `<div class="calendar-event" style="background:#eff6ff; color:var(--primary);">${count} scheduled classes</div>`;
    }
    
    html += `
      <div class="${classes}" onclick="selectCalendarDate('${dateStr}')">
        <div class="day-num">${i}</div>
        <div class="day-events">${eventsHtml}</div>
      </div>
    `;
  }
  
  grid.innerHTML = html;
}

window.selectCalendarDate = function(dateStr) {
  state.currentDate = dateStr;
  syncMasterScheduleToDaily();
  updateDateDisplay();
  showScreen("schedule"); // Switch immediately to the Schedule Cockpit
};

// ============================================================================
// CAMPUS DIRECTORY (MY UNIVERSITY)
// ============================================================================

const mockDirectory = [
  {
    category: "🏛️ Administration",
    places: [
      { name: "Dean Academics Office", location: "H Block, Room H-204", hours: "Mon-Fri, 9:00 AM - 5:00 PM", status: "open" },
      { name: "Registrar's Office", location: "H Block, Room H-102", hours: "Mon-Fri, 9:00 AM - 4:00 PM", status: "open" },
      { name: "Accounts & Fees", location: "H Block, Room H-105", hours: "Mon-Fri, 10:00 AM - 3:00 PM", status: "closed" }
    ]
  },
  {
    category: "📚 Academic Resources",
    places: [
      { name: "Central Library", location: "A Block, Atrium", hours: "Mon-Sun, 8:00 AM - 11:00 PM", status: "open" },
      { name: "Study Rooms (Quiet Zone)", location: "B Block, B-101 to B-108", hours: "Mon-Sun, 4:00 PM - 12:00 AM", status: "closed" },
      { name: "Innovation & Maker Lab", location: "D Block, D-LAB-5", hours: "Mon-Sat, 10:00 AM - 8:00 PM", status: "open" }
    ]
  },
  {
    category: "☕ Student Life",
    places: [
      { name: "Main Cafeteria", location: "F Block, Ground Floor", hours: "Mon-Sun, 7:00 AM - 10:00 PM", status: "open" },
      { name: "Student Union Office", location: "G Block, Room G-101", hours: "Mon-Fri, 2:00 PM - 7:00 PM", status: "closed" },
      { name: "Indoor Sports Complex", location: "G Block, Basement", hours: "Mon-Sun, 6:00 AM - 11:00 PM", status: "open" }
    ]
  },
  {
    category: "⚕️ Health & Services",
    places: [
      { name: "Medical Centre", location: "H Block, Room H-011", hours: "24x7 Emergency", status: "open" },
      { name: "Campus Security", location: "Main Gate & H-001", hours: "24x7 Patrol", status: "open" },
      { name: "IT Helpdesk", location: "E Block, Room E-101", hours: "Mon-Sat, 9:00 AM - 6:00 PM", status: "open" }
    ]
  }
];

function renderDirectory(searchQuery = "") {
  const container = $("#directoryContent");
  if (!container) return;
  
  // Toggle Header Buttons based on Role
  const backBtn = $("#dirBackBtn");
  const addBtn = $("#dirAddBtn");
  if (backBtn) {
    if (state.currentRole === "student" || state.currentRole === "faculty") {
      backBtn.classList.remove("hidden");
    } else {
      backBtn.classList.add("hidden");
    }
  }
  if (addBtn) {
    if (state.currentRole === "admin") {
      addBtn.classList.remove("hidden");
    } else {
      addBtn.classList.add("hidden");
    }
  }
  
  const query = searchQuery.toLowerCase();
  let html = "";
  let hasResults = false;
  
  mockDirectory.forEach(cat => {
    // Filter places within this category
    const filteredPlaces = cat.places.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.location.toLowerCase().includes(query)
    );
    
    if (filteredPlaces.length > 0) {
      hasResults = true;
      html += `
        <div class="directory-category">
          <h3>${cat.category}</h3>
          <div class="directory-grid">
            ${filteredPlaces.map(p => `
              <div class="poi-card">
                <div class="poi-card-header">
                  <strong>${p.name}</strong>
                  <span class="poi-status ${p.status}">${p.status === 'open' ? 'Open Now' : 'Closed'}</span>
                </div>
                <div class="poi-card-body">
                  <span>📍 ${p.location}</span>
                  <span>🕒 ${p.hours}</span>
                </div>
                ${state.currentRole === "admin" ? `<button class="btn sm" style="margin-top: 8px;">Edit Listing</button>` : ''}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }
  });
  
  if (!hasResults) {
    html = `
      <div class="empty-state" style="margin-top: 48px;">
        <p>No campus locations found matching "${searchQuery}".</p>
      </div>
    `;
  }
  
  container.innerHTML = html;
}

$("#directorySearch")?.addEventListener("input", (e) => {
  renderDirectory(e.target.value);
});

$("#dirBackBtn")?.addEventListener("click", () => {
  const home = { student: "student", faculty: "faculty", admin: "schedule", facilities: "facilities" };
  showScreen(home[state.currentRole] || "schedule");
});

// Initialize the directory on load
renderDirectory();

// ============================================================================
// FIREBASE PRODUCTION INTEGRATION MODULE
// ============================================================================

let currentAppMode = localStorage.getItem("campusgrid_mode") || "offline";
let isFirebaseInitialized = false;
let fbAuth = null;
let fbDb = null;
let isSyncingFromFirebase = false;

// 1. Initial configuration check & load
let activeFbConfig = { ...firebaseConfig };
try {
  const storedConfig = localStorage.getItem("campusgrid_fb_config");
  if (storedConfig) {
    Object.assign(activeFbConfig, JSON.parse(storedConfig));
  }
} catch (e) {}

const isFbConfigActive = activeFbConfig.projectId && activeFbConfig.projectId !== "YOUR_PROJECT_ID";

if (isFbConfigActive) {
  try {
    firebase.initializeApp(activeFbConfig);
    fbAuth = firebase.auth();
    fbDb = firebase.firestore();
    isFirebaseInitialized = true;
    console.log("Firebase initialized successfully inside CampusGrid: project ID =", activeFbConfig.projectId);
  } catch (err) {
    console.error("Firebase init failed:", err);
  }
}

// 2. DOM Elements hook-up on load
document.addEventListener("DOMContentLoaded", () => {
  const modeOfflineBtn = document.getElementById("modeOfflineBtn");
  const modeFirebaseBtn = document.getElementById("modeFirebaseBtn");
  const firebaseIndicator = document.getElementById("firebaseIndicator");
  const firebaseStatusText = document.getElementById("firebaseStatusText");
  const fbApiKey = document.getElementById("fbApiKey");
  const fbProjectId = document.getElementById("fbProjectId");
  const fbAuthDomain = document.getElementById("fbAuthDomain");
  const fbStorageBucket = document.getElementById("fbStorageBucket");
  const fbMessagingSenderId = document.getElementById("fbMessagingSenderId");
  const fbAppId = document.getElementById("fbAppId");
  
  // Set initial active state of mode selector buttons
  if (currentAppMode === "firebase" && isFirebaseInitialized) {
    modeOfflineBtn?.classList.remove("active");
    modeFirebaseBtn?.classList.add("active");
  } else {
    currentAppMode = "offline";
    modeOfflineBtn?.classList.add("active");
    modeFirebaseBtn?.classList.remove("active");
  }
  
  // Update status indicator
  updateFirebaseStatusIndicator();
  
  // Event listeners for mode selector
  modeOfflineBtn?.addEventListener("click", () => {
    currentAppMode = "offline";
    localStorage.setItem("campusgrid_mode", "offline");
    modeOfflineBtn.classList.add("active");
    modeFirebaseBtn.classList.remove("active");
    updateFirebaseStatusIndicator();
    showToast("Switched to Offline Demo mode.");
  });
  
  modeFirebaseBtn?.addEventListener("click", () => {
    if (!isFirebaseInitialized) {
      showToast("Firebase is not configured! Check firebase-config.js or settings panel.");
      return;
    }
    currentAppMode = "firebase";
    localStorage.setItem("campusgrid_mode", "firebase");
    modeOfflineBtn.classList.remove("active");
    modeFirebaseBtn.classList.add("active");
    updateFirebaseStatusIndicator();
    showToast("Switched to Firebase Live mode.");
  });
  
  function updateFirebaseStatusIndicator() {
    if (!firebaseIndicator || !firebaseStatusText) return;
    if (isFirebaseInitialized) {
      if (currentAppMode === "firebase") {
        firebaseIndicator.style.background = "#10b981"; // green
        firebaseStatusText.innerText = `Firebase Live Mode (Connected to ${activeFbConfig.projectId})`;
      } else {
        firebaseIndicator.style.background = "#3b82f6"; // blue
        firebaseStatusText.innerText = "Offline Demo Mode (Firebase configuration available)";
      }
    } else {
      firebaseIndicator.style.background = "#94a3b8"; // grey
      firebaseStatusText.innerText = "Firebase not configured (offline fallback).";
    }
  }

  // Populate config fields in settings if exists
  if (fbApiKey && activeFbConfig) {
    fbApiKey.value = activeFbConfig.apiKey || "";
    fbProjectId.value = activeFbConfig.projectId || "";
    fbAuthDomain.value = activeFbConfig.authDomain || "";
    fbStorageBucket.value = activeFbConfig.storageBucket || "";
    fbMessagingSenderId.value = activeFbConfig.messagingSenderId || "";
    fbAppId.value = activeFbConfig.appId || "";
  }
  
  // Save firebase settings
  document.getElementById("saveFirebaseConfigBtn")?.addEventListener("click", () => {
    const config = {
      apiKey: fbApiKey.value.trim(),
      projectId: fbProjectId.value.trim(),
      authDomain: fbAuthDomain.value.trim(),
      storageBucket: fbStorageBucket.value.trim(),
      messagingSenderId: fbMessagingSenderId.value.trim(),
      appId: fbAppId.value.trim()
    };
    
    if (!config.apiKey || !config.projectId) {
      showToast("API Key and Project ID are required!");
      return;
    }
    
    localStorage.setItem("campusgrid_fb_config", JSON.stringify(config));
    localStorage.setItem("campusgrid_mode", "firebase");
    showToast("Firebase Config saved. Reloading page...");
    setTimeout(() => { window.location.reload(); }, 1500);
  });
  
  // Clear firebase settings
  document.getElementById("clearFirebaseConfigBtn")?.addEventListener("click", () => {
    localStorage.removeItem("campusgrid_fb_config");
    localStorage.setItem("campusgrid_mode", "offline");
    showToast("Firebase Config reset to default. Reloading...");
    setTimeout(() => { window.location.reload(); }, 1500);
  });
});

// Override the Sign-In click listener
setTimeout(() => {
  const loginSubmit = document.getElementById('loginSubmit');
  if (!loginSubmit) return;
  
  // Clone element to remove old inline/attached listeners
  const newLoginSubmit = loginSubmit.cloneNode(true);
  loginSubmit.parentNode.replaceChild(newLoginSubmit, loginSubmit);
  
  newLoginSubmit.addEventListener('click', async () => {
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    
    if (currentAppMode === 'firebase' && isFirebaseInitialized) {
      newLoginSubmit.innerText = "Signing in...";
      newLoginSubmit.disabled = true;
      
      try {
        // Sign in with Firebase auth
        const userCredential = await fbAuth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Fetch user document from Firestore to discover role/persona
        const userDoc = await fbDb.collection('users').doc(email).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const role = userData.role || 'student';
          
          console.log(`Firebase authenticated user ${email} with persona: ${role}`);
          
          // Seed the database if it doesn't have calendar configuration yet
          await seedFirestoreIfEmpty();
          
          // Load database state
          await firebaseLoad();
          
          // Activate dynamic syncing
          setupFirebaseListeners();
          
          // Log in and set role
          document.body.classList.remove('show-login');
          updateDateDisplay();
          setRole(role);
          showToast(`Logged in to Firebase as ${userData.name || email} (${role.toUpperCase()})`);
        } else {
          // If auth succeeds but user doc is missing, try default role check
          console.warn("Auth user found, but Firestore user document is missing.");
          showToast("Authenticated, but profile not found in database.");
          // Fall back to offline login role selection
          document.body.classList.remove('show-login');
          updateDateDisplay();
          setRole(pendingLoginRole);
        }
      } catch (err) {
        console.error("Firebase Login failed:", err);
        showToast(`Firebase Login Failed: ${err.message}`);
      } finally {
        newLoginSubmit.innerText = "Sign in";
        newLoginSubmit.disabled = false;
      }
    } else {
      // Offline mode normal sign-in
      document.body.classList.remove('show-login');
      updateDateDisplay();
      setRole(pendingLoginRole);
      showToast(`Signed in as ${pendingLoginRole} (Offline Demo).`);
    }
  });
}, 500);

// 3. Sync helpers
function saveState(dataType, key = null) {
  if (isSyncingFromFirebase) return; // Prevent write loops
  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    try {
      if (dataType === 'cellData') {
        const dates = key ? [key] : Object.keys(state.cellData);
        dates.forEach(date => {
          fbDb.collection('schedules').doc(date).set(state.cellData[date] || {});
        });
      } else if (dataType === 'unassignedClasses') {
        const dates = key ? [key] : Object.keys(state.unassignedClasses);
        dates.forEach(date => {
          fbDb.collection('unassigned').doc(date).set({ list: state.unassignedClasses[date] || [] });
        });
      } else if (dataType === 'issues') {
        if (key) {
          const issue = state.issues.find(i => i.id === key);
          if (issue) {
            fbDb.collection('issues').doc(key).set(issue);
          } else {
            fbDb.collection('issues').doc(key).delete();
          }
        } else {
          state.issues.forEach(issue => {
            fbDb.collection('issues').doc(issue.id).set(issue);
          });
        }
      } else if (dataType === 'approvalRequests') {
        if (key) {
          const req = state.approvalRequests.find(r => r.id === key);
          if (req) {
            fbDb.collection('approvalRequests').doc(key).set(req);
          } else {
            fbDb.collection('approvalRequests').doc(key).delete();
          }
        } else {
          state.approvalRequests.forEach(req => {
            fbDb.collection('approvalRequests').doc(req.id).set(req);
          });
        }
      } else if (dataType === 'calendarConfig') {
        fbDb.collection('config').doc('calendar').set(state.calendarConfig);
      } else if (dataType === 'mockSlotGroups') {
        if (key) {
          const group = mockSlotGroups.find(g => g.id === key);
          if (group) {
            fbDb.collection('masterSchedule').doc(key).set(group);
          } else {
            fbDb.collection('masterSchedule').doc(key).delete();
          }
        } else {
          mockSlotGroups.forEach(group => {
            fbDb.collection('masterSchedule').doc(group.id).set(group);
          });
        }
      }
    } catch (err) {
      console.error(`Failed to save state [${dataType}] to Firebase:`, err);
    }
  }
}

// Load from DB
async function firebaseLoad() {
  if (!isFirebaseInitialized) return;
  isSyncingFromFirebase = true;
  
  try {
    // 1. Calendar
    const calDoc = await fbDb.collection('config').doc('calendar').get();
    if (calDoc.exists) {
      state.calendarConfig = calDoc.data();
    }
    
    // 2. Schedules
    const schedulesSnap = await fbDb.collection('schedules').get();
    schedulesSnap.forEach(doc => {
      state.cellData[doc.id] = doc.data();
    });
    
    // 3. Unassigned
    const unassignedSnap = await fbDb.collection('unassigned').get();
    unassignedSnap.forEach(doc => {
      state.unassignedClasses[doc.id] = doc.data().list || [];
    });
    
    // 4. Issues
    const issuesSnap = await fbDb.collection('issues').get();
    const loadedIssues = [];
    issuesSnap.forEach(doc => {
      loadedIssues.push(doc.data());
    });
    if (loadedIssues.length > 0) state.issues = loadedIssues;
    
    // 5. Approvals
    const approvalsSnap = await fbDb.collection('approvalRequests').get();
    const loadedApprovals = [];
    approvalsSnap.forEach(doc => {
      loadedApprovals.push(doc.data());
    });
    if (loadedApprovals.length > 0) state.approvalRequests = loadedApprovals;
    
    // 6. Master schedule
    const masterSnap = await fbDb.collection('masterSchedule').get();
    const loadedMaster = [];
    masterSnap.forEach(doc => {
      loadedMaster.push(doc.data());
    });
    if (loadedMaster.length > 0) {
      mockSlotGroups.length = 0;
      loadedMaster.forEach(item => mockSlotGroups.push(item));
    }
    
    console.log("State successfully loaded from Firestore.");
  } catch (err) {
    console.error("Error loading state from Firestore:", err);
  } finally {
    isSyncingFromFirebase = false;
  }
}

// Real-time listener setups
function setupFirebaseListeners() {
  if (!isFirebaseInitialized) return;
  
  // Schedules listener
  fbDb.collection('schedules').onSnapshot(snap => {
    if (isSyncingFromFirebase) return;
    isSyncingFromFirebase = true;
    let changed = false;
    snap.docChanges().forEach(change => {
      if (change.type === "added" || change.type === "modified") {
        state.cellData[change.doc.id] = change.doc.data();
        changed = true;
      }
    });
    isSyncingFromFirebase = false;
    if (changed) refreshActiveViews();
  });
  
  // Unassigned listener
  fbDb.collection('unassigned').onSnapshot(snap => {
    if (isSyncingFromFirebase) return;
    isSyncingFromFirebase = true;
    let changed = false;
    snap.docChanges().forEach(change => {
      if (change.type === "added" || change.type === "modified") {
        state.unassignedClasses[change.doc.id] = change.doc.data().list || [];
        changed = true;
      }
    });
    isSyncingFromFirebase = false;
    if (changed) refreshActiveViews();
  });

  // Issues listener
  fbDb.collection('issues').onSnapshot(snap => {
    if (isSyncingFromFirebase) return;
    isSyncingFromFirebase = true;
    let changed = false;
    snap.docChanges().forEach(change => {
      const issueData = change.doc.data();
      const idx = state.issues.findIndex(i => i.id === change.doc.id);
      if (change.type === "added" || change.type === "modified") {
        if (idx !== -1) {
          state.issues[idx] = issueData;
        } else {
          state.issues.push(issueData);
        }
        changed = true;
      } else if (change.type === "removed") {
        if (idx !== -1) {
          state.issues.splice(idx, 1);
          changed = true;
        }
      }
    });
    isSyncingFromFirebase = false;
    if (changed) refreshActiveViews();
  });

  // Approvals listener
  fbDb.collection('approvalRequests').onSnapshot(snap => {
    if (isSyncingFromFirebase) return;
    isSyncingFromFirebase = true;
    let changed = false;
    snap.docChanges().forEach(change => {
      const reqData = change.doc.data();
      const idx = state.approvalRequests.findIndex(r => r.id === change.doc.id);
      if (change.type === "added" || change.type === "modified") {
        if (idx !== -1) {
          state.approvalRequests[idx] = reqData;
        } else {
          state.approvalRequests.push(reqData);
        }
        changed = true;
      } else if (change.type === "removed") {
        if (idx !== -1) {
          state.approvalRequests.splice(idx, 1);
          changed = true;
        }
      }
    });
    isSyncingFromFirebase = false;
    if (changed) refreshActiveViews();
  });
}

function refreshActiveViews() {
  // Re-render UI based on current view/role
  if (state.currentRole === "admin") {
    renderScheduleGrid();
    renderDetailsPanel();
  } else if (state.currentRole === "faculty") {
    renderFacultyHome();
  } else if (state.currentRole === "facilities") {
    renderFacilitiesScreen();
  } else if (state.currentRole === "student") {
    renderStudentHome();
  }
}

// Seeder logic
async function seedFirestoreIfEmpty() {
  try {
    const doc = await fbDb.collection('config').doc('calendar').get();
    if (!doc.exists) {
      console.log("Firestore is empty. Seeding initial mock data...");
      
      await fbDb.collection('config').doc('calendar').set(state.calendarConfig);
      
      for (const date in state.cellData) {
        await fbDb.collection('schedules').doc(date).set(state.cellData[date]);
      }
      
      for (const date in state.unassignedClasses) {
        await fbDb.collection('unassigned').doc(date).set({ list: state.unassignedClasses[date] });
      }
      
      for (const issue of state.issues) {
        await fbDb.collection('issues').doc(issue.id).set(issue);
      }
      
      for (const req of state.approvalRequests) {
        await fbDb.collection('approvalRequests').doc(req.id).set(req);
      }
      
      for (const group of mockSlotGroups) {
        await fbDb.collection('masterSchedule').doc(group.id).set(group);
      }
      
      const mockUsers = [
        { email: "admin@univ.edu", name: "Varun Sharma (Admin)", role: "admin" },
        { email: "faculty@univ.edu", name: "Dr. Ananya Mehta", role: "faculty", taughtCourses: ["CS101", "CS102", "CS201-L"] },
        { email: "facilities@univ.edu", name: "Harpreet Singh", role: "facilities" },
        { email: "student@univ.edu", name: "Rahul Verma", role: "student", enrolledCourses: ["CS101", "MA201", "PHY204-L"] }
      ];
      
      for (const user of mockUsers) {
        await fbDb.collection('users').doc(user.email).set(user);
      }
      
      console.log("Firestore successfully seeded!");
    }
  } catch (err) {
    console.error("Firestore Seeding failed:", err);
  }
}

// Monkey-patch render methods to trigger Firestore updates
const originalRenderScheduleGrid = renderScheduleGrid;
renderScheduleGrid = function(...args) {
  originalRenderScheduleGrid.apply(this, args);
  saveState('cellData', state.currentDate);
  saveState('unassignedClasses', state.currentDate);
};

const originalRenderRequestsScreen = renderRequestsScreen;
renderRequestsScreen = function(...args) {
  if (originalRenderRequestsScreen) originalRenderRequestsScreen.apply(this, args);
  saveState('approvalRequests');
};

const originalRenderFacilitiesScreen = renderFacilitiesScreen;
renderFacilitiesScreen = function(...args) {
  if (originalRenderFacilitiesScreen) originalRenderFacilitiesScreen.apply(this, args);
  saveState('issues');
};

const originalRenderSettingsScreen = renderSettingsScreen;
renderSettingsScreen = function(...args) {
  if (originalRenderSettingsScreen) originalRenderSettingsScreen.apply(this, args);
  saveState('calendarConfig');
};

const originalRenderMasterScheduling = renderMasterScheduling;
renderMasterScheduling = function(...args) {
  if (originalRenderMasterScheduling) originalRenderMasterScheduling.apply(this, args);
  saveState('mockSlotGroups');
};
