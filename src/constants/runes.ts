export interface Rune {
  id: string;
  icon: string;
  rotation: number;
  label: string;
  inverted?: boolean;
  scale?: number;
}

export type RuneMap = {
  [key: string]: Rune;
};

export const runes: RuneMap = {
  fury: {
    id: "fury",
    icon: "icon-park-outline:holy-sword",
    rotation: 20,
    label: "Raiva"
  },
  endure: {
    id: "endure",
    icon: "ph:house-simple-bold",
    rotation: 0,
    label: "Resistência"
  },
  tolerance: {
    id: "tolerance",
    icon: "ri:heart-3-fill",
    rotation: 0,
    label: "Tolerância"
  },
  will: {
    id: "will",
    icon: "game-icons:triquetra",
    rotation: 0,
    label: "Vontade"
  },
  focus: {
    id: "focus",
    icon: "mdi:pan-down",
    rotation: 0,
    label: "Foco",
    scale: 1.5
  },
  doom: {
    id: "doom",
    icon: "game-icons:eclipse-saw",
    rotation: 20,
    label: "Destruição"
  },
  fight: {
    id: "fight",
    icon: "icon-park-solid:holy-sword",
    rotation: 180,
    label: "Combate"
  },
  guard: {
    id: "guard",
    icon: "game-icons:liberty-wing",
    rotation: 0,
    label: "Proteção",
    inverted: true
  },
  enhance: {
    id: "enhance",
    icon: "mdi:hexagram",
    rotation: 0,
    label: "Fortificação"
  },
  shield: {
    id: "shield",
    icon: "si:target-fill",
    rotation: 0,
    label: "Escudo"
  },
  expertise: {
    id: "expertise",
    icon: "game-icons:shining-claw",
    rotation: 210,
    label: "Habilidade",
    inverted: true
  },
  javelin: {
    id: "javelin",
    icon: "game-icons:winged-arrow",
    rotation: 0,
    label: "Projétil"
  },
  resist: {
    id: "resist",
    icon: "mage:star-circle-fill",
    rotation: 0,
    label: "Firmeza"
  },
  roar: {
    id: "roar",
    icon: "icon-park-solid:archery",
    rotation: 90,
    label: "Rugido"
  },
  grow: {
    id: "grow",
    icon: "el:arrow-up",
    rotation: 0,
    label: "Crescimento"
  },
  sage: {
    id: "sage",
    icon: "game-icons:nested-eclipses",
    rotation: 320,
    label: "Sabedoria"
  },
  limit: {
    id: "limit",
    icon: "lucide:tangent",
    rotation: 315,
    label: "Limite"
  },
  hunt: {
    id: "hunt",
    icon: "ri:crosshair-2-line",
    rotation: 0,
    label: "Caçada"
  },
  awaken: {
    id: "awaken",
    icon: "garden:puzzle-piece-fill-12",
    rotation: 100,
    label: "Despertar"
  },
  arena: {
    id: "arena",
    icon: "simple-icons:lintcode",
    rotation: 10,
    label: "Arena"
  },
  affinity: {
    id: "affinity",
    icon: "ph:paw-print-fill",
    rotation: 0,
    label: "Compatibilidade"
  },
  recovery: {
    id: "recovery",
    icon: "icon-park-solid:plus-cross",
    rotation: 0,
    label: "Recuperação"
  },
  resurrect: {
    id: "resurrect",
    icon: "game-icons:angel-outfit",
    rotation: 0,
    label: "Ressurreição"
  },
  rage: {
    id: "rage",
    icon: "game-icons:flame",
    rotation: 0,
    label: "Fúria"
  },
  overcome: {
    id: "overcome",
    icon: "gg:shape-zigzag",
    rotation: 90,
    label: "Superação"
  },
  punish: {
    id: "punish",
    icon: "ooui:bold-a",
    rotation: 180,
    label: "Punição"
  },
  protect: {
    id: "protect",
    icon: "ic:sharp-brightness-5",
    rotation: 0,
    label: "Bênção"
  }
}; 