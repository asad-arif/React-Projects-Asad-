import React from 'react';

const ButtonsSubtask = ({ subtaskId, deleteHandler, editHandler }) => {
  return (
    <div className="subtask-btn-styling">
      <button
        className="green-button"
        style={{
          backgroundColor: '#BEBEBE ',
          margin: '0px',
          marginLeft: '5px',
        }}
        onClick={() => editHandler(subtaskId)}
      >
        Edit
      </button>
      <button
        className="green-button"
        style={{
          backgroundColor: '#D83F31 ',
          margin: '0px',
          marginLeft: '5px',
        }}
        onClick={() => deleteHandler(subtaskId)}
      >
        Delete
      </button>
    </div>
  );
};

export default ButtonsSubtask;
