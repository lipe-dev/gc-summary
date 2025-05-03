'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FragsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const tabs = [
    { href: "/frags", label: "Fragmentos do Void" },
    { href: "/frags/ring", label: "Fragmentos do Anel do Claustro" },
    { href: "/frags/earring", label: "Fragmentos de Brincos do Outro Mundo" },
  ];

  return (
    <div>
      <nav className="bg-gray-800 border-b border-gray-800">
        <div className="px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  pathname === tab.href
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
} 