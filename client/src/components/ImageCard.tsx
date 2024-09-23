import React from "react";
import moment from "moment";
import { ImageCardProps } from "../types";

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <>
      <img src={image.url} alt={image.originalName} />
      <h3>
        {image.filename
          ? image.filename
          : image.originalName.split(".").slice(0, -1).join(".")}
      </h3>
      <p>{moment(image.createdAt).format("YYYY-MM-DD")}</p>
    </>
  );
};

export default ImageCard;
