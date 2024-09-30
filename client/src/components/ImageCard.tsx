import React, { useState } from "react";
import moment from "moment";
import { ImageCardProps } from "../types";

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(image.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex flex-col gap-2">
      <img
        src={image.url}
        alt={image.originalName}
        className="w-full h-56 object-cover rounded-sm mx-auto"
      />
      <h3 className="font-semibold text-xl">
        {image.filename
          ? image.filename
          : image.originalName.split(".").slice(0, -1).join(".")}
      </h3>
      <p>{moment(image.createdAt).format("YYYY-MM-DD")}</p>
      <div className="flex justify-between items-center gap-2">
        <p className="overflow-x-scroll whitespace-nowrap">{image.url}</p>
        <button
          onClick={handleCopy}
          className="bg-blue-500 text-white px-2 py-1 rounded-md"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
