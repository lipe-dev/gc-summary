import { rings } from "./rings";

export const dismantleItems = {
  "dimensional-earring-rare": {
    id: "dimensional-earring-rare",
    label: "Dimensional Earring (Rare)",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 1,
    },
  },
  "dimensional-earring-epic": {
    id: "dimensional-earring-epic",
    label: "Dimensional Earring (Epic)",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 2,
    },
  },
  "dimensional-earring-relic": {
    id: "dimensional-earring-relic",
    label: "Dimensional Earring (Relic)",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 3,
    },
  },
  "dimensional-piercing-rare": {
    id: "dimensional-piercing-rare",
    label: "Dimensional Piercing (Rare)",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 1,
    },
  },
  "dimensional-piercing-epic": {
    id: "dimensional-piercing-epic",
    label: "Dimensional Piercing (Epic)",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 2,
    },
  },
  "dimensional-piercing-relic": {
    id: "dimensional-piercing-relic",
    label: "Dimensional Piercing (Relic)",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 3,
    },
  },
  "order-earring": {
    id: "order-earring",
    label: "Order Earring",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 5,
    },
  },
  "order-piercing": {
    id: "order-piercing",
    label: "Order Piercing",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 5,
    },
  },
  "chaos-earring": {
    id: "chaos-earring",
    label: "Chaos Earring",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 5,
    },
  },
  "chaos-piercing": {
    id: "chaos-piercing",
    label: "Chaos Piercing",
    icon: "game-icons:earrings",
    fragments: {
      "s-rank": 5,
    },
  },
} as const;

export type DismantleItemId = keyof typeof dismantleItems; 