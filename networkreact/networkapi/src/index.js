import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Postform from './components/Postform';
import Follow from './components/Follow';
import ProfileTimeline from './components/ProfileTimeline';
import Following from './components/Following';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header />
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/timeline" element={<ProfileTimeline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/postform" element={<Postform />} />
        <Route path="/follow/:username" element={<Follow />} />
        <Route path="/following" element={<Following />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
