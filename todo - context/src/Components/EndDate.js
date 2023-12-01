import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const StartDate = ({
  endDate,
  setEndDate,
  subtasksList,
  setSubtasksList,
  subtaskId,
  setDateInTask,
  setTodoStatus,
}) => {
  const indexAgainstKey = subtasksList.findIndex(
    (subtask) => subtask.id === subtaskId
  );
  const [endDateClicked, setEndDateClicked] = useState(false);
  useEffect(() => {
    getTodoStatus();
  });
  const getTodoStatus = () => {
    let todoStatus;
    const currentDate = new Date();
    if (currentDate < new Date(end.edate)) {
      todoStatus = 'Up Comming';
    } else if (currentDate > new Date(end.edate)) {
      todoStatus = 'Past due';
    }
    setTodoStatus(todoStatus);
  };
  const updateEndDate = (data) => {
    const updatedSubTasksList = [...subtasksList];
    const objectToEdit = updatedSubTasksList[indexAgainstKey];
    objectToEdit.edate = data;
    setSubtasksList(updatedSubTasksList);
    setDateInTask(updatedSubTasksList);
  };

  const handleOnChange = (data) => {
    setEndDate(data);
    setEndDateClicked(false);
    updateEndDate(data);
  };
  const end = subtasksList[indexAgainstKey];
  return (
    <>
      <span className="start-date" onClick={() => setEndDateClicked(true)}>
        {JSON.stringify(new Date(end.edate).getDate())}/
        {JSON.stringify(new Date(end.edate).getMonth() + 1)}
      </span>
      {endDateClicked ? (
        <DatePicker
          onChange={handleOnChange}
          clearIcon={null}
          value={endDate}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default StartDate;
