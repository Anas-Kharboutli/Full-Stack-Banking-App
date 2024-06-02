import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../components/Pages';
import Card from '../components/Card';
import '../styles/accountData.css';

const AccountData = () => {
  const ctx = useContext(userContext); 
  
  return (
    <Card 
    title={"Your Account"}
    warning={""}
    body={

      <div className='account-info-container'>
      <table>
          <tr>
          <th>Username</th>
          <td>{ctx.user.username}</td>
          </tr>

          <tr>
          <th>Email</th>
          <td>{ctx.user.email}</td>
          </tr>

          <tr>
          <th>Account Number</th>
          <td>{ctx.user.accountNumber}</td>
          </tr>

          <tr>
          <th>Balance</th>
          <td>{ctx.user.balance} &euro;</td>
          </tr>
      </table>
      </div>
    }
    />
  )
}

export default AccountData
