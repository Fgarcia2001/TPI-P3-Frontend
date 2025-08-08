import { Button, Row } from "react-bootstrap";

import "./Welcome.css";

const Welcome = () => {
  // Falta agregar Logo y logotipo con letras
  return (
    <Row className="stylesPage h-100">
      <div className="blurEffect  text-white h-100 d-flex flex-column justify-content-around ">
        <h1 className="">¡Bienvenido a YummyCoffee!</h1>
        <p>Estamos encantados de tenerte aquí.</p>
        <div className="d-flex flex-column align-items-center">
          <Button
            variant="primary"
            className=" w-lg-75 w-xxl-25 rounded-5 my-4"
          >
            Iniciar sesión
          </Button>
          <Button variant="secondary" className="w-lg-75 w-xxl-25 rounded-5">
            Ingresar como invitado
          </Button>
        </div>
      </div>
    </Row>
  );
};

export default Welcome;
