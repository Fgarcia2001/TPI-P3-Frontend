import { Col } from "react-bootstrap";
import "./Products.css";
import Card from "react-bootstrap/Card";

const Products = ({ title, subTitle, imageUrl, price }) => {
  return (
    <Col md={4} className="d-flex justify-content-center align-items-center">
      <Card
        className=" p-2 border-0 rounded-4 shadow-lg m-3"
        style={{ width: "18rem" }}
      >
        <Card.Img variant="top" src={imageUrl} className="rounded" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{subTitle}</Card.Text>
          <div className="d-flex justify-content-between">
            <h2>${price}</h2>
            <button className="btnBuy">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                />
              </svg>
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
