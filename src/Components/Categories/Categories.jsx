import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";

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
      <div className="flex justify-center items-center h-screen">
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
      <h2 className="text-2xl font-semibold text-center mt-12">Categories</h2>
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/categories/${category._id}`} // Link to the dynamic route
              className="flex flex-col items-center justify-center w-40 p-4 bg-white shadow-md rounded-lg border hover:bg-gray-100"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full rounded-md object-cover"
              />
              <p className="mt-2 text-lg font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
