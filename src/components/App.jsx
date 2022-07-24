import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from 'redux/auth/auth-operations';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

const Header = lazy(()=> import('./Header')); 
const HomePage = lazy(()=> import('pages/HomePage'));
const LoginPage = lazy(()=> import('pages/LoginPage'));
const RegisterPage = lazy(()=> import('pages/RegisterPage'));
const PhonebookPage = lazy(()=> import('pages/PhonebookPage')) ;


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  return (
    <>
      <Suspense fallback={<p>...Loading</p>}>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/contacts" element={<PhonebookPage />}></Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Route>
          <Route path="*" element={<HomePage replace/>}/>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
