import { Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { postLocalStorage } from "../../../Views/Menu/MenuData";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import { successToast } from "../../shared/notifications/notification.js";
import Heart from "../../../assets/FooterMenu/heart.png";
import "./Products.css";
import useFetch from "../../../useFetch/useFetch.jsx";

const Products = ({ title, subTitle, imageUrl, price, itemCart }) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const { idUser, token } = useContext(AuthUserContext);
  const { post, get, del } = useFetch();

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    get(
      "/favorites",
      true, // es privada
      (data) => {
        setProducts(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        console.error("Error al obtener favoritos:", err);
        setLoading(false);
      }
    );
  }, [token, get]);

  const handleAddFavorites = (item) => {
    post(
      `/favorites/${item.id}`,
      true,
      {},
      (data) => {
        successToast(
          `El producto ${data.nombre} fue agregado a favoritos con éxito.`
        );
        console.log("Respuesta backend:", data);
      },
      (err) => {
        console.error("Error al enviar:", err);
      }
    );
  };

  return (
    <Col
      md={4}
      className="d-flex justify-content-center align-items-center mb-4"
    >
      <div className="card-flip-container">
        <div className={`card-flipper ${isFlipped ? "is-flipped" : ""}`}>
          {/* Lado FRONTAL */}
          <Card className="product-card border-0 rounded-4 shadow card-front">
            <div className="image-container position-relative">
              <Card.Img variant="top" src={imageUrl} className="rounded" />
              <Button
                className="favorite position-absolute top-0 end-0"
                onClick={() => handleAddFavorites(itemCart)}
              >
                <img src={Heart} className=" w-100 h-100" />
              </Button>
            </div>
            <Card.Body className="text-center">
              <Card.Title className="fw-bold">{title}</Card.Title>
              <Card.Text className="text-muted">${price}</Card.Text>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="primary"
                  className="btn-buy-animated"
                  onClick={() => postLocalStorage(itemCart)}
                >
                  Comprar
                </Button>
                <Button
                  variant="primary"
                  className="btn-detail-animated"
                  onClick={handleToggleFlip}
                >
                  Detalle
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Detalle */}
          <Card className="product-card border-0 rounded-4 shadow card-back">
            <Card.Body className="text-center d-flex flex-column justify-content-between h-100">
              <div>
                <Card.Title className="fw-bold mt-3">{title}</Card.Title>
                <Card.Text className="text-muted">{subTitle}</Card.Text>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Button
                  variant="dark"
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
