import React, { useState, useEffect, memo } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';
import api from '../services/api';

const BalanceSheet = () => {
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await api.get('/transaction/balance-sheet');
        setBalanceSheet(response.data);
      } catch (err) {
        setError(`Error fetching balance sheet: ${err.response?.data?.message || err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalanceSheet();

    return () => {
      // Cleanup function (if needed in the future)
    };
  }, []);

  const calculateTotal = (data) => {
    return data.reduce((sum, item) => sum + (typeof item.balance === 'number' ? item.balance : 0), 0);
  };

  const RenderSection = memo(({ title, data }) => (
    <>
      <h3>{title}</h3>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Account Code</th>
              <th>Account Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.account_code}>
                <td>{item.account_code}</td>
                <td>{item.account_name}</td>
                <td>{typeof item.balance === 'number' ? item.balance.toFixed(2) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <p><strong>Total: {calculateTotal(data).toFixed(2)}</strong></p>
    </>
  ));

  return (
    <div>
      <h2>Balance Sheet</h2>
      {balanceSheet && balanceSheet.date && <p>As of: {balanceSheet.date}</p>}
      {isLoading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : balanceSheet && (
        <div>
          <RenderSection title='Assets' data={balanceSheet.assets} />
          <RenderSection title='Liabilities' data={balanceSheet.liability} />
          <RenderSection title='Equity' data={balanceSheet.equity} />
        </div>
      )}
    </div>
  );
};

export default BalanceSheet;