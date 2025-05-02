import { FullAccountData } from "@/schemas/character";
import { Icon } from "@iconify/react/dist/iconify.js";

interface AccountStatsProps {
  data: FullAccountData;
  showChaseLevel: boolean;
  showCardCollectionLevel: boolean;
  showNickname: boolean;
  showGuildName: boolean;
}

export function AccountStats({ 
  data,
  showChaseLevel,
  showCardCollectionLevel,
  showNickname,
  showGuildName
}: AccountStatsProps) {
  if (!showChaseLevel && !showCardCollectionLevel && !showNickname && !showGuildName) return null;

  return (
    <div className="bg-gradient-to-br from-[#2a0000] to-[#3a0000] shadow relative flex flex-row items-center gap-4 p-4 pt-0">
      {showChaseLevel && (
        <div className="w-fit flex flex-col items-center bg-gradient-to-br from-[#1a0000] to-[#2a0000] border-x-2 border-b-2 border-yellow-500 rounded-b-lg px-10 py-4 text-center">
            <Icon icon="solar:medal-ribbons-star-outline" className="text-5xl text-yellow-500 text-center" />
            <div className="text-4xl font-bold text-center text-yellow-500">{data.account.chaseLevel}</div>
        </div>
      )}
      {showCardCollectionLevel && (
        <div className="w-fit flex flex-col items-center bg-gradient-to-br from-[#1a0000] to-[#2a0000] border-x-2 border-b-2 border-yellow-500 rounded-b-lg px-10 py-4 text-center">
            <Icon icon="tabler:cards" className="text-5xl text-yellow-500" />
            <div className="text-4xl font-bold text-center text-yellow-500">{data.account.cardCollectionLevel}</div>
        </div>
      )}

      {(showNickname || showGuildName) && (
        <div className="text-center ml-8">
          {showNickname && (
            <div className="text-3xl font-medium text-gray-200">{data.account.nickname}</div>
          )}
          {showGuildName && data.account.guildName && (
            <div className="text-xl font-light text-gray-400">{data.account.guildName}</div>
          )}
        </div>
      )}
    </div>
  );
} 