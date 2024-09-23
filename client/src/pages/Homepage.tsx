import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { Image } from "../types/index";
import ImageCard from "../components/ImageCard";
import FileUpload from "../components/FileUpload";

const Homepage = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get("/images");
      setImages(response.data);
    };

    fetchImages();
  }, []);

  return (
    <div className="w-screen">
      <header>Image Hosting Homepage</header>
      <div className="flex justify-between">
        <div>Filters add later</div>
        <div>
          <FileUpload />
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default Homepage;
