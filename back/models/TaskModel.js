import mongoose from "mongoose";

export const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = mongoose.model("Task", taskSchema);
export default task;
