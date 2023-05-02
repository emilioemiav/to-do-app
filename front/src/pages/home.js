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
import SyncLoader from "react-spinners/SyncLoader";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  //

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

  const handleAddTask = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/task", { name: newTask })
      .then((response) => {
        setNewTask("");
        getTasks();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  <button
    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    onClick={() => handleRemoveTask(tasks._id)}
  >
    {loadingTasks[tasks._id] ? (
      <SyncLoader size={12} color="white" />
    ) : (
      <>
        <FontAwesomeIcon icon={faTrash} />
        <span className="ml-2">Remove</span>
      </>
    )}
  </button>;
  const handleRemoveTask = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    setLoadingTasks({
      ...loadingTasks,
      [id]: true,
    });

    axios
      .delete(`http://localhost:5000/task/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
        setLoadingTasks({
          ...loadingTasks,
          [id]: false,
        });
      })
      .catch(() => {
        setLoadingTasks({
          ...loadingTasks,
          [id]: false,
        });
      });
  };

  function handleEditButtonClick(task) {
    setEditingTask(task);
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
                type="submit"
                onClick={handleAddTask}
              >
                {loading ? (
                  <SyncLoader size={12} color="white" />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add
                  </>
                )}
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
                      onChange={(e) => {
                        setEditingTask({
                          ...editingTask,
                          name: e.target.value,
                        });
                      }}
                    />
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold ml-2 py-2 px-4 rounded mr-2"
                      onClick={() => {
                        handleEditTask(editingTask._id, editingTask.name);
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
                      readOnly={true}
                      style={{ cursor: "default" }}
                    />
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold ml-2 py-2 px-4 rounded mr-2"
                      onClick={() => {
                        handleEditButtonClick(task);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleRemoveTask(task._id)}
                    >
                      {loadingTasks[task._id] ? (
                        <SyncLoader size={12} color="white" />
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faTrash} />
                          <span className="ml-2">Remove</span>
                        </>
                      )}
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

//105 - 114 cmbio
