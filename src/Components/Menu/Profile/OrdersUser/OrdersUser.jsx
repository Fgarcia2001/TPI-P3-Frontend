import { useContext, useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import useFetch from "../../../../useFetch/useFetch";
import { AuthUserContext } from "../../../../Services/AuthUserContext/AuthUserContext";

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

  // --- Renderizado Condicional de Estados (Loading, Error, Sin Órdenes) ---

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

  // --- Renderizado Principal de Órdenes ---

  // Función auxiliar simple para normalizar el estado a minúsculas
  const getSimpleStatus = (status) => status?.toLowerCase() || "";

  return (
    <div className="d-flex flex-column align-items-center w-100 h-100">
      <h2 className="mb-3 mt-2">Tus Órdenes</h2>

      <div className="w-100 overflow-auto flex-grow-1 px-3">
        {orders.map((order) => {
          const status = getSimpleStatus(order.estado);
          // 💡 LÓGICA DE ESTILO SIMPLIFICADA CON TERNARIOS ANIDADOS:
          const statusClass =
            status === "aceptado"
              ? "bg-success" // ✅ Aceptado -> Verde
              : status === "pendiente"
              ? "bg-warning text-dark" // ⏳ Pendiente -> Amarillo
              : status === "cancelado"
              ? "bg-danger" // ❌ Cancelado -> Rojo
              : "bg-secondary"; // Por defecto

          return (
            <Card key={order.id} className="mb-3 shadow-sm">
              <Card.Header className="bg-secondary text-white">
                <strong>Orden #{order.id}</strong>
              </Card.Header>
              <Card.Body>
                {order.productos && order.productos.length > 0 ? (
                  <ul className="list-unstyled mb-3">
                    {order.productos.map((producto, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2"
                      >
                        <span>
                          <strong>{producto.nombre}</strong> ×{" "}
                          {producto.cantidad}
                        </span>
                        <span className="text-success fw-bold">
                          $
                          {((producto.precio ?? 0) * producto.cantidad).toFixed(
                            2
                          )}
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
                    <strong>Estado:</strong>{" "}
                    <span
                      // 💡 USO DE LA CLASE SIMPLE
                      className={`badge ${statusClass}`}
                    >
                      {order.estado}
                    </span>
                  </span>
                  <span className="fs-5 fw-bold text-primary">
                    Total: ${(order.total ?? order.price ?? 0).toFixed(2)}
                  </span>
                </div>
              </Card.Body>
            </Card>
          );
        })}
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
