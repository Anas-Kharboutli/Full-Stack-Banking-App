import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Pages from './components/Pages';
import { ShareContext } from './components/Pages';

function App() {
  return (
    <React.Fragment>
    <ShareContext>

    <div className="Navbar">
    <Navbar />
    </div>
    
    <div className='card'>
    <Pages />
    </div>
    
    </ShareContext>
    </React.Fragment>
  );
}

export default App;
