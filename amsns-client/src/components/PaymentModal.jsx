import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Shield,
  AlertCircle,
  Loader2,
  ArrowRight,
  Coins,
  Package,
  ChevronLeft,
  Landmark,
} from "lucide-react";
import { client } from "../api/client";
import useToast from "../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import Btc from "../images/Btc.png";
import Xrp from "../images/Xrp.png";
import Xlm from "../images/Xlm.png";
import Gold from "../images/Gold.png";
import Silver from "../images/Silver.png";

export default function PaymentModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("crypto"); // crypto, physical
  const [step, setStep] = useState("select"); // select, confirm, success
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { success, error } = useToast();
  const queryClient = useQueryClient();

  if (!isOpen) return null;

  const cryptoCoins = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      address: "bc1qudjnyw0vc9d7fkkptexq2n0u6c5kke9hy0jlk7",
      image: Btc,
    },
    {
      id: "xrp",
      name: "Ripple",
      symbol: "XRP",
      address: "r9KfpE13i67kBvQM6d74G2iJdDTCnNPNK8",
      image: Xrp,
    },
    {
      id: "xlm",
      name: "Stellar",
      symbol: "XLM",
      address: "GAQY5IZIHKFF7ZFRP62ZYKZ3ZXYBQFXARPAQYQGUGTFTP6BW7OMOCY4A",
      image: Xlm,
    },
  ];

  const physicalAssets = [
    {
      id: "gold",
      name: "Gold",
      address: "120 TAMARRON PKWY SE, ATLANTA GA 30339",
      image: Gold,
    },
    {
      id: "silver",
      name: "Silver",
      address: "120 TAMARRON PKWY SE, ATLANTA GA 30339",
      image: Silver,
    },
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setStep("confirm");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await client.post("/dashboard/payment", {
        reference,
        method: activeTab,
        asset: selectedAsset.symbol || selectedAsset.name,
      });
      setStep("success");
      success("Payment submitted for verification");
      queryClient.invalidateQueries(["user"]);
      setTimeout(() => {
        onClose();
        setStep("select");
        setReference("");
        setSelectedAsset(null);
      }, 3000);
    } catch (err) {
      error(err.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            {step === "confirm" && (
              <button
                onClick={() => setStep("select")}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              {step === "success" ? "Payment Successful" : "Secure Payment"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === "select" && (
            <>
              <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                <button
                  onClick={() => setActiveTab("crypto")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === "crypto"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Coins className="w-4 h-4" /> Cryptocurrency
                </button>
                <button
                  onClick={() => setActiveTab("physical")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === "physical"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Package className="w-4 h-4" /> Physical Assets
                </button>
                <button
                  onClick={() => setActiveTab("bank")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === "bank"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Landmark className="w-4 h-4" /> Bank Payment
                </button>
              </div>

              {activeTab === "bank" ? (
                <div className="text-center py-8 px-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Landmark className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Bank Transfer
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    To make payment via your bank, please contact our team via
                    the chat support. They will provide you with the necessary
                    bank details and instructions to complete your transaction
                    securely.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(activeTab === "crypto" ? cryptoCoins : physicalAssets).map(
                    (asset) => (
                      <div
                        key={asset.id}
                        onClick={() => handleAssetSelect(asset)}
                        className="border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={asset.image}
                            alt={asset.name}
                            className="w-12 h-12 object-contain"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {asset.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {asset.symbol || "Physical Asset"}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-blue-500" />
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </>
          )}

          {step === "confirm" && selectedAsset && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <img
                  src={selectedAsset.image}
                  alt={selectedAsset.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {selectedAsset.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {activeTab === "crypto"
                      ? `Send ${selectedAsset.symbol} to the address below`
                      : "Ship assets to the address below"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {activeTab === "crypto"
                    ? "Wallet Address"
                    : "Shipping Address"}
                </label>
                <div className="relative">
                  <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm break-all pr-12 text-gray-800">
                    {selectedAsset.address}
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(selectedAsset.address, selectedAsset.id)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Copy Address"
                  >
                    {copied === selectedAsset.id ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {activeTab === "crypto" && (
                  <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Only send {selectedAsset.symbol} to this address. Sending
                    other coins may result in permanent loss.
                  </p>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="pt-4 border-t border-gray-100"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {activeTab === "crypto"
                      ? "Transaction Hash / ID"
                      : "Tracking Number / Reference"}
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder={
                      activeTab === "crypto"
                        ? "e.g., 0x123abc..."
                        : "e.g., UPS123456789"
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Please enter the reference number to verify your payment.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !reference}
                  className="w-full py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>Confirm Payment Sent</>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Payment Submitted!
              </h3>
              <p className="text-gray-500">
                Your payment details have been received. We will verify the
                transaction shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
