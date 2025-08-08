import { Row, Col } from "react-bootstrap";
import Products from "../Products/Products";
import Post from "../Post/Post";
import "./ConteinerMenu.css";
import BotonCategory from "../BotonCategory/BotonCategory";

const ContainerMenu = () => {
  return (
    <>
      <Row className="p-2">
        <Post title="Post Title" subTitle="Post Subtitle" />
      </Row>
      <Row>
        <BotonCategory />
        <BotonCategory />
        <BotonCategory />
        <BotonCategory />
        <BotonCategory />
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
