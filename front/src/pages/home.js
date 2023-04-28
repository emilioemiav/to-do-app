import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  const [editingTask, setEditingTask] = useState(null);
  const [, setEditingValue] = useState("");

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
  function handleEditButtonClick(task) {
    setEditingTask(task);
    setEditingValue(task.name);
  }

  function handleEditTask(id, newName) {
    axios
      .put(`http://localhost:5000/task/${id}`, { name: newName })
      .then(() => {
        console.log("editado");
        setTasks(
          tasks.map((task) => {
            if (task._id === id) {
              return { ...task, name: newName };
            } else {
              return task;
            }
          })
        );
        setEditingTask(null);
        setEditingValue("");
        this.setState({
          editingValue: setEditingValue,
        });
      });
  }
  return (
    <div className="flex items-center justify-center h-screen bg-slate-600 ">
      <div className="p-8 bg-gray-200  rounded-xl">
        <div className="p-4 ">
          <h1 className="flex justify-center text-2xl font-bold text-gray-700">
            Task List
          </h1>
          <ul className="flex justify-center m-4">
            <li>
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
            </li>
          </ul>
        </div>
        <ul>
          <div className="mt-4 p-4">
            {tasks.map((task) => (
              <li key={task.id} className="m-2">
                {editingTask?._id === task._id ? (
                  <>
                    <input
                      className="border rounded py-2 px-3"
                      type="text"
                      value={editingTask.name}
                      onChange={(e) =>
                        setEditingTask({ ...editingTask, name: e.target.value })
                      }
                    />
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold ml-2 py-2 px-4 rounded mr-2"
                      onClick={() => {
                        handleEditTask(editingTask._id, editingTask.name);
                        setEditingTask(null);
                      }}
                    >
                      <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className="border rounded py-2 px-3"
                      type="text"
                      value={task.name}
                      onChange={(e) => setEditingValue(e.target.value)}
                      readOnly={true}
                      style={{ cursor: "default" }}
                    />
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold ml-2 py-2 px-4 rounded mr-2"
                      onClick={() => {
                        handleEditButtonClick(task);
                        setEditingValue(task.name);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleRemoveTask(task._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span className="ml-2">Remove</span>
                    </button>
                  </>
                )}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Home;
