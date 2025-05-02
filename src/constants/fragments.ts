export const fragments = {
  "s-rank": {
    id: "s-rank",
    label: "S-Rank",
    icon: "game-icons:rank-3",
    color: "text-yellow-400",
  },
  "a-rank": {
    id: "a-rank",
    label: "A-Rank",
    icon: "game-icons:rank-2",
    color: "text-purple-400",
  },
  "b-rank": {
    id: "b-rank",
    label: "B-Rank",
    icon: "game-icons:rank-1",
    color: "text-blue-400",
  },
} as const;

export type FragmentId = keyof typeof fragments; 