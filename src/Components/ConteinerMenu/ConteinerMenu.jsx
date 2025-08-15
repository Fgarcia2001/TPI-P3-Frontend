import { Row, Col } from "react-bootstrap";
import Products from "../Products/Products";
import Post from "../Post/Post";
import "./ConteinerMenu.css";
import BotonCategory from "../BotonCategory/BotonCategory";

const ContainerMenu = () => {
  /*   const [filterItem, setFilterItem] = useState("");
  const ItemsRender =
    filterItem !== ""
      ? Products.filter((item) => item.category === filterItem)
      : Products; */ // Con esto tengo el filtro de los productos por categoría

  return (
    <>
      <Row className="p-2 ">
        <Post
          carouselItems={[
            {
              link: "/post/1",
              imageUrl:
                "https://img.freepik.com/foto-gratis/inoxidable-doble-barra-oro-marron_1172-321.jpg",
              altText: "Post 1",
              title: "Post 1",
              subTitle: "Subtitle 1",
            },
            {
              link: "/post/2",
              imageUrl:
                "https://img.freepik.com/foto-gratis/taza-cafe-corazon-dibujado-espuma_1286-70.jpg",
              altText: "Post 2",
              title: "Post 2",
              subTitle: "Subtitle 2",
            },
            {
              link: "/post/3",
              imageUrl: "https://cdn.wallpapersafari.com/81/65/8pLkTP.jpg",
              altText: "Post 3",
              title: "Post 3",
              subTitle: "Subtitle 3",
            },
          ]}
        />
      </Row>
      <Row>
        <Row className="shadowmy-3">
          <Col></Col>
          <Col>
            <h1>Categorías</h1>
          </Col>
          <Col>
            <br />
          </Col>
        </Row>
        <Row className="shadow my-3 px-5">
          <BotonCategory />
          <BotonCategory />
          <BotonCategory />
        </Row>
      </Row>
      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        <Products
          title="Product 1"
          subTitle="Description 1"
          imageUrl="https://idbinvest.org/sites/default/files/styles/size936x656/public/blog_post/iStock_000043355764Small2.jpg.webp?itok=C2I_4rS3"
          price={10}
        />
        <Products
          title="Product 1"
          subTitle="Description 1"
          imageUrl="https://idbinvest.org/sites/default/files/styles/size936x656/public/blog_post/iStock_000043355764Small2.jpg.webp?itok=C2I_4rS3"
          price={10}
        />
        <Products
          title="Product 1"
          subTitle="Description 1"
          imageUrl="https://idbinvest.org/sites/default/files/styles/size936x656/public/blog_post/iStock_000043355764Small2.jpg.webp?itok=C2I_4rS3"
          price={10}
        />
        <Products
          title="Product 1"
          subTitle="Description 1"
          imageUrl="https://idbinvest.org/sites/default/files/styles/size936x656/public/blog_post/iStock_000043355764Small2.jpg.webp?itok=C2I_4rS3"
          price={10}
        />
      </Row>
    </>
  );
};

export default ContainerMenu;
