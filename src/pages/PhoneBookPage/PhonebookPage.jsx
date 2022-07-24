import style from './phonebook.module.scss';

import {
  getContacts,
  getLoader,
  getError,
  getFilteredItems,
  getFilterInput,
} from 'redux/contacts/contacts-selector';
import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchContacts,
  addContact,
  removeContact,
} from 'redux/contacts/contacts-operations';
import { actions } from 'redux/contacts/contacts-slice';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList';
import Filter from '../../components/Filter';

 const PhonebookPage = () => {

  const dispatch = useDispatch();
  const items = useSelector(getContacts, shallowEqual);
  const loading = useSelector(getLoader, shallowEqual);
  const error = useSelector(getError, shallowEqual);
  const filteredContacts = useSelector(getFilteredItems, shallowEqual);
  const filterInput = useSelector(getFilterInput, shallowEqual);
  const isLoggedIn = useSelector(getIsLoggedIn, shallowEqual)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
    dispatch(fetchContacts());
  }, [dispatch, isLoggedIn]);

  const putContact = newData => {
   
    dispatch(addContact(newData));
  };

  const deleteContact = id => {
    dispatch(removeContact(id));
  };

  const filterChange = ({ target }) => {
    dispatch(actions.getFilter(target.value));
  };

  return (
    <div className={style.bookSection}>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm onSubmit={putContact} />

      <h2 className={style.title}>Contacts</h2>
      <Filter filterChange={filterChange} filterInput={filterInput} />
      {error && <p>Some error took place... Please, try again;</p>}
      {loading && <p>..Loading</p>}
      {items.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      )}
    </div>
  );
};

export default PhonebookPage
