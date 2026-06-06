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


const defaultSystemDate = (localStorage.getItem("campusgrid_mode") || "offline") === "firebase" 
  ? new Date().toISOString().split('T')[0] 
  : "2026-05-26";

// Global State
const state = {
  currentDate: defaultSystemDate, // Default system date context
  currentRole: "admin",      // Active RBAC role
  selectedCell: null,        // Selected grid cell coordinates
  modalStep: 1,              // Wizard step pointer
  selectedRequestId: null,   // Selected request in approvals queue
  selectedUnassignedId: null,// Selected unassigned class
  selectedIssueId: "ISS-01",  // Active facilities issue card
  university: null,          // University branding config
  currentUserProfile: null,  // Active logged-in user profile
  users: [                   // Roster database
    { email: "admin@univ.edu", name: "Varun Sharma (Admin)", role: "admin", roles: ["admin"] },
    { email: "faculty@univ.edu", name: "Dr. Ananya Mehta", role: "faculty", roles: ["faculty"], taughtCourses: ["CS101", "CS102", "CS201-L"] },
    { email: "facilities@univ.edu", name: "Harpreet Singh", role: "facilities", roles: ["facilities"] },
    { email: "student@univ.edu", name: "Rahul Verma", role: "student", roles: ["student"], enrolledCourses: ["CS101", "MA201", "PHY204-L"] }
  ],

  
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
  { name: "SLOT 1", time: "09:00 AM - 10:00 AM", startTime: "09:00", endTime: "10:00" },
  { name: "SLOT 2", time: "10:00 AM - 11:00 AM", startTime: "10:00", endTime: "11:00" },
  { name: "SLOT 3", time: "11:00 AM - 12:00 PM", startTime: "11:00", endTime: "12:00" },
  { name: "SLOT 4", time: "01:00 PM - 02:00 PM", startTime: "13:00", endTime: "14:00" },
  { name: "SLOT 5", time: "02:00 PM - 03:00 PM", startTime: "14:00", endTime: "15:00" },
  { name: "SLOT 6", time: "03:00 PM - 04:00 PM", startTime: "15:00", endTime: "16:00" }
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
  if (!list || !badge) return;
  
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
  grid.style.gridTemplateColumns = `140px repeat(${slotTimes.length}, 1fr)`;

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
        for (let slot = 1; slot <= slotTimes.length; slot++) {
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
      <div class="grid-building-header" style="grid-column: span ${slotTimes.length + 1};">
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

      // Slots
      for (let slot = 1; slot <= slotTimes.length; slot++) {
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
  saveState('cellData', state.currentDate);
  saveState('unassignedClasses', state.currentDate);
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
  saveState('cellData', state.currentDate);
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
  saveState('cellData', state.currentDate);
  saveState('unassignedClasses', state.currentDate);
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
  
  saveState('cellData', state.currentDate);
  saveState('approvalRequests');
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
  saveState('cellData', state.currentDate);
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
  saveState('cellData', state.currentDate);
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
  saveState('cellData', state.currentDate);
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
  saveState('approvalRequests');
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
  saveState('cellData', req.date);
  saveState('unassignedClasses', req.date);
  saveState('approvalRequests');
  saveState('issues');
  renderRequestsScreen();
  renderScheduleGrid();
};

// Faculty Home rendering & actions (Screen D)
function renderFacultyAlerts(facultyCourses) {
  const alertStrip = $("#facultyAlertStrip");
  if (!alertStrip) return;
  
  const userProfile = state.currentUserProfile;
  if (!userProfile) return;

  const classCount = facultyCourses.length;
  const pendingRequests = state.approvalRequests.filter(r => 
    r.facultyEmail === userProfile.email && r.status === "pending"
  ).length;
  
  // Find next class chronologically
  const nowHour = new Date().getHours();
  const activeClasses = facultyCourses.filter(c => c.status !== "cancelled");
  let nextClassText = "No more classes today";
  if (activeClasses.length > 0) {
    const nextClass = activeClasses.find(c => {
      const timeStr = c.time || "";
      const startHour = parseInt(timeStr.split("-")[0]) || 0;
      return startHour > nowHour;
    }) || activeClasses[0];
    nextClassText = `Next: ${nextClass.title} in Room ${nextClass.room} (Slot ${nextClass.slot})`;
  }

  alertStrip.innerHTML = `
    <button class="alert-pill">${classCount} class${classCount === 1 ? "" : "es"} today</button>
    <button class="alert-pill warning">${pendingRequests} request${pendingRequests === 1 ? "" : "s"} pending</button>
    <button class="alert-pill">${nextClassText}</button>
  `;
}

function renderFacultyHome() {
  const container = $("#facultyCardsContainer");
  if (!container) return;

  const userProfile = state.currentUserProfile;
  if (!userProfile) {
    container.innerHTML = `
      <div style="text-align:center; padding: 48px; border: 1px dashed var(--line-strong); border-radius: var(--radius); color: var(--text-muted);">
        <p>Please sign in to view your schedule.</p>
      </div>`;
    return;
  }

  const daySchedule = state.cellData[state.currentDate] || {};
  
  const isFacultyClass = (cell) => {
    if (!cell) return false;
    // 1. Match by email
    if (cell.facultyEmail && userProfile.email && cell.facultyEmail.trim().toLowerCase() === userProfile.email.trim().toLowerCase()) {
      return true;
    }
    // 2. Match by exact name
    if (cell.faculty && userProfile.name && cell.faculty.trim().toLowerCase() === userProfile.name.trim().toLowerCase()) {
      return true;
    }
    // 3. Fallback: match by taughtCourses
    if (userProfile.taughtCourses && Array.isArray(userProfile.taughtCourses)) {
      const baseId = cell.courseId ? cell.courseId.split('-')[0].toLowerCase() : "";
      const lowerTaught = userProfile.taughtCourses.map(c => c.trim().toLowerCase());
      if (lowerTaught.includes(baseId)) {
        return true;
      }
    }
    // 4. Fallback: name contains their last name
    if (cell.faculty && userProfile.name) {
      const lastName = userProfile.name.split(" ").pop();
      if (lastName && lastName.length > 2 && cell.faculty.toLowerCase().includes(lastName.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  // Extract all courses belonging to this faculty on the current day
  const facultyCourses = [];
  for (let key in daySchedule) {
    const cell = daySchedule[key];
    if (isFacultyClass(cell)) {
      const parts = key.split("-");
      const room = parts.slice(0, parts.length - 1).join("-");
      const slot = parts[parts.length - 1];
      facultyCourses.push({ key, room, slot, ...cell });
    }
  }

  // Render dynamic alert strip
  renderFacultyAlerts(facultyCourses);

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
  
  const profName = state.currentUserProfile?.name || "Faculty";
  addSystemNotification(`${profName} marked a class virtual. Room is released.`);
  showToast("Class delivery set to virtual. Room is released instantly.");
  renderFacultyHome();
  if (state.currentRole === "admin") renderScheduleGrid();
  
  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    saveState('cellData', state.currentDate);
  }
};

window.facultyCancelEvent = function(targetKey) {
  const daySchedule = state.cellData[state.currentDate] || {};
  
  if (targetKey && daySchedule[targetKey]) {
    daySchedule[targetKey].status = "cancelled"; // Changed from delete to flag
  }
  
  const profName = state.currentUserProfile?.name || "Faculty";
  addSystemNotification(`A class was cancelled by ${profName}.`);
  showToast("Class cancelled. Room is released instantly.");
  renderFacultyHome();
  if (state.currentRole === "admin") renderScheduleGrid();
  
  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    saveState('cellData', state.currentDate);
  }
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

  // Render facilities alert strip
  const alertStrip = $("#facilitiesAlertStrip");
  if (alertStrip) {
    const activeIssues = state.issues.filter(i => i.status === "Reported" || i.status === "Pending Block").length;
    const blocksAwaitingAdmin = state.approvalRequests.filter(r => r.type === "maintenance" && r.status === "pending").length;
    const totalRooms = getFlatRooms().length;
    
    alertStrip.innerHTML = `
      <button class="alert-pill danger">${activeIssues} active issue${activeIssues === 1 ? "" : "s"}</button>
      <button class="alert-pill warning">${blocksAwaitingAdmin} block request${blocksAwaitingAdmin === 1 ? "" : "s"} pending</button>
      <button class="alert-pill">${totalRooms} classrooms operational</button>
    `;
  }
  
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
function renderStudentNotices(classesToRender) {
  const noticesContainer = $("#studentNoticesList");
  if (!noticesContainer) return;
  
  let noticesHtml = "";
  
  // 1. Course exceptions (virtual / cancelled)
  classesToRender.forEach(item => {
    if (item.status === "virtual") {
      noticesHtml += `
        <div class="student-notice warning" style="padding: 12px; border-radius: 6px; background: var(--pending-bg); border: 1px solid var(--pending-border);">
          <strong style="display: block; color: var(--pending); font-size: 14px; margin-bottom: 4px;">${item.course} has moved virtual today</strong>
          <span style="font-size: 12px; color: var(--text-muted);">Updated by ${item.prof}. Room ${item.room} released.</span>
        </div>
      `;
    } else if (item.status === "cancelled") {
      noticesHtml += `
        <div class="student-notice warning" style="padding: 12px; border-radius: 6px; background: var(--blocked-bg); border: 1px solid var(--blocked-border);">
          <strong style="display: block; color: var(--blocked); font-size: 14px; margin-bottom: 4px;">${item.course} is cancelled today</strong>
          <span style="font-size: 12px; color: var(--text-muted);">Slot ${item.slot} (${item.time}) cancellation.</span>
        </div>
      `;
    }
  });

  // 2. System-wide announcements
  const generalNotifs = state.notifications || [];
  if (generalNotifs.length > 0) {
    generalNotifs.slice(0, 3).forEach(notif => {
      noticesHtml += `
        <div class="student-notice" style="padding: 12px; border-radius: 6px; background: var(--bg); border: 1px solid var(--line);">
          <strong style="display: block; font-size: 14px; margin-bottom: 4px;">Announcement</strong>
          <span style="font-size: 12px; color: var(--text-muted);">${notif.message} (${notif.time})</span>
        </div>
      `;
    });
  }

  if (!noticesHtml) {
    noticesHtml = `
      <div style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 12px;">
        No active notices for today.
      </div>
    `;
  }
  
  noticesContainer.innerHTML = noticesHtml;
}

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
    renderStudentNotices([]);
    return;
  }
  
  const userProfile = state.currentUserProfile;
  if (!userProfile) {
    container.innerHTML = `
      <div style="text-align:center; padding: 48px; border: 1px dashed var(--line-strong); border-radius: var(--radius); color: var(--text-muted);">
        <p>Please sign in to view your schedule.</p>
      </div>`;
    return;
  }

  const daySchedule = state.cellData[state.currentDate] || {};
  const classesToRender = [];

  const isEnrolled = (course) => {
    if (!course) return false;
    if (course.students && Array.isArray(course.students)) {
      if (course.students.some(s => (s.email || "").trim().toLowerCase() === userProfile.email.toLowerCase())) {
        return true;
      }
    }
    if (userProfile.enrolledCourses && Array.isArray(userProfile.enrolledCourses)) {
      const lowerEnrolled = userProfile.enrolledCourses.map(c => c.trim().toLowerCase());
      if (lowerEnrolled.includes(course.id.toLowerCase())) return true;
      const baseId = course.id.split('-')[0].toLowerCase();
      if (lowerEnrolled.includes(baseId)) return true;
    }
    return false;
  };

  for (let key in daySchedule) {
    const cell = daySchedule[key];
    if (!cell || !cell.courseId) continue;

    let courseObj = null;
    for (const group of mockSlotGroups) {
      courseObj = group.courses.find(c => c.id === cell.courseId);
      if (courseObj) break;
    }

    let isStudentEnrolled = false;
    if (courseObj) {
      isStudentEnrolled = isEnrolled(courseObj);
    } else {
      if (userProfile.enrolledCourses && Array.isArray(userProfile.enrolledCourses)) {
        const lowerEnrolled = userProfile.enrolledCourses.map(c => c.trim().toLowerCase());
        const cellCourseBase = cell.courseId.split('-')[0].toLowerCase();
        isStudentEnrolled = lowerEnrolled.some(ec => 
          cellCourseBase.includes(ec) || cell.title.toLowerCase().includes(ec)
        );
      }
    }

    if (isStudentEnrolled) {
      const parts = key.split("-");
      const slotNum = parseInt(parts[parts.length - 1]);
      const slotInfo = slotTimes[slotNum - 1] || { name: `Slot ${slotNum}`, time: "TBD" };
      classesToRender.push({
        slot: slotNum,
        time: slotInfo.time || `${slotInfo.startTime} - ${slotInfo.endTime}`,
        course: cell.title || (courseObj ? courseObj.title : cell.courseId.split('-')[0]),
        courseId: cell.courseId,
        prof: cell.faculty || "TBA",
        room: parts.slice(0, parts.length - 1).join("-"),
        status: cell.status || "booked",
        cellKey: key,
        cell: cell
      });
    }
  }

  // Sort chronologically by slot index
  classesToRender.sort((a, b) => a.slot - b.slot);

  if (classesToRender.length === 0) {
    if (upNextBanner) {
      upNextBanner.style.background = "linear-gradient(135deg, #10b981 0%, #047857 100%)";
      upNextLabel.innerText = "Enjoy your day off!";
      upNextTitle.innerText = "No classes scheduled";
      if (upNextMeta) upNextMeta.style.display = "none";
    }
    
    container.innerHTML = `
      <div style="text-align:center; padding: 48px; border: 1px dashed var(--line-strong); border-radius: var(--radius); color: var(--text-muted);">
        <p>No classes scheduled for today.</p>
      </div>`;
    renderStudentNotices([]);
    return;
  }

  const upNextClass = classesToRender.find(c => c.status !== "cancelled") || classesToRender[0];
  if (upNextBanner && upNextClass) {
      upNextBanner.style.background = "linear-gradient(135deg, var(--booked) 0%, #1e3a8a 100%)";
      upNextLabel.innerText = "Up Next";
      upNextTitle.innerText = upNextClass.course;
      if (upNextMeta) {
        upNextMeta.style.display = "flex";
        upNextMeta.innerHTML = `
          <div style="display:flex; align-items:center; gap:6px; margin-right:16px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Slot ${upNextClass.slot} (${upNextClass.time})</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Room ${upNextClass.status === "virtual" ? "Virtual Delivery" : upNextClass.room}</span>
          </div>
        `;
      }
  }

  let html = "";
  classesToRender.forEach((item, index) => {
    let scheduledRoom = item.room;
    let isVirtual = item.status === "virtual";
    let isCancelled = item.status === "cancelled";
    let statusClass = "var(--text-muted)";
    let bgStyle = "";
    let dotStyle = "background: white; border: 2px solid var(--line-strong);";
    let opacityStyle = "";
    
    if (item === upNextClass) {
      statusClass = "var(--booked)";
      bgStyle = "border-color: var(--booked-border); background: var(--booked-bg);";
      dotStyle = "background: var(--booked); box-shadow: 0 0 0 3px var(--booked-border);";
    } else if (classesToRender.indexOf(item) < classesToRender.indexOf(upNextClass)) {
      opacityStyle = "opacity: 0.6;";
      dotStyle = "background: var(--line-strong);";
    }
    
    if (isVirtual) {
      scheduledRoom = "Virtual Delivery";
      statusClass = "var(--pending)";
      bgStyle = "border-color: var(--pending-border); background: var(--pending-bg);";
    }
    if (isCancelled) {
      scheduledRoom = "Cancelled";
      statusClass = "var(--blocked)";
      bgStyle = "border-color: var(--blocked-border); background: var(--blocked-bg);";
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
  renderStudentNotices(classesToRender);
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
  document.body.classList.remove('show-login');
  if (typeof closeLoginModal === 'function') closeLoginModal();
  if (typeof closeRegisterModal === 'function') closeRegisterModal();

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
    let initials = "AS";
    let name = "User";
    let desc = "Timetabling Admin";
    
    if (currentAppMode === 'firebase' && state.currentUserProfile) {
      name = state.currentUserProfile.name || name;
      const roleStr = state.currentUserProfile.role || role;
      desc = roleStr.toUpperCase();
      if (roleStr === 'admin') desc = "Administrator";
      else if (roleStr === 'faculty') desc = "Faculty";
      else if (roleStr === 'facilities') desc = "Facilities";
      else if (roleStr === 'student') desc = "Student";
      
      initials = name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
    } else {
      const profiles = {
        admin:      ["AS", "Asha Sharma",      "Timetabling Admin"],
        faculty:    ["AM", "Dr. Ananya Mehta", "Faculty &bull; CSE"],
        facilities: ["RK", "R. Kulkarni",      "Facilities Manager"],
        student:    ["AS", "Ananya Sharma",    "B.Tech CSE III Yr"]
      };
      const [pInitials, pName, pDesc] = profiles[role] || profiles.admin;
      initials = pInitials;
      name = pName;
      desc = pDesc;
    }
    
    profilePanel.innerHTML = `
      <div class="role-avatar-fallback">${initials}</div>
      <div class="role-profile-details" style="flex: 1; min-width: 0;">
        <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${name}</strong>
        <span>${desc}</span>
      </div>
      <button onclick="openChangePasswordModal()" style="background: none; border: none; font-size: 16px; cursor: pointer; color: var(--text-muted); padding: 4px; display: flex; align-items: center; margin-right: 4px;" title="Change Password">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
      </button>
      <button id="signOutBtn" style="background: none; border: none; font-size: 16px; cursor: pointer; color: var(--text-muted); padding: 4px; display: flex; align-items: center;" title="Sign Out">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      </button>
    `;
  }

  // Update switcher controls dynamically
  const switcher = document.querySelector('.role-switcher');
  if (switcher) {
    if (currentAppMode === 'firebase' && isFirebaseInitialized) {
      const profile = state.currentUserProfile;
      if (!profile) {
        switcher.style.display = 'none';
      } else {
        const userRoles = profile.roles || [profile.role] || [];
        if (userRoles.includes('admin')) {
          switcher.style.display = '';
          const chips = switcher.querySelectorAll('[data-role-target]');
          chips.forEach(chip => {
            chip.style.display = '';
          });
        } else if (userRoles.length > 1) {
          switcher.style.display = '';
          const chips = switcher.querySelectorAll('[data-role-target]');
          chips.forEach(chip => {
            const targetRole = chip.dataset.roleTarget;
            chip.style.display = userRoles.includes(targetRole) ? '' : 'none';
          });
        } else {
          switcher.style.display = 'none';
        }
      }
    } else {
      switcher.style.display = '';
      const chips = switcher.querySelectorAll('[data-role-target]');
      chips.forEach(chip => {
        chip.style.display = '';
      });
    }
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
  const totalSlots = totalRooms * slotTimes.length;
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
      <p>${booked} slots booked across ${totalRooms} rooms in ${state.buildings.length} blocks.</p>
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

  // Populate Needs Attention
  const attentionContainer = $("#dashboardNeedsAttentionContainer");
  if (attentionContainer) {
    const cards = [];
    
    // Check pending approval requests
    (state.approvalRequests || []).forEach(req => {
      if (req.status === "Requested") {
        cards.push(`
          <div class="issue-card" style="border: 1px solid var(--pending-border); background: var(--pending-bg); padding: 12px; border-radius: var(--radius);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--pending); font-size: 13px;">Faculty Request: ${req.title}</strong>
              <span class="poi-status" style="background: var(--pending); color: white; font-size: 10px; padding: 2px 6px;">Review</span>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px; margin-bottom: 8px;">
              ${req.faculty || "Faculty"} requested ${req.type || "Booking"} for ${req.date} (Slot ${req.slots ? req.slots.join(', ') : 'N/A'}).
            </p>
            <button class="btn sm" style="width: 100%; padding: 4px 8px; font-size: 11px;" onclick="showScreen('requests')">Go to Approvals Queue</button>
          </div>
        `);
      }
    });

    // Check active issues
    (state.issues || []).forEach(issue => {
      if (issue.status === "Requested" || issue.status === "Block Requested") {
        cards.push(`
          <div class="issue-card" style="border: 1px solid var(--blocked-border); background: var(--blocked-bg); padding: 12px; border-radius: var(--radius);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--blocked); font-size: 13px;">Room Issue: ${issue.room}</strong>
              <span class="poi-status" style="background: var(--blocked); color: white; font-size: 10px; padding: 2px 6px;">Resolve</span>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px; margin-bottom: 8px;">
              Reported by ${issue.reportedBy || "Staff"}: ${issue.description}
            </p>
            <button class="btn sm" style="width: 100%; padding: 4px 8px; font-size: 11px;" onclick="showScreen('facilities')">Go to Maintenance Kanban</button>
          </div>
        `);
      }
    });

    // Check double-booking conflicts in cellData
    const schedule = state.cellData[state.currentDate] || {};
    const slotRoomCount = {};
    for (let key in schedule) {
      if (schedule[key] && (schedule[key].status === "booked" || schedule[key].status === "blocked")) {
        // key format is Room-SlotIndex
        const parts = key.split('-');
        if (parts.length >= 2) {
          const room = parts[0];
          const slot = parts[1];
          const slotKey = `${room}-${slot}`;
          slotRoomCount[slotKey] = slotRoomCount[slotKey] || [];
          slotRoomCount[slotKey].push(schedule[key]);
        }
      }
    }

    for (let slotKey in slotRoomCount) {
      if (slotRoomCount[slotKey].length > 1) {
        const parts = slotKey.split('-');
        const room = parts[0];
        const slot = parts[1];
        const courses = slotRoomCount[slotKey].map(c => c.title || "Lecture").join(" and ");
        cards.push(`
          <div class="issue-card" style="border: 1px solid var(--danger-border, #fecaca); background: var(--danger-bg, #fef2f2); padding: 12px; border-radius: var(--radius);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--danger); font-size: 13px;">Room Conflict: ${room}</strong>
              <span class="poi-status" style="background: var(--danger); color: white; font-size: 10px; padding: 2px 6px;">Slot ${slot}</span>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px; margin-bottom: 8px;">
              Double booked: ${courses}
            </p>
            <button class="btn sm" style="width: 100%; padding: 4px 8px; font-size: 11px;" onclick="showScreen('schedule')">Resolve in Cockpit</button>
          </div>
        `);
      }
    }

    if (cards.length > 0) {
      attentionContainer.innerHTML = cards.join("");
    } else {
      attentionContainer.innerHTML = `
        <div style="text-align: center; padding: 24px 12px; color: var(--text-muted); font-size: 13px;">
          ✅ All clear! No pending conflicts or requests requiring attention.
        </div>
      `;
    }
  }

  // Populate Recent Activity
  const activityContainer = $("#dashboardRecentActivityContainer");
  if (activityContainer) {
    const list = state.notifications || [];
    if (list.length > 0) {
      activityContainer.innerHTML = list.slice(0, 5).map(notif => `
        <div style="position: relative; margin-bottom: 8px; padding-left: 4px;">
          <div style="position: absolute; left: -21px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: var(--primary);"></div>
          <p style="font-size: 13px; font-weight: 500; margin: 0; color: var(--ink);">${notif.message}</p>
          <span style="font-size: 11px; color: var(--text-muted);">${notif.time}</span>
        </div>
      `).join("");
    } else {
      activityContainer.innerHTML = `
        <div style="text-align: center; padding: 12px; color: var(--text-muted); font-size: 13px; width: 100%;">
          No recent activity recorded.
        </div>
      `;
    }
  }
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

function getDateRange(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(current.getTime()) || Number.isNaN(end.getTime()) || current > end) return dates;
  while (current <= end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

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

  const affectedDates = getDateRange(from, to);
  if (affectedDates.length === 0) { showToast("Choose a valid date range."); return; }

  affectedDates.forEach(dateStr => {
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
  });

  const summary = policy === "exam-period"
    ? `Exam Period block applied. ${suspendedCount} class${suspendedCount === 1 ? "" : "es"} suspended — rooms freed for exams. Use "End Exam Period" to restore.`
    : `Bulk block applied to ${selectedBulkRooms.size} rooms.${ displacedCount > 0 ? ` ${displacedCount} displaced class${displacedCount === 1 ? "" : "es"} moved to unassigned queue.` : "" }`;

  addSystemNotification(summary);
  affectedDates.forEach(dateStr => {
    saveState('cellData', dateStr);
    saveState('unassignedClasses', dateStr);
    saveState('suspendedClasses', dateStr);
  });
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
  const selectedSlots = Array.from($$(".exam-slots button.active")).map(b => {
    const m = b.textContent.match(/^(\d)/);
    return m ? Number(m[1]) : null;
  }).filter(Boolean);
  const from = $("#examFromDate")?.value || state.currentDate;
  const to = $("#examToDate")?.value || state.currentDate;
  const affectedDates = getDateRange(from, to);
  const conflicts = affectedDates.reduce((dateTotal, dateStr) => (
    dateTotal + Array.from(selectedBulkRooms).reduce((roomTotal, roomId) => (
      roomTotal + selectedSlots.reduce((slotTotal, slot) => {
        const cell = state.cellData[dateStr]?.[`${roomId}-${slot}`];
        return slotTotal + (cell?.status === "booked" ? 1 : 0);
      }, 0)
    ), 0)
  ), 0);

  const policyNote = policy === "exam-period"
    ? ` · ${conflicts} class${conflicts === 1 ? "" : "es"} will be suspended (not lost).`
    : policy === "skip"
    ? ` · ${conflicts} conflicted room${conflicts === 1 ? "" : "s"} will be skipped.`
    : ` · ${conflicts} conflict${conflicts === 1 ? "" : "s"} → unassigned queue.`;

  const dateLabel = affectedDates.length > 1 ? `${formatDate(affectedDates[0])} to ${formatDate(affectedDates[affectedDates.length - 1])}` : formatDate(affectedDates[0] || state.currentDate);
  box.textContent = `${selectedBulkRooms.size} rooms · ${selectedSlots.length} slots · ${affectedDates.length || 0} day${affectedDates.length === 1 ? "" : "s"}${policyNote} from ${dateLabel}.`;
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
    saveState('cellData', dateStr);
    saveState('unassignedClasses', dateStr);
    saveState('suspendedClasses', dateStr);
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

function renderSettingsScreen() {
  renderSlotConfig();
  renderBuildingsList();
  populateInfraBuildingSelect();
  renderCalendarSettings();
  renderUserDirectory(); // Populate user roster

  // Tab switching
  $$(".settings-tab").forEach(btn => {
    btn.onclick = () => {
      $$(".settings-tab").forEach(b => b.classList.remove("active"));
      $$(".settings-panel").forEach(p => p.classList.add("hidden"));
      btn.classList.add("active");
      $(`#settingsPanel-${btn.dataset.tab}`)?.classList.remove("hidden");
      if (btn.dataset.tab === "users") {
        renderUserDirectory();
      }
    };
  });
}

function getStartTimeFromStr(timeStr) {
  if (!timeStr) return "09:00";
  const clean = timeStr.replace(/\s+/g, '');
  const parts = clean.split('-');
  if (parts.length === 0) return "09:00";
  return convertTo24Hour(parts[0]);
}

function getEndTimeFromStr(timeStr) {
  if (!timeStr) return "10:00";
  const clean = timeStr.replace(/\s+/g, '');
  const parts = clean.split('-');
  if (parts.length < 2) return "10:00";
  return convertTo24Hour(parts[1]);
}

function convertTo24Hour(timePart) {
  let isPM = false;
  if (timePart.toLowerCase().includes("pm")) isPM = true;
  let cleanPart = timePart.replace(/[a-zA-Z]/g, '');
  const subparts = cleanPart.split(':');
  let hour = parseInt(subparts[0]);
  let min = subparts[1] ? parseInt(subparts[1]) : 0;
  
  if (isPM && hour < 12) hour += 12;
  if (!timePart.toLowerCase().includes("am") && !timePart.toLowerCase().includes("pm")) {
    if (hour >= 1 && hour <= 7) hour += 12;
  }
  
  return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

function format12Hour(time24) {
  if (!time24) return "TBD";
  const parts = time24.split(':');
  let hour = parseInt(parts[0]);
  let min = parseInt(parts[1]) || 0;
  let ampm = "AM";
  if (hour >= 12) {
    ampm = "PM";
    if (hour > 12) hour -= 12;
  }
  if (hour === 0) hour = 12;
  return `${hour}:${String(min).padStart(2, '0')} ${ampm}`;
}

function syncSlotInputs() {
  const names = $$(".settings-slot-name");
  const starts = $$(".settings-slot-start");
  const ends = $$(".settings-slot-end");
  names.forEach((el, i) => {
    if (slotTimes[i]) {
      slotTimes[i].name = el.value;
      const startTime = starts[i]?.value || "09:00";
      const endTime = ends[i]?.value || "10:00";
      slotTimes[i].startTime = startTime;
      slotTimes[i].endTime = endTime;
      slotTimes[i].time = `${format12Hour(startTime)} - ${format12Hour(endTime)}`;
    }
  });
}

function renderSlotConfig() {
  const list = $("#slotConfigList");
  if (!list) return;

  list.innerHTML = slotTimes.map((s, i) => {
    const startVal = s.startTime || getStartTimeFromStr(s.time);
    const endVal = s.endTime || getEndTimeFromStr(s.time);
    return `
      <div class="settings-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <input class="settings-slot-name" data-idx="${i}" value="${s.name}" style="width:120px;padding:8px 12px;border:1px solid var(--line-strong);border-radius:6px;font-size:13px;" />
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="time" class="settings-slot-start" data-idx="${i}" value="${startVal}" style="padding:8px 12px;border:1px solid var(--line-strong);border-radius:6px;font-size:13px;" />
          <span style="font-size: 13px; color: var(--text-muted);">to</span>
          <input type="time" class="settings-slot-end" data-idx="${i}" value="${endVal}" style="padding:8px 12px;border:1px solid var(--line-strong);border-radius:6px;font-size:13px;" />
        </div>
        <button class="btn sm" onclick="deleteSlot(${i})" style="padding: 8px; background: transparent; border: none; color: var(--danger); cursor: pointer;" aria-label="Delete Slot">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    `;
  }).join("") + `
    <div style="display: flex; gap: 12px; margin-top: 24px; border-top: 1px solid var(--line); padding-top: 16px;">
      <button class="btn" onclick="addNewSlot()" style="background: white;">+ Add Slot</button>
      <button class="btn primary" onclick="saveAllSlots()">Save Changes</button>
    </div>
  `;
}

window.saveAllSlots = function() {
  syncSlotInputs();
  saveState('slots');
  showToast("Global slot configuration saved.");
  renderSlotConfig();
  if (state.currentRole === "admin") renderScheduleGrid(); // Refresh schedule headers if needed
};

window.addNewSlot = function() {
  syncSlotInputs(); // Save current unsaved edits before re-rendering
  slotTimes.push({ name: `SLOT ${slotTimes.length + 1}`, time: "09:00 AM - 10:00 AM", startTime: "09:00", endTime: "10:00" });
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
  saveState('buildings');
  populateInfraBuildingSelect();
  showToast("Buildings configuration saved.");
  renderBuildingsList();
};

window.saveCalendarConfig = function() {
  const startInput = $("#configTermStart");
  const endInput = $("#configTermEnd");
  if (startInput) state.calendarConfig.termStart = startInput.value;
  if (endInput) state.calendarConfig.termEnd = endInput.value;
  saveState('calendarConfig');
  showToast("Academic calendar saved.");
  if ($("#scheduleGrid") && !$("#schedule").classList.contains("hidden")) renderScheduleGrid();
  if ($("#calendar") && !$("#calendar").classList.contains("hidden")) renderCalendar();
};

// ── Day labels helper ────────────────────────────────────────────────────────
function getDayLabels(days) {
  const map = { 0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat' };
  // Sort in week order: Mon(1) Tue(2) Wed(3) Thu(4) Fri(5) Sat(6) Sun(0)
  const ORDER = [1,2,3,4,5,6,0];
  return (days || []).slice().sort((a,b)=>ORDER.indexOf(a)-ORDER.indexOf(b)).map(d=>map[d]||d).join(' \u00b7 ');
}

// Compact slot code: S{n}-{DayLetters}  e.g. S2-MWF  or  S1-TuTh
function getSlotCode(slotIndex, days) {
  const codeMap = { 1:'M', 2:'Tu', 3:'W', 4:'Th', 5:'F', 6:'Sa', 0:'Su' };
  const ORDER = [1,2,3,4,5,6,0];
  const dayStr = (days||[]).slice().sort((a,b)=>ORDER.indexOf(a)-ORDER.indexOf(b)).map(d=>codeMap[d]||d).join('');
  return `S${slotIndex}-${dayStr}`;
}

function renderCalendarSettings() {
  const container = $("#calendarConfigContainer");
  if (!container) return;

  const offDayLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const eventsHtml = (state.calendarConfig.events || [])
    .slice().sort((a,b) => a.date.localeCompare(b.date))
    .map((ev, i) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border:1px solid var(--line);border-radius:var(--radius);background:white;">
        <div>
          <strong style="font-size:13px;color:${ev.type==='holiday'?'var(--danger)':'var(--warning)'}">${ev.name}</strong>
          <span style="font-size:11px;color:var(--text-muted);display:block;margin-top:2px;">${formatDate(ev.date)} &middot; ${ev.type==='holiday'?'University Holiday':'Exam Period'}</span>
        </div>
        <button onclick="deleteCalendarEvent(${i})" style="background:transparent;border:none;color:var(--danger);cursor:pointer;padding:6px;" title="Delete event">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    `).join('');

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:20px;">

      <!-- Term Duration -->
      <div style="background:white;border:1px solid var(--line);border-radius:var(--radius);padding:24px;">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:16px;">Term Duration</h3>
        <div style="display:flex;gap:16px;">
          <label class="field" style="flex:1;">
            <span>Academic Year Start</span>
            <input type="date" id="configTermStart" value="${state.calendarConfig.termStart}" onchange="saveCalendarConfig()" />
          </label>
          <label class="field" style="flex:1;">
            <span>Academic Year End</span>
            <input type="date" id="configTermEnd" value="${state.calendarConfig.termEnd}" onchange="saveCalendarConfig()" />
          </label>
        </div>
      </div>

      <!-- Weekly Off-Days -->
      <div style="background:white;border:1px solid var(--line);border-radius:var(--radius);padding:24px;">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:6px;">Standard Weekly Off-Days</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">Click days to toggle. Off-days are never scheduled.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${[1,2,3,4,5,6,0].map(val => {
            const isOff = state.calendarConfig.offDays.includes(val);
            return `<button class="builder-toggle ${isOff?'active':''}" onclick="toggleCalendarOffDay(${val},this)">${offDayLabels[val]}</button>`;
          }).join('')}
        </div>
      </div>

      <!-- Custom Holidays & Events -->
      <div style="background:white;border:1px solid var(--line);border-radius:var(--radius);padding:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div>
            <h3 style="font-size:15px;font-weight:600;">Custom Holidays &amp; Events</h3>
            <p style="font-size:13px;color:var(--text-muted);margin-top:2px;">Add dates where classes are suspended or modified.</p>
          </div>
        </div>

        <!-- Inline add-event form -->
        <div style="background:#f8fafc;border:1px solid var(--line);border-radius:var(--radius);padding:16px;margin-bottom:16px;">
          <p style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;">Add New Event</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;">
            <label class="field" style="flex:1;min-width:140px;margin:0;">
              <span style="font-size:11px;">Date</span>
              <input type="date" id="newEventDate" style="font-size:13px;padding:7px 10px;" />
            </label>
            <label class="field" style="flex:2;min-width:160px;margin:0;">
              <span style="font-size:11px;">Event Name</span>
              <input type="text" id="newEventName" placeholder="e.g. Dussehra, Midterm Week" style="font-size:13px;padding:7px 10px;" />
            </label>
            <label class="field" style="flex:1;min-width:130px;margin:0;">
              <span style="font-size:11px;">Type</span>
              <select id="newEventType" style="font-size:13px;padding:7px 10px;">
                <option value="holiday">University Holiday</option>
                <option value="exam">Exam Period</option>
              </select>
            </label>
            <button class="btn primary" onclick="addCalendarEventInline()" style="height:36px;white-space:nowrap;">+ Add</button>
          </div>
        </div>

        <!-- Events list -->
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${eventsHtml || '<p style="font-size:13px;color:var(--text-muted);">No events added yet.</p>'}
        </div>
      </div>
    </div>
  `;
}

window.addCalendarEventInline = function() {
  const date = $("#newEventDate")?.value;
  const name = $("#newEventName")?.value.trim();
  const type = $("#newEventType")?.value || 'holiday';
  if (!date) { showToast("Please pick a date."); return; }
  if (!name) { showToast("Please enter an event name."); return; }
  state.calendarConfig.events.push({ date, name, type });
  saveState('calendarConfig');
  renderCalendarSettings();
  if (!$("#calendar").classList.contains("hidden")) renderCalendar();
  showToast(`Event "${name}" added.`);
};

window.toggleCalendarOffDay = function(val, btn) {
  btn.classList.toggle("active");
  if (btn.classList.contains("active")) {
    if (!state.calendarConfig.offDays.includes(val)) state.calendarConfig.offDays.push(val);
  } else {
    state.calendarConfig.offDays = state.calendarConfig.offDays.filter(d => d !== val);
  }
  saveState('calendarConfig');
  syncMasterScheduleToDaily();
};

window.deleteCalendarEvent = function(idx) {
  state.calendarConfig.events.splice(idx, 1);
  saveState('calendarConfig');
  renderCalendarSettings();
  if (!$("#calendar").classList.contains("hidden")) renderCalendar();
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
  
  // Ensure daily schedule matrix is synced in local memory for this date context
  syncMasterScheduleToDaily();
  
  renderScheduleGrid();
  
  if (state.currentRole === "admin") renderDashboard();
  if (state.currentRole === "student") renderStudentHome();
  if (state.currentRole === "faculty") renderFacultyHome();
  if (state.currentRole === "facilities") renderFacilitiesScreen();
  
  showToast(`Switched date context to ${formatDate(state.currentDate)}`);
}

$("#todayBtn").addEventListener("click", () => {
  state.currentDate = currentAppMode === "firebase" 
    ? new Date().toISOString().split('T')[0] 
    : "2026-05-26";
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
$("#bulkBuildingFilter")?.addEventListener("change", () => {
  renderBulkRooms();
  updateBulkImpact();
});
$("#toggleBulkRooms")?.addEventListener("click", () => {
  const filter = $("#bulkBuildingFilter")?.value || "All buildings";
  const visible = getFlatRooms().filter(r =>
    filter === "All buildings" || `${r.buildingCode}: ${r.buildingName}` === filter
  );
  const allSelected = visible.length > 0 && visible.every(r => selectedBulkRooms.has(r.id));
  visible.forEach(r => {
    if (allSelected) selectedBulkRooms.delete(r.id);
    else selectedBulkRooms.add(r.id);
  });
  renderBulkRooms();
  updateBulkImpact();
});
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

// ── Helper: render slot toggle buttons inside builder modal ──────────────────
function renderSlotToggles(selectedSlotIndex) {
  const container = $("#slotToggles");
  if (!container) return;
  container.innerHTML = slotTimes.map((s, idx) => {
    const si = idx + 1;
    const isActive = si === selectedSlotIndex;
    return `<button type="button" class="builder-toggle ${isActive?'active':''}" data-val="${si}" style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <span style="font-weight:600;">${s.name}</span>
      <small style="font-size:10px;opacity:.7;">${s.time}</small>
    </button>`;
  }).join("");
  container.querySelectorAll(".builder-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".builder-toggle").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateLivePreview();
    });
  });
}

// mockSlotGroups: each course has slotIndex (1-based) + days ([1..5] JS day numbers)
const mockSlotGroups = [
  {
    id: "slot-1",
    slotIndex: 1,
    name: "Slot 1",
    courses: [
      { id: "CS201", title: "Data Structures", cohort: "B.Tech CS Year 2", faculty: "Dr. Ananya Mehta", room: "A-101", slotIndex: 1, days: [1,3,5], capacity: 120, enrolled: 110 },
      { id: "ME301", title: "Thermodynamics", cohort: "B.Tech ME Year 3", faculty: "Dr. R. Kumar", room: "C-201", slotIndex: 1, days: [1,3,5], capacity: 80, enrolled: 75 },
      { id: "EE101", title: "Basic Electronics", cohort: "B.Tech EE Year 1", faculty: "Prof. S. Rao", room: "F-AUD-01", slotIndex: 1, days: [2,4], capacity: 200, enrolled: 180 },
      { id: "FIN101", title: "Corporate Finance", cohort: "MBA Year 1", faculty: "Prof. L. Das", room: "A-102", slotIndex: 1, days: [2,4], capacity: 60, enrolled: 60 }
    ]
  },
  {
    id: "slot-2",
    slotIndex: 2,
    name: "Slot 2",
    courses: [
      { id: "MA201", title: "Linear Algebra", cohort: "B.Tech CS Year 2", faculty: "Prof. Suresh Iyer", room: "A-101", slotIndex: 2, days: [1,3,5], capacity: 120, enrolled: 120 },
      { id: "ME302", title: "Fluid Mechanics", cohort: "B.Tech ME Year 3", faculty: "Prof. A. Sharma", room: "C-201", slotIndex: 2, days: [1,3,5], capacity: 80, enrolled: 75 }
    ]
  },
  {
    id: "slot-3",
    slotIndex: 3,
    name: "Slot 3",
    courses: [
      { id: "MGT401", title: "Strategic Management", cohort: "MBA Year 2", faculty: "Dr. V. Singh", room: "E-101", slotIndex: 3, days: [2,4], capacity: 60, enrolled: 55 },
      { id: "PSY101", title: "Intro to Psychology", cohort: "BA Humanities Year 1", faculty: "Prof. N. Gupta", room: "G-102", slotIndex: 3, days: [2,4], capacity: 90, enrolled: 85 }
    ]
  },
  {
    id: "slot-4",
    slotIndex: 4,
    name: "Slot 4",
    courses: [
      { id: "CS305", title: "Machine Learning", cohort: "B.Tech CS Year 3", faculty: "Dr. R. Desai", room: "A-101", slotIndex: 4, days: [2,4], capacity: 120, enrolled: 115 },
      { id: "ENG201", title: "World Literature", cohort: "BA English Year 2", faculty: "Prof. K. Sen", room: "G-101", slotIndex: 4, days: [2,4], capacity: 60, enrolled: 45 }
    ]
  },
  {
    id: "slot-6",
    slotIndex: 6,
    name: "Slot 6",
    courses: [
      { id: "CS201-L", title: "Data Structures Lab", cohort: "B.Tech CS Year 2", faculty: "Dr. Ananya Mehta", room: "D-LAB-2", slotIndex: 6, days: [1,2,4], capacity: 40, enrolled: 35 },
      { id: "ME301-L", title: "Thermo Lab", cohort: "B.Tech ME Year 3", faculty: "Dr. R. Kumar", room: "D-LAB-5", slotIndex: 6, days: [1,2,4], capacity: 30, enrolled: 25 }
    ]
  }
];

let activeSlotGroupId = null;

function renderMasterScheduling() {
  const slotList = $("#slotList");
  if (!slotList) return;

  slotList.innerHTML = mockSlotGroups.map(g => {
    const slotInfo = slotTimes[g.slotIndex - 1] || { name: g.name, time: '' };
    const totalEnrolled = g.courses.reduce((sum, c) => sum + (c.enrolled || 0), 0);
    return `
      <div class="cohort-item ${activeSlotGroupId === g.id ? 'active' : ''}" onclick="selectSlotGroup('${g.id}')">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong>${slotInfo.name}</strong>
          <span style="font-size:11px;font-weight:600;color:var(--primary);background:#eff6ff;padding:2px 8px;border-radius:20px;">${slotInfo.time}</span>
        </div>
        <span style="font-size:12px;color:var(--text-muted);">${g.courses.length} course${g.courses.length!==1?'s':''} &middot; ${totalEnrolled} enrolled</span>
      </div>`;
  }).join("");

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

  const slotInfo = slotTimes[group.slotIndex - 1] || { name: group.name, time: '' };
  title.innerHTML = `${slotInfo.name} <span style="font-size:13px;font-weight:400;color:var(--text-muted);">(${slotInfo.time})</span>`;
  content.querySelector(".tag").innerText = `${group.courses.length} Courses`;

  list.innerHTML = group.courses.map(course => `
    <div class="constraint-card" style="position:relative;">
      <div class="constraint-card-header" style="padding-right:52px;">
        <strong>${course.title} <span style="font-weight:400;color:var(--text-muted);font-size:12px;">(${course.id})</span></strong>
        <span style="font-size:12px;color:var(--text-muted);">${course.faculty}</span>
      </div>
      <div style="position:absolute;top:12px;right:12px;display:flex;gap:4px;">
        <button onclick="editMasterCourse('${group.id}','${course.id}')" style="background:transparent;border:none;color:var(--primary);cursor:pointer;" title="Edit">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </button>
        <button onclick="deleteMasterCourse('${group.id}','${course.id}')" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;" title="Delete">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;flex-wrap:wrap;gap:6px;">
        <span style="font-size:12px;color:var(--text-muted);">${course.cohort}</span>
        <div style="display:flex;gap:6px;align-items:center;">
          <span style="font-size:11px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;padding:2px 8px;border-radius:20px;">${getDayLabels(course.days)}</span>
          <span style="font-size:11px;font-weight:600;background:#eff6ff;color:var(--primary);border:1px solid #bfdbfe;padding:2px 8px;border-radius:20px;">&#128205; ${course.room}</span>
          <span style="font-size:11px;color:var(--text-muted);">${course.enrolled||0} enrolled</span>
        </div>
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
  const facultySearch = document.getElementById("builderFacultySearch");
  if (facultySearch) facultySearch.value = "";
  const facultyEmail = document.getElementById("builderFacultyEmail");
  if (facultyEmail) facultyEmail.value = "";

  // Reset student roster
  currentCourseStudents = [];
  const enrolledCount = document.getElementById("builderEnrolledCount");
  if (enrolledCount) enrolledCount.innerText = "0 students";
  const rosterPreview = document.getElementById("courseStudentsListPreview");
  if (rosterPreview) rosterPreview.innerHTML = "No students uploaded for this course yet.";
  const fileInput = document.getElementById("courseStudentsUploadInput");
  if (fileInput) fileInput.value = "";

  $("#builderCohort").value = "";
  $("#builderEffectiveDate").value = "";
  const eEnd = $("#builderEffectiveEndDate");
  if (eEnd) eEnd.value = "";
  $("#builderRoomSelect").value = "";
  const acc = $("#builderAccessibilityRequired");
  if (acc) acc.checked = false;

  // Render slot toggles from live slotTimes (no pre-selection)
  renderSlotToggles(null);

  // Reset day toggles
  $$("#dayToggles .builder-toggle").forEach(btn => btn.classList.remove("active"));

  updateLivePreview();
  modal.classList.remove("hidden");
};

window.editMasterCourse = function(groupId, courseId) {
  const group = mockSlotGroups.find(g => g.id === groupId);
  if (!group) return;
  const course = group.courses.find(c => c.id === courseId);
  if (!course) return;

  editingMasterCourseData = { groupId, courseId };

  // Derive base code: strip room suffix if present (e.g. "CS101-A101" → "CS101")
  const baseCode = course.id.replace(/-[A-Z0-9-]+$/, '') || course.id;

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
  const facultySearch = document.getElementById("builderFacultySearch");
  if (facultySearch) facultySearch.value = course.faculty || "";
  const facultyEmail = document.getElementById("builderFacultyEmail");
  if (facultyEmail) {
    const fUser = (state.users || []).find(u => u.name === course.faculty && (u.role === 'faculty' || (u.roles && u.roles.includes('faculty'))));
    facultyEmail.value = fUser ? fUser.email : "";
  }

  // Populate course student uploads
  currentCourseStudents = course.students || [];
  const enrolledCount = document.getElementById("builderEnrolledCount");
  if (enrolledCount) enrolledCount.innerText = `${currentCourseStudents.length} students`;
  const rosterPreview = document.getElementById("courseStudentsListPreview");
  if (rosterPreview) {
    if (currentCourseStudents.length > 0) {
      rosterPreview.innerHTML = currentCourseStudents.map(s => `
        <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid #f1f5f9;">
          <span>${s.name} (${s.email})</span>
          <span style="font-family:monospace; color:var(--text-muted);">${s.id}</span>
        </div>
      `).join("");
    } else {
      rosterPreview.innerHTML = "No students uploaded for this course yet.";
    }
  }
  const fileInput = document.getElementById("courseStudentsUploadInput");
  if (fileInput) fileInput.value = "";

  $("#builderCohort").value = course.cohort;
  $("#builderEffectiveDate").value = course.effectiveDate || "";
  const eEnd = $("#builderEffectiveEndDate");
  if (eEnd) eEnd.value = course.effectiveEndDate || "";
  $("#builderRoomSelect").value = course.room;
  const accessibilityCheckbox = $("#builderAccessibilityRequired");
  if (accessibilityCheckbox) accessibilityCheckbox.checked = course.accessibilityRequired || false;

  // Render slot toggles from slotTimes, pre-select the course's slotIndex
  renderSlotToggles(course.slotIndex);

  // Pre-select days
  const courseDays = course.days || [];
  $$("#dayToggles .builder-toggle").forEach(btn => {
    btn.classList.toggle("active", courseDays.includes(parseInt(btn.dataset.val)));
  });

  updateLivePreview();
  modal.classList.remove("hidden");
};

window.closePatternBuilderModal = function() {
  const modal = $("#patternBuilderModal");
  if (modal) modal.classList.add("hidden");
};

// Day toggles (static HTML) — attach listeners for multi-select
document.addEventListener('DOMContentLoaded', () => {
  $$("#dayToggles .builder-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      updateLivePreview();
    });
  });
});

function updateLivePreview() {
  const activeSlotBtn = $("#slotToggles .builder-toggle.active");
  const activeDayBtns = $$("#dayToggles .builder-toggle.active");
  const preview = $("#builderLivePreview");
  const idPreview = $("#builderCourseIdPreview");
  const slotCodePreview = $("#builderSlotCodePreview");

  if (!preview) return null;

  const resetState = () => {
    preview.innerText = "Select options above";
    preview.style.color = "var(--text-muted)";
    preview.style.borderColor = "var(--line)";
    preview.style.background = "#f8fafc";
    if (idPreview) idPreview.innerText = "Awaiting inputs...";
    if (slotCodePreview) slotCodePreview.innerText = "\u2014";
  };

  if (!activeSlotBtn || activeDayBtns.length === 0) { resetState(); return null; }

  const slotIndex = parseInt(activeSlotBtn.dataset.val); // 1-based
  const slotInfo = slotTimes[slotIndex - 1] || { name: `Slot ${slotIndex}`, time: '' };
  const days = Array.from(activeDayBtns).map(b => parseInt(b.dataset.val));
  const dayLabels = getDayLabels(days);
  const room = $("#builderRoomSelect").value || "[ROOM]";
  const slotCode = getSlotCode(slotIndex, days);
  const previewText = `${slotInfo.name} (${slotInfo.time}) \u00b7 ${dayLabels} \u2192 ${room}`;

  preview.innerText = previewText;
  preview.style.color = "var(--primary)";
  preview.style.borderColor = "var(--primary)";
  preview.style.background = "#eff6ff";

  if (slotCodePreview) {
    slotCodePreview.innerText = slotCode;
  }

  const baseCode = $("#builderCourseId").value.trim().toUpperCase() || "[CODE]";
  // Course ID = BaseCode-SlotCode-RoomNorm  e.g. CS101-S2-MWF-A101
  const roomNorm = room.replace(/-/g, '');
  const fullCourseId = `${baseCode}-${slotCode}-${roomNorm}`;
  if (idPreview) idPreview.innerText = fullCourseId;

  return { slotIndex, days, slotCode, previewText, fullCourseId };
}

window.submitNewCourse = async function() {
  const baseCode = $("#builderCourseId").value.trim();
  const courseName = $("#builderCourseName").value.trim();
  const facultyName = $("#builderFacultyName")?.value.trim() || "TBD";
  const facultyEmail = $("#builderFacultyEmail")?.value.trim() || "";
  const cohort = $("#builderCohort")?.value.trim() || "Custom Added";
  const effectiveDate = $("#builderEffectiveDate")?.value || state.currentDate;
  const effectiveEndDate = $("#builderEffectiveEndDate")?.value || "";
  const room = $("#builderRoomSelect").value;
  const accessibilityRequired = $("#builderAccessibilityRequired")?.checked || false;

  if (!baseCode || !courseName) { showToast("Please enter the Course Code and Name."); return; }

  const previewData = updateLivePreview();
  if (!previewData) { showToast("Please select a Slot and at least one Day."); return; }

  if (!room) { showToast("Please assign a classroom."); return; }

  const { slotIndex, days, slotCode, fullCourseId } = previewData;
  const courseId = fullCourseId;

  // Validate end date if provided
  if (effectiveEndDate && effectiveDate && effectiveEndDate < effectiveDate) {
    showToast("Effective End Date must be after Start Date."); return;
  }

  // Conflict check: same room, same slot, overlapping days
  let conflictCourse = null, conflictGroup = null;
  mockSlotGroups.forEach(g => {
    if (g.slotIndex !== slotIndex) return;
    g.courses.forEach(c => {
      if (c.room !== room) return;
      if (editingMasterCourseData && c.id === editingMasterCourseData.courseId) return;
      const overlap = (c.days || []).some(d => days.includes(d));
      if (overlap) { conflictCourse = c; conflictGroup = g; }
    });
  });
  if (conflictCourse) {
    showToast(`Conflict: Room ${room} already has "${conflictCourse.title}" in this slot on overlapping days!`);
    return;
  }

  // Change button label to show working status
  const submitBtn = document.querySelector('button[onclick="submitNewCourse()"]');
  const originalBtnText = submitBtn ? submitBtn.innerText : "Add to Master Schedule";
  if (submitBtn) {
    submitBtn.innerText = "Provisioning Users...";
    submitBtn.disabled = true;
  }

  const customerId = state.currentUserProfile?.customerId || state.university?.customerId || "";

  try {
    // Helper function to provision a student or faculty in Auth and Firestore
    const provisionUser = async (email, name, role, cid, cId) => {
      const lowerEmail = email.toLowerCase().trim();
      if (currentAppMode === 'firebase' && isFirebaseInitialized) {
        // Create auth user
        try {
          const tempAppName = "TempApp_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
          const tempApp = firebase.initializeApp(activeFbConfig, tempAppName);
          await tempApp.auth().createUserWithEmailAndPassword(lowerEmail, "password123");
          await tempApp.delete();
          console.log(`Auth user created: ${lowerEmail}`);
        } catch (e) {
          console.log(`Auth user already exists or failed for ${lowerEmail}:`, e.message);
        }

        // Write user doc in Firestore
        const userDocRef = fbDb.collection('users').doc(lowerEmail);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          const existingData = userDoc.data();
          const enrolled = existingData.enrolledCourses || [];
          const taught = existingData.taughtCourses || [];
          const updateData = {};
          
          if (role === 'student') {
            if (!enrolled.includes(cId)) {
              enrolled.push(cId);
              updateData.enrolledCourses = enrolled;
            }
          } else if (role === 'faculty') {
            const baseCourseId = cId.split('-')[0];
            if (!taught.includes(baseCourseId)) {
              taught.push(baseCourseId);
              updateData.taughtCourses = taught;
            }
          }
          if (!existingData.roles || !existingData.roles.includes(role)) {
            updateData.roles = Array.from(new Set([...(existingData.roles || []), role]));
          }
          if (Object.keys(updateData).length > 0) {
            await userDocRef.update(updateData);
          }
        } else {
          const newUserDoc = {
            email: lowerEmail,
            name: name,
            role: role,
            roles: [role],
            customerId: cid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          };
          if (role === 'student') {
            newUserDoc.enrolledCourses = [cId];
          } else if (role === 'faculty') {
            newUserDoc.taughtCourses = [cId.split('-')[0]];
          }
          await userDocRef.set(newUserDoc);
        }
      } else {
        // Offline mode
        let user = state.users.find(u => u.email.toLowerCase() === lowerEmail);
        if (!user) {
          user = {
            email: lowerEmail,
            name: name,
            role: role,
            roles: [role],
            customerId: cid
          };
          state.users.push(user);
        }
        if (role === 'student') {
          user.enrolledCourses = user.enrolledCourses || [];
          if (!user.enrolledCourses.includes(cId)) {
            user.enrolledCourses.push(cId);
          }
        } else if (role === 'faculty') {
          user.taughtCourses = user.taughtCourses || [];
          const baseCourseId = cId.split('-')[0];
          if (!user.taughtCourses.includes(baseCourseId)) {
            user.taughtCourses.push(baseCourseId);
          }
        }
      }
    };

    // 1. Provision students
    for (const student of currentCourseStudents) {
      await provisionUser(student.email, student.name, 'student', customerId, courseId);
    }

    // 2. Provision faculty (if email is provided)
    if (facultyEmail) {
      await provisionUser(facultyEmail, facultyName, 'faculty', customerId, courseId);
    }
  } catch (provErr) {
    console.error("User provisioning error during course creation:", provErr);
    showToast("Warning: Some students/faculty credentials could not be provisioned.");
  }

  // Remove old course if editing
  if (editingMasterCourseData) {
    const oldGroup = mockSlotGroups.find(g => g.id === editingMasterCourseData.groupId);
    if (oldGroup) {
      const oldIdx = oldGroup.courses.findIndex(c => c.id === editingMasterCourseData.courseId);
      if (oldIdx !== -1) oldGroup.courses.splice(oldIdx, 1);
      // Clean up empty groups
      if (oldGroup.courses.length === 0) {
        const gi = mockSlotGroups.indexOf(oldGroup);
        if (gi !== -1) mockSlotGroups.splice(gi, 1);
      }
    }
  }

  // Find or create a slot group for this slotIndex
  let group = mockSlotGroups.find(g => g.slotIndex === slotIndex);
  if (!group) {
    const slotInfo = slotTimes[slotIndex - 1] || { name: `Slot ${slotIndex}` };
    group = { id: `slot-${slotIndex}`, slotIndex, name: slotInfo.name, courses: [] };
    mockSlotGroups.push(group);
    mockSlotGroups.sort((a, b) => a.slotIndex - b.slotIndex);
  }

  group.courses.push({
    id: courseId,
    title: courseName,
    cohort,
    faculty: facultyName,
    facultyEmail: facultyEmail,
    effectiveDate,
    effectiveEndDate: effectiveEndDate || null,
    room,
    slotIndex,
    days,
    slotCode: slotCode || getSlotCode(slotIndex, days),
    capacity: currentCourseStudents.length > 0 ? currentCourseStudents.length : 60,
    enrolled: currentCourseStudents.length,
    students: currentCourseStudents,
    accessibilityRequired
  });

  // Clear and resync
  Object.keys(state.cellData).forEach(date => { state.cellData[date] = {}; });
  
  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    await saveState('mockSlotGroups');
  }

  closePatternBuilderModal();
  activeSlotGroupId = group.id;
  renderMasterScheduling();
  syncMasterScheduleToDaily();
  
  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    saveState('cellData', state.currentDate);
  }
  
  if (state.currentRole === "admin") renderScheduleGrid();
  showToast(`Course "${courseName}" added to ${group.name}!`);
  addSystemNotification(`${courseId} \u2014 ${group.name}, ${getDayLabels(days)}.`);

  if (submitBtn) {
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
};

// ============================================================================
// DATA SYNC: MASTER -> DAILY COCKPIT
// ============================================================================

function syncMasterScheduleToDaily() {
  const dateStr = state.currentDate;
  
  // Cache any existing manual override bookings from Firestore
  const existingSchedule = state.cellData[dateStr] || {};
  const newSchedule = {};

  const d = new Date(dateStr);
  const jsDay = d.getDay(); // 0=Sun, 1=Mon … 6=Sat

  // Helper to check if a booking has a manual status or manual booking
  const isPreserved = (key) => {
    const b = existingSchedule[key];
    if (!b) return false;
    // Keep it if it is cancelled, virtual, blocked, or manually created
    return b.status === "cancelled" || b.status === "virtual" || b.status === "blocked" || b.courseId === "MANUAL";
  };

  // Skip calendar-level off-days unless there is a manual override already set in database
  const isOffDay = state.calendarConfig.offDays.includes(jsDay);
  const blockedEvent = (state.calendarConfig.events || []).find(e => e.date === dateStr);

  if (!isOffDay && !blockedEvent) {
    mockSlotGroups.forEach(group => {
      group.courses.forEach(course => {
        // Check effective start date
        if (course.effectiveDate && dateStr < course.effectiveDate) return;
        // Check effective end date (if set)
        if (course.effectiveEndDate && dateStr > course.effectiveEndDate) return;

        // Check if this course runs on today's day-of-week
        const courseDays = course.days || [];
        if (!courseDays.includes(jsDay)) return;

        const slotNum = course.slotIndex;
        if (!slotNum) return;

        const key = `${course.room}-${slotNum}`;
        
        if (isPreserved(key)) {
          // Keep the existing manual booking/override from database
          newSchedule[key] = existingSchedule[key];
        } else {
          // Generate from Master Schedule
          newSchedule[key] = {
            status: "booked",
            title: course.title,
            faculty: course.faculty || "TBA",
            facultyEmail: course.facultyEmail || "",
            count: course.capacity || 50,
            courseId: course.id,
            requirements: course.accessibilityRequired ? "Lecture, capacity 50+, accessible" : "Synced from Master Schedule",
            accessibilityRequired: course.accessibilityRequired || false,
            audit: `Auto-published — ${group.name} (${getDayLabels(courseDays)})`
          };
        }
      });
    });
  }

  // Also preserve any manually placed bookings/blocks that aren't part of the master schedule
  for (let key in existingSchedule) {
    if (isPreserved(key) && !newSchedule[key]) {
      newSchedule[key] = existingSchedule[key];
    }
  }

  state.cellData[dateStr] = newSchedule;

  // Persist synced schedule to Firestore only if we are the Admin (to avoid student permission errors)
  if (currentAppMode === 'firebase' && isFirebaseInitialized && state.currentRole === 'admin' && !isSyncingFromFirebase) {
    saveState('cellData', dateStr);
  }
}

// ============================================================================
// UNIVERSITY CALENDAR
// ============================================================================

// Calendar view state: which month/year is being displayed
let calendarViewYear = null;
let calendarViewMonth = null; // 0-indexed

function renderCalendar() {
  const grid = $("#universityCalendarGrid");
  if (!grid) return;

  // Initialise view from currentDate if not set
  const refDate = new Date(state.currentDate);
  if (calendarViewYear === null) calendarViewYear = refDate.getFullYear();
  if (calendarViewMonth === null) calendarViewMonth = refDate.getMonth();

  const MONTH_NAMES = ['January','February','March','April','May','June',
                       'July','August','September','October','November','December'];
  const label = $("#calendarMonthLabel");
  if (label) label.textContent = `${MONTH_NAMES[calendarViewMonth]} ${calendarViewYear}`;

  const firstDay = new Date(calendarViewYear, calendarViewMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(calendarViewYear, calendarViewMonth + 1, 0).getDate();

  let html = '';

  // Empty cells before month start (shift so Monday = col 0)
  const startOffset = (firstDay + 6) % 7; // Mon-first grid
  for (let i = 0; i < startOffset; i++) html += `<div class="calendar-day empty"></div>`;

  for (let i = 1; i <= daysInMonth; i++) {
    const mm = String(calendarViewMonth + 1).padStart(2, '0');
    const dd = String(i).padStart(2, '0');
    const dateStr = `${calendarViewYear}-${mm}-${dd}`;
    const dayOfWeek = new Date(dateStr).getDay();

    const eventOnDay = (state.calendarConfig.events || []).find(e => e.date === dateStr);
    const isHoliday = eventOnDay?.type === 'holiday';
    const isExam = eventOnDay?.type === 'exam';
    const isWeekend = (state.calendarConfig.offDays || []).includes(dayOfWeek);
    const isActive = dateStr === state.currentDate;

    let classes = 'calendar-day';
    if (isHoliday) classes += ' holiday';
    else if (isExam) classes += ' exam';
    else if (isWeekend) classes += ' weekend';
    if (isActive) classes += ' active-day';

    let eventsHtml = '';
    if (eventOnDay) {
      eventsHtml = `<div class="calendar-event">${eventOnDay.name}</div>`;
    } else if (!isWeekend) {
      // Count master schedule courses that run this day
      let count = 0;
      mockSlotGroups.forEach(g => {
        g.courses.forEach(c => {
          if ((c.days || []).includes(dayOfWeek)) count++;
        });
      });
      if (count > 0) {
        eventsHtml = `<div class="calendar-event" style="background:#eff6ff;color:var(--primary);">${count} class${count!==1?'es':''}</div>`;
      }
    }

    html += `
      <div class="${classes}" onclick="selectCalendarDate('${dateStr}')">
        <div class="day-num">${i}</div>
        <div class="day-events">${eventsHtml}</div>
      </div>`;
  }

  grid.innerHTML = html;
}

// Wire up prev/next month buttons directly
const prevBtn = $("#calPrevMonthBtn");
if (prevBtn) {
  prevBtn.onclick = () => {
    if (calendarViewMonth === null) { calendarViewMonth = new Date(state.currentDate).getMonth(); calendarViewYear = new Date(state.currentDate).getFullYear(); }
    calendarViewMonth--;
    if (calendarViewMonth < 0) { calendarViewMonth = 11; calendarViewYear--; }
    renderCalendar();
  };
}
const nextBtn = $("#calNextMonthBtn");
if (nextBtn) {
  nextBtn.onclick = () => {
    if (calendarViewMonth === null) { calendarViewMonth = new Date(state.currentDate).getMonth(); calendarViewYear = new Date(state.currentDate).getFullYear(); }
    calendarViewMonth++;
    if (calendarViewMonth > 11) { calendarViewMonth = 0; calendarViewYear++; }
    renderCalendar();
  };
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
let firebaseUnsubscribers = [];

function resetFirebaseListeners() {
  firebaseUnsubscribers.forEach(unsubscribe => {
    try {
      if (typeof unsubscribe === "function") unsubscribe();
    } catch (err) {
      console.warn("Failed to detach Firebase listener:", err);
    }
  });
  firebaseUnsubscribers = [];
}

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
  
  // Update status indicator & demo login elements
  updateFirebaseStatusIndicator();
  toggleLoginDemoElements();
  
  // Event listeners for mode selector
  modeOfflineBtn?.addEventListener("click", () => {
    currentAppMode = "offline";
    localStorage.setItem("campusgrid_mode", "offline");
    modeOfflineBtn.classList.add("active");
    modeFirebaseBtn.classList.remove("active");
    updateFirebaseStatusIndicator();
    toggleLoginDemoElements();
    checkUniversityRegistration(); // run check
    populateAllDynamicUI(); // Revert filters/slots to offline configurations if needed
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
    toggleLoginDemoElements();
    checkUniversityRegistration(); // run check
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

  function toggleLoginDemoElements() {
    const isFirebase = (currentAppMode === "firebase" && isFirebaseInitialized);
    const personaGrid = document.querySelector(".login-role-grid");
    const helperText = document.querySelector("#signInPanel .helper");
    const demoAutoFillText = document.querySelector("#signInPanel p.helper");
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    if (isFirebase) {
      if (personaGrid) personaGrid.style.display = "none";
      if (helperText) helperText.innerText = "Enter your university credentials to sign in.";
      if (demoAutoFillText) demoAutoFillText.style.visibility = "hidden";
      
      // Clear demo credentials to let user type clean
      if (emailInput && emailInput.value === "admin@univ.edu") emailInput.value = "";
      if (passwordInput && passwordInput.value === "admin123") passwordInput.value = "";
    } else {
      if (personaGrid) personaGrid.style.display = "grid";
      if (helperText) helperText.innerText = "Pick a role below to open the right workspace.";
      if (demoAutoFillText) demoAutoFillText.style.visibility = "visible";
      
      // Set default demo admin on switch back to offline
      if (emailInput && !emailInput.value) emailInput.value = "admin@univ.edu";
      if (passwordInput && !passwordInput.value) passwordInput.value = "admin123";
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

  // Toggles for Registration Panel <=> Login Panel
  const goToRegister = document.getElementById("goToRegisterLink");
  const backToLogin = document.getElementById("backToLoginLink");
  const signInPanel = document.getElementById("signInPanel");
  const registerPanel = document.getElementById("registerPanel");

  goToRegister?.addEventListener("click", (e) => {
    e.preventDefault();
    signInPanel?.classList.add("hidden");
    registerPanel?.classList.remove("hidden");
  });

  backToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    registerPanel?.classList.add("hidden");
    signInPanel?.classList.remove("hidden");
  });

  // User Directory filter & search event listeners
  document.getElementById("userDirectorySearch")?.addEventListener("input", renderUserDirectory);
  document.getElementById("userDirectoryRoleFilter")?.addEventListener("change", renderUserDirectory);

  // File input change listeners for separate Faculty and Student uploads
  document.getElementById("facultyBulkUploadInput")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) processBulkUpload(file, "faculty");
  });

  document.getElementById("studentBulkUploadInput")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) processBulkUpload(file, "student");
  });

  // Manual User Creation button listener
  document.getElementById("submitAddUserBtn")?.addEventListener("click", submitAddUser);

  // Check University signup configuration on boot
  checkUniversityRegistration();

  // Restore Firebase session on boot if logged in
  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    fbAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const lowerEmail = (user.email || "").toLowerCase();
        console.log("Firebase Session Restored:", lowerEmail);
        try {
          const userDoc = await fbDb.collection('users').doc(lowerEmail).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            state.currentUserProfile = userData;
            
            // Load university branding/details from tenant-scoped namespace
            const customerId = userData.customerId;
            if (customerId) {
              const uniDoc = await fbDb.collection('customers').doc(customerId).collection('config').doc('university').get();
              if (uniDoc.exists) {
                state.university = uniDoc.data();
                applyDynamicBranding(state.university);
              }
            }
            
            await seedFirestoreIfEmpty();
            await firebaseLoad();
            setupFirebaseListeners();
            populateAllDynamicUI();
            
            document.body.classList.remove('show-login');
            updateDateDisplay();
            setRole(userData.role || 'student');
          }
        } catch (err) {
          console.error("Firebase session restore error:", err);
        }
      }
    });
  }

  // Run dynamic UI populator initially
  populateAllDynamicUI();
});

// Override the Sign-In click listener
setTimeout(() => {
  const loginSubmit = document.getElementById('loginSubmit');
  if (!loginSubmit) return;
  
  // Clone element to remove old inline/attached listeners
  const newLoginSubmit = loginSubmit.cloneNode(true);
  loginSubmit.parentNode.replaceChild(newLoginSubmit, loginSubmit);
  
  newLoginSubmit.addEventListener('click', async () => {
    const rawEmail = document.getElementById('loginEmail')?.value.trim() || "";
    const email = rawEmail.toLowerCase();
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
          state.currentUserProfile = userData;
          
          // Discover customerId and load university branding
          const customerId = userData.customerId;
          if (customerId) {
            const uniDoc = await fbDb.collection('customers').doc(customerId).collection('config').doc('university').get();
            if (uniDoc.exists) {
              state.university = uniDoc.data();
              applyDynamicBranding(state.university);
            }
          }
          
          console.log(`Firebase authenticated user ${email} with persona: ${role}`);
          
          // Seed the database if it doesn't have calendar configuration yet
          await seedFirestoreIfEmpty();
          
          // Load database state
          await firebaseLoad();
          
          // Activate dynamic syncing
          setupFirebaseListeners();
          
          // Re-populate all dropdown filters and dynamic elements after database loads
          populateAllDynamicUI();
          
          // Log in and set role
          document.body.classList.remove('show-login');
          updateDateDisplay();
          setRole(role);
          showToast(`Logged in to Firebase as ${userData.name || email} (${role.toUpperCase()})`);
        } else {
          console.warn("Auth user found, but Firestore user document is missing.");
          showToast("Authenticated, but no CampusGrid profile exists for this user. Ask an admin to add them.");
          await fbAuth.signOut();
          state.currentUserProfile = null;
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

// Dynamic UI Options Populator (Removes hardcoding from UI filters & slot matrices)
function populateAllDynamicUI() {
  const buildingFilter = document.getElementById("buildingFilter");
  if (buildingFilter) {
    const curVal = buildingFilter.value;
    let html = `<option value="All buildings">All buildings</option>`;
    state.buildings.forEach(b => {
      html += `<option value="${b.code}" ${b.code === curVal ? 'selected' : ''}>Block ${b.code} - ${b.name}</option>`;
    });
    buildingFilter.innerHTML = html;
  }
  
  const bulkBuildingFilter = document.getElementById("bulkBuildingFilter");
  if (bulkBuildingFilter) {
    const curVal = bulkBuildingFilter.value;
    let html = `<option value="All buildings">All buildings</option>`;
    state.buildings.forEach(b => {
      html += `<option value="${b.code}" ${b.code === curVal ? 'selected' : ''}>Block ${b.code}: ${b.name}</option>`;
    });
    bulkBuildingFilter.innerHTML = html;
  }

  // Populate bulk exam slots list
  const examSlotsContainer = document.querySelector(".exam-slots");
  if (examSlotsContainer) {
    // Check active buttons
    const activeIndices = Array.from(examSlotsContainer.querySelectorAll("button")).map((btn, idx) => {
      return btn.classList.contains("active") ? idx : null;
    }).filter(v => v !== null);
    
    examSlotsContainer.innerHTML = slotTimes.map((slot, idx) => {
      const isActive = activeIndices.includes(idx) || (activeIndices.length === 0 && (idx === 1 || idx === 2));
      return `<button type="button" class="${isActive ? 'active' : ''}">${idx + 1} · ${slot.time}</button>`;
    }).join("");
  }
}

// Tenant-scoped database reference helper
function getTenantRef(collectionName) {
  const customerId = (state.currentUserProfile && state.currentUserProfile.customerId) || (state.university && state.university.customerId);
  if (!customerId) {
    return fbDb.collection(collectionName);
  }
  return fbDb.collection('customers').doc(customerId).collection(collectionName);
}

// 3. Sync helpers
function saveState(dataType, key = null) {
  if (isSyncingFromFirebase) return; // Prevent write loops
  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    try {
      const tenantRef = getTenantRef(dataType);
      if (dataType === 'cellData') {
        const dates = key ? [key] : Object.keys(state.cellData);
        dates.forEach(date => {
          tenantRef.doc(date).set(state.cellData[date] || {});
        });
      } else if (dataType === 'unassignedClasses') {
        const dates = key ? [key] : Object.keys(state.unassignedClasses);
        dates.forEach(date => {
          tenantRef.doc(date).set({ list: state.unassignedClasses[date] || [] });
        });
      } else if (dataType === 'suspendedClasses') {
        const dates = key ? [key] : Object.keys(state.suspendedClasses);
        dates.forEach(date => {
          const list = state.suspendedClasses[date] || [];
          if (list.length > 0) {
            tenantRef.doc(date).set({ list });
          } else {
            tenantRef.doc(date).delete();
          }
        });
      } else if (dataType === 'issues') {
        if (key) {
          const issue = state.issues.find(i => i.id === key);
          if (issue) {
            tenantRef.doc(key).set(issue);
          } else {
            tenantRef.doc(key).delete();
          }
        } else {
          state.issues.forEach(issue => {
            tenantRef.doc(issue.id).set(issue);
          });
        }
      } else if (dataType === 'approvalRequests') {
        if (key) {
          const req = state.approvalRequests.find(r => r.id === key);
          if (req) {
            tenantRef.doc(key).set(req);
          } else {
            tenantRef.doc(key).delete();
          }
        } else {
          state.approvalRequests.forEach(req => {
            tenantRef.doc(req.id).set(req);
          });
        }
      } else if (dataType === 'calendarConfig') {
        getTenantRef('config').doc('calendar').set(state.calendarConfig);
      } else if (dataType === 'buildings') {
        getTenantRef('config').doc('buildings').set({ list: state.buildings });
      } else if (dataType === 'slots') {
        getTenantRef('config').doc('slots').set({ list: slotTimes });
      } else if (dataType === 'mockSlotGroups') {
        if (key) {
          const group = mockSlotGroups.find(g => g.id === key);
          if (group) {
            tenantRef.doc(key).set(group);
          } else {
            tenantRef.doc(key).delete();
          }
        } else {
          mockSlotGroups.forEach(group => {
            tenantRef.doc(group.id).set(group);
          });
        }
      }
    } catch (err) {
      console.error(`Failed to save state [${dataType}] to Firebase:`, err);
    }
  }
}

function clearLocalState() {
  console.log("Clearing local state to prevent data pollution between tenants...");
  state.cellData = {};
  state.unassignedClasses = {};
  state.issues = [];
  state.approvalRequests = [];
  mockSlotGroups.length = 0;
  state.suspendedClasses = {};
  state.notifications = [];
  state.users = [];
  state.university = null;
  renderBellNotifications();
}

// Load from DB
async function firebaseLoad() {
  if (!isFirebaseInitialized) return;
  isSyncingFromFirebase = true;
  
  try {
    const customerId = (state.currentUserProfile && state.currentUserProfile.customerId) || (state.university && state.university.customerId);
    
    // Clear local state before loading from Firestore
    clearLocalState();

    
    // 1. Calendar
    const calDoc = await getTenantRef('config').doc('calendar').get();
    if (calDoc.exists) {
      state.calendarConfig = calDoc.data();
    }
    
    // 2. Schedules
    const schedulesSnap = await getTenantRef('cellData').get();
    schedulesSnap.forEach(doc => {
      state.cellData[doc.id] = doc.data();
    });
    
    // 3. Unassigned
    const unassignedSnap = await getTenantRef('unassignedClasses').get();
    unassignedSnap.forEach(doc => {
      state.unassignedClasses[doc.id] = doc.data().list || [];
    });

    // 4. Suspended classes for active exam-period workflows
    const suspendedSnap = await getTenantRef('suspendedClasses').get();
    suspendedSnap.forEach(doc => {
      state.suspendedClasses[doc.id] = doc.data().list || [];
    });
    
    // 5. Issues
    const issuesSnap = await getTenantRef('issues').get();
    const loadedIssues = [];
    issuesSnap.forEach(doc => {
      loadedIssues.push(doc.data());
    });
    if (loadedIssues.length > 0) state.issues = loadedIssues;
    
    // 6. Approvals
    const approvalsSnap = await getTenantRef('approvalRequests').get();
    const loadedApprovals = [];
    approvalsSnap.forEach(doc => {
      loadedApprovals.push(doc.data());
    });
    if (loadedApprovals.length > 0) state.approvalRequests = loadedApprovals;
    
    // 7. Master schedule
    const masterSnap = await getTenantRef('mockSlotGroups').get();
    const loadedMaster = [];
    masterSnap.forEach(doc => {
      loadedMaster.push(doc.data());
    });
    if (loadedMaster.length > 0) {
      mockSlotGroups.length = 0;
      loadedMaster.forEach(item => mockSlotGroups.push(item));
    }

    // 8. Buildings (Infrastructure)
    const bldDoc = await getTenantRef('config').doc('buildings').get();
    if (bldDoc.exists) {
      state.buildings = bldDoc.data().list || [];
    }

    // 9. Slots configuration
    const slotsDoc = await getTenantRef('config').doc('slots').get();
    if (slotsDoc.exists) {
      const loadedSlots = slotsDoc.data().list || [];
      if (loadedSlots.length > 0) {
        slotTimes.length = 0;
        loadedSlots.forEach(s => slotTimes.push(s));
      }
    }
    
    // 10. Users roster config (Filtered by customerId)
    let usersSnap;
    if (customerId) {
      usersSnap = await fbDb.collection('users').where('customerId', '==', customerId).get();
    } else {
      usersSnap = await fbDb.collection('users').get();
    }
    const loadedUsers = [];
    usersSnap.forEach(doc => {
      loadedUsers.push(doc.data());
    });
    state.users = loadedUsers;
    
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
  resetFirebaseListeners();
  
  const customerId = (state.currentUserProfile && state.currentUserProfile.customerId) || (state.university && state.university.customerId);
  
  // Schedules listener
  firebaseUnsubscribers.push(getTenantRef('cellData').onSnapshot(snap => {
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
  }));
  
  // Unassigned listener
  firebaseUnsubscribers.push(getTenantRef('unassignedClasses').onSnapshot(snap => {
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
  }));

  // Suspended classes listener
  firebaseUnsubscribers.push(getTenantRef('suspendedClasses').onSnapshot(snap => {
    if (isSyncingFromFirebase) return;
    isSyncingFromFirebase = true;
    let changed = false;
    snap.docChanges().forEach(change => {
      if (change.type === "added" || change.type === "modified") {
        state.suspendedClasses[change.doc.id] = change.doc.data().list || [];
        changed = true;
      } else if (change.type === "removed") {
        delete state.suspendedClasses[change.doc.id];
        changed = true;
      }
    });
    isSyncingFromFirebase = false;
    if (changed) {
      updateExamPeriodBanner();
      refreshActiveViews();
    }
  }));

  // Master schedule (mockSlotGroups) listener
  firebaseUnsubscribers.push(getTenantRef('mockSlotGroups').onSnapshot(snap => {
    if (isSyncingFromFirebase) return;
    isSyncingFromFirebase = true;
    let changed = false;
    snap.docChanges().forEach(change => {
      const groupData = change.doc.data();
      const idx = mockSlotGroups.findIndex(g => g.id === change.doc.id);
      if (change.type === "added" || change.type === "modified") {
        if (idx !== -1) {
          mockSlotGroups[idx] = groupData;
        } else {
          mockSlotGroups.push(groupData);
        }
        changed = true;
      } else if (change.type === "removed") {
        if (idx !== -1) {
          mockSlotGroups.splice(idx, 1);
          changed = true;
        }
      }
    });
    if (changed) {
      mockSlotGroups.sort((a, b) => a.slotIndex - b.slotIndex);
      syncMasterScheduleToDaily();
      refreshActiveViews();
    }
    isSyncingFromFirebase = false;
  }));

  // Issues listener
  firebaseUnsubscribers.push(getTenantRef('issues').onSnapshot(snap => {
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
  }));

  // Approvals listener
  firebaseUnsubscribers.push(getTenantRef('approvalRequests').onSnapshot(snap => {
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
  }));

  // Buildings config listener
  firebaseUnsubscribers.push(getTenantRef('config').doc('buildings').onSnapshot(doc => {
    if (isSyncingFromFirebase) return;
    if (doc.exists) {
      isSyncingFromFirebase = true;
      state.buildings = doc.data().list || [];
      isSyncingFromFirebase = false;
      populateInfraBuildingSelect();
      populateAllDynamicUI();
      refreshActiveViews();
    }
  }));

  // Slots config listener
  firebaseUnsubscribers.push(getTenantRef('config').doc('slots').onSnapshot(doc => {
    if (isSyncingFromFirebase) return;
    if (doc.exists) {
      const loadedSlots = doc.data().list || [];
      if (loadedSlots.length > 0) {
        isSyncingFromFirebase = true;
        slotTimes.length = 0;
        loadedSlots.forEach(s => slotTimes.push(s));
        isSyncingFromFirebase = false;
        populateAllDynamicUI();
        refreshActiveViews();
        if (typeof renderSlotConfig === 'function') renderSlotConfig();
      }
    }
  }));

  // Users listener (Filtered by customerId)
  let usersQuery = fbDb.collection('users');
  if (customerId) {
    usersQuery = usersQuery.where('customerId', '==', customerId);
  }
  firebaseUnsubscribers.push(usersQuery.onSnapshot(snap => {
    if (isSyncingFromFirebase) return;
    isSyncingFromFirebase = true;
    let changed = false;
    snap.docChanges().forEach(change => {
      const userData = change.doc.data();
      const idx = state.users.findIndex(u => u.email === change.doc.id);
      if (change.type === "added" || change.type === "modified") {
        if (idx !== -1) {
          state.users[idx] = userData;
        } else {
          state.users.push(userData);
        }
        changed = true;
      } else if (change.type === "removed") {
        if (idx !== -1) {
          state.users.splice(idx, 1);
          changed = true;
        }
      }
    });
    isSyncingFromFirebase = false;
    if (changed) {
      if (typeof renderUserDirectory === 'function') renderUserDirectory();
    }
  }));
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

// Initializer for fresh university registrations
async function initializeFreshUniversity(customerId) {
  try {
    console.log(`Initializing fresh tenant space for [${customerId}]...`);
    const tenantRef = fbDb.collection('customers').doc(customerId);
    
    // Seed only default infrastructure configuration (rooms, slots, calendar) with empty events
    const freshCalendarConfig = {
      termStart: state.calendarConfig.termStart || "2026-05-01",
      termEnd: state.calendarConfig.termEnd || "2026-12-15",
      offDays: state.calendarConfig.offDays || [0, 6],
      events: [] // A fresh institution starts with no pre-filled holidays/exams
    };

    await tenantRef.collection('config').doc('calendar').set(freshCalendarConfig);
    await tenantRef.collection('config').doc('buildings').set({ list: state.buildings });
    await tenantRef.collection('config').doc('slots').set({ list: slotTimes });
    
    // Do NOT write any schedules, unassigned classes, issues, approvals or mock slot groups.
    // This allows the registered university to start with a completely fresh and clean cockpit.
    
    console.log(`Fresh tenant space [${customerId}] initialized successfully!`);
  } catch (err) {
    console.error("Fresh university initialization failed:", err);
  }
}

// Seeder logic
async function seedFirestoreIfEmpty() {
  try {
    const customerId = (state.currentUserProfile && state.currentUserProfile.customerId) || (state.university && state.university.customerId);
    if (!customerId) return;

    // Only seed mock schedules/courses/issues if this is the DEMO tenant
    if (customerId !== "CUST-DEMO77") {
      console.log(`[${customerId}] is a custom tenant. Skipping mock data seeding.`);
      return;
    }

    const doc = await fbDb.collection('customers').doc(customerId).collection('config').doc('calendar').get();
    if (!doc.exists) {
      console.log(`Tenant space [${customerId}] is empty. Seeding initial mock data...`);
      
      const tenantRef = fbDb.collection('customers').doc(customerId);
      
      await tenantRef.collection('config').doc('calendar').set(state.calendarConfig);
      await tenantRef.collection('config').doc('buildings').set({ list: state.buildings });
      await tenantRef.collection('config').doc('slots').set({ list: slotTimes });
      
      for (const date in state.cellData) {
        await tenantRef.collection('cellData').doc(date).set(state.cellData[date]);
      }
      
      for (const date in state.unassignedClasses) {
        await tenantRef.collection('unassignedClasses').doc(date).set({ list: state.unassignedClasses[date] });
      }
      
      for (const issue of state.issues) {
        await tenantRef.collection('issues').doc(issue.id).set(issue);
      }
      
      for (const req of state.approvalRequests) {
        await tenantRef.collection('approvalRequests').doc(req.id).set(req);
      }
      
      for (const group of mockSlotGroups) {
        await tenantRef.collection('mockSlotGroups').doc(group.id).set(group);
      }
      
      const mockUsers = [
        { email: "admin@univ.edu", name: "Varun Sharma (Admin)", role: "admin", roles: ["admin"] },
        { email: "faculty@univ.edu", name: "Dr. Ananya Mehta", role: "faculty", roles: ["faculty"], taughtCourses: ["CS101", "CS102", "CS201-L"] },
        { email: "facilities@univ.edu", name: "Harpreet Singh", role: "facilities", roles: ["facilities"] },
        { email: "student@univ.edu", name: "Rahul Verma", role: "student", roles: ["student"], enrolledCourses: ["CS101", "MA201", "PHY204-L"] }
      ];
      
      for (const user of mockUsers) {
        await fbDb.collection('users').doc(user.email).set({ ...user, customerId: customerId });
      }
      
      console.log(`Tenant space [${customerId}] successfully seeded!`);
    }
  } catch (err) {
    console.error("Firestore Seeding failed:", err);
  }
}


const originalPopulateInfraBuildingSelect = populateInfraBuildingSelect;
populateInfraBuildingSelect = function(...args) {
  if (originalPopulateInfraBuildingSelect) originalPopulateInfraBuildingSelect.apply(this, args);
  populateAllDynamicUI();
};

// ============================================================================
// UNIVERSITY SIGNUP, DYNAMIC BRANDING, AND USER DIRECTORY HELPERS
// ============================================================================

window.openLoginModal = function() {
  document.getElementById("loginModal")?.classList.remove("hidden");
  document.getElementById("registerModal")?.classList.add("hidden");
};

window.closeLoginModal = function() {
  document.getElementById("loginModal")?.classList.add("hidden");
};

window.openRegisterModal = function() {
  document.getElementById("registerModal")?.classList.remove("hidden");
  document.getElementById("loginModal")?.classList.add("hidden");
};

window.closeRegisterModal = function() {
  document.getElementById("registerModal")?.classList.add("hidden");
};

async function checkUniversityRegistration() {
  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    try {
      // Check if there are any users registered in the global users collection.
      // If none, it means this is a fresh setup and we need the registration screen.
      const usersSnap = await fbDb.collection('users').limit(1).get();
      if (!usersSnap.empty) {
        closeRegisterModal();
        openLoginModal();
      } else {
        // Force register panel if no university is configured yet in live mode
        openRegisterModal();
        showToast("Welcome! Please register your university to get started.", "info");
      }
    } catch (err) {
      console.error("Failed to check university registration:", err);
      closeRegisterModal();
      closeLoginModal();
    }
  } else {
    // Offline mode: load from localStorage
    const savedUni = localStorage.getItem("campusgrid_offline_uni");
    if (savedUni) {
      const parsedUni = JSON.parse(savedUni);
      if (parsedUni.customerId !== "CUST-DEMO77") {
        clearLocalState();
        state.university = parsedUni;
        // Provision default offline admin profile
        const adminUser = {
          email: "admin@univ.edu",
          name: "University Admin",
          role: "admin",
          roles: ["admin"],
          customerId: parsedUni.customerId
        };
        state.currentUserProfile = adminUser;
        state.users = [adminUser];
        state.calendarConfig = {
          termStart: "2026-05-01",
          termEnd: "2026-12-15",
          offDays: [0, 6],
          events: []
        };
      } else {
        state.university = parsedUni;
      }
    } else {
      state.university = {
        name: "University of Bharat",
        shortName: "UNIVERSITY",
        code: "CG",
        customerId: "CUST-DEMO77"
      };
    }
    applyDynamicBranding(state.university);
    closeRegisterModal();
    closeLoginModal();
  }
}

function applyDynamicBranding(uniData) {
  if (!uniData) return;
  const loginUniName = document.getElementById("loginUniName");
  if (loginUniName) loginUniName.innerText = (uniData.name || "University of Bharat").toUpperCase();

  const sidebarUniName = document.getElementById("sidebarUniName");
  if (sidebarUniName) sidebarUniName.innerText = (uniData.shortName || "UNIVERSITY").toUpperCase();

  const loginBrandMark = document.getElementById("loginBrandMark");
  if (loginBrandMark) loginBrandMark.innerText = (uniData.code || "CG").toUpperCase();

  const customerIdBadge = document.getElementById("settingsCustomerIdBadge");
  if (customerIdBadge) {
    if (uniData.customerId) {
      customerIdBadge.innerText = `Customer ID: ${uniData.customerId}`;
      customerIdBadge.style.display = 'block';
    } else {
      customerIdBadge.style.display = 'none';
    }
  }
}

// Register University submission click listener
const regSubmitBtn = document.getElementById('registerSubmit');
if (regSubmitBtn) {
  const newRegSubmit = regSubmitBtn.cloneNode(true);
  regSubmitBtn.parentNode.replaceChild(newRegSubmit, regSubmitBtn);
  
  newRegSubmit.addEventListener('click', async () => {
    const name = document.getElementById('regUniName')?.value.trim();
    const shortName = document.getElementById('regUniShort')?.value.trim();
    const code = document.getElementById('regUniCode')?.value.trim();
    const rawEmail = document.getElementById('regAdminEmail')?.value.trim() || "";
    const email = rawEmail.toLowerCase();
    const password = document.getElementById('regAdminPassword')?.value;

    if (!name || !shortName || !code || !email || !password) {
      showToast("All fields are required to register!");
      return;
    }

    newRegSubmit.innerText = "Registering...";
    newRegSubmit.disabled = true;

    try {
      if (currentAppMode === 'firebase' && isFirebaseInitialized) {
        // 1. Create firebase auth user
        const userCredential = await fbAuth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Generate customer ID
        const customerId = "CUST-" + Math.floor(100000 + Math.random() * 900000);

        // 2. Save university config under tenant space
        const uniData = { name, shortName, code, customerId };
        await fbDb.collection('customers').doc(customerId).collection('config').doc('university').set(uniData);
        state.university = uniData;

        // 3. Save admin user profile to firestore
        const adminUserData = {
          email: email,
          name: "University Admin",
          role: "admin",
          roles: ["admin"],
          customerId: customerId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await fbDb.collection('users').doc(email).set(adminUserData);
        state.currentUserProfile = adminUserData;

        // 4. Initialize fresh university tenant space
        await initializeFreshUniversity(customerId);

        // 5. Load Firestore state and listen to updates
        await firebaseLoad();
        setupFirebaseListeners();

        // 6. Update branding & UI
        applyDynamicBranding(state.university);
        populateAllDynamicUI();

        // 7. Log in
        document.body.classList.remove('show-login');
        updateDateDisplay();
        setRole('admin');
        showToast(`University registered and Admin account created successfully!`);
      } else {
        // Offline mode demo registration
        const customerId = "CUST-" + Math.floor(100000 + Math.random() * 900000);
        
        // Clear local state first to prevent data leakage/pollution
        clearLocalState();
        
        const uniData = { name, shortName, code, customerId };
        state.university = uniData;
        localStorage.setItem("campusgrid_offline_uni", JSON.stringify(uniData));

        // Create an empty fresh calendar config
        state.calendarConfig = {
          termStart: "2026-05-01",
          termEnd: "2026-12-15",
          offDays: [0, 6],
          events: []
        };

        // Ensure local user exists
        const adminUser = {
          email: email,
          name: "University Admin",
          role: "admin",
          roles: ["admin"],
          customerId: customerId
        };
        state.currentUserProfile = adminUser;
        state.users = [adminUser];

        applyDynamicBranding(uniData);
        document.body.classList.remove('show-login');
        updateDateDisplay();
        setRole('admin');
        showToast(`Offline Demo: University registered successfully!`);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      showToast(`Registration Failed: ${err.message}`);
    } finally {
      newRegSubmit.innerText = "Create Portal & Account";
      newRegSubmit.disabled = false;
    }
  });
}

window.renderUserDirectory = function() {
  const container = document.getElementById("userDirectoryListContainer");
  if (!container) return;

  const searchQuery = document.getElementById("userDirectorySearch")?.value.trim().toLowerCase() || "";
  const roleFilter = document.getElementById("userDirectoryRoleFilter")?.value || "all";

  // Filter users
  const filteredUsers = (state.users || []).filter(u => {
    const matchesSearch = !searchQuery || 
      (u.name && u.name.toLowerCase().includes(searchQuery)) || 
      (u.email && u.email.toLowerCase().includes(searchQuery)) ||
      (u.id && u.id.toLowerCase().includes(searchQuery));
    
    const matchesRole = roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  if (filteredUsers.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
        No users found in directory.
      </div>
    `;
    return;
  }

  container.innerHTML = filteredUsers.map(u => {
    const roleColors = {
      admin: "background: #fef2f2; color: #ef4444; border: 1px solid #fee2e2;",
      faculty: "background: #eff6ff; color: #3b82f6; border: 1px solid #dbeafe;",
      facilities: "background: #fef3c7; color: #d97706; border: 1px solid #fef3c7;",
      student: "background: #f0fdf4; color: #22c55e; border: 1px solid #dcfce7;"
    };
    
    const rolesList = u.roles || [u.role];
    const rolesLabels = rolesList.map(r => {
      const roleStyle = roleColors[r] || "background: #f1f5f9; color: #475569;";
      return `<span style="font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 12px; text-transform: uppercase; margin-right: 4px; ${roleStyle}">${r}</span>`;
    }).join("");

    return `
      <div class="table-row" style="grid-template-columns: 2fr 1.5fr 1.7fr 80px; align-items: center; border-bottom: 1px solid var(--line); padding: 12px 16px;">
        <span style="font-weight: 500; font-size: 13px; color: var(--ink);">${u.name || 'N/A'} ${u.id ? `<span style="font-size: 11px; color: var(--text-muted); font-family: monospace;">(${u.id})</span>` : ''}</span>
        <span style="color: var(--text-muted); font-size: 13px; font-family: monospace;">${u.email}</span>
        <span>${rolesLabels}</span>
        <span style="text-align: right;">
          <button class="btn sm" style="background: #fff5f5; color: #e11d48; border: 1px solid #ffe4e6; font-size: 11px; font-weight: 600; padding: 4px 8px; cursor: pointer;" onclick="deleteUser('${u.email}')">Delete</button>
        </span>
      </div>
    `;
  }).join("");
};

window.deleteUser = async function(email) {
  const lowerEmail = (email || "").toLowerCase();
  if (!confirm(`Are you sure you want to delete the user with email ${lowerEmail}?`)) {
    return;
  }
  
  try {
    if (currentAppMode === 'firebase' && isFirebaseInitialized) {
      await fbDb.collection('users').doc(lowerEmail).delete();
      showToast(`User ${lowerEmail} deleted from database.`);
    } else {
      state.users = state.users.filter(u => (u.email || "").toLowerCase() !== lowerEmail);
      renderUserDirectory();
      showToast(`Offline Demo: User ${lowerEmail} deleted.`);
    }
  } catch (err) {
    console.error("Failed to delete user:", err);
    showToast(`Error: ${err.message}`);
  }
};

window.openAddUserModal = function() {
  document.getElementById("addUserModal")?.classList.remove("hidden");
  // Reset inputs
  const addUserName = document.getElementById("addUserName");
  if (addUserName) addUserName.value = "";
  const addUserEmail = document.getElementById("addUserEmail");
  if (addUserEmail) addUserEmail.value = "";
  const addUserPassword = document.getElementById("addUserPassword");
  if (addUserPassword) addUserPassword.value = "password123";
  
  // Reset checkboxes
  const checkboxes = document.querySelectorAll('input[name="addUserRoles"]');
  checkboxes.forEach((cb) => {
    cb.checked = (cb.value === "student"); // Default only Student checked
  });
};

window.closeAddUserModal = function() {
  document.getElementById("addUserModal")?.classList.add("hidden");
};

window.submitAddUser = async function() {
  const name = document.getElementById("addUserName")?.value.trim();
  const rawEmail = document.getElementById("addUserEmail")?.value.trim() || "";
  const email = rawEmail.toLowerCase();
  const password = document.getElementById("addUserPassword")?.value;
  
  const checkedCheckboxes = Array.from(document.querySelectorAll('input[name="addUserRoles"]:checked'));
  const roles = checkedCheckboxes.map(cb => cb.value);

  if (!name || !email || !password) {
    showToast("Name, Email and Password are required fields!");
    return;
  }
  
  if (roles.length === 0) {
    showToast("Please check at least one role for this user!");
    return;
  }

  const primaryRole = roles[0]; // first checked role
  const userId = (primaryRole === 'faculty' ? 'FAC-' : primaryRole === 'admin' ? 'ADM-' : primaryRole === 'facilities' ? 'FCL-' : 'STU-') + Math.floor(1000 + Math.random() * 9000);

  const btn = document.getElementById("submitAddUserBtn");
  if (btn) {
    btn.innerText = "Creating...";
    btn.disabled = true;
  }

  try {
    if (currentAppMode === 'firebase' && isFirebaseInitialized) {
      // Create user auth account via secondary app to avoid logging out the admin
      try {
        const tempAppName = "TempApp_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        const tempApp = firebase.initializeApp(activeFbConfig, tempAppName);
        await tempApp.auth().createUserWithEmailAndPassword(email, password);
        await tempApp.delete();
      } catch (authErr) {
        console.warn("Auth user creation warning:", authErr);
      }

      // Save user doc to Firestore
      const newUserDoc = {
        email: email,
        name: name,
        role: primaryRole,
        roles: roles,
        id: userId,
        customerId: state.currentUserProfile?.customerId || state.university?.customerId || "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await fbDb.collection('users').doc(email).set(newUserDoc);
      showToast(`User ${name} successfully created in Firestore.`);
    } else {
      // Offline mode save
      const newUser = {
        email: email,
        name: name,
        role: primaryRole,
        roles: roles,
        id: userId
      };
      // Overwrite if email exists
      state.users = state.users.filter(u => (u.email || "").toLowerCase() !== email);
      state.users.push(newUser);
      renderUserDirectory();
      showToast(`Offline Demo: User ${name} created.`);
    }
    closeAddUserModal();
  } catch (err) {
    console.error("Failed to create user:", err);
    showToast(`Error: ${err.message}`);
  } finally {
    if (btn) {
      btn.innerText = "Create User";
      btn.disabled = false;
    }
  }
};

window.processBulkUpload = async function(file, role) {
  try {
    const data = await parseExcelOrCsv(file);
    if (data.length === 0) {
      showToast("Uploaded sheet is empty!");
      return;
    }
    
    // Validate required fields
    const valid = data.every(item => item.email && item.name);
    if (!valid) {
      showToast("Invalid format: Each row must contain at least 'Name' and 'Email'.");
      return;
    }
    
    let count = 0;
    const customerId = state.currentUserProfile?.customerId || state.university?.customerId || "";
    
    if (currentAppMode === 'firebase' && isFirebaseInitialized) {
      for (const item of data) {
        const email = item.email.trim().toLowerCase();
        const name = item.name.trim();
        const id = item.id ? item.id.trim() : (role === 'faculty' ? 'FAC-' : 'STU-') + Math.floor(1000 + Math.random() * 9000);
        
        try {
          const tempAppName = "TempApp_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
          const tempApp = firebase.initializeApp(activeFbConfig, tempAppName);
          await tempApp.auth().createUserWithEmailAndPassword(email, "password123");
          await tempApp.delete();
        } catch (e) {
          // Ignore auth issues if user already exists
        }
        
        const userDoc = {
          email,
          name,
          role,
          roles: [role],
          id,
          customerId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (role === 'faculty' && item.taughtcourses) {
          userDoc.taughtCourses = item.taughtcourses.split(",").map(c => c.trim()).filter(Boolean);
        } else if (role === 'student' && item.enrolledcourses) {
          userDoc.enrolledCourses = item.enrolledcourses.split(",").map(c => c.trim()).filter(Boolean);
        }

        await fbDb.collection('users').doc(email).set(userDoc);
        count++;
      }
      showToast(`Successfully uploaded ${count} ${role} users to Firebase.`);
    } else {
      // Offline mode
      for (const item of data) {
        const email = item.email.trim().toLowerCase();
        const name = item.name.trim();
        const id = item.id ? item.id.trim() : (role === 'faculty' ? 'FAC-' : 'STU-') + Math.floor(1000 + Math.random() * 9000);
        
        const newUser = {
          email,
          name,
          role,
          roles: [role],
          id,
          customerId
        };

        if (role === 'faculty' && item.taughtcourses) {
          newUser.taughtCourses = item.taughtcourses.split(",").map(c => c.trim()).filter(Boolean);
        } else if (role === 'student' && item.enrolledcourses) {
          newUser.enrolledCourses = item.enrolledcourses.split(",").map(c => c.trim()).filter(Boolean);
        }

        state.users = state.users.filter(u => (u.email || "").toLowerCase() !== email);
        state.users.push(newUser);
        count++;
      }
      renderUserDirectory();
      showToast(`Offline Demo: Uploaded ${count} ${role} users.`);
    }
  } catch (err) {
    console.error("Bulk upload processing failed:", err);
    showToast(`Upload failed: ${err.message}`);
  }
};

window.showFacultyDropdown = function() {
  const dropdown = document.getElementById("facultyDropdown");
  if (!dropdown) return;
  
  // Get all users who are faculty
  const facultyUsers = (state.users || []).filter(u => u.role === 'faculty' || (u.roles && u.roles.includes('faculty')));
  const searchVal = document.getElementById("builderFacultySearch").value.trim().toLowerCase();
  
  const filtered = facultyUsers.filter(u => 
    !searchVal || 
    (u.name && u.name.toLowerCase().includes(searchVal)) || 
    (u.email && u.email.toLowerCase().includes(searchVal)) || 
    (u.id && u.id.toLowerCase().includes(searchVal))
  );
  
  if (filtered.length === 0) {
    dropdown.innerHTML = `<div style="padding: 10px 12px; color: var(--text-muted); font-size: 13px;">No faculty found</div>`;
  } else {
    dropdown.innerHTML = filtered.map(u => `
      <div class="dropdown-item" style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid var(--line); font-size: 13px;" onclick="selectFaculty('${u.name.replace(/'/g, "\\'")}', '${u.email}')">
        <strong style="display:block; color:var(--ink);">${u.name}</strong>
        <span style="font-size:11px; color:var(--text-muted); font-family:monospace;">${u.email} ${u.id ? `| ID: ${u.id}` : ''}</span>
      </div>
    `).join("");
  }
  dropdown.classList.remove("hidden");
};

window.filterFacultyDropdown = function() {
  showFacultyDropdown();
};

window.selectFaculty = function(name, email) {
  document.getElementById("builderFacultySearch").value = name;
  document.getElementById("builderFacultyName").value = name;
  document.getElementById("builderFacultyEmail").value = email;
  document.getElementById("facultyDropdown").classList.add("hidden");
  updateLivePreview();
};

// Close dropdown on click outside
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("facultyDropdown");
  const searchInput = document.getElementById("builderFacultySearch");
  if (dropdown && !dropdown.contains(e.target) && e.target !== searchInput) {
    dropdown.classList.add("hidden");
  }
});

let currentCourseStudents = [];

window.handleCourseStudentsUpload = async function(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const data = await parseExcelOrCsv(file);
    if (data.length === 0) {
      showToast("Uploaded sheet is empty!");
      return;
    }

    const valid = data.every(item => item.email && item.name);
    if (!valid) {
      showToast("Invalid format: Each row must contain at least 'Name' and 'Email'.");
      return;
    }

    currentCourseStudents = data.map(s => ({
      name: s.name.trim(),
      email: s.email.trim(),
      id: s.id ? s.id.trim() : 'STU-' + Math.floor(1000 + Math.random() * 9000)
    }));

    // Update count in UI
    const countEl = document.getElementById("builderEnrolledCount");
    if (countEl) countEl.innerText = `${currentCourseStudents.length} students`;

    // Update preview list
    const previewEl = document.getElementById("courseStudentsListPreview");
    if (previewEl) {
      previewEl.innerHTML = currentCourseStudents.map(s => `
        <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid #f1f5f9;">
          <span>${s.name} (${s.email})</span>
          <span style="font-family:monospace; color:var(--text-muted);">${s.id}</span>
        </div>
      `).join("");
    }

    showToast(`Imported ${currentCourseStudents.length} students for this course.`);
  } catch (err) {
    console.error("Course students upload failed:", err);
    showToast(`Failed to parse file: ${err.message}`);
  }
};

// Sign Out click handler via event delegation
document.addEventListener('click', e => {
  const btn = e.target.closest('#signOutBtn');
  if (btn) {
    if (currentAppMode === 'firebase' && isFirebaseInitialized) {
      fbAuth.signOut().then(() => {
        resetFirebaseListeners();
        state.currentUserProfile = null;
        showToast("Logged out of Firebase.");
        document.body.classList.add('show-login');
        window.location.reload();
      }).catch(err => {
        showToast("Logout failed: " + err.message);
      });
    } else {
      state.currentUserProfile = null;
      showToast("Signed out of Demo.");
      document.body.classList.add('show-login');
      window.location.reload();
    }
  }
});

// Excel & CSV parsing helper function using SheetJS (xlsx)
async function parseExcelOrCsv(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (rows.length === 0) {
          resolve([]);
          return;
        }
        
        // Map headers dynamically (case-insensitive and whitespace tolerant)
        const headers = rows[0].map(h => String(h || "").trim().toLowerCase());
        const result = [];
        
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0 || row.every(cell => cell === null || cell === undefined || String(cell).trim() === "")) {
            continue; // Skip empty rows
          }
          const obj = {};
          headers.forEach((h, colIdx) => {
            let val = row[colIdx];
            if (val === undefined || val === null) val = "";
            else val = String(val).trim();
            
            let key = h;
            if (h.includes("name")) key = "name";
            else if (h.includes("email")) key = "email";
            else if (h.includes("id") || h.includes("roll")) key = "id";
            else if (h.includes("role")) key = "role";
            else if (h.includes("taught")) key = "taughtcourses";
            else if (h.includes("enrolled")) key = "enrolledcourses";
            
            obj[key] = val;
          });
          result.push(obj);
        }
        resolve(result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}

// Download Excel File helper
function downloadExcelFile(headers, rows, filename) {
  const worksheetData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
}

// Download User Directory Template
window.downloadUserTemplate = function(role) {
  if (role === 'faculty') {
    const headers = ["Name", "Email", "Employee ID", "Taught Courses (comma-separated)"];
    const rows = [];
    downloadExcelFile(headers, rows, "CG_Faculty_Roster_Template.xlsx");
    showToast("Faculty roster template downloaded.");
  } else {
    const headers = ["Name", "Email", "Student ID", "Enrolled Courses (comma-separated)"];
    const rows = [];
    downloadExcelFile(headers, rows, "CG_Students_Roster_Template.xlsx");
    showToast("Students roster template downloaded.");
  }
};

// Download Course Roster Dynamic Template (Pre-populated with active course roster)
window.downloadCourseRosterTemplate = function() {
  const group = mockSlotGroups.find(g => g.id === editingMasterCourseData?.groupId);
  const course = group ? group.courses.find(c => c.id === editingMasterCourseData?.courseId) : null;
  const courseCode = course ? course.id : "Course";

  const headers = ["Name", "Email", "Student ID"];
  const rows = [];

  if (course && course.students && course.students.length > 0) {
    course.students.forEach(s => {
      rows.push([s.name || "", s.email || "", s.id || ""]);
    });
    downloadExcelFile(headers, rows, `CG_${courseCode}_Roster.xlsx`);
    showToast(`Downloaded active roster of ${rows.length} students for ${courseCode}.`);
  } else {
    // Return empty template with headers
    downloadExcelFile(headers, rows, `CG_${courseCode}_Roster_Template.xlsx`);
    showToast(`Downloaded template for ${courseCode}.`);
  }
};

// ── Change Password Modal Functions ─────────────────────────────────────────
window.openChangePasswordModal = function() {
  const modal = document.getElementById("changePasswordModal");
  if (modal) {
    document.getElementById("changePasswordNew").value = "";
    document.getElementById("changePasswordConfirm").value = "";
    modal.classList.remove("hidden");
  }
};

window.closeChangePasswordModal = function() {
  const modal = document.getElementById("changePasswordModal");
  if (modal) modal.classList.add("hidden");
};

window.submitChangePassword = async function() {
  const newPass = document.getElementById("changePasswordNew")?.value;
  const confPass = document.getElementById("changePasswordConfirm")?.value;

  if (!newPass) {
    showToast("Please enter a new password.");
    return;
  }
  if (newPass.length < 6) {
    showToast("Password must be at least 6 characters.");
    return;
  }
  if (newPass !== confPass) {
    showToast("Passwords do not match.");
    return;
  }

  if (currentAppMode === 'firebase' && isFirebaseInitialized) {
    const user = fbAuth.currentUser;
    if (user) {
      try {
        await user.updatePassword(newPass);
        showToast("Password updated successfully in Firebase.");
        closeChangePasswordModal();
      } catch (err) {
        console.error("Failed to update password:", err);
        showToast(`Failed to update password: ${err.message}`);
      }
    } else {
      showToast("No logged in user found in Firebase.");
    }
  } else {
    // Offline mode mock update
    showToast("Offline Demo: Password updated successfully.");
    closeChangePasswordModal();
  }
};
