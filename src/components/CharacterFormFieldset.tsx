import { Character } from "@/constants/characters";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CharactersData } from "@/schemas/character";
import { runes } from "@/constants/runes";
import { rings } from "@/constants/rings";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Image from "next/image";

interface CharacterFormFieldsetProps {
  character: Character;
  register: UseFormRegister<CharactersData>;
  errors: FieldErrors<CharactersData>;
}

export function CharacterFormFieldset({ 
  character, 
  register, 
  errors
}: CharacterFormFieldsetProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <fieldset key={character.id} className="border border-gray-300 dark:border-gray-600 p-3 rounded">
      <legend className="px-2 font-medium flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Icon icon={isOpen ? "mdi:chevron-down" : "mdi:chevron-right"} />
        </button>
        <div className="w-6 h-6 relative">
          <Image
            src={character.profilePicture}
            alt={character.name}
            fill
            className="object-cover rounded"
          />
        </div>
        <span>{character.name}</span>
      </legend>
      {isOpen && (
        <div className="space-y-2">
          <div>
            <label htmlFor={`${character.id}-level`} className="block text-sm">Level</label>
            <input
              type="number"
              id={`${character.id}-level`}
              {...register(`characters.${character.id}.level`, { valueAsNumber: true })}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            {errors.characters?.[character.id]?.level && <span className="text-red-500 text-xs">{errors.characters[character.id]?.level?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-wl`} className="block text-sm">WL Floor</label>
            <select
              id={`${character.id}-wl`}
              {...register(`characters.${character.id}.wlFloor`, { valueAsNumber: true })}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
            {errors.characters?.[character.id]?.wlFloor && <span className="text-red-500 text-xs">{errors.characters[character.id]?.wlFloor?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-ta`} className="block text-sm">Total Attack</label>
            <input
              type="number"
              id={`${character.id}-ta`}
              {...register(`characters.${character.id}.totalAttack`, { valueAsNumber: true })}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            {errors.characters?.[character.id]?.totalAttack && <span className="text-red-500 text-xs">{errors.characters[character.id]?.totalAttack?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-earrings`} className="block text-sm">Earrings</label>
            <select
              id={`${character.id}-earrings`}
              {...register(`characters.${character.id}.earrings`)}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="in-progress">In Progress</option>
              <option value="epic-set">Epic Set</option>
              <option value="relic-set">Relic Set</option>
              <option value="chaos-set">Chaos Set</option>
            </select>
            {errors.characters?.[character.id]?.earrings && <span className="text-red-500 text-xs">{errors.characters[character.id]?.earrings?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-rune1`} className="block text-sm">Rune Set 1</label>
            <select
              id={`${character.id}-rune1`}
              {...register(`characters.${character.id}.runeSet1`)}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="none">None</option>
              {Object.values(runes).map((rune) => (
                <option key={rune.id} value={rune.id}>
                  {rune.label}
                </option>
              ))}
            </select>
            {errors.characters?.[character.id]?.runeSet1 && <span className="text-red-500 text-xs">{errors.characters[character.id]?.runeSet1?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-rune2`} className="block text-sm">Rune Set 2</label>
            <select
              id={`${character.id}-rune2`}
              {...register(`characters.${character.id}.runeSet2`)}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="none">None</option>
              {Object.values(runes).map((rune) => (
                <option key={rune.id} value={rune.id}>
                  {rune.label}
                </option>
              ))}
            </select>
            {errors.characters?.[character.id]?.runeSet2 && <span className="text-red-500 text-xs">{errors.characters[character.id]?.runeSet2?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-ring`} className="block text-sm">Ring</label>
            <select
              id={`${character.id}-ring`}
              {...register(`characters.${character.id}.ring`)}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              {Object.values(rings).map((ring) => (
                <option key={ring.id} value={ring.id}>
                  {ring.label}
                </option>
              ))}
            </select>
            {errors.characters?.[character.id]?.ring && <span className="text-red-500 text-xs">{errors.characters[character.id]?.ring?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-void-pieces`} className="block text-sm">Void Pieces</label>
            <input
              type="number"
              id={`${character.id}-void-pieces`}
              min="0"
              max="7"
              {...register(`characters.${character.id}.voidPieces`, { valueAsNumber: true })}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            {errors.characters?.[character.id]?.voidPieces && <span className="text-red-500 text-xs">{errors.characters[character.id]?.voidPieces?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-full-sr`} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`${character.id}-full-sr`}
                {...register(`characters.${character.id}.fullSR`)}
                className="w-4 h-4 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm">Full SR</span>
            </label>
            {errors.characters?.[character.id]?.fullSR && <span className="text-red-500 text-xs">{errors.characters[character.id]?.fullSR?.message}</span>}
          </div>
        </div>
      )}
    </fieldset>
  );
} 