import React from 'react';
import { Card, Col } from 'react-bootstrap';

function Home() {
  return (
    <div className="container mt-5">
      <Col xs={12} sm={8} md={6} lg={4}>
        <Card>
          <Card.Header>BadBank Landing Module</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to the bank</Card.Title>
            <Card.Text>You can move around using the navigation bar.</Card.Text>
            <Card.Img src="/images/bank.png" />
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
export default Home;
