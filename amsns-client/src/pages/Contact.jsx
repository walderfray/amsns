import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Cloud from "../images/Cloud.jpg";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Status Correction?",
      answer:
        "Status Correction is the process of reclaiming your position as a living individual and operating privately, separating yourself from the corporate entity created by the government.",
    },
    {
      question: "How long does the process take?",
      answer:
        "The timeline can vary depending on individual circumstances, but typically the process of gathering documentation and filing the necessary paperwork takes several weeks to a few months.",
    },
    {
      question: "Do I need an attorney?",
      answer:
        "While we provide guidance and documentation services, we are not attorneys. We empower you to handle your own affairs. However, you are always free to consult with legal counsel.",
    },
    {
      question: "What is the Affidavit of Repudiation?",
      answer:
        "The Affidavit of Repudiation (AOR) is a critical document that formally rejects the government's presumption of authority over your private life and establishes your standing as a sovereign national.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-blue-900 text-white pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-center bg-cover"
        style={{ backgroundImage: `url(${Cloud})` }}
      >
        <div className="absolute inset-0 bg-blue-900/80"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions about your status correction? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <div
            className={`bg-white rounded-xl shadow-xl p-8 h-full transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">aorhep9@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">657 347-4613</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Mon-Fri from 9am to 5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Office</h3>
                  <p className="text-gray-600">
                    American State National Sovereignty
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    United States of America
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section (Replacing Contact Form) */}
          <div
            className={`bg-white rounded-xl shadow-xl p-8 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <HelpCircle className="w-8 h-8 text-blue-800" />
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-800">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index
                        ? "max-h-48 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 text-gray-600 bg-white text-sm leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
