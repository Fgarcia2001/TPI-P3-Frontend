import { Col, Row } from "react-bootstrap";
import NavBar from "../../Components/Dashboard/NavBar/NavBar";
import "./Admin.css";
import AbmProducts from "../../Components/Dashboard/AbmProducts/AbmProducts";
import ViewUser from "../../Components/Dashboard/ViewUsers/ViewUser";
import ViewOrders from "../../Components/Dashboard/ViewOrders/ViewOrders";
import { useState } from "react";


const Admin = () => {
  const [viewOption, setViewOption] = useState("Inicio");
  const handleViewOption = (value) => {
    setViewOption(value);
  };
  return (
    <>
      <Row className="g-0">
        <Col
          sm={2}
          className="bg-warning m-0 d-flex flex-column justify-content-between sticky-top vh-100"
        >
          <NavBar handleViewOption={handleViewOption} />
        </Col>
        <Col sm={10} className="fs-3 fw-bold m-0 p-0 vh-100 overflow-auto">
          <Row className="sticky-top">
            <div className="d-flex flex-nowrap w-100 justify-content-center bg-transparent border-bottom">
              <div className="p-1 m-3">Panel de Administrador</div>
            </div>
          </Row>
          {viewOption === "Inicio" && <h1>Bienvenido a tu tienda.</h1>}
          {viewOption === "Productos" && <AbmProducts />}
          {viewOption === "Usuarios" && <ViewUser />}
          {viewOption === "Ordenes" && <ViewOrders />}
        </Col>
      </Row>
    </>
  );
};

export default Admin;
