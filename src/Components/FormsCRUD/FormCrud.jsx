import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { initFormData, initErrores } from "./FormData";
import { useFetch } from "../../Views/Menu/MenuData";

const FormCrud = () => {
  const [dataProduct, setDataProduct] = useState(initFormData);
  const [inputsError, setInputsError] = useState(initErrores);
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const { data: categories } = useFetch("http://localhost:3001/categories");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "number") {
      setDataProduct({
        ...dataProduct,
        [name]: value ? parseFloat(value) : "",
      });
    } else {
      setDataProduct({
        ...dataProduct,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    setInputsError({
      ...inputsError,
      [`${name}Error`]: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!dataProduct.nombre) newErrors.nombreError = true;
    if (dataProduct.categoria === "otra" && !nuevaCategoria) {
      newErrors.categoriaError = true;
    }
    if (!dataProduct.descripcion) newErrors.descripcionError = true;
    if (dataProduct.precio <= 0) newErrors.precioError = true;

    setInputsError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        ...dataProduct,
        categoria:
          dataProduct.categoria === "otra"
            ? nuevaCategoria
            : dataProduct.categoria,
      };

      fetch("http://localhost:3001/products", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log("Respuesta backend:", data))
        .catch((err) => console.error("Error al enviar:", err));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="container my-5 w-50 ">
      <fieldset>
        <div className="card shadow-lg rounded-4 p-5 bg-white border-0">
          <h4 className="mb-4 text-center text-primary fw-semibold">
            Formulario nueva cerveza
          </h4>

          {/* Nombre */}
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

          {/* Categoría */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Categorías</Form.Label>
            <Form.Select
              name="categoria"
              className="form-control rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.categoria}
              isInvalid={inputsError.categoriaError}
            >
              <option value="">Seleccione una categoría</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
              <option value="otra">Otra categoría</option>
            </Form.Select>
            {inputsError.categoriaError && (
              <Form.Control.Feedback type="invalid">
                Seleccione una categoría.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* Nueva categoría */}
          <Form.Group
            className={
              dataProduct.categoria === "otra" ? "mb-4 d-block" : "d-none"
            }
          >
            <Form.Label className="mt-4 fw-bold ">
              Ingrese la categoría :
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la categoría/tipo..."
              className="form-control rounded-3 shadow-sm mt-2"
              onChange={(e) => setNuevaCategoria(e.target.value)}
              value={nuevaCategoria}
            />
          </Form.Group>

          {/* Descripción */}
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

          {/* Imagen */}
          <Form.Group controlId="" className="mb-3">
            <Form.Label>Url imagen:</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              placeholder="Ingrese la URL de la imagen..."
              onChange={handleInputChange}
              value={dataProduct.imagen}
            />
          </Form.Group>

          {/* Precio */}
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

          {/* Disponible */}
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
