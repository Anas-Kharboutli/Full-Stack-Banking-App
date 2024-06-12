import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, SignIn, SignUp, Deposit, Withdraw, AccountData, Forex } from '../pages/exports';
import axios from 'axios';

const Pages = () => {
  return (
 
    <Routes>
        <Route path='/'   exact    element={<Home />} />
        <Route path='/signin'      element={<SignIn />} />
        <Route path='/signup'      element={<SignUp />} />
        <Route path='/forex'       element={<Forex />} />
        <Route path='/deposit'     element={<Deposit />} />
        <Route path='/withdraw'    element={<Withdraw />} />
        <Route path='/accountdata' element={<AccountData />} />
    </Routes>
 
  )
};

export  const userContext = createContext();

export const ShareContext = ({children}) => {


  const [user, setUser] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/data?email=${email}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [email]);
    
  return (
    <userContext.Provider value={{user}}>
      {children}
    </userContext.Provider>
  )


}

export default Pages
