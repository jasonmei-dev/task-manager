import React from 'react';

const TaskInput = ({ inputValue, setInputValue, handleAddTask }) => {
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputValue} placeholder="Enter task" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskInput;
