
import {
  errorToast,
  successToast,
} from "../../Components/shared/notifications/notification";

// Avisos harcodeados
const avisos = [
  {
    link: "/post/1",
    imageUrl:
      "https://img.freepik.com/foto-gratis/inoxidable-doble-barra-oro-marron_1172-321.jpg",
    altText: "Post 1",
    title: "Post 1",
    subTitle: "Subtitle 1",
  },
  {
    link: "/post/2",
    imageUrl:
      "https://img.freepik.com/foto-gratis/taza-cafe-corazon-dibujado-espuma_1286-70.jpg",
    altText: "Post 2",
    title: "Post 2",
    subTitle: "Subtitle 2",
  },
  {
    link: "/post/3",
    imageUrl: "https://cdn.wallpapersafari.com/81/65/8pLkTP.jpg",
    altText: "Post 3",
    title: "Post 3",
    subTitle: "Subtitle 3",
  },
];
export default avisos;

export const GetLocalStorage = () => {
  const dataLocalStorage = localStorage.getItem("carrito");
  const objeto = dataLocalStorage ? JSON.parse(dataLocalStorage) : [];
  return objeto;
};

export const postLocalStorage = (item) => {
  const carritoActual = GetLocalStorage();
  const itemExiste = carritoActual.some((product) => product.id === item.id);
  if (!itemExiste) {
    item["cantidad"] = 1;
    const carritoActualizado = [...carritoActual, item];
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    console.log("Producto añadido al carrito:", item);
    successToast(`${item.nombre} añadido al carrito:`);
  } else {
    const newItem = item;
    newItem.cantidad += 1;
    const carritoItemEliminado = carritoActual.filter(
      (product) => product.id !== item.id
    );
    const carritoActualizado = [...carritoItemEliminado, newItem];
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    console.log("El producto ya está en el carrito.", item);
    successToast(`${item.nombre} añadido al carrito:`);
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
    console.log("Producto eliminado del carrito:", item);
    errorToast(`${item.nombre} ah sido eliminado del carrito.`);
  } else {
    console.log("El producto no está en el carrito:", item);
  }
};
