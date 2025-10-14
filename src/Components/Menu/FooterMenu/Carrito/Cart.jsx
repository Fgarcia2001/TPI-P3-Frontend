import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  GetLocalStorage,
  deleteItemStorage,
} from "../../../../Views/Menu/MenuData";
import "./Cart.css";
import { useContext, useEffect, useState } from "react";
import { AuthUserContext } from "../../../../Services/AuthUserContext/AuthUserContext";
import { CartContext } from "../../../../Services/Cart/CartContext";

const Cart = ({ show, handleClose, onHandleBuy }) => {
  const [prodCart, setProdCat] = useState([]);

  const { RemoveItemCart, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthUserContext);

  useEffect(() => {
    const prodsInCart = GetLocalStorage();
    setProdCat(prodsInCart);
  }, [show]);

  const onRemoveFromCart = (item) => {
    console.log(prodCart);
    const prodInCart = prodCart.filter((products) => products.id !== item.id);
    setProdCat(prodInCart);
    console.log(prodCart);
    deleteItemStorage(item);
    RemoveItemCart(item);
  };

  const OnHandleSubmitBuy = () => {
    onHandleBuy(prodCart, token);
    clearCart();
    localStorage.removeItem("carrito");
    setProdCat([]);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      className="cart text-center"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className=" d-flex justify-content-center ">
        <Modal.Title className="fs-2 fw-bold">CARRITO DE COMPRAS</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyCart fs-4 ">
        <p className="fs-4 border-bottom w-100 pb-3">
          Estos son los productos que has agregado a tu carrito:
        </p>
        {/* Código para listar los productos  */}
        {prodCart?.length > 0 ? (
          prodCart.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between my-4 border rounded-5 border-5 p-3 shadow bg-white"
            >
              <img
                src={item.imagen}
                alt=""
                style={{ width: "100px" }}
                className="rounded-3"
              />
              <h5>{item.nombre}</h5>
              <p>Precio: ${item.precio}</p>
              <p>Cantidad : {item.cantidad}</p>
              <Button variant="danger" onClick={() => onRemoveFromCart(item)}>
                Eliminar
              </Button>
            </div>
          ))
        ) : (
          <p className="text-muted">Tu carrito está vacío</p>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button className="w-25" variant="warning" onClick={handleClose}>
          Cerrar
        </Button>
        <Button
          className="w-25"
          variant="success"
          onClick={OnHandleSubmitBuy}
          disabled={!prodCart || prodCart.length === 0}
        >
          Comprar
        </Button>
      </Modal.Footer>
      <h4 className="fs-1">
        Precio total : $
        {prodCart?.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        )}
      </h4>
    </Modal>
  );
};

export default Cart;
