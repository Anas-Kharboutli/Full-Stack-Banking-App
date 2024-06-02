import React from 'react';
import Card from '../components/Card';
import '../styles/home.css';
import { GrLanguage } from "react-icons/gr";
import { MdCurrencyExchange, MdAccountTree  } from "react-icons/md";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (
    <Card 
    title="Home"
    warning={""}
    body = { 
      <div className='home-container'>

        <div className='home-intro'>
          <h1>Welcome to your bank v2.0</h1>

          <div className='home-img'>
          <img src='../../banking-img.png' alt='home' />
          </div>

          <p>You can now enjoy:</p>
        </div>

        

        <div className='services-container'>
          <ul>
            <li> <MdAccountTree  className='h-icon' />
            Dedicated bank account number</li>
            <li> <BsDatabaseFillAdd className='h-icon' />
            Transactions saved on secured database</li>
            <li> <MdCurrencyExchange className='h-icon' />
              Foreign Exchange Rates</li>
           
            <li> <GrLanguage className='h-icon' />
              Language Selection ENG/PL</li>
          </ul>
        </div>

        <div className='get-started-btn'>
        <button class="btn" onClick={()=> navigate('/signin')}
        >Get Started</button>
        </div>

      </div>
    } 

    />
  )
}

export default Home
