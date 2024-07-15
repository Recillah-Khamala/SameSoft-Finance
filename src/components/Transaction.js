import React, { useState, useEffect } from 'react';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const response = await fetch('https://acc-api.samesoft.app/transaction/import-journal');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setTransactions(data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
  
      fetchTransactions();
    }, []);

  return (
    <div>
      <h2>Transaction Import</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            Date: {transaction.Journal_Date}, Amount: {transaction.Amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transaction;