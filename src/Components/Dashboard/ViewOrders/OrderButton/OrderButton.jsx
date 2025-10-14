import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useFetch from "../../../../useFetch/useFetch";
import {
  EditToast,
  errorToast,
} from "../../../shared/notifications/notification";

const OrderButton = ({ order, refreshOrders }) => {
  const [show, setShow] = useState(false);
  const { put } = useFetch();

  const handleChangeState = async (order, newState) => {
    const dataOrder = { estado: newState };

    try {
      put(`/orders/${order.id}`, true, dataOrder);
      EditToast(`La orden #${order.id} se actualizó a "${newState}"`);

      order.estado = newState ? "acepatdo" : "cancelado";

      setShow(false);
    } catch (err) {
      console.error("Error al actualizar la orden:", err);
      errorToast(err.message);
    }
  };

  let variant = "outline-primary";
  if (order.estado === "pendiente") variant = "warning";
  else if (order.estado === "cancelado") variant = "danger";
  else if (order.estado === "aceptado") variant = "success";

  return (
    <>
      <Button
        variant={variant}
        className="w-25 m-2 p-3 text-start"
        onClick={() => setShow(true)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Orden #{order.id}</h5>
          <div className="text-end">
            <div className="fw-bold">${order.total ?? order.price ?? 0}</div>
            <div className="text-muted small">
              {order.estado ?? "Pendiente"}
            </div>
          </div>
        </div>
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        aria-labelledby="modal-orden-titulo"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-orden-titulo">Orden #{order.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {order.productos?.length ? (
            <ul className="list-unstyled">
              {order.productos.map((p, i) => (
                <li key={i} className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span>
                      {p.nombre} × {p.cantidad}
                    </span>
                    <span>${p.precio * p.cantidad}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted">Sin productos.</div>
          )}

          <hr />
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div>
              <Button
                variant="success"
                className="me-2"
                onClick={() => handleChangeState(order, true)}
                disabled={order.estado === "aceptado"}
              >
                aceptado
              </Button>
              <Button
                variant="danger"
                onClick={() => handleChangeState(order, false)}
                disabled={order.estado === "cancelado"}
              >
                Cancelado
              </Button>
            </div>
            <div className="fw-bold">
              Total: ${order.total ?? order.price ?? 0}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderButton;
