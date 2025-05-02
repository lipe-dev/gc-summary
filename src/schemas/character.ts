import { z } from "zod";
import { characters } from "@/constants/characters";
import { runes } from "@/constants/runes";
import { rings } from "@/constants/rings";
import { armor } from "@/constants/armor";
import { earrings } from "@/constants/earrings";

export const ringSchema = z.object({
  type: z.enum(["dimensional", "infinity", "promise"]),
  level: z.enum(["I", "II", "III"]),
  quality: z.enum(["faded", "processed", "shiny"]).optional(),
});

export const characterSpecificDataSchema = z.object({
  level: z.number().min(1).max(85),
  wlFloor: z.number().min(1).max(30),
  totalAttack: z.number().min(0),
  earring1: z.enum(["none", "in-progress", ...Object.keys(earrings)]),
  earring2: z.enum(["none", "in-progress", ...Object.keys(earrings)]),
  runeSet1: z.enum(["none", ...Object.keys(runes)]),
  runeSet2: z.enum(["none", ...Object.keys(runes)]),
  ring: z.enum(["none", "in-progress", ...Object.keys(rings)]),
  voidPieces: z.record(z.string(), z.boolean()),
  fullSR: z.record(z.string(), z.boolean()),
});

export const accountSchema = z.object({
  chaseLevel: z.number().min(1).max(1000),
  cardCollectionLevel: z.number().min(1).max(2000),
  nickname: z.string().min(1).max(20),
  guildName: z.string().min(1).max(30).optional(),
});

export const displaySettingsSchema = z.object({
  account: z.object({
    chaseLevel: z.boolean(),
    cardCollectionLevel: z.boolean(),
    nickname: z.boolean(),
    guildName: z.boolean(),
  }),
  character: z.object({
    level: z.boolean(),
    wlFloor: z.boolean(),
    totalAttack: z.boolean(),
    earrings: z.boolean(),
    runeSet1: z.boolean(),
    runeSet2: z.boolean(),
    ring: z.boolean(),
    voidPieces: z.boolean(),
    fullSR: z.boolean(),
  }),
  summaries: z.object({
    level85Count: z.boolean(),
    floor30Count: z.boolean(),
    oneMillionCount: z.boolean(),
    relicChaosRingCount: z.boolean(),
    completedRingCount: z.boolean(),
    fullVoidCount: z.boolean(),
    fullSRCount: z.boolean(),
  }),
});

export const characterSchema = z.object({
  account: accountSchema,
  characters: z.record(
    z.enum(Object.values(characters).map(c => c.id) as [string, ...string[]]),
    characterSpecificDataSchema
  ),
});

export type AccountSpecificData = z.infer<typeof accountSchema>;
export type CharacterSpecificData = z.infer<typeof characterSpecificDataSchema>;
export type FullAccountData = z.infer<typeof characterSchema>;
export type DisplaySettings = z.infer<typeof displaySettingsSchema>; 