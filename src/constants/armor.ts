export interface Armor {
  id: string;
  visualIcon: string;
  armorIcon: string;
  label: string;
  color: string;
}

export type ArmorMap = {
  [key: string]: Armor;
};

export const armor: ArmorMap = {
  "helmet": {
    id: "helmet",
    visualIcon: "game-icons:top-hat",
    armorIcon: "game-icons:brutal-helm",
    label: "Elmo",
    color: "text-gray-400"
  },
  "upper": {
    id: "upper",
    visualIcon: "game-icons:t-shirt",
    armorIcon: "game-icons:shoulder-armor",
    label: "Cota",
    color: "text-gray-400"
  },
  "lower": {
    id: "lower",
    visualIcon: "hugeicons:shorts-pants",
    armorIcon: "game-icons:armored-pants",
    label: "Calça",
    color: "text-gray-400"
  },
  "gloves": {
    id: "gloves",
    visualIcon: "game-icons:gloves",
    armorIcon: "game-icons:gauntlet",
    label: "Luva",
    color: "text-gray-400"
  },
  "shoes": {
    id: "shoes",
    visualIcon: "game-icons:converse-shoe",
    armorIcon: "game-icons:metal-boot",
    label: "Sapato",
    color: "text-gray-400"
  },
  "cloak": {
    id: "cloak",
    visualIcon: "game-icons:cape",
    armorIcon: "game-icons:cloak",
    label: "Capa",
    color: "text-gray-400"
  },
  "weapon": {
    id: "weapon",
    visualIcon: "game-icons:winged-sword",
    armorIcon: "game-icons:sword-brandish",
    label: "Arma",
    color: "text-gray-400"
  },
  "upper-head-ornament": {
    id: "upper-head-ornament",
    visualIcon: "game-icons:tiara",
    armorIcon: "hugeicons:laurel-wreath-02",
    label: "Diadema",
    color: "text-gray-400"
  },
  "lower-head-ornament": {
    id: "lower-head-ornament",
    visualIcon: "game-icons:carnival-mask",
    armorIcon: "bxs:mask",
    label: "Máscara",
    color: "text-gray-400"
  },
  "upper-body-ornament": {
    id: "upper-body-ornament",
    visualIcon: "game-icons:wing-cloak",
    armorIcon: "game-icons:curly-wing",
    label: "Asas",
    color: "text-gray-400"
  },
  "lower-body-ornament": {
    id: "lower-body-ornament",
    visualIcon: "game-icons:foot-trip",
    armorIcon: "game-icons:wingfoot",
    label: "Facas",
    color: "text-gray-400"
  },
  "arm-ornament": {
    id: "arm-ornament",
    visualIcon: "game-icons:winged-shield",
    armorIcon: "streamline:shield-2-solid",
    label: "Escudo",
    color: "text-gray-400"
  }
}; 