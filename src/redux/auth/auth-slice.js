import { createSlice} from '@reduxjs/toolkit';
import { logInUser, registerUser, currentUser, logOutUser } from './auth-operations';

const initialState = {
  user: { name: null, email: null, password: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [logInUser.fulfilled]: (state, {payload}) => {
            state.user = payload.user
            state.token = payload.token
            state.isLoggedIn = true
        },
        [registerUser.fulfilled]: (state, {payload}) => {
            state.user = payload.user
            state.token = payload.token
            state.isLoggedIn = true
        },
        [currentUser.fulfilled]: (state, {payload}) => {
            state.user = payload
            state.isLoggedIn = true
        },
        [logOutUser.fulfilled]: (state,_) => {
            state.user =  { name: null, email: null, password: null }
            state.isLoggedIn = false
            state.token = null
        }
    }
});

export const {actions} = authSlice
export default authSlice.reducer