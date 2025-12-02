import React, { useState, useRef } from "react";
import {
  FileText,
  CheckCircle,
  DollarSign,
  Phone,
  Shield,
  ArrowRight,
  ChevronRight,
  Clock,
  AlertCircle,
  Upload,
  Check,
  Loader2,
  Briefcase,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";

import useAuthStore from "../store/useAuthStore";
import PaymentModal from "../components/PaymentModal";
import DocumentUploadModal from "../components/DocumentUploadModal";
import { client } from "../api/client";
import useToast from "../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const { user } = useAuthStore();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedUploadDoc, setSelectedUploadDoc] = useState(null);
  const [isSelectingService, setIsSelectingService] = useState(false);
  const documentsRef = useRef(null);

  const { success, error } = useToast();
  const queryClient = useQueryClient();

  const affidavitDocs = [
    {
      id: 1,
      name: "Deed of Re-conveyance",
      description:
        "Legal instrument returning property rights to the original owner",
    },
    {
      id: 2,
      name: "Declaration of Status",
      description:
        "Formal statement establishing your legal standing and capacity",
    },
    {
      id: 3,
      name: "Proof of Service",
      description: "Documentation showing proper delivery of legal notices",
    },
    {
      id: 4,
      name: "Judgment of Uh",
      description: "Court determination regarding your status correction",
    },
    {
      id: 5,
      name: "Rebutted Affidavit",
      description: "Sworn statement countering previous claims or allegations",
    },
    {
      id: 6,
      name: "Recording Cover Sheet",
      description: "Administrative form for official document recording",
    },
    {
      id: 7,
      name: "Affidavit of Repudiation",
      description: "Sworn declaration rejecting previous agreements or status",
    },
  ];

  const trustDocs = [
    {
      id: 101,
      name: "Certificate of Trust",
      description: "Summary of trust terms for third parties",
    },
    {
      id: 102,
      name: "Power of Trustee",
      description: "Legal document defining trustee's authority",
    },
    {
      id: 103,
      name: "Power of Discretion",
      description: " outlines trustee's discretionary powers",
    },
    {
      id: 104,
      name: "Declaration of Private Trust",
      description: "Formal establishment of the private trust",
    },
    {
      id: 105,
      name: "Declaration of Authority",
      description: "Statement confirming authority to act",
    },
    {
      id: 106,
      name: "Name and Situs of Trust",
      description: "Designation of trust name and legal jurisdiction",
    },
    {
      id: 107,
      name: "Agreement of Contract",
      description: "Contractual agreement governing the trust",
    },
    {
      id: 108,
      name: "Trustee Agreement to Perform Duties",
      description: "Trustee's formal acceptance of responsibilities",
    },
    {
      id: 109,
      name: "Certificate Declaration of Living Trust",
      description: "Certification of the living trust's existence",
    },
    {
      id: 110,
      name: "Trust Property",
      description: "Schedule or deed listing trust assets",
    },
    {
      id: 111,
      name: "Trustee Administrative Power, Duties & Responsibilities",
      description: "Detailed outline of trustee roles",
    },
    {
      id: 112,
      name: "Statement of Witness",
      description: "Witness attestation to trust documents",
    },
    {
      id: 113,
      name: "Affidavit of Identification",
      description: "Proof of identity for relevant parties",
    },
    {
      id: 114,
      name: "Certified Declaration of Living Trust Beneficiary",
      description: "Designation of trust beneficiaries",
    },
    {
      id: 115,
      name: "Trust Transfer Deed",
      description: "Deed transferring assets into the trust",
    },
  ];

  const handleSelectService = async (service) => {
    setIsSelectingService(true);
    try {
      await client.post("/dashboard/select-service", { service });
      success(
        `Selected ${
          service === "trust" ? "Private Trust" : "Affidavit"
        } service`
      );
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      error(err.message || "Selection failed");
    } finally {
      setIsSelectingService(false);
    }
  };

  const getKycStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFileUpload = async (docId, file) => {
    const formData = new FormData();
    formData.append("document_id", docId);
    formData.append("file", file);

    await client.post("/dashboard/upload-document", formData);
    success("Document uploaded successfully");
    queryClient.invalidateQueries(["user"]);
  };

  const openUploadModal = (doc) => {
    setSelectedUploadDoc(doc);
    setShowUploadModal(true);
  };

  const handleApply = async () => {
    try {
      await client.post("/dashboard/submit-application", {});
      success("Application submitted successfully!");
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      error(err.message || "Submission failed");
    }
  };

  const scrollToDocuments = () => {
    documentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Service Selection View
  if (!user?.selectedService || user.selectedService === "none") {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Select Your Service
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the service you wish to apply for to get started with your
              journey to sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Affidavit Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all flex flex-col transform hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Affidavit of Repudiation
              </h3>
              <p className="text-gray-600 mb-8 flex-1 leading-relaxed">
                Correct your status and reclaim your rights with our
                comprehensive affidavit service. Includes all necessary legal
                documentation and filing support.
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-gray-900">$399</span>
                <span className="text-gray-500 text-lg">/ one-time</span>
              </div>
              <button
                onClick={() => handleSelectService("affidavit")}
                disabled={isSelectingService}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-md hover:shadow-lg"
              >
                {isSelectingService ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Select Service"
                )}
              </button>
              <Link
                to="/services"
                className="text-center mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all flex flex-col transform hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Irrevocable Private Trust
              </h3>
              <p className="text-gray-600 mb-8 flex-1 leading-relaxed">
                Secure your assets and build a lasting legacy. Our private trust
                service provides enhanced protection, privacy, and long-term
                stability for your family.
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-gray-900">$999</span>
                <span className="text-gray-500 text-lg">/ one-time</span>
              </div>
              <button
                onClick={() => handleSelectService("trust")}
                disabled={isSelectingService}
                className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-md hover:shadow-lg"
              >
                {isSelectingService ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Select Service"
                )}
              </button>
              <Link
                to="/private-trust"
                className="text-center mt-6 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-1"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isTrust = user.selectedService === "trust";
  const documents = isTrust ? trustDocs : affidavitDocs;
  const price = isTrust ? 999 : 399;
  const serviceName = isTrust
    ? "Irrevocable Private Trust"
    : "Affidavit of Repudiation";

  const otherServiceName = isTrust
    ? "Affidavit of Repudiation"
    : "Irrevocable Private Trust";

  const currentService = user?.services?.[user?.selectedService] || {};

  const uploadedDocsCount = documents.filter((doc) =>
    currentService.uploaded_documents?.includes(doc.id)
  ).length;

  const isPaymentComplete = currentService.payment_status === "completed";
  const isAllDocsUploaded = uploadedDocsCount === documents.length;
  const isApplied =
    currentService.status === "pending" || currentService.status === "approved";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        document={selectedUploadDoc}
        onUpload={handleFileUpload}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.firstName || "User"}
            </h1>
            <p className="text-gray-600 mt-1">
              Progress for:{" "}
              <span className="font-semibold text-blue-900">{serviceName}</span>
            </p>
          </div>

          <button
            onClick={() => handleSelectService(isTrust ? "affidavit" : "trust")}
            disabled={isSelectingService}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            {isSelectingService && <Loader2 className="w-4 h-4 animate-spin" />}
            Switch to {otherServiceName}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* KYC Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getKycStatusColor(
                  user?.kycStatus
                )}`}
              >
                {user?.kycStatus?.replace("_", " ") || "Not Started"}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Identity Verification
            </h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Complete your KYC to proceed.
            </p>
            <Link
              to="/kyc"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Manage KYC <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-2 rounded-lg ${
                  isPaymentComplete ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                <DollarSign
                  className={`w-6 h-6 ${
                    isPaymentComplete ? "text-green-600" : "text-gray-400"
                  }`}
                />
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isPaymentComplete
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {isPaymentComplete ? "Paid" : "Pending"}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Status
            </h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              One-time fee for {serviceName}.
            </p>
            {!isPaymentComplete ? (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Pay Now <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-sm font-medium text-green-600 flex items-center gap-1">
                Completed <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {uploadedDocsCount}/{documents.length} Ready
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Required documents for your process.
            </p>
            <button
              onClick={scrollToDocuments}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Documents & Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Required Documents List */}
            <div
              ref={documentsRef}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Required Documents
                </h2>
                <p className="text-sm text-gray-500">
                  Select a document to view details and upload
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {documents.map((doc) => {
                  const isUploaded =
                    currentService.uploaded_documents?.includes(doc.id);

                  return (
                    <div
                      key={doc.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        selectedDoc === doc.id ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                          onClick={() =>
                            setSelectedDoc(
                              doc.id === selectedDoc ? null : doc.id
                            )
                          }
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                              isUploaded
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {isUploaded ? (
                              <Check className="w-4 h-4" />
                            ) : doc.id > 100 ? (
                              doc.id - 100
                            ) : (
                              doc.id
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </h4>
                            {selectedDoc === doc.id && (
                              <p className="text-xs text-gray-500 mt-1">
                                {doc.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isUploaded ? (
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              Uploaded
                            </span>
                          ) : (
                            <button
                              onClick={() => openUploadModal(doc)}
                              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                              title="Upload Document"
                            >
                              <Upload className="w-4 h-4 text-gray-400" />
                            </button>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 text-gray-400 transition-transform cursor-pointer ${
                              selectedDoc === doc.id ? "rotate-90" : ""
                            }`}
                            onClick={() =>
                              setSelectedDoc(
                                doc.id === selectedDoc ? null : doc.id
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Support */}
          <div className="space-y-8">
            {/* Action Card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Start?</h3>
              <p className="text-blue-100 text-sm mb-6">
                Get your {serviceName} prepared by professionals.
              </p>

              {!isPaymentComplete && !isApplied && (
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-blue-200 text-sm">/ one-time</span>
                </div>
              )}

              {isApplied ? (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="font-semibold text-white">
                    Application Submitted
                  </h4>
                  <p className="text-xs text-blue-100 mt-1">
                    We are reviewing your documents.
                  </p>
                </div>
              ) : isPaymentComplete && isAllDocsUploaded ? (
                <button
                  onClick={handleApply}
                  className="block w-full py-3 bg-white text-blue-900 text-center rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Apply for {isTrust ? "Trust" : "Affidavit"}
                </button>
              ) : !isPaymentComplete ? (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="block w-full py-3 bg-white text-blue-900 text-center rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Make Payment
                </button>
              ) : (
                <div className="p-3 bg-blue-800/50 rounded-lg text-sm text-blue-100 text-center">
                  Please upload all required documents to proceed.
                </div>
              )}
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Contact Support
                    </p>
                    <p className="text-xs text-gray-500">
                      Our team is available 24/7
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Documentation
                    </p>
                    <p className="text-xs text-gray-500">
                      Read our detailed guides
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
