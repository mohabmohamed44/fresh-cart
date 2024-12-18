import React, { useEffect, useContext, useState } from "react";
import Style from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import ghost from "../../assets/ghost-img.png";
import { Bars } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Cart() {
  const {
    getCart,
    numOfCartItems,
    totalPrice,
    productsCart,
    updateCartQuantity,
    deleteItem,
    deleteCart,
  } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isError, setIsError] = useState(false); // Track error state

  const fetchCart = async () => {
    try {
      setIsLoading(true); // Start loading
      await getCart(); // Fetch the cart
      setIsError(false); // Reset error state
    } catch (error) {
      console.error("Error fetching cart:", error);
      setIsError(true); // Set error state
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Delete Cart of a User
  async function deleteUserCart() {
    let flag = await deleteCart();
    if (flag) {
      toast.success("Cart deleted successfully");
    } else {
      toast.error("Error deleting cart");
    }
  }

  async function updateCart(id, count) {
    try {
      await updateCartQuantity(id, count);
      toast.success("Product quantity updated successfully");
    } catch (error) {
      toast.error("Failed to update product quantity");
    }
  }
  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl font-medium text-red-600">
          Failed to load cart. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl text-center mt-12 mb-10">Cart</h2>
      <h2 className="text-3xl text-center mb-10 font-medium">
        Number of Cart Items: {numOfCartItems}
      </h2>
      <h2 className="text-2xl text-center mb-10 font-medium">
        Total Price: {totalPrice} EGP
      </h2>
      {productsCart?.length === 0 ? (
        <div className="text-center mt-10 flex items-center justify-center flex-col">
          <img src={ghost} className="w-1/3 max-w-md" alt="ghost-img" />
          <p className="text-xl font-medium mb-12">Your cart is empty.</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {productsCart?.map((product) => (
                <tr
                  key={product.product._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button"
                        onClick={() =>
                          updateCart(product.product._id, product.count - 1)
                        }
                      >
                        <span className="sr-only">Decrease quantity</span>
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                          aria-hidden="true"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="number"
                          className="bg-gray-50 w-14 border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block px-2.5 py-1"
                          defaultValue={product.count}
                          min="1"
                        />
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button"
                        onClick={() =>
                          updateCart(product.product._id, product.count + 1)
                        }
                      >
                        <span className="sr-only">Increase quantity</span>
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                          aria-hidden="true"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-red-600 hover:underline"
                      type="button"
                      onClick={() => deleteItem(product.product._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2 justify-between w-full">
        <Link to="/payment" className="flex-grow basis-1/2">
          <button className="h-14 w-full bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600 transition-colors text-lg">
            <i className="mr-4 fa-solid fa-cart-shopping"></i>
            Go to CheckOut
          </button>
        </Link>
      </div>
      <button
        className="h-14 mt-5 bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition-colors text-lg w-full"
        onClick={() => deleteUserCart()}
      >
        <i className="mr-4 fa-solid fa-trash"></i>
        Delete Cart
      </button>
    </>
  );
}
