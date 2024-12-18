import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext"; // Use UserContext, not UserContextProvider

export default function Register() {
  const { setToken } = useContext(UserContext); // Correct context usage
  const [errorApi, setErrorApi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone number is not valid")
      .required("Phone number is required"),
  });

  async function handleRegister(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(response);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data?.message);
      setErrorApi(
        error.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const formikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="min-h-screen pt-5 pb-5 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Register
        </h2>

        {errorApi && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorApi}
          </div>
        )}

        <form onSubmit={formikRegister.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              value={formikRegister.values.name}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium start-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {formikRegister.touched.name && formikRegister.errors.name && (
              <p className="mt-1 text-md text-red-500">
                {formikRegister.errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formikRegister.values.email}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium start-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {formikRegister.touched.email && formikRegister.errors.email && (
              <p className="mt-1 text-md text-red-500">
                {formikRegister.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={formikRegister.values.password}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium start-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {formikRegister.touched.password &&
              formikRegister.errors.password && (
                <p className="mt-1 text-md text-red-500">
                  {formikRegister.errors.password}
                </p>
              )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={formikRegister.values.rePassword}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium start-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {formikRegister.touched.rePassword &&
              formikRegister.errors.rePassword && (
                <p className="mt-1 text-md text-red-500">
                  {formikRegister.errors.rePassword}
                </p>
              )}
          </div>

          {/* Phone Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formikRegister.values.phone}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium start-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            {formikRegister.touched.phone && formikRegister.errors.phone && (
              <p className="mt-1 text-md text-red-500">
                {formikRegister.errors.phone}
              </p>
            )}
          </div>

          <button
            disabled={!formikRegister.isValid || !formikRegister.dirty}
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200"
          >
            {isLoading ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="text-start mt-5">
          <Link to="/login" className="text-green-600 hover:text-green-800">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}
