import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";

const ModalNotLogged = ({ show, onHide, onContinue }) => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    onHide();
    navigate("/auth");
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title>
          <i className="bi bi-exclamation-triangle text-warning me-2"></i>
          Atención
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        <div className="text-center mb-4">
          <i className="bi bi-person-x fs-1 text-muted d-block mb-3"></i>
          <h5 className="mb-3">No estás logueado</h5>
          <p className="text-muted mb-0">
            Si continuás sin iniciar sesión,
            <strong>no se guardará el historial de tu orden</strong>
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <div className="w-100 d-flex flex-column gap-2 ">
          <Button onClick={handleGoToLogin} className="w-100 button-Profile">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Iniciar sesión
          </Button>

          <Button
            variant="outline-secondary"
            onClick={onContinue}
            className="w-100"
          >
            Continuar como invitado
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalNotLogged;
