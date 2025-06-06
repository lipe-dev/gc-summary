import { Rune } from "@/constants/runes";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";

interface RuneIconProps {
  rune: Rune;
  size?: number;
  className?: string;
}

export function RuneIcon({ rune, size = 24, className = "" }: RuneIconProps) {
  const scale = rune.scale || 1;
  const translateY = -((size * (scale - 1)) / 4);

  return (
      <Icon
        icon={rune.icon}
        width={size}
        height={size}
        className={clsx("flex items-center justify-center fill-cyan-300 text-cyan-300", className)}
        style={{ 
          transform: `rotate(${rune.rotation}deg) ${rune.inverted ? "scaleX(-1)" : ""} scale(${scale}) translateY(${translateY}px)` 
        }}
      />

  );
} 