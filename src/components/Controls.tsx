import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { colors, fonts, mdSizes } from "@/constants/CustomizeConstants";
import type React from "react";
import { useCart } from "@/hooks/useCart";

export interface NeonControlsTypes {
  setColor: (color: (typeof colors)[number]) => void;
  setFont: (font: (typeof fonts)[number]) => void;
  setSize: (size: (typeof mdSizes)[number]) => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleCart: () => void;
price:number
}

export const Controls: React.FC<NeonControlsTypes> = ({
  setColor,
  setFont,
  setSize,
  setText,
  handleCart,
  price
}) => {
  
  return (
    <div className="h-[32rem] sm:h-[40rem] border shadow-lg p-2 sm:p-5 rounded-2xl py-3 sm:py-6 flex flex-col">
      <h1 className="font-semibold text-xl sm:text-3xl tracking-tight mb-2 sm:mb-3 px-1">
        Customize Neon Sign
      </h1>
      <div className="px-1 sm:px-4 flex flex-col gap-2 sm:gap-4 flex-1 overflow-hidden">
        <p className="text-green-500 text-sm sm:text-lg font-semibold">{price}</p>

        {/* Text Input */}
        <div className="flex-shrink-0">
          <label htmlFor="text" className="text-sm sm:text-base block mb-1">
            Type Your Text
          </label>
          <textarea
            name="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text here..."
            className="ring-1 rounded w-full h-14 sm:h-20 p-2 text-xs sm:text-sm resize-none"
          />
        </div>

        {/* Font Selection */}
        <div className="flex-shrink-0">
          <h3 className="text-sm sm:text-base mb-1 sm:mb-2">Pick Your Font</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-1.5">
            {fonts.map((el) => (
              <Button
                key={el}
                onClick={() => setFont(el)}
                className={cn(
                  "text-xs py-1.5 sm:py-2 h-8 sm:h-9",
                  `font-${el}`
                )}
              >
                {el}
              </Button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="flex-shrink-0">
          <h3 className="text-sm sm:text-base mb-1 sm:mb-2">Pick Your Color</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {colors.map((el) => (
              <button
                onClick={() => setColor(el)}
                key={el.hexCode}
                style={{ background: el.hexCode }}
                className="border border-neutral-900 shadow-sm shadow-black size-6 sm:size-8 hover:scale-110 transition duration-200 rounded-full flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="flex-shrink-0">
          <h3 className="text-sm sm:text-base mb-1 sm:mb-2">Pick Your Size</h3>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {mdSizes.map((el) => (
              <Button
                onClick={() => setSize(el)}
                key={el.name}
                className="capitalize text-xs py-1.5 sm:py-2 px-2 sm:px-3 h-8 sm:h-9"
              >
                {el.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-2 sm:pt-3 px-1 sm:px-4 flex-shrink-0">
        <Button
          onClick={handleCart}
          className="h-9 sm:h-12 w-full bg-black hover:bg-gray-800 text-white text-xs sm:text-base group relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="relative">Add To Cart</span>
        </Button>
      </div>
    </div>
  );
};
