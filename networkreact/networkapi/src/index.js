import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from './App';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
