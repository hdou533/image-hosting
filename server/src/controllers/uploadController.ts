import { Request, Response } from "express";
import { uploadFileToS3 } from "../services/s3";
import Image from "../models/Image";

export const uploadController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const { fileUrl, originalName } = await uploadFileToS3(req.file);

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
