import React, { useState, useContext } from 'react';
import axios from "axios";
import Card from '../components/Card';
import { userContext } from '../components/Pages';
import '../styles/deposit.css';
import { useTranslation } from 'react-i18next';

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
      const response = await axios.post('http://localhost:8080/api/deposit', { accountNumber, deposit } );
      const userData = response.data;
     
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
          <span>{t("Deposit.Balance")}: &euro; {balance}</span>
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

       <div>
       <button type="submit" 
       onClick={handleDeposit}
       disabled={btnDisable}
       >{t("Deposit.Deposit")}</button>
       </div>

       </form>

       </React.Fragment>

    ) : (<React.Fragment>
        <h5 style={{padding:"5px" ,background: "rgb(26, 181, 96)" ,color: "white"}}>
        {t("Deposit.Amount of")} {deposit}&euro {t("Deposit.is credited to")}: </h5>
        <b>{t("Deposit.Account Number")}: {accountNumber}</b><br/><br/>
      
        <div>       
        <button type="submit" 
        onClick={reset}
        >{t("Deposit.Make New Deposit")}</button>
        </div>
       
    </React.Fragment>
  )

          
       }
       />

    
  )
}

export default Deposit
