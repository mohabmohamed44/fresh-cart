import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { setToken } = useContext(UserContext);
  const [errorApi, setErrorApi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  async function handleLogin(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      console.log(response);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data?.message);
      setErrorApi(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen pt-5 pb-5 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Login
        </h2>

        {errorApi && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorApi}
          </div>
        )}

        <form onSubmit={formikLogin.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formikLogin.values.email}
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium start-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {formikLogin.touched.email && formikLogin.errors.email && (
              <p className="mt-1 text-md text-red-500">
                {formikLogin.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={formikLogin.values.password}
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium start-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {formikLogin.touched.password && formikLogin.errors.password && (
              <p className="mt-1 text-md text-red-500">
                {formikLogin.errors.password}
              </p>
            )}
          </div>

          <button
            disabled={!formikLogin.isValid || !formikLogin.dirty ? true : false}
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200"
          >
            {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Login"}
          </button>
        </form>
        <div className="flex items-center justify-between mt-5">
          <Link
            to="/register"
            className="text-green-600 hover:text-green-800"
          >
            {" "}
            Don't have an account?
          </Link>
          <Link to="/forgot" className="text-green-600 hover:text-green-800">
            Forgot Password ?
          </Link>
        </div>
      </div>
    </div>
  );
}
