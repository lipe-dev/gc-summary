import { z } from "zod";
import { characters } from "@/constants/characters";
import { runes } from "@/constants/runes";
import { rings } from "@/constants/rings";

export const ringSchema = z.object({
  type: z.enum(["dimensional", "infinity", "promise"]),
  level: z.enum(["I", "II", "III"]),
  quality: z.enum(["faded", "processed", "shiny"]).optional(),
});

export const characterFormSchema = z.object({
  level: z.number().min(1).max(99),
  wlFloor: z.number().min(1).max(30),
  totalAttack: z.number().min(0),
  earrings: z.enum(["in-progress", "epic-set", "relic-set", "chaos-set"]),
  runeSet1: z.enum(["none", ...Object.keys(runes)]),
  runeSet2: z.enum(["none", ...Object.keys(runes)]),
  ring: z.enum(Object.keys(rings) as [string, ...string[]]),
  voidPieces: z.number().min(0).max(7),
  fullSR: z.boolean(),
});

export const accountSchema = z.object({
  chaseLevel: z.number().min(1).max(99),
  cardCollectionLevel: z.number().min(1).max(99),
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
    characterFormSchema
  ),
});

export type CharacterFormData = z.infer<typeof characterFormSchema>;
export type AccountData = z.infer<typeof accountSchema>;
export type CharactersData = z.infer<typeof characterSchema>;
export type DisplaySettings = z.infer<typeof displaySettingsSchema>; 