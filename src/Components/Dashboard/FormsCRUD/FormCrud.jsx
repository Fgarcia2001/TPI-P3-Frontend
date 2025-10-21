// FormCrud.jsx
import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { initFormData } from "./FormData";
import useFetch from "../../../useFetch/useFetch";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import {
  errorToast,
  successToast,
} from "./../../shared/notifications/notification.js";

const FormCrud = ({ onAddProduct, onAddCategories, categories }) => {
  const [dataProduct, setDataProduct] = useState(initFormData);
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const { token } = useContext(AuthUserContext);
  const { post, isLoading } = useFetch();

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
  };

  const controlErrors = () => {
    if (
      !dataProduct.nombre ||
      !dataProduct.precio ||
      !dataProduct.descripcion ||
      !dataProduct.imagen
    ) {
      errorToast("Llene todos los campos requeridos.");
      return true;
    }

    if (dataProduct.categoria === "otra" && !nuevaCategoria.trim()) {
      errorToast("Debe ingresar el nombre de la nueva categoría.");
      return true;
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (controlErrors()) {
      return;
    }

    const payload = {
      ...dataProduct,
      categoria:
        dataProduct.categoria === "otra"
          ? nuevaCategoria
          : dataProduct.categoria,
    };

    post(
      "/products",
      true,
      payload,
      (data) => {
        successToast(`El producto ${data.nombre} fue agregado con éxito.`);
        console.log("Respuesta backend:", data);
        onAddProduct(data);

        if (dataProduct.categoria === "otra") {
          onAddCategories({ nombre: nuevaCategoria });
        }

        setDataProduct(initFormData);
        setNuevaCategoria("");
      },
      (err) => {
        console.error("Error al enviar:", err);
        errorToast(err.message || "Hubo un error al crear el producto.");
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit} className="container my-5 w-50">
      <fieldset>
        <div className="card shadow-lg rounded-4 p-5 bg-white border-0">
          <h4 className="mb-4 text-center text-primary fw-semibold">
            Formulario nuevo producto
          </h4>

          {/* Nombre */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              Producto <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre..."
              className="rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.nombre}
            />
          </Form.Group>

          {/* Categoría */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              Categoría <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="categoria"
              className="rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.categoria}
            >
              <option value="">Seleccione una categoría</option>
              {categories && categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))
              ) : (
                <option disabled>No hay categorías disponibles</option>
              )}
              <option value="otra">Nueva categoría</option>
            </Form.Select>
          </Form.Group>

          {/* Nueva categoría */}
          {dataProduct.categoria === "otra" && (
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                Nueva categoría <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la categoría..."
                className="rounded-3 shadow-sm"
                onChange={(e) => setNuevaCategoria(e.target.value)}
                value={nuevaCategoria}
              />
            </Form.Group>
          )}

          {/* Descripción */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              Descripción <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              placeholder="Ingrese la descripción..."
              className="rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.descripcion}
            />
          </Form.Group>

          {/* Imagen */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              URL de imagen <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="url"
              name="imagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.imagen}
            />
          </Form.Group>

          {/* Precio */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              Precio <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              name="precio"
              placeholder="Ingrese el precio..."
              className="rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.precio}
            />
          </Form.Group>

          {/* Disponible */}
          <Form.Check
            type="switch"
            name="disponible"
            className="form-check form-switch my-4 fs-5"
            label="¿Producto disponible?"
            checked={dataProduct.disponible}
            onChange={handleInputChange}
          />

          <div className="d-grid">
            <Button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Enviando...
                </>
              ) : (
                "Crear Producto"
              )}
            </Button>
          </div>
        </div>
      </fieldset>
    </Form>
  );
};

export default FormCrud;
