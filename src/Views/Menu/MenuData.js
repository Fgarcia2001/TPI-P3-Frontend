import {
  errorToast,
  successToast,
} from "../../Components/shared/notifications/notification";

export const GetLocalStorage = () => {
  const dataLocalStorage = localStorage.getItem("carrito");
  const objeto = dataLocalStorage ? JSON.parse(dataLocalStorage) : [];
  return objeto;
};

export const postLocalStorage = (item) => {
  const carritoActual = GetLocalStorage();
  const itemExiste = carritoActual.find((product) => product.id === item.id);

  if (!itemExiste) {
    // Producto NO existe
    const nuevoItem = { ...item, cantidad: 1 };
    const carritoActualizado = [...carritoActual, nuevoItem];
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

    successToast(`${item.nombre} añadido al carrito`);
  } else {
    // Producto existe
    const carritoActualizado = carritoActual.map((product) =>
      product.id === item.id
        ? { ...product, cantidad: (product.cantidad || 0) + 1 }
        : product
    );
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

    successToast(`${item.nombre} añadido al carrito`);
  }
};

export const deleteItemStorage = (item) => {
  const carritoActual = GetLocalStorage();
  const itemExiste = carritoActual.some((product) => product.id === item.id);
  if (itemExiste) {
    const carritoActualizado = carritoActual.filter(
      (product) => product.id !== item.id
    );
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    errorToast(`${item.nombre} ah sido eliminado del carrito.`);
  } else {
    errorToast("El producto no está en el carrito:");
  }
};
export const modifiedAmount = (updateCart) => {
  if (!Array.isArray) {
    errorToast("Error en el carrito, reintente su compra");
    return;
  }
  localStorage.setItem("carrito", JSON.stringify(updateCart));
  return;
};
