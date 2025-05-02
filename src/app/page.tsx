"use client";

import { characters } from "@/constants/characters";
import { characterSchema, type CharacterSpecificData, type FullAccountData, type DisplaySettings } from "@/schemas/character";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AccountStats } from "@/components/AccountStats";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterStats } from "@/components/CharacterStats";
import { CharacterFormFieldset } from "@/components/CharacterFormFieldset";
import { Icon } from "@iconify/react/dist/iconify.js";

const STORAGE_KEY = "gc-character-data";

const defaultCharacterData: CharacterSpecificData = {
  level: 85,
  wlFloor: 30,
  totalAttack: 0,
  earrings: "in-progress",
  runeSet1: "none",
  runeSet2: "none",
  ring: "in-progress",
  voidPieces: {},
  fullSR: {}
};

const defaultDisplaySettings: DisplaySettings = {
  account: {
    chaseLevel: true,
    cardCollectionLevel: true,
    nickname: true,
    guildName: true,
  },
  character: {
    level: false,
    wlFloor: false,
    totalAttack: true,
    earrings: false,
    runeSet1: false,
    runeSet2: false,
    ring: false,
    voidPieces: false,
    fullSR: false,
  },
  summaries: {
    level85Count: false,
    floor30Count: false,
    oneMillionCount: false,
    relicChaosRingCount: false,
    completedRingCount: false,
    fullVoidCount: false,
    fullSRCount: false,
  },
};

const getDefaultValues = (): FullAccountData => {
  return {
    account: {
      chaseLevel: 1,
      cardCollectionLevel: 1,
      nickname: "",
      guildName: "",
    },
    characters: Object.keys(characters).reduce((acc, characterKey) => {
      acc[characterKey] = defaultCharacterData;
      return acc;
    }, {} as FullAccountData["characters"])
  };
};

