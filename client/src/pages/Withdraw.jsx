import React, { useState, useContext } from 'react';
import axios from "axios";
import Card from '../components/Card';
import { userContext } from '../components/Pages';

const Withdraw = () => {

  const ctx = useContext(userContext);
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
      const response = await axios.post('http://localhost:8080/api/withdraw', { accountNumber, withdraw } );
      const userData = response.data;
     
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
    title={"Withdraw"}
    warning={warning}
    body={ show ? (
      <React.Fragment>

        <div className='account-display'>
          <span>Account Number: {accountNumber}</span>
          <span>Balance: &euro; {balance}</span>
        </div>
            <form className='deposit-form'>
      <div>   
      <label htmlFor='withdraw'>Withdrawal Amount</label>
      <input 
         type="number"
         id='withdraw'
         value={withdraw}
         onChange={e => {
           setWithdraw(Number(e.currentTarget.value));
           e.currentTarget.value < 0 ? setBtnDisable(true) : setBtnDisable(false); 
           }} />
       </div>

       <div>
       <button type="submit" 
       onClick={handleWithdraw}
       disabled={btnDisable}
       >Withdraw</button>
       </div>

       </form>

       </React.Fragment>

    ) : (<React.Fragment>
        <h5 style={{padding:"5px" ,background: "rgb(26, 181, 96)" ,color: "white"}}>
        Amount of {withdraw}$ is deducted from: </h5>
        <b>Account number: {accountNumber}</b><br/><br/>
      
        <div>       
        <button type="submit" 
        onClick={reset}
        >Withdraw again</button>
        </div>
       
    </React.Fragment>
  )

          
       }
       />
  )
}

export default Withdraw
