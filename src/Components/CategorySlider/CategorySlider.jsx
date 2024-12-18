import React, { useState, useEffect } from "react";
import Style from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";
import {Bars} from "react-loader-spinner";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  function getCategories() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  if(loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars />
      </div>
    )
  }

  if(error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-red-500">Error</p>
      </div>
    )
  }


  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Tablets and small desktops
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-col mb-10 items-center justify-center md:flex md:flex-col md:items-center md:justify-center"
            >
              <img
                src={category.image}
                className="w-full h-fit md:h-[250px] object-cover"
                alt={category.name}
              />
              <h3 className="font-medium text-gray-800 text-center mt-2">
                {category.name}
              </h3>
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </Slider>
    </>
  );
}
