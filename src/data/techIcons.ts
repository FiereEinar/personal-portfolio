import {
  siBootstrap,
  siC,
  siCss,
  siDocker,
  siEclipseide,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siInsomnia,
  siJavascript,
  siLaravel,
  siLivewire,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostman,
  siPostgresql,
  siReact,
  siSocketdotio,
  siSqlite,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

export type TechIcon = {
  path: string;
};

const databaseIcon: TechIcon = {
  path: "M12 2C6.48 2 2 3.79 2 6s4.48 4 10 4 10-1.79 10-4-4.48-4-10-4zm0 12c-5.52 0-10-1.79-10-4v4c0 2.21 4.48 4 10 4s10-1.79 10-4v-4c0 2.21-4.48 4-10 4zm0 6c-5.52 0-10-1.79-10-4v4c0 2.21 4.48 4 10 4s10-1.79 10-4v-4c0 2.21-4.48 4-10 4z",
};

const codeEditorIcon: TechIcon = {
  path: "M10 6 4 12l6 6 1.4-1.4L6.8 12l4.6-4.6L10 6zm4 0-1.4 1.4 4.6 4.6-4.6 4.6L14 18l6-6-6-6z",
};

export const techIcons: Record<string, TechIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  PHP: siPhp,
  "Node.js": siNodedotjs,
  C: siC,
  Java: siOpenjdk,
  SQL: databaseIcon,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  Express: siExpress,
  Laravel: siLaravel,
  Tailwind: siTailwindcss,
  Bootstrap: siBootstrap,
  Livewire: siLivewire,
  "Socket.IO": siSocketdotio,
  "MongoDB (Mongoose)": siMongodb,
  "PostgreSQL (Prisma)": siPostgresql,
  SQLite: siSqlite,
  MySQL: siMysql,
  Git: siGit,
  GitHub: siGithub,
  Docker: siDocker,
  "VS Code": codeEditorIcon,
  Eclipse: siEclipseide,
  Postman: siPostman,
  Insomnia: siInsomnia,
};
