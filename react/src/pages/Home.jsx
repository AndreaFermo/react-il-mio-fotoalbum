import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";

const Home = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getImages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3002/images/public");
      console.log(response.data.result);
      setImages(response.data.result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <label htmlFor="search" className="text-customColorSecondary pe-3">
        Cerca:
      </label>
      <input
        id="search"
        type="text"
        className="mb-5 rounded border-2 border-customColorSecondary"
        placeholder="Titolo..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {!isLoading ? (
        <Slider images={filteredImages}></Slider>
      ) : (
        <h2>Sto caricando le immagini</h2>
      )}
    </div>
  );
};

export default Home;
