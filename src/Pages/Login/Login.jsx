import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "animate.css/animate.min.css";
import "./Login.css"; // for custom styling
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [userCreds, setUserCreds] = useState({
    userName: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      // Add your login logic here
      try {
        let res = await axios.post("http://127.0.0.1:5000/api/users/login", {
          email: userCreds.userName,
          password: userCreds.password,
        });
        if (res.data.token) {
          localStorage.setItem("accessToken", res.data.token)
          const role = jwtDecode(localStorage.getItem("accessToken")).role;
          if (role === 'admin') {
            window.location.href = "/AddEmployee";
          }else {
            window.alert('Unauthorized')
          }
          
        } 
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials, please try again.");
        } else {
          alert("An error occurred, please try again later.");
        }
      }
      

    }
    setValidated(true);
  };
  useEffect(() => {
    // Add the login-body class to the body element when this component mounts
    document.body.classList.add("login-body");

    // Remove the login-body class when this component unmounts
    return () => {
      document.body.classList.remove("login-body");
    };
  }, []);

  return (
    <Container className="login-container">
      <Form
        className="login-form wow animate__animated animate__fadeInUp"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h2 className="login-Title wow animate__animated animate__fadeInDown">
          Sign In
        </h2>
        <p
          className="login-supTitle wow animate__animated animate__fadeInDown"
          data-wow-delay="0.2s"
        >
          Take control of your work <br />
          schedule with Saas!
        </p>
        <Form.Group controlId="formBasicUsername" style={{ marginTop: "70px" }}>
          <Form.Label
            className="form-label-left wow animate__animated animate__fadeInLeft"
            data-wow-delay="0.4s"
          >
            Username
          </Form.Label>
          <Form.Control
            className="int wow animate__animated animate__fadeInLeft"
            type="text"
            name="userName"
            placeholder="Enter your email"
            data-wow-delay="0.4s"
            onChange={handleChange}
            required
            style={{color:"white"}}
          />
          <Form.Control.Feedback type="invalid">
            please enter your email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" style={{ marginTop: "60px",color:"white" }}>
          <Form.Label
            className="form-label-left wow animate__animated animate__fadeInLeft"
            data-wow-delay="0.6s"
          >
            Password
          </Form.Label>
          <Form.Control
            className="int wow animate__animated animate__fadeInLeft"
            type="password"
            required
            placeholder="Password"
            data-wow-delay="0.6s"
            name="password"
            onChange={handleChange}
            style={{color:"white"}}
          />
          <Form.Control.Feedback type="invalid">
            please enter your password
          </Form.Control.Feedback>
        </Form.Group>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="primary"
            className="Sigin wow animate__animated animate__fadeInUp"
            type="submit"
            data-wow-delay="1s"
          >
            Sign in
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
