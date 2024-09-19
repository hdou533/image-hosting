import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  image: FileList;
  imageName?: string;
}

const FileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);

        if (data.imageName) {
          formData.append("imageName", data.imageName);
        }

        const res = await axios.post(
          "http://localhost:3000/uploads",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUploadStatus(`File uploaded successfully: ${res.data.imageUrl}`);
      } else {
        setUploadStatus("No file selected."); // Handle case where no file is selected
      }
    } catch (error) {
      console.error(error); // Log error for debugging
      setUploadStatus(
        `Error uploading file: ${
          error instanceof Error ? error.message : error
        }`
      ); // Improved error message
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          {...register("image", { required: true })} // Correct registration
        />
        <input
          type="text"
          {...register("imageName")}
          placeholder="Image Name (optional)"
        />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
