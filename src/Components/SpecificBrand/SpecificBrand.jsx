import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function SpecifBrand() {
  // State variables to manage brand data and loading state
  const [specificBrand, setSpecificBrand] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Extracting the brand ID from URL parameters
  let param = useParams();
  let id = param.id;

  // Function to fetch brand details
  async function getSpecificBrands(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setSpecificBrand(data.data); // Store brand data in state
      setIsLoading(false); // Update loading state to false
    } catch (error) {
      console.error("Error fetching brand details:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  }

  // Fetch brand details when component mounts or ID changes
  useEffect(() => {
    getSpecificBrands(id);
  }, [id]); // Dependency on `id` to fetch data when it changes

  return (
    <>
      {/* Helmet for SEO meta tags */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={`Discover our exclusive collection from Brand ${specificBrand.name}. Explore quality products that define style and elegance.`}
        />
        <title>{specificBrand.name}</title>
      </Helmet>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Bars
            visible={true}
            height="80"
            width="80"
            ariaLabel="Bars-loading"
          />
        </div>
      ) : (
        // Display the brand card with image and name
        <div className="container mx-auto pt-6">
          <div className="card mb-6 shadow-lg rounded-xl overflow-hidden">
            {/* Grid layout for mobile and desktop */}
            <div className="flex flex-col items-center p-6">
              {/* Brand Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={specificBrand.image}
                  className="w-full h-64 object-cover rounded-md"
                  alt={specificBrand.name}
                />
              </div>
              {/* Brand Info */}
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-800">
                  {specificBrand.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
