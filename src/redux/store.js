import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/contacts-slice"
import authReducer from './auth/auth-slice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from "redux-persist/lib/storage";

  const persistAuthConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
  };

  const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        contacts: contactsReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistore = persistStore(store)