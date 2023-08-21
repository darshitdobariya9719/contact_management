import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Choose the storage you want to use (localStorage or sessionStorage)
import contactsReducer from './store/contactsSlice';

const persistConfig = {
  key: 'root', // Root key for the persisted state
  storage,    // Storage to use
  whitelist: ['contacts'], // Reducers to persist (only 'contacts' in this case)
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
  reducer: {
    contacts: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store, null, () => {
  // This callback function is called after rehydration is complete or if there's an error.
  console.log('Redux store rehydration complete.');
});

export { store, persistor };
