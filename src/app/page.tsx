"use client";

import { characters } from "@/constants/characters";
import { characterSchema, type CharacterFormData, type CharactersData, type DisplaySettings } from "@/schemas/character";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

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
  },
  voidPieces: 0,
  fullSR: false
};

const defaultDisplaySettings: DisplaySettings = {
  account: {
    chaseLevel: true,
    cardCollectionLevel: true,
    nickname: true,
  },
  character: {
    level: true,
    wlFloor: true,
    totalAttack: true,
    earrings: true,
    runeSet1: true,
    runeSet2: true,
    ring: true,
    voidPieces: true,
    fullSR: true,
  },
  summaries: {
    level85Count: true,
    floor30Count: true,
    oneMillionCount: true,
    relicChaosRingCount: true,
    completedRingCount: true,
    fullVoidCount: true,
    fullSRCount: true,
  },
};

const getDefaultValues = (): CharactersData => {
  return {
    account: {
      chaseLevel: 1,
      cardCollectionLevel: 1,
      nickname: ""
    },
    characters: characters.reduce((acc, character) => {
      acc[character.key] = defaultCharacterData;
      return acc;
    }, {} as CharactersData["characters"])
  };
};

const formatAttack = (attack: number): string => {
  if (attack >= 1000000) {
    return `${(attack / 1000000).toFixed(3)}kk`;
  }
  return `${Math.round(attack / 1000)}k`;
};

const getAttackColorClass = (attack: number, level: number, characters: CharactersData["characters"]): string => {
  if (level < 85) {
    return "text-blue-400";
  }

  const level85Attacks = Object.values(characters)
    .filter(c => c.level >= 85)
    .map(c => c.totalAttack);
  
  if (level85Attacks.length === 0) {
    return "text-blue-400";
  }

  const orderedAttacks = level85Attacks.sort((a, b) => b - a);

  console.log(orderedAttacks);

  const position = orderedAttacks.indexOf(attack);

  console.log(position, attack);

  // if highest
  if (position === 0) {
    return "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500";
  }

  // if top third
  if (position <= orderedAttacks.length / 3) {
    return "text-yellow-500";
  }

  // if middle third
  if (position <= orderedAttacks.length / 3 * 2) {
    return "text-gray-300";
  }

  return "text-amber-600";
};

