import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  const navigate = useNavigate();
  const URL =process.env.REACT_APP_BASE_URL;
  const {
    isSubmitting,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      try {
        const res = await fetch(`${URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const reqRes = await res.json();
        console.log(reqRes)
        if (reqRes) {
          if (reqRes.success) {
            toast.success(reqRes.message);
            sessionStorage.setItem("aaijamunte", true)
            navigate('/data');
          }
          else {
            toast.error(reqRes.message);
          }
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    },
  });

  return (
    <>
      <main className="p-tb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <form className="module" id="loginForm" onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Login</h3>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? "Logging in..." : "LOGIN"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />

    </>
  );
};

export default Login;
