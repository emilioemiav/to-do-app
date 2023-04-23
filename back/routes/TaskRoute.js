import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/TaskController.js";
import { Router } from "express";

const taskRoute = Router();

taskRoute.get("/task", getTasks);
taskRoute.post("/task", createTask);
taskRoute.put("/task/:id", updateTask);
taskRoute.delete("/task/:id", deleteTask);

export default taskRoute;
