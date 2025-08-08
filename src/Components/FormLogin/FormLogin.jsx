import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { initFormData, initErrores } from "./FomLogin.data";
import "./FormLogin.css";
const FormLogin = () => {
  // Estado para controlar si es inicio de sesión o registro
  const [login, setLogin] = useState(false);
  // Objeto con los datos ------------------------------------
  const [formData, setFormData] = useState(initFormData);
  const handleCompleteForm = (NewDataForm) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...NewDataForm }));
    setErrores(initErrores);
  };
  //----- Fin objeto de datos ---------------------------
  // Control de datos
  const [errores, setErrores] = useState(initErrores);
  // Constatar si es inicio o registro
  const HandleRegister = () => {
    setLogin(!login);
    setFormData(initFormData);
    setErrores(initErrores);
  };

  // Datos enviados
  const HandleSubmit = (e) => {
    if (!formData.usuario) {
      setErrores((prevErrores) => ({ ...prevErrores, usuario: true }));
    }
    if (!formData.contrasena) {
      setErrores((prevErrores) => ({ ...prevErrores, contrasena: true }));
    }
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Form className="w-50" onSubmit={HandleSubmit}>
      <p className={errores.usuario ? "d-block text-danger m-0" : "d-none"}>
        {errores.usuario && "El usuario es requerido."}
      </p>
      <Form.Group className="mb-3 ">
        <Form.Control
          className="inputLogin"
          type="text"
          placeholder="Usuario"
          value={formData.usuario}
          onChange={(e) => {
            handleCompleteForm({ usuario: e.target.value });
          }}
        />
      </Form.Group>
      <p className={errores.contrasena ? "d-block text-danger m-0" : "d-none"}>
        {errores.contrasena && "La contraseña es requerida."}
      </p>
      <Form.Group className="mb-3 ">
        <Form.Control
          className="inputLogin"
          type="password"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={(e) => {
            handleCompleteForm({ contrasena: e.target.value });
          }}
        />
      </Form.Group>

      {login ? (
        <>
          <Form.Group className="mb-3 ">
            <Form.Control
              className="inputLogin"
              type="email"
              placeholder="Correo"
              value={formData.correo}
              onChange={(e) => {
                handleCompleteForm({ correo: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="inputLogin"
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => {
                handleCompleteForm({ nombre: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="inputLogin"
              type="text"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={(e) => {
                handleCompleteForm({ apellido: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="inputLogin"
              type="password"
              placeholder="Repetir contraseña"
              value={formData.repetirContrasena}
              onChange={(e) => {
                handleCompleteForm({ repetirContrasena: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="inputLogin"
              type="tel"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={(e) => {
                handleCompleteForm({ telefono: e.target.value });
              }}
            />
          </Form.Group>
        </>
      ) : (
        ""
      )}
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p
          className={login ? "d-none" : "btn text-primary"}
          onClick={HandleRegister}
        >
          ¿Olvidó su contraseña?
        </p>

        <Button className="btnSubmit" type="submit">
          Iniciar sesión
        </Button>

        <p className={login ? "btn" : "btn"}>
          {login ? "" : "¿Aún no tienes una cuenta?"}
          <span className="text-warning" onClick={HandleRegister}>
            {login ? "Regresar" : "Registrese gratis"}
          </span>
        </p>
      </div>
    </Form>
  );
};

export default FormLogin;
