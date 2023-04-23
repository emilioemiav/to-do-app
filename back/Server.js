import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoute from "./routes/TaskRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(cors());

app.use(taskRoute);
app.listen(PORT, () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(process.env.DB_URL);
    })
    .catch((error) => console.error("Error connecting to MongoDB", error));
});

//eaa anda todo lcdsm
