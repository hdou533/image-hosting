import React from "react";
import { GrClose } from "react-icons/gr";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white rounded-md p-4 w-11/12 md:w-1/2 2xl:w-1/3 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <GrClose />
        </button>
        <div className="py-8 px-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
