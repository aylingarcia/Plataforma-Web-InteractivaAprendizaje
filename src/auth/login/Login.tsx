import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../service/AuthService";
import { useAuth } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import './Login.css'

export const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const getValidationSchema = () => {
    return Yup.object({
      username: Yup.string()
        .max(11, "El usuario no debe tener más de 11 caracteres")
        .required("Requerido"),
      password: Yup.string().max(
        20,
        "La contraseña no debe tener más de 20 caracteres"
      ),
    });
  };

  const handleSubmit = (values, formikBag) => {
    formikBag.setSubmitting(true);

    AuthService.login(values.username, values.password)
      .then((data) => {
        setToken(data.token);
        const role = data.token ? getRoleFromToken(data.token) : null;
        if (role === "administrador") {
          navigate("/admin");
        } else if (role === "estudiante") {
          navigate("/student");
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);

        let errorMessage =
          "Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.";

        if (error.response && error.response.status === 401) {
          errorMessage =
            "Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.";
        } else if (error.response && error.response.status === 500) {
          errorMessage =
            "Ocurrió un error interno en el servidor. Por favor, intenta de nuevo más tarde.";
        }

        alert(errorMessage);
      })
      .finally(() => {
        formikBag.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={getValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="login-main">
          <Navbar />
          <div className="login-main-one">
            <Form className="login-main-two">
              <p className="lg:text-3xl lg:font-bold text-balance lg:text-balance font-medium text-cyan-400 text-center md:text-start">
                Login
              </p>
              <label htmlFor="username">Usuario</label>
              <Field name="username" type="text" className="field text-grap" />
              <ErrorMessage name="username" />
              <label htmlFor="password">Contraseña</label>
              <Field
                name="password"
                type="password"
                className="field text-wrap"
              />
              <ErrorMessage name="password" className="" />
              <div>
                <button
                  className="customButton"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Iniciar sesión
                </button>
              </div>
              <div>
                No tienes cuenta?{" "}
                <Link to="/register" className=" text-cyan-400 ">
                  Registrate aqui
                </Link>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

const getRoleFromToken = (token) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.role;
};
