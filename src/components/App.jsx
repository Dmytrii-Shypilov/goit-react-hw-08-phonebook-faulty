import {Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from 'redux/auth/auth-operations';

import UserMenu from './Header';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import { PhonebookPage } from 'pages/PhoneBookPage/PhonebookPage';

const App = () => {
const dispatch =useDispatch()

  useEffect(()=> {
    dispatch(currentUser())
  },[])

  return (
    <>
      <UserMenu />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/contacts" element={<PhonebookPage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
