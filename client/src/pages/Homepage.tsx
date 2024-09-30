import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { Image } from "../types/index";
import ImageCard from "../components/ImageCard";
import FileUpload from "../components/FileUpload";
import { GrAdd } from "react-icons/gr";
import Modal from "../components/Modal";

const Homepage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("/images");
      setImages(response.data);
    };

    fetchImages();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>Filters add later</div>
        <button
          onClick={handleClick}
          className="flex gap-2 justify-between items-center border-dashed border-2 border-gray-500 rounded-md p-2"
        >
          <GrAdd className="font-bold text-gray-700" />
          <span className="font-semibold text-gray-700">Upload Image</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.length ? (
          images.map((image) => (
            <div key={image._id}>
              <ImageCard image={image} />
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FileUpload onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Homepage;
