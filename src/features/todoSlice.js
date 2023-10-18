import { createSlice } from '@reduxjs/toolkit';

const loadInitialState = () => {
  // Load initial state from localStorage if available
  const storedData = localStorage.getItem('todoItems');
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
};

const initialState = loadInitialState();

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // Action to add a new item to the state
    addItem: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('todoItems', JSON.stringify(state));
    },
    // Action to remove an item from the state
    removeItem: (state, action) => {
      const itemId = action.payload;
      const updatedItems = state.filter((item) => item.id !== itemId);
      state.length = 0;
      state.push(...updatedItems);
      localStorage.setItem('todoItems', JSON.stringify(updatedItems));
    },
    // Action to toggle the completion status of an item
    toggleComplete: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state[itemIndex].completed = !state[itemIndex].completed;
        state[itemIndex].completedAt = new Date().toLocaleString(); // Add timestamp
        localStorage.setItem('todoItems', JSON.stringify(state));
      }
    },
    // Action to update the text of an item
    updateItemText: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.text = action.payload.text;
        localStorage.setItem('todoItems', JSON.stringify(state)); // Update localStorage
      }
    },
  },
});

export const { addItem, removeItem, toggleComplete, updateItemText } = todoSlice.actions;
export default todoSlice.reducer;
