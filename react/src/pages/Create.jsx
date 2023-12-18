import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import instance from "../Axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("user")).id
  );
  const [categories, setCategories] = useState([]);
  const [published, setPublished] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const navegate = useNavigate();

  const getCategories = async () => {
    const mycategories = await axios.get("http://localhost:3002/categories");
    setCategoriesList(mycategories.data.categories);
  };

  const handleCheckboxChange = () => {
    setPublished(!published);
  };

  const handleCateoryChange = (value) => {
    const isCategoryChecked = categories.includes(value);

    if (isCategoryChecked) {
      const updatedCategories = categories.filter(
        (category) => category !== value
      );
      setCategories(updatedCategories);
    } else {
      setCategories([...categories, value]);
    }
  };

  const saveImage = async (e) => {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      image === "" ||
      !typeof published === "boolean"
    ) {
      alert("Please fill out all input complitly");
      return;
    }

    const formDataToSend = new FormData();

    const payload = {
      title,
      description,
      image,
      published,
      categories,
      userId,
    };

    console.log(payload);

    Object.keys(payload).forEach((key) => {
      if (key === "categories") {
        payload[key].forEach((category, index) => {
          formDataToSend.append(`${key}[${index}]`, category);
        });
      } else {
        formDataToSend.append(key, payload[key]);
      }
    });

    console.log(formDataToSend);

    try {
      const response = await instance.post("/images", formDataToSend);
      alert("Saved");

      navegate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold rext-2x1 mb-4 block text-center">
        Save Image
      </h2>
      <form onSubmit={saveImage}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="Enter Title"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            raw="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols="50"
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="Enter Long description..."
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="Enter Image URL"
          />
        </div>
        <div className="mt-4">
          <label>Published</label>
          <input
            type="checkbox"
            checked={published}
            onChange={handleCheckboxChange}
            className="ml-2"
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {categoriesList.map((category) => {
            return (
              <label key={category.id}>
                <input
                  type="checkbox"
                  value={category.id.toString()}
                  onChange={() => handleCateoryChange(category.id.toString())}
                  id={category.id}
                  checked={categories.includes(category.id.toString())}
                />
                <span className="ml-1">{category.title}</span>
              </label>
            );
          })}
        </div>
        <div>
          <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
