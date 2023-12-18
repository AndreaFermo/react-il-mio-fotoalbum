import instance from "../Axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const getImages = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get("images");
      console.log(response.data.result);
      setImages(response.data.result);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-center text-customColorTertiary text-3xl mb-5">
        Benvenuto {user.email}
      </h2>
      <div className="flex justify-between items-center mb-8">
        <div>
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
        </div>
        <Link
          className="text-customColorSecondary border-2 rounded border-customColorSecondary p-4 hover:border-customColorQuaternary hover:scale-95 transition"
          to="/categories"
        >
          Categorie
        </Link>
        <Link
          className="text-customColorSecondary border-2 rounded border-customColorSecondary p-4 hover:border-customColorQuaternary hover:scale-95 transition"
          to="/create"
        >
          Salva nuova immagine
        </Link>
      </div>

      {!isLoading ? (
        <Slider images={filteredImages}></Slider>
      ) : (
        <h2>Sto caricando le immagini</h2>
      )}
    </div>
  );
};

export default Dashboard;
