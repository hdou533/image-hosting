import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { GrAdd, GrClose } from "react-icons/gr";

interface FormData {
  image: File | null;
  imageName?: string;
}

const FileUpload = ({ onClose }) => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      if (data.image) {
        formData.append("image", data.image); // Append the image to formData
        console.log("FormData before sending:", formData); // Log FormData
      } else {
        console.error("No file selected.");
        return;
      }
      if (data.imageName) {
        formData.append("imageName", data.imageName);
      }

      const res = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 0;
            const current = progressEvent.loaded;
            setUploadProgress(Math.round((current * 100) / total));
          },
        }
      );

      setUploadStatus(`File uploaded successfully: ${res.data.imageUrl}`);

      setTimeout(() => {
        onClose(); // Close the modal after a short delay
      }, 1000);
    } catch (error) {
      console.error(error);
      setUploadStatus(
        `Error uploading file: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      console.log("Selected file:", selectedFile); // Log the selected file
      setValue("image", selectedFile); // Set the file in the form state
      setImagePreview(URL.createObjectURL(selectedFile)); // Create a preview URL
      console.log("Image value set in form state:", watch("image")); // Log the current value of the image field
    } else {
      console.log("No file selected."); // Log if no file is selected
    }
  };

  const removeImage = () => {
    setValue("image", null);
    setImagePreview(null); // Clear the image preview
  };

  useEffect(() => {
    // Clean up the URL.createObjectURL() on unmount or when imagePreview changes
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="z-10">
        <label
          htmlFor="file-upload"
          className="my-4 flex items-center justify-center
                      w-full h-32 border-2 border-dashed border-gray-300 
                      rounded-lg cursor-pointer hover:border-blue-500
                      transition duration-200"
        >
          <input
            id="file-upload"
            type="file"
            {...register("image", { required: "File is required." })} // Register the file input with a custom error message
            className="hidden"
            onChange={handleFileInput}
          />
          <GrAdd className="text-6xl text-gray-500" />
        </label>
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}{" "}
        {/* Display validation error */}
        {imagePreview && (
          <div className="relative my-4 w-1/3">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-full h-auto object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-md
                       hover:bg-red-600 transition duration-200"
            >
              <GrClose className="text-white text-sm" />
            </button>
          </div>
        )}
        <input
          type="text"
          {...register("imageName")}
          placeholder="Image Name (optional)"
          className="block w-full border border-gray-300 rounded-lg p-2
                       focus:border-blue-500 focus:ring-blue-500
                       focus:outline-none"
        />
        {uploadProgress !== null && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{uploadProgress}%</p>
          </div>
        )}
        <button
          type="submit"
          className="mt-4 text-white bg-blue-500 px-2 py-1 rounded-md"
        >
          Upload
        </button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
