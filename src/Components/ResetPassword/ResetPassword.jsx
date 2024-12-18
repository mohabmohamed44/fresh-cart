import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import Style from "./ResetPassword.module.css";

export default function ResetPassword() {
  const [email, setEmail] = useState(""); 
  const [newPassword, setNewPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Validate password strength
  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number, and one special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  // Handle form submission for password reset
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!newPassword) {
      toast.error("New password is required.");
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { 
          email, 
          newPassword 
        }
      );
      
      toast.success("Password has been successfully reset.");
      navigate("/login"); // Redirect to login page after successful reset
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-sm bg-white p-6 rounded-lg shadow-md ${Style.form}`}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <Bars
              height={30}
              width={30}
              color="#ffffff"
              ariaLabel="loading"
            />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}