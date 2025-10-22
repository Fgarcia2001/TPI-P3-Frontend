
import FormLogin from "../../Components/Auth/FormLogin/FormLogin";

import "./AuthPage.css";

const AuthPage = () => {
  return (
    <div className="d-flex w-100 h-100 overflow-hidden">
      <div className="portada h-100 "></div>
      <div className="form h-100 d-flex flex-column justify-content-center text-center align-items-center">
       
        <FormLogin></FormLogin>
      </div>
    </div>
  );
};

export default AuthPage;
