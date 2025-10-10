import { Row, Col, Image } from "react-bootstrap";
import Products from "../Products/Products";
import Post from "../Post/Post";
import avisos from "../../../Views/Menu/MenuData";
import { useEffect, useState } from "react";
import useFetch from "../../../useFetch/useFetch";
import "./MenuBody.css";
import NoProducts from "../../../assets/i_need_coffee.png";
import LoadingProducts from "../../../assets/pagina.PNG";
import Search from "../../shared/search/Search";

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
      (error) => setErrorProducts(error)
    );
    get(
      "/categories",
      false,
      (data) => setCategories(data),
      (error) => setErrorCategories(error)
    );
  }, []);

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

      <Search
        entity="productos"
        value={searchValue}
        onChange={handleSearch}
        valueFilter={valueFilter}
        onChangeFilter={handleChangeFilter}
        categories={categories}
        isLoading={isLoading}
        errorCategories={errorCategories}
      />

      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        {isLoading && <h2>Cargando los productos ...</h2>}
        {errorProducts && (
          <Col className="text-center">
            <Image className="w-25 h-25" src={LoadingProducts} rounded />
            <h2>Error al cargar los productos ...</h2>
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
            !errorProducts &&
            itemsToRender.length == 0 && (
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
