import React, { useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'animate.css/animate.min.css';
import './Login.css'; // for custom styling
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
 

    return (
        <Container className="login-container" style={{ marginBottom: "40px" }}>
            <Form className="login-form wow animate__animated animate__fadeInUp">
                <h2 className='login-Title wow animate__animated animate__fadeInDown'>Sign In</h2>
                <p className='login-supTitle wow animate__animated animate__fadeInDown' data-wow-delay="0.2s">
                    Take control of your work <br />
                    schedule with Saas!
                </p>
                <Form.Group controlId="formBasicUsername" style={{ marginTop: "70px" }}>
                    <Form.Label className="form-label-left wow animate__animated animate__fadeInLeft" data-wow-delay="0.4s">Username</Form.Label>
                    <Form.Control className='int wow animate__animated animate__fadeInLeft' type="text" placeholder="Enter username" data-wow-delay="0.4s" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{ marginTop: "60px" }}>
                    <Form.Label className="form-label-left wow animate__animated animate__fadeInLeft" data-wow-delay="0.6s">Password</Form.Label>
                    <Form.Control className='int wow animate__animated animate__fadeInLeft' type="password" placeholder="Password" data-wow-delay="0.6s" />
                </Form.Group>
                <p className='forget wow animate__animated animate__fadeInRight' data-wow-delay="0.8s">Forget your password!</p>

                <Button variant="primary" className='Sigin wow animate__animated animate__fadeInUp' type="submit" data-wow-delay="1s">
                    Sign in
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
