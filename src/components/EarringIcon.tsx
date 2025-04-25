import { Earring } from "@/constants/earrings";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";

interface EarringIconProps {
  earring: Earring;
  size?: number;
  className?: string;
}

export function EarringIcon({ earring, size = 24, className = "" }: EarringIconProps) {
  return (
    <div className={clsx("flex items-center justify-center", className)} title={earring.label}>
      <Icon
        icon={earring.icon}
        width={size}
        height={size}
        className={clsx(earring.color)}
      />
    </div>
  );
} 