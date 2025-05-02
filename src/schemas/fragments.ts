import { z } from "zod";
import { FragmentId } from "@/constants/fragments";
import { DismantleItemId } from "@/constants/dismantleItems";

export const fragmentInventorySchema = z.object({
  fragments: z.record(z.string(), z.number().min(0)),
  dismantleItems: z.record(z.string(), z.number().min(0)),
});

export type FragmentInventory = z.infer<typeof fragmentInventorySchema>;

export const characterFragmentInventorySchema = z.object({
  characterId: z.string(),
  inventory: fragmentInventorySchema,
});

export type CharacterFragmentInventory = z.infer<typeof characterFragmentInventorySchema>;

export const fragmentDataSchema = z.object({
  characters: z.record(z.string(), characterFragmentInventorySchema),
});

export type FragmentData = z.infer<typeof fragmentDataSchema>; 