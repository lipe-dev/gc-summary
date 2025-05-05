import Link from "next/link";
import { Icon } from "@iconify/react";

export function Navbar() {
  return (
    <nav className="bg-gray-700 p-4 fixed w-full z-50">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
            <Icon icon="noto:farmer" className="text-2xl" /> Grand Farmer
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              Account Summary
            </Link>
            <div className="h-4 w-px bg-gray-500"></div>
            <Link href="/frags" className="text-blue-400 hover:text-blue-300 transition-colors">
              Fragment Calculator
            </Link>
            <div className="h-4 w-px bg-gray-500"></div>
            <Link href="/checklist" className="text-blue-400 hover:text-blue-300 transition-colors">
              Checklist
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/yourusername/gc-summary" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
            <Icon icon="mdi:github" className="text-2xl" />
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </nav>
  );
} 