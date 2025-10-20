import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { initFormData, initErrores, singinInvited } from "./FomLogin.data";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import { jwtDecode } from "jwt-decode";
import "./FormLogin.css";
import {
  errorToast,
  successToast,
} from "../../shared/notifications/notification";
import useFetch from "../../../useFetch/useFetch";

const FormLogin = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrores);

  const navigate = useNavigate();
  const { onLogin } = useContext(AuthUserContext);

  const { post, isLoading } = useFetch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setFormData(initFormData);
    setErrors(initErrores);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...initErrores };

    if (!formData.email) {
      newErrors.email = "El correo es requerido.";
      isValid = false;
    }

    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es requerida.";
      isValid = false;
    } else if (formData.contrasena.length < 4) {
      newErrors.contrasena = "La contraseña debe tener al menos 4 caracteres.";
      isValid = false;
    }

    if (isRegisterMode) {
      if (!formData.nombre) {
        newErrors.nombre = "El nombre es requerido.";
        isValid = false;
      }
      if (!formData.apellido) {
        newErrors.apellido = "El apellido es requerido.";
        isValid = false;
      }
      if (!formData.telefono) {
        newErrors.telefono = "El teléfono es requerido.";
        isValid = false;
      } else {
        // Regex para teléfono argentino: 10 dígitos, puede empezar con 15
        const phoneRegex = /^(?:15)?[0-9]{8,10}$/;
        if (!phoneRegex.test(formData.telefono)) {
          newErrors.telefono =
            "Teléfono inválido. Debe tener entre 8 y 10 dígitos.";
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const endpoint = isRegisterMode ? "/user/signup" : "/user/login";

    post(
      endpoint,
      false,
      formData,
      (data) => {
        if (!isRegisterMode && data.token) {
          const decoded = jwtDecode(data.token);
          onLogin(data.token, data.user.nombre, decoded.rol, decoded.id);
          navigate("/");
          successToast(`${data.user.nombre} ha iniciado sesión con éxito.`);
        } else if (isRegisterMode) {
          successToast(`Usuario ${data.user.nombre} creado con éxito.`);
          toggleMode();
        }
      },
      (err) => {
        console.error("Error en la respuesta:", err);
        errorToast(err.message);
      }
    );
  };

  const handleGuestAccess = () => {
    post(
      "/user/login",
      false,
      singinInvited,
      (data) => {
        const decoded = jwtDecode(data.token);
        onLogin(data.token, data.user.nombre, decoded.rol, decoded.id);
        navigate("/");
        successToast("Accediste como invitado. Tu historial no se guardará.");
      },
      (err) => {
        console.error("Error en la respuesta:", err);
        errorToast(err.message);
      }
    );
  };

  return (
    <Form className="w-25 w-md-100" onSubmit={handleSubmit}>
      {/* Email */}
      <Form.Group className="mb-1">
        <Form.Label htmlFor="email">Correo electrónico</Form.Label>
        {errors.email && (
          <p className="text-danger m-0 small">{errors.email}</p>
        )}
        <Form.Control
          id="email"
          className="inputLogin fs-4"
          type="email"
          name="email"
          placeholder="ejemplo@correo.com"
          value={formData.email}
          onChange={handleInputChange}
          isInvalid={!!errors.email}
        />
      </Form.Group>

      {/* Contraseña */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="contrasena">Contraseña</Form.Label>
        {errors.contrasena && (
          <p className="text-danger m-0 small">{errors.contrasena}</p>
        )}
        <Form.Control
          id="contrasena"
          className="inputLogin fs-4"
          type="password"
          name="contrasena"
          placeholder="••••••••"
          value={formData.contrasena}
          onChange={handleInputChange}
          isInvalid={!!errors.contrasena}
        />
      </Form.Group>

      {/* Campos adicionales si es registro */}
      {isRegisterMode && (
        <>
          {/* Nombre */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre</Form.Label>
            {errors.nombre && (
              <p className="text-danger m-0 small">{errors.nombre}</p>
            )}
            <Form.Control
              id="nombre"
              className="inputLogin fs-4"
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              isInvalid={!!errors.nombre}
            />
          </Form.Group>

          {/* Apellido */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="apellido">Apellido</Form.Label>
            {errors.apellido && (
              <p className="text-danger m-0 small">{errors.apellido}</p>
            )}
            <Form.Control
              id="apellido"
              className="inputLogin fs-4"
              type="text"
              name="apellido"
              placeholder="Tu apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              isInvalid={!!errors.apellido}
            />
          </Form.Group>

          {/* Teléfono */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="telefono">Teléfono:*</Form.Label>
            {errors.telefono && (
              <p className="text-danger m-0 small">{errors.telefono}</p>
            )}
            <Form.Control
              id="telefono"
              className="inputLogin fs-4"
              type="tel"
              name="telefono"
              placeholder="3415551234"
              value={formData.telefono}
              onChange={handleInputChange}
              isInvalid={!!errors.telefono}
              maxLength={10}
            />
            <Form.Text className="text-muted">
              Ingresá solo números (8-10 dígitos)
            </Form.Text>
          </Form.Group>
        </>
      )}

      <div className="d-flex flex-column justify-content-center align-items-center">
        <Button
          className="btnSubmit mb-3 w-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Cargando..."
            : isRegisterMode
            ? "Registrarse"
            : "Iniciar sesión"}
        </Button>

        {!isRegisterMode && (
          <Button
            className="btnSubmit bg-secondary w-100 mb-3"
            type="button"
            onClick={handleGuestAccess}
            disabled={isLoading}
          >
            Seguir como invitado
          </Button>
        )}

        <p className="text-center">
          <span>
            {isRegisterMode
              ? "¿Ya tienes una cuenta?"
              : "¿Aún no tienes una cuenta?"}
          </span>
          <span
            className="text-warning login ms-1"
            onClick={toggleMode}
            style={{ cursor: "pointer" }}
          >
            {isRegisterMode ? "Iniciar sesión" : "Registrarse gratis"}
          </span>
        </p>
      </div>
    </Form>
  );
};

export default FormLogin;
