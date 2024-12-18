import React from "react";
import notFound from "../../assets/error.svg";
import Style from "./Notfound.module.css";

export default function Notfound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen text-center">
      <img
        src={notFound}
        alt="Not Found"
        className="w-1/2 max-w-md lg:max-w-lg"
      />
      <h1 className="text-3xl font-bold text-gray-800 mt-6">Page Not Found</h1>
      <p className="text-gray-600 text-lg mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
      >
        Back to Home
      </a>
    </div>
  );
}
