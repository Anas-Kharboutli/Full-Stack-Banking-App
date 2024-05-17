import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, SignIn, SignUp, Deposit, Withdraw, AccountData } from '../pages/exports';


const Pages = () => {
  return (
    <Routes>
        <Route path='/'            element={<Home />} />
        <Route path='/signin'      element={<SignIn />} />
        <Route path='/signup'      element={<SignUp />} />
        <Route path='/deposit'     element={<Deposit />} />
        <Route path='/withdraw'    element={<Withdraw />} />
        <Route path='/accountdata' element={<AccountData />} />
    </Routes>
  )
}

export default Pages
