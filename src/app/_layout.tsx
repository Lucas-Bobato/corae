import { Slot } from "expo-router";
import "../styles/global.css";
import { CartProvider } from "../contexts/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Slot />
    </CartProvider>
  );
}
