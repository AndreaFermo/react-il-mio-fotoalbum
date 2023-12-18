import React, { useState } from "react";
import ImageModal from "./ImageModal";
import { useAuth } from "../contexts/AuthContext";
import instance from "../Axios";

const Slider = ({ images }) => {
  const imagesPerPage = 12;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isLoggedIn } = useAuth();

  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const visibleImages = images.slice(startIndex, endIndex);

  const prevSlide = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
  };

  const nextSlide = () => {
    setCurrentPage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const response = await instance.delete(`/images/${imageId}`);
      alert("immagine cancellata");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-5 flex justify-center items-center">
        <div
          className="text-customColorSecondary hover:cursor-pointer border-2 rounded-3xl px-1 hover:bg-customColorTertiary"
          onClick={prevSlide}
        >
          {"<-"}
        </div>
        <div className="text-customColorSecondary">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <span
              key={pageIndex}
              className={`mx-2 cursor-pointer ${
                pageIndex + 1 === currentPage
                  ? "text-customColorTertiary"
                  : "text-customColorQuaternary"
              }`}
              onClick={() => setCurrentPage(pageIndex + 1)}
            >
              {pageIndex + 1}
            </span>
          ))}
        </div>
        <div
          className="text-customColorSecondary hover:cursor-pointer border-2 rounded-3xl px-1 hover:bg-customColorTertiary"
          onClick={nextSlide}
        >
          {"->"}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleImages.map((image, index) => (
          <div
            key={startIndex + index}
            className="relative transition hover:scale-105 hover:cursor-pointer rounded overflow-hidden"
            onClick={() => openModal(image)}
          >
            <img
              src={`http://localhost:3002/${image.image}`}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay per il titolo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-75 text-white">
              {image.title}
              {isLoggedIn && (
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Impedisce la propagazione del click all'immagine sottostante
                    handleDeleteImage(image.id);
                  }}
                >
                  x
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default Slider;
