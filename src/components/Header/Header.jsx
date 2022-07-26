import s from './header.module.scss';

import { NavLink } from 'react-router-dom';
import { getUserEmail, getIsLoggedIn } from 'redux/auth/auth-selectors';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOutUser } from 'redux/auth/auth-operations';

const getClassName = ({ isActive }) => {
  return isActive ? `${s.link} ${s.active}` : s.link;
};

const Header = () => {
  const email = useSelector(getUserEmail, shallowEqual);
  const isLoggedIn = useSelector(getIsLoggedIn, shallowEqual);

  const dispatch = useDispatch();

  const logOut = e => {
    dispatch(logOutUser());
  };

  return (
    <header className={s.header}>
      <span className={s.logo}>PhoneBook</span>
      <nav className={s.navigation}>
        <NavLink className={getClassName} to="/">
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink className={getClassName} to="/contacts">
            Contacts
          </NavLink>
        )}
      </nav>
      {!isLoggedIn && (
        <div className={s.registerBar}>
          <NavLink className={getClassName} to="/register">
            Register
          </NavLink>
          <NavLink className={getClassName} to="/login">
            Login
          </NavLink>
        </div>
      )}
      {isLoggedIn && (
        <div className={s.userInfo}>
          <span className={s.user}>{email}</span>
          <button className={s.btn} onClick={logOut} type="button">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
