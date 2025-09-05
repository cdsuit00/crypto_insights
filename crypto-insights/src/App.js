import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoList from './components/CryptoList';
import CryptoDetail from './components/CryptoDetail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<CryptoList />} />
            <Route path="/crypto/:id" element={<CryptoDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;