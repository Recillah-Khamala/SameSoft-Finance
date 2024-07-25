import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import AppNavbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./components/Home";
import BalanceSheet from "./components/BalanceSheet";
import Statement from "./components/Statement";
import Transaction from "./components/Transaction";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar />
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/balancesheet" element={<BalanceSheet />} />
              <Route path="/statement" element={<Statement />} />
              <Route path="/transaction" element={<Transaction />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
