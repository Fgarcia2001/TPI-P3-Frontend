import { useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import { errorToast } from "../../shared/notifications/notification";
import { useNavigate } from "react-router";

function Profile({ show, onHide }) {
  const { rol, user, onLogout } = useContext(AuthUserContext);
  const navigate = useNavigate();

  return (
    <>
      <Offcanvas show={show} onHide={onHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column w-100 justify-content-center text-center">
          <div className="align-items-center">
            <h1>¡Bienvenido a Yummy Coffee !</h1>
          </div>
          {/* <Offcanvas.Title className="fs-1 fw-bold">{user}</Offcanvas.Title> */}
          <Button className="rounded-pill px-4 m-4 button-Profile">
            Ordenes
          </Button>
          <Button className="rounded-pill px-4 m-4 button-Profile">
            Ajuste
          </Button>
          {(rol === "admin" || rol === "sysadmin") && (
            <Button
              onClick={() => navigate("/admin")}
              className="rounded-pill px-4 m-4 button-Profile"
            >
              Panel de administrador
            </Button>
          )}
          <Button
            className="rounded-pill px-4 m-4"
            variant="danger"
            onClick={() => {
              onLogout();
              errorToast("Sesion cerrada con exito.");
            }}
          >
            Cerrar cesion
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Profile;
