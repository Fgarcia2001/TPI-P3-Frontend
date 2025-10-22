import { useContext, useEffect, useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import useFetch from "../../../useFetch/useFetch.jsx";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import {
  errorToast,
  successToast,
} from "../../shared/notifications/notification.js";
import { CartContext } from "../../../Services/Cart/CartContext.jsx";
import "./Products.css";

const Products = ({
  title,
  subTitle,
  imageUrl,
  price,
  itemCart,
  onRemoveFavorite,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { token, isLogged } = useContext(AuthUserContext);
  const { AddCart } = useContext(CartContext);
  const { post, get, del } = useFetch();

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (!token || !itemCart?.id) {
      setIsFavorite(false);
      return;
    }
    get("/favorites", true, (data) => {
      const isCurrentlyFavorite = data.some((fav) => fav.id === itemCart.id);
      setIsFavorite(isCurrentlyFavorite);
    });
  }, []);

  const handleAddFavorites = (item) => {
    if (!isLogged) {
      errorToast("Para guardar productos en favoritos debe iniciar sesion");
      return;
    }
    if (isFavorite) {
      del(
        `/favorites/${item.id}`,
        true,
        (data) => {
          successToast(
            `El producto ${data.producto.nombre} fue ELIMINADO de favoritos con éxito.`
          );
          setIsFavorite(false);
          onRemoveFavorite(item.id);
        },
        (err) => {
          errorToast("Error al eliminar el producto de favoritos.");
        }
      );
    } else {
      post(
        `/favorites/${item.id}`,
        true,
        {},
        (data) => {
          successToast(
            `El producto ${data.nombre} fue AGREGADO a favoritos con éxito.`
          );
          setIsFavorite(true);
        },
        (err) => {
          errorToast("Error al agregar el producto a favoritos.");
        }
      );
    }
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
                className={`favorite position-absolute top-0 end-0 ${
                  isFavorite ? "is-favorite" : ""
                }`}
                onClick={() => handleAddFavorites(itemCart)}
              >
                {isFavorite ? (
                  <i className="bi bi-bookmark-heart-fill fs-2 text-coffe"></i>
                ) : (
                  <i className="bi bi-bookmark-heart fs-2"></i>
                )}
              </Button>
            </div>
            <Card.Body className="text-center">
              <Card.Title className="fw-bold">{title}</Card.Title>
              <Card.Text className="text-muted fs-4">${price}</Card.Text>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="primary"
                  className="btn-buy-animated"
                  onClick={() => AddCart(itemCart)}
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
