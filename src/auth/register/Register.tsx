import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import AuthService from "../service/AuthService";
import './Register.css'
import { Navbar } from "../../components/navbar/Navbar";


export const Register = () => {
  const getValidationSchema = () => {
    return Yup.object({
      username: Yup.string()
        .max(8, "EL usuario no debe de ser mas de 6 caracteres")
        .required("Requerido"),
      
      email: Yup.string()
        .max(20, "EL email no debe tener mas de 20 caracteres")
        .required("Requerido"),
      university: Yup.string()
        .max(15, "EL apellido no debe tener mas de 15 caracteres")
        .required("Requerido"),
      password: Yup.string()
        .min(8, "La contraseña debe tener mas de 8 caracteres")
        .matches(/[a-z]/, "Debe tener al menos una letra minúscula")
        .matches(/[A-Z]/, "Debe tener al menos una letra mayúscula")
        .matches(/\d/, "Debe tener al menos un número")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Debe tener al menos un carácter especial"
        )
        .required("Campo obligatorio"),
      passwordVerification: Yup.string()
        .oneOf([Yup.ref("password"), ""], "la contraseña no coincide")
        .required("Campo obligatorio"),
    });
  };
  const handleSubmit = async (values) => {
    try {
      const response = await AuthService.register(
        values.username,
        values.password,
        values.role,
        values.email,
        values.university,
        values.brithdate,
        values.gender,
      );
      if (response.id === 201) {
        console.log("Usuario registrado con exito");
        window.alert("Se creo el usuario");
      } else {
        console.error("Error al registrar el usuario:", response.data.error);
      }
    } catch (error) {
      console.error("error al intentar registrar el usuario", error);
      window.alert("error al intentar crear el usuario");
    }
  };
  return (
    <Formik
      initialValues={{
        username: "",
        role: "",
        email: "",
        university: "",
        birthdate: "",
        gender: "",
        password: "",
        passwordVerification: "",
      }}
      validationSchema={getValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="content-main">
          <Navbar />
          <div className="main">
            <div className="form-register">
              <p className="lg:text-3xl lg:font-bold text-balance lg:text-balance font-medium text-cyan-400 text-center md:text-start">
                Crea una cuenta
              </p>
              <br />
              <div className="form">
                <Form className="content-form">
                  <Field
                    name="username"
                    type="text"
                    placeholder="username"
                    className="field"
                  />
                  <ErrorMessage name="username" />
                  
                  <label htmlFor="">
                    <Field type="radio" name="role" value="estudiante" />
                    Estudiante <br />
                  </label>

                  <Field
                    name="email"
                    type="text"
                    placeholder="email"
                    className="field"
                  />
                  <ErrorMessage name="email" />
                  <Field
                    name="university"
                    type="text"
                    placeholder="university"
                    className="field"
                  />
                  <ErrorMessage name="university" />

                  <Field
                    name="bithdate"
                    type="date"
                    placeholder="bithdate"
                    className="field"
                  />
                  <ErrorMessage name="birthdate" />

                  <label htmlFor="">
                    <Field type="radio" name="bender" value="femenino" />
                    Femenino <br />
                    <Field type="radio" name="gender" value="masculino" />
                    Masculino
                  </label>

                  <Field
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    className="field"
                  />
                  <ErrorMessage name="password" />
                  <Field
                    name="passwordVerification"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="field"
                  />
                  <ErrorMessage name="passwordVerification" />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="boton"
                  >
                    Registrar
                  </button>
                </Form>

                <p className="text-xl">Ya tienes una cuenta ?</p>
                <Link to="/login" className="text-cyan-400">
                  Iniciar sesion aqui
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
