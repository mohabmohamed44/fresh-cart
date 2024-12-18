import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";

// API function to fetch brands
const fetchBrands = async () => {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );
  return data.data; // Ensure this matches the API response structure
};

export default function Brands() {
  // Use React Query to manage data fetching
  const {
    data: brands = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars height="80" width="80" ariaLabel="loading-indicator" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-white container mx-auto px-4 py-8">
      <h2 className="text-3xl text-center mt-12 mb-10">Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <Link
            to={`/brands/${brand._id}`}
            key={brand._id}
            className="flex flex-col items-center p-4 rounded-lg border shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={brand.image}
              alt={brand.name || "Brand Logo"}
              className="w-32 h-32 object-contain mb-4"
            />
            <span className="text-center font-medium">{brand.name || "Unnamed Brand"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}