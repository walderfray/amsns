import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../api/admin";
import {
  Check,
  X,
  FileText,
  ExternalLink,
  Shield,
  DollarSign,
  Clock,
} from "lucide-react";
import useToast from "../../hooks/useToast";

const DOC_NAMES = {
  1: "Deed of Re-conveyance",
  2: "Declaration of Status",
  3: "Proof of Service",
  4: "Judgment of Uh",
  5: "Rebutted Affidavit",
  6: "Recording Cover Sheet",
  7: "Affidavit of Repudiation",
  101: "Certificate of Trust",
  102: "Power of Trustee",
  103: "Power of Discretion",
  104: "Declaration of Private Trust",
  105: "Declaration of Authority",
  106: "Name and Situs of Trust",
  107: "Agreement of Contract",
  108: "Trustee Agreement to Perform Duties",
  109: "Certificate Declaration of Living Trust",
  110: "Trust Property",
  111: "Trustee Administrative Power, Duties & Responsibilities",
  112: "Statement of Witness",
  113: "Affidavit of Identification",
  114: "Certified Declaration of Living Trust Beneficiary",
  115: "Trust Transfer Deed",
};

export default function UserDetails() {
  const { uid } = useParams();
  const { success, error: showError } = useToast();
  const queryClient = useQueryClient();
  const [rejectReason, setRejectReason] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: ["admin", "user", uid],
    queryFn: () => adminApi.getUserDetails(uid),
  });

  const approveKycMutation = useMutation({
    mutationFn: ({ approved, reason }) =>
      adminApi.approveKyc(uid, approved, reason),
    onSuccess: () => {
      success("KYC status updated");
      queryClient.invalidateQueries(["admin", "user", uid]);
    },
    onError: (err) => showError(err.message),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ service, status }) =>
      adminApi.updateApplicationStatus(uid, service, status),
    onSuccess: () => {
      success("Application status updated");
      queryClient.invalidateQueries(["admin", "user", uid]);
    },
    onError: (err) => showError(err.message),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  if (!user) return <div>User not found</div>;

  const ServiceCard = ({ serviceName, serviceKey, data }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{serviceName}</h3>
          <p className="text-sm text-gray-500 capitalize">
            Status: {data.status.replace("_", " ")}
          </p>
        </div>
        <div className="flex gap-2">
          {data.status === "pending" && (
            <>
              <button
                onClick={() =>
                  updateStatusMutation.mutate({
                    service: serviceKey,
                    status: "approved",
                  })
                }
                className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  updateStatusMutation.mutate({
                    service: serviceKey,
                    status: "rejected",
                  })
                }
                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Payment Details
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
            <p>
              <span className="text-gray-500">Status:</span>{" "}
              <span className="font-medium capitalize">
                {data.payment_status}
              </span>
            </p>
            {data.paymentReference && (
              <p>
                <span className="text-gray-500">
                  {data.paymentMethod === "crypto"
                    ? "Tx Hash:"
                    : "Tracking ID:"}
                </span>{" "}
                <span className="font-mono break-all">
                  {data.paymentReference}
                </span>
              </p>
            )}
            {data.paymentMethod && (
              <p>
                <span className="text-gray-500">Method:</span>{" "}
                {data.paymentMethod}
              </p>
            )}
            {data.paymentDate && (
              <p>
                <span className="text-gray-500">Date:</span>{" "}
                {new Date(data.paymentDate).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Documents (
            {data.uploaded_documents?.length || 0})
          </h4>
          <div className="space-y-2">
            {data.document_files &&
              Object.entries(data.document_files).map(([docId, file]) => (
                <div
                  key={docId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {DOC_NAMES[docId] ||
                          file.original_filename ||
                          `Document #${docId}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.uploaded_at
                          ? new Date(file.uploaded_at).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </a>
                </div>
              ))}
            {(!data.document_files ||
              Object.keys(data.document_files).length === 0) && (
              <p className="text-sm text-gray-500 italic">
                No documents uploaded
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-xs text-gray-400 font-mono mt-1">UID: {user.uid}</p>
      </div>

      {/* KYC Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" /> Identity Verification
            (KYC)
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize 
            ${
              user.kycStatus === "approved"
                ? "bg-green-100 text-green-800"
                : user.kycStatus === "submitted"
                ? "bg-yellow-100 text-yellow-800"
                : user.kycStatus === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {user.kycStatus.replace("_", " ")}
          </span>
        </div>

        {user.kycStatus === "submitted" && (
          <div className="mt-4 border-t pt-4">
            <div className="flex gap-4">
              <button
                onClick={() => approveKycMutation.mutate({ approved: true })}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Approve KYC
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
                />
                <button
                  onClick={() =>
                    approveKycMutation.mutate({
                      approved: false,
                      reason: rejectReason,
                    })
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Services */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Applications</h2>
      <ServiceCard
        serviceName="Affidavit of Repudiation"
        serviceKey="affidavit"
        data={user.services?.affidavit || {}}
      />
      <ServiceCard
        serviceName="Irrevocable Private Trust"
        serviceKey="trust"
        data={user.services?.trust || {}}
      />
    </div>
  );
}
