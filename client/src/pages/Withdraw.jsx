import React, { useState, useContext } from 'react';
import axios from "axios";
import Card from '../components/Card';
import { userContext } from '../components/Pages';
import { useTranslation } from 'react-i18next';
import { NewTransactions } from './exports';

const Withdraw = () => {

  const ctx = useContext(userContext);
  const { t } = useTranslation();
  //const balance = user.balance;

  const accountNumber = ctx.user.accountNumber;
  const balance = ctx.user.balance;
  // initiate input values
  const [withdraw, setWithdraw] = useState(0);
 
  const [warning,setWarning] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const [show, setShow] = useState(true);
  //functions to validate Withdraw amounts on front end
  const isValidWithdraw   = (amount) => amount > 0;
  const isBalanceExceeded = (amount) => amount > balance;
  const isLimitExceeded   = (amount) => amount > 2500;
  //function to handle Withdraw submission
  async function handleWithdraw(e) {
    e.preventDefault();
    if (!isValidWithdraw(withdraw)) {
      setWarning("Your withdrawal amount must be greater than $0"); 
      setTimeout( () => setWarning(""), 3000)
      return;
    }
    if(isBalanceExceeded(withdraw)) {
      setWarning("Your withdrawal amount cannot exceed your balance !");
      setTimeout(() => setWarning(""), 3000)
      return;
    } 
    if(isLimitExceeded(withdraw)) {
    setWarning("You cannot exceed $2500 limit per withdrawal");
    setTimeout(() => setWarning(""), 3000)
    return;
    }
    try {
      await axios.post('http://localhost:8080/api/withdraw', { accountNumber, withdraw } );
      setShow(false);
    } catch (error) {
      console.error(error);
    }  
  }
   //resetting values in case user wishes to make another deposit
   function reset () {
    setWithdraw(0);
    setShow(true);
    window.location.reload();
}

  return (
    <Card
    title={t("Withdraw.Withdraw")}
    warning={warning}
    body={ show ? (
      <React.Fragment>

      <div className='account-display'>
        <span>{t("Withdraw.Account Number")}: {accountNumber}</span>
        <div>
        <span>{t("Withdraw.Balance")}:</span> <span>&euro; {balance}</span>
      </div>
      </div>

            <form className='deposit-form'>
      <div>   
      <label htmlFor='withdraw'>{t("Withdraw.Withdrawal Amount")}</label>
      <input 
         type="number"
         id='withdraw'
         value={withdraw}
         onChange={e => {
           setWithdraw(Number(e.currentTarget.value));
           e.currentTarget.value < 0 ? setBtnDisable(true) : setBtnDisable(false); 
           }} />
       </div>

       <div className='transactions-btn'>
       <button type="submit" 
       onClick={handleWithdraw}
       disabled={btnDisable}
       >{t("Withdraw.Withdraw")}</button>
       </div>

       </form>

       </React.Fragment>

    ) : (<React.Fragment>

        <div className='deposit-conirm-msg'>
        <h5>
        {t("Withdraw.Amount of")} {withdraw} &euro; {t("Withdraw.is deducted from")}: </h5>
        <p>{t("Withdraw.Account Number")}: {accountNumber}</p>
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

export default Withdraw
