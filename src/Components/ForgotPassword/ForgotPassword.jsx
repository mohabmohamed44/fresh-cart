import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
          { email: values.email }
        );
        toast.success("Password reset link has been sent to your email.");
        setIsResetLinkSent(true); // Set state to show the verification link
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "An error occurred. Please try again later."
        );
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <div className="flex justify-center items-center">
              <Bars height={20} width={20} color="#fff" />
            </div>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
      {isResetLinkSent && (
        <div className="mt-4">
          <Link to="/verify" className="text-green-500 hover:text-green-700">
            Go to Verification Page
          </Link>
        </div>
      )}
    </div>
  );
}
