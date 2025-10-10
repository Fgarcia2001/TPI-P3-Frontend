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

  return (
    <CartContext
      value={{ cart, AddCart: AddCart, RemoveItemCart: RemoveItemCart }}
    >
      {children}
    </CartContext>
  );
};

export default CartContextProvider;
