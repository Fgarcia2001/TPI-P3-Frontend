import FormLogin from "../../Components/FormLogin/FormLogin";
import { Image } from "react-bootstrap";
import logo from "../../assets/Yummy-Coffe-logo.png";
import "./AuthPage.css";

const AuthPage = () => {
  return (
    <>
      <div className="d-flex w-100 vh-100">
        <div className="portada"></div>
        {/* Podemos usar o "align-items-start ms-5" o  "text-center align-items-center"*/}
        <div className="form h-100 d-flex flex-column justify-content-center text-center align-items-center">
          <Image className="w-25 border-0" src={logo} thumbnail />
          <p>Inicie sesion con su cuenta de Yummy</p>
          <FormLogin></FormLogin>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
