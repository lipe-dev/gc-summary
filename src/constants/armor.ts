export interface Armor {
  id: string;
  visualIcon: string;
  armorIcon: string;
  label: string;
}

export type ArmorMap = {
  [key: string]: Armor;
};

export const armor: ArmorMap = {
  "helmet": {
    id: "helmet",
    visualIcon: "game-icons:top-hat",
    armorIcon: "game-icons:brutal-helm",
    label: "Elmo"
  },
  "upper": {
    id: "upper",
    visualIcon: "game-icons:t-shirt",
    armorIcon: "game-icons:shoulder-armor",
    label: "Cota"
  },
  "lower": {
    id: "lower",
    visualIcon: "hugeicons:shorts-pants",
    armorIcon: "game-icons:armored-pants",
    label: "Calça"
  },
  "gloves": {
    id: "gloves",
    visualIcon: "game-icons:gloves",
    armorIcon: "game-icons:gauntlet",
    label: "Luva"
  },
  "shoes": {
    id: "shoes",
    visualIcon: "game-icons:converse-shoe",
    armorIcon: "game-icons:metal-boot",
    label: "Sapato"
  },
  "cloak": {
    id: "cloak",
    visualIcon: "game-icons:cape",
    armorIcon: "game-icons:cloak",
    label: "Capa"
  },
  "weapon": {
    id: "weapon",
    visualIcon: "game-icons:winged-sword",
    armorIcon: "game-icons:sword-brandish",
    label: "Arma"
  },
  "upper-head-ornament": {
    id: "upper-head-ornament",
    visualIcon: "game-icons:tiara",
    armorIcon: "hugeicons:laurel-wreath-02",
    label: "Diadema"
  },
  "lower-head-ornament": {
    id: "lower-head-ornament",
    visualIcon: "game-icons:carnival-mask",
    armorIcon: "bxs:mask",
    label: "Máscara"
  },
  "upper-body-ornament": {
    id: "upper-body-ornament",
    visualIcon: "game-icons:wing-cloak",
    armorIcon: "game-icons:curly-wing",
    label: "Asas"
  },
  "lower-body-ornament": {
    id: "lower-body-ornament",
    visualIcon: "game-icons:foot-trip",
    armorIcon: "game-icons:wingfoot",
    label: "Facas"
  },
  "arm-ornament": {
    id: "arm-ornament",
    visualIcon: "game-icons:winged-shield",
    armorIcon: "streamline:shield-2-solid",
    label: "Escudo"
  }
}; 