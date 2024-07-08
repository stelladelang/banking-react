import React, { useState, useContext } from 'react';
import { Card, Form, Button, Alert, Col } from 'react-bootstrap';
import { BankContext } from './context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { accounts, setCurrentUser } = useContext(BankContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the account exists in the context's account data
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );
    if (account) {
      // Set the current user in the context
      setCurrentUser(account);
      // Clear the form fields
      setEmail('');
      setPassword('');
      // Clear any previous error messages
      setError('');
      toast.success('Successfully Logged in.', {
        position: 'top-center',
        autoClose: 2000,
      });
    } else {
      // If authentication fails, display error message
      setError('Invalid email or password');
    }
  };
  // Check if all fields are blank
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
