import { configureStore } from '@reduxjs/toolkit';
import todoState  from '../slices/todoSlice.js';
import { loadState } from './utils/localStorage.js';
import localStorageMiddleware from './middleware/localStorageMiddleware.js';

const preloadedState = loadState(); 

export const store = configureStore({
  reducer: {
    todoState, 
  },
  preloadedState, 
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware), 
});

export default store;