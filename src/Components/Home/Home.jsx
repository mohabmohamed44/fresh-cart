import React, { useState, useEffect } from "react";
import Style from "./Home.module.scss";
import Products from "../Products/Products";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
