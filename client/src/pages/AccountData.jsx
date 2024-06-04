import React, { useContext } from 'react';
import { userContext } from '../components/Pages';
import Card from '../components/Card';
import '../styles/accountData.css';
import { useTranslation } from 'react-i18next';

const AccountData = () => {
 
  const ctx = useContext(userContext); 
  const { t } = useTranslation();
  
  return (
    <Card 
    title={t("Your Account.Your Account")}
    warning={""}
    body={

      <div className='account-info-container'>
      <table>
        <tbody>
          <tr>
          <th>{t("Your Account.Username")}</th>
          <td>{ctx.user.username}</td>
          </tr>
          

          <tr>
          <th>Email</th>
          <td>{ctx.user.email}</td>
          </tr>

          <tr>
          <th>{t("Your Account.Account Number")}</th>
          <td>{ctx.user.accountNumber}</td>
          </tr>

          <tr>
          <th>{t("Your Account.Balance")}</th>
          <td>{ctx.user.balance} &euro;</td>
          </tr>
          </tbody>
          
      </table>
      </div>
    }
    />
  )
}

export default AccountData
