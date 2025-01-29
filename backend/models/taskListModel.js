import mongoose from 'mongoose';

const taskListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TaskList = mongoose.model('TaskList', taskListSchema);

export default taskListSchema;
