import { Row, Col } from "react-bootstrap";
import User from "../../assets/HeaderMenu/User.png";
import Tray from "../../assets/HeaderMenu/Tray.png";
import "./HeaderMenu.css";
const HeaderMenu = () => {
  return (
    <>
      <Row className="d-flex header-menu align-items-end m-bottom ">
        <Col>
          <img src={User} alt="Logo" className="icon" />
        </Col>
        <Col className="titleIcon fs-1 ">Menú</Col>
        <Col>
          <img src={Tray} alt="" className="llamado" />
        </Col>
      </Row>
    </>
  );
};

export default HeaderMenu;
