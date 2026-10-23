export type DiagramNode = {
  id: string;
  label: string;
  caption: string;
  x: number;
  y: number;
};

export type DiagramEdge = { from: string; to: string; d: string };

export type Diagram = {
  id: "sims" | "lapsync";
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export const diagrams: Record<Diagram["id"], Diagram> = {
  sims: {
    id: "sims",
    nodes: [
      {
        id: "web",
        label: "Web client",
        caption: "React — student profiles and collections",
        x: 26,
        y: 14,
      },
      {
        id: "electron",
        label: "Electron desktop",
        caption: "Offline-first client with automated cloud sync",
        x: 72,
        y: 14,
      },
      {
        id: "api",
        label: "REST API",
        caption: "Express endpoints tuned for large datasets",
        x: 46,
        y: 48,
      },
      {
        id: "mongo",
        label: "MongoDB",
        caption: "Tenant data, paginated and cached",
        x: 46,
        y: 86,
      },
    ],
    edges: [
      { from: "web", to: "api", d: "M 26 8.4 C 26 19.2, 46 18, 46 28.8" },
      { from: "electron", to: "api", d: "M 72 8.4 C 72 19.2, 46 18, 46 28.8" },
      { from: "api", to: "mongo", d: "M 46 28.8 C 48.5 34.5, 48.5 45.9, 46 51.6" },
    ],
  },
  lapsync: {
    id: "lapsync",
    nodes: [
      {
        id: "rfid",
        label: "RFID readers",
        caption: "High-frequency RFID scans at each checkpoint",
        x: 25,
        y: 12,
      },
      {
        id: "ws",
        label: "raw ws",
        caption: "Raw WebSocket ingest for hardware telemetry",
        x: 70,
        y: 12,
      },
      {
        id: "pipeline",
        label: "checkpoint pipeline",
        caption: "Maps scans to checkpoints in milliseconds",
        x: 28,
        y: 46,
      },
      {
        id: "socketio",
        label: "Socket.IO",
        caption: "Live updates to dashboard and mobile app",
        x: 72,
        y: 46,
      },
      {
        id: "dashboard",
        label: "Dashboard",
        caption: "Race control and results",
        x: 30,
        y: 82,
      },
      {
        id: "mobile",
        label: "Mobile app",
        caption: "Participant progress",
        x: 72,
        y: 82,
      },
    ],
    edges: [
      { from: "rfid", to: "ws", d: "M 25 7.2 C 40 5.2, 55 9.2, 70 7.2" },
      { from: "ws", to: "pipeline", d: "M 70 7.2 C 70 18, 28 18, 28 27.6" },
      { from: "pipeline", to: "socketio", d: "M 28 27.6 C 42 25.6, 58 29.6, 72 27.6" },
      { from: "socketio", to: "dashboard", d: "M 72 27.6 C 72 38, 30 38, 30 49.2" },
      { from: "socketio", to: "mobile", d: "M 72 27.6 C 74.5 34, 74.5 43, 72 49.2" },
    ],
  },
};
