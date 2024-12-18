import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema using Yup
const validationSchema = Yup.object({
  resetCode: Yup.string()
    .required("Reset code is required")
    .length(6, "Reset code must be 6 characters long"),
});

export default function VerifyResetCode() {
  const [loading, setLoading] = useState(false);
  const [isResetCodeVerified, setIsResetCodeVerified] = useState(false);

  async function handleVerifyResetCode(values, { setSubmitting, resetForm }) {
    const { resetCode } = values;

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      toast.success("Reset code verified successfully!", {
        position: "top-center",
      });
      setIsResetCodeVerified(true);
      resetForm(); // Clear the reset code fields after submission
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid reset code. Please try again.";
      toast.error(errorMsg, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h2 className="text-2xl font-medium mb-6">Verify Reset Code</h2>
      <Formik
        initialValues={{ resetCode: "" }}
        validationSchema={validationSchema}
        onSubmit={handleVerifyResetCode}
      >
        {({ setFieldValue, isSubmitting, values }) => {
          const handleInputChange = (e, index) => {
            const input = e.target.value;
            if (/^[0-9]?$/.test(input)) {
              const resetCodeArray = values.resetCode.split("");
              resetCodeArray[index] = input;
              const newResetCode = resetCodeArray.join("");
              setFieldValue("resetCode", newResetCode);

              if (input && index < 5) {
                document.getElementById(`input-${index + 1}`).focus();
              }
            }
          };

          const handleKeyDown = (e, index) => {
            if (e.key === "Backspace" && !values.resetCode[index] && index > 0) {
              document.getElementById(`input-${index - 1}`).focus();
            }
          };

          return (
            <Form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between mb-6">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength="1"
                    value={values.resetCode[index] || ""}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ))}
              </div>

              {/* Error Message */}
              <ErrorMessage
                name="resetCode"
                component="div"
                className="text-red-500 text-sm mb-4 text-center"
              />

              {/* Submit Button */}
              <div className="relative flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={isSubmitting || loading}
                >
                  {loading ? <Bars height={20} width={20} color="#fff" /> : "Verify Code"}
                </button>

                {/* Toast Container Positioned Center of Button */}
                <div
                  id="toast-container"
                  className="absolute top-12 left-1/2 transform -translate-x-1/2"
                ></div>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* Show Link to Reset Password Page after Successful Verification */}
      {isResetCodeVerified && (
        <div className="mt-4">
          <Link to="/reset" className="text-green-500 hover:text-green-700">
            Go to Reset Password Page
          </Link>
        </div>
      )}
    </div>
  );
}
