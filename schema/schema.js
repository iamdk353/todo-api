const mongoose = require("mongoose");
const taskModel = {
  content: {
    type: String,
    minlength: [2, "must be greater than 2 characters"],
    maxlength: 300,
    trim: true,
    required: [true, "must provide content"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
};
const taskSchema = new mongoose.Schema(taskModel);
module.exports = mongoose.model("Tasks", taskSchema);
