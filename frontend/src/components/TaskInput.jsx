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
        <input className="border-2 border-black" onChange={handleChange} value={inputValue} placeholder="Enter task" />
        <button type="submit" className="bg-blue-500 cursor-pointer">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
