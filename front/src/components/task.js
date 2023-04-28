const mongoose = require("mongoose");
import { useState } from "react";

const taskSchema = new mongoose.Schema({
  description: String,
});

const Task = mongoose.model("Task", taskSchema);

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Recuperar todas las tareas de la base de datos y guardarlas en el estado
    Task.find({}, (err, tasks) => {
      if (err) console.error(err);
      setTasks(tasks);
    });
  }, []);

  function handleAddTask() {
    // Crear una nueva tarea y guardarla en la base de datos
    const task = new Task({ description: newTask });
    task.save((err, task) => {
      if (err) console.error(err);
      setTasks([...tasks, task]);
      setNewTask("");
    });
  }

  function handleRemoveTask(id) {
    // Eliminar la tarea de la base de datos y actualizar el estado
    Task.findByIdAndRemove(id, (err) => {
      if (err) console.error(err);
      setTasks(tasks.filter((task) => task._id !== id));
    });
  }

  function handleEditTask(id, newDescription) {
    // Actualizar la tarea en la base de datos y actualizar el estado
    Task.findByIdAndUpdate(
      id,
      { description: newDescription },
      { new: true },
      (err, task) => {
        if (err) console.error(err);
        setTasks(
          tasks.map((task) => {
            if (task._id === id)
              return { ...task, description: newDescription };
            else return task;
          })
        );
      }
    );
  }

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="text"
              defaultValue={task.description}
              onBlur={(e) => handleEditTask(task._id, e.target.value)}
            />
            <button onClick={() => handleRemoveTask(task._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
