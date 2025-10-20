import { Button, Col, Row } from "react-bootstrap";
import NavBar from "../../Components/Dashboard/NavBar/NavBar";
import "./Admin.css";
import AbmProducts from "../../Components/Dashboard/AbmProducts/AbmProducts";
import ViewUser from "../../Components/Dashboard/ViewUsers/ViewUser";
import ViewOrders from "../../Components/Dashboard/ViewOrders/ViewOrders";
import VievPost from "../../Components/Dashboard/ViewPost/VievPost";
import { useState } from "react";
import { useNavigate } from "react-router";

const Admin = () => {
  const [viewOption, setViewOption] = useState("Inicio");
  const handleViewOption = (value) => {
    setViewOption(value);
  };

  const navigate = useNavigate();
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
          <Row className="sticky-top bg-white border-bottom py-2">
            <div className="d-flex align-items-center justify-content-center w-100 position-relative">
              <Button
                variant="secondary"
                onClick={() => navigate("/")}
                className="position-absolute start-0 ms-4"
              >
                Volver al menú
              </Button>
              <div className="fs-3 fw-semibold">Panel de Administrador</div>
            </div>
          </Row>

          {viewOption === "Inicio" && (
            <h2 className="mt-5 fw-bold fs-1">Bienvenido a tu tienda.</h2>
          )}
          {viewOption === "Productos" && <AbmProducts />}
          {viewOption === "Usuarios" && <ViewUser />}
          {viewOption === "Ordenes" && <ViewOrders />}
          {viewOption === "Avisos" && <VievPost />}
        </Col>
      </Row>
    </>
  );
};

export default Admin;
