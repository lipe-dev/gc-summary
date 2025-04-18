"use client";

import { characters } from "@/constants/characters";
import { characterSchema, type CharacterFormData, type CharactersData } from "@/schemas/character";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const STORAGE_KEY = "gc-character-data";

const defaultCharacterData: CharacterFormData = {
  level: 1,
  wlFloor: 1,
  totalAttack: 0,
  earrings: "in-progress",
  runeSet1: "none",
  runeSet2: "none",
  ring: {
    type: "dimensional",
    level: "I",
    quality: "faded"
  }
};

const getDefaultValues = (): CharactersData => {
  return characters.reduce((acc, character) => {
    acc[character.key] = defaultCharacterData;
    return acc;
  }, {} as CharactersData);
};

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<CharactersData>({
    resolver: zodResolver(characterSchema),
    defaultValues: getDefaultValues()
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as CharactersData;
        // Set values for each character
        characters.forEach(character => {
          const characterData = parsedData[character.key] || defaultCharacterData;
          setValue(`${character.key}.level`, characterData.level);
          setValue(`${character.key}.wlFloor`, characterData.wlFloor);
          setValue(`${character.key}.totalAttack`, characterData.totalAttack);
          setValue(`${character.key}.earrings`, characterData.earrings);
          setValue(`${character.key}.runeSet1`, characterData.runeSet1);
          setValue(`${character.key}.runeSet2`, characterData.runeSet2);
          setValue(`${character.key}.ring`, characterData.ring);
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, [setValue]);

  const onSubmit = (data: CharactersData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log("Data saved:", data);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left sidebar */}
      <aside className="w-96 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {characters.map((character) => {
            const ringType = watch(`${character.key}.ring.type`);
            return (
              <fieldset key={character.key} className="border border-gray-300 dark:border-gray-600 p-3 rounded">
                <legend className="px-2 font-medium">{character.name}</legend>
                <div className="space-y-2">
                  <div>
                    <label htmlFor={`${character.key}-level`} className="block text-sm">Level</label>
                    <input
                      type="number"
                      id={`${character.key}-level`}
                      {...register(`${character.key}.level`, { valueAsNumber: true })}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    {errors[character.key]?.level && <span className="text-red-500 text-xs">{errors[character.key]?.level?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-wl`} className="block text-sm">WL Floor</label>
                    <select
                      id={`${character.key}-wl`}
                      {...register(`${character.key}.wlFloor`, { valueAsNumber: true })}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((floor) => (
                        <option key={floor} value={floor}>
                          {floor}
                        </option>
                      ))}
                    </select>
                    {errors[character.key]?.wlFloor && <span className="text-red-500 text-xs">{errors[character.key]?.wlFloor?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-ta`} className="block text-sm">Total Attack</label>
                    <input
                      type="number"
                      id={`${character.key}-ta`}
                      {...register(`${character.key}.totalAttack`, { valueAsNumber: true })}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    {errors[character.key]?.totalAttack && <span className="text-red-500 text-xs">{errors[character.key]?.totalAttack?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-earrings`} className="block text-sm">Earrings</label>
                    <select
                      id={`${character.key}-earrings`}
                      {...register(`${character.key}.earrings`)}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="in-progress">In Progress</option>
                      <option value="epic-set">Epic Set</option>
                      <option value="relic-set">Relic Set</option>
                      <option value="chaos-set">Chaos Set</option>
                    </select>
                    {errors[character.key]?.earrings && <span className="text-red-500 text-xs">{errors[character.key]?.earrings?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-rune1`} className="block text-sm">Rune Set 1</label>
                    <select
                      id={`${character.key}-rune1`}
                      {...register(`${character.key}.runeSet1`)}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="none">None</option>
                      <option value="fury">Fury</option>
                      <option value="doom">Doom</option>
                      <option value="fight">Fight</option>
                    </select>
                    {errors[character.key]?.runeSet1 && <span className="text-red-500 text-xs">{errors[character.key]?.runeSet1?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-rune2`} className="block text-sm">Rune Set 2</label>
                    <select
                      id={`${character.key}-rune2`}
                      {...register(`${character.key}.runeSet2`)}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="none">None</option>
                      <option value="fury">Fury</option>
                      <option value="doom">Doom</option>
                      <option value="fight">Fight</option>
                    </select>
                    {errors[character.key]?.runeSet2 && <span className="text-red-500 text-xs">{errors[character.key]?.runeSet2?.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm">Ring</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        id={`${character.key}-ring-type`}
                        {...register(`${character.key}.ring.type`)}
                        className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="dimensional">Dimensional</option>
                        <option value="infinity">Infinity</option>
                        <option value="promise">Promise</option>
                      </select>
                      <select
                        id={`${character.key}-ring-level`}
                        {...register(`${character.key}.ring.level`)}
                        className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                      </select>
                      {ringType !== "promise" && (
                        <select
                          id={`${character.key}-ring-quality`}
                          {...register(`${character.key}.ring.quality`)}
                          className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                        >
                          <option value="faded">Faded</option>
                          <option value="processed">Processed</option>
                          <option value="shiny">Shiny</option>
                        </select>
                      )}
                    </div>
                    {errors[character.key]?.ring && <span className="text-red-500 text-xs">{errors[character.key]?.ring?.message}</span>}
                  </div>
                </div>
              </fieldset>
            );
          })}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                window.location.reload();
              }}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
            >
              Clear Data
            </button>
          </div>
        </form>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Main content will go here */}
      </main>
    </div>
  );
}
