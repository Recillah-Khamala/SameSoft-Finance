import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Login from './pages/Login';
import BalanceSheet from './components/BalanceSheet';
import Statement from './components/Statement';
import Transaction from './components/Transaction';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/balancesheet" element={<BalanceSheet />} />
            <Route path="/statement" element={<Statement />} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;