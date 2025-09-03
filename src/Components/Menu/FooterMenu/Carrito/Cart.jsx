import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  GetLocalStorage,
  deleteItemStorage,
} from "../../../../Views/Menu/MenuData";
import "./Cart.css";
import { useEffect, useState } from "react";

const Cart = ({ show, handleClose, onClearCart }) => {
  useEffect(() => {
    const prodsInCart = GetLocalStorage();
    setProdCat(prodsInCart);
  }, [show]);

  const [prodCart, setProdCat] = useState([]);

  const onRemoveFromCart = (item) => {
    console.log(prodCart);
    const prodInCart = prodCart.filter((products) => products.id !== item.id);
    setProdCat(prodInCart);
    console.log(prodCart);
    deleteItemStorage(item);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      className="cart text-center"
    >
      <Modal.Header className=" d-flex justify-content-center ">
        <Modal.Title className="fs-2 fw-bold">CARRITO DE COMPRAS</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyCart fs-4 ">
        <p className="fs-4 border-bottom w-100 pb-3">
          Estos son los productos que has agregado a tu carrito:
        </p>
        {/* Código para listar los productos  */}
        {prodCart?.map((item) => (
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
            <p>Cantidad : {item.cant}</p>
            <Button variant="danger" onClick={() => onRemoveFromCart(item)}>
              Eliminar
            </Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button className="w-25" variant="warning" onClick={handleClose}>
          Close
        </Button>
        <Button className="w-25" variant="success" onClick={onClearCart}>
          Comprar
        </Button>
      </Modal.Footer>
      <h4 className="fs-1">
        Precio total : $
        {prodCart?.reduce((total, item) => total + item.precio * item.cant, 0)}
      </h4>
    </Modal>
  );
};

export default Cart;
