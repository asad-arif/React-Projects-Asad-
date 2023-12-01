import React, { useRef, useState } from 'react';
import Button from './Button';
import './Style.css';
import Subtasks from './Subtasks';
import TodoContext from './todoContext';
function Todo() {
  const inputRef = useRef(null);
  const [tasksList, setTasksList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(0);
  const [clickedTaskId, setClickedTaskId] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const clearInput = () => {
    setInputValue('');
  };

  const generateID = () => {
    return Math.floor(Math.random() * (200 - 10 + 1) + 10);
  };
  //Add task method
  const addtask = () => {
    if (inputValue !== '') {
      const newData = [
        ...tasksList,
        {
          title: inputValue,
          id: generateID(),
          subTasks: [],
        },
      ];
      setTasksList(newData);
      clearInput();
    }
  };
  //Delete Task
  const deleteTask = (idToDelete) => {
    const newData = tasksList.filter((task) => task.id !== idToDelete);
    setTasksList(newData);
    setClickedTaskId(0);
  };
  //   Edit Task
  const editTask = (idToEdit) => {
    setSelectedRecord(idToEdit);
    const indexToEdit = tasksList.findIndex((task) => task.id === idToEdit);
    setInputValue(tasksList[indexToEdit].title);
  };
  const cancelUpdate = () => {
    setSelectedRecord(0);
    clearInput();
  };

  const updateTask = () => {
    const indexToEdit = tasksList.findIndex(
      (task) => task.id === selectedRecord
    );
    const updatedTasksList = [...tasksList];
    const objectToEdit = updatedTasksList[indexToEdit];
    objectToEdit.title = inputRef.current.value;
    setTasksList(updatedTasksList);
    setSelectedRecord(0);
    clearInput();
  };

  return (
    <TodoContext.Provider value={{ tasksList, setTasksList }}>
      <div className="main-container">
        <div className="tasks-container">
          <div>
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button
              className={
                selectedRecord ? 'hidden green-button' : 'inline green-button'
              }
              onClick={() => addtask()}
            >
              Add
            </button>
            <button
              className={
                selectedRecord ? 'inline green-button' : 'hidden green-button'
              }
              onClick={() => updateTask()}
            >
              Update
            </button>
            <button
              style={{ backgroundColor: '#D83F31 ', padding: '10px px' }}
              className={
                selectedRecord ? 'inline green-button' : 'hidden green-button'
              }
              onClick={() => cancelUpdate()}
            >
              X
            </button>
          </div>
          <div>
            <h3>Tasks</h3>
            <ul>
              {tasksList?.map((task) => (
                <div key={task.id}>
                  <li onClick={() => setClickedTaskId(task.id)}>
                    {task.title}
                  </li>
                  <Button
                    taskId={task.id}
                    deleteHandler={deleteTask}
                    editHandler={editTask}
                  />
                </div>
              ))}
            </ul>
          </div>
        </div>
        {clickedTaskId ? (
          <div className="subtasks-container">
            <Subtasks clickedTaskIdProp={clickedTaskId} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </TodoContext.Provider>
  );
}

export default Todo;
