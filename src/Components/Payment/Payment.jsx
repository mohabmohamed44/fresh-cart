import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";
import { CreditCard, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Validation schema
const PaymentSchema = Yup.object().shape({
  details: Yup.string()
    .required("Address details are required")
    .min(5, "Address details must be at least 5 characters")
    .max(200, "Address details must be at most 200 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(01[0-9]{9})$/, "Invalid Egyptian phone number"),
  city: Yup.string()
    .required("City is required")
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name must be at most 50 characters"),
});

export default function Payment() {
  const { cartId, deleteCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState(""); // Track selected payment type
  // Redirect if no cart
  useEffect(() => {
    if (!cartId) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }
  }, [cartId, navigate]);

  const cashPayment = async (values) => {
    const apiObj = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to complete payment");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        apiObj,
        {
          headers: { token },
        }
      );

      if (response.data.status) {
        toast.success("Payment completed successfully!");
        deleteCart(); // Clear the cart after successful payment
        navigate("/allorders");
      } else {
        toast.error("Payment processing failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Payment failed");
      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onlinePayment = async (values) => {
    const apiObj = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to complete payment");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        apiObj,
        {
          headers: { token },
          params: {
            url: "http://localhost:5173",
          },
        }
      );

      if (response.data.status) {
        window.open(response.data.session.url, "_self");
        deleteCart(); // Clear the cart after successful payment
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Payment error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Payment failed");
      } else if (error.request) {
        toast.error("No response from server. Check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = (values, type) => {
    if (type === "cash") {
      cashPayment(values);
    } else if (type === "online") {
      onlinePayment(values);
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: PaymentSchema,
    onSubmit: (values) => {
      handlePayment(values, paymentType);
    },
  });

  // Render component
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-green-500 text-white p-6 text-center">
          <CreditCard className="mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-bold">Complete Payment</h2>
          <p className="text-green-100 mt-2">Enter your shipping details</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          {/* Address Details Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-green-500" size={20} />
            </div>
            <input
              type="text"
              name="details"
              placeholder="Detailed Address"
              className={`pl-10 block w-full rounded-lg border-2 px-3 py-2.5 text-sm ${
                formik.touched.details && formik.errors.details
                  ? "border-red-500 ring-2 ring-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            />
            {formik.touched.details && formik.errors.details && (
              <div className="text-red-500 text-sm mt-1 pl-10">
                {formik.errors.details}
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="text-green-500" size={20} />
            </div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number (01xxxxxxxxx)"
              className={`pl-10 block w-full rounded-lg border-2 px-3 py-2.5 text-sm ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500 ring-2 ring-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm mt-1 pl-10">
                {formik.errors.phone}
              </div>
            )}
          </div>

          {/* City Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-green-500" size={20} />
            </div>
            <input
              type="text"
              name="city"
              placeholder="City"
              className={`pl-10 block w-full rounded-lg border-2 px-3 py-2.5 text-sm ${
                formik.touched.city && formik.errors.city
                  ? "border-red-500 ring-2 ring-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-red-500 text-sm mt-1 pl-10">
                {formik.errors.city}
              </div>
            )}
          </div>

          {/* Payment Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setPaymentType("cash");
                formik.handleSubmit();
              }}
              disabled={isLoading || !formik.isValid}
              className="w-1/2 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && paymentType === "cash" ? (
                <div className="flex justify-center items-center">
                <Bars color="#ffffff" height={24} width={24} ariaLabel="loading" />
                </div>
              ) : (
                "Cash Payment"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setPaymentType("online");
                formik.handleSubmit();
              }}
              disabled={isLoading || !formik.isValid}
              className="w-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && paymentType === "online" ? (
                <div className="flex justify-center items-center">
                <Bars color="#ffffff" height={24} width={24} ariaLabel="loading" />
                </div>
              ) : (
                "Online Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
