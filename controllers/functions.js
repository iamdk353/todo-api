const task = require("../schema/schema.js");

async function getAll(req, res) {
  try {
    const found = await task.find({});
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
const newPost = async (req, res) => {
  try {
    const created = await task.create(req.body);
    if (req.body) {
      res.status(201).json({ created });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await task.findOne({ _id: id });
    // finding the matching _id i.e is from monogdb to the id that we pass
    // console.log(found);
    if (!found) return res.status(404).json({ "id error": "id not found" });
    res.json(found);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const patchTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    // while using patch as a last parameter we need to pass
    // {
    //   new: true,
    //   runValidators: true,
    // }
    // cause new: true will updated the task to the new object that we pass
    // runValidators: true will run all validators to make sure that the task is properly updated
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await task.findByIdAndDelete({ _id: id });
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getAll,
  patchTaskById,
  deleteTaskById,
  getTaskById,
  newPost,
};
