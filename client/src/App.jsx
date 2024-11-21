import { useState } from 'react';
import TaskInput from './assets/components/TaskInput';
import TaskList from './assets/components/TaskList';

function App() {
  return (
    <>
      <TaskInput />
      <TaskList />
    </>
  );
}

export default App;
