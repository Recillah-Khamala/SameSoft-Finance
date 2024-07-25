import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner, Table } from "react-bootstrap";
import api from "../services/api";

const Statement = () => {
  const [statements, setStatements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("2022-01-01");
  const [toDate, setToDate] = useState("2025-01-01");

  const fetchStatements = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await api.post("/transaction/journal-statement", {
        from: fromDate,
        to: toDate,
      });
      setStatements(response.data);
    } catch (err) {
      setError(
        `Error fetching statements: ${err.response?.data?.message || err.message}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatements();
  }, [fromDate, toDate]);

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement, index) => (
              <tr key={index}>
                <td>{statement.date}</td>
                <td>{statement.description}</td>
                <td>{statement.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Form>
        <Form.Group controlId="fromDate">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="toDate">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={fetchStatements}>
          Fetch Statements
        </Button>
      </Form>
    </div>
  );
};

export default Statement;
