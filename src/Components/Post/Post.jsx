import { Image, Carousel } from "react-bootstrap";
import "./Post.css";

const Post = ({ title, subTitle }) => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <Image
            className="d-block w-100 carousel-img object-fit-cover"
            src="https://img.freepik.com/foto-gratis/inoxidable-doble-barra-oro-marron_1172-321.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{title}</h3>
            <p>{subTitle}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100 carousel-img object-fit-cover"
            src="https://img.freepik.com/foto-gratis/taza-cafe-corazon-dibujado-espuma_1286-70.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Cafe con leche</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100 carousel-img object-fit-cover"
            src="https://cdn.wallpapersafari.com/81/65/8pLkTP.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Croissant</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Post;
