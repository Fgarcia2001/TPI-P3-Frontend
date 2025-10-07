import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({ onDelete, item }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    onDelete();
    setShow(false);
  };

  console.log(item);
  return (
    <>
      <Button variant="danger" className="mb-1" onClick={handleShow}>
        Eliminar
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fs-5">
          Usted esta seguro de elminiar a:
        </Modal.Body>

        <Modal.Body className="fs-3  fw-bold">
          <span className="fw-bold fs-1">{item.nombre}</span>
        </Modal.Body>
        <Modal.Body className="fs-3 text-danger fw-bold">
          ¡Esta accion no se puede deshacer!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