export default function Home() {
  const [showCharacterSidebar, setShowCharacterSidebar] = useState(true);
  const [showDisplaySidebar, setShowDisplaySidebar] = useState(true);

  const { register: registerCharacter, 
          handleSubmit: handleCharacterSubmit, 
          watch: watchCharacter, 
          formState: { 
            errors: characterErrors
          }, 
          setValue: setCharacterValue, 
        control } = useForm<FullAccountData>({
    resolver: zodResolver(characterSchema),
    defaultValues: getDefaultValues()
  });

  const { register: registerDisplay, watch: watchDisplay } = useForm<DisplaySettings>({
    defaultValues: defaultDisplaySettings
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as Partial<FullAccountData>;
        // Set account values
        setCharacterValue("account.chaseLevel", parsedData.account?.chaseLevel || 1);
        setCharacterValue("account.cardCollectionLevel", parsedData.account?.cardCollectionLevel || 1);
        setCharacterValue("account.nickname", parsedData.account?.nickname || "");
        setCharacterValue("account.guildName", parsedData.account?.guildName || "");
        
        // Set values for each character
        Object.keys(characters).forEach(characterKey => {
          const characterData = parsedData.characters?.[characterKey] || defaultCharacterData;
          setCharacterValue(`characters.${characterKey}.level`, characterData.level);
          setCharacterValue(`characters.${characterKey}.wlFloor`, characterData.wlFloor);
          setCharacterValue(`characters.${characterKey}.totalAttack`, characterData.totalAttack);
          setCharacterValue(`characters.${characterKey}.earrings`, characterData.earrings);
          setCharacterValue(`characters.${characterKey}.runeSet1`, characterData.runeSet1);
          setCharacterValue(`characters.${characterKey}.runeSet2`, characterData.runeSet2);
          setCharacterValue(`characters.${characterKey}.ring`, characterData.ring);
          setCharacterValue(`characters.${characterKey}.voidPieces`, characterData.voidPieces);
          setCharacterValue(`characters.${characterKey}.fullSR`, characterData.fullSR);
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, [setCharacterValue]);

  const onSubmit = (data: FullAccountData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log("Data saved:", data);
  };

  const displaySettings = watchDisplay();
  const allCharactersData = watchCharacter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0000] to-[#1a0000] text-white">
        <div className="h-screen flex flex-col">
          
          <div className="flex-1 flex overflow-hidden">
            {/* Left sidebar - Character Data */}
            <aside className={`bg-gray-800 p-4 overflow-y-auto transition-all duration-300 ${showCharacterSidebar ? 'w-96' : '' }`}>
            <button
              onClick={() => setShowCharacterSidebar(!showCharacterSidebar)}
              className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition-colors text-sm mb-4"
            >
              {showCharacterSidebar ? 'Hide Character Form' : <Icon icon="solar:user-bold" className="text-xl" />}
            </button>

              <form onSubmit={handleCharacterSubmit(onSubmit)} className={`space-y-4 ${!showCharacterSidebar && 'hidden'}`}>
                {/* Account Section */}
                <fieldset className="border border-gray-300 dark:border-gray-600 p-3 rounded">
                  <legend className="px-2 font-medium">Account</legend>
                  <div className="space-y-2">
                    <div>
                      <label htmlFor="nickname" className="block text-sm">Nickname</label>
                      <input
                        type="text"
                        id="nickname"
                        {...registerCharacter("account.nickname")}
                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      {characterErrors.account?.nickname && <span className="text-red-500 text-xs">{characterErrors.account.nickname.message}</span>}
                    </div>
                    <div>
                      <label htmlFor="guild-name" className="block text-sm">Guild Name</label>
                      <input
                        type="text"
                        id="guild-name"
                        {...registerCharacter("account.guildName")}
                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      {characterErrors.account?.guildName && <span className="text-red-500 text-xs">{characterErrors.account.guildName.message}</span>}
                    </div>
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
                {Object.values(characters).map((character) => (
                  <CharacterFormFieldset
                    key={character.id}
                    character={character}
                    register={registerCharacter}
                    control={control}
                    errors={characterErrors}
                  />
                ))}
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
            <aside className={`bg-gray-800 p-4 overflow-y-auto transition-all duration-300 ${showDisplaySidebar ? 'w-96' : '' }`}>
            <button
              onClick={() => setShowDisplaySidebar(!showDisplaySidebar)}
              className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition-colors text-sm mb-4"
            >
              {showDisplaySidebar ? 'Hide Display Settings' : <Icon icon="solar:settings-bold" className="text-xl" />}
            </button>
              <form className={`space-y-4 ${!showDisplaySidebar && 'hidden'}`}>
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
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...registerDisplay("account.nickname")} />
                      <span>Nickname</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...registerDisplay("account.guildName")} />
                      <span>Guild Name</span>
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
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...registerDisplay("character.voidPieces")} />
                      <span>Void Pieces</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...registerDisplay("character.fullSR")} />
                      <span>Full SR</span>
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
                      <span>Top Earrings</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...registerDisplay("summaries.completedRingCount")} />
                      <span>Top Rings</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...registerDisplay("summaries.fullVoidCount")} />
                      <span>Full Void</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" {...registerDisplay("summaries.fullSRCount")} />
                      <span>Full SR</span>
                    </label>
                  </div>
                </fieldset>
              </form>
            </aside>

            {/* Main content */}
            <main className="overflow-y-auto p-4 w-full">
              <div className="w-[1024px] bg-gradient-to-br from-[#1a0000] to-[#2a0000] rounded-lg shadow-lg p-0">
                <AccountStats 
                  data={allCharactersData}
                  showChaseLevel={displaySettings.account.chaseLevel}
                  showCardCollectionLevel={displaySettings.account.cardCollectionLevel}
                  showNickname={displaySettings.account.nickname}
                  showGuildName={displaySettings.account.guildName}
                />
                
                <div className="grid grid-cols-8 gap-2 mt-4 p-4">
                  {Object.values(characters)
                    .map(character => ({
                      character,
                      data: allCharactersData.characters[character.id]
                    }))
                    .sort((a, b) => b.data.totalAttack - a.data.totalAttack)
                    .map(({ character, data: characterData }) => (
                      <CharacterCard
                        character={character}
                        data={characterData}
                        showLevel={displaySettings.character.level}
                        showWlFloor={displaySettings.character.wlFloor}
                        showTotalAttack={displaySettings.character.totalAttack}
                        showEarrings={displaySettings.character.earrings}
                        showRuneSet1={displaySettings.character.runeSet1}
                        showRuneSet2={displaySettings.character.runeSet2}
                        showRing={displaySettings.character.ring}
                        showVoidPieces={displaySettings.character.voidPieces}
                        characters={allCharactersData.characters}
                        key={character.id}
                        showFullSR={displaySettings.character.fullSR}
                      />
                    ))}
                </div>

                <CharacterStats 
                  data={allCharactersData}
                  showLevel85Count={displaySettings.summaries.level85Count}
                  showFloor30Count={displaySettings.summaries.floor30Count}
                  showOneMillionCount={displaySettings.summaries.oneMillionCount}
                  showRelicChaosRingCount={displaySettings.summaries.relicChaosRingCount}
                  showCompletedRingCount={displaySettings.summaries.completedRingCount}
                  showFullVoidCount={displaySettings.summaries.fullVoidCount}
                  showFullSRCount={displaySettings.summaries.fullSRCount}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
  );
}
