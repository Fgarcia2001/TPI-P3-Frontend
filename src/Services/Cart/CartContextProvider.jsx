import { useState } from "react";
import { CartContext } from "./CartContext";
import { postLocalStorage, GetLocalStorage } from "../../Views/Menu/MenuData";

const initialCart = GetLocalStorage();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart || []);

  const AddCart = (item) => {
    postLocalStorage(item);
    const updatedCart = GetLocalStorage();
    setCart(updatedCart);
  };

  const RemoveItemCart = () => {
    localStorage.removeItem("Carrito");
    const updatedCart = GetLocalStorage();
    setCart(updatedCart);
  };

  const clearCart = () => {
    // Limpiar el localStorage
    localStorage.removeItem("Carrito");
    // Limpiar el estado del carrito
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        AddCart,
        RemoveItemCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
