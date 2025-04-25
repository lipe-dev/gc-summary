import { CharacterSpecificData, FullAccountData } from "@/schemas/character";
import { runes } from "@/constants/runes";
import { RuneIcon } from "./RuneIcon";
import { earrings } from "@/constants/earrings";
import { EarringIcon } from "./EarringIcon";
import { rings } from "@/constants/rings";
import { RingIcon } from "./RingIcon";
import { armor } from "@/constants/armor";
import { Icon } from "@iconify/react";

const formatAttack = (attack: number): string => {
  if (attack >= 1000000) {
    return `${(attack / 1000000).toFixed(3)}kk`;
  }
  return `${Math.round(attack / 1000)}k`;
};

const getAttackColorClass = (attack: number, level: number, characters: FullAccountData["characters"]): string => {
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
  const position = orderedAttacks.indexOf(attack);

  if (position === 0) {
    return "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500";
  }

  if (position <= orderedAttacks.length / 3) {
    return "text-yellow-500";
  }

  if (position <= orderedAttacks.length / 3 * 2) {
    return "text-gray-300";
  }

  return "text-amber-600";
};

const getBorderColorClass = (attack: number, level: number, characters: FullAccountData["characters"]): string => {
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

interface CharacterCardProps {
  character: { id: string; name: string };
  data: CharacterSpecificData;
  showLevel: boolean;
  showWlFloor: boolean;
  showTotalAttack: boolean;
  showEarrings: boolean;
  showRuneSet1: boolean;
  showRuneSet2: boolean;
  showRing: boolean;
  showVoidPieces: boolean;
  showFullSR: boolean;
  characters: FullAccountData["characters"];
}

export function CharacterCard({ 
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
  characters,
  showFullSR
}: CharacterCardProps) {
  const cardItems = [
    { show: showWlFloor, value: `${data.wlFloor}F` },
  ].filter(item => item.show);

  const fullSRCount = Object.values(data.fullSR).filter(Boolean).length;
  const voidCount = Object.values(data.voidPieces).filter(Boolean).length;

  return (
    <div className="rounded-lg shadow flex flex-col items-center p-0">
      {(showLevel || showTotalAttack) && (
        <div className="bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-t-lg p-1 pb-0">
          <div className={`text-2xl font-medium ${getAttackColorClass(data.totalAttack, data.level, characters)}`}>
            {data.level < 85 ? `Lv${data.level}` : formatAttack(data.totalAttack)}
          </div>
        </div>
      )}
      <div className={`flex items-center justify-center object-cover w-24 h-24 relative border-4 ${getBorderColorClass(data.totalAttack, data.level, characters)} rounded-2xl overflow-hidden`}>
        <img
          src={`/characters/${character.id}.png`}
          alt={character.name}
          className="object-cover w-[120%] h-[120%]"
        />
      </div>
      <div className="flex items-center gap-2 mt-1">
        {showEarrings && data.earrings !== "in-progress" && (
          <EarringIcon earring={earrings[data.earrings]} size={20} />
        )}
        {showRing && data.ring !== "in-progress" && (
          <RingIcon ring={rings[data.ring]} size={20} />
        )}
        {(showRuneSet1 || showRuneSet2) && (data.runeSet1 !== "none" || data.runeSet2 !== "none") && (
          <>
            {data.runeSet1 !== "none" && showRuneSet1 && (
              <RuneIcon rune={runes[data.runeSet1]} size={20} />
            )}
            {data.runeSet2 !== "none" && showRuneSet2 && (
              <RuneIcon rune={runes[data.runeSet2]} size={20} />
            )}
          </>
        )}
        {cardItems.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className="text-white">{item.value}</span>
          </div>
        ))}
        {showFullSR && (
          <div className="flex items-center">
            <Icon icon={armor.helmet.visualIcon} className="text-yellow-400 text-xl" />
            <span className="text-yellow-400">{fullSRCount}</span>
          </div>
        )}
        {showVoidPieces && (
          <div className="flex items-center">
            <Icon icon={armor.helmet.armorIcon} className="text-purple-400 text-xl" />
            <span className="text-purple-400">{voidCount}</span>
          </div>
        )}
      </div>
    </div>
  );
} 