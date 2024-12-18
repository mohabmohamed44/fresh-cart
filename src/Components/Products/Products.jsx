import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ghost from "../../assets/ghost-img.png";
import { Bars } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

// Fetch function to get products
const fetchProducts = async () => {
  const res = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  return res.data.data;
};

export default function Products() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState({});

  // Cart Context
  let { addToCart, addToWishlist } = useContext(cartContext);

  // Function to toggle wishlist status
  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle the wishlist status for the product
    }));
    // assuming this adds the product to your server-side wishlist
    addToWishlist(id); 
  };

  // Updated useQuery with object syntax
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    onError: (error) => {
      console.error("Error fetching products:", error);
    },
  });

  // Function to handle add To Cart Logic
  async function addProductToCart(id) {
    let flag = await addToCart(id);
    if (flag) {
      toast.success("Product added successfully to your Cart");
    } else {
      toast.error("Error adding Product to your Cart");
    }
  }

  // Loading Component
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars />
      </div>
    );
  }

  // Error Handling
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <img src={ghost} alt="not found" />
          <button
            onClick={refetch}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8 mt-4 text-center text-gray-800">
        Our Products
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group relative"
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Wishlist Heart Icon */}
            <button
              onClick={() => toggleWishlist(product._id)}
              className={`absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-full shadow-md ${
                wishlist[product._id] ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              <i
                className={`fa-regular fa-heart h-5 w-5 transition-colors duration-300 ${
                  wishlist[product._id]
                    ? "text-red-500 hover:text-red-400"
                    : "text-gray-500 hover:text-red-500"
                }`}
              ></i>
            </button>

            <Link
              to={`/productDetails/${product._id}/${product.category.name}`}
              className="block"
            >
              <div className="relative overflow-hidden h-full">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                {product.priceAfterDiscount ? (
                  <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    SALE
                  </span>
                ) : null}
              </div>

              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-800 mb-2 truncate">
                  {product.title.split(" ", 2).join(" ")}
                </h2>

                <h3 className="text-sm text-emerald-500 mb-2">
                  {product.category.name}
                </h3>

                <div className="flex justify-between items-center">
                  <div>
                    {product.priceAfterDiscount ? (
                      <div className="flex items-center">
                        <span className="text-red-500 line-through mr-2 text-sm">
                          {product.price} EGP
                        </span>
                        <span className="text-green-600 font-bold">
                          {product.priceAfterDiscount} EGP
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-800 font-bold">
                        {product.price} EGP
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-yellow-500">
                    <i className="fas fa-star mr-1"></i>
                    <span className="text-gray-700">
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Add to Cart Button */}
            <div
              className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${
                hoveredProduct === product._id
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <button
                className="w-full bg-green-600 text-white py-3 hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                onClick={() => {
                  addProductToCart(product._id);
                }}
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}