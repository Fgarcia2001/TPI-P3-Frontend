import { Button, Col, Row } from "react-bootstrap";
import FormCrud from "../../Dashboard/FormsCRUD/FormCrud";
import { useEffect, useState } from "react";

import PanelProducts from "../PanelProducts/PanelProducts";
import useFetch from "../../../useFetch/useFetch";
import Search from "../../shared/search/Search";

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
    get("/products", false, setProducts, setErrorProducts);
    get("/categories", false, setCategories, setErrorCategories);
  }, []);

  const handleChangeFilter = (value) => {
    setValueFilter(value);
    setSearchValue("");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddProduct = (data) => {
    setProducts((prevProduct) => [data, ...prevProduct]);
  };
  const onAddCategories = (data) => {
    setCategories((prevCategories) => [data, ...prevCategories]);
  };
  const onDeleteProduct = (data) => {
    setProducts(data);
  };

  const arrayProducts = () => {
    let filteredItems = products || [];

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
      {/* 🔹 FILTROS + BOTÓN EN MISMA ALTURA */}
      <Row className="align-items-center justify-content-between p-3">
        {!addProduct && (
          <Col xs={12} lg={9}>
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
          </Col>
        )}

        <Col xs={12} lg={3} className="text-lg-end text-center mt-3 mt-lg-0">
          <Button
            size="lg"
            className="w-100 w-lg-auto"
            onClick={() => setAddProduct(!addProduct)}
          >
            {addProduct ? "Regresar" : "Agregar Producto"}
          </Button>
        </Col>
      </Row>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd m-2">
        {addProduct ? (
          <FormCrud
            data={products}
            onAddProduct={onAddProduct}
            onAddCategories={onAddCategories}
          />
        ) : (
          <PanelProducts
            products={itemsToRender}
            onDeleteProduct={onDeleteProduct}
          />
        )}
      </Row>
    </>
  );
};

export default AbmProducts;
