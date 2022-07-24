import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from 'redux/auth/auth-operations';

import Header from './Header';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import { PhonebookPage } from 'pages/PhoneBookPage/PhonebookPage';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  return (
    <>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/contacts" element={<PhonebookPage />}></Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Route>
          <Route path="*" element={<HomePage/>}/>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
