import { Button, Form } from "react-bootstrap";
import "./ProductRow.css"; // Se añade un archivo CSS para estilos personalizados
import DeleteModal from "../../../shared/deleteModal/DeleteModal";

const ProductRow = ({
  item,
  isEditing,
  dataProduct,
  onChange,
  onEdit,
  onConfirm,
  onCancel,
  onDelete,
}) => {
  return (
    <tr>
      <td>
        {isEditing ? (
          <Form.Control
            type="text"
            name="imagen"
            value={dataProduct.imagen ?? ""}
            onChange={onChange}
          />
        ) : (
          <img
            src={item.imagen}
            alt={item.nombre}
            className="img-fluid rounded fs-5" // Se añade img-fluid y rounded para mejor visualización
            style={{ maxWidth: "100px", height: "auto" }} // Se ajusta el estilo a max-width
          />
        )}
      </td>
      <td>
        {isEditing ? (
          <Form.Control
            type="text"
            name="nombre"
            value={dataProduct.nombre ?? ""}
            onChange={onChange}
          />
        ) : (
          <span className="fw-bold">{item.nombre}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <Form.Control
            as="textarea" // Se usa un textarea para la descripción
            rows={3}
            name="descripcion"
            value={dataProduct.descripcion ?? ""}
            onChange={onChange}
          />
        ) : (
          item.descripcion
        )}
      </td>
      <td>
        {isEditing ? (
          <Form.Control
            type="number"
            name="precio"
            value={dataProduct.precio ?? ""}
            onChange={onChange}
          />
        ) : (
          `$${item.precio.toFixed(2)}` // Formato de moneda
        )}
      </td>
      <td>
        {isEditing ? (
          <Form.Check
            type="switch"
            name="disponible"
            checked={dataProduct.disponible}
            onChange={onChange}
          />
        ) : (
          <>
            <h6>{item.disponible ? "Disponible" : "No disponible"}</h6>
            <Form.Check
              type="switch"
              name="disponible"
              checked={item.disponible}
              disabled
            />
          </>
        )}
      </td>
      <td>
        {isEditing ? (
          <div className="d-flex flex-column flex-sm-row">
            <Button
              onClick={onConfirm}
              variant="success"
              className="mb-1 me-sm-1"
            >
              Confirmar
            </Button>
            <Button onClick={onCancel} variant="secondary" className="mb-1">
              Cancelar
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column flex-sm-row">
            <Button onClick={onEdit} variant="warning" className="mb-1 me-sm-1">
              Editar
            </Button>
            <DeleteModal onDelete={onDelete} item={item} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
