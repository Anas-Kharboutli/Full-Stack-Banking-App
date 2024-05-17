import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/navbar.css';
import { RiBankLine } from "react-icons/ri";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const BankLogo = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
    <a href='/' onClick={() => navigate('/')}>
    <RiBankLine />
    </a>  
  </React.Fragment>
  );
};

const Navbar = () => {

  const [toggleMenu, setToggleMenu ] = useState(false);

  const Menu = () => (
    <React.Fragment>
       
      <ul>
          <li className='nav-item'>
            <Link to="/" onClick={() => setToggleMenu(false)}>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to="/signin" onClick={() => setToggleMenu(false)}>Sign In</Link>
          </li>
          <li className='nav-item'>
            <Link to="/signup" onClick={() => setToggleMenu(false)}>Sign Up</Link>
          </li>
          <li className='nav-item'>
          <Link to="/deposit" onClick={() => setToggleMenu(false)}>Deposit</Link>
          </li>
          <li className='nav-item'>
          <Link to="/withdraw" onClick={() => setToggleMenu(false)}>Withdraw</Link>
          </li>
          <li className='nav-item'>
          <Link to="/accountdata" onClick={() => setToggleMenu(false)}>Account</Link>
          </li>
         </ul> 
    </React.Fragment>
  );


  return (
     <nav>
    <div className='navbar-container'>

      <div className='logo'>
      <BankLogo />     
      </div>
      
      <div className='navbar-links'>
       <Menu />
      </div>  

    </div>

      <div className='mobile-menu'>
      
      <div className='logo'>
      <BankLogo />     
      </div>

      {toggleMenu ? 
       <RiCloseLine size={45} className='x-icon' onClick={() => setToggleMenu(false)} />
       :
       <RiMenu3Line size={45} onClick={() => setToggleMenu(true)} />
      }  
      </div>
    
    <div className= {`mobile-menu-container ${toggleMenu ? "active" : ""}`}>
      {toggleMenu && (
      
      <React.Fragment>  
      <div className='mobile-menu-links'>
       <Menu />
      </div>  
      
      </React.Fragment> 
        )}
    </div>
    
    </nav>
  )
}

export default Navbar
