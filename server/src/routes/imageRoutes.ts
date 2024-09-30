import express from "express";
import upload from "../middlewares/upload";
import { uploadImage, getImage } from "../controllers/imageController";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);

router.get("/images", getImage);

export default router;
