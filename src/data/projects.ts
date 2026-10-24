export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: 'center' | 'left';
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

export const featuredProjects: ShowcaseProject[] = [
  {
    id: 'sims',
    index: '01',
    name: 'SIMS',
    category: 'Student Information System',
    summary:
      'A multi-tenant student information system designed for campus-wide academic management, attendance tracking, and student records.',
    details: [
      'Electron client keeps working offline and syncs when connectivity returns.',
      'Role-based portals for students, finances, and administration with real-time sync.',
      'Caching, pagination, and tuned queries handle large campus datasets.',
    ],
    stack: ['TypeScript', 'React', 'Express', 'Node.js', 'MongoDB', 'Electron'],
    repo: 'https://github.com/FiereEinar/sbo-sims',
    caseStudy: 'sims',
    image: {
      src: 'projects/sims.webp',
      alt: 'SIMS student information management system dashboard overview and attendance interface.',
      width: 1672,
      height: 941,
    },
  },
  {
    id: 'lapsync',
    index: '02',
    name: 'LapSync',
    category: 'Event Management & Timing',
    summary:
      'A real-time race timing and event management platform with an admin dashboard, REST API, RFID reader telemetry, and participant app.',
    details: [
      'Dual-socket architecture: Socket.IO for dashboard updates, raw WebSockets for RFID telemetry.',
      'Maps physical RFID scans to checkpoints and calculates participant progress in milliseconds.',
      'Real-time leaderboard, participant management, and event device coordination.',
    ],
    stack: [
      'TypeScript',
      'React',
      'Express',
      'Node.js',
      'MongoDB',
      'Socket.IO',
    ],
    repo: 'https://github.com/FiereEinar/lapsync',
    caseStudy: 'lapsync',
    image: {
      src: 'projects/lapsync.webp',
      alt: 'LapSync event management and real-time race timing dashboard.',
      width: 1672,
      height: 941,
    },
  },
];

export const moreProjects: ShowcaseProject[] = [
  {
    id: 'sams',
    index: '03',
    name: 'SAMS',
    category: 'Multi-tenant SaaS',
    note: '',
    summary:
      'A multi-tenant platform for student organizations to run events, masterlists, and attendance.',
    details: [
      "Tenant workspaces keep each organization's students, events, and attendance separate.",
      'CSV and Excel imports, QR and barcode attendance, and exportable reports.',
      'Role-based access, PayMongo subscriptions, and a central admin console.',
    ],
    stack: ['Laravel', 'Inertia', 'React', 'TypeScript', 'MySQL', 'Tailwind'],
    repo: 'https://github.com/FiereEinar/sams',
    image: {
      src: 'projects/sams-dashboard.webp',
      alt: 'SAMS dashboard showing attendance totals, an engagement trend chart, and recent events.',
      width: 1600,
      height: 822,
    },
  },
  {
    id: 'reboot-rebellion',
    index: '04',
    name: 'Reboot Rebellion',
    category: 'Game',
    summary:
      'A 2D top-down shooter built in Java, with dynamic lighting, rescue missions, and a boss fight.',
    details: [
      'Restore power to explore dark rooms; dynamic lighting changes what you can see.',
      'Multi-level campaign with rescue missions, multiple weapons, and a boss battle.',
    ],
    stack: ['Java', 'Swing/AWT'],
    repo: 'https://github.com/FiereEinar/reboot-rebellion',
    image: {
      src: 'projects/reboot-rebellion.webp',
      alt: 'Reboot Rebellion gameplay showing the player, minimap, objectives, and weapon HUD.',
      width: 1600,
      height: 880,
    },
  },
  {
    id: 'statmastery',
    index: '05',
    name: 'StatMastery',
    category: 'Learning platform',
    summary:
      'A Laravel learning platform for math and statistics courses, with quizzes, bookings, and payments.',
    details: [
      'Course CRUD with TinyMCE lessons, PDF and image resources, quizzes, and CSV imports.',
      'Role-based dashboards, PayMongo payments, Google Calendar bookings, reviews, and reports.',
    ],
    stack: ['Laravel', 'Livewire', 'PHP', 'MySQL', 'Tailwind'],
    repo: 'https://github.com/FiereEinar/statmastery',
    image: {
      src: 'projects/statmastery.webp',
      alt: 'StatMastery course catalog with category filters and course cards.',
      width: 1600,
      height: 717,
      position: 'left',
    },
  },
  {
    id: 'pulse',
    index: '06',
    name: 'Pulse',
    category: 'Social app',
    coverLabel: 'Live demo',
    summary:
      'A social app with image posts, comments, connections, sharing, and a few external API feeds.',
    details: [
      'Image posts, comments, connections, sharing, and emoji reactions.',
      'Daily advice, NASA posts, and fun facts from external APIs.',
    ],
    stack: ['React', 'Express', 'Node.js', 'MongoDB', 'Tailwind', 'Cloudinary'],
    repo: 'https://github.com/FiereEinar/pulse',
    live: 'https://pulse-rosy.vercel.app/',
    image: {
      src: 'projects/pulse.webp',
      alt: 'Pulse social feed with posts and external API integrations.',
      width: 1919,
      height: 977,
    },
  },
  {
    id: 'inventory-cli',
    index: '07',
    name: 'Inventory CLI',
    category: 'CLI tool',
    coverLabel: 'CLI',
    summary:
      'A C inventory and point-of-sale system that runs in the terminal.',
    details: [
      'Item and category CRUD with search, sorting, and category filters.',
      'Point of sale with cart, receipts, and daily or monthly sales reports.',
    ],
    stack: ['C', 'CLI'],
    repo: 'https://github.com/FiereEinar/inventory-system-cli',
  },
];

export const allProjects = [...featuredProjects, ...moreProjects];
