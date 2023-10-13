import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from './todoSlice';

function ListItem({ item }) {
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionDetails, setCompletionDetails] = useState(null);

  // Load completion details and isCompleted state from localStorage when the component mounts
  useEffect(() => {
    const storedDetails = localStorage.getItem(`completionDetails-${item.id}`);
    if (storedDetails) {
      setCompletionDetails(JSON.parse(storedDetails));
      setIsCompleted(true); // Set isCompleted to true if completion details exist
    }
  }, [item.id]);

  const saveCompletionDetails = () => {
    const details = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    localStorage.setItem(`completionDetails-${item.id}`, JSON.stringify(details));
    setCompletionDetails(details);
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(item.id));
  };

  const handleToggleComplete = () => {
    if (isCompleted) {
      // If unchecking the checkmark
      localStorage.removeItem(`completionDetails-${item.id}`);
    } else {
      // If checking the checkmark, save completion details
      saveCompletionDetails();
    }
    setIsCompleted(!isCompleted);
  };

  const itemClassName = isCompleted ? 'todo-item completed' : 'todo-item';

  return (
    <li className={itemClassName}>
      <button
        className={`checkmark-button ${isCompleted ? 'completed' : ''}`}
        onClick={handleToggleComplete}
      >
        &#10003;
      </button>

      <button className="remove-item" onClick={handleRemoveItem}>
        &#8722;
      </button>

      <span className="item-text">{item.text}</span>
      {isCompleted && (
        <span className="completion-details">
          {completionDetails.date} at {completionDetails.time}
        </span>
      )}
    </li>
  );
}

export default ListItem;
