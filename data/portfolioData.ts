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
  role: "Junior Developer",
  specialization: "Web Developer",
  subtitle: "Junior Developer & Web Developer • NEUST",
  college: "NEUST",
  university: "Nueva Ecija University of Science and Technology",
  campus: "Atate Campus, Palayan City",
  location: "Palayan City, Nueva Ecija, Philippines",
  coordinates: "15.5408° N, 121.0850° E",
  email: "monaarontech@gmail.com",
  intro: "Hi, I'm Mon Aaron Marcelo.",
  tagline: "Turning ideas into digital reality.",
  bio: "I'm an aspiring Junior Developer with a passion for building modern, functional, and user-friendly web applications. I enjoy exploring new technologies, solving problems through programming, and continuously improving my development skills.\n\nI believe that every great application starts with a simple idea and becomes meaningful through creativity, dedication, and continuous learning.",
  github: "https://github.com/monaarontech/",
  githubUser: "monaarontech",
  instagram: "https://www.instagram.com/m.aaronn__/",
  instagramUser: "m.aaronn__",
  tiktok: "https://www.tiktok.com/@aaronnnn09m",
  tiktokUser: "@aaronnnn09m",
  facebook: "https://www.facebook.com/yahja.ognimod.7",
  facebookUser: "yahja.ognimod.7",
  availability: "Available for Junior Developer & Web Development Roles",
  yearsCoding: "3+ Years",
  pullQuote:
    "Every great application starts with a simple idea and becomes meaningful through creativity, dedication, and continuous learning.",
  stats: [
    { label: "Municipal Records Engine", value: "10K+" },
    { label: "Verified Architecture Projects", value: "5+" },
    { label: "ISO/IEC 25010 Standard", value: "100%" },
    { label: "Academic Degree Focus", value: "BSIT" },
  ],
};

export const SOCIAL_LINKS = [
  {
    platform: "GitHub",
    username: "monaarontech",
    url: PERSONAL_INFO.github,
    color: "#FFFFFF",
    bgHover: "hover:border-white/40 hover:shadow-white/10",
    description: "Explore open-source civic repositories, system architectures & capstones.",
    followers: "Active Repos",
  },
  {
    platform: "Facebook",
    username: "Mon Aaron Marcelo",
    url: PERSONAL_INFO.facebook,
    color: "#1877F2",
    bgHover: "hover:border-[#1877F2]/50 hover:shadow-[#1877F2]/20",
    description: "Connect with me directly on Facebook. Encoded in my physical ID QR code.",
    followers: "Direct Connect",
  },
  {
    platform: "Instagram",
    username: "@m.aaronn__",
    url: PERSONAL_INFO.instagram,
    color: "#E1306C",
    bgHover: "hover:border-[#E1306C]/50 hover:shadow-[#E1306C]/20",
    description: "Personal updates, university life, developer moments, and tech hobbies.",
    followers: "Photos & Stories",
  },
  {
    platform: "TikTok",
    username: "@aaronnnn09m",
    url: PERSONAL_INFO.tiktok,
    color: "#00F2FE",
    bgHover: "hover:border-[#00F2FE]/50 hover:shadow-[#00F2FE]/20",
    description: "Short clips, creative projects, technology trends, and daily developer vibes.",
    followers: "Short Clips",
  },
];

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
    "Engineered a centralized relational web ecosystem featuring automated multi-department appointment slotting, real-time AICS (Assistance to Individuals in Crisis Situations) tracking, socialized housing beneficiary registries, and dedicated self-service citizen portals.",
  tags: ["PHP 8", "MySQL", "JavaScript ES6+", "Server-Sent Events", "CSWDO Palayan City", "Bootstrap / Modern CSS"],
  features: [
    "CSWDO Palayan City Resident Dashboard: Citizen profile management, appointment scheduling, and AICS crisis assistance tracking.",
    "Streamlined Social Welfare Booking: Real-time slot allocation, booking slips, and automated status notifications.",
    "AICS Crisis Tracking & Housing: Multi-tier cash assistance pipeline and socialized housing program allocations.",
    "Citizen Self-Service & Accessibility: Inclusive interface designed for ease of use by seniors, PWDs, and general constituents.",
    "Real-time Municipal Metrics: Tracked 847+ appointments served and ₱1.2M+ in released AICS assistance.",
  ],
  coverImage: "/images/projects/palayan-kalinga-hub-landing.png",
  galleryImages: [
    {
      url: "/images/projects/palayan-kalinga-hub-landing.png",
      caption: "One Palayan-Kalinga Hub Official Public Landing Page",
      tag: "Public Portal",
    },
    {
      url: "/images/projects/palayan-kalinga-hub-portal.png",
      caption: "Citizen Profile & Services Resident Dashboard (Mon Marcelo)",
      tag: "Resident Dashboard",
    },
    {
      url: "/images/projects/palayan-cover.png",
      caption: "Welfare Management System Overview",
      tag: "System Architecture",
    },
    {
      url: "/images/projects/palayan-ap1.png",
      caption: "Automated Appointment Slip and Reservation Protocol",
      tag: "Appointment Engine",
    },
  ],
  repoUrl: "https://github.com/monaarontech/palayan_kalinga_hub",
  liveUrl: "https://github.com/monaarontech/palayan_kalinga_hub",
  stats: [
    { label: "Municipal Partner", value: "Palayan City CSWDO" },
    { label: "Appointments Served", value: "847+" },
    { label: "AICS Aid Released", value: "₱1.2M+" },
    { label: "Tech Stack", value: "PHP & MySQL" },
  ],
  isFlagship: true,
};

