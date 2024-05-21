import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Pages from './components/Pages';

function App() {
  return (
    <React.Fragment>

    <div className="Navbar">
    <Navbar />
    </div>
    <div className='card'>
    <Pages />
    </div>
    
    </React.Fragment>
  );
}

export default App;
