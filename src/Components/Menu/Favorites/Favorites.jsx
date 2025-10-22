import { useEffect, useState, useContext } from "react";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import useFetch from "../../../useFetch/useFetch";
import Products from "../Products/Products";
import Nofavorites from "../../../assets/brown-broken-heart-icon.png";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import { EditToast } from "../../shared/notifications/notification";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthUserContext);

  const { get } = useFetch();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    get(
      "/favorites",
      true,
      (data) => {
        setFavorites(data);
        setLoading(false);
        console.log("Favoritos cargados:", data);
      },
      (err) => {
        setLoading(false);
        setError(err.message);
        EditToast(`${err.message}`);
      }
    );
  }, [token]);

  const handleRemoveFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Row>
        <h1>Tus favoritos</h1>
      </Row>

      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        {loading && <Spinner />}

        {!loading &&
          favorites.length > 0 &&
          favorites.map((item) => (
            <Products
              key={item.id}
              title={item.nombre}
              subTitle={item.descripcion}
              imageUrl={item.imagen}
              price={item.precio}
              itemCart={item}
              onRemoveFavorite={() => handleRemoveFavorite(item.id)}
            />
          ))}

        {!loading && !error && favorites.length === 0 && (
          <Col className="text-center">
            <Image src={Nofavorites} rounded />
            <h2>No tenés favoritos</h2>
          </Col>
        )}

        {error && !loading && <h2>Error al cargar los productos</h2>}
      </Row>
    </>
  );
};

export default Favorites;
