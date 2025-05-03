export type RingId = "other" 
| "faded-infinity-i" 
| "forged-infinity-i" 
| "shiny-infinity-i" 
| "faded-infinity-ii"
| "forged-infinity-ii"
| "shiny-infinity-ii"
| "faded-infinity-iii"
| "forged-infinity-iii" 
| "shiny-infinity-iii" 
| "faded-dimension-iii"
| "forged-dimension-iii"
| "shiny-dimension-iii" 
| "promise-i" 
| "promise-ii" 
| "promise-iii"

export interface Ring {
  id: RingId;
  label: string;
  color: string;
  icon: string;
}

export type RingMap = {
  [key in RingId]: Ring;
};

export const rings: RingMap = {
  "other": {
    id: "other",
    label: "Outro",
    color: "text-gray-400",
    icon: "game-icons:ring"
  },
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
  "faded-dimension-iii": {
    id: "faded-dimension-iii",
    label: "Dimensão Esmaecida III",
    color: "text-blue-300",
    icon: "file-icons:ring"
  },
  "forged-dimension-iii": {
    id: "forged-dimension-iii",
    label: "Dimensão Forjada III",
    color: "text-blue-300",
    icon: "file-icons:ring"
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
  },
}; 