const CharacterCard = ({ 
  character, 
  data,
  showLevel,
  showWlFloor,
  showTotalAttack,
  showEarrings,
  showRuneSet1,
  showRuneSet2,
  showRing,
  showVoidPieces,
  characters
}: { 
  character: { key: string; name: string };
  data: CharacterFormData;
  showLevel: boolean;
  showWlFloor: boolean;
  showTotalAttack: boolean;
  showEarrings: boolean;
  showRuneSet1: boolean;
  showRuneSet2: boolean;
  showRing: boolean;
  showVoidPieces: boolean;
  characters: CharactersData["characters"];
}) => {
  const cardItems = [
    { show: showWlFloor, value: data.wlFloor, label: "WL Floor" },
    { show: showEarrings, value: data.earrings, label: "Earrings" },
    { show: showRuneSet1 || showRuneSet2, value: `${data.runeSet1 !== "none" ? data.runeSet1 : ""} ${data.runeSet2 !== "none" ? `+ ${data.runeSet2}` : ""}`, label: "Runes" },
    { show: showRing, value: `${data.ring.type} ${data.ring.level} ${data.ring.quality && `(${data.ring.quality})`}`, label: "Ring" },
    { show: showVoidPieces, value: data.voidPieces, label: "Void Pieces" }
  ].filter(item => item.show);

  const getBorderColorClass = (attack: number, level: number, characters: CharactersData["characters"]): string => {
    if (level < 85) {
      return "border-blue-400";
    }

    const level85Attacks = Object.values(characters)
      .filter(c => c.level >= 85)
      .map(c => c.totalAttack);
    
    if (level85Attacks.length === 0) {
      return "border-blue-400";
    }

    const orderedAttacks = level85Attacks.sort((a, b) => b - a);
    const position = orderedAttacks.indexOf(attack);

    if (position === 0) {
      return "border-transparent bg-clip-border bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500";
    }

    if (position <= orderedAttacks.length / 3) {
      return "border-yellow-500";
    }

    if (position <= orderedAttacks.length / 3 * 2) {
      return "border-gray-300";
    }

    return "border-amber-600";
  };

  return (
    <div className="rounded-lg shadow flex flex-col items-center p-2">
      {(showLevel || showTotalAttack) && (
        <div className="bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-t-lg p-1 pb-0">
          <div className={`text-2xl font-medium ${getAttackColorClass(data.totalAttack, data.level, characters)}`}>
            {data.level < 85 ? `Lv${data.level}` : formatAttack(data.totalAttack)}
          </div>
        </div>
      )}
      <div className={`w-24 h-24 relative mb-2 border-4 ${getBorderColorClass(data.totalAttack, data.level, characters)} rounded-lg overflow-hidden`}>
        <Image
          src={`/characters/${character.key}.png`}
          alt={character.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="text-sm space-y-1 w-full">
        {cardItems.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className="text-gray-300">{item.label}:</span>
            <span className="text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccountStats = ({ 
  data,
  showChaseLevel,
  showCardCollectionLevel,
  showNickname
}: { 
  data: CharactersData;
  showChaseLevel: boolean;
  showCardCollectionLevel: boolean;
  showNickname: boolean;
}) => {
  if (!showChaseLevel && !showCardCollectionLevel && !showNickname) return null;

  return (
    <div className="bg-gradient-to-br from-[#2a0000] to-[#3a0000] shadow relative flex flex-row items-center gap-4 p-4 pt-0">
      {showChaseLevel && (
        <div className="w-fit">
          <div className="bg-gradient-to-br from-[#1a0000] to-[#2a0000] border-x-2 border-b-2 border-yellow-500 rounded-b-lg px-10 py-6">
            <div className="text-4xl font-bold text-center text-yellow-500">{data.account.chaseLevel}</div>
          </div>
        </div>
      )}
      {showCardCollectionLevel && (
        <div className="w-fit">
          <div className="bg-gradient-to-br from-[#1a0000] to-[#2a0000] border-x-2 border-b-2 border-yellow-500 rounded-b-lg px-10 py-6">
            <div className="text-4xl font-bold text-center text-yellow-500">{data.account.cardCollectionLevel}</div>
          </div>
        </div>
      )}

      {showNickname && (
        <div className="text-center ml-8">
          <div className="text-3xl font-medium text-gray-200">{data.account.nickname}</div>
        </div>
      )}
    </div>
  );
};

const CharacterStats = ({ 
  data,
  showLevel85Count,
  showFloor30Count,
  showOneMillionCount,
  showRelicChaosRingCount,
  showCompletedRingCount,
  showFullVoidCount,
  showFullSRCount
}: { 
  data: CharactersData;
  showLevel85Count: boolean;
  showFloor30Count: boolean;
  showOneMillionCount: boolean;
  showRelicChaosRingCount: boolean;
  showCompletedRingCount: boolean;
  showFullVoidCount: boolean;
  showFullSRCount: boolean;
}) => {
  const totalCharacters = Object.keys(data.characters).length;
  const level85Count = Object.values(data.characters).filter(c => c.level >= 85).length;
  const floor30Count = Object.values(data.characters).filter(c => c.wlFloor >= 30).length;
  const oneMillionCount = Object.values(data.characters).filter(c => c.totalAttack >= 1000000).length;
  const relicChaosRingCount = Object.values(data.characters).filter(c => 
    c.earrings === "relic-set" || c.earrings === "chaos-set"
  ).length;
  const completedRingCount = Object.values(data.characters).filter(c => 
    (c.ring.type === "promise") || 
    (c.ring.level === "III" && c.ring.quality === "shiny")
  ).length;
  const fullVoidCount = Object.values(data.characters).filter(c => 
    c.voidPieces === 7
  ).length;
  const fullSRCount = Object.values(data.characters).filter(c => 
    c.fullSR
  ).length;

  const summaryItems = [
    { show: showLevel85Count, value: `${level85Count}/${totalCharacters}`, label: "Level 85+" },
    { show: showFloor30Count, value: `${floor30Count}/${totalCharacters}`, label: "Floor 30+" },
    { show: showOneMillionCount, value: `${oneMillionCount}/${totalCharacters}`, label: "1M+ Attack" },
    { show: showRelicChaosRingCount, value: `${relicChaosRingCount}/${totalCharacters}`, label: "Top Earrings" },
    { show: showCompletedRingCount, value: `${completedRingCount}/${totalCharacters}`, label: "Top Rings" },
    { show: showFullVoidCount, value: `${fullVoidCount}/${totalCharacters}`, label: "Full Void" },
    { show: showFullSRCount, value: `${fullSRCount}/${totalCharacters}`, label: "Full SR" }
  ].filter(item => item.show);

  if (summaryItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-[#2a0000] to-[#3a0000] shadow relative flex flex-row items-center justify-end gap-4 p-4">
      {summaryItems.map((item, index) => (
        <div key={index} className="w-fit">
          <div className="bg-gradient-to-br from-[#1a0000] to-[#2a0000] rounded-lg px-6 py-4">
            <div className="text-2xl font-bold text-center text-yellow-500">{item.value}</div>
            <div className="text-xs text-center text-gray-300 mt-0.5">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [showCharacterSidebar, setShowCharacterSidebar] = useState(true);
  const [showDisplaySidebar, setShowDisplaySidebar] = useState(true);

  const { register: registerCharacter, handleSubmit: handleCharacterSubmit, watch: watchCharacter, formState: { errors: characterErrors }, setValue: setCharacterValue } = useForm<CharactersData>({
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
        const parsedData = JSON.parse(savedData) as CharactersData;
        // Set account values
        setCharacterValue("account.chaseLevel", parsedData.account.chaseLevel);
        setCharacterValue("account.cardCollectionLevel", parsedData.account.cardCollectionLevel);
        setCharacterValue("account.nickname", parsedData.account.nickname);
        
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
          setCharacterValue(`characters.${character.key}.voidPieces`, characterData.voidPieces);
          setCharacterValue(`characters.${character.key}.fullSR`, characterData.fullSR);
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, [setCharacterValue]);

  const onSubmit = (data: CharactersData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log("Data saved:", data);
  };


  const displaySettings = watchDisplay();

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar with toggle buttons */}
      <div className="bg-gray-100 dark:bg-gray-800 p-2 flex gap-2">
        <button
          onClick={() => setShowCharacterSidebar(!showCharacterSidebar)}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors text-sm"
        >
          {showCharacterSidebar ? 'Hide Character Form' : 'Show Character Form'}
        </button>
        <button
          onClick={() => setShowDisplaySidebar(!showDisplaySidebar)}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors text-sm"
        >
          {showDisplaySidebar ? 'Hide Display Settings' : 'Show Display Settings'}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Character Data */}
        <aside className={`w-96 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto transition-all duration-300 ${!showCharacterSidebar && 'hidden'}`}>
          <form onSubmit={handleCharacterSubmit(onSubmit)} className="space-y-4">
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
                    <div>
                      <label htmlFor={`${character.key}-void-pieces`} className="block text-sm">Void Pieces</label>
                      <input
                        type="number"
                        id={`${character.key}-void-pieces`}
                        min="0"
                        max="7"
                        {...registerCharacter(`characters.${character.key}.voidPieces`, { valueAsNumber: true })}
                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      {characterErrors.characters?.[character.key]?.voidPieces && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.voidPieces?.message}</span>}
                    </div>
                    <div>
                      <label htmlFor={`${character.key}-full-sr`} className="block text-sm">Full SR</label>
                      <input
                        type="checkbox"
                        id={`${character.key}-full-sr`}
                        {...registerCharacter(`characters.${character.key}.fullSR`)}
                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      {characterErrors.characters?.[character.key]?.fullSR && <span className="text-red-500 text-xs">{characterErrors.characters[character.key]?.fullSR?.message}</span>}
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
        <aside className={`w-64 bg-gray-200 dark:bg-gray-700 p-4 overflow-y-auto transition-all duration-300 ${!showDisplaySidebar && 'hidden'}`}>
          <form className="space-y-4">
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
        <main className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="w-[1024px] bg-gradient-to-br from-[#1a0000] to-[#2a0000] rounded-lg shadow-lg p-0">
            <AccountStats 
              data={watchCharacter()}
              showChaseLevel={displaySettings.account.chaseLevel}
              showCardCollectionLevel={displaySettings.account.cardCollectionLevel}
              showNickname={displaySettings.account.nickname}
            />
            
            <div className="grid grid-cols-8 gap-4 mt-4 p-4">
              {characters
                .map(character => ({
                  character,
                  data: watchCharacter(`characters.${character.key}`)
                }))
                .sort((a, b) => b.data.totalAttack - a.data.totalAttack)
                .map(({ character, data: characterData }) => (
                  <CharacterCard
                    key={character.key}
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
                    characters={watchCharacter().characters}
                  />
                ))}
            </div>

            <CharacterStats 
              data={watchCharacter()}
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
  );
}
