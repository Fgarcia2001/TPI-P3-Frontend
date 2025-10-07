import { Row, Col, Form, Image } from "react-bootstrap";
import Products from "../Products/Products";
import Post from "../Post/Post";
import avisos from "../../../Views/Menu/MenuData";
import { useEffect, useState } from "react";
import useFetch from "../../../useFetch/useFetch";
import "./MenuBody.css";
import NoProducts from "../../../assets/i_need_coffee.png";
import LoadingProducts from "../../../assets/pagina.PNG";

const MenuBody = () => {
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
  console.log(products);
  console.log(categories);
  console.log(isLoading);

  const [valueFilter, setValueFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChangeFilter = (value) => {
    setValueFilter(value);
    setSearchValue("");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setValueFilter("");
  };

  const arrayProducts = () => {
    let filteredItems = products.filter((item) => item.disponible) || [];

    if (valueFilter !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.categoriaId === parseInt(valueFilter)
      );
    }

    if (searchValue) {
      filteredItems = filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return filteredItems;
  };

  const itemsToRender = arrayProducts();

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
              {isLoading ? (
                <option disabled>Cargando...</option>
              ) : (
                !errorCategories &&
                categories &&
                categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))
              )}
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
              onChange={handleSearch}
              value={searchValue}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        {isLoading && <h2>Cargando los productos ...</h2>}
        {errorProducts && (
          <Col className="text-center">
            <Image className="w-25 h-25" src={LoadingProducts} rounded />
            <h2>Cargando los productos ...</h2>
          </Col>
        )}
        {!isLoading && !errorProducts && itemsToRender.length > 0
          ? itemsToRender.map((item) => (
              <Products
                key={item.id}
                title={item.nombre}
                subTitle={item.descripcion}
                imageUrl={item.imagen}
                price={item.precio}
                itemCart={item}
              />
            ))
          : !isLoading &&
            !errorProducts && (
              <Col className="text-center">
                <Image className="w-25 h-25" src={NoProducts} rounded />
                <h2>No hay productos cargados...</h2>
              </Col>
            )}
      </Row>
    </>
  );
};

export default MenuBody;
