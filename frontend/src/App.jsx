import { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (updatedTask, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  return (
    <>
      <h1>Hello World</h1>
      <TaskInput inputValue={inputValue} setInputValue={setInputValue} handleAddTask={handleAddTask} />
      <TaskList tasks={tasks} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
    </>
  );
}

export default App;
