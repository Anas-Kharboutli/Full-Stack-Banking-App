import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import { RiBankLine } from "react-icons/ri";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
 
const BankLogo = () => {

  return (
    <React.Fragment>

    <RiBankLine className='logo-img'/>
    <span>U Bank</span>

  </React.Fragment>
  );
};

const Navbar = () => {

  const isLoggedIn = window.localStorage.getItem("userLoggedIn");
  const [toggleMenu, setToggleMenu ] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
 
   const Menu = () => {
   
    return (

      isLoggedIn === null ? (
        <React.Fragment>
       
      <ul>
          <li className='nav-item'>
          <NavLink to="/" onClick={() => setToggleMenu(false)}>{t("Home.Home")}</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/signup" onClick={() => setToggleMenu(false)}>{t("Sign up.Sign up")}</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/signin" onClick={() => setToggleMenu(false)}>{t("Login.Login")}</NavLink>
          </li>
          <li className='nav-item'>
          <LanguageSelector />
          </li>
         </ul> 
    </React.Fragment>
      ) : (
        <React.Fragment>
       
      <ul>
          <li className='nav-item'>
          <NavLink to="/forex" onClick={() => setToggleMenu(false)}>{t("Forex.Forex")}</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/deposit" onClick={() => setToggleMenu(false)}>{t("Deposit.Deposit")}</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/withdraw" onClick={() => setToggleMenu(false)}>{t("Withdraw.Withdraw")}</NavLink>
          </li>
          <li className='nav-item'>
          <NavLink to="/accountdata" onClick={() => setToggleMenu(false)}>{window.localStorage.getItem("userLoggedIn")}</NavLink>
          </li>
          <li className='nav-item'>
          <LanguageSelector />
          </li>
          <li className='nav-item'>
            <button onClick={() =>{ localStorage.removeItem("userLoggedIn");
             navigate('/');
             window.location.reload();              
            }}>
              {t("Logout")}
            </button>
          </li>
         </ul> 
    </React.Fragment>
      )
  )};


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
