import React, { useState } from 'react';
import './_add-task-form.scss';


const AddTaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask(task.trim());
    setTask('');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-form__input"
        placeholder="Add new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="add-task-form__button">Add</button>
    </form>
  );
};

export default AddTaskForm;
