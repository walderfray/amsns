import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Shield, Users, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Shield className="w-12 h-12 text-blue-800" />,
      title: "Status Correction",
      description:
        "Reclaim your position and operate privately. We guide you through the process of correcting your status to stop letting the system define you.",
    },
    {
      icon: <FileText className="w-12 h-12 text-blue-800" />,
      title: "Affidavit of Repudiation",
      description:
        "Secure your Affidavit of Repudiation (AOR). This essential document helps you set boundaries so the government can't interfere in every part of your life.",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-800" />,
      title: "Private Consultation",
      description:
        "Get personalized guidance on your journey to sovereignty. We explain the obligations you were never told about and how to handle them.",
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-800" />,
      title: "Irrevocable Private Trust",
      description:
        "Protect your assets and build a lasting legacy. Our trust services offer enhanced privacy, asset protection, and long-term security for your family.",
      link: "/private-trust",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative pt-32 pb-32 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-900/90"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Our Services
          </h1>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Comprehensive solutions to help you take control of your legal
            status and reclaim your sovereignty. We provide the tools and
            guidance you need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-8 bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {service.description}
              </p>
              {service.link && (
                <div>
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-blue-700 font-bold hover:text-blue-900 transition-colors group"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Start your journey towards freedom and sovereignty today. Our team
            is ready to assist you every step of the way.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-white text-blue-900 font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
