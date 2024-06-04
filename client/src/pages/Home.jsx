import React from 'react';
import Card from '../components/Card';
import '../styles/home.css';
import { GrLanguage } from "react-icons/gr";
import { MdCurrencyExchange, MdAccountTree  } from "react-icons/md";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card 
    title={t('Home.Home')}
    warning={""}
    body = { 
      <div className='home-container'>

        <div className='home-intro'>
          <h1>{t('Home.Welcome to U bank')}</h1>

          <div className='home-img'>
          <img src='../../banking-img.png' alt='home' />
          </div>

          <p>{t('Home.You can now enjoy:')}</p>
        </div>

        

        <div className='services-container'>
          <ul>
            <li> <MdAccountTree  className='h-icon' />
            {t('Home.Dedicated bank account number')}</li>
            <li> <BsDatabaseFillAdd className='h-icon' />
            {t('Home.Transactions saved on secured database')}</li>
            <li> <MdCurrencyExchange className='h-icon' />
            {t('Home.Foreign Exchange Rates')}</li>
           
            <li> <GrLanguage className='h-icon' />
            {t('Home.Language Selection ENG/PL')}</li>
          </ul>
        </div>

        <div className='get-started-btn'>
        <button className="btn" onClick={()=> navigate('/signin')}
        >{t('Home.Get Started')}</button>
        </div>

      </div>
    } 

    />
  )
}

export default Home
