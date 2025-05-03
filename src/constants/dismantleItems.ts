import { EarringId } from "./earrings";
import { FragmentId } from "./fragments";
import { RingId } from "./rings";

export type DismantleRing = {
  id: RingId;
  label: string;
  icon: string;
  fragments: Partial<Record<FragmentId, number>>;
};
export const dismantleRings: Record<string, DismantleRing> = {
  "faded-infinity-iii": {
    id: "faded-infinity-iii",
    label: "Anel Infinito Esmaecido III",
    icon: "game-icons:ring",
    fragments: {
      "infinity-ring-iii-fragment": 6,
    },
  },
  "forged-infinity-iii": {
    id: "forged-infinity-iii",
    label: "Anel Infinito Forjado III",
    icon: "game-icons:ring",
    fragments: {
      "infinity-ring-iii-fragment": 8,
    },
  },
  "shiny-infinity-iii": {
    id: "shiny-infinity-iii",
    label: "Anel Infinito Brilhante III",
    icon: "game-icons:ring",
    fragments: {
      "infinity-ring-iii-fragment": 10,
    },
  },
  "faded-dimension-iii": {
    id: "faded-dimension-i",
    label: "Dimensão Esmaecida I",
    icon: "game-icons:ring",
    fragments: {
      "infinity-ring-iii-fragment": 3,
    },
  },
  "forged-dimension-iii": {
    id: "forged-dimension-iii",
    label: "Dimensão Forjada III",
    icon: "game-icons:ring",
    fragments: {
      "infinity-ring-iii-fragment": 4,
    },
  },
  "shiny-dimension-iii": {
    id: "shiny-dimension-iii",
    label: "Dimensão Brilhante III",
    icon: "game-icons:ring",
    fragments: {
      "infinity-ring-iii-fragment": 5,
    },
  },
} as const;

export type DismantleEarring = {
  id: EarringId;
  label: string;
  icon: string;
  fragments: Partial<Record<FragmentId, number>>;
};

export const dismantleEarrings: Record<string, DismantleEarring> = {
  "rare-dimensional-earring": {
    id: "rare-dimensional-earring",
    label: "Brinco Dimensional Raro",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-earring-fragment": 10,
    },
  },
  "epic-dimensional-earring": {
    id: "epic-dimensional-earring",
    label: "Dimensional Earring (Epic)",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-earring-fragment": 17,
    },
  },
  "relic-dimensional-earring": {
    id: "relic-dimensional-earring",
    label: "Brinco Dimensional Lendário",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-earring-fragment": 23,
      "dimension-core": 27,
    },
  },
  "rare-dimensional-piercing": {
    id: "rare-dimensional-piercing",
    label: "Piercing Dimensional Raro",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-piercing-fragment": 20,
    },
  },
  "epic-dimensional-piercing": {
    id: "epic-dimensional-piercing",
    label: "Piercing Dimensional Épico",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-piercing-fragment": 33,
    },
  },
  "relic-dimensional-piercing": {
    id: "relic-dimensional-piercing",
    label: "Piercing Dimensional Lendário",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-piercing-fragment": 47,
      "dimension-core": 27,
    },
  },
  "order-earring": {
    id: "order-earring",
    label: "Order Earring",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-earring-fragment": 23,
      "dimension-core": 23,
    },
  },
  "order-piercing": {
    id: "order-piercing",
    label: "Order Piercing",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-piercing-fragment": 47,
      "dimension-core": 23,
    },
  },
  "chaos-earring": {
    id: "chaos-earring",
    label: "Chaos Earring",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-earring-fragment": 33,
      "dimension-core": 37,
    },
  },
  "chaos-piercing": {
    id: "chaos-piercing",
    label: "Chaos Piercing",
    icon: "game-icons:earrings",
    fragments: {
      "dimension-piercing-fragment": 67,
      "dimension-core": 37,
    },
  },
};

export type SmallVoidFragment = {
  id: string;
  label: string;
  icon: string;
  fragments: Partial<Record<FragmentId, number>>;
};

export const smallVoidFragments: Record<string, SmallVoidFragment> = {
  "small-void-1-fragment": {
    id: "small-void-1-fragment",
    label: "Fragmento Pequeno do Void 1",
    icon: "game-icons:fragment",
    fragments: {
      "void-1-fragment": 0.5,
    },
  },
  "small-void-2-fragment": {
    id: "small-void-2-fragment",
    label: "Fragmento Pequeno do Void 2",
    icon: "game-icons:fragment",
    fragments: {
      "void-2-fragment": 0.5,
    },
  },
  "small-void-3-fragment": {
    id: "small-void-3-fragment",
    label: "Fragmento Pequeno do Void 3",
    icon: "game-icons:fragment",
    fragments: {
      "void-3-fragment": 0.5,
    },
  },
};
