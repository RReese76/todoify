import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';

const store = configureStore({
  reducer: {
    items: todoReducer,
  },
});

export default store;
