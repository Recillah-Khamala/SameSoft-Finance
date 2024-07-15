import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner, Table } from 'react-bootstrap';
import api from '../services/api';

const Statement = () => {
  const [statements, setStatements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromDate, setFromDate] = useState('2022-01-01');
  const [toDate, setToDate] = useState('2025-01-01');

  const fetchStatements = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.post('/transaction/journal-statement', {
        from: fromDate,
        to: toDate
      });
      setStatements(response.data);
    } catch (err) {
      setError(`Error fetching statements: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatements();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatements();
  };

  return (
    <div>
      <h2>Journal Statements</h2>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>From Date</Form.Label>
          <Form.Control 
            type="date" 
            value={fromDate} 
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>To Date</Form.Label>
          <Form.Control 
            type="date" 
            value={toDate} 
            onChange={(e) => setToDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Fetch Statements
        </Button>
      </Form>

      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {statements.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Dr Account</th>
              <th>Cr Account</th>
              <th>Amount</th>
              <th>Running Balance</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement, index) => (
              <tr key={index}>
                <td>{statement.Journal_Date}</td>
                <td>{statement.Journal_Description}</td>
                <td>{statement.Dr_Account_Name}</td>
                <td>{statement.Cr_Account_Name}</td>
                <td>{statement.Amount}</td>
                <td>{statement.RunningBalance}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Statement;