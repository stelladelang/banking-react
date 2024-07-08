import React, { useContext, useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BankContext } from './context';

function Deposit() {
  const { currentUser, updateBalance } = useContext(BankContext);
  const [depositAmount, setDepositAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toastDisplayedRef = useRef(false);

  useEffect(() => {
    if (!currentUser && !toastDisplayedRef.current) {
      toast.info(
        'User should be logged in to perform the deposit. Redirecting to login page...',
        {
          position: 'top-center',
          autoClose: 2000,
          onClose: () => navigate('/login'),
        }
      );
      toastDisplayedRef.current = true;
    }
  }, [currentUser, navigate]);

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    if (
      !depositAmount.trim() ||
      isNaN(depositAmount) ||
      parseFloat(depositAmount) <= 0
    ) {
      setError('Please enter a valid deposit amount');
      return;
    }

    const parsedDepositAmount = parseFloat(depositAmount);

    try {
      await axios.post('http://localhost:5000/api/deposit', {
        email: currentUser.email,
        amount: parsedDepositAmount,
      });
      updateBalance(currentUser.email, parsedDepositAmount);
      setDepositAmount('');
      setError('');
      toast.success('Deposit successful', {
        position: 'top-center',
        autoClose: 2000,
      });
    } catch (error) {
      setError('Deposit failed');
    }
  };

  const isDisabled = !depositAmount || !currentUser;

  return (
    <div className="container mt-5">
      <p>
        Logged in as: {currentUser ? currentUser.email : 'No user logged in'}
      </p>
      <h2>Deposit</h2>
      <div className="col-sm-8 col-md-6 col-lg-4">
        <Card className="bg-custom">
          <Card.Body>
            <Card.Text>
              Balance: ${currentUser ? currentUser.balance : '0'}
            </Card.Text>
            <Form onSubmit={handleDeposit}>
              <Form.Group controlId="formDepositAmount">
                <Form.Label>Deposit Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter deposit amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
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
                Deposit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Deposit;
