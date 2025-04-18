"use client";

import { characters } from "@/constants/characters";
import { characterSchema, type CharacterFormData, type CharactersData, type DisplaySettings } from "@/schemas/character";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const STORAGE_KEY = "gc-character-data";
const DISPLAY_SETTINGS_KEY = "gc-display-settings";

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

const defaultDisplaySettings: DisplaySettings = {
  account: {
    chaseLevel: true,
    cardCollectionLevel: true,
  },
  character: {
    level: true,
    wlFloor: true,
    totalAttack: true,
    earrings: true,
    runeSet1: true,
    runeSet2: true,
    ring: true,
  },
  summaries: {
    level85Count: true,
    floor30Count: true,
    oneMillionCount: true,
    relicChaosRingCount: true,
  },
};

const getDefaultValues = (): CharactersData => {
  return {
    account: {
      chaseLevel: 1,
      cardCollectionLevel: 1
    },
    characters: characters.reduce((acc, character) => {
      acc[character.key] = defaultCharacterData;
      return acc;
    }, {} as CharactersData["characters"])
  };
};

export default function Home() {
  const { register: registerCharacter, handleSubmit: handleCharacterSubmit, watch: watchCharacter, formState: { errors: characterErrors }, setValue: setCharacterValue } = useForm<CharactersData>({
    resolver: zodResolver(characterSchema),
    defaultValues: getDefaultValues()
  });

  const { register: registerDisplay, handleSubmit: handleDisplaySubmit, setValue: setDisplayValue } = useForm<DisplaySettings>({
    defaultValues: defaultDisplaySettings
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedDisplaySettings = localStorage.getItem(DISPLAY_SETTINGS_KEY);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as CharactersData;
        // Set account values
        setCharacterValue("account.chaseLevel", parsedData.account.chaseLevel);
        setCharacterValue("account.cardCollectionLevel", parsedData.account.cardCollectionLevel);
        
        // Set values for each character
        characters.forEach(character => {
          const characterData = parsedData.characters[character.key] || defaultCharacterData;
          setCharacterValue(`characters.${character.key}.level`, characterData.level);
          setCharacterValue(`characters.${character.key}.wlFloor`, characterData.wlFloor);
          setCharacterValue(`characters.${character.key}.totalAttack`, characterData.totalAttack);
          setCharacterValue(`characters.${character.key}.earrings`, characterData.earrings);
          setCharacterValue(`characters.${character.key}.runeSet1`, characterData.runeSet1);
          setCharacterValue(`characters.${character.key}.runeSet2`, characterData.runeSet2);
          setCharacterValue(`characters.${character.key}.ring`, characterData.ring);
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }

    if (savedDisplaySettings) {
      try {
        const parsedSettings = JSON.parse(savedDisplaySettings) as DisplaySettings;
        
        // Account fields
        setDisplayValue("account.chaseLevel", parsedSettings.account.chaseLevel);
        setDisplayValue("account.cardCollectionLevel", parsedSettings.account.cardCollectionLevel);
        
        // Character fields
        setDisplayValue("character.level", parsedSettings.character.level);
        setDisplayValue("character.wlFloor", parsedSettings.character.wlFloor);
        setDisplayValue("character.totalAttack", parsedSettings.character.totalAttack);
        setDisplayValue("character.earrings", parsedSettings.character.earrings);
        setDisplayValue("character.runeSet1", parsedSettings.character.runeSet1);
        setDisplayValue("character.runeSet2", parsedSettings.character.runeSet2);
        setDisplayValue("character.ring", parsedSettings.character.ring);

        // Summaries fields
        setDisplayValue("summaries.level85Count", parsedSettings.summaries.level85Count);
        setDisplayValue("summaries.floor30Count", parsedSettings.summaries.floor30Count);
        setDisplayValue("summaries.oneMillionCount", parsedSettings.summaries.oneMillionCount);
        setDisplayValue("summaries.relicChaosRingCount", parsedSettings.summaries.relicChaosRingCount);
      } catch (error) {
        console.error("Error loading display settings:", error);
      }
    }
  }, [setCharacterValue, setDisplayValue]);

  const onSubmit = (data: CharactersData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log("Data saved:", data);
  };

  const onDisplayChange = (data: DisplaySettings) => {
    localStorage.setItem(DISPLAY_SETTINGS_KEY, JSON.stringify(data));
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left sidebar - Character Data */}
      <aside className="w-96 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
        <form onSubmit={handleCharacterSubmit(onSubmit)} className="space-y-4">
          {/* Account Section */}
          <fieldset className="border border-gray-300 dark:border-gray-600 p-3 rounded">
            <legend className="px-2 font-medium">Account</legend>
            <div className="space-y-2">
              <div>
                <label htmlFor="chase-level" className="block text-sm">Chase Level</label>
                <input
                  type="number"
                  id="chase-level"
                  {...registerCharacter("account.chaseLevel", { valueAsNumber: true })}
                  className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                {characterErrors.account?.chaseLevel && <span className="text-red-500 text-xs">{characterErrors.account.chaseLevel.message}</span>}
              </div>
              <div>
                <label htmlFor="card-collection-level" className="block text-sm">Card Collection Level</label>
                <input
                  type="number"
                  id="card-collection-level"
                  {...registerCharacter("account.cardCollectionLevel", { valueAsNumber: true })}
                  className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                {characterErrors.account?.cardCollectionLevel && <span className="text-red-500 text-xs">{characterErrors.account.cardCollectionLevel.message}</span>}
              </div>
            </div>
          </fieldset>

          {/* Characters Section */}
          {characters.map((character) => {
            const ringType = watchCharacter(`characters.${character.key}.ring.type`);
            return (
              <fieldset key={character.key} className="border border-gray-300 dark:border-gray-600 p-3 rounded">
                <legend className="px-2 font-medium">{character.name}</legend>
                <div className="space-y-2">
                  <div>
                    <label htmlFor={`${character.key}-level`} className="block text-sm">Level</label>
                    <input
                      type="number"
                      id={`${character.key}-level`}
                      {...registerCharacter(`characters.${character.key}.level`, { valueAsNumber: true })}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    {characterErrors.characters?.[character.key]?.level && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.level?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-wl`} className="block text-sm">WL Floor</label>
                    <select
                      id={`${character.key}-wl`}
                      {...registerCharacter(`characters.${character.key}.wlFloor`, { valueAsNumber: true })}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((floor) => (
                        <option key={floor} value={floor}>
                          {floor}
                        </option>
                      ))}
                    </select>
                    {characterErrors.characters?.[character.key]?.wlFloor && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.wlFloor?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-ta`} className="block text-sm">Total Attack</label>
                    <input
                      type="number"
                      id={`${character.key}-ta`}
                      {...registerCharacter(`characters.${character.key}.totalAttack`, { valueAsNumber: true })}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    {characterErrors.characters?.[character.key]?.totalAttack && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.totalAttack?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-earrings`} className="block text-sm">Earrings</label>
                    <select
                      id={`${character.key}-earrings`}
                      {...registerCharacter(`characters.${character.key}.earrings`)}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="in-progress">In Progress</option>
                      <option value="epic-set">Epic Set</option>
                      <option value="relic-set">Relic Set</option>
                      <option value="chaos-set">Chaos Set</option>
                    </select>
                    {characterErrors.characters?.[character.key]?.earrings && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.earrings?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-rune1`} className="block text-sm">Rune Set 1</label>
                    <select
                      id={`${character.key}-rune1`}
                      {...registerCharacter(`characters.${character.key}.runeSet1`)}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="none">None</option>
                      <option value="fury">Fury</option>
                      <option value="doom">Doom</option>
                      <option value="fight">Fight</option>
                    </select>
                    {characterErrors.characters?.[character.key]?.runeSet1 && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.runeSet1?.message}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${character.key}-rune2`} className="block text-sm">Rune Set 2</label>
                    <select
                      id={`${character.key}-rune2`}
                      {...registerCharacter(`characters.${character.key}.runeSet2`)}
                      className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="none">None</option>
                      <option value="fury">Fury</option>
                      <option value="doom">Doom</option>
                      <option value="fight">Fight</option>
                    </select>
                    {characterErrors.characters?.[character.key]?.runeSet2 && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.runeSet2?.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm">Ring</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        id={`${character.key}-ring-type`}
                        {...registerCharacter(`characters.${character.key}.ring.type`)}
                        className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="dimensional">Dimensional</option>
                        <option value="infinity">Infinity</option>
                        <option value="promise">Promise</option>
                      </select>
                      <select
                        id={`${character.key}-ring-level`}
                        {...registerCharacter(`characters.${character.key}.ring.level`)}
                        className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      >
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                      </select>
                      {ringType !== "promise" && (
                        <select
                          id={`${character.key}-ring-quality`}
                          {...registerCharacter(`characters.${character.key}.ring.quality`)}
                          className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                        >
                          <option value="faded">Faded</option>
                          <option value="processed">Processed</option>
                          <option value="shiny">Shiny</option>
                        </select>
                      )}
                    </div>
                    {characterErrors.characters?.[character.key]?.ring && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.ring?.message}</span>}
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

      {/* Middle sidebar - Display Settings */}
      <aside className="w-64 bg-gray-200 dark:bg-gray-700 p-4 overflow-y-auto">
        <form onChange={handleDisplaySubmit(onDisplayChange)} className="space-y-4">
          <fieldset className="border border-gray-300 dark:border-gray-600 p-3 rounded">
            <legend className="px-2 font-medium">Account Fields</legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("account.chaseLevel")} />
                <span>Chase Level</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("account.cardCollectionLevel")} />
                <span>Card Collection Level</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="border border-gray-300 dark:border-gray-600 p-3 rounded">
            <legend className="px-2 font-medium">Character Fields</legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("character.level")} />
                <span>Level</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("character.wlFloor")} />
                <span>WL Floor</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("character.totalAttack")} />
                <span>Total Attack</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("character.earrings")} />
                <span>Earrings</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("character.runeSet1")} />
                <span>Rune Set 1</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("character.runeSet2")} />
                <span>Rune Set 2</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("character.ring")} />
                <span>Ring</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="border border-gray-300 dark:border-gray-600 p-3 rounded">
            <legend className="px-2 font-medium">Summaries</legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("summaries.level85Count")} />
                <span>Level 85+ Count</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("summaries.floor30Count")} />
                <span>Floor 30 Count</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("summaries.oneMillionCount")} />
                <span>1M+ Attack Count</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" {...registerDisplay("summaries.relicChaosRingCount")} />
                <span>Relic/Chaos Ring Count</span>
              </label>
            </div>
          </fieldset>
        </form>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Main content will go here */}
      </main>
    </div>
  );
}
