// src/hooks/useRazorpay.ts
import { useEffect, useState } from "react";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: {
      error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
        metadata: Record<string, unknown>;
      };
    }) => void
  ) => void;
  close: () => void;
}

interface RazorpayStatic {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayStatic;
  }
}

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    // Load script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      setIsLoaded(false);
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return isLoaded;
};
