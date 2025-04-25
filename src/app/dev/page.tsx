"use client";

import { runes } from "@/constants/runes";
import { RuneIcon } from "@/components/RuneIcon";

export default function DevPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0000] to-[#1a0000] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Development Tools</h1>
        
        {/* Rune Icons Test Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Rune Icons Test</h2>
          <div className="grid grid-cols-6 gap-4">
            {Object.values(runes).map((rune) => (
              <div key={rune.id} className="flex flex-col items-center p-4 bg-gradient-to-br from-[#1a0000] to-[#2a0000] rounded-lg">
                <RuneIcon rune={rune} size={24} className="text-yellow-500" />
                <span className="mt-2 text-sm">{rune.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Add more test sections here as needed */}
      </div>
    </div>
  );
} 