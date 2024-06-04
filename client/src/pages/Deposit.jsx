import React, { useState, useContext } from 'react';
import axios from "axios";
import Card from '../components/Card';
import { userContext } from '../components/Pages';
import '../styles/deposit.css';
import { useTranslation } from 'react-i18next';
import { NewTransactions } from './exports';

const Deposit = () => {

  const ctx = useContext(userContext);
  const { t } = useTranslation();
  //const balance = user.balance;

  const accountNumber = ctx.user.accountNumber;
  const balance = ctx.user.balance;
  // initiate input values
  const [deposit, setDeposit] = useState(0);
 
  const [warning,setWarning] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const [show, setShow] = useState(true);
 //functions to validate deposit amounts on front end
  const isValidDeposit = (amount) => amount > 0;
  const isValidAmount  = (amount) => amount <= 5000;
  //function to handle deposit submission
  async function handleDeposit(e) {
    e.preventDefault();
    if(!isValidDeposit(deposit)) {
      setWarning("Your deposit amount must be greater than $0");
      setTimeout(() => setWarning(""), 3000)
      return;
    }
    if(!isValidAmount(deposit)) {
      setWarning("You cannot exceed $5000 limit per deposit.");
      setTimeout(() => setWarning(""), 3000)
      return;
    }
    try {
      await axios.post('https://full-stack-bank-app-anas-kh-4b7404c36087.herokuapp.com/api/deposit', { accountNumber, deposit } );    
      setShow(false);
    } catch (error) {
      console.error(error);
    }  
  }
   //resetting values in case user wishes to make another deposit
   function reset () {
    setDeposit(0);
    setShow(true);
    window.location.reload();
  }

  return (
    
    <Card
    title={t("Deposit.Deposit")}
    warning={warning}
    body={ show ? (
      <React.Fragment>

      <div className='account-display'>
        <span>{t("Deposit.Account Number")}: {accountNumber}</span>
        <div>
        <span>{t("Deposit.Balance")}:</span> <span>&euro; {balance}</span>
      </div>
      </div>
               
      <form className='deposit-form'>
      <div>   
      <label htmlFor='deposit'>{t("Deposit.Deposit Amount")}</label>
      <input 
         type="number"
         id='deposit'
         value={deposit}
         onChange={e => {
           setDeposit(Number(e.currentTarget.value));
           e.currentTarget.value < 0 ? setBtnDisable(true) : setBtnDisable(false); 
           }} />
       </div>

       <div className='transactions-btn'>
       <button type="submit" 
       onClick={handleDeposit}
       disabled={btnDisable}
       >{t("Deposit.Deposit")}</button>
       </div>

       </form>

       </React.Fragment>

    ) : (<React.Fragment>
         
        <div className='deposit-conirm-msg'>
        <h5>
        {t("Deposit.Amount of")} {deposit} &euro; {t("Deposit.is credited to")}: </h5>
        <p>{t("Deposit.Account Number")}: {accountNumber}</p>
        </div>

        <div className='transactions-n-btn' 
        onClick={()=> setTimeout(reset, 1300)}>       
        <NewTransactions />
        </div>
       
    </React.Fragment>
  )

          
       }
       />

    
  )
}

export default Deposit
