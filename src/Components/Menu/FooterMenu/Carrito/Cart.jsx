import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GetLocalStorage } from "../../../../Views/Menu/MenuData";
import "./Cart.css";

const Cart = ({
  show,
  handleClose,
  cartItems,
  onRemoveFromCart,
  onClearCart,
}) => {
  const prodCart = GetLocalStorage();
  return (
    <Modal show={show} onHide={handleClose} className="cart text-center">
      <Modal.Header className=" d-flex justify-content-center">
        <Modal.Title className="">Carrito de compras</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyCart">
        <p className="border-bottom w-100 pb-3">
          Estos son los productos que has agregado a tu carrito:
        </p>
        {/* Código para listar los productos  */}
        {prodCart.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between my-4 border rounded-5 border-5 p-3 shadow"
          >
            <img
              src={item.imagen}
              alt=""
              style={{ width: "100px" }}
              className="rounded-3"
            />
            <h5>{item.nombre}</h5>
            <p>Precio: ${item.precio}</p>
            <Button variant="danger" onClick={() => onRemoveFromCart(item)}>
              Eliminar
            </Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="warning" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={onClearCart}>
          Comprar
        </Button>
      </Modal.Footer>
      <h4>
        Precio total : $  
        {prodCart.reduce((total, item) => total + item.precio, 0)}
      </h4>
    </Modal>
  );
};

export default Cart;
