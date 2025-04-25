export interface Earring {
  id: string;
  icon: string;
  label: string;
  color: string;
}

export type EarringMap = {
  [key: string]: Earring;
};

export const earrings: EarringMap = {
  "in-progress": {
    id: "in-progress",
    icon: "game-icons:drop-earrings",
    label: "Conjunto em progresso",
    color: "text-gray-400"
  },
  "epic-set": {
    id: "epic-set",
    icon: "game-icons:earrings",
    label: "Conjunto Épico",
    color: "text-blue-400"
  },
  "relic-set": {
    id: "relic-set",
    icon: "game-icons:heart-earrings",
    label: "Conjunto Lendário",
    color: "text-purple-400"
  },
  "chaos-set": {
    id: "chaos-set",
    icon: "game-icons:crystal-earrings",
    label: "Conjunto Caos",
    color: "text-purple-400"
  }
}; 