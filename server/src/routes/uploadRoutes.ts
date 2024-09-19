import express from "express";
import upload from "../middlewares/upload";
import { uploadController } from "../controllers/uploadController";

const router = express.Router();

router.post("/uploads", upload.single("image"), uploadController);

export default router;
