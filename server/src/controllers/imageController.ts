import { Request, Response } from "express";
import { uploadFileToS3 } from "../services/s3";
import Image from "../models/Image";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const originalName = req.file.originalname;

    const { fileUrl } = await uploadFileToS3(req.file);

    const image = new Image({
      originalName: originalName,
      fileName: req.body.imageName,
      url: fileUrl,
    });

    await image.save();

    res.json({ imageUrl: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: error });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const data = await Image.find();

    if (!data || data.length === 0) {
      console.log("No images found in the database.");
      return res.status(404).json({ message: "No images found" });
    }
    console.log("Fetched images:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};
