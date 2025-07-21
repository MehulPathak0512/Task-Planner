
import React from 'react';
import TaskCard from './TaskCard';
import '../assets/styles/components/_column.scss';

const Column = ({ name, tasks, onDrop, onDragStart, deleteTask, updateTask, toggleCheck,moveTask }) => {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, name)}
    >
      <h2>{name}</h2>
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
  );
};

export default Column;
