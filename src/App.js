import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Link here
import HomePage from './pages/HomePage';
import BalanceSheet from './components/BalanceSheet';
import Statement from './components/Statement';
import Transaction from './components/Transaction';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          {/* Replace <a> tags with <Link> */}
          <nav>
            <Link to="/">Home</Link> | <Link to="/balancesheet">Balance Sheet</Link> | <Link to="/statement">Statement</Link> | <Link to="/transaction">Transaction</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/balancesheet" element={<BalanceSheet />} />
          <Route path="/statement" element={<Statement />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
