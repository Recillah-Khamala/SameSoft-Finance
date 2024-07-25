import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import api from "../services/api";

const Transaction = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // Reset success and error messages when file is changed
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to import.");
      return;
    }

    if (!token) {
      setError("You need to be authenticated to perform this action.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/transaction/import-journal", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setSuccess(true);
        console.log(response.data);
        setFile(null); // Reset file input
        e.target.reset(); // Reset form fields
      } else {
        setError(
          `Failed to import transactions. Server responded with status ${response.status}`,
        );
      }
    } catch (error) {
      if (error.response) {
        // If the error is from an HTTP response, log the response data
        console.error("Error during file upload:", error.response.data);
        setError(
          `Error importing transactions: ${error.response.data.message}`,
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error(
          "Error during file upload: No response received",
          error.request,
        );
        setError("Error importing transactions: No response from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error during file upload:", error.message);
        setError(`Error importing transactions: ${error.message}`);
      }
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
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Importing..." : "Import"}
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Transactions imported successfully!</Alert>
      )}
    </div>
  );
};

export default Transaction;
