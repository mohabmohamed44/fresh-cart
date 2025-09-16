import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  // If token exists, redirect to home
  // If not, render public page
  return token ? <Navigate to="/" /> : children;
}
