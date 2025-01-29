import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    taskList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaskList',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
