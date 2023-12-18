import { useEffect, useState } from "react";
import instance from "../Axios";

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const getCategories = async () => {
    try {
      const response = await instance.get("/categories");
      setCategoriesList(response.data.categories);
      console.log(response.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategoryTitle(e.target.value);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      if (!newCategoryTitle.trim() == "") {
        await instance.post("/categories", { title: newCategoryTitle });
        setNewCategoryTitle("");
        getCategories();
      } else {
        alert("Il campo non può essere vuoto!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1>Sono le categorie</h1>
      <ul>
        {categoriesList.map((category) => (
          <li key={category.id} className="text-customColorSecondary">
            {category.title}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddCategory} className="mt-4">
        <label className="block text-sm font-medium text-customColorQuaternary w-80">
          Nuova Categoria:
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={newCategoryTitle}
            onChange={handleNewCategoryChange}
            className="block border p-2 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400 mb-8"
            placeholder="Nome categoria"
          />
        </div>
        <button
          type="submit"
          className="text-customColorSecondary border-2 rounded border-customColorSecondary p-4 hover:border-customColorQuaternary hover:scale-95 transition"
        >
          Aggiungi Categoria
        </button>
      </form>
    </div>
  );
};

export default Categories;
