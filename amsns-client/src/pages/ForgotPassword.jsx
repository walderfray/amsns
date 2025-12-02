import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { useForgotPasswordMutation } from "../hooks/useAuth";
import Cloud from "../images/Cloud.jpg";
import Logo from "../images/Logo.jpeg";

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    mutate: forgotPassword,
    isPending,
    error,
  } = useForgotPasswordMutation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    forgotPassword(values.email, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url(${Cloud})` }}
        ></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Account Recovery
          </h1>
          <p className="text-xl text-blue-100 max-w-md">
            Don't worry, we'll help you get back to your account in no time.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={Logo}
              alt="AMSNS Logo"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
          </div>

          <div className="text-center lg:text-left">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Check your email
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                We've sent a password reset link to your email address.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Didn't receive the email? Click to resend
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                  {Array.isArray(error?.detail) ? (
                    <div className="text-sm text-red-700">
                      {error.detail.map((err, idx) => (
                        <p key={idx}>{err.msg || JSON.stringify(err)}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-red-700">
                      {error?.detail || error?.message || "An error occurred"}
                    </p>
                  )}
                </div>
              )}

              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-8 space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || isPending}
                      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      {isSubmitting || isPending ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
