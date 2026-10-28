import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '../components/Header';
import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Vendors } from '../pages/Vendors';
import { Discover } from '../pages/Discover';
import './styles.css';

function App() {
  return <HashRouter><Header /><Routes><Route path="/" element={<Home />} /><Route path="/vendors/:city" element={<Vendors />} /><Route path="/discover/:category" element={<Discover />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/login" element={<Login />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></HashRouter>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
