import { Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { postLocalStorage } from "../../../Views/Menu/MenuData";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import {
  errorToast,
  successToast,
} from "../../shared/notifications/notification.js";
import Heart from "../../../assets/FooterMenu/heart.png";
import "./Products.css";
import useFetch from "../../../useFetch/useFetch.jsx";

const Products = ({ title, subTitle, imageUrl, price, itemCart }) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  // Renombramos 'favorites' a 'isFavorite' para simplificar la lógica de un solo producto
  const [isFavorite, setIsFavorite] = useState(false);
  // Eliminamos 'error' ya que el manejo de errores es mejor en las funciones de fetch
  // const [error, setError] = useState([]);

  const { idUser, token } = useContext(AuthUserContext);
  const { post, get, del } = useFetch(); // Asegúrate de que useFetch devuelva 'del'

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (!token || !itemCart?.id) {
      setIsFavorite(false);
      return;
    }

    // Buscamos si ESTE producto está en favoritos
    get("/favorites", true, (data) => {
      // data debe ser un array de productos favoritos. Verificamos si itemCart.id está en el array.
      const isCurrentlyFavorite = data.some((fav) => fav.id === itemCart.id);
      setIsFavorite(isCurrentlyFavorite);
    });
  }, []); // itemCart.id es crucial para la dependencia

  const handleAddFavorites = (item) => {
    // CORRECCIÓN: No se puede usar 'favorites.includes(item)' si 'favorites' no está definido
    // y si 'favorites' fuera una lista de objetos, 'includes' no funcionaría correctamente.
    // Usamos el estado local 'isFavorite' para determinar la acción (POST o DELETE).

    if (isFavorite) {
      // Acción: ELIMINAR (DELETE)
      del(
        `/favorites/${item.id}`,
        true,
        {},
        (data) => {
          // CORRECCIÓN: Usabas `errorToast` al eliminar, debe ser `successToast` (o `errorToast` solo si es un error)
          successToast(
            `El producto ${
              item.nombre || item.title
            } fue ELIMINADO de favoritos con éxito.`
          );
          setIsFavorite(false); // Actualiza el estado local
          console.log("Respuesta backend DELETE:", data);
        },
        (err) => {
          console.error("Error al eliminar:", err);
          errorToast("Error al eliminar el producto de favoritos.");
        }
      );
    } else {
      // Acción: AGREGAR (POST)
      post(
        `/favorites/${item.id}`,
        true,
        {},
        (data) => {
          successToast(
            `El producto ${
              data.nombre || item.title
            } fue AGREGADO a favoritos con éxito.`
          );
          setIsFavorite(true); // Actualiza el estado local
          console.log("Respuesta backend POST:", data);
        },
        (err) => {
          console.error("Error al agregar:", err);
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
                // CORRECCIÓN: Se añade la clase 'is-favorite' condicional para el estilo visual
                className={`favorite position-absolute top-0 end-0 ${
                  isFavorite ? "is-favorite" : ""
                }`}
                onClick={() => handleAddFavorites(itemCart)}
              >
                <img src={Heart} className=" w-100 h-100" alt="Favorito" />
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
