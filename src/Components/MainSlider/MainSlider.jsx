import React from "react";
import Slider from "react-slick";
import Slide_1 from "../../assets/images/slider-image-1.jpeg";
import Slide_2 from "../../assets/images/slider-image-2.jpeg";
import Slide_3 from "../../assets/images/slider-image-3.jpeg";
import grocery1 from "../../assets/images/grocery-banner.png";
import grocery2 from "../../assets/images/grocery-banner-2.jpeg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mb-10 mt-12">
        {/* Image Slider Section */}
        <div className="overflow-hidden">
          <Slider {...settings} className="mb-10">
            <div>
              <img
                src={Slide_1}
                alt="Fresh Grocery Item 1"
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
              />
            </div>
            <div>
              <img
                src={Slide_2}
                alt="Fresh Grocery Item 2"
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
              />
            </div>
            <div>
              <img
                src={Slide_3}
                alt="Fresh Grocery Item 3"
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
              />
            </div>
          </Slider>
        </div>

        {/* Grocery Banners Section */}
        <div className="flex flex-col">
          <img
            src={grocery1}
            alt="Grocery Banner 1"
            className="w-full h-[100px] sm:h-[150px] lg:h-[200px] object-cover"
          />
          <img
            src={grocery2}
            alt="Grocery Banner 2"
            className="w-full h-[100px] sm:h-[150px] lg:h-[200px] object-cover"
          />
        </div>
      </div>
    </>
  );
}
