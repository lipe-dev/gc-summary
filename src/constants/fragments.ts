export const fragments = {
  "dimension-earring-fragment": {
    id: "dimension-earring-fragment",
    label: "Fragmento Brinco Dimensão",
    icon: "game-icons:earrings",
    color: "text-blue-400",
  },
  "dimension-piercing-fragment": {
    id: "dimension-piercing-fragment",
    label: "Fragmento Piercing Dimensão",
    icon: "game-icons:earrings",
    color: "text-blue-400",
  },
  "dimension-core": {
    id: "dimension-core",
    label: "Núcleo Dimensão",
    icon: "game-icons:earrings",
    color: "text-blue-400",
  },
  "infinity-ring-i-fragment": {
    id: "infinity-ring-i-fragment",
    label: "Fragmento Anel Infinito I",
    icon: "game-icons:ring",
    color: "text-blue-400",
  },
  "infinity-ring-ii-fragment": {
    id: "infinity-ring-ii-fragment",
    label: "Fragmento Anel Infinito II",
    icon: "game-icons:ring",
    color: "text-blue-400",
  },
  "infinity-ring-iii-fragment": {
    id: "infinity-ring-iii-fragment",
    label: "Fragmento Anel Infinito III",
    icon: "game-icons:ring",
    color: "text-blue-400",
  },
  "void-1-fragment": {
    id: "void-1-fragment",
    label: "Fragmento Vazio I",
    icon: "game-icons:ring",
    color: "text-blue-400",
  },
  "void-2-fragment": {
    id: "void-2-fragment",
    label: "Fragmento Vazio II",
    icon: "game-icons:ring",
    color: "text-blue-400",
  },
  "void-3-fragment": {
    id: "void-3-fragment",
    label: "Fragmento Vazio III",
    icon: "game-icons:ring",
    color: "text-blue-400",
  },
  
} as const;

export type FragmentId = keyof typeof fragments; 