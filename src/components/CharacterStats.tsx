import { FullAccountData } from "@/schemas/character";

const MAX_VOID_PIECES = 7;
const MAX_SR_PIECES = 12;

interface CharacterStatsProps {
  data: FullAccountData;
  showLevel85Count: boolean;
  showFloor30Count: boolean;
  showOneMillionCount: boolean;
  showRelicChaosRingCount: boolean;
  showCompletedRingCount: boolean;
  showFullVoidCount: boolean;
  showFullSRCount: boolean;
}

export function CharacterStats({ 
  data,
  showLevel85Count,
  showFloor30Count,
  showOneMillionCount,
  showRelicChaosRingCount,
  showCompletedRingCount,
  showFullVoidCount,
  showFullSRCount
}: CharacterStatsProps) {
  const totalCharacters = Object.keys(data.characters).length;
  const level85Count = Object.values(data.characters).filter(c => c.level >= 85).length;
  const floor30Count = Object.values(data.characters).filter(c => c.wlFloor >= 30).length;
  const oneMillionCount = Object.values(data.characters).filter(c => c.totalAttack >= 1000000).length;
  const relicChaosRingCount = Object.values(data.characters).filter(c => 
    c.earrings === "relic-set" || c.earrings === "chaos-set"
  ).length;
  const completedRingCount = Object.values(data.characters).filter(c => 
    (c.ring === "promise-iii") || 
    (c.ring === "forged-infinity-iii")
  ).length;
  // count how many characters have at least MAX_VOID_PIECES void pieces
  const fullVoidCount = Object.values(data.characters).filter(c => 
    Object.values(c.voidPieces).filter(Boolean).length >= MAX_VOID_PIECES
  ).length;
  // count how many characters have at least MAX_SR_PIECES full SR pieces
  const fullSRCount = Object.values(data.characters).filter(c => 
    Object.values(c.fullSR).filter(Boolean).length >= MAX_SR_PIECES
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
} 