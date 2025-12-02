import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  User,
  Briefcase,
  CreditCard,
  Loader2,
  Clock,
  XCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import API_BASE_URL, { ENDPOINTS } from "../config";
import Logo from "../images/Logo.jpeg";

export default function KYCForm() {
  const [step, setStep] = useState(1);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);

  const { token, user } = useAuthStore();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();

  console.log({ user });

  // Get KYC status from user object
  const kycStatus = user?.kycStatus || "not_started";

  const validationSchemas = [
    // Step 1: Personal Information
    Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(2, "Too short"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Too short"),
      address: Yup.string()
        .required("Address is required")
        .min(5, "Address too short"),
    }),
    // Step 2: Document Upload
    Yup.object({
      driverLicenseFront: Yup.mixed().required("Front image is required"),
      driverLicenseBack: Yup.mixed().required("Back image is required"),
    }),
    // Step 3: Additional Information
    Yup.object({
      idDocumentType: Yup.string().required("ID document type is required"),
      idDocumentNumber: Yup.string()
        .required("ID document number is required")
        .min(5, "Invalid ID number"),
      occupation: Yup.string().required("Occupation is required"),
    }),
  ];

  const handleFileChange = (e, side, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFieldValue(
      side === "front" ? "driverLicenseFront" : "driverLicenseBack",
      file
    );

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (side === "front") {
        setPreviewFront(event.target.result);
      } else {
        setPreviewBack(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        fullName: `${values.firstName} ${values.lastName}`,
        address: values.address,
        idDocumentType: values.idDocumentType,
        idDocumentNumber: values.idDocumentNumber,
        occupation: values.occupation,
      };

      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.KYC.SUBMIT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Submission failed");
      }

      success("KYC submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      showError(err.message || "Failed to submit KYC");
    }
  };

  // Status: SUBMITTED (Pending Review)
  if (kycStatus === "submitted" || submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <Clock className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Under Review
          </h2>
          <p className="text-gray-600 mb-8">
            Your KYC information has been submitted and is currently under
            review. We'll notify you once the verification is complete.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Status:</strong> Pending Review
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Submitted:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Status: APPROVED
  if (kycStatus === "approved") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            KYC Approved!
          </h2>
          <p className="text-gray-600 mb-8">
            Your identity has been successfully verified. You now have full
            access to all features.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Status:</strong> Verified ✓
            </p>
            <p className="text-sm text-green-800 mt-1">
              <strong>Approved:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Status: REJECTED
  if (kycStatus === "rejected" && !isResubmitting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-4">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Verification Failed
          </h2>
          <p className="text-gray-600 mb-6">
            Unfortunately, we couldn't verify your information. Please review
            the reason below and resubmit.
          </p>
          <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-red-800 font-semibold mb-2">
              Rejection Reason:
            </p>
            <p className="text-sm text-red-700">
              {user?.rejectionReason ||
                "Documents were unclear or incomplete. Please ensure all images are clear and readable."}
            </p>
          </div>
          <button
            onClick={() => setIsResubmitting(true)}
            className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            Resubmit KYC
          </button>
        </div>
      </div>
    );
  }

  // Status: NOT_STARTED - Show the form
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={Logo}
            alt="AMSNS Logo"
            className="w-20 h-20 rounded-full object-cover shadow-md"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your KYC
          </h1>
          <p className="text-gray-600">
            Please provide your information to verify your identity
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s
                        ? "bg-blue-900 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s}
                  </div>
                  <span className="text-xs mt-2 text-gray-600 hidden sm:block">
                    {s === 1 ? "Personal" : s === 2 ? "Documents" : "Details"}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      step > s ? "bg-blue-900" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Formik
            initialValues={{
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              address: "",
              driverLicenseFront: null,
              driverLicenseBack: null,
              idDocumentType: "SSN",
              idDocumentNumber: "",
              occupation: "",
            }}
            validationSchema={validationSchemas[step - 1]}
            onSubmit={(values, { setSubmitting }) => {
              if (step < 3) {
                setStep(step + 1);
                setSubmitting(false);
              } else {
                handleSubmit(values).finally(() => setSubmitting(false));
              }
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-900" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Field
                          name="firstName"
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="John"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Field
                          name="lastName"
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Doe"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <Field
                          name="address"
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="123 Main St, City, Country"
                        />
                        <ErrorMessage
                          name="address"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Document Upload */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-900" />
                      Driver's License
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Front */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Front Side
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, "front", setFieldValue)
                            }
                            className="hidden"
                            id="front-upload"
                          />
                          <label
                            htmlFor="front-upload"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                          >
                            {previewFront ? (
                              <img
                                src={previewFront}
                                alt="Front preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <>
                                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">
                                  Click to upload
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                        <ErrorMessage
                          name="driverLicenseFront"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>

                      {/* Back */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Back Side
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, "back", setFieldValue)
                            }
                            className="hidden"
                            id="back-upload"
                          />
                          <label
                            htmlFor="back-upload"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                          >
                            {previewBack ? (
                              <img
                                src={previewBack}
                                alt="Back preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <>
                                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">
                                  Click to upload
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                        <ErrorMessage
                          name="driverLicenseBack"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Information */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-900" />
                      Additional Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID Document Type
                      </label>
                      <Field
                        as="select"
                        name="idDocumentType"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="SSN">
                          Social Security Number (SSN)
                        </option>
                        <option value="Passport">Passport</option>
                        <option value="Driver's License">
                          Driver's License
                        </option>
                        <option value="National ID">National ID</option>
                      </Field>
                      <ErrorMessage
                        name="idDocumentType"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID Document Number
                      </label>
                      <Field
                        name="idDocumentNumber"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your ID number"
                      />
                      <ErrorMessage
                        name="idDocumentNumber"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Occupation
                      </label>
                      <Field
                        name="occupation"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Software Engineer"
                      />
                      <ErrorMessage
                        name="occupation"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {step === 3 ? "Submitting..." : "Processing..."}
                      </>
                    ) : (
                      <>
                        {step === 3 ? "Submit KYC" : "Next"}
                        {step < 3 && <ChevronRight className="w-4 h-4" />}
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
