import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  // If token exists, render children
  // If no token, redirect to login
  return token ? children : <Navigate to="/login" />;
}
