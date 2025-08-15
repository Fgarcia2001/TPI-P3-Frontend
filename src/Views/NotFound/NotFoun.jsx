import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>¡Ups! Página no encontrada</h1>
      <p>La página que estás buscando no existe.</p>
      <Button variant="secondary" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </div>
  );
};

export default NotFound;
