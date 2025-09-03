import { useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { initFormData } from "../../FormsCRUD/FormData";

const PanelProducts = ({ products }) => {
  const [dataProduct, setDataProduct] = useState(initFormData);
  const [isEditable, setIsEditable] = useState(false);

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

  const handleEditProd = (item) => {
    fetch(`http://localhost:3001/products/${item.id}`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  const HandleDeleteProd = (item) => {
    fetch(`http://localhost:3001/products/${item.id}`, {
      headers: { "content-type": "application/json" },
      method: "DELETE",
    });
  };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((item) => (
          <tr key={item.id}>
            <td>
              {isEditable ? (
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: "150px", height: "auto" }}
                />
              ) : (
                <Form.Control
                  type="text"
                  name="imagen"
                  value={isEditable ? dataProduct.imagen : item.imagen}
                  onChange={handleInputChange}
                />
              )}
            </td>
            <td>
              {isEditable ? (
                item.nombre
              ) : (
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingrese el nombre..."
                  className="form-control rounded-3 shadow-sm"
                  value={item.nombre}
                  onChange={handleInputChange}
                />
              )}
            </td>
            <td>
              {isEditable ? (
                item.descripcion
              ) : (
                <Form.Control
                  type="text"
                  name="descripcion"
                  placeholder="Ingrese el descripcion..."
                  className="form-control rounded-3 shadow-sm"
                  value={item.descripcion}
                  onChange={handleInputChange}
                />
              )}
            </td>
            <td>
              {" "}
              {isEditable ? (
                item.precio
              ) : (
                <Form.Control
                  type="text"
                  name="precio"
                  placeholder="Ingrese el precio..."
                  className="form-control rounded-3 shadow-sm"
                  value={item.precio}
                  onChange={handleInputChange}
                />
              )}
            </td>
            {isEditable ? (
              <td>
                <Button
                  onClick={() => setIsEditable(!isEditable)}
                  variant="warning"
                  className="w-auto m-2"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => HandleDeleteProd(item)}
                  variant="danger"
                  className="w-auto m-2"
                >
                  Eliminar
                </Button>
              </td>
            ) : (
              <td className="">
                <Button
                  onClick={() => handleEditProd(item)}
                  variant="warning"
                  className="w-auto m-2"
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => setIsEditable(!isEditable)}
                  variant="danger"
                  className="w-auto m-2"
                >
                  Descartar
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PanelProducts;
