import sofaImg from "@/assets/sofa.webp";
import type { colors, fonts } from "@/constants/CustomizeConstants";
import { cn } from "@/lib/utils";
import type React from "react";

interface NeonPreviewTypes {
  color: (typeof colors)[number]
  shadows: string;
  font: (typeof fonts)[number]
  size: string;
  text: string;
}

export const NeonPreview: React.FC<NeonPreviewTypes> = ({
  color,
  shadows,
  font,
  size,
  text,
}) => {
  return (
    <div className="relative min-h-110 sm:h-full p-4 border rounded-2xl shadow-xl overflow-hidden after:content-[] after:absolute after:bg-neutral-900/30 after:rounded-2xl after:inset-0 after:z-2 ">
      <img src={sofaImg} alt="a sofa" className="absolute top-35 right-1 z-1" />
      <h1
        style={{
          color: color.hexCode,
          textShadow: shadows,
          fontFamily: font,
        }}
        className={cn(
          "relative text-center top-32 font-bold transition-all duration-200 tracking-wide z-5",
          size
        )}
      >
        {text || "Good Vibes Only"}
      </h1>
    </div>
  );
};
