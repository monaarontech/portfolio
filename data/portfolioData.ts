export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  tags: string[];
  features: string[];
  coverImage: string;
  galleryImages: { url: string; caption: string; tag: string }[];
  repoUrl?: string;
  liveUrl?: string;
  stats: { label: string; value: string }[];
  isFlagship?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: string; note: string }[];
}

export const PERSONAL_INFO = {
  name: "Mon Aaron Marcelo",
  firstName: "Mon Aaron",
  lastName: "Marcelo",
  role: "Full-Stack Software Developer & IT Scholar",
  subtitle: "BS Information Technology • NEUST Atate Campus",
  university: "Nueva Ecija University of Science and Technology",
  campus: "Atate Campus, Palayan City",
  location: "Palayan City, Nueva Ecija, Philippines",
  coordinates: "15.5408° N, 121.0850° E",
  email: "monaarontech@gmail.com",
  github: "https://github.com/monaarontech",
  githubUser: "monaarontech",
  availability: "Open for Software Engineering & Full-Stack Opportunities",
  yearsCoding: "3+ Years",
  statement:
    "Engineering purpose-built civic software systems, robust database architectures, and cinematic digital experiences that transform traditional workflows into effortless solutions.",
  pullQuote:
    "Software is at its most powerful when it bridges real human needs — eliminating congested physical queues, securing sensitive records, and serving communities with dignity.",
  stats: [
    { label: "Municipal Records Engine", value: "10K+" },
    { label: "Verified Architecture Projects", value: "5+" },
    { label: "ISO/IEC 25010 Standard", value: "100%" },
    { label: "Academic Degree Focus", value: "BSIT" },
  ],
};

export const FLAGSHIP_PROJECT: Project = {
  id: "palayan-kalinga-hub",
  number: "01",
  title: "One Palayan-Kalinga Hub",
  category: "Civic Tech & Enterprise Web System",
  tagline:
    "Integrated Social Welfare Appointment, Housing Beneficiary Placement, and AICS Tracking System for CSWDO Palayan City",
  description:
    "A full-stack, enterprise-grade municipal welfare management system developed to replace manual paper logbooks, congested physical lines, and fragmented spreadsheets at the City Social Welfare and Development Office (CSWDO) in Palayan City, Nueva Ecija.",
  problem:
    "Before this system, vulnerable citizens had to wait in hours-long physical queues to book social assistance, while municipal case workers faced document loss, duplicate claim risks, and severe latency retrieving physical folders.",
  solution:
    "Engineered a centralized relational web ecosystem featuring automated multi-department appointment slotting, real-time AICS (Assistance to Individuals in Crisis Situations) Kanban case progression, socialized housing beneficiary registries, and dedicated self-service portals for senior citizens and persons with disabilities (PWDs).",
  tags: ["PHP 8", "MySQL", "JavaScript ES6+", "Server-Sent Events", "AJAX", "CSS3 / Modern UI", "Agile / ISO 25010"],
  features: [
    "AICS Kanban Case Management: Multi-stage pipeline tracking food, medical, educational, and emergency burial assistance from intake to fund disbursement.",
    "Automated Appointment Slotting Engine: Dynamic blackout date calendars, time-slot quota limits, and instant printable appointment slips with QR verification.",
    "Socialized Housing (AKAP & San Lorenzo) Portal: Digital document submission, income assessment tracking, and beneficiary allocation records.",
    "Inclusive Senior & PWD Portals: Simplified high-contrast portals enabling accessible self-service benefit applications and verification.",
    "Real-Time Server-Sent Events (SSE): Push notifications for status approvals and appointment reminders without manual page refreshing.",
    "Data Privacy & Audit Logging: Strict role-based access control (Admin, Staff, Resident) and immutable action tracing complying with Philippine RA 10173.",
  ],
  coverImage: "/images/projects/palayan-cover.png",
  galleryImages: [
    {
      url: "/images/projects/palayan-cover.png",
      caption: "Public Welfare Portal & Resident Dashboard",
      tag: "Main Hub Interface",
    },
    {
      url: "/images/projects/palayan-ap1.png",
      caption: "Automated Multi-Service Appointment Slot Booking Slip",
      tag: "Appointment Engine",
    },
    {
      url: "/images/projects/palayan-aics1.png",
      caption: "AICS Emergency Crisis Financial & Food Aid Workflow",
      tag: "AICS Tracking",
    },
    {
      url: "/images/projects/palayan-housing.png",
      caption: "Socialized Housing Program & AKAP Beneficiary Management",
      tag: "Housing Registry",
    },
    {
      url: "/images/projects/palayan-pwd.png",
      caption: "Persons with Disabilities (PWD) Dedicated Services & Support",
      tag: "PWD Portal",
    },
    {
      url: "/images/projects/palayan-senior.png",
      caption: "Senior Citizens Welfare Benefits & Social Pension Registry",
      tag: "Senior Care Portal",
    },
  ],
  repoUrl: "https://github.com/monaarontech/palayan_kalinga_hub",
  liveUrl: "https://github.com/monaarontech/palayan_kalinga_hub",
  stats: [
    { label: "Municipal Target", value: "Palayan City" },
    { label: "Evaluation Standard", value: "ISO/IEC 25010" },
    { label: "Core Modules", value: "6 Portals" },
    { label: "Architecture", value: "Full-Stack PHP/MySQL" },
  ],
  isFlagship: true,
};

