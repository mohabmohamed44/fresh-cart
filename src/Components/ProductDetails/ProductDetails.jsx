import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id, categoryId } = useParams(); // destructure params
  const { addToCart, addToWishlist } = useContext(cartContext);

  const handleWishlistClick = (productId) => {
    if (wishlistProducts.includes(productId)) {
      setWishlistProducts(wishlistProducts.filter((id) => id !== productId)); // Remove from wishlist
      toast.error("Product removed from wishlist!");
    } else {
      setWishlistProducts([...wishlistProducts, productId]); // Add to wishlist
      addToWishlist(productId);
      toast.success("Product added to wishlist!");
    }
  };


  // Fetch product details
  const fetchProductDetails = (productId) => {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => {
        setProductDetails(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  };

  // Fetch related products by category
  const fetchRelatedProducts = (categoryId) => {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
      )
      .then((res) => {
        setRelatedProducts(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
    if (categoryId) {
      fetchRelatedProducts(categoryId);
    }
  }, [id, categoryId]); // Fixing dependency array

  useEffect(() => {
    if (productDetails?.category?._id) {
      fetchRelatedProducts(productDetails.category._id);
    }
  }, [productDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500">
        </div> */}
        <Bars />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading product details. Please try again later.
      </div>
    );
  }

  if (!productDetails) {
    return <div className="text-center mt-10">No product details found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 mt-8">
        <div className="flex justify-center items-center">
          <img
            src={productDetails.imageCover || "/default-placeholder.jpg"}
            alt={productDetails.title || "Product Image"}
            className="max-w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4 flex flex-col text-start w-full items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {productDetails.title}
          </h1>
          <p className="text-gray-600 text-md">{productDetails.description}</p>
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="text-2xl font-bold text-green-600">
                {productDetails.priceAfterDiscount > 0
                  ? productDetails.priceAfterDiscount
                  : productDetails.price}{" "}
                EGP
              </span>
              {productDetails.priceAfterDiscount > 0 &&
                productDetails.price !== productDetails.priceAfterDiscount && (
                  <span className="text-red-500 line-through ml-2">
                    {productDetails.price} EGP
                  </span>
                )}
            </div>

            <div className="flex items-center space-x-2 text-yellow-500">
              <i className="fas fa-star"></i>
              <span className="text-gray-700">
                {productDetails.ratingsAverage} (
                {productDetails.ratingsQuantity} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold">Category</h2>
            <p className="text-emerald-500">{productDetails.category.name}</p>
          </div>
          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
            onClick={() => {
              console.log(`Added ${productDetails.title} to cart`);
              addToCart(productDetails);
              toast.success("Product added to cart!");
            }}
          >
            <i className="fas fa-shopping-cart mr-2"></i>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product._id}
              className="relative group border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link
                to={`/productDetails/${product._id}/${product.category._id}`}
                className="block"
              >
                <div className="relative">
                  {product.imageCover ? (
                    <img
                      src={product.imageCover}
                      alt={product.title || "Product Image"}
                      className="w-full object-cover h-full rounded"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  {/* Sale Badge */}
                  {typeof product?.priceAfterDiscount === "number" &&
                    product?.priceAfterDiscount > 0 &&
                    typeof product?.price === "number" &&
                    product?.price > product?.priceAfterDiscount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white py-1 px-3 rounded-full text-xs font-bold">
                        Sale
                      </div>
                    )}
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title.split(" ", 2).join(" ")}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {product.category.name}
                  </p>
                  <div className="flex items-center justify-between">
                    {product.priceAfterDiscount ? (
                      <div>
                        <span className="text-red-500 line-through">
                          {product.price} EGP
                        </span>
                        <span className="text-green-600 font-bold ml-2">
                          {product.priceAfterDiscount} EGP
                        </span>
                      </div>
                    ) : (
                      <span className="text-green-600 font-bold">
                        {product.price} EGP
                      </span>
                    )}
                    <div className="flex items-center text-yellow-500">
                      <i className="fas fa-star"></i>
                      <span className="text-gray-700 ml-1">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Heart icon button for Wishlist */}
              <button
                className={`absolute top-4 right-4 bg-transparent p-2 rounded-full shadow-md hover:shadow-xl transition-opacity duration-300 ${
                  wishlistProducts.includes(product._id)
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
                onClick={() => handleWishlistClick(product._id)}
              >
                <i
                  className={`fa-heart ${
                    wishlistProducts.includes(product._id)
                      ? "fa-solid" 
                      : "fa-regular"
                  }`}
                ></i>
              </button>

              {/* Add to Cart button */}
              <button
                className="absolute bottom-4 right-4 bg-green-600 text-white py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => {
                  addToCart(product._id);
                  toast.success("Product added to cart!");
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
