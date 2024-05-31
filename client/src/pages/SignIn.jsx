import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';
import '../styles/signin.css';
import { userContext } from '../components/Pages';

const SignIn = () => {

  const navigate = useNavigate();
  const user = useContext(userContext);

  const [email,setEmail]                = useState('');
  const [password,setPassword]          = useState('');
  const [warning, setWarning]           = useState('');
  const [btnDisabled, setBtnDisabled]   = useState(true);

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

       try {
        const response = await axios.post('http://localhost:8080/api/signin', { email, password });
        const userData = response.data;
      
      /*
        user.username      = userData.username;
        user.email         = userData.email;
        user.password      = userData.password;
        user.accountNumber = userData.accountNumber;
        user.balance       = userData.balance;
      */  
        window.localStorage.setItem("userLoggedIn", userData.username);
        window.localStorage.setItem("email", userData.email);

        navigate('/deposit');
        window.location.reload();
        
      } catch (error) {
        setWarning("Invalid email or password");
        console.error(error);
      }
    



       //axios query to get data from mongodb and validate credentials
     
       /*   await axios.post('http://localhost:8080/api/signin', { email, password })     
           .then( (res) => {
            const data = res.json;
            if(res.status === 200) {
              console.log(data);
              navigate('/');
            }
           }
          ) 
          .catch((error) => {console.log(error)
            
          }
          );   */ 
     };

  return (
    <Card 
    title={"Sign in"}
    warning={warning}
    body={
      <React.Fragment>
      <form>
 
       <div>
       <label htmlFor='email'>Email</label>
       <input type="email"
        id='email'
        placeholder="example@company.com"
        value={email}
        onChange={e => {setEmail(e.target.value)
       !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false)}}
        />
       </div>
   
       <div>
       <label htmlFor='password'>Password</label>
       <input type="password"
        id='password'
        placeholder="Type your Password"
        value={password}
        onChange={e => {setPassword(e.target.value)
        !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false)}}
        />
       </div>

       <div className='btn'>   
       <button type="submit"
       onClick={handleSignin}
       disabled={btnDisabled}
       >Login</button>
       </div>
       </form>

       <div className='have-account'>
       <span>You don't have an account yet ?</span>
       <Link to='/signup'>Sign up </Link>
       </div>

       </React.Fragment>
    }

    />
  )
}

export default SignIn
