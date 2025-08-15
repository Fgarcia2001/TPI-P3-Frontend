import { Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Products.css"; // Asegúrate de que la ruta sea correcta

const Products = ({ title, subTitle, imageUrl, price }) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false); // Cambiamos el nombre del estado para mayor claridad

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Col md={4} className="d-flex justify-content-center align-items-center mb-4">
      {/* Contenedor principal que maneja la perspectiva y la animación de giro */}
      <div className="card-flip-container">
        <div className={`card-flipper ${isFlipped ? "is-flipped" : ""}`}>
          {/* Lado FRONTAL de la tarjeta */}
          <Card className="product-card border-0 rounded-4 shadow card-front">
            <div className="image-container position-relative">
              <Card.Img variant="top" src={imageUrl} className="rounded" />
              <div className="sizes position-absolute bottom-0 d-flex justify-content-evenly align-items-center w-100">
                <Button className="rounded-1 sizeButton">S</Button>
                <Button className="rounded-1 sizeButton">M</Button>
                <Button className="rounded-1 sizeButton">L</Button>
              </div>
            </div>
            <Card.Body className="text-center">
              <Card.Title className="fw-bold">{title}</Card.Title>
              <Card.Text className="text-muted">${price}</Card.Text>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="primary"
                  className="btn-buy-animated" // Eliminado px-4 para que los estilos CSS lo manejen
                  onClick={() => navigate("/f")}
                >
                  Comprar
                </Button>
                <Button
                  variant="primary"
                  className="btn-detail-animated" // Eliminado px-4
                  onClick={handleToggleFlip}
                >
                  Detalle
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Lado TRASERO de la tarjeta */}
          <Card className="product-card border-0 rounded-4 shadow card-back">
            <Card.Body className="text-center d-flex flex-column justify-content-between h-100">
              <div> {/* Contenedor para título y texto */}
                <Card.Title className="fw-bold mt-3">{title}</Card.Title>
                <Card.Text className="text-muted">
                  {subTitle} Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
                  ipsa laudantium est distinctio incidunt debitis sapiente sunt nam
                  accusamus atque eaque facere magni saepe voluptatum ratione
                  explicabo quasi molestias eos?
                </Card.Text>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3"> {/* Contenedor para el botón "Volver" */}
                <Button
                  variant="primary"
                  className="rounded-pill px-4"
                  onClick={handleToggleFlip}
                >
                  Volver
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Col>
  );
};

export default Products;