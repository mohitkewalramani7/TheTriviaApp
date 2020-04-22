import React from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes/>
      </div>
    </Router>
  );
}

export default App;
