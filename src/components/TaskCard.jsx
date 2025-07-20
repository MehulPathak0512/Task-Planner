
import React, { useState } from 'react';
import '../assets/styles/components/_task-card.scss';

const TaskCard = ({ task, column, onDragStart, deleteTask, updateTask, toggleCheck }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);

  const handleSave = () => {
    updateTask(column, task.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id, column)}
    >
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => toggleCheck(column, task.id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span className={task.checked ? 'checked' : ''}>{task.content}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => deleteTask(column, task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
