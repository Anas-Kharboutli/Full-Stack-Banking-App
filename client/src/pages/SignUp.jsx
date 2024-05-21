import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';
import '../styles/signup.css';

const Loader = () => (
  <React.Fragment>
  <div className="loader">
    <div className="dot"></div>
</div>
<div className="loader">
    <div className="dot"></div>
</div>
<div className="loader">
    <div className="dot"></div>
</div>
<div className="loader">
    <div className="dot"></div>
</div>
<div className="loader">
    <div className="dot"></div>
</div>
<div className="loader">
    <div className="dot"></div>
</div>
</React.Fragment>
);

const SignUp = () => {

  const navigate = useNavigate();

  const [username, setUserName]         = useState('');
  const [email,setEmail]                = useState('');
  const [password,setPassword]          = useState('');
  const [warning, setWarning]           = useState('');
  const [btnDisabled, setBtnDisabled]   = useState(true);
  const [confirmedPwd, setConfirmedPwd] = useState('');
  const [ show, setShow ]               = useState(true);
 
  //creating input validation functions 
  const isValidName     = (nameInput)     => /^[a-zA-Z ]+$/.test(nameInput);
  const isValidEmail    = (emailInput)    => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
  const isValidPassword = (passwordInput) => passwordInput.length >= 8;
  const isConfirmedPwd  = (pwdInput)      => pwdInput === password;

  //Function to handle submission of form
  async function handleSubmit (e) {
    e.preventDefault();
    if(!username || !email || !password || !confirmedPwd){
      setWarning("Please fill out all fields");
      setTimeout(()=> setWarning(""), 3000)
      return;
    }
    if(!isValidName(username)){
      setWarning("username cannot include numbers or symbols");
      setTimeout(() => setWarning(""), 3000);
      return;
    }
    if(!isValidEmail(email)){
      setWarning("Please enter a valid E-mail address");
      setTimeout(() => setWarning(""), 3000);
      return;
    }
    if(!isValidPassword(password)){
      setWarning("Password must be at least 8 characters long");
      setTimeout(() => setWarning(""), 3000);
      return;
    }
    if(!isConfirmedPwd(confirmedPwd)){
      setWarning("Doesn't match your password");
      setTimeout(() => setWarning(""), 3000);
      return;
    }
    console.log(username,email,password);
   
    //posting data to database using http request
   
    await axios.post('http://localhost:8080/api/signup', {username,email,password})
   .then( (res) => {
    if(res.status === 200) {
      setShow(false);
      setTimeout(() => navigate('/signin'), 3500)
    }
    console.log(res)
    
   }
  )
  .catch((error) => {console.log(error)
    setWarning("Registered email, Please login directly")
  }
  );
};

  return (
     
      <Card title={"Sign up"}
      warning={warning}
      body={ show ? (
      
      <React.Fragment>
      <form>

        <div>
        <label htmlFor='username'>Username</label>
        <input type="text"
        id='username'
        placeholder="Enter your username"
        value={username}
        onChange={(e) => {setUserName(e.target.value)
        !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false) }}
        /> 
        </div>
   
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
       {password.length > 0 &&
        password.length < 8 ?   <span style={{color: "red", fontSize:"14px", marginTop: "0.3rem"}}>Too short!</span> : ""}
       {password.length >= 8  ? <span style={{color: "green", fontSize:"14px", marginTop: "0.3rem"}}>Password is strong</span> : ""}
       </div>
   
       <div>
       <label htmlFor='re-password'>Re-Type Password</label>
       <input type="password" 
        id='re-password'
        value={confirmedPwd}
        onChange={e => {setConfirmedPwd(e.target.value)
        !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false)}}
        />
       {confirmedPwd === password && confirmedPwd > 0 ?  
       <span style={{color: "green", fontSize:"14px", marginTop: "0.3rem"}}>Password is matching !</span> : ""}
       </div>
   
       <div className='btn'>   
       <button type="submit"
       onClick={handleSubmit}
       disabled={btnDisabled}
       >Create Account</button>
       </div>
       </form>

       <div className='have-account'>
       <span>Already have an account ?</span>
       <Link to='/signin'>Sign in </Link>
       </div>

       </React.Fragment>
       
      ) : (
        <div className='welcome-msg'> 
        <h1> You have successfully created your account !</h1>
       <div className='loader-container'>
        <Loader />
        </div>
        <h4>You will be auto directed to sign in page</h4>
        
        </div>
       )
         
      } />
  )
}

export default SignUp
