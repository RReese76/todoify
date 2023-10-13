import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './todoSlice';

function AddItem() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (text.trim() !== '') {
      dispatch(addItem({ text, id: Date.now() }));
      setText('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="add-todo-container">
      <input
        type="text"
        className="add-todo-input"
        placeholder="Add a to-do..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="add-todo-button" onClick={handleAddItem}>
        Add
      </button>
    </div>
  );
}

export default AddItem;
