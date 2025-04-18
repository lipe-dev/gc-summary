import { z } from "zod";
import { characters } from "@/constants/characters";

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
  runeSet1: z.enum(["none", "fury", "doom", "fight"]),
  runeSet2: z.enum(["none", "fury", "doom", "fight"]),
  ring: ringSchema,
});

export const characterSchema = z.record(
  z.enum(characters.map(c => c.key) as [string, ...string[]]),
  characterFormSchema
);

export type CharacterFormData = z.infer<typeof characterFormSchema>;
export type CharactersData = z.infer<typeof characterSchema>; 