export const SUPPORTING_PROJECTS: Project[] = [
  {
    id: "usg-voting-system",
    number: "02",
    title: "University Student Government Voting System",
    category: "Full-Stack Web & Election Platform",
    tagline: "Enhanced v2.0 Student Voting Dashboard, Candidate Showcase, and Secure Election Portal",
    description:
      "An automated campus voting management platform engineered to deliver transparent, tamper-resistant university student council elections with instant ballot tallies and digital voter receipts.",
    problem:
      "Traditional paper ballots in student government elections lead to lengthy manual counting delays, disputed ballots, high printing expenses, and low voter engagement.",
    solution:
      "Developed an intuitive student election portal featuring a real-time election status monitor, role-based voting authorization, digital candidate brochures, and instant ballot receipt generation.",
    tags: ["Python", "Flask / Web Engine", "MySQL / SQLite", "HTML5 / CSS3", "JavaScript", "Election Security"],
    features: [
      "Student Election Dashboard: Live status indicators showing active election states, total votes cast, and available positions.",
      "Multi-Position Ballot Interface: Structured voting workflow supporting 8 simultaneous council positions and multiple candidates.",
      "Digital Ballot Receipt: Automated receipt generation confirming vote submission while preserving voter anonymity.",
      "Candidate Showcase & Profiles: Comprehensive platform for students to review candidate platforms and credentials before voting.",
      "Real-Time Election State Control: Administrative controls to safely open, pause, and conclude campus elections.",
    ],
    coverImage: "/images/projects/usg-voting-system.png",
    galleryImages: [
      {
        url: "/images/projects/usg-voting-system.png",
        caption: "Enhanced v2.0 University Student Government Voting Dashboard",
        tag: "Student Dashboard",
      },
    ],
    repoUrl: "https://github.com/monaarontech",
    stats: [
      { label: "Platform Version", value: "v2.0 Enhanced" },
      { label: "Council Positions", value: "8 Positions" },
      { label: "Security", value: "One-Vote Quota" },
      { label: "Core Stack", value: "Python / Web" },
    ],
  },
  {
    id: "flappy-bird-python",
    number: "03",
    title: "Malupiton the Bird: Pygame Arcade",
    category: "Game Development & Physics Engine",
    tagline: "Classic 2D Arcade Engine Built in Python 3.12 with Pygame 2.6 and Custom Physics Loops",
    description:
      "A physics-driven 2D arcade recreation programmed from scratch in Python and Pygame, featuring dynamic delta-time animation loops, bounding-box collision algorithms, sound effect triggers, and score tracking.",
    problem:
      "Game development requires mastering framerate independence, coordinate-space mathematics, sprite sheet animation timing, and event-driven collision handling without high-level game engine abstractions.",
    solution:
      "Engineered a modular Python game architecture using Pygame 2.6.1 that implements gravity acceleration, jump impulse velocity, dynamic obstacle pipe generation, audio synthesis, and game state transitions (Intro, Active, Game Over).",
    tags: ["Python 3.12", "Pygame 2.6", "OOP", "2D Physics", "Game Loop Architecture", "Audio FX Engine"],
    features: [
      "Physics & Gravity Simulation: Realistic vertical acceleration, flap impulse physics, and terminal velocity limits.",
      "AABB 2D Collision Detection: Pixel-accurate bounding-box collision testing between player sprites, ground bases, and moving pipes.",
      "Dynamic Obstacle Generation: Procedural pipe spacing and randomized gap heights for continuous difficulty scaling.",
      "Audio & Sound Integration: Sound effect triggers for wing flap, score increments, and collision impacts.",
      "60 FPS Game Loop: Tick-synchronized frame timing ensuring smooth, fluid gameplay across varying hardware.",
    ],
    coverImage: "/images/projects/flappy-bird-python.png",
    galleryImages: [
      {
        url: "/images/projects/flappy-bird-python.png",
        caption: "Malupiton the Bird Pygame Runtime with VS Code Development Environment",
        tag: "Game Runtime & Code",
      },
    ],
    repoUrl: "https://github.com/monaarontech",
    stats: [
      { label: "Python Engine", value: "Python 3.12" },
      { label: "Graphics Framework", value: "Pygame 2.6" },
      { label: "Framerate Target", value: "60 FPS Fixed" },
      { label: "Mechanics", value: "AABB Physics" },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "Layout",
    skills: [
      { name: "Next.js & React", level: "Primary Stack", note: "App Router, SSR, Server Components" },
      { name: "TypeScript & JavaScript", level: "Primary Stack", note: "ES6+, Async/Await, Strict Types" },
      { name: "Tailwind CSS", level: "Advanced", note: "Custom design systems, animations, dark mode" },
      { name: "HTML5 & Semantic Web", level: "Primary Stack", note: "Accessible DOM, Canvas, Web APIs" },
      { name: "Responsive UI/UX", level: "Advanced", note: "Mobile-first layouts, 3D micro-interactions" },
    ],
  },
  {
    title: "Backend Development",
    icon: "Server",
    skills: [
      { name: "PHP 8 & Modern PHP", level: "Primary Stack", note: "OOP, MVC patterns, Session security" },
      { name: "Node.js & Express", level: "Proficient", note: "RESTful microservices, JSON APIs" },
      { name: "RESTful API Engineering", level: "Advanced", note: "CRUD endpoints, authentication, status codes" },
      { name: "Server-Sent Events (SSE)", level: "Advanced", note: "Real-time unidirected streaming alerts" },
      { name: "Security & Rate Limiting", level: "Advanced", note: "Bcrypt, CSRF tokens, OTP 2FA verification" },
    ],
  },
  {
    title: "Programming Languages",
    icon: "Code",
    skills: [
      { name: "JavaScript / TypeScript", level: "Primary Stack", note: "Modern web reactivity, Next.js, AJAX" },
      { name: "PHP", level: "Primary Stack", note: "Server logic, municipal platforms, security" },
      { name: "SQL", level: "Primary Stack", note: "DDL, DML, relational queries, stored structures" },
      { name: "Python", level: "Proficient", note: "Pygame simulations, algorithmic logic, automation" },
      { name: "Java", level: "Proficient", note: "Object-oriented design, JDBC desktop clients" },
    ],
  },
  {
    title: "Database Management",
    icon: "Database",
    skills: [
      { name: "MySQL & MariaDB", level: "Primary Stack", note: "Schema normalization (3NF), complex JOINs" },
      { name: "PDO & Prepared Statements", level: "Primary Stack", note: "SQL injection immunity, transaction safety" },
      { name: "Relational Modeling", level: "Advanced", note: "Entity-Relationship diagrams, foreign constraints" },
      { name: "Query Optimization", level: "Advanced", note: "Execution plans, indexed searching" },
    ],
  },
  {
    title: "Development Tools",
    icon: "Cpu",
    skills: [
      { name: "Git & GitHub", level: "Advanced", note: "Branching, PRs, version control workflows" },
      { name: "VS Code & NetBeans", level: "Advanced", note: "Productivity setups, debugging, extensions" },
      { name: "Postman & REST Testing", level: "Advanced", note: "API payload testing, header inspection" },
      { name: "XAMPP & Apache", level: "Advanced", note: "Local staging, virtual hosts, PHP environment" },
      { name: "Vercel Deployment", level: "Advanced", note: "CI/CD pipelines, edge runtime, zero-downtime" },
    ],
  },
  {
    title: "UI/UX and Design",
    icon: "Palette",
    skills: [
      { name: "Figma UI Prototyping", level: "Advanced", note: "Wireframing, design tokens, interactive components" },
      { name: "CSS 3D Transforms", level: "Advanced", note: "Perspective, realistic card flips, pendulums" },
      { name: "Accessibility (a11y)", level: "Advanced", note: "Contrast ratios, screen reader compatibility" },
      { name: "ISO/IEC 25010 Usability", level: "Specialist", note: "Heuristic evaluation, user journey testing" },
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
