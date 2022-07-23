import s from './login.module.scss';
import { useState } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { logInUser } from 'redux/auth/auth-operations';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [user, setUser] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loggedIn = useSelector(getIsLoggedIn, shallowEqual);


  useEffect(() => {
    if (loggedIn) {
     navigate('/contacts')
    }
   
  }, [loggedIn]);

  const onInput = e => {
    setUser(prevState => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(logInUser({ ...user }));
    setUser(initialState);
  };

  const { email, password } = user;

  return (
    <section className={s.section}>
      <form onSubmit={onSubmit} className={s.form}>
        <h3>Log In</h3>
        <label className={s.label} htmlFor="">
          Email
        </label>
        <input
          id="email"
          onChange={onInput}
          value={email}
          className={s.input}
          type="text"
        />
        <label className={s.label} htmlFor="">
          Password
        </label>
        <input
          onChange={onInput}
          id="password"
          value={password}
          className={s.input}
          type="password"
        />
        <button className={s.btn} type="submit">
          Log in
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
