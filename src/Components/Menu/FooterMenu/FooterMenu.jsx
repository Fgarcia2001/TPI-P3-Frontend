import { Container, Row, Col } from "react-bootstrap";
import Cart from "../FooterMenu/Carrito/Cart";
import "./FooterMenu.css";
import { useContext, useState } from "react";
import { CartContext } from "../../../Services/Cart/CartContext";

const FooterMenu = ({ HandleFavoritesView }) => {
  const [botons, setBotons] = useState({
    home: true,
    heart: false,
    cart: false,
  });

  const [showCartModal, setShowCartModal] = useState(false);

  const { cart } = useContext(CartContext);
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
  };

  const handleBuy = (prodCart, token) => {
    const productosSimplificados = prodCart.map((item) => ({
      id: parseInt(item.id),
      cantidad: item.cantidad,
    }));

    const orderBody = JSON.stringify({
      productos: productosSimplificados,
    });

    fetch(`http://localhost:3001/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: orderBody,
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Error ${res.status} al crear la orden: ${errorText}`
          );
        }
        return res.json();
      })
      .then((newOrder) => {
        console.log("¡Orden creada con éxito!", newOrder);
      })
      .catch((error) => {
        console.error("Hubo un problema al intentar la compra:", error.message);
      });
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
            onClick={() => handleIconClick("heart")}
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
