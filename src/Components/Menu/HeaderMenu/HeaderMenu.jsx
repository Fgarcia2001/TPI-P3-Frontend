import { Row, Col } from "react-bootstrap";
import User from "../../../assets/HeaderMenu/User.png";
import Tray from "../../../assets/HeaderMenu/Tray.png";
import "./HeaderMenu.css";
const HeaderMenu = () => {
  return (
    <>
      <Row className="d-flex header-menu align-items-center m-bottom border-bottom border-3 shadow ">
        <Col>
          <img src={User} alt="Logo" className="icon" />
        </Col>
        <Col xs={6} className="titleIcon text-center shadow">
          <h1 className="fs-2 fw-bold m-0 py-2 ">Menú</h1>
        </Col>
        <Col>
          <img src={Tray} alt="" className="llamado icon" />
        </Col>
      </Row>
    </>
  );
};

export default HeaderMenu;
