import { useState } from 'react';
import TaskInput from './assets/components/TaskInput';
import TaskList from './assets/components/TaskList';

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

  const handleEditTask = (task, index) => {
    const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    updatedTasks.splice(index, 0, task);
    setTasks(updatedTasks);
  };

  return (
    <>
      <TaskInput inputValue={inputValue} setInputValue={setInputValue} handleAddTask={handleAddTask} />
      <TaskList tasks={tasks} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
    </>
  );
}

export default App;
