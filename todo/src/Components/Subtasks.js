import React, { useEffect, useRef, useState } from 'react';
import ButtonsSubtask from './ButtonsSubtask';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import StartDate from './StartDate';
import EndDate from './EndDate';

const Subtasks = ({ clickedTaskIdProp, tasksListProp, setTasksListProp }) => {
  const subtaskInputRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [subtasksList, setSubtasksList] = useState([]);
  const [subInputValue, setSubInputValue] = useState('');
  const [selectedSubtask, setSelectedSubtask] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const generateID = () => {
    return Math.floor(Math.random() * (200 - 10 + 1) + 10);
  };
  useEffect(() => {
    getDataFromLocalStorage();
  }, [clickedTaskIdProp]);

  const getDataFromLocalStorage = () => {
    const clickedTaskIndex = tasksListProp.findIndex(
      (task) => task.id === clickedTaskIdProp
    );
    const Data = JSON.parse(localStorage.getItem('AllTaskList')) || [];
    setSubtasksList(Data[clickedTaskIndex].subTasks);
  };

  const date = new Date();
  //Add Subtask method
  const addSubtask = () => {
    if (
      subInputValue !== '' &&
      startDateRef.current.value &&
      endDateRef.current.value
    ) {
      const newSubData = [
        ...subtasksList,
        {
          id: generateID(),
          text: subInputValue,
          sdate: startDate,
          edate: endDate,
        },
      ];
      setSubtasksList(newSubData);
      const clickedTaskIndex = tasksListProp.findIndex(
        (task) => task.id === clickedTaskIdProp
      );
      const updatedTasksList = [...tasksListProp];
      const objectToEdit = updatedTasksList[clickedTaskIndex];
      objectToEdit.subTasks = newSubData;
      setTasksListProp(updatedTasksList);
      localStorage.setItem('AllTaskList', JSON.stringify(updatedTasksList));
      clearInput();
      setSubInputValue('');
    }
  };

  const clearInput = () => {
    setSubInputValue('');
    setStartDate('');
    setEndDate('');
  };

  //   Edit Task method
  const editSubtask = (idToEdit) => {
    setSelectedSubtask(idToEdit);
    const indexToEdit = subtasksList.findIndex(
      (subtask) => subtask.id === idToEdit
    );
    setSubInputValue(subtasksList[indexToEdit].text);
    setStartDate(subtasksList[indexToEdit].sdate);
    setEndDate(subtasksList[indexToEdit].edate);
  };
  const cancelUpdate = () => {
    setSelectedSubtask(0);
    clearInput();
  };
  const updateTask = () => {
    //update subtasklist in child
    const indexToEdit = subtasksList.findIndex(
      (subtask) => subtask.id === selectedSubtask
    );
    const updatedSubtasksList = [...subtasksList];
    const objectToEdit = updatedSubtasksList[indexToEdit];
    objectToEdit.text = subtaskInputRef.current.value;
    objectToEdit.sdate = startDate;
    objectToEdit.edate = endDate;
    setSubtasksList(updatedSubtasksList);
    const newSubData = updatedSubtasksList;
    setSelectedSubtask(0);

    const clickedTaskIndex = tasksListProp.findIndex(
      (task) => task.id === clickedTaskIdProp
    );
    const updatedTasksList = [...tasksListProp];
    const objectToEdit1 = updatedTasksList[clickedTaskIndex];
    objectToEdit1.subTasks = newSubData;
    setTasksListProp(updatedTasksList);
    localStorage.setItem('AllTaskList', JSON.stringify(updatedTasksList));

    clearInput();
  };

  //   Delete Subtask method
  const deleteSubtask = (idToDelete) => {
    const newData = subtasksList.filter(
      (subtasktask) => subtasktask.id !== idToDelete
    );
    setSubtasksList(newData);
    const clickedTaskIndex = tasksListProp.findIndex(
      (task) => task.id === clickedTaskIdProp
    );
    const updatedTasksList = [...tasksListProp];
    const objectToEdit = updatedTasksList[clickedTaskIndex];
    objectToEdit.subTasks = [...newData];
    setTasksListProp(updatedTasksList);
    localStorage.setItem('AllTaskList', JSON.stringify(updatedTasksList));
  };

  const setDateInTask = (newSubData) => {
    const clickedTaskIndex = tasksListProp.findIndex(
      (task) => task.id === clickedTaskIdProp
    );
    const updatedTasksList = [...tasksListProp];
    const objectToEdit1 = updatedTasksList[clickedTaskIndex];
    objectToEdit1.subTasks = newSubData;
    setTasksListProp(updatedTasksList);
    localStorage.setItem('AllTaskList', JSON.stringify(updatedTasksList));
  };

  return (
    <div>
      <h4>SubTasks</h4>
      <div>
        <input
          className="task-input"
          type="text"
          ref={subtaskInputRef}
          value={subInputValue}
          onChange={(e) => setSubInputValue(e.target.value)}
        />
        S:
        <input
          className="date-input"
          type="date"
          ref={startDateRef}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        E:
        <input
          className="date-input"
          type="date"
          ref={endDateRef}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className={
            selectedSubtask ? 'hidden green-button' : 'inline green-button'
          }
          onClick={() => addSubtask()}
        >
          Add
        </button>
        <button
          className={
            selectedSubtask ? 'inline green-button' : 'hidden green-button'
          }
          onClick={() => updateTask()}
        >
          Update
        </button>
        <button
          style={{ backgroundColor: '#D83F31 ', padding: '10px px' }}
          className={
            selectedSubtask ? 'inline green-button' : 'hidden green-button'
          }
          onClick={() => cancelUpdate()}
        >
          X
        </button>
      </div>
      {/* subtasks list container */}
      <div>
        <ol>
          {subtasksList.map((subtask) => (
            <div className="subtask-list">
              <li key={subtask.id}>
                {subtask.text}
                <span className="task-status">
                  {new Date(subtask.edate).getTime() <= new Date().getTime()
                    ? 'Due'
                    : 'Upcomming'}
                </span>
                <div className="date">
                  {subtask.sdate.slice(5)}/{subtask.edate.slice(5)}
                  {/* <StartDate
                    startDate={startDate}
                    setStartDate={setStartDate}
                    subtasksList={subtasksList}
                    setSubtasksList={setSubtasksList}
                    subtaskId={subtask.id}
                    setDateInTask={setDateInTask}
                  />
                  -
                  <EndDate
                    endDate={endDate}
                    setEndDate={setEndDate}
                    subtasksList={subtasksList}
                    setSubtasksList={setSubtasksList}
                    subtaskId={subtask.id}
                    setTodoStatus={setTodoStatus}
                    setDateInTask={setDateInTask}
                  /> */}
                </div>
              </li>
              <ButtonsSubtask
                subtaskId={subtask.id}
                deleteHandler={deleteSubtask}
                editHandler={editSubtask}
                subtasksList={subtasksList}
                setSubtasksList={setSubtasksList}
              />
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Subtasks;
