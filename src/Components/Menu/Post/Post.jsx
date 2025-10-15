/* import { Image, Carousel } from "react-bootstrap";
import "./Post.css";

const Post = ({ avisos }) => {
  return (
    <Carousel fade className="carousel-aviso ">
      {avisos.map((aviso, index) => (
        <Carousel.Item
          key={index}
          className="container-Carrousel"
        >
          <Image
            className="w-100 carousel-img "
            src={aviso.imageUrl}
            alt="First slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Post; */

/* import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from 'components/ExampleCarouselImage';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
 */

import { Carousel } from "react-bootstrap";
import "./Post.css";

const Post = ({ avisos }) => {
  return (
    <Carousel fade interval={3000} className="carousel-ml-style w-75">
      {avisos.map((aviso, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-image-wrapper">
            <img
              className="d-block w-100 carousel-image"
              src={aviso.imageUrl}
              alt={aviso.altText}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Post;
