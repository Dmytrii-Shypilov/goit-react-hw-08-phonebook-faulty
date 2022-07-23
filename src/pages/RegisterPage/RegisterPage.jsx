import s from './register.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/auth/auth-operations';

const initialState = {
    name: '',
    email: '',
    password: '',
}

const RegisterPage = () => {
  const [user, setUser] = useState(initialState);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    dispatch(registerUser({...user}));
    setUser(initialState)

  };

  const onInput = e => {
    setUser(prevState => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const {name, email, password} = user

  return (
    <section className={s.section}>
      <form onSubmit={onSubmit} className={s.form}>
        <h3>Register</h3>
        <label className={s.label} htmlFor="">
          Name
        </label>
        <input value={name} onChange={onInput} id="name" className={s.input} type="text" />
        <label className={s.label} htmlFor="">
          Email
        </label>
        <input value={email} onChange={onInput} id="email" className={s.input} type="text" />
        <label className={s.label} htmlFor="">
          Password
        </label>
        <input
        value={password}
          onChange={onInput}
          id="password"
          className={s.input}
          type="password"
        />
        <button className={s.btn} type="submit">
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
