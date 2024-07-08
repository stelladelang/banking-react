import React, { useState, useContext } from 'react';
import { Card, Form, Button, Alert, Col } from 'react-bootstrap';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BankContext } from './context';

function Login() {
  const { setCurrentUser } = useContext(BankContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from the backend
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      setCurrentUser(response.data);

      // Clear form fields and error
      setEmail('');
      setPassword('');
      setError('');

      // Show success message
      toast.success('Successfully Logged in.', {
        position: 'top-center',
        autoClose: 2000,
      });
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const isDisabled = !email || !password;

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Col xs={12} sm={8} md={6} lg={4}>
        <Card className="bg-custom">
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                block
                className="mt-3"
                disabled={isDisabled}
              >
                Login
              </Button>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default Login;
