import { Button, Form, Row } from "react-bootstrap";
import FormCrud from "../../FormsCRUD/FormCrud";
import { useState } from "react";
import { useFetch } from "../../../Views/Menu/MenuData";
import PanelProducts from "../PanelProducts/PanelProducts";

const AbmProducts = () => {
  const [addProduct, setAddProduct] = useState(false);
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch("http://localhost:3001/products");
  return (
    <>
      <Row className="d-flex justify-content-between mx-4 mb-5">
        <Form.Control type="text" placeholder="Search" className=" w-25" />
        <Button
          className=" my-3 w-25 "
          onClick={() => setAddProduct(!addProduct)}
        >
          {addProduct ? "Regresar " : "Agregar Producto"}
        </Button>
      </Row>
      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        {addProduct ? (
          <FormCrud data={products} />
        ) : (
          <PanelProducts products={products} />
        )}
      </Row>
    </>
  );
};

export default AbmProducts;
