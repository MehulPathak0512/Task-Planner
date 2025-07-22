
import React from 'react';
import Board from './components/Board';

const App = () => {
  return (
    <div className="app">
      <h1 className="app__title">Kanban Board</h1>
      <Board />
    </div>
  );
};

export default App;
