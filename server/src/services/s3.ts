import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";
import dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY!,
  },
});

interface UploadParams {
  Bucket: string;
  Body: Buffer;
  Key: string;
  ContentType?: string;
}

export const uploadFileToS3 = async (file: Express.Multer.File) => {
  const fileStream = file.buffer;

  if (!fileStream) {
    throw new Error("File buffer is undefined");
  }

  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) {
    throw new Error("AWS S3 Bucket is not defined");
  }

  const key = `${Date.now()}_${file.originalname}`;

  const uploadParams: UploadParams = {
    Bucket: bucket,
    Body: fileStream,
    Key: key,
    ContentType: file.mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${key}`;
    const originalName = file.filename;

    return { fileUrl, originalName };
  } catch (error) {
    throw new Error(`Failed to upload file: ${error}`);
  }
};
