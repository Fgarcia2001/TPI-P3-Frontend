import { useState } from "react";
import { Col, Row, Container, Form, Button, Card } from "react-bootstrap";
import Post from "../../Menu/Post/Post";
import avisos from "../../../Views/Menu/MenuData";
import DeleteModal from "../../shared/deleteModal/DeleteModal";
import { image, img } from "motion/react-client";

const ViewPost = () => {
  const [urlInput, setUrlInput] = useState("");
  const [previewAvisos, setPreviewAvisos] = useState(avisos);

  const handleAddImage = (e) => {
    e.preventDefault();

    if (!urlInput.trim()) {
      return;
    }

    const newAviso = {
      link: "/post/new",
      imageUrl: urlInput,
      altText: "Nuevo aviso",
      title: "Nuevo Post",
      subTitle: "Descripción del post",
    };

    setPreviewAvisos([...previewAvisos, newAviso]);
    setUrlInput("");
  };

  const handleRemoveLast = () => {
    if (previewAvisos.length > 0) {
      setPreviewAvisos(previewAvisos.slice(0, -1));
    }
  };

  const handleDeleteAviso = (aviso) => {
    setPreviewAvisos(
      previewAvisos.filter((a) => a.imageUrl !== aviso.imageUrl)
    );
  };

  return (
    <Container fluid className="p-4">
      <Row className="g-4">
        {/* Columna del Formulario */}
        <Col lg={4}>
          <Card className="border shadow-sm">
            <Card.Header className="bg-secondary text-white">
              <h4 className="mb-0 ">Agregar Aviso</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddImage}>
                <Form.Group className="mb-3">
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="success" type="submit">
                    <i className="bi bi-plus-lg me-2"></i>
                    Agregar al carrusel
                  </Button>
                </div>
              </Form>

              <hr className="my-4" />

              <div className="info-section">
                <h6 className="text-muted mb-2">
                  <i className="bi bi-info-circle me-2"></i>
                  Información
                </h6>
                <p className="small text-muted mb-1">
                  Total de avisos: <strong>{previewAvisos.length}</strong>
                </p>
                <p className="small text-muted mb-0">
                  Los cambios son solo vista previa
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna de Previsualización */}
        <Col lg={8} className="">
          <Card className="border shadow-sm d-flex justify-content-center">
            <Card.Header className="bg-light">
              <h4 className="mb-0">
                <i className="bi bi-eye me-2"></i>
                Previsualización
              </h4>
            </Card.Header>
            <Card.Body className="p-4 d-flex justify-content-center">
              {previewAvisos.length > 0 ? (
                <div className="w-100 d-flex flex-wrap justify-content-center gap-4">
                  {previewAvisos.map((aviso, index) => (
                    <div
                      key={index}
                      className="text-center border rounded p-3 shadow-sm bg-light"
                      style={{ width: "520px", maxHeight: "300px" }}
                    >
                      <img
                        src={aviso.imageUrl}
                        alt={aviso.title || "Aviso"}
                        className="img-fluid rounded mb-3"
                        style={{
                          maxHeight: "250px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />

                      <DeleteModal
                        onDelete={() => handleDeleteAviso(aviso)}
                        item={aviso}
                        buttonLabel="Eliminar aviso"
                        elemento="aviso"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-images fs-1 text-muted d-block mb-3"></i>
                  <p className="text-muted mb-0">
                    No hay avisos para mostrar. Agregá al menos uno para ver el
                    carrusel.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewPost;
