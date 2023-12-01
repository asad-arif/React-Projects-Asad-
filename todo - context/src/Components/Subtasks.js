import React, { useContext, useEffect, useRef, useState } from 'react';
import ButtonsSubtask from './ButtonsSubtask';
import TodoContext from './todoContext';
const Subtasks = ({ clickedTaskIdProp }) => {
  const TodoC = useContext(TodoContext);
  const tasksListFromContext = TodoC.tasksList;
  const setTasksListFromContext = TodoC.setTasksList;
  const subtaskInputRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [subtasksList, setSubtasksList] = useState([]);
  const [subInputValue, setSubInputValue] = useState('');
  const [selectedSubtask, setSelectedSubtask] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [renderComponent, setRenderComponent] = useState();
  useEffect(() => {
    console.log('subtask executed');
  }, [renderComponent]);

  const generateID = () => {
    return Math.floor(Math.random() * (200 - 10 + 1) + 10);
  };

  const getClickedTaskIndex = () => {
    const temp = tasksListFromContext.findIndex(
      (task) => task.id === clickedTaskIdProp
    );
    return temp;
  };
  const getClickedSubTaskIndex = (subtaskId) => {
    const clickedSubtaskIndex = tasksListFromContext[
      clickedTaskIndex
    ].subTasks.findIndex((subtask) => subtask.id === subtaskId);
    return clickedSubtaskIndex;
  };
  const clickedTaskIndex = getClickedTaskIndex();
  //Add Subtask method
  const addSubtask = () => {
    if (
      subInputValue !== '' &&
      startDateRef.current.value &&
      endDateRef.current.value
    ) {
      const updatedTasksList = [...tasksListFromContext];
      updatedTasksList[clickedTaskIndex].subTasks = [
        ...updatedTasksList[clickedTaskIndex].subTasks,
        {
          id: generateID(),
          text: subInputValue,
          sdate: startDate,
          edate: endDate,
        },
      ];
      setTasksListFromContext(updatedTasksList);
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
    const clickedSubtaskIndex = getClickedSubTaskIndex(idToEdit);
    setSubInputValue(
      tasksListFromContext[clickedTaskIndex].subTasks[clickedSubtaskIndex].text
    );
    setStartDate(
      tasksListFromContext[clickedTaskIndex].subTasks[clickedSubtaskIndex].sdate
    );
    setEndDate(
      tasksListFromContext[clickedTaskIndex].subTasks[clickedSubtaskIndex].edate
    );
  };
  const cancelUpdate = () => {
    setSelectedSubtask(0);
    clearInput();
  };

  const updateTask = () => {
    const clickedSubtaskIndex = getClickedSubTaskIndex(selectedSubtask);
    tasksListFromContext[clickedTaskIndex].subTasks[clickedSubtaskIndex].text =
      subtaskInputRef.current.value;
    tasksListFromContext[clickedTaskIndex].subTasks[clickedSubtaskIndex].sdate =
      startDate;
    tasksListFromContext[clickedTaskIndex].subTasks[clickedSubtaskIndex].edate =
      endDate;

    setSelectedSubtask(0);
    clearInput();
  };

  //   Delete Subtask method
  const deleteSubtask = (idToDelete) => {
    const clickedSubtaskIndex = getClickedSubTaskIndex(idToDelete);
    const deletedItem = tasksListFromContext[clickedTaskIndex].subTasks.splice(
      clickedSubtaskIndex,
      1
    );
    setRenderComponent(deletedItem);
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
          {tasksListFromContext[clickedTaskIndex].subTasks.map((subtask) => (
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
