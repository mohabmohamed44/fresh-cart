import React from "react";
import { Navigate } from "react-router-dom";
import Style from "./ProtectedRoute.module.css";

export default function ProtectedRoute({ children }) {
  // If token exists, render children
  // If no token, redirect to login
  return localStorage.getItem("token") ? children : <Navigate to={"/login"} />;
}