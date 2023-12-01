import React from 'react';
import './Style.css';
function Button({ taskId, deleteHandler, editHandler }) {
  return (
    <div className="task-btn">
      <button
        className="green-button"
        style={{ backgroundColor: '#BEBEBE ' }}
        onClick={() => editHandler(taskId)}
      >
        Edit
      </button>
      <button
        className="green-button"
        style={{ backgroundColor: '#D83F31 ' }}
        onClick={() => deleteHandler(taskId)}
      >
        Delete
      </button>
    </div>
  );
}

export default Button;
