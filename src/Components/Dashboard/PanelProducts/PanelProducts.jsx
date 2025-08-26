import { Button, Table } from "react-bootstrap";

const PanelProducts = ({ products }) => {
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
              <img
                src={item.imagen}
                alt={item.nombre}
                style={{ width: "150px", height: "auto" }}
              />
            </td>
            <td>{item.nombre}</td>
            <td>{item.descripcion}</td>
            <td>{item.precio}</td>
            <td>
              <Button variant="warning" className="w-auto m-2">
                Editar
              </Button>
              <Button variant="danger" className="w-auto m-2">
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PanelProducts;
