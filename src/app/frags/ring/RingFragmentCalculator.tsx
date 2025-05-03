"use client";

import { characters } from "@/constants/characters";
import Image from "next/image";

export function VoidFragmentCalculator() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Object.entries(characters).map(([id, character]) => (
        <div key={id} className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#0a0000] to-[#1a0000] rounded-lg">
          <div className="w-16 h-16 relative">
            <Image
              src={character.profilePicture}
              alt={character.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <span className="text-lg font-medium">{character.name}</span>
        </div>
      ))}
    </div>  
  );
} 