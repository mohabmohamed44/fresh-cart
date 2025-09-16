import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import Register from "./Components/Register/Register";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import WhishList from "./Components/WishList/WishList";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./routes/publicRoute/PublicRoute";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import SpecificBrand from "./Components/SpecificBrand/SpecificBrand";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import { UserContextProvider } from "./Context/UserContext";
import { CartContextProvider } from "./Context/CartContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import "./App.css";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "categories/:categoryId", element: <ProtectedRoute><CategoryDetails/></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "productDetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "brands/:id", element: <ProtectedRoute><SpecificBrand /></ProtectedRoute> },
      { path: "whishlist", element: <ProtectedRoute><WhishList /></ProtectedRoute> },
      { path: "payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },

      // ✅ Public routes if there is no token in local storage or Cookies
      { path: "login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "register", element: <PublicRoute><Register /></PublicRoute> },
      { path: "forgot", element: <PublicRoute><ForgotPassword /></PublicRoute> },
      { path: "verify", element: <PublicRoute><VerifyResetCode /></PublicRoute> },
      { path: "reset", element: <PublicRoute><ResetPassword /></PublicRoute> },
      { path: "update", element: <PublicRoute><UpdatePassword /></PublicRoute> },

      // 404 if there is unavailable route
      { path: "*", element: <ProtectedRoute><Notfound /></ProtectedRoute> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="top-center" />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
