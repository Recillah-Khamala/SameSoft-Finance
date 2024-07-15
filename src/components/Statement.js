import React, { useState, useEffect } from 'react';

const Statement = () => {
  const [statements, setStatements] = useState([]);

  useEffect(() => {
	const fetchStatements = async () => {
	  try {
		const response = await fetch('https://acc-api.samesoft.app/transaction/journal-statement');
		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}
		const data = await response.json();
		setStatements(data);
	  } catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	  }
	};

	fetchStatements();
  }, []);

  return (
	<div>
	  <h2>Journal Statements</h2>
	  <ul>
		{statements.map((statement, index) => (
		  <li key={index}>
			{/* Replace `statementProperty` with actual property names from your API data */}
			Date: {statement.date}, Description: {statement.description}, Amount: {statement.amount}
		  </li>
		))}
	  </ul>
	</div>
  );
};

export default Statement;