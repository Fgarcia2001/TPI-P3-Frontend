import { useContext, useEffect, useState } from "react";
import { Button, Accordion, Spinner } from "react-bootstrap";
import useFetch from "../../../../useFetch/useFetch";
import { AuthUserContext } from "../../../../Services/AuthUserContext/AuthUserContext";
import "./OrdersUser.css";

const OrdersUser = ({ onBack }) => {
  const { idUser } = useContext(AuthUserContext);
  const { get } = useFetch();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorOrders, setErrorOrders] = useState("");

  useEffect(() => {
    get(
      `/orders/${idUser}`,
      true,
      (data) => {
        setOrders(data);
        setLoading(false);
      },
      (error) => {
        setErrorOrders(error);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-2">Cargando órdenes...</p>
      </div>
    );
  }

  if (errorOrders) {
    return (
      <div className="text-center mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {errorOrders}
        </div>
        <Button variant="secondary" onClick={onBack}>
          Regresar
        </Button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center mt-5">
        <div className="alert alert-info" role="alert">
          No tenés órdenes registradas.
        </div>
        <Button variant="secondary" onClick={onBack}>
          Regresar
        </Button>
      </div>
    );
  }

  const getSimpleStatus = (status) => status?.toLowerCase() || "";

  return (
    <div className="d-flex flex-column align-items-center w-100 h-100">
      <h2 className="mb-3 mt-2">Tus Órdenes</h2>

      <div className="w-100 overflow-auto flex-grow-1 px-3">
        <Accordion defaultActiveKey="0">
          {orders.map((order, idx) => {
            const status = getSimpleStatus(order.estado);

            const statusClass =
              status === "aceptado"
                ? "bg-success"
                : status === "pendiente"
                ? "bg-warning text-dark"
                : status === "cancelado"
                ? "bg-danger"
                : "bg-secondary";

            return (
              <Accordion.Item
                key={order.id}
                eventKey={idx.toString()}
                className="mb-2 "
              >
                <Accordion.Header>
                  <div className="d-flex justify-content-between align-items-center w-100 pe-3 ">
                    <strong>Orden #{order.id}</strong>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {order.productos && order.productos.length > 0 ? (
                    <ul className="list-unstyled mb-3">
                      {order.productos.map((producto, index) => (
                        <li
                          key={index}
                          className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2"
                        >
                          <span>
                            <strong>{producto.nombre}</strong> ×
                            {producto.cantidad}
                          </span>
                          <span className="text-secondary fw-bold">
                            $
                            {(
                              (producto.precio ?? 0) * producto.cantidad
                            ).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-muted text-center py-2">
                      Sin productos en esta orden.
                    </div>
                  )}
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      <strong>Estado:</strong>
                      <span className={`badge ${statusClass} ms-2`}>
                        {order.estado}
                      </span>
                    </span>
                    <span className="fs-5 fw-bold text-success">
                      Total: ${(order.total ?? order.price ?? 0).toFixed(2)}
                    </span>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>

      <div className="w-100 mt-3 px-3">
        <Button variant="secondary" className="w-100" onClick={onBack}>
          Regresar
        </Button>
      </div>
    </div>
  );
};

export default OrdersUser;
