import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, handleEditTask, handleDeleteTask }) => {
  return (
    <div>
      {tasks.map((task, i) => (
        <TaskCard key={i} taskIndex={i} task={task} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
