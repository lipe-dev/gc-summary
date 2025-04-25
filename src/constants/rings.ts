export interface Ring {
  id: string;
  label: string;
  color: string;
  icon: string;
}

export type RingMap = {
  [key: string]: Ring;
};

export const rings: RingMap = {
  "faded-infinity-i": {
    id: "faded-infinity-i",
    label: "Infinito Esmaecido I",
    color: "text-blue-300",
    icon: "ic:outline-circle"
  },
  "forged-infinity-i": {
    id: "forged-infinity-i",
    label: "Infinito Forjado I",
    color: "text-blue-300",
    icon: "ic:outline-circle"
  },
  "shiny-infinity-i": {
    id: "shiny-infinity-i",
    label: "Infinito Brilhante I",
    color: "text-blue-300",
    icon: "ic:outline-circle"
  },
  "faded-infinity-ii": {
    id: "faded-infinity-ii",
    label: "Infinito Esmaecido II",
    color: "text-blue-300",
    icon: "game-icons:big-diamond-ring"
  },
  "forged-infinity-ii": {
    id: "forged-infinity-ii",
    label: "Infinito Forjado II",
    color: "text-blue-300",
    icon: "game-icons:big-diamond-ring"
  },
  "shiny-infinity-ii": {
    id: "shiny-infinity-ii",
    label: "Infinito Brilhante II",
    color: "text-blue-300",
    icon: "game-icons:big-diamond-ring"
  },
  "faded-infinity-iii": {
    id: "faded-infinity-iii",
    label: "Infinito Esmaecido III",
    color: "text-blue-300",
    icon: "file-icons:ring"
  },
  "forged-infinity-iii": {
    id: "forged-infinity-iii",
    label: "Infinito Forjado III",
    color: "text-blue-300",
    icon: "file-icons:ring"
  },
  "shiny-infinity-iii": {
    id: "shiny-infinity-iii",
    label: "Infinito Brilhante III",
    color: "text-blue-300",
    icon: "file-icons:ring"
  },
  "shiny-dimension-i": {
    id: "shiny-dimension-i",
    label: "Dimensão Brilhante I",
    color: "text-blue-600",
    icon: "ic:outline-circle"
  },
  "shiny-dimension-ii": {
    id: "shiny-dimension-ii",
    label: "Dimensão Brilhante II",
    color: "text-blue-600",
    icon: "game-icons:big-diamond-ring"
  },
  "shiny-dimension-iii": {
    id: "shiny-dimension-iii",
    label: "Dimensão Brilhante III",
    color: "text-blue-600",
    icon: "file-icons:ring"
  },
  "promise-i": {
    id: "promise-i",
    label: "Promessa I",
    color: "text-red-400",
    icon: "ic:outline-circle"
  },
  "promise-ii": {
    id: "promise-ii",
    label: "Promessa II",
    color: "text-red-400",
    icon: "game-icons:big-diamond-ring"
  },
  "promise-iii": {
    id: "promise-iii",
    label: "Promessa III",
    color: "text-red-400",
    icon: "file-icons:ring"
  }
}; 