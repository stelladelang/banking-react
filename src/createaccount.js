import React, { useState } from 'react';
import { Card, Button, Col, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setAlertMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await axios.post('http://localhost:5000/api/accounts', {
        name,
        email,
        password,
      });
      setAlertMessage('');
      setShow(false);
      toast.success('Successfully Created Account', {
        position: 'top-center',
        autoClose: 2000,
      });
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  };

  const isDisabled = !name || !email || !password;

  return (
    <div className="container mt-5">
      <h2>Create Account</h2>
      <Col xs={12} sm={8} md={6} lg={4}>
        <Card className="bg-custom">
          <Card.Body>
            {show ? (
              <form onSubmit={handleCreate}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {alertMessage && (
                  <Alert variant="danger" className="mt-3">
                    {alertMessage}
                  </Alert>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-3"
                  disabled={isDisabled}
                >
                  Create Account
                </Button>
              </form>
            ) : (
              <div>
                <h5>Success</h5>
                <Button variant="primary" onClick={clearForm}>
                  Add another account
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default CreateAccount;
