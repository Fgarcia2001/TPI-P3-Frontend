import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { initFormData, initErrores } from "./FormData";

const FormCrud = () => {
  const [dataProduct, setDataProduct] = useState(initFormData);
  const [inputsError, setInputsError] = useState(initErrores);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Modificación aquí para manejar el tipo 'number'
    if (type === "number") {
      setDataProduct({
        ...dataProduct,
        [name]: parseFloat(value), // Parsea el string a un float
      });
    } else {
      setDataProduct({
        ...dataProduct,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // Limpiar el error cuando el usuario empieza a escribir
    setInputsError({
      ...inputsError,
      [`${name}Error`]: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    const newErrors = {};
    if (!dataProduct.nombre) {
      newErrors.nombreError = true;
    }
    /*   if (!dataProduct.categoria) {
       newErrors.categoriaError = true;
     } */
    if (!dataProduct.descripcion) {
      newErrors.descripcionError = true;
    }
    if (dataProduct.precio <= 0) {
      newErrors.precioError = true;
    }
    setInputsError(newErrors);

    // Si no hay errores, enviar el formulario
    if (Object.keys(newErrors).length === 0) {
      console.log("Datos del formulario enviados:", dataProduct);
      // Aquí puedes agregar la lógica para enviar los datos a una API

      fetch("http://localhost:3001/products", {
        headers: { "content.type": "application/json" },
        method: "POST",
        body: JSON.stringify(dataProduct),
      }).then((res) => res.json());
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="container my-5 w-50 ">
      <fieldset>
        <div className="card shadow-lg rounded-4 p-5 bg-white border-0">
          <h4 className="mb-4 text-center text-primary fw-semibold">
            Formulario nueva cerveza
          </h4>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Producto :</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre..."
              className="form-control rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.nombre}
              isInvalid={inputsError.nombreError}
            />
            {inputsError.nombreError && (
              <Form.Control.Feedback type="invalid">
                El nombre es obligatorio.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Categorías</Form.Label>
            <Form.Select
              name="categoria"
              className="form-control rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.categoria}
              isInvalid={inputsError.categoriaError}
            ></Form.Select>
            {inputsError.categoriaError && (
              <Form.Control.Feedback type="invalid">
                Seleccione una categoría.
              </Form.Control.Feedback>
            )}
            <Form.Label className="mt-4 fw-bold">
              Ingrese la categoría :
            </Form.Label>
            <Form.Control
              type="text"
              name="nuevaCategoria"
              placeholder="Ingrese la categoría/tipo..."
              className="form-control rounded-3 shadow-sm mt-2"
              onChange={handleInputChange}
              value={dataProduct.nuevaCategoria}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Descripción :</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              placeholder="Ingrese la descripción..."
              className="form-control rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.descripcion}
              isInvalid={inputsError.descripcionError}
            />
            {inputsError.descripcionError && (
              <Form.Control.Feedback type="invalid">
                La descripción es obligatoria.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Imagen del producto:</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Label className="mt-4 fw-bold">Ingrese el precio :</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            placeholder="Ingrese el precio (USD)..."
            className="form-control rounded-3 shadow-sm"
            onChange={handleInputChange}
            value={dataProduct.precio}
            isInvalid={inputsError.precioError}
          />
          {inputsError.precioError && (
            <Form.Control.Feedback type="invalid">
              El precio debe ser mayor a 0.
            </Form.Control.Feedback>
          )}

          <Form.Check
            type="switch"
            name="disponible"
            className="form-check form-switch my-4 fs-5"
            label="¿Disponible?"
            checked={dataProduct.disponible}
            onChange={handleInputChange}
          />

          <div className="d-grid">
            <Button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill"
            >
              Enviar
            </Button>
          </div>
        </div>
      </fieldset>
    </Form>
  );
};

export default FormCrud;
