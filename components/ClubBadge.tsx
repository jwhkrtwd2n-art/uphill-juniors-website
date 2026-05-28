import Image from "next/image";

type ClubBadgeProps = {
  className?: string;
  size?: number;
};

export function ClubBadge({ className = "h-16 w-16", size = 96 }: ClubBadgeProps) {
  return (
    <Image
      src="/uphill-juniors-badge.png"
      alt="Uphill Juniors FC badge"
      width={size}
      height={size}
      className={`${className} object-contain`}
      priority
    />
  );
}
