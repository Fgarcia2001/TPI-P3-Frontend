import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const OrderButon = (order) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        <div>
          <h1>Orden n° 105</h1>
        </div>
        <div>
          <h3>$1950</h3>
        </div>
        <div>
          <h3>Hora: 19:23</h3>
        </div>
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {order.numero}
            Orden n° 105
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Hamburguesa</Modal.Body>
      </Modal>
    </>
  );
};

export default OrderButon;
