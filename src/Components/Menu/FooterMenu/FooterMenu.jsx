import { Container, Row, Col } from "react-bootstrap";
import Heart from "../../../assets/FooterMenu/heart.png";
import Home from "../../../assets/FooterMenu/home.png";
import Cart from "../FooterMenu/Carrito/Cart";
import "./FooterMenu.css";
import { useState } from "react";
import Order from "../../../assets/FooterMenu/clipboard.png";

const FooterMenu = ({ artInCart }) => {
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
    if (iconName === "Cart") {
      setShowCartModal(true);
    }
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
    setBotons({ home: true, heart: false, Cart: false });
  };

  const handleRemoveItem = () =>{
    
  }
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

      <Cart show={showCartModal} handleClose={handleCloseCartModal} />
    </Container>
  );
};

export default FooterMenu;
