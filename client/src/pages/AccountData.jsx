import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../components/Pages';
import Card from '../components/Card';
import axios from 'axios';

const AccountData = () => {
  const ctx = useContext(userContext); 

    //extracting all data coming from the mongodb array
    /*
    let users = user.map((user) => (
      <ul>
      <li key={user._id}>
      <b>Account Number: </b> {user.accountNumber} <br/>   
      <b>Username:       </b> {user.userName}      <br/> 
      <b>Email:          </b> {user.email}         <br/> 
      <b>Password:       </b> {user.password}      <br/> 
      <b>Balance:        </b> {user.balance}$      <br/> 
      </li>   
      </ul> 

      <li>{user.email}</li>
        <li>{user.password}</li>
        <li>{user.accountNumber}</li>
        <li>{user.balance}</li>


    ));
    */
  
  return (
    <Card 
    title={"Account Information"}
    warning={""}
    body={
      <>
      <ol>
        <li>{ctx.user.username}</li>
        <li>{ctx.user.email}</li>
        <li>{ctx.user.password}</li>
        <li>{ctx.user.accountNumber}</li>
        <li>{ctx.user.balance}</li>
        

      </ol>
      
      
      
      
      


    
    
      </>
    }

    />
  )
}

export default AccountData
