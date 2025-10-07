import { useContext } from "react";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import "./NavBar.css";

const NavBar = ({ handleViewOption }) => {
  const sections = [
    "Inicio",
    "Productos",
    "Ordenes",
    "Usuarios",
    "Cerrar sesion",
  ];
  const { user, onLogout } = useContext(AuthUserContext);
  return (
    <>
      <div className="mt-3 mb-5">
        <h1 className="fs-1 fw-bold">Tu tienda</h1>
      </div>
      <ul className="list-unstyled d-flex flex-column justify-content-start h-100 mt-5">
        {sections.map((section, index) => (
          <li
            className="section bg-secondary border-bottom rounded-3"
            key={index}
            onClick={() => handleViewOption(section)}
          >
            <div>{}</div>
            <div>
              <p className="titleSection">{section}</p>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h1>{user}</h1>
      </div>
    </>
  );
};

export default NavBar;
