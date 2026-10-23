export type Project = {
  id: "sims" | "lapsync" | "cot-sbo";
  index: string;
  name: string;
  summary: string;
  context: string;
  build: string[];
  stack: string[];
  source?: string;
  diagram?: "sims" | "lapsync";
};

export type ExperienceEntry = {
  period: string;
  title: string;
  org: string;
  points: string[];
};

export type StackGroup = {
  label: string;
  items: string[];
};

export type EducationEntry = {
  school: string;
  program: string;
  period: string;
};

export type Profile = {
  name: string;
  role: string;
  degree: string;
  status: string;
  email: string;
  github: string;
  location: string;
  projects: Project[];
  experience: ExperienceEntry[];
  stack: StackGroup[];
  education: EducationEntry[];
};

export const profile: Profile = {
  name: "Nick Xylan Melloria",
  role: "Full-stack developer building real-time systems, multi-tenant platforms, and the APIs behind them.",
  degree: "BS Information Technology · Bukidnon State University",
  status: "Open to software engineering roles.",
  email: "nickxylanmelloria@gmail.com",
  github: "https://github.com/FiereEinar",
  location: "Malaybalay City",
  projects: [
    {
      id: "sims",
      index: "01",
      name: "SIMS",
      summary: "Multi-tenant student information system for campus-wide use.",
      context:
        "A multi-tenant web application managing student profiles, organizational collections, and financial transaction history across tenants.",
      build: [
        "Electron desktop client that keeps working offline and syncs to the cloud when connectivity returns.",
        "Caching, database pagination, and optimized dynamic queries for large datasets.",
        "Optimized REST API endpoints that process large datasets under high load.",
      ],
      stack: ["TypeScript", "React", "Express", "Node", "MongoDB"],
      source: "https://github.com/FiereEinar/sbo-sims",
      diagram: "sims",
    },
    {
      id: "lapsync",
      index: "02",
      name: "LapSync",
      summary:
        "Real-time race timing platform: admin dashboard, REST API, and participant mobile app.",
      context:
        "A dual-socket architecture using Socket.IO for client updates and raw WebSockets for high-frequency RFID telemetry.",
      build: [
        "Real-time data pipeline mapping physical RFID scans to specific checkpoints.",
        "Participant progress calculated within milliseconds.",
      ],
      stack: ["TypeScript", "React", "Express", "Node", "MongoDB", "Socket.IO"],
      source: "https://github.com/FiereEinar/lapsync",
      diagram: "lapsync",
    },
    {
      id: "cot-sbo",
      index: "03",
      name: "COT-SBO System",
      summary:
        "Administrative system for the Council of Organizations and Teams–Student Body Organization at BSU.",
      context: "A custom system built to streamline Student Body Organization operations.",
      build: [
        "Replaced manual record handling and reduced the data-entry and administrative workload.",
      ],
      stack: ["PHP", "Laravel", "Livewire", "MySQL"],
    },
  ],
  experience: [
    {
      period: "Aug 2026",
      title: "Head of Committee on ICT (SSC)",
      org: "Bukidnon State University",
      points: [
        "Architected and developed a multi-tenant Student Information Management System (SIMS) for campus-wide use.",
        "Built an offline Electron desktop application with automated cloud synchronization for uninterrupted field access.",
        "Engineered optimized REST API endpoints to process large datasets under high load.",
      ],
    },
    {
      period: "Since Apr 2025",
      title: "Web Developer (Part-Time)",
      org: "ML Digital Marketing Agency",
      points: [
        "Built customized client websites on WordPress, Showit, and Framer with integrated SEO best practices.",
        "Managed end-to-end site deployments and server maintenance across Hostinger, GoDaddy, and Media Fortress.",
      ],
    },
    {
      period: "Dec 2024",
      title: "COT-SBO System Administrator",
      org: "Bukidnon State University",
      points: [
        "Developed a custom system that streamlined SBO operations, reducing manual data entry and administrative workload.",
      ],
    },
  ],
  stack: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "PHP", "Node.js", "C", "Java", "SQL", "HTML", "CSS"],
    },
    {
      label: "Frameworks & Libraries",
      items: ["React", "Express", "Laravel", "Tailwind", "Bootstrap", "Livewire", "Socket.IO"],
    },
    {
      label: "Databases",
      items: ["MongoDB (Mongoose)", "PostgreSQL (Prisma)", "SQLite", "MySQL"],
    },
    {
      label: "Tools",
      items: ["Git", "GitHub", "Docker", "VS Code", "Eclipse", "Postman", "Insomnia"],
    },
  ],
  education: [
    {
      school: "Bukidnon State University",
      program: "BS Information Technology",
      period: "Apr 2023 – Present",
    },
    {
      school: "The Odin Project",
      program: "Full Stack Development",
      period: "Apr 2023 – Sep 2024",
    },
  ],
};
