import { CharactersData } from "@/schemas/character";

interface AccountStatsProps {
  data: CharactersData;
  showChaseLevel: boolean;
  showCardCollectionLevel: boolean;
  showNickname: boolean;
}

export function AccountStats({ 
  data,
  showChaseLevel,
  showCardCollectionLevel,
  showNickname
}: AccountStatsProps) {
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
} 