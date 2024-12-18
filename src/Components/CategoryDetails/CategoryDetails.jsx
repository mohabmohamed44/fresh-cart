import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import ProductCard from "../ProductCard/ProductCard.jsx";
import axios from "axios";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const { getProductsInCustomList } = useContext(cartContext);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function getOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  async function getProducts(categoryId) {
    if (!categoryId) {
      setError("Invalid category ID");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("userToken");

      const productsResponse = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
        { headers: { token } }
      );

      const categoryResponse = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
        { headers: { token } }
      );

      if (productsResponse.data?.results > 0) {
        setProducts(productsResponse.data.data);
        setCategoryName(categoryResponse.data.data.name);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      if (err.response?.data?.message === "Expired Token. please login again") {
        getOut();
      } else {
        setError("Failed to load products. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (categoryId) {
      getProducts(categoryId);
    }
  }, [categoryId]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <Bars height="80" width="80" ariaLabel="loading-indicator" />
    </div>;
  }

  if (error) {
    return (
      <div className="container mx-auto text-center mt-10 bg-red-50 p-6 rounded-lg">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            {categoryName} Collection
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-gray-100 rounded-lg">
            <p className="text-2xl text-gray-600 font-semibold">
              No products found in this category.
            </p>
            <p className="text-gray-500 mt-4">
              We're updating our collection. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {products.map((product) => (
              <div className="col-span-1" key={product._id}>
                <ProductCard product={product} showSubcategory={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
