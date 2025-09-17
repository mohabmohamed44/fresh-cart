<<<<<<< HEAD
import React from "react";
import Navbar from "../../Components/NavBar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

export default function Layout() {
  const location = useLocation();

  const hideFooter_Navbar = [
    "/login",
    "/register",
    "/forgot",
    "/verify",
    "/reset",
    "/update",
  ];
  return (
    <>
        {!hideFooter_Navbar.includes(location.pathname) && <Navbar />}
        <div className="container py-10 px-3 md:px-2 mx-auto max-w-screen-xl">
          <Navbar />
          <div className="container py-10 px-3 md:px-2 mx-auto max-w-screen-xl overflow-x-hidden">
            <Outlet />
          </div>
        </div>
        {!hideFooter_Navbar.includes(location.pathname) && <Footer />}
    </>
  );
}
=======
import React from "react";
import Navbar from "../../Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-10 px-3 md:px-2 mx-auto max-w-screen-xl overflow-x-hidden">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
>>>>>>> b3d621f (safe)
