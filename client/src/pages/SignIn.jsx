import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { Loader } from './SignUp';
import axios from 'axios';
import '../styles/signin.css';
import { useTranslation } from 'react-i18next';

const SignIn = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email,setEmail]                = useState('');
  const [password,setPassword]          = useState('');
  const [warning, setWarning]           = useState('');
  const [btnDisabled, setBtnDisabled]   = useState(true);
  const [loading, setLoading]           = useState(false);

   //finction to validate email format on front-end
   const isValidEmail = (emailInput) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
   
   //async function to handle login
   async function handleSignin(e){

    e.preventDefault();
       
       if(!email || !password) {
           setWarning("Please enter your Email and Password to login");
           setTimeout(()=> setWarning(''), 3000);
           return;
       }
       if(!isValidEmail(email)) {
           setWarning("Please enter a valid Email address")
           setTimeout(()=> setWarning(''), 3000);
           return;
       }

       setLoading(true);

       try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signin`, { email, password });
        const userData = response.data;

        window.localStorage.setItem("userLoggedIn", userData.username);
        window.localStorage.setItem("email", userData.email);

        if(response.status === 200) {
          navigate('/deposit');
          window.location.reload();
        }

        
        
      } catch (error) {
        setWarning("Invalid email or password");
        console.error(error);
      }
     };

  return (
    <Card 
    title={t("Login.Login")}
    warning={warning}
    body={
      <React.Fragment>
      <form>
 
       <div>
       <label htmlFor='email'>Email</label>
       <input type="email"
        id='email'
        placeholder={t("Login.example@company.com")}
        value={email}
        onChange={e => {setEmail(e.target.value)
       !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false)}}
        />
       </div>
   
       <div>
       <label htmlFor='password'>{t("Login.Password")}</label>
       <input type="password"
        id='password'
        placeholder={t("Login.Type your Password")}
        value={password}
        onChange={e => {setPassword(e.target.value)
        !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false)}}
        />
       </div>

       <div className='btn'>   
       <button type="submit"
       onClick={handleSignin}
       disabled={btnDisabled}
       >{
        loading ? 
        <>
        Verifying Credentials <Loader />
        </> 
        :
        t("Login.Login")
       }
       </button>
       </div>
       </form>

       <div className='have-account'>
       <span>{t("Login.You don't have an account yet ?")}</span>
       <Link to='/signup'>{t("Login.Sign up")} </Link>
       </div>

       </React.Fragment>
    }

    />
  )
}

export default SignIn
