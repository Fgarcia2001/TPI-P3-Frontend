import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useFetch from "../../../useFetch/useFetch";
import Cart from "../FooterMenu/Carrito/Cart";
import {
  successToast,
  errorToast,
} from "../../shared/notifications/notification";
import { CartContext } from "../../../Services/Cart/CartContext";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import "./FooterMenu.css";

const FooterMenu = ({ HandleFavoritesView }) => {
  const [botons, setBotons] = useState({
    home: true,
    heart: false,
    cart: false,
  });

  const [showCartModal, setShowCartModal] = useState(false);

  const { isLogged } = useContext(AuthUserContext);
  const { cart, clearCart } = useContext(CartContext);
  const { post } = useFetch();

  const handleIconClick = (iconName) => {
    setBotons({
      home: iconName === "home",
      heart: iconName === "heart",
      cart: iconName === "cart",
    });

    if (iconName === "home") HandleFavoritesView(false);
    if (iconName === "heart") HandleFavoritesView(true);
    if (iconName === "cart") setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
    setBotons({ home: true, heart: false, cart: false });
    HandleFavoritesView(false);
  };

  const handleBuy = (prodCart) => {
    const productosSimplificados = prodCart.map((item) => ({
      id: parseInt(item.id),
      cantidad: item.cantidad,
    }));

    const orderBody = {
      productos: productosSimplificados,
    };

    post(
      "/orders",
      true,
      orderBody,
      (newOrder) => {
        successToast("¡Orden creada con éxito!");
        if (clearCart) clearCart();
        handleCloseCartModal();
      },
      (error) => {
        errorToast(error.message || "Error al crear la orden");
      }
    );
  };

  return (
    <Container
      fluid
      className="fondoDiv d-flex justify-content-center align-items-center fixed-bottom"
    >
      <Row className="footerPP text-center py-3 w-75 rounded-4">
        <Col>
          <i
            className={
              botons.home
                ? "bi bi-house-fill iconFooter active"
                : "bi bi-house iconFooter"
            }
            onClick={() => handleIconClick("home")}
          ></i>
        </Col>

        <Col>
          <i
            className={
              botons.heart
                ? "bi bi-heart-fill iconFooter active"
                : "bi bi-heart iconFooter"
            }
            onClick={() => {
              if (!isLogged) {
                errorToast("Para ver esta seccion debe iniciar sesion");
                return;
              }
              handleIconClick("heart");
            }}
          ></i>
        </Col>

        <Col className="position-relative d-flex justify-content-center align-items-center">
          <i
            className={
              botons.cart
                ? "bi bi-bag-fill iconFooter active"
                : "bi bi-bag iconFooter"
            }
            onClick={() => handleIconClick("cart")}
          >
            {cart.length > 0 && <span className="cantArt">{cart.length}</span>}
          </i>
        </Col>
      </Row>

      <Cart
        show={showCartModal}
        handleClose={handleCloseCartModal}
        onHandleBuy={handleBuy}
      />
    </Container>
  );
};

export default FooterMenu;
