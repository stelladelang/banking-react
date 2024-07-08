import React, { useContext, useEffect, useState } from 'react';
import { BankContext } from './context';
import { Card, Col, CardFooter, Alert } from 'react-bootstrap';
import axios from 'axios';

const AllData = () => {
  const { currentUser } = useContext(BankContext);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.role === 'admin') {
        try {
          const response = await axios.get(
            'http://localhost:5000/api/alldata',
            {
              params: { email: currentUser.email },
            }
          );
          setAccounts(response.data.accounts);
          setTransactions(response.data.transactions);
        } catch (error) {
          setError('Fetching data failed');
        }
      } else {
        setError('Access denied');
      }
    };

    fetchData();
  }, [currentUser]);

  if (!currentUser || currentUser.role !== 'admin') {
    return <Alert variant="danger">Access denied</Alert>;
  }

  return (
    <div className="container mt-5">
      <h2>All Data</h2>
      {accounts.map((account, index) => (
        <Col xs={12} sm={8} md={6} lg={4} key={index} className="mt-3">
          <Card className="bg-custom">
            <Card.Body>
              <Card.Text>
                <strong>Name:</strong> {account.name}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {account.email}
              </Card.Text>
              <Card.Text>
                <strong>Password:</strong> {account.password}
              </Card.Text>
              <CardFooter>
                <strong>Balance:</strong> ${account.balance}
              </CardFooter>
              <Card.Text>
                <strong>Transactions:</strong>
              </Card.Text>
              {transactions
                .filter((transaction) => transaction.email === account.email)
                .map((transaction, i) => (
                  <Card.Text key={i}>
                    <strong>Type:</strong> {transaction.type},{' '}
                    <strong>Amount:</strong> ${transaction.amount},{' '}
                    <strong>Date:</strong>{' '}
                    {new Date(transaction.date).toLocaleString()}
                  </Card.Text>
                ))}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
  );
};

export default AllData;
