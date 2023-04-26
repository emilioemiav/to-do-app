import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [edit, setEdit] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/task")
      .then((res) => {
        setTasks(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function getTasks() {
    axios
      .get("http://localhost:5000/task")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddTask() {
    axios
      .post("http://localhost:5000/task", { name: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
        getTasks(); // Actualiza la lista de tareas después de agregar una nueva tarea
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function handleRemoveTask(id) {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/task/${id}`).then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
        console.log("eliminado");
      });
    }
  }

  function handleEditTask(id, newName) {
    axios
      .put(`http://localhost:5000/task/${id}`, { name: newName })
      .then(() => {
        setTasks(
          tasks.map((task) => {
            if (task._id === id) {
              return { ...task, name: newName };
            } else {
              return task;
            }
          })
        );
      });
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="p-8 bg-gray-200  rounded-xl">
        <div className="p-4 ">
          <h1 className="flex justify-center text-2xl font-bold text-gray-700">
            Task List
          </h1>
          <ul className="flex justify-center m-4">
            <input
              className="border rounded py-2 px-3 "
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded "
              type="submit"
              onClick={handleAddTask}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add
            </button>
          </ul>
        </div>
        <ul>
          <div className="mt-4 ">
            {tasks.map((task) => (
              <li key={task.id}>
                <input
                  className="border rounded py-2 px-3"
                  type="text"
                  value={task.name}
                  onChange={(e) => handleEditTask(task._id, e.target.value)}
                />
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold ml-2 py-2 px-4 rounded mr-2"
                  onClick={() => handleEditTask(task._id)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span className="ml-2">Edit</span>
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleRemoveTask(task._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span className="ml-2">Remove</span>
                </button>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Home;

//to do no renderiza al toque la tabla , hay q apretar f5 para q muestre el Tasko
