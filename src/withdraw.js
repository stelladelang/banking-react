import React, { useContext, useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Alert, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BankContext } from './context';

function Withdraw() {
  const { currentUser, updateBalance } = useContext(BankContext);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toastDisplayedRef = useRef(false);

  useEffect(() => {
    if (!currentUser && !toastDisplayedRef.current) {
      toast.info(
        'User should be logged in to perform the withdraw. Redirecting to login page...',
        {
          position: 'top-center',
          autoClose: 2000,
          onClose: () => navigate('/login'),
        }
      );
      toastDisplayedRef.current = true;
    }
  }, [currentUser, navigate]);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    if (
      !withdrawAmount.trim() ||
      isNaN(withdrawAmount) ||
      parseFloat(withdrawAmount) <= 0
    ) {
      setError('Please enter a valid withdraw amount');
      return;
    }

    const parsedWithdrawAmount = parseFloat(withdrawAmount);

    if (parsedWithdrawAmount > currentUser.balance) {
      setError('Insufficient funds');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/withdraw', {
        email: currentUser.email,
        amount: parsedWithdrawAmount,
      });
      updateBalance(currentUser.email, -parsedWithdrawAmount);
      setWithdrawAmount('');
      setError('');
      toast.success('Withdraw successful', {
        position: 'top-center',
        autoClose: 2000,
      });
    } catch (error) {
      setError('Withdraw failed');
    }
  };

  const isDisabled = !withdrawAmount || !currentUser;

  return (
    <div className="container mt-5">
      <p>
        Logged in as: {currentUser ? currentUser.email : 'No user logged in'}
      </p>
      <h2>Withdraw</h2>
      <Col xs={12} sm={8} md={6} lg={4}>
        <Card className="bg-custom">
          <Card.Body>
            <Card.Text>
              Balance: ${currentUser ? currentUser.balance : '0'}
            </Card.Text>
            <Form onSubmit={handleWithdraw}>
              <Form.Group controlId="formWithdrawAmount">
                <Form.Label>Withdraw Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter withdraw amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  disabled={!currentUser}
                />
              </Form.Group>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                disabled={isDisabled}
              >
                Withdraw
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default Withdraw;
