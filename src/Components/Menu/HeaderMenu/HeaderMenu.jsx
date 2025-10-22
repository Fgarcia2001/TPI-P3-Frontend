import { useContext, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import User from "../../../assets/HeaderMenu/User.png";
import Profile from "../Profile/Profile";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import "./HeaderMenu.css";

const HeaderMenu = () => {
  const [show, setShow] = useState(false);
  // Componenete
  const handleShow = () => setShow(true);
  // Callback
  const onHide = () => setShow(false);

  const { isLogged, user } = useContext(AuthUserContext);

  const navigate = useNavigate();

  return (
    <>
      <Row className="d-flex header-menu align-items-center border-bottom border-3 shadow ">
        <Col>
          <img src={User} alt="Logo" className="icon" onClick={handleShow} />
        </Col>

        <Col xs={6} className="titleIcon text-center shadow">
          <h1 className="fs-2 fw-bold m-0 py-2 ">MENÚ</h1>
        </Col>
        <Col className="d-flex justify-content-center align-items-end">
          {isLogged ? (
            <h3 className="fw-bold fs-2">{user}</h3>
          ) : (
            <Button
              className="rounded-pill px-4 button-Profile border-"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Iniciar sesión
            </Button>
          )}
        </Col>
      </Row>
      <Profile show={show} onHide={onHide}></Profile>
    </>
  );
};

export default HeaderMenu;
