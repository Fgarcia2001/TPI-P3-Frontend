import Card from "react-bootstrap/Card";
import OrderButton from "./OrderButton/OrderButton";

const ViewOrders = () => {
  /*  fetch(`http://localhost:3001/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      // Se recibe el objeto Response (res)
      if (!res.ok) {
        throw new Error(`Error en la solicitud: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Se reciben los datos JSON (data)
      console.log("Datos de las órdenes recibidos:", data);
    })
    .catch((error) => {
      console.error("Hubo un problema con la operación fetch:", error);
    }); */
  return (
    <>
      <OrderButton></OrderButton>
      <Card
        border="dark"
        className="border-3 rounded-4"
        style={{ width: "auto" }}
      >
        <Card.Header>Orden n° 101</Card.Header>
        <Card.Body>
          <Card.Title>Productos</Card.Title>
          <div className="d-flex">
            <Card.Text className="fs-5">Hamburguesa</Card.Text>
            <Card.Text className="fs-5">Cantidad: 3</Card.Text>
            <Card.Text className="fs-5">Precio unitario: 150</Card.Text>
          </div>
          <Card.Text>Subtotal: {3 * 150}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ViewOrders;
