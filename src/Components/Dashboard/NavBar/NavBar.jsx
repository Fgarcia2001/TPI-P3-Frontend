import { Nav } from "react-bootstrap";
import "./NavBar.css";

const NavBar = () => {
  const sections = ["Inicio", "Productos", "Ordenes", "Notificaciones"];
  return (
    <Nav defaultActiveKey="/home" className="flex-column navSize h-100">
      <Nav.Link href="#" disabled className="shadow text-black fw-bold fs-5">
        Mi tienda
      </Nav.Link>
      {sections.map((nameSection, index) => (
        <Nav.Link className="" key={index} eventKey={`link-${index + 1}`}>
          {/* <img src="" alt="" /> */}
          <span>{nameSection}</span>
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default NavBar;
