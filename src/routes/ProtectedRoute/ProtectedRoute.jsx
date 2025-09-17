<<<<<<< HEAD:src/routes/ProtectedRoute/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  // If token exists, render children
  // If no token, redirect to login
  return token ? children : <Navigate to="/login" />;
}
=======
import React from "react";
import { Navigate } from "react-router-dom";
import Style from "./ProtectedRoute.module.css";

export default function ProtectedRoute({ children }) {
  // If token exists, render children
  // If no token, redirect to login
  return localStorage.getItem("token") ? children : <Navigate to={"/login"} />;
}
>>>>>>> b3d621f (safe):src/Components/ProtectedRoute/ProtectedRoute.jsx
