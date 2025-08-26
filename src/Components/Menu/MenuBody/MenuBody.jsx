/*   const [filterItem, setFilterItem] = useState("");
const ItemsRender =
  filterItem !== ""
    ? Products.filter((item) => item.category === filterItem)
    : Products; */ // Con esto tengo el filtro de los productos por categoría
import { Row, Col, Carousel } from "react-bootstrap";
import Products from "../Products/Products";
import Post from "../Post/Post";
import BotonCategory from "../BotonCategory/BotonCategory";
import avisos, { useFetch } from "../../../Views/Menu/MenuData";
import "./MenuBody.css";
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

  const chunkArray = (array, size) => {
    if (!array) return [];
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
      chunkedArr.push(array.slice(index, index + size));
      index += size;
    }
    console.log(chunkedArr);
    return chunkedArr;
  };

  const categoryChunks = chunkArray(categories, 3);

  return (
    <>
      <Row className="p-2 ">
        <Post avisos={avisos} />
      </Row>
      <Row>
        <Row className="shadow mt-3">
          <Col>
            <h1>Categorías</h1>
          </Col>
        </Row>
        <Row className="shadow mb-3">
          {loadingCategories && "Cargando las categorias"}
          {errorCategories && "Error al cargar las categorias"}

          {/* Carrusel de Categorías */}
          <Carousel
            indicators={false}
            controls={true}
            interval={null}
            className=""
          >
            {categoryChunks.map((chunk, index) => (
              <Carousel.Item key={index} className="bg-white">
                <div className="d-flex justify-content-center">
                  {chunk.map((category) => (
                    <BotonCategory key={category.id} title={category.nombre} />
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      </Row>
      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        {loadingProducts && "Cargando los producctos"}
        {errorProducts && "Error al cargar los producctos"}
        {products?.map((item) => (
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
