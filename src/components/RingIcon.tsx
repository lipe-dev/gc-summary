import { Ring } from "@/constants/rings";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";

interface RingIconProps {
  ring: Ring;
  size?: number;
  className?: string;
}

export function RingIcon({ ring, size = 24, className = "" }: RingIconProps) {
  if (!ring) return null;

  return (
    <div className={clsx("flex items-center justify-center", className)} title={ring.label}>
      <Icon
        icon={ring.icon}
        width={size}
        height={size}
        className={clsx(ring.color)}
      />
    </div>
  );
} 