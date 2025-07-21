
import React, { useEffect, useState } from 'react';
import Column from './Column';
import AddTaskForm from './AddTaskForm';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';
import '../assets/styles/components/_board.scss';

const initialData = {
  'To Do': [],
  'In Progress': [],
  'Done': [],
};

const Board = () => {
  const [tasks, setTasks] = useState(loadFromLocalStorage() || initialData);

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (content) => {
    const newTask = {
      id: Date.now().toString(),
      content,
      checked: false,
    };
    setTasks((prev) => ({
      ...prev,
      'To Do': [...prev['To Do'], newTask],
    }));
  };

  const updateTask = (column, taskId, updatedContent) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === taskId ? { ...task, content: updatedContent } : task
      ),
    }));
  };

  const deleteTask = (column, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }));
  };

  const toggleCheck = (column, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      ),
    }));
  };

  const moveTask = (sourceColumn, targetColumn, taskId) => {
    if (sourceColumn === targetColumn) return;
    const taskToMove = tasks[sourceColumn].find((t) => t.id === taskId);
    if (!taskToMove) return;

    setTasks((prev) => {
    const updatedSource = prev[sourceColumn].filter((t) => t.id !== taskId);
    const updatedTarget = [...prev[targetColumn], taskToMove];
    return {
      ...prev,
      [sourceColumn]: updatedSource,
      [targetColumn]: updatedTarget,
    };
    });
  };


  const onDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };

  const onDrop = (e, targetColumn) => {
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (sourceColumn === targetColumn) return;

    const draggedTask = tasks[sourceColumn].find((task) => task.id === taskId);
    if (!draggedTask) return;

    setTasks((prev) => {
      const sourceTasks = prev[sourceColumn].filter((task) => task.id !== taskId);
      const targetTasks = [...prev[targetColumn], draggedTask];
      return {
        ...prev,
        [sourceColumn]: sourceTasks,
        [targetColumn]: targetTasks,
      };
    });
  };

  return (
    <div className="board">
      <AddTaskForm addTask={addTask} />
      <div className="columns">
        {Object.keys(tasks).map((colName) => (
          <Column
            key={colName}
            name={colName}
            tasks={tasks[colName]}
            onDrop={onDrop}
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

export default Board;
