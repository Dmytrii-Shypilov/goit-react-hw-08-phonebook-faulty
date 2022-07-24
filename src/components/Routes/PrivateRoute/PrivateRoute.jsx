import { Navigate, Outlet } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import { shallowEqual, useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isLoggedIn = useSelector(getIsLoggedIn, shallowEqual);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;