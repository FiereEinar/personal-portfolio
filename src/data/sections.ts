export type Section = {
  id: string;
  label: string;
  index: string;
};

export const SECTIONS: Section[] = [
  { id: "hero", label: "HERO", index: "01" },
  { id: "sims", label: "SIMS", index: "02" },
  { id: "lapsync", label: "LAPSYNC", index: "03" },
  { id: "experience", label: "EXPERIENCE", index: "04" },
  { id: "contact", label: "CONTACT", index: "05" },
];
