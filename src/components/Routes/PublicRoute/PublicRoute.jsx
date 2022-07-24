import { Navigate, Outlet } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import { shallowEqual, useSelector } from 'react-redux';

const PublicRoute = () => {
    const isLoggedIn = useSelector(getIsLoggedIn, shallowEqual); 
    if (isLoggedIn) {
      return <Navigate replace to="/contacts" />;
    }
  
    return <Outlet />;
  };
  
  export default PublicRoute;