import { Container, Row, Col } from "react-bootstrap";
import Order from "../../assets/FooterMenu/clipboard.png";
import Heart from "../../assets/FooterMenu/heart.png";
import Home from "../../assets/FooterMenu/home.png";
import "./FooterMenu.css";
const FooterMenu = () => {
  return (
    <Container
      fluid
      className="fondoDiv  d-flex justify-content-center align-items-center fixed-bottom"
    >
      <Row className="footerPP text-center py-3 w-75 rounded-4">
        <Col className="d-flex justify-content-center align-items-center">
          <img src={Home} alt="Home" className="iconFooter" />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <img src={Heart} alt="Favorites" className="iconFooter" />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <img src={Order} alt="Order" className="iconFooter" />
        </Col>
      </Row>
    </Container>
  );
};

export default FooterMenu;
