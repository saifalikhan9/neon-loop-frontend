import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "@/contexts/CartContextProvider.tsx";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./contexts/UserContext/userContextPorovider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
);
