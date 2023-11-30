import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import './Style.css';
import Subtasks from './Subtasks';
function Todo() {
  const inputRef = useRef(null);
  const [activeTask, setActiveTask] = useState({});
  const [tasksList, setTasksList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [clickedTaskId, setClickedTaskId] = useState(0);

  const clearInput = () => {
    setInputValue('');
  };

  const generateID = () => {
    return Math.floor(Math.random() * (200 - 10 + 1) + 10);
  };
  //Add task method
  const addtask = (activeTask) => {
    if (inputValue !== '') {
      const newData = [
        ...tasksList,
        {
          ...activeTask,
          id: generateID(),
          subTasks: [],
        },
      ];
      setTasksList(newData);
      localStorage.setItem('AllTaskList', JSON.stringify(newData));
      clearInput();
    }
  };

  //   filter method
  const deleteTask = (idToDelete) => {
    setTasksList((prevTasksList) =>
      prevTasksList.filter((task) => task.id !== idToDelete)
    );
    const newData = tasksList.filter((task) => task.id !== idToDelete);
    localStorage.setItem('AllTaskList', JSON.stringify(newData));
    setClickedTaskId(0);
  };
  //   Edit Task method
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
    localStorage.setItem('AllTaskList', JSON.stringify(updatedTasksList));
    setSelectedRecord(0);
    clearInput();
  };

  const getDataFromLocalStorage = () => {
    const Data = JSON.parse(localStorage.getItem('AllTaskList')) || [];
    setTasksList(Data);
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log(clickedTaskId);
  }, [clickedTaskId]);

  return (
    <div className="main-container">
      {/* Top Div */}
      {/* clickedTaskId:{clickedTaskId} */}
      {/* {JSON.stringify(tasksList)} */}
      <div className="tasks-container">
        <div>
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setActiveTask({
                ...activeTask,
                title: e.target.value,
              });
            }}
            required
          />
          <button
            className={
              selectedRecord ? 'hidden green-button' : 'inline green-button'
            }
            onClick={() => addtask(activeTask)}
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
                <li onClick={() => setClickedTaskId(task.id)}>{task.title}</li>
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
          <Subtasks
            clickedTaskIdProp={clickedTaskId}
            tasksListProp={tasksList}
            setTasksListProp={setTasksList}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Todo;
