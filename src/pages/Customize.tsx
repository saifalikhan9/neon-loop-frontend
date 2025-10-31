import { useEffect, useState } from "react";
import { NeonPreview } from "@/components/NeonPreview";
import { colors, fonts, mdSizes } from "@/constants/CustomizeConstants";
import { Controls } from "@/components/Controls";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/contexts/cartContext";

export function CustomizePage() {
  const [text, setText] = useState("");
  const [font, setFont] = useState(fonts[0]);
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(mdSizes[0]);
  const [price, setPrice] = useState<number>(0);
  const { items, addItem } = useCart();

  function handleCart() {
    const isDuplicate = items.some(
      (item) =>
        item.meta?.text === text &&
        item.meta?.color === color.name &&
        item.meta?.size === size.name &&
        item.meta?.font === font
    );

    if (isDuplicate) {
      alert("This customization is already in your cart!");
      return;
    }
    const cartItem: CartItem = {
      id: crypto.randomUUID(),
      title: "Custom",
      price,
      quantity: 1,
      meta: {
        font,
        text,
        color: color.name,
        size: size.name,
      },
    };
    addItem(cartItem);
  }

  useEffect(() => {
    switch (size.name) {
      case "small":
        setPrice(1000);
        break;
      case "medium":
        setPrice(2000);
        break;
      case "large":
        setPrice(3000);
        break;

      default:
        setPrice(0);
        break;
    }
  }, [size.name]);

  const shadows = [
    `0 0 4px ${color.name === "Yellow" ? "black" : "white"}`,
    `0 0 8px ${color.name === "Yellow" ? "black" : "white"}`,
    `0 0 10px white`,
    `0 0 15px ${color.hexCode}`,
    `0 0 20px ${color.hexCode}`,
    `0 0 40px ${color.hexCode}`,
    `0 0 80px  ${color.hexCode}`,
  ].join(", ");

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl mt-14 gap-4 grid grid-cols-1 md:grid-cols-2 p-5 ">
        {/* Preview */}

        <NeonPreview
          color={color}
          text={text}
          font={font}
          shadows={shadows}
          size={size.size}
        />
        {/* Controls */}
        <Controls
          price={price}
          setColor={setColor}
          setFont={setFont}
          setSize={setSize}
          setText={setText}
          handleCart={handleCart}
        />
      </div>
    </div>
  );
}
