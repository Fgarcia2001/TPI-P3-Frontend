import { Container, Row, Col } from "react-bootstrap";
import Heart from "../../../assets/FooterMenu/heart.png";
import Home from "../../../assets/FooterMenu/home.png";
import Cart from "../FooterMenu/Carrito/Cart";
import "./FooterMenu.css";
import { useState } from "react";
import Order from "../../../assets/FooterMenu/clipboard.png";

const FooterMenu = ({ artInCart, HandleFavoritesView }) => {
  const [botons, setBotons] = useState({
    home: true,
    heart: false,
    Cart: false,
  });

  const [showCartModal, setShowCartModal] = useState(false);

  const handleIconClick = (iconName) => {
    setBotons({
      home: iconName === "home",
      heart: iconName === "heart",
      Cart: iconName === "Cart",
    });
    if (iconName === "home") {
      HandleFavoritesView(false);
    }
    if (iconName === "heart") {
      HandleFavoritesView(true);
    }
    if (iconName === "Cart") {
      setShowCartModal(true);
    }
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
    setBotons({ home: true, heart: false, Cart: false });
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
        // 1. Verificar si la respuesta fue exitosa (código 200-299)
        if (!res.ok) {
          // 2. Si no es exitosa, intentamos leer el cuerpo.
          // Usamos .text() en lugar de .json() para manejar respuestas no-JSON como "Validation error"
          const errorText = await res.text();

          // 3. Lanzamos un error que incluye el mensaje real del servidor
          // Esto se capturará en el bloque .catch()
          throw new Error(
            `Error ${res.status} al crear la orden: ${errorText}`
          );
        }

        // 4. Si es exitosa, procesamos la respuesta como JSON
        return res.json();
      })
      .then((newOrder) => {
        console.log("¡Orden creada con éxito!", newOrder);
        // Lógica de éxito...
      })
      .catch((error) => {
        // 5. Capturamos y mostramos el error (incluyendo el mensaje de validación)
        console.error("Hubo un problema al intentar la compra:", error.message);
        // Puedes usar aquí un errorToast(error.message);
      });
    console.log(orderBody);
    console.log(prodCart);
  };
  return (
    <Container
      fluid
      className="fondoDiv d-flex justify-content-center align-items-center fixed-bottom"
    >
      <Row className="footerPP text-center py-3 w-75 rounded-4">
        <Col>
          <img
            src={Home}
            alt="Home"
            onClick={() => handleIconClick("home")}
            className={botons.home ? "iconFooter active" : "iconFooter"}
          />
        </Col>
        <Col>
          <img
            src={Heart}
            alt="Favorites"
            onClick={() => handleIconClick("heart")}
            className={botons.heart ? "iconFooter active" : "iconFooter"}
          />
        </Col>
        <Col className="position-relative d-flex justify-content-center align-items-center">
          <img
            src={Order}
            alt="Order"
            className={botons.Cart ? "iconFooter active" : "iconFooter"}
            onClick={() => handleIconClick("Cart")}
          />
          {/* {artInCart > 0 && <span className="cantArt">{artInCart}</span>} */}
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
