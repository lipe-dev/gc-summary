
export type EarringId = "other" 
| "rare-dimensional-earring" 
| "epic-dimensional-earring" 
| "relic-dimensional-earring" 
| "rare-dimensional-piercing" 
| "epic-dimensional-piercing" 
| "relic-dimensional-piercing" 
| "order-earring" 
| "order-piercing" 
| "chaos-earring" 
| "chaos-piercing";

export interface Earring {
  id: EarringId;
  icon: string;
  label: string;
  color: string;
}

export const earrings: Record<EarringId, Earring> = {
  "other": {
    id: "other",
    icon: "game-icons:drop-earrings",
    label: "Outro",
    color: "text-gray-400"
  },
  "rare-dimensional-earring": {
    id: "rare-dimensional-earring",
    icon: "game-icons:earrings",
    label: "Brinco Dimensional Raro",
    color: "text-blue-400"
  },
  "epic-dimensional-earring": {
    id: "epic-dimensional-earring",
    icon: "game-icons:earrings",
    label: "Brinco Dimensional Épico",
    color: "text-blue-400"
  },
  "relic-dimensional-earring": {
    id: "relic-dimensional-earring",
    icon: "game-icons:earrings",
    label: "Brinco Dimensional Lendário",
    color: "text-purple-400"
  },
  "rare-dimensional-piercing": {
    id: "rare-dimensional-piercing",
    icon: "game-icons:earrings",
    label: "Piercing Dimensional Raro",
    color: "text-blue-400"
  },
  "epic-dimensional-piercing": {
    id: "epic-dimensional-piercing",
    icon: "game-icons:earrings",
    label: "Piercing Dimensional Épico",
    color: "text-blue-400"
  },
  "relic-dimensional-piercing": {
    id: "relic-dimensional-piercing",
    icon: "game-icons:earrings",
    label: "Piercing Dimensional Lendário",
    color: "text-purple-400"
  },
  "order-earring": {
    id: "order-earring",
    icon: "game-icons:earrings",
    label: "Brinco de Ordem",
    color: "text-blue-400"
  },
  "order-piercing": {
    id: "order-piercing",
    icon: "game-icons:earrings",
    label: "Piercing de Ordem",
    color: "text-blue-400"
  },
  "chaos-earring": {
    id: "chaos-earring",
    icon: "game-icons:earrings",
    label: "Brinco de Caos",
    color: "text-purple-400"
  },
  "chaos-piercing": {
    id: "chaos-piercing",
    icon: "game-icons:earrings",
    label: "Piercing de Caos",
    color: "text-purple-400"
  }  
}; 

export const chaosSet = [
  "chaos-earring",
  "chaos-piercing"
];

export const epicSet = [
    "epic-dimensional-earring",
    "epic-dimensional-piercing"
];

export const relicSet = [
    "relic-dimensional-earring",
    "relic-dimensional-piercing"
];