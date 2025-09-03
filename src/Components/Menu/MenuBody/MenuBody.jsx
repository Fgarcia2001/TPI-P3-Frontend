import { Row, Col, Form } from "react-bootstrap";
import Products from "../Products/Products";
import Post from "../Post/Post";
import avisos, { useFetch } from "../../../Views/Menu/MenuData";
import "./MenuBody.css";
import { useState } from "react";

const MenuBody = () => {
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch("http://localhost:3001/products");
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetch("http://localhost:3001/categories");

  const [valueFilter, setValueFilter] = useState("");

  const handleChangeFilter = (value) => {
    setValueFilter(value);
    console.log(value);
    console.log(products);
  };

  const ItemsRender =
    valueFilter !== ""
      ? products.filter((item) => item.categoriaId === parseInt(valueFilter))
      : products;

  return (
    <>
      <Row className="p-2 fondDiv">
        <Col
          lg={5}
          md={12}
          className="d-flex flex-column justify-content-center align-items-center text-center filterDiv"
        >
          <h1 className="fw-bold fs-1">OFERTAS DEL DÍA</h1>
          <p className="w-75">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            qui esse, similique odio rem nemo commodi quo cum quia consectetur
            aliquam saepe totam debitis. Earum eum minus soluta atque ipsam.
          </p>
        </Col>
        <Col lg={7} md={12} className="filterDiv">
          <Post avisos={avisos} />
        </Col>
      </Row>

      <Row className="menu-filters-container shadow p-3 mb-5 rounded d-flex justify-content-around align-items-center">
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Form.Group controlId="formCategorySelect">
            <Form.Label className="fw-bold text-primary fs-4">
              Categoría
            </Form.Label>
            <Form.Select
              className="form-select-lg fs-4"
              onChange={(e) => handleChangeFilter(e.target.value)}
              value={valueFilter}
            >
              <option value="">Todas las categorías</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Form.Group controlId="formSearchInput">
            <Form.Label className="fw-bold fs-4">Buscador</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              className="form-control-lg border-primary fs-4"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        {loadingProducts && "Cargando los producctos"}
        {errorProducts && "Error al cargar los producctos"}
        {ItemsRender?.map((item) => (
          <Products
            key={item.id}
            title={item.nombre}
            subTitle={item.descripcion}
            imageUrl={item.imagen}
            price={item.precio}
            itemCart={item}
          />
        ))}
      </Row>
    </>
  );
};

export default MenuBody;
