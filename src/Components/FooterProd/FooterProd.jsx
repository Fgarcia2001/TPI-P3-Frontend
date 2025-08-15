import { Container, Row, Col, Button } from "react-bootstrap";
import "./Footer.css";

const FooterProd = ({ price }) => {
  return (
    <footer className="bg-white d-flex align-items-center fixed-bottom shadow-lg footer">
      <Container fluid>
        <Row>
          <Col className="text-start">
            <p className="mb-0 text-dark">Price</p>
            <span className="text-warning">{price}</span>
          </Col>
          <Col className="text-center">
            <Button className="btnBuy">COMPRAR</Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterProd;
