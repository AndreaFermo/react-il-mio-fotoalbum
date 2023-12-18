import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ImageModal = ({ image, onClose }) => {
  const { isLoggedIn } = useAuth();

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 py-12 md:px-24"
      onClick={handleModalClick}
    >
      <div className="bg-white rounded-lg relative lg:flex w-full h-full">
        <button
          className="absolute top-4 right-4 text-white cursor-pointer bg-customColorSecondary"
          onClick={onClose}
        >
          Close
        </button>
        <div className="p-4">
          <img
            src={`http://localhost:3002/${image.image}`}
            alt="Modal Image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className=" rounded-lg bg-white p-4">
          <h2 className="mb-3 text-3xl font-bold">Titolo: {image.title}</h2>
          <p className="mb-3 text-xl">Descrizione: {image.description}</p>
          {image.categories.length > 0 ? (
            <div>
              Categorie:
              {image.categories.map((category, index) => (
                <span key={index}> {category.title} </span>
              ))}
            </div>
          ) : null}
          {isLoggedIn && (
            <div className="absolute bottom-4 right-4">
              <Link to={`/image/edit/${image.id}`}>
                <button className="bg-customColorTertiary px-4 py-2 rounded text-white">
                  Modifica
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
