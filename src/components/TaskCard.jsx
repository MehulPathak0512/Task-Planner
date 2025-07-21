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
      {/* <input
        type="checkbox"
        checked={task.checked}
        onChange={() => toggleCheck(column, task.id)}
      /> */}
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
      <button className="delete-btn" onClick={() => deleteTask(column, task.id)}>Delete</button>

      {/* ➕ 3-dot menu */}
      <div className="task-menu">
        <button className="menu-3dot" onClick={() => setShowMenu(!showMenu)}>⋮</button>
        {showMenu && (
          <ul className="task-menu-options">
            {columns.map((targetCol) => (
              <li key={targetCol} onClick={() => handleMove(targetCol)}>
                Move to {targetCol}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

// import React, { useState } from 'react';
// import '../assets/styles/components/_task-card.scss';

// const TaskCard = ({ task, column, onDragStart, deleteTask, updateTask, toggleCheck }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(task.content);

//   const handleSave = () => {
//     updateTask(column, task.id, editedContent);
//     setIsEditing(false);
//   };

//   return (
//     <div
//       className="task-card"
//       draggable
//       onDragStart={(e) => onDragStart(e, task.id, column)}
//     >
//       <input
//         type="checkbox"
//         checked={task.checked}
//         onChange={() => toggleCheck(column, task.id)}
//       />
//       {isEditing ? (
//         <>
//           <input
//             type="text"
//             value={editedContent}
//             onChange={(e) => setEditedContent(e.target.value)}
//           />
//           <button onClick={handleSave}>Save</button>
//         </>
//       ) : (
//         <>
//           <span className={task.checked ? 'checked' : ''}>{task.content}</span>
//           <button onClick={() => setIsEditing(true)}>Edit</button>
//         </>
//       )}
//       <button onClick={() => deleteTask(column, task.id)}>Delete</button>
//     </div>
//   );
// };

// export default TaskCard;