export const SUPPORTING_PROJECTS: Project[] = [
  {
    id: "auth-system",
    number: "02",
    title: "Secure Two-Factor OTP & Auth Engine",
    category: "Cybersecurity & Backend Architecture",
    tagline: "Enterprise PHP Authentication with PHPMailer SMTP & Brute-Force Rate Limiting",
    description:
      "A hardened authentication subsystem implementing time-sensitive one-time passcodes (OTP), bcrypt password hashing, session regeneration defense, and automated IP rate-limiting to prevent unauthorized credential stuffing.",
    problem:
      "Legacy web systems vulnerable to brute-force credential stuffing and password reuse attacks require multi-layered authentication barriers.",
    solution:
      "Architected a standalone security module with SMTP-driven OTP dispatch, token expiration enforcement, and input sanitation protecting database integrity.",
    tags: ["PHP 8", "MySQL", "PHPMailer", "Security", "JavaScript Validation"],
    features: [
      "Time-limited 6-digit OTP verification via SMTP mail relay",
      "Dynamic rate limiting and cooldown counters to resist brute force",
      "Bcrypt password hashing with secure salt derivation",
      "Session fixation protection and strict credential validation",
    ],
    coverImage: "/images/projects/palayan-ap1.png",
    galleryImages: [
      {
        url: "/images/projects/palayan-ap1.png",
        caption: "Authentication and credential verification pipeline",
        tag: "Security Gateway",
      },
    ],
    repoUrl: "https://github.com/monaarontech",
    stats: [
      { label: "Security Level", value: "2FA / MFA" },
      { label: "Hash Protocol", value: "Bcrypt" },
    ],
  },
  {
    id: "activity-monitor",
    number: "03",
    title: "Campus Lab Workstation & Session Monitor",
    category: "Systems Administration & Web App",
    tagline: "Academic Computer Laboratory Resource Management and Usage Tracker",
    description:
      "A synchronized management and logging system designed for university computer laboratory infrastructure, recording student workstation sessions, system availability, and terminal utilization.",
    problem:
      "Manual sign-in sheets in university computer laboratories lead to unverified student usage, lost equipment accountability, and lack of real-time terminal occupancy insights.",
    solution:
      "Created a web-based workstation tracking portal allowing instructors and lab admins to view active terminals, track student session durations, and monitor lab capacity in real time.",
    tags: ["PHP", "MySQL", "JavaScript", "Infrastructure Monitoring", "CSS3"],
    features: [
      "Real-time terminal status board (Active, Idle, Maintenance)",
      "Student session check-in and checkout audit logs",
      "Automated time tracking and usage quota calculations",
      "Laboratory supervisor dashboard with exportable usage reports",
    ],
    coverImage: "/images/projects/palayan-housing.png",
    galleryImages: [
      {
        url: "/images/projects/palayan-housing.png",
        caption: "Workstation session management interface",
        tag: "Lab Dashboard",
      },
    ],
    repoUrl: "https://github.com/monaarontech",
    stats: [
      { label: "Environment", value: "University ComLab" },
      { label: "Tracking Type", value: "Real-Time Terminal" },
    ],
  },
  {
    id: "python-simulations",
    number: "04",
    title: "Algorithmic Simulations & Pygame Engines",
    category: "Computer Science & Game Mechanics",
    tagline: "Physics-Based Game Loops, State Machines, and Binary Data Processing",
    description:
      "A collection of procedural graphical simulations and algorithmic game prototypes created in Python, exploring delta-time frame loops, collision detection mathematics, and discrete data structures.",
    problem:
      "Understanding low-level game loops, framerate independence, and algorithmic logic requires building game engines from foundational mathematical principles.",
    solution:
      "Implemented custom game state machines, collision detection algorithms, and binary data encoding pipelines utilizing Python and Pygame.",
    tags: ["Python 3", "Pygame", "Algorithms", "Object-Oriented Design"],
    features: [
      "Framerate-independent physics loop with gravity and velocity vectors",
      "Discrete finite state machines for player states and game sequences",
      "Binary data encoding and algorithmic problem solving",
      "Interactive turtle graphics and procedural geometry generation",
    ],
    coverImage: "/images/projects/palayan-pwd.png",
    galleryImages: [
      {
        url: "/images/projects/palayan-pwd.png",
        caption: "Simulation loops and state machine architecture",
        tag: "Engine Core",
      },
    ],
    repoUrl: "https://github.com/monaarontech",
    stats: [
      { label: "Core Language", value: "Python 3" },
      { label: "Paradigm", value: "OOP & Physics" },
    ],
  },
  {
    id: "java-database-gui",
    number: "05",
    title: "Java Desktop Relational Database Client",
    category: "Desktop Software & Systems",
    tagline: "Swing/AWT Database Management Tool with JDBC MySQL Synchronization",
    description:
      "An Object-Oriented desktop software application engineered in Java with NetBeans, providing a graphical CRUD management console directly connected to MySQL/XAMPP database servers.",
    problem:
      "Direct desktop database administration without web overhead demands lightweight, reliable desktop UI clients with strict schema typing.",
    solution:
      "Built a Java Swing desktop application implementing JDBC connection pooling, prepared statements, and dynamic table rendering for rapid record management.",
    tags: ["Java", "JDBC", "MySQL", "Swing / AWT", "NetBeans"],
    features: [
      "Direct JDBC socket connection to local or remote MySQL databases",
      "Interactive JTable dynamic rendering with sorting and search filters",
      "Transactional CRUD execution with rollback error protection",
      "Custom UI layout with input validation and modal feedback",
    ],
    coverImage: "/images/projects/palayan-senior.png",
    galleryImages: [
      {
        url: "/images/projects/palayan-senior.png",
        caption: "Java Swing database interface and record manipulator",
        tag: "Desktop Client",
      },
    ],
    repoUrl: "https://github.com/monaarontech",
    stats: [
      { label: "Language", value: "Java SE" },
      { label: "Connector", value: "JDBC MySQL" },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "Layout",
    skills: [
      { name: "Next.js & React", level: "Advanced", note: "App Router, SSR, Server Components" },
      { name: "TypeScript & JavaScript", level: "Advanced", note: "ES6+, Async/Await, Strict Types" },
      { name: "Tailwind CSS", level: "Expert", note: "Custom design systems, animations, dark mode" },
      { name: "HTML5 & Semantic Web", level: "Expert", note: "Accessible DOM, Canvas, Web APIs" },
      { name: "Responsive UI/UX", level: "Advanced", note: "Mobile-first layouts, micro-interactions" },
    ],
  },
  {
    title: "Backend & Systems Architecture",
    icon: "Server",
    skills: [
      { name: "PHP 8 & Modern PHP", level: "Expert", note: "OOP, MVC patterns, Session security" },
      { name: "Node.js & Express", level: "Proficient", note: "RESTful microservices, JSON APIs" },
      { name: "RESTful API Engineering", level: "Advanced", note: "CRUD endpoints, authentication, status codes" },
      { name: "Server-Sent Events (SSE)", level: "Advanced", note: "Real-time unidirected streaming alerts" },
      { name: "Security & Rate Limiting", level: "Advanced", note: "Bcrypt, CSRF tokens, OTP 2FA verification" },
    ],
  },
  {
    title: "Database Management",
    icon: "Database",
    skills: [
      { name: "MySQL & MariaDB", level: "Expert", note: "Schema normalization, complex JOINs, indexing" },
      { name: "PDO & Prepared Statements", level: "Expert", note: "SQL injection immunity, transaction safety" },
      { name: "Relational Modeling", level: "Advanced", note: "Entity-Relationship diagrams, foreign constraints" },
      { name: "Query Optimization", level: "Advanced", note: "Execution plans, indexed searching" },
    ],
  },
  {
    title: "Programming Languages & Runtimes",
    icon: "Code",
    skills: [
      { name: "PHP", level: "Primary Stack", note: "Server logic, municipal platforms, security" },
      { name: "JavaScript / TypeScript", level: "Primary Stack", note: "Frontend reactivity, Next.js, AJAX" },
      { name: "Python", level: "Proficient", note: "Pygame simulations, algorithmic logic, automation" },
      { name: "Java", level: "Proficient", note: "Object-oriented design, JDBC desktop clients" },
      { name: "SQL", level: "Primary Stack", note: "DDL, DML, relational queries, stored structures" },
    ],
  },
  {
    title: "Engineering Tools & Methodologies",
    icon: "Cpu",
    skills: [
      { name: "Git & GitHub", level: "Advanced", note: "Branching, PRs, version control workflows" },
      { name: "ISO/IEC 25010 Evaluation", level: "Specialist", note: "Software product quality measurement" },
      { name: "Agile Development", level: "Practitioner", note: "Iterative sprints, backlog, stakeholder feedback" },
      { name: "XAMPP & Apache", level: "Advanced", note: "Local staging, virtual hosts, PHP environment" },
      { name: "Vercel Deployment", level: "Advanced", note: "CI/CD pipelines, edge runtime, zero-downtime" },
    ],
  },
];

export const WORK_PROCESS = [
  {
    step: "01",
    title: "Discover & Investigate",
    tagline: "Empathetic Stakeholder Discovery",
    desc: "Engaging directly with end-users and real-world stakeholders (such as CSWDO social workers and municipal administrators) to diagnose operational bottlenecks, evaluate paper legacy dependencies, and establish concrete system requirements.",
  },
  {
    step: "02",
    title: "Architect & Normalize",
    tagline: "Relational Schema & Security Hardening",
    desc: "Designing normalized relational databases (3NF), mapping entity relationships, and establishing security baselines: session token hardening, password hashing, and role-based access control.",
  },
  {
    step: "03",
    title: "Design & Prototype",
    tagline: "Cinematic UI & Intuitive UX Systems",
    desc: "Drafting high-contrast design systems with clear typography, accessible contrast ratios, and micro-interactions that make complex bureaucratic procedures feel straightforward and reassuring.",
  },
  {
    step: "04",
    title: "Engineer & Integrate",
    tagline: "Agile Development & Real-Time Workflows",
    desc: "Executing modular full-stack code with clean component boundaries, asynchronous AJAX pipelines, Server-Sent Events, and rigorous error handling across desktop and mobile form factors.",
  },
  {
    step: "05",
    title: "Evaluate & Deploy",
    tagline: "ISO/IEC 25010 Quality Assurance & Vercel Launch",
    desc: "Subjecting the application to formal ISO/IEC 25010 evaluation across Functional Suitability, Performance Efficiency, Usability, Reliability, and Security before continuous deployment to production.",
  },
];
