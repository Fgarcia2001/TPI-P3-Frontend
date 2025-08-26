import { Button, Col, Form, Row } from "react-bootstrap";
import NavBar from "../../Components/Dashboard/NavBar/NavBar";
import "./Admin.css";
import AbmProducts from "../../Components/Dashboard/AbmProducts/AbmProducts";

const Admin = () => {
  return (
    <>
      <Row>
        <Col sm={2} className="m-0 ">
          <NavBar />
        </Col>
        <Col sm={10} className="fs-3 fw-bold m-0 p-0">
          <Row className="encabezado w-100">Panel</Row>
          <AbmProducts />
        </Col>
      </Row>
    </>
  );
};

export default Admin;
