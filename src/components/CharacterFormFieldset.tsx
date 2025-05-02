import { Character } from "@/constants/characters";
import { UseFormRegister, FieldErrors, Control, Controller } from "react-hook-form";
import { FullAccountData } from "@/schemas/character";
import { runes } from "@/constants/runes";
import { rings } from "@/constants/rings";
import { armor } from "@/constants/armor";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Image from "next/image";
import { earrings } from "@/constants/earrings";

interface CharacterFormFieldsetProps {
  character: Character;
  register: UseFormRegister<FullAccountData>;
  control: Control<FullAccountData>;
  errors: FieldErrors<FullAccountData>;
}

export function CharacterFormFieldset({ 
  character, 
  register,
  control,
  errors
}: CharacterFormFieldsetProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <fieldset id={character.id} className="border border-gray-300 dark:border-gray-600 p-3 rounded">
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
            <label htmlFor={`${character.id}-earring1`} className="block text-sm">Earring 1</label>
            <select
              id={`${character.id}-earring1`}
              {...register(`characters.${character.id}.earring1`)}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="none">None</option>
              <option value="in-progress">Em Progresso</option>
              {Object.entries(earrings).map(([id, earring]) => (
                <option key={id} value={id}>
                  {earring.label}
                </option>
              ))}
            </select>
            {errors.characters?.[character.id]?.earring1 && <span className="text-red-500 text-xs">{errors.characters[character.id]?.earring1?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-earring2`} className="block text-sm">Earring 2</label>
            <select
              id={`${character.id}-earring2`}
              {...register(`characters.${character.id}.earring2`)}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="none">None</option>
              <option value="in-progress">Em Progresso</option>
              {Object.entries(earrings).map(([id, earring]) => (
                <option key={id} value={id}>
                  {earring.label}
                </option>
              ))}
            </select>
            {errors.characters?.[character.id]?.earring2 && <span className="text-red-500 text-xs">{errors.characters[character.id]?.earring2?.message}</span>}
          </div>
          <div>
            <label htmlFor={`${character.id}-rune1`} className="block text-sm">Rune Set 1</label>
            <select
              id={`${character.id}-rune1`}
              {...register(`characters.${character.id}.runeSet1`)}
              className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="none">None</option>
              {Object.entries(runes).map(([id, rune]) => (
                <option key={id} value={id}>
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
              {Object.entries(runes).map(([id, rune]) => (
                <option key={id} value={id}>
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
              <option value="none">None</option>
              {Object.entries(rings).map(([id, ring]) => (
                <option key={id} value={id}>
                  {ring.label}
                </option>
              ))}
            </select>
            {errors.characters?.[character.id]?.ring && <span className="text-red-500 text-xs">{errors.characters[character.id]?.ring?.message}</span>}
          </div>
          <fieldset className="border border-gray-300 dark:border-gray-600 p-3 rounded">
            <legend className="px-2 font-medium">Void Pieces</legend>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(armor).map((piece) => (
                <Controller
                  key={piece.id}
                  name={`characters.${character.id}.voidPieces.${piece.id}`}
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <label
                      className="flex flex-col items-center gap-1 cursor-pointer"
                      onClick={() => onChange(!value)}
                    >
                      <Icon
                        icon={piece.armorIcon}
                        className={`text-2xl transition-colors ${
                          value ? "text-purple-400" : "text-gray-400"
                        } hover:opacity-80`}
                      />
                      <span className="text-xs text-center">{piece.label}</span>
                    </label>
                  )}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="border border-gray-300 dark:border-gray-600 p-3 rounded">
            <legend className="px-2 font-medium">SR</legend>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(armor).map((piece) => (
                <Controller
                  key={piece.id}
                  name={`characters.${character.id}.fullSR.${piece.id}`}
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <label
                      className="flex flex-col items-center gap-1 cursor-pointer"
                      onClick={() => onChange(!value)}
                    >
                      <Icon
                        icon={piece.visualIcon}
                        className={`text-2xl transition-colors ${
                          value ? "text-yellow-400" : "text-gray-400"
                        } hover:opacity-80`}
                      />
                      <span className="text-xs text-center">{piece.label}</span>
                    </label>
                  )}
                />
              ))}
            </div>
          </fieldset>
        </div>
      )}
    </fieldset>
  );
} 