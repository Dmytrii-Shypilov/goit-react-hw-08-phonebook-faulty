import { createAsyncThunk } from '@reduxjs/toolkit';

import { contactsAPI } from 'services/fetch';

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await contactsAPI.fetchContacts();
      console.log('fetched contcs', data)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue, getState }) => {
    try {
      const newContact = await contactsAPI.addContact(data);
      return newContact;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      const duplicate = contacts.items.find(
        item => item.name.toLowerCase() === data.name.toLowerCase()
      );
      if (duplicate) {
        alert(`${data.name} is already in phonebook`);
        return false;
      }
      return data;
    },
  }
);

export const removeContact = createAsyncThunk(
  'contacts/remove',
  
  async (id, { rejectWithValue }) => {
    try {
      const deleteId = await contactsAPI.removeContact(id);
      return deleteId;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
