// TaskCard.jsx
import React, { useState } from 'react';
import '../assets/styles/components/_task-card.scss';

const TaskCard = ({ task, column, onDragStart, deleteTask, updateTask, toggleCheck, moveTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);
  const [showMenu, setShowMenu] = useState(false);

  const handleSave = () => {
    updateTask(column, task.id, editedContent);
    setIsEditing(false);
  };

  const handleMove = (targetColumn) => {
    moveTask(column, targetColumn, task.id);
    setShowMenu(false);
  };

  const columns = ['To Do', 'In Progress', 'Done'].filter((col) => col !== column);

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id, column)}
    >
      {isEditing ? (
        <div className="task-card__edit">
          <input
            type="text"
            className="task-card__input"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button className="task-card__save-btn" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="task-card__top">
          <span className={`task-card__text ${task.checked ? 'task-card__text--checked' : ''}`}>
            {task.content}
          </span>

          <div className="task-card__actions">
            <button className="task-card__edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="task-card__delete-btn" onClick={() => deleteTask(column, task.id)}>Delete</button>
            <div className="task-card__menu">
              <button
                className="task-card__menu-toggle"
                onClick={() => setShowMenu(!showMenu)}
              >
                ⋮
              </button>
              {showMenu && (
                <ul className="task-card__menu-options">
                  {columns.map((targetCol) => (
                    <li
                      key={targetCol}
                      className="task-card__menu-item"
                      onClick={() => handleMove(targetCol)}
                    >
                      Move to {targetCol}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
