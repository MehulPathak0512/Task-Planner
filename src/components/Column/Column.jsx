import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './_column.scss';

const Column = ({ name, tasks, onDrop, onDragStart, deleteTask, updateTask, toggleCheck, moveTask }) => {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, name)}
    >
      <h2 className="column__title">{name}</h2>
      <div className="column__tasks">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            column={name}
            onDragStart={onDragStart}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleCheck={toggleCheck}
            moveTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;