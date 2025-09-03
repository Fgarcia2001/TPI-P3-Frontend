import { Image, Carousel } from "react-bootstrap";
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

export default Post;

