import React, { useState, useEffect } from 'react';

const BalanceSheet = () => {
  const [balanceSheetData, setBalanceSheetData] = useState({ assets: [], liability: [], equity: [] });

  useEffect(() => {
	const fetchBalanceSheetData = async () => {
	  try {
		const response = await fetch('https://acc-api.samesoft.app/transaction/balance-sheet');
		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}
		const data = await response.json();
		setBalanceSheetData(data);
	  } catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	  }
	};

	fetchBalanceSheetData();
  }, []);

  const renderCategory = (category, categoryName) => (
	<div key={categoryName}>
	  <h3>{categoryName}</h3>
	  <ul>
		{category.map((item, index) => (
		  <li key={index}>
			Account: {item.account_name}, Amount: {item.balance}
		  </li>
		))}
	  </ul>
	</div>
  );

  return (
	<div>
	  <h2>Balance Sheet</h2>
	  {Object.entries(balanceSheetData).map(([categoryName, category]) =>
		renderCategory(category, categoryName)
	  )}
	</div>
  );
};

export default BalanceSheet;