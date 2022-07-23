import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'services/fetch';
import axios from 'axios';



export const logInUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const user = await authAPI.logIn(data)
      console.log('auth login',axios.defaults.headers.common.Authorization)
      return user
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      console.log('request reg', data)
      const user = await authAPI.register(data);
     
      return user
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/current',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { token } = auth;
      const data = await authAPI.getCurrentUser(token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
      
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      const data = await authAPI.toLogOut()
      console.log('async logout data',data)
      return data
    } catch(error) {
      return rejectWithValue(error)
    }
  }
)