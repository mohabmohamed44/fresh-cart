// import React, { useContext, useEffect } from "react";
// import { cartContext } from "../../Context/CartContext"; // Update path as needed
// import toast from "react-hot-toast";
// import { Bars } from "react-loader-spinner";

// export default function Wishlist() {
//   const { wishlistItems, getWishlist, removeFromWishlist } = useContext(cartContext);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {

//     getWishlist();
//   }, []);
//   if (wishlistItems.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500">Your wishlist is empty.</p>
//       </div>
//     );
//   }

  

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-medium mb-8 mt-4 text-center text-gray-800">
//         Your Wishlist
//       </h1>
//       <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
//         {wishlistItems?.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group relative"
//           >
//             <img
//               src={product?.imageCover}
//               alt={product?.title}
//               className="w-full h-64 object-contain"
//             />
//             <div className="p-4">
//               <h2 className="font-bold text-lg text-gray-800 mb-2 truncate">
//                 {product?.title}
//               </h2>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-800 font-bold">
//                   {product?.price} EGP
//                 </span>
//                 <div className="flex items-center text-yellow-500">
//                   <i className="fas fa-star mr-1"></i>
//                   <span className="text-gray-700">
//                     {product?.ratingsAverage}
//                   </span>
//                 </div>
//               </div>
//               <button
//                 onClick={() => removeFromWishlist(product?._id)}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext"; // Update path as needed
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";

export default function Wishlist() {
  const { wishlistItems, getWishlist, removeFromWishlist } = useContext(cartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getWishlist()
      .then(() => setLoading(false))
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load wishlist. Please try again later.</p>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8 mt-4 text-center text-gray-800">
        Your Wishlist
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {wishlistItems?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group relative"
          >
            <img
              src={product?.imageCover}
              alt={product?.title}
              className="w-full h-64 object-contain"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg text-gray-800 mb-2 truncate">
                {product?.title}
              </h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-bold">
                  {product?.price} EGP
                </span>
                <div className="flex items-center text-yellow-500">
                  <i className="fas fa-star mr-1"></i>
                  <span className="text-gray-700">
                    {product?.ratingsAverage}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(product?._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
