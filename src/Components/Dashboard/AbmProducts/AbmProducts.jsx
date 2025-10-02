import { Button, Col, Form, Row } from "react-bootstrap";
import FormCrud from "../../Dashboard/FormsCRUD/FormCrud";
import { useEffect, useState } from "react";

import PanelProducts from "../PanelProducts/PanelProducts";
import useFetch from "../../../useFetch/useFetch";

const AbmProducts = () => {
  const [addProduct, setAddProduct] = useState(false);

  const [valueFilter, setValueFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [products, setProducts] = useState([]);
  const [errorProducts, setErrorProducts] = useState("");

  const [categories, setCategories] = useState([]);
  const [errorCategories, setErrorCategories] = useState("");

  const { get, isLoading } = useFetch();

  useEffect(() => {
    get(
      "/products",
      false,
      (data) => setProducts(data),
      (error) => setError(error)
    );
    get(
      "/categories",
      false,
      (data) => setCategories(data),
      (error) => setErrorCategories(error)
    );
  }, []);

  const handleChangeFilter = (value) => {
    setValueFilter(value);
    setSearchValue("");
  };

  return (
    <>
      <Row
        className={`d-flex align-items-end p-3 ${
          !addProduct ? "justify-content-between" : "justify-content-end"
        }`}
      >
        {!addProduct && (
          <Col xs={12} sm={4} lg={3}>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
        )}
        {!addProduct && (
          <Col xs={12} sm={4} lg={3}>
            <Form.Select
              className="form-select-lg"
              onChange={(e) => handleChangeFilter(e.target.value)}
              value={valueFilter}
            >
              <option value="">Todas las categorías</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
            </Form.Select>
          </Col>
        )}

        <Col
          xs={12}
          sm={!addProduct ? 4 : 12}
          lg={!addProduct ? 3 : 12}
          className="w-25 h-100"
        >
          <Button className="w-100" onClick={() => setAddProduct(!addProduct)}>
            {addProduct ? "Regresar" : "Agregar Producto"}
          </Button>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd m-2">
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
