import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Login.css'; // for custom styling
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    return (
        <Container className="login-container">
            <Form className="login-form">
                <h2>Sign In</h2>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
