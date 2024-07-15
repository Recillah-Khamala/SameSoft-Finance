import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

const Transaction = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // Reset success and error messages when file is changed
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to import.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/transaction/import-journal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setSuccess(true);
        setFile(null); // Reset file input
        e.target.reset(); // Reset form fields
      } else {
        setError(`Failed to import transactions. Server responded with status ${response.status}`);
      }
    } catch (err) {
      setError(`Error importing transactions: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Import Transactions</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Select JSON file to import</Form.Label>
          <Form.Control 
            type="file" 
            onChange={handleFileChange} 
            accept=".json,.xlsx,.xls"
          />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Importing...' : 'Import'}
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Transactions imported successfully!</Alert>}
    </div>
  );
};

export default Transaction;