import {
  errorToast,
  successToast,
} from "../../Components/shared/notifications/notification";

// Avisos harcodeados
const avisos = [
  {
    link: "/post/1",
    imageUrl:
      "https://http2.mlstatic.com/D_NQ_699449-MLA94657083854_102025-OO.webp",
    altText: "Post 1",
    title: "Post 1",
    subTitle: "Subtitle 1",
  },
  {
    link: "/post/2",
    imageUrl:
      "https://www.runutsco.com/wp-content/uploads/2024/09/Banner-Photoshopped-1536x400.webp",
    altText: "Post 2",
    title: "Post 2",
    subTitle: "Subtitle 2",
  },
  {
    link: "/post/3",
    imageUrl: "https://miro.medium.com/v2/1*Kb_BWNZeC7eiUH9UMYILnA.jpeg",
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
  const itemExiste = carritoActual.find((product) => product.id === item.id);

  if (!itemExiste) {
    // Producto NO existe
    const nuevoItem = { ...item, cantidad: 1 };
    const carritoActualizado = [...carritoActual, nuevoItem];
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    console.log("Producto añadido al carrito:", nuevoItem);
    successToast(`${item.nombre} añadido al carrito`);
  } else {
    // Producto existe
    const carritoActualizado = carritoActual.map((product) =>
      product.id === item.id
        ? { ...product, cantidad: (product.cantidad || 0) + 1 }
        : product
    );
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    console.log("Cantidad actualizada en el carrito:", item);
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
    console.log("Producto eliminado del carrito:", item);
    errorToast(`${item.nombre} ah sido eliminado del carrito.`);
  } else {
    console.log("El producto no está en el carrito:", item);
  }
};
