import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Bars } from "react-loader-spinner";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle password update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error

    // Check if new password and confirmation match
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    // Check if new password is provided
    if (!newPassword || !currentPassword) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Make API request to change the password
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          currentPassword,
          password: newPassword,
          rePassword: confirmPassword,
        }
      );
      toast.success("Password has been updated successfully.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-medium text-center my-6">Update Password</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        {/* Current Password */}
        <div className="relative mb-6">
          <input
            type="password"
            id="currentPassword"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <label
            htmlFor="currentPassword"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Current Password
          </label>
        </div>

        {/* New Password */}
        <div className="relative mb-6">
          <input
            type="password"
            id="newPassword"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label
            htmlFor="newPassword"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            New Password
          </label>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type="password"
            id="confirmPassword"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label
            htmlFor="confirmPassword"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Confirm New Password
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={loading}
        >
          {loading ? (
            <Bars height={20} width={20} color="#fff" />
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
}
