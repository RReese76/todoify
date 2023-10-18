import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateItemText } from './todoSlice';

function ListItem({ item }) {
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(false); // State to track completion status
  const [editMode, setEditMode] = useState(false); // State to toggle editing mode
  const [updatedText, setUpdatedText] = useState(item.text); // State to store updated text
  const [completionDetails, setCompletionDetails] = useState(null); // State to store completion details
  const inputRef = useRef(null); // Create a ref for the input element

  // Load completion details and isCompleted state from localStorage when the component mounts
  useEffect(() => {
    const storedDetails = localStorage.getItem(`completionDetails-${item.id}`);
    if (storedDetails) {
      setCompletionDetails(JSON.parse(storedDetails));
      setIsCompleted(true); // Set isCompleted to true if completion details exist
    }
  }, [item.id]);

  // Function to save completion details to localStorage
  const saveCompletionDetails = () => {
    const details = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    localStorage.setItem(`completionDetails-${item.id}`, JSON.stringify(details));
    setCompletionDetails(details);
  };

  // Function to handle removing an item
  const handleRemoveItem = () => {
    dispatch(removeItem(item.id));
  };

  // Function to toggle the completion status
  const handleToggleComplete = () => {
    if (isCompleted) {
      // If unchecking the checkmark, remove completion details from localStorage
      localStorage.removeItem(`completionDetails-${item.id}`);
    } else {
      // If checking the checkmark, save completion details
      saveCompletionDetails();
    }
    setIsCompleted(!isCompleted); // Toggle isCompleted
  };

  // Function to enable editing mode
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Function to handle text change in edit mode
  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  // Function to save the updated text and exit edit mode
  const handleTextSave = () => {
    if (updatedText.trim() !== '') {
      dispatch(updateItemText({ id: item.id, text: updatedText }));
      setEditMode(false);
    }
  };

  // Define the CSS class for the list item based on completion status
  const itemClassName = isCompleted ? 'todo-item completed' : 'todo-item';

  // Add useEffect to focus the input when editMode becomes true
  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <li className={itemClassName}>
      <button
        className={`checkmark-button ${isCompleted ? 'completed' : ''}`}
        onClick={handleToggleComplete}
      >
        &#10003; {/* Checkmark character */}
      </button>

      <button className="remove-item" onClick={handleRemoveItem}>
        &#8722; {/* Minus sign character */}
      </button>

      {editMode ? (
        // Edit mode: Input field for updating text
        <input
          type="text"
          className="edit-input"
          ref={inputRef} // Attach the ref to the input element
          style={{
            width: '80%',
            marginLeft: '5px',
            fontFamily: 'inherit',
            fontSize: '20px',
          }}
          value={updatedText}
          onChange={handleTextChange}
          onBlur={handleTextSave}
          onKeyUp={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') { // Corrected condition
              handleTextSave();
            }
          }}
        />
      ) : (
        // View mode: Display item text
        <span className="item-text" onClick={handleEditClick}>
          {item.text}
        </span>
      )}

      {isCompleted && (
        // Display completion details if the item is completed
        <span className="completion-details">
          {completionDetails.date} at {completionDetails.time}
        </span>
      )}
    </li>
  );
}

export default ListItem;
