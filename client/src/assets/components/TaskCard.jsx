import { useState } from 'react';

const TaskCard = ({ task, taskIndex, handleEditTask, handleDeleteTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [taskValue, setTaskValue] = useState('');

  const handleDeleteClick = () => {
    handleDeleteTask(taskIndex);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
    setTaskValue(task);
  };

  const handleChange = (e) => {
    setTaskValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditTask(taskValue, taskIndex);
    setEditMode(false);
  };

  return (
    <>
      <div>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <input value={taskValue} onChange={handleChange} />
          </form>
        ) : (
          <p>{task}</p>
        )}
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </>
  );
};

export default TaskCard;
