import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from './Categories.module.scss';
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCategories() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(response.data.data); // Correctly set the fetched categories
      setLoading(false); // Set loading to false
    } catch (err) {
      setError(err.message); // Set error message
      setLoading(false); // Set loading to false
    }
  }

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  if (loading) {
    return (
      <div className={Style.loading}>
        <Bars height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <p>Error loading categories: {error}</p>
          <button
            onClick={fetchCategories}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
          <title>Categories</title>
          <meta name="description" content="Categories page" />
          <meta name="keywords" content="Categories, E-commerce" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Mohab Mohammed" />
      </Helmet>
      <h2 className={Style.categories_heading}>Categories</h2>
      <div className="max-w-screen-lg mx-auto px-6 py-7">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/categories/${category._id}`} // Link to the dynamic route
              className="flex flex-col items-center justify-center w-40 p-4 bg-white shadow-md rounded-lg border hover:bg-gray-100"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full rounded-md object-cover mb-2"
              />
              <p className="mt-2 text-lg font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
