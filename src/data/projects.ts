export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: "center" | "left";
};

export type ShowcaseProject = {
  id: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  details: string[];
  stack: string[];
  repo: string;
  live?: string;
  caseStudy?: string;
  note?: string;
  image?: ProjectScreenshot;
  coverLabel?: string;
};

export const featuredProject: ShowcaseProject = {
  id: "sams",
  index: "01",
  name: "SAMS",
  category: "Multi-tenant SaaS",
  note: "Team final project · IT1313",
  summary:
    "A multi-tenant platform for student organizations to run events, masterlists, and attendance.",
  details: [
    "Tenant workspaces keep each organization's students, events, and attendance separate.",
    "CSV and Excel imports, QR and barcode attendance, and exportable reports.",
    "Role-based access, PayMongo subscriptions, and a central admin console.",
  ],
  stack: ["Laravel", "Inertia", "React", "TypeScript", "MySQL", "Tailwind"],
  repo: "https://github.com/FiereEinar/sams",
  image: {
    src: "projects/sams-dashboard.webp",
    alt: "SAMS dashboard showing attendance totals, an engagement trend chart, and recent events.",
    width: 1600,
    height: 822,
  },
};

export const moreProjects: ShowcaseProject[] = [
  {
    id: "reboot-rebellion",
    index: "02",
    name: "Reboot Rebellion",
    category: "Game",
    summary:
      "A 2D top-down shooter built in Java, with dynamic lighting, rescue missions, and a boss fight.",
    details: [
      "Restore power to explore dark rooms; dynamic lighting changes what you can see.",
      "Multi-level campaign with rescue missions, multiple weapons, and a boss battle.",
    ],
    stack: ["Java", "Swing/AWT"],
    repo: "https://github.com/FiereEinar/reboot-rebellion",
    image: {
      src: "projects/reboot-rebellion.webp",
      alt: "Reboot Rebellion gameplay showing the player, minimap, objectives, and weapon HUD.",
      width: 1600,
      height: 880,
    },
  },
  {
    id: "statmastery",
    index: "03",
    name: "StatMastery",
    category: "Learning platform",
    summary:
      "A Laravel learning platform for math and statistics courses, with quizzes, bookings, and payments.",
    details: [
      "Course CRUD with TinyMCE lessons, PDF and image resources, quizzes, and CSV imports.",
      "Role-based dashboards, PayMongo payments, Google Calendar bookings, reviews, and reports.",
    ],
    stack: ["Laravel", "Livewire", "PHP", "MySQL", "Tailwind"],
    repo: "https://github.com/FiereEinar/statmastery",
    image: {
      src: "projects/statmastery.webp",
      alt: "StatMastery course catalog with category filters and course cards.",
      width: 1600,
      height: 717,
      position: "left",
    },
  },
  {
    id: "pulse",
    index: "04",
    name: "Pulse",
    category: "Social app",
    coverLabel: "Live demo",
    summary:
      "A social app with image posts, comments, connections, sharing, and a few external API feeds.",
    details: [
      "Image posts, comments, connections, sharing, and emoji reactions.",
      "Daily advice, NASA posts, and fun facts from external APIs.",
    ],
    stack: ["React", "Express", "Node.js", "MongoDB", "Tailwind", "Cloudinary"],
    repo: "https://github.com/FiereEinar/pulse",
    live: "https://pulse-rosy.vercel.app/",
  },
  {
    id: "inventory-cli",
    index: "05",
    name: "Inventory CLI",
    category: "CLI tool",
    coverLabel: "CLI",
    summary: "A C inventory and point-of-sale system that runs in the terminal.",
    details: [
      "Item and category CRUD with search, sorting, and category filters.",
      "Point of sale with cart, receipts, and daily or monthly sales reports.",
    ],
    stack: ["C", "CLI"],
    repo: "https://github.com/FiereEinar/inventory-system-cli",
  },
];

export const caseStudies: ShowcaseProject[] = [
  {
    id: "sims",
    index: "06",
    name: "SIMS",
    category: "Case study",
    summary: "Multi-tenant student information system for campus-wide use.",
    details: [
      "Electron client keeps working offline and syncs when connectivity returns.",
      "Caching, pagination, and tuned queries handle large campus datasets.",
    ],
    stack: ["TypeScript", "React", "Express", "Node", "MongoDB"],
    repo: "https://github.com/FiereEinar/sbo-sims",
    caseStudy: "sims",
  },
  {
    id: "lapsync",
    index: "07",
    name: "LapSync",
    category: "Case study",
    summary:
      "Real-time race timing platform with an admin dashboard, REST API, and participant app.",
    details: [
      "Dual-socket architecture: Socket.IO for dashboard updates, raw WebSockets for RFID telemetry.",
      "Maps physical RFID scans to checkpoints and calculates participant progress in milliseconds.",
    ],
    stack: ["TypeScript", "React", "Express", "Node", "MongoDB", "Socket.IO"],
    repo: "https://github.com/FiereEinar/lapsync",
    caseStudy: "lapsync",
  },
];

export const allProjects = [featuredProject, ...moreProjects, ...caseStudies];
