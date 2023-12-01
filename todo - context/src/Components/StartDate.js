import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const StartDate = ({
  startDate,
  setStartDate,
  subtasksList,
  setSubtasksList,
  subtaskId,
  setDateInTask,
}) => {
  const indexAgainstKey = subtasksList.findIndex(
    (subtask) => subtask.id === subtaskId
  );
  const [startDateClicked, setStartDateClicked] = useState(false);

  const updateStartDate = (data) => {
    const updatedSubTasksList = [...subtasksList];
    const objectToEdit = updatedSubTasksList[indexAgainstKey];
    objectToEdit.sdate = data;
    setSubtasksList(updatedSubTasksList);
    setDateInTask(updatedSubTasksList);
  };

  const handleOnChange = (data) => {
    setStartDate(data);
    setStartDateClicked(false);
    updateStartDate(data);
  };
  const start = subtasksList[indexAgainstKey];

  return (
    <>
      <span className="start-date" onClick={() => setStartDateClicked(true)}>
        {JSON.stringify(new Date(start.sdate).getDate())}/
        {JSON.stringify(new Date(start.sdate).getMonth() + 1)}
      </span>
      {startDateClicked ? (
        <DatePicker
          onChange={handleOnChange}
          clearIcon={null}
          value={startDate}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default StartDate;
