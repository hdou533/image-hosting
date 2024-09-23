import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = 3000;

mongoose
  .connect(process.env.MONGO_DB as string)
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());

app.use("/api", imageRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
