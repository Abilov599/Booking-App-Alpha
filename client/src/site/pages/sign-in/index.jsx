import axios from "axios";
import { Field, Form, Formik } from "formik";
import { message } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserAuth } from "../../../redux/slice/userAuthSlice";
import { logInSchema } from "./../../../schema/logInSchema";
import "./index.scss";

const SignIn = () => {
  const userState = useSelector((state) => state.userAuthSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values) => {
    const obj = {
      email: values.email,
      password: values.password,
    };
    try {
      const res = await axios.post("http://localhost:8080/api/login", obj, {
        withCredentials: true,
      });
      if (res.status === 200) {
        message.success("Logged in successfully");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <main id="singin-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign In</title>
      </Helmet>
      <section className="sign-in">
        <div className="form-inner">
          <h3>Sign into your account</h3>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={logInSchema}
            onSubmit={(values) =>
              login(values).then(() =>
                dispatch(fetchUserAuth()).then(() => navigate("/rooms"))
              )
            }
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <Field name="email" type="email" placeholder="Email" />
                  {errors.email && touched.email ? (
                    <div className="error">{errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>
                <div className="checkbox-group">
                  <div className="form-check">
                    <input id="checkbox" type="checkbox" />
                    <label htmlFor="checkbox">Remember Me</label>
                  </div>
                  <a href="">Forgot Password?</a>
                </div>
                <button type="submit">Log In</button>
              </Form>
            )}
          </Formik>
          <div className="extra-login">
            <span>Or Login With</span>
          </div>
          <div className="social-list">
            <a className="facebook-bg" href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a className="twitter-bg" href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a className="google-plus-bg" href="#">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a className="linked-in-bg" href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <p>
            Don't have an account? <Link to="/sign-up">Register here</Link>
          </p>
        </div>
      </section>
      <section className="decor-side">
        <div className="info">
          <h1>
            Welcome to <span>Hotel Alpha</span>
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type unknown printer took a galley of
            type and scrambled
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
