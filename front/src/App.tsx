import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Survey from './Survey';
import RiskEval from './RiskEval';
import RiskInfo from './RiskInfo';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Survey />} />
        <Route path="/riskeval" element={<RiskEval />} />
        <Route path="/risk-info/:label" element={<RiskInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
