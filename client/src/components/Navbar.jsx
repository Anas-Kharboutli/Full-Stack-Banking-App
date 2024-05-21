import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import { RiBankLine } from "react-icons/ri";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';


const BankLogo = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
    <a href='/' onClick={() => navigate('/')}>
    <RiBankLine className='logo-img'/>
    </a>  
    <a href='/' onClick={() => navigate('/')}>
    <span>Bank V2.0</span>
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
          <NavLink to="/" onClick={() => setToggleMenu(false)}>Home</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/signin" onClick={() => setToggleMenu(false)}>Sign in</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/signup" onClick={() => setToggleMenu(false)}>Sign up</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/deposit" onClick={() => setToggleMenu(false)}>Deposit</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/withdraw" onClick={() => setToggleMenu(false)}>Withdraw</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/accountdata" onClick={() => setToggleMenu(false)}>Account</NavLink>
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
       <RiCloseLine className='x-icon' onClick={() => setToggleMenu(false)} />
       :
       <RiMenu3Line className='line-icon' onClick={() => setToggleMenu(true)} />
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
