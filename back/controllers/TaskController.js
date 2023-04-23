import task from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await task.find();
    res.json(tasks);
    // console.log("get");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createTask = async (req, res) => {
  const { name } = req.body;
  const newTask = new task({
    name,
  });

  try {
    newTask
      .save()
      .then((task) => {
        res.json({ mensaje: "tarea agregada", task });
      })
      .catch((error) => console.error(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const update = req.body;

  try {
    const taskUpdate = await task.findByIdAndUpdate(taskId, update);
    res.status(200).send({ mensaje: "tarea editada", task: taskUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await task.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ mensaje: "Tarea eliminada", task: deletedTask });
  } catch (error) {
    res.status(500).json(error);
  }
};

/*export const confirmTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { completed: req.params.completed },
      req.body,
      {}
    );
    res.status(200).json({ mensaje: "Task confirmada correctamente", task });
  } catch (error) {
    res.status(500).json(error);
  }
};*